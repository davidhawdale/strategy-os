import type {
  ConstraintInversion,
  EvidenceItem,
  ExecutionQueueView,
  GapAnalysis,
  GapRecord,
  GovernorEscalationCard,
  Hypothesis,
  HypothesisId,
  HypothesisRegister,
  ResearchSource,
  ValueProposition,
} from '../model/types';
import { computeGovernorEscalationsView } from './escalations';
import type { GovernorBriefSourceEntry } from './governorBriefProvenance';

export interface GovernorBriefStrategyItem {
  label: string;
  claim: string;
  alternativesCarried: string[];
  confidence: string | undefined;
}

export interface GovernorBriefElimination {
  candidate: string;
  reason: string;
}

export interface GovernorBriefView {
  gateDecision: 'GO' | 'NO_GO' | 'CONDITIONAL_GO' | undefined;
  gateReasons: string[];
  strategyShape: GovernorBriefStrategyItem[];
  eliminated: GovernorBriefElimination[];
  preMortem: string | undefined;
  redTeam: string | undefined;
  fatalInversions: ConstraintInversion[];
  topGaps: GapRecord[];
  openEscalations: GovernorEscalationCard[];
  sourceEntriesByHypothesis: Record<HypothesisId, GovernorBriefSourceEntry[]>;
}

const HYPOTHESIS_LABELS: Record<HypothesisId, string> = {
  problem: 'Problem',
  segment: 'Segment',
  unitEconomics: 'Unit Economics',
  valueProposition: 'Value Proposition',
};

function evidenceToSourceEntry(
  hypothesisId: HypothesisId,
  item: EvidenceItem,
): GovernorBriefSourceEntry {
  const name = item.source;
  return {
    hypothesisId,
    hypothesisLabel: HYPOTHESIS_LABELS[hypothesisId],
    kind: 'evidence',
    raw: item.raw,
    name,
    url: item.url,
    note: item.detail,
    description: item.detail || name || item.raw,
    date: item.date,
    tier: item.tier,
    type: item.type,
  };
}

function researchToSourceEntry(
  hypothesisId: HypothesisId,
  item: ResearchSource,
): GovernorBriefSourceEntry {
  return {
    hypothesisId,
    hypothesisLabel: HYPOTHESIS_LABELS[hypothesisId],
    kind: 'research',
    raw: item.raw,
    name: item.name,
    url: item.url,
    note: item.note ?? (!item.name && item.description ? undefined : item.description),
    description: item.description ?? item.note ?? item.name ?? item.raw,
    date: item.date,
    tier: item.tier,
    type: item.type,
  };
}

export function computeGovernorBriefView(
  register: HypothesisRegister,
  gapAnalysis: GapAnalysis | undefined,
  queueView: ExecutionQueueView | null,
): GovernorBriefView {
  const gateDecision = gapAnalysis?.gateSummary.decision;
  const gateReasons = gapAnalysis?.gateSummary.reasons ?? [];

  type AnyHyp = Hypothesis | ValueProposition;
  const hypothesisEntries: [string, AnyHyp][] = [
    ['Problem', register.hypotheses.problem],
    ['Segment', register.hypotheses.segment],
    ['Unit Economics', register.hypotheses.unitEconomics],
    ['Value Proposition', register.hypotheses.valueProposition],
  ];

  const strategyShape: GovernorBriefStrategyItem[] = hypothesisEntries.map(([label, hyp]) => {
    const ps = 'possibilitySpace' in hyp ? hyp.possibilitySpace : undefined;
    return {
      label,
      claim: hyp.claim ?? '',
      alternativesCarried: ps?.alternativesCarried ?? [],
      confidence: hyp.confidence,
    };
  });

  const eliminated: GovernorBriefElimination[] = [
    register.hypotheses.problem,
    register.hypotheses.segment,
    register.hypotheses.unitEconomics,
  ].flatMap(hyp =>
    (hyp.possibilitySpace?.eliminated ?? []).map(e => ({
      candidate: e.candidate,
      reason: e.reason,
    }))
  );

  const destruction = gapAnalysis?.destructionOutcomes;
  const fatalInversions = (destruction?.constraintInversions ?? []).filter(inv => inv.survives === 'NO');

  function truncate(text: string | undefined, sentences = 3): string | undefined {
    if (!text) return undefined;
    const parts = text.match(/[^.!?]+[.!?]+/g) ?? [];
    return parts.length > sentences ? parts.slice(0, sentences).join(' ').trim() + '…' : text;
  }

  const topGaps = (gapAnalysis?.rankedGaps ?? []).slice(0, 3);

  const openEscalations = computeGovernorEscalationsView(queueView).openEscalations;

  const sourceEntriesByHypothesis: Record<HypothesisId, GovernorBriefSourceEntry[]> = {
    problem: [
      ...register.hypotheses.problem.evidence.map(item => evidenceToSourceEntry('problem', item)),
      ...register.hypotheses.problem.researchSources.map(item => researchToSourceEntry('problem', item)),
    ],
    segment: [
      ...register.hypotheses.segment.evidence.map(item => evidenceToSourceEntry('segment', item)),
      ...register.hypotheses.segment.researchSources.map(item => researchToSourceEntry('segment', item)),
    ],
    unitEconomics: [
      ...register.hypotheses.unitEconomics.evidence.map(item => evidenceToSourceEntry('unitEconomics', item)),
      ...register.hypotheses.unitEconomics.researchSources.map(item => researchToSourceEntry('unitEconomics', item)),
    ],
    valueProposition: register.hypotheses.valueProposition.evidence.map(item =>
      evidenceToSourceEntry('valueProposition', item)
    ),
  };

  return {
    gateDecision,
    gateReasons,
    strategyShape,
    eliminated,
    preMortem: truncate(destruction?.preMortemSummary),
    redTeam: destruction?.redTeamSummary,
    fatalInversions,
    topGaps,
    openEscalations,
    sourceEntriesByHypothesis,
  };
}
