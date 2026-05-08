import type { ExecutionQueueView, GapAnalysis, PendingDecision } from '../model/types';

function deriveNarrative(raw: ExecutionQueueView, gapAnalysis: GapAnalysis): string {
  const parts: string[] = [];

  // Status sentence
  const stateLabel = raw.decisionState.replace(/_/g, ' ');
  if (raw.sellReady) {
    parts.push(`Strategy is ${stateLabel} — sell ready.`);
  } else {
    parts.push(`Strategy decision: ${stateLabel}.`);
  }

  // What's the critical blocker (top gap)
  const topGap = gapAnalysis.rankedGaps?.[0] ?? gapAnalysis.fullGapRecords?.[0];
  if (topGap) {
    const target = topGap.target?.replace(/_/g, ' ').toLowerCase() ?? 'current state';
    if (topGap.currentObservation && topGap.desiredCondition) {
      parts.push(
        `The critical gap is ${target}: ${topGap.currentObservation.trim().replace(/\.$/, '')}` +
        `, where the target is ${topGap.desiredCondition.trim().replace(/\.$/, '')}.`
      );
    } else if (topGap.currentObservation) {
      parts.push(`The critical gap is ${target}: ${topGap.currentObservation.trim()}`);
    }

    // What resolves it
    const action = topGap.recommendedAction?.description;
    if (action) {
      const clean = action.trim().replace(/\.$/, '');
      // Truncate if very long
      const summary = clean.length > 120 ? clean.slice(0, 120) + '…' : clean;
      parts.push(`Resolving it requires: ${summary}.`);
    }
  } else if (!raw.sellReady) {
    // Fallback if no gap data: reference first action
    const firstAction = raw.actions[0];
    if (firstAction) {
      parts.push(`The highest priority task is ${firstAction.description.trim().replace(/\.$/, '')}.`);
    }
  }

  return parts.join(' ');
}

function derivePendingDecisions(gapAnalysis: GapAnalysis): PendingDecision[] {
  return gapAnalysis.governorEscalations
    .filter(e => e.status === 'OPEN')
    .map(e => {
      // Extract an ID from the title (pattern: "E-01" or "E-01 (G-02)")
      const idMatch = e.title.match(/E-\d+/);
      const id = idMatch ? idMatch[0] : '';
      // Strip the ID prefix from the title for display
      const displayTitle = e.title.replace(/^E-\d+\s*[\-—(]?\s*/, '').replace(/\)\s*$/, '').trim();
      return {
        id,
        title: displayTitle || e.title,
        whatIsAtStake: e.whatIsAtStake,
        isOverdue: false,
      };
    });
}

export function computeQueueView(
  raw: ExecutionQueueView,
  gapAnalysis?: GapAnalysis
): ExecutionQueueView {
  if (!gapAnalysis) {
    return { ...raw, pendingDecisions: [] };
  }

  return {
    ...raw,
    narrative: deriveNarrative(raw, gapAnalysis),
    pendingDecisions: derivePendingDecisions(gapAnalysis),
  };
}
