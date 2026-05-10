import { describe, expect, it } from 'vitest';
import type { GapLedgerEntry, HypothesisRegister } from '../../model/types';
import { computeGapLedgerView } from '../gap-ledger';

const baseRegister = {
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
} satisfies HypothesisRegister;

function gap(overrides: Partial<GapLedgerEntry>): GapLedgerEntry {
  return {
    target: 'Problem',
    dimension: 'Evidence',
    desiredCondition: 'Known',
    currentObservation: 'Unknown',
    recommendedAction: 'Test',
    status: 'OPEN',
    ...overrides,
  };
}

describe('computeGapLedgerView', () => {
  it('deduplicates status distribution by gap id and counts anonymous rows individually', () => {
    const view = computeGapLedgerView({
      ...baseRegister,
      gapLedger: {
        rankedGaps: [
          gap({ id: 'G-01', rank: 1, status: 'OPEN' }),
          gap({ id: 'G-02', rank: 2, status: 'IN_PROGRESS' }),
        ],
        gaps: [
          gap({ id: 'G-01', status: 'OPEN' }),
          gap({ id: 'G-02', status: 'IN_PROGRESS' }),
          gap({ status: 'OPEN' }),
          gap({ status: 'BLOCKED' }),
        ],
        blockers: [],
        decisionDeadlines: [],
        sellReady: false,
        scaleReady: false,
      },
    });

    expect(view.gapStatusDistribution).toEqual({
      open: 2,
      inProgress: 1,
      resolved: 0,
      blocked: 1,
    });
  });
});
