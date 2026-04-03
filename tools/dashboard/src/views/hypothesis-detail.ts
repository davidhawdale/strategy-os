import type { HypothesisRegister, HypothesisId, HypothesisDetailView, GapAnalysis, GapRecord } from '../model/types';

const LABELS: Record<HypothesisId, string> = {
  problem: 'Problem',
  segment: 'Segment',
  unitEconomics: 'Unit Economics',
  valueProposition: 'Value Proposition',
};

export function computeHypothesisDetail(
  register: HypothesisRegister,
  id: HypothesisId,
  gapAnalysis?: GapAnalysis
): HypothesisDetailView {
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

  // Related gaps: match gaps whose target string matches the hypothesis id (case-insensitive)
  const relatedGaps: GapRecord[] | undefined = gapAnalysis
    ? [
        ...gapAnalysis.rankedGaps,
        ...gapAnalysis.fullGapRecords,
      ].filter(g => g.target.toLowerCase().includes(id.toLowerCase()))
    : undefined;

  return {
    id,
    label: LABELS[id] ?? id,
    claim: h.claim,
    confidence: h.confidence,
    desiredState: h.desiredState,
    currentState: h.currentState,
    possibilitySpace,
    evidence: h.evidence,
    researchSources: h.researchSources,
    assumptions: h.assumptions,
    killCondition: h.killCondition,
    lastUpdated: h.lastUpdated,
    updateRationale: h.updateRationale,
    relatedGaps: relatedGaps && relatedGaps.length > 0 ? relatedGaps : undefined,
  };
}
