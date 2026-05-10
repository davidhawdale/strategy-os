import type { HypothesisId } from '../model/types';

export const PROBLEM_SECTIONS = [
  'claim',
  'validationState',
  'possibilitySpace',
  'evidence',
  'researchSources',
  'problemScoring',
  'assumptions',
  'killSignal',
  'updateHistory',
];

export const SEGMENT_SECTIONS = [
  'claim',
  'validationState',
  'possibilitySpace',
  'evidence',
  'observableFilters',
  'painScoring',
  'assumptions',
  'killSignal',
  'updateHistory',
];

export const UNIT_ECONOMICS_SECTIONS = [
  'claim',
  'validationState',
  'possibilitySpace',
  'pricingInputs',
  'channelStrategy',
  'costStructure',
  'calculatedMetrics',
  'scenarioAnalysis',
  'modeThresholds',
  'assumptions',
  'killSignal',
  'updateHistory',
];

export const VALUE_PROPOSITION_SECTIONS = [
  'claim',
  'validationState',
  'clauseTracing',
  'competitiveLandscape',
  'competitorResponseCapability',
  'evidence',
  'assumptions',
  'killSignal',
  'updateHistory',
];

export const HYPOTHESIS_SECTION_PROFILES: Record<HypothesisId, string[]> = {
  problem: PROBLEM_SECTIONS,
  segment: SEGMENT_SECTIONS,
  unitEconomics: UNIT_ECONOMICS_SECTIONS,
  valueProposition: VALUE_PROPOSITION_SECTIONS,
};

export const HYPOTHESIS_DETAIL_FALLBACK_SECTIONS = [
  ...new Set([
    ...PROBLEM_SECTIONS,
    ...SEGMENT_SECTIONS,
    ...UNIT_ECONOMICS_SECTIONS,
    ...VALUE_PROPOSITION_SECTIONS,
    'jobs',
  ]),
];
