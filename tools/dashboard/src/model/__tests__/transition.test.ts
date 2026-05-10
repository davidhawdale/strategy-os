import { describe, expect, it } from 'vitest';
import type { CombinedParseResult } from '../types';
import { transition } from '../types';

const data = {
  register: {
    metadata: { sellReady: false, scaleReady: false },
    hypotheses: {
      problem: { id: 'problem', evidence: [], researchSources: [], assumptions: [] },
      segment: { id: 'segment', evidence: [], researchSources: [], assumptions: [] },
      unitEconomics: { id: 'unitEconomics', evidence: [], researchSources: [], assumptions: [] },
      valueProposition: { evidence: [], assumptions: [], clauseValidation: [] },
    },
    proposals: {
      growthArchitecture: { requiredConditions: [], assumptions: [] },
      solutionDesign: {
        featureMap: [],
        growthLoops: [],
        constraintsFromHypotheses: [],
        adequacyCriteria: [],
      },
      gtmPlan: {
        channelSequence: [],
        operationalConstraints: [],
        successCriteria: [],
        killCriteria: [],
      },
    },
  },
  registerWarnings: [],
  gapAnalysisWarnings: [],
  registerParseCompleteness: 1,
  gapAnalysisParseCompleteness: 0,
} satisfies CombinedParseResult;

describe('dashboard state transition', () => {
  it('routes hypothesis selection to the promoted top-level hypothesis panel', () => {
    const next = transition(
      { _tag: 'Loaded', data, activePanel: 'readiness' },
      { _tag: 'SelectHypothesis', id: 'unitEconomics' },
    );

    expect(next).toMatchObject({
      _tag: 'Loaded',
      activePanel: 'unitEconomics',
      previousPanel: 'readiness',
      selectedHypothesis: undefined,
    });
  });
});
