import type { GapAnalysis, GovernorEscalationsView, Escalation } from '../model/types';

export function computeGovernorEscalationsView(gapAnalysis?: GapAnalysis): GovernorEscalationsView {
  if (!gapAnalysis) {
    return { openEscalations: [], resolvedEscalations: [], totalOpen: 0 };
  }

  const openEscalations: Escalation[] = gapAnalysis.governorEscalations.filter(e => e.status === 'OPEN');
  const resolvedEscalations: Escalation[] = gapAnalysis.governorEscalations.filter(e => e.status === 'RESOLVED');

  return {
    openEscalations,
    resolvedEscalations,
    totalOpen: openEscalations.length,
  };
}
