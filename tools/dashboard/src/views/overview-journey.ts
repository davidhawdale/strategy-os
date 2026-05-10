import type {
  Assumption,
  ExecutionQueueView,
  GapAnalysis,
  GapRecord,
  Hypothesis,
  HypothesisId,
  HypothesisRegister,
  OverviewJourneyView,
  ValueProposition,
} from '../model/types';
import { computeQueueView } from './queue';
import { computeReadiness } from './readiness';

const HYPOTHESIS_LABELS: Record<HypothesisId, string> = {
  problem: 'Problem',
  segment: 'Segment',
  unitEconomics: 'Unit Economics',
  valueProposition: 'Value Proposition',
};

const HYPOTHESIS_IDS: HypothesisId[] = ['problem', 'segment', 'unitEconomics', 'valueProposition'];

type AnyHypothesis = Hypothesis | ValueProposition;

export function computeOverviewJourneyView(
  register: HypothesisRegister,
  gapAnalysis?: GapAnalysis,
  queueView?: ExecutionQueueView | null,
): OverviewJourneyView {
  const readiness = computeReadiness(register, gapAnalysis);
  const resolvedQueueView = queueView ?? deriveQueueFallback(gapAnalysis);
  const researchUnlocks = deriveResearchUnlocks(register, gapAnalysis);
  const topBlocker = readiness.blockers[0]
    ?? researchUnlocks[0]?.reason
    ?? gapAnalysis?.gateSummary.reasons[0];

  return {
    currentState: {
      sellReady: readiness.sellReady,
      scaleReady: readiness.scaleReady,
      gateDecision: readiness.gateDecision,
      decisionState: resolvedQueueView?.decisionState,
      topBlocker,
    },
    journeyStages: deriveJourneyStages(register, gapAnalysis, resolvedQueueView, researchUnlocks.length),
    hypothesisLayer: HYPOTHESIS_IDS.map(id => summarizeHypothesis(id, register.hypotheses[id])),
    researchUnlocks,
    nextMoves: {
      queueActions: resolvedQueueView?.actions ?? [],
      pendingDecisions: resolvedQueueView?.pendingDecisions ?? [],
    },
  };
}

function deriveQueueFallback(gapAnalysis?: GapAnalysis): ExecutionQueueView | null {
  if (!gapAnalysis) return null;

  return computeQueueView({
    decisionState: gapAnalysis.gateSummary.decision ?? 'UNDECIDED',
    sellReady: gapAnalysis.metadata.sellReady,
    scaleReady: false,
    actions: [],
    blockedPaths: [],
    pendingDecisions: [],
    workItems: [],
  }, gapAnalysis);
}

function summarizeHypothesis(id: HypothesisId, hypothesis: AnyHypothesis): OverviewJourneyView['hypothesisLayer'][number] {
  const t1Count = hypothesis.evidence.filter(e => e.tier === 'T1').length;
  const t2Count = hypothesis.evidence.filter(e => e.tier === 'T2').length;
  const t3Count = hypothesis.evidence.filter(e => e.tier === 'T3').length;

  return {
    id,
    label: HYPOTHESIS_LABELS[id],
    confidence: hypothesis.confidence,
    evidenceCount: hypothesis.evidence.length,
    t1Count,
    t2Count,
    t3Count,
    highBlastCount: hypothesis.assumptions.filter(a => a.blastRadius === 'HIGH').length,
  };
}

function deriveJourneyStages(
  register: HypothesisRegister,
  gapAnalysis: GapAnalysis | undefined,
  queueView: ExecutionQueueView | null,
  unlockCount: number,
): OverviewJourneyView['journeyStages'] {
  const registerBuilt = !!(register.metadata.created && !register.metadata.created.includes('{'));
  const challengeActive = unlockCount > 0 || !!gapAnalysis?.contradictions.length;
  const reviewDone = !!gapAnalysis;
  const queueHasWork = !!queueView && (
    queueView.actions.length > 0
    || queueView.pendingDecisions.length > 0
    || queueView.workItems.length > 0
  );

  return [
    {
      id: 'build',
      label: 'Build',
      status: registerBuilt ? 'complete' : 'active',
      detail: registerBuilt ? 'Register exists and is parsed.' : 'Register still needs a completed build.',
    },
    {
      id: 'challenge',
      label: 'Challenge',
      status: challengeActive ? 'active' : reviewDone ? 'complete' : 'pending',
      detail: challengeActive
        ? `${unlockCount} research unlock${unlockCount === 1 ? '' : 's'} need attention.`
        : reviewDone ? 'No immediate research unlocks detected.' : 'Waiting for gap analysis or challenge pass.',
    },
    {
      id: 'review',
      label: 'Review',
      status: !reviewDone ? 'pending' : gapAnalysis.gateSummary.decision === 'NO_GO' ? 'blocked' : 'complete',
      detail: reviewDone
        ? `Gate decision: ${gapAnalysis.gateSummary.decision ?? 'not recorded'}.`
        : 'Gap Definer review has not been parsed yet.',
    },
    {
      id: 'queue',
      label: 'Queue',
      status: queueHasWork ? 'active' : reviewDone ? 'pending' : 'blocked',
      detail: queueHasWork ? 'Execution queue has visible next moves.' : 'No queue actions are currently visible.',
    },
  ];
}

function deriveResearchUnlocks(
  register: HypothesisRegister,
  gapAnalysis?: GapAnalysis,
): OverviewJourneyView['researchUnlocks'] {
  const unlocks: OverviewJourneyView['researchUnlocks'] = [];

  for (const id of HYPOTHESIS_IDS) {
    const hypothesis = register.hypotheses[id];
    const summary = summarizeHypothesis(id, hypothesis);

    if (summary.evidenceCount === 0) {
      unlocks.push({
        id: `${id}-missing-evidence`,
        source: HYPOTHESIS_LABELS[id],
        priority: 'high',
        reason: `${HYPOTHESIS_LABELS[id]} has no parsed evidence.`,
        unlocks: 'Build baseline confidence before this claim can carry decisions.',
      });
    } else if (summary.confidence === 'RESEARCHED' && summary.t3Count > summary.t1Count + summary.t2Count) {
      unlocks.push({
        id: `${id}-t3-heavy`,
        source: HYPOTHESIS_LABELS[id],
        priority: 'medium',
        reason: `${HYPOTHESIS_LABELS[id]} is researched but leans heavily on T3 evidence.`,
        unlocks: 'Upgrade the claim with direct public evidence, observed behavior, or real-world validation.',
      });
    }

    const highBlastAssumption = firstHighBlastAssumption(hypothesis.assumptions);
    if (highBlastAssumption) {
      unlocks.push({
        id: `${id}-high-blast-assumption`,
        source: HYPOTHESIS_LABELS[id],
        priority: highBlastAssumption.tier === 'T3' || highBlastAssumption.loadBearing ? 'high' : 'medium',
        reason: highBlastAssumption.claim,
        unlocks: highBlastAssumption.validation
          ?? highBlastAssumption.falsification
          ?? 'Validate or falsify the high-blast assumption.',
      });
    }
  }

  const gapUnlocks = (gapAnalysis?.rankedGaps ?? [])
    .slice(0, 3)
    .flatMap(gap => gapToResearchUnlock(gap));

  return [...unlocks, ...gapUnlocks]
    .sort((a, b) => priorityWeight(b.priority) - priorityWeight(a.priority))
    .slice(0, 6);
}

function firstHighBlastAssumption(assumptions: Assumption[]): Assumption | undefined {
  return assumptions.find(assumption =>
    assumption.blastRadius === 'HIGH'
    && assumption.status !== 'RESOLVED_TRUE'
    && assumption.status !== 'RESOLVED_FALSE'
  );
}

function gapToResearchUnlock(gap: GapRecord): OverviewJourneyView['researchUnlocks'] {
  const action = gap.recommendedAction;
  const isResearchAction = action?.evidenceTarget
    || action?.actionType?.toLowerCase().includes('research')
    || action?.description.toLowerCase().includes('research')
    || gap.evidenceWeakness;

  if (!isResearchAction || !action) return [];

  return [{
    id: gap.id ? `${gap.id}-research` : `${gap.target}-${gap.dimension}-research`,
    source: gap.id ? `${gap.id}: ${gap.target}` : gap.target,
    priority: (gap.blastRadiusWeight ?? 0) >= 3 || (gap.finalPriorityScore ?? 0) >= 6 ? 'high' : 'medium',
    reason: gap.currentObservation,
    unlocks: action.expectedOutput ?? action.description,
  }];
}

function priorityWeight(priority: OverviewJourneyView['researchUnlocks'][number]['priority']): number {
  if (priority === 'high') return 3;
  if (priority === 'medium') return 2;
  return 1;
}
