import type {
  Hypothesis,
  HypothesisRegister,
  HypothesisId,
  HypothesisDetailView,
  GapAnalysis,
  GapRecord,
  ValueProposition,
} from '../model/types';

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
  const hypothesis = isHypothesis(h) ? h : undefined;
  const vp = isValueProposition(h) ? h : undefined;

  const possibilitySpace = hypothesis?.possibilitySpace
    ? {
        consideredCount: hypothesis.possibilitySpace.considered.length,
        eliminatedCount: hypothesis.possibilitySpace.eliminated.length,
        carriedCount: hypothesis.possibilitySpace.alternativesCarried.length,
        entries: hypothesis.possibilitySpace.considered,
        eliminations: hypothesis.possibilitySpace.eliminated,
        carried: hypothesis.possibilitySpace.alternativesCarried,
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

  return {
    id,
    label: LABELS[id] ?? id,
    claim: h.claim,
    confidence: h.confidence,
    desiredState: h.desiredState,
    currentState: h.currentState,
    possibilitySpace,
    evidence: h.evidence,
    researchSources: hypothesis?.researchSources ?? [],
    assumptions: h.assumptions,
    killCondition: hypothesis?.killCondition,
    lastUpdated: h.lastUpdated,
    updateRationale: h.updateRationale,
    priorUpdates: h.priorUpdates,
    triggerEvent: hypothesis?.triggerEvent,
    budgetOwner: hypothesis?.budgetOwner,
    currentSpend: hypothesis?.currentSpend,
    observableFilters: hypothesis?.observableFilters,
    accessPaths: hypothesis?.accessPaths,
    painScoring: hypothesis?.painScoring,
    painIntensity: hypothesis?.painIntensity,
    frequency: hypothesis?.frequency,
    whyNow: hypothesis?.whyNow,
    workarounds: hypothesis?.workarounds,
    jobs: vp?.jobs,
    costStructure: hypothesis?.costStructure,
    channelStrategy: hypothesis?.channelStrategy,
    modeThresholds: hypothesis?.modeThresholds,
    scenarioAnalysis: hypothesis?.scenarioAnalysis,
    clauseValidation: vp?.clauseValidation,
    relatedGaps: relatedGaps && relatedGaps.length > 0 ? relatedGaps : undefined,
  };
}

function isHypothesis(value: Hypothesis | ValueProposition): value is Hypothesis {
  return 'id' in value;
}

function isValueProposition(value: Hypothesis | ValueProposition): value is ValueProposition {
  return !('id' in value);
}
