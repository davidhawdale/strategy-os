import type {
  HypothesisRegister,
  GapAnalysis,
  GapLedgerView,
  GapLedgerEntry,
  GapRecord,
} from '../model/types';

export function computeGapLedgerView(
  register: HypothesisRegister,
  gapAnalysis?: GapAnalysis
): GapLedgerView {
  // Ranked gaps: prefer gap analysis rankedGaps (richer type), fall back to register gapLedger
  const topGaps: GapLedgerEntry[] = [];

  if (gapAnalysis && gapAnalysis.rankedGaps.length > 0) {
    // Map GapRecord -> GapLedgerEntry
    for (const g of gapAnalysis.rankedGaps) {
      topGaps.push({
        rank: g.rank,
        target: g.target,
        dimension: g.dimension,
        desiredCondition: g.desiredCondition,
        currentObservation: g.currentObservation,
        priorityScore: g.finalPriorityScore,
        recommendedAction: g.recommendedAction?.description ?? '',
        status: g.status,
      });
    }
  } else if (register.gapLedger) {
    topGaps.push(...register.gapLedger.rankedGaps);
  }

  // Status distribution — across all gaps
  const allGaps: { status: GapLedgerEntry['status'] }[] = [
    ...topGaps,
    ...(register.gapLedger?.gaps ?? []),
  ];

  const statusCounts = { open: 0, inProgress: 0, resolved: 0, blocked: 0 };
  const seen = new Set<string>();
  for (const g of allGaps) {
    const key = `${g.status}`;
    // Deduplicate by status bucket rather than identity (we may have ranked + unranked overlap)
    switch (g.status) {
      case 'OPEN': statusCounts.open++; break;
      case 'IN_PROGRESS': statusCounts.inProgress++; break;
      case 'RESOLVED': statusCounts.resolved++; break;
      case 'BLOCKED': statusCounts.blocked++; break;
    }
    seen.add(key);
  }

  // Active gap count from focus rule or fallback
  const activeCount = gapAnalysis?.decisionRulesApplication?.focusRule?.activeCount
    ?? statusCounts.open + statusCounts.inProgress;
  const maxActive = gapAnalysis?.decisionRulesApplication?.focusRule?.maxActive ?? 3;

  // Readiness
  const sellReady = gapAnalysis?.metadata.sellReady
    ?? register.gapLedger?.sellReady
    ?? register.metadata.sellReady;
  const scaleReady = register.gapLedger?.scaleReady ?? register.metadata.scaleReady;

  // Full gap records from gap analysis
  const fullGapRecords: GapRecord[] | undefined =
    gapAnalysis && gapAnalysis.fullGapRecords.length > 0
      ? gapAnalysis.fullGapRecords
      : undefined;

  return {
    topGaps,
    activeGapCount: activeCount,
    maxActiveGaps: maxActive,
    gapStatusDistribution: statusCounts,
    sellReady,
    scaleReady,
    fullGapRecords,
    gateSummary: gapAnalysis?.gateSummary,
  };
}
