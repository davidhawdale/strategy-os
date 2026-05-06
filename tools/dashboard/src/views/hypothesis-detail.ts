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
  const normalise = (s: string) => s.toLowerCase().replace(/[-_\s]/g, '');
  const baseId = (id: string) => id.replace(/\s*\(.*\)$/, '').trim();
  const seen = new Set<string>();
  const relatedGaps: GapRecord[] | undefined = gapAnalysis
    ? [
        ...gapAnalysis.fullGapRecords,  // richer/updated data wins
        ...gapAnalysis.rankedGaps,
      ].filter(g => {
        const key = baseId(g.id ?? '');
        if (key && seen.has(key)) return false;
        if (key) seen.add(key);
        return normalise(g.target).includes(normalise(id));
      })
    : undefined;

  const vp = id === 'valueProposition' ? (h as import('../model/types').ValueProposition) : undefined;

  return {
    id,
    label: LABELS[id] ?? id,
    claim: h.claim,
    confidence: h.confidence,
    desiredState: h.desiredState,
    currentState: h.currentState,
    possibilitySpace,
    evidence: h.evidence,
    researchSources: (h as any).researchSources,
    assumptions: h.assumptions,
    killCondition: (h as any).killCondition,
    lastUpdated: h.lastUpdated,
    updateRationale: h.updateRationale,
    priorUpdates: h.priorUpdates,
    observableFilters: (h as any).observableCharacteristics,
    painIntensity: (h as any).painIntensity,
    frequency: (h as any).frequency,
    whyNow: (h as any).whyNow,
    workarounds: (h as any).workarounds,
    jobs: vp?.jobs,
    clauseValidation: vp?.clauseValidation,
    relatedGaps: relatedGaps && relatedGaps.length > 0 ? relatedGaps : undefined,
  };
}
