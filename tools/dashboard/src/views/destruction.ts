import type { HypothesisRegister, GapAnalysis, DestructionView } from '../model/types';

export function computeDestructionView(
  register: HypothesisRegister,
  gapAnalysis?: GapAnalysis
): DestructionView {
  const log = register.destructionLog;
  const outcomes = gapAnalysis?.destructionOutcomes;

  // Merge: gap analysis destruction outcomes take precedence for narrative fields
  const preMortem = outcomes?.preMortemSummary ?? log?.preMortem;
  const redTeamResponse = outcomes?.redTeamSummary ?? log?.redTeamResponse;

  const constraintInversions =
    outcomes && outcomes.constraintInversions.length > 0
      ? outcomes.constraintInversions
      : log?.constraintInversions ?? [];

  const evidenceConcentrationRisk =
    outcomes && outcomes.evidenceConcentrationRisk.length > 0
      ? outcomes.evidenceConcentrationRisk
      : log?.evidenceConcentrationRisk ?? [];

  const killSignalAudit =
    outcomes && outcomes.killSignalAudit.length > 0
      ? outcomes.killSignalAudit
      : log?.killSignalAudit ?? [];

  const hasDestructionLog = !!(log || outcomes);

  if (!hasDestructionLog) {
    return { hasDestructionLog: false };
  }

  const constraintInversionsView =
    constraintInversions.length > 0
      ? {
          survives: constraintInversions.filter(c => /^Yes/i.test(c.survives)).length,
          fails: constraintInversions.filter(c => /^No/i.test(c.survives)).length,
          withModification: constraintInversions.filter(c => /WITH_MODIFICATION|modification/i.test(c.survives)).length,
          entries: constraintInversions,
        }
      : undefined;

  const evidenceConcentrationView =
    evidenceConcentrationRisk.length > 0
      ? {
          highRisk: evidenceConcentrationRisk.filter(e => /HIGH|CONCENTRATED/i.test(e.riskLevel)),
          entries: evidenceConcentrationRisk,
        }
      : undefined;

  const killSignalAuditView =
    killSignalAudit.length > 0
      ? {
          total: killSignalAudit.length,
          ignored: killSignalAudit.filter(k => k.ignored).length,
          entries: killSignalAudit,
        }
      : undefined;

  return {
    hasDestructionLog: true,
    preMortem,
    redTeamResponse,
    constraintInversions: constraintInversionsView,
    evidenceConcentration: evidenceConcentrationView,
    killSignalAudit: killSignalAuditView,
    lastRun: log?.lastRun,
    gapDestructionOutcomes: outcomes,
    contradictions: gapAnalysis?.contradictions,
  };
}
