import type { HypothesisRegister, HypothesisId, HypothesisDetailView } from '../model/types';

const LABELS: Record<HypothesisId, string> = {
  problem: 'Problem',
  segment: 'Segment',
  unitEconomics: 'Unit Economics',
};

export function computeHypothesisDetail(register: HypothesisRegister, id: HypothesisId): HypothesisDetailView {
  const h = register.hypotheses[id];

  const possibilitySpace = h.possibilitySpace
    ? {
        consideredCount: h.possibilitySpace.considered.length,
        eliminatedCount: h.possibilitySpace.eliminated.length,
        carriedCount: h.possibilitySpace.alternativesCarried.length,
        entries: h.possibilitySpace.considered,
        eliminations: h.possibilitySpace.eliminated,
        carried: h.possibilitySpace.alternativesCarried,
      }
    : undefined;

  return {
    id,
    label: LABELS[id],
    claim: h.claim,
    confidence: h.confidence,
    possibilitySpace,
    evidence: h.evidence,
    researchSources: h.researchSources,
    assumptions: h.assumptions,
    killCondition: h.killCondition,
    lastUpdated: h.lastUpdated,
    updateRationale: h.updateRationale,
    observableFilters: h.observableFilters,
    painScoring: h.painScoring,
    phaseEconomics: h.twoPhaseEconomics,
    scenarioAnalysis: h.scenarioAnalysis,
    costStructure: h.costStructure,
    channelStrategy: h.channelStrategy,
    modeThresholds: h.modeThresholds,
  };
}
