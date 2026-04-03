import type {
  HypothesisRegister,
  HypothesisId,
  ProposalId,
  ReadinessView,
  GapAnalysis,
} from '../model/types';

const HYPOTHESIS_LABELS: Record<HypothesisId, string> = {
  problem: 'Problem',
  segment: 'Segment',
  unitEconomics: 'Unit Economics',
  valueProposition: 'Value Proposition',
};

const PROPOSAL_LABELS: Record<ProposalId, string> = {
  growthArchitecture: 'Growth Architecture',
  solutionDesign: 'Solution Design',
  gtmPlan: 'GTM Plan',
};

export function computeReadiness(register: HypothesisRegister, gapAnalysis?: GapAnalysis): ReadinessView {
  const blockers: string[] = [];
  const warnings: string[] = [];

  const hypothesisSummary = (['problem', 'segment', 'unitEconomics', 'valueProposition'] as HypothesisId[]).map(id => {
    const h = register.hypotheses[id];

    const t1Count = h.evidence.filter(e => e.tier === 'T1').length;
    const t2Count = h.evidence.filter(e => e.tier === 'T2').length;
    const t3Count = h.evidence.filter(e => e.tier === 'T3').length;
    const highBlastCount = h.assumptions.filter(a => a.blastRadius === 'HIGH').length;

    const desiredState = h.desiredState;
    const desiredStateMet = desiredState ? desiredState.supportedMeans.length : 0;
    const desiredStateTotal = desiredState
      ? desiredState.supportedMeans.length + desiredState.brokenMeans.length
      : 0;

    return {
      id,
      label: HYPOTHESIS_LABELS[id],
      confidence: h.confidence,
      evidenceCount: h.evidence.length,
      t1Count,
      t2Count,
      t3Count,
      assumptionCount: h.assumptions.length,
      highBlastCount,
      hasKillCondition: !!h.killCondition,
      desiredStateMet,
      desiredStateTotal,
    };
  });

  const proposalSummary = (['growthArchitecture', 'solutionDesign', 'gtmPlan'] as ProposalId[]).map(id => ({
    id,
    label: PROPOSAL_LABELS[id],
    supportState: register.proposals[id].supportState,
  }));

  // Gate decision from gap analysis
  const gateDecision = gapAnalysis?.gateSummary?.decision;
  const predicateChecks = gapAnalysis?.gateSummary?.predicateChecks;

  // Blockers: prefer gap analysis gate if available
  if (gateDecision === 'NO_GO') {
    blockers.push('Gap Definer gate decision: NO GO');
  }

  if (!register.metadata.sellReady) {
    blockers.push('Sell Ready is not set to true');
  }

  for (const s of hypothesisSummary) {
    if (s.confidence === 'BROKEN') {
      blockers.push(`${s.label} hypothesis is BROKEN`);
    }
    if (s.confidence === 'UNVALIDATED') {
      blockers.push(`${s.label} hypothesis is UNVALIDATED`);
    }
  }

  const totalT1 = hypothesisSummary.reduce((sum, s) => sum + s.t1Count, 0);
  if (totalT1 === 0) {
    blockers.push('No T1 (direct) evidence across any hypothesis');
  }

  // Active blockers from gap analysis
  if (gapAnalysis) {
    const activeBlockerGaps = gapAnalysis.rankedGaps
      .filter(g => g.status === 'BLOCKED' && (g.blastRadiusWeight ?? 0) >= 3);
    for (const gap of activeBlockerGaps) {
      blockers.push(`HIGH-blast gap blocked: ${gap.target} — ${gap.dimension}`);
    }
  }

  // Warnings
  for (const s of hypothesisSummary) {
    if (s.confidence === 'RESEARCHED') {
      warnings.push(`${s.label} is RESEARCHED but not yet SUPPORTED`);
    }
  }

  const totalAssumptions = hypothesisSummary.reduce((sum, s) => sum + s.assumptionCount, 0);
  const highBlastT3 = (['problem', 'segment', 'unitEconomics', 'valueProposition'] as HypothesisId[])
    .flatMap(id => register.hypotheses[id].assumptions)
    .filter(a => a.blastRadius === 'HIGH' && a.tier === 'T3')
    .length;

  if (totalAssumptions > 0 && highBlastT3 / totalAssumptions > 0.5) {
    warnings.push('More than 50% of assumptions are HIGH blast radius with T3 evidence');
  }

  if (!register.destructionLog) {
    warnings.push('No destruction log found — strategy has not been stress-tested');
  }

  if (gateDecision === 'CONDITIONAL_GO') {
    warnings.push('Gap Definer gate decision is CONDITIONAL GO — constraints apply');
  }

  return {
    sellReady: gapAnalysis?.metadata.sellReady ?? register.metadata.sellReady,
    scaleReady: register.metadata.scaleReady,
    businessMode: register.metadata.businessMode,
    buildMethod: register.metadata.buildMethod,
    systemMode: register.metadata.systemMode,
    registerVersion: register.metadata.registerVersion,
    hypothesisSummary,
    proposalSummary,
    blockers,
    warnings,
    gateDecision,
    predicateChecks,
  };
}
