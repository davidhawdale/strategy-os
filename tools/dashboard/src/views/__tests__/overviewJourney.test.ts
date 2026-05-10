import { describe, expect, it } from 'vitest';
import type { ExecutionQueueView, GapAnalysis, HypothesisRegister } from '../../model/types';
import { computeOverviewJourneyView } from '../overview-journey';

function createRegister(): HypothesisRegister {
  return {
    metadata: {
      created: '2026-05-10',
      sellReady: false,
      scaleReady: false,
      businessMode: 'BOOTSTRAP',
    },
    hypotheses: {
      problem: {
        id: 'problem',
        claim: 'Problem claim',
        confidence: 'RESEARCHED',
        evidence: [
          { raw: '[FOUNDER_STATED] [T3] founder: detail', type: 'FOUNDER_STATED', tier: 'T3', detail: 'Founder-stated pain.' },
          { raw: '[FOUNDER_STATED] [T3] founder: more', type: 'FOUNDER_STATED', tier: 'T3', detail: 'More founder-stated pain.' },
        ],
        researchSources: [],
        assumptions: [{
          raw: '[B] [T3] Buyers will pay [LOAD-BEARING] [BLAST:HIGH]',
          tag: 'B',
          tier: 'T3',
          claim: 'Buyers will pay before full workflow automation exists.',
          loadBearing: true,
          blastRadius: 'HIGH',
          validation: 'Interview budget owners and test willingness to pay.',
        }],
      },
      segment: {
        id: 'segment',
        confidence: 'UNVALIDATED',
        evidence: [],
        researchSources: [],
        assumptions: [],
      },
      unitEconomics: {
        id: 'unitEconomics',
        confidence: 'RESEARCHED',
        evidence: [
          { raw: '[WEB_RESEARCH] [T1] source: economics', type: 'WEB_RESEARCH', tier: 'T1', detail: 'Market benchmark.' },
        ],
        researchSources: [],
        assumptions: [],
      },
      valueProposition: {
        claim: 'Value prop',
        confidence: 'RESEARCHED',
        evidence: [
          { raw: '[WEB_RESEARCH] [T2] source: value', type: 'WEB_RESEARCH', tier: 'T2', detail: 'Synthesized signal.' },
        ],
        assumptions: [],
        clauseValidation: [],
      },
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
  };
}

function createGapAnalysis(): GapAnalysis {
  return {
    metadata: {
      created: '2026-05-10',
      lastRun: '2026-05-10',
      sellReady: false,
    },
    gateSummary: {
      decision: 'CONDITIONAL_GO',
      reasons: ['Segment needs research before sell readiness.'],
      constraints: [],
      predicateChecks: [],
    },
    rankedGaps: [{
      id: 'G-01',
      rank: 1,
      target: 'Segment',
      dimension: 'Evidence',
      desiredCondition: 'Observed buyer pull',
      currentObservation: 'Segment evidence is not grounded in direct buyer research.',
      evidenceWeakness: 3,
      blastRadiusWeight: 3,
      finalPriorityScore: 7,
      recommendedAction: {
        actionType: 'RESEARCH',
        description: 'Run customer interviews.',
        expectedOutput: 'Interview evidence that confirms or falsifies segment urgency.',
        evidenceTarget: 'T1',
      },
      status: 'OPEN',
    }],
    fullGapRecords: [],
    contradictions: [],
    destructionOutcomes: {
      constraintInversions: [],
      evidenceConcentrationRisk: [],
      killSignalAudit: [],
    },
    decisionRulesApplication: {},
    readinessHandoff: {
      approvedActions: [],
      forbiddenActions: [],
      allowedConstraints: {},
      successSignals: [],
      failureSignals: [],
    },
    governorEscalations: [{
      title: 'E-01 Segment focus',
      decisionNeeded: 'Choose the first segment to research.',
      options: [],
      status: 'OPEN',
      whatIsAtStake: 'Research focus.',
    }],
    nextCyclePlan: {
      topActions: [],
      expectedChanges: [],
    },
  };
}

describe('computeOverviewJourneyView', () => {
  it('derives readiness and gate state when gap analysis exists', () => {
    const view = computeOverviewJourneyView(createRegister(), createGapAnalysis());

    expect(view.currentState.sellReady).toBe(false);
    expect(view.currentState.gateDecision).toBe('CONDITIONAL_GO');
    expect(view.currentState.topBlocker).toBe('Sell Ready is not set to true');
    expect(view.journeyStages.find(stage => stage.id === 'review')?.detail).toContain('CONDITIONAL_GO');
  });

  it('still renders useful state without gap analysis', () => {
    const view = computeOverviewJourneyView(createRegister());

    expect(view.currentState.gateDecision).toBeUndefined();
    expect(view.journeyStages.find(stage => stage.id === 'review')?.status).toBe('pending');
    expect(view.hypothesisLayer).toHaveLength(4);
  });

  it('prioritizes research unlocks from weak evidence and high-blast assumptions', () => {
    const view = computeOverviewJourneyView(createRegister(), createGapAnalysis());

    expect(view.researchUnlocks[0].priority).toBe('high');
    expect(view.researchUnlocks.map(unlock => unlock.reason)).toContain(
      'Buyers will pay before full workflow automation exists.',
    );
    expect(view.researchUnlocks.some(unlock => unlock.reason.includes('leans heavily on T3 evidence'))).toBe(true);
    expect(view.researchUnlocks.some(unlock => unlock.source.startsWith('G-01'))).toBe(true);
  });

  it('includes queue actions and open Governor decisions as next moves', () => {
    const queueView: ExecutionQueueView = {
      decisionState: 'WAITING_ON_RESEARCH',
      sellReady: false,
      scaleReady: false,
      actions: [{
        rank: 1,
        gapId: 'G-01',
        actionType: 'RESEARCH',
        description: 'Run customer interviews.',
        isUrgent: true,
      }],
      blockedPaths: [],
      pendingDecisions: [{ id: 'E-01', title: 'Segment focus', isOverdue: false }],
      workItems: [],
    };

    const view = computeOverviewJourneyView(createRegister(), createGapAnalysis(), queueView);

    expect(view.currentState.decisionState).toBe('WAITING_ON_RESEARCH');
    expect(view.nextMoves.queueActions).toHaveLength(1);
    expect(view.nextMoves.pendingDecisions[0].id).toBe('E-01');
  });
});
