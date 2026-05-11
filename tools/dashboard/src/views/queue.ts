import type { ExecutionQueueView, GapAnalysis, PendingDecision, QueueWorkItem } from '../model/types';

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

function derivePendingDecisions(workItems: QueueWorkItem[]): PendingDecision[] {
  return workItems
    .filter(item => item.kind === 'escalation')
    .filter(item => !item.status || !item.status.toUpperCase().includes('RESOLVED'))
    .map(item => ({
      id: item.id,
      title: item.title,
      whatIsAtStake: item.whatIsAtStake,
      isOverdue: false,
    }));
}

export function computeQueueView(
  raw: ExecutionQueueView,
  gapAnalysis?: GapAnalysis,
  workItems: QueueWorkItem[] = []
): ExecutionQueueView {
  if (!gapAnalysis) {
    return { ...raw, pendingDecisions: derivePendingDecisions(workItems), workItems };
  }

  return {
    ...raw,
    narrative: deriveNarrative(raw, gapAnalysis),
    pendingDecisions: derivePendingDecisions(workItems),
    workItems,
  };
}
