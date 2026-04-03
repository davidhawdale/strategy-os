import type {
  HypothesisRegister,
  GapAnalysis,
  DestructionHealthView,
  EvidenceConcentrationEntry,
  KillSignalAuditEntry,
} from '../model/types';

export function computeDestructionHealth(
  register: HypothesisRegister,
  gapAnalysis?: GapAnalysis
): DestructionHealthView {
  const concentrationEntries: EvidenceConcentrationEntry[] =
    gapAnalysis?.destructionOutcomes.evidenceConcentrationRisk ??
    register.destructionLog?.evidenceConcentrationRisk ??
    [];

  const killSignalEntries: KillSignalAuditEntry[] =
    gapAnalysis?.destructionOutcomes.killSignalAudit ??
    register.destructionLog?.killSignalAudit ??
    [];

  return {
    evidenceConcentrationFlags: concentrationEntries.filter(
      e => e.riskLevel === 'CONCENTRATED'
    ),
    killSignalsIgnored: killSignalEntries.filter(e => e.ignored === true),
    lastDestructionRunDate: register.destructionLog?.lastRun,
    contradictions: gapAnalysis?.contradictions ?? [],
  };
}
