import type {
  HypothesisRegister,
  GapAnalysis,
  ProposalsView,
  FeatureMapEntry,
} from '../model/types';

export function computeProposalsView(
  register: HypothesisRegister,
  _gapAnalysis?: GapAnalysis
): ProposalsView {
  const ga = register.proposals.growthArchitecture;
  const sd = register.proposals.solutionDesign;
  const gtm = register.proposals.gtmPlan;

  const featureMap: FeatureMapEntry[] = sd.featureMap ?? [];

  return {
    growthArchitecture: {
      hasData: !!(ga.architecture || ga.rationale || ga.requiredConditions.length > 0),
      architecture: ga.architecture,
      supportState: ga.supportState,
      rationale: ga.rationale,
      requiredConditions: ga.requiredConditions,
    },
    solutionDesign: {
      hasData: !!(sd.positioningStatement || featureMap.length > 0 || sd.mvpScope),
      supportState: sd.supportState,
      positioningStatement: sd.positioningStatement,
      featuresByPriority: {
        mvp: featureMap.filter(f => f.priority === 'MVP'),
        postMvp: featureMap.filter(f => f.priority === 'POST_MVP'),
        future: featureMap.filter(f => f.priority === 'FUTURE'),
      },
      mvpScope: sd.mvpScope,
      growthLoops: sd.growthLoops ?? [],
      constraints: sd.constraintsFromHypotheses ?? [],
      adequacyCriteria: sd.adequacyCriteria ?? [],
    },
    gtmPlan: {
      hasData: !!(gtm.channelSequence.length > 0 || gtm.messagingFramework),
      supportState: gtm.supportState,
      channelSequence: gtm.channelSequence ?? [],
      messagingFramework: gtm.messagingFramework,
      successCriteria: gtm.successCriteria ?? [],
      killCriteria: gtm.killCriteria ?? [],
    },
  };
}
