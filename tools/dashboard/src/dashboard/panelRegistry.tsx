import type { ReactNode } from 'react';
import type { GapAnalysis, HypothesisId, HypothesisRegister, PanelId, ExecutionQueueView } from '../model/types';
import { OverviewPanel } from '../components/panels/OverviewPanel';
import { ReadinessPanel } from '../components/panels/ReadinessPanel';
import { EvidencePanel } from '../components/panels/EvidencePanel';
import { RiskPanel } from '../components/panels/RiskPanel';
import { DestructionPanel } from '../components/panels/DestructionPanel';
import { ProposalsPanel } from '../components/panels/ProposalsPanel';
import { HypothesisDetailPanel } from '../components/panels/HypothesisDetailPanel';
import { GapLedgerPanel } from '../components/panels/GapLedgerPanel';
import { EscalationsPanel } from '../components/panels/EscalationsPanel';
import { DeadlinesPanel } from '../components/panels/DeadlinesPanel';
import { QueuePanel } from '../components/panels/QueuePanel';
import { computeReadiness } from '../views/readiness';
import { computeEvidenceQuality } from '../views/evidence-quality';
import { computeRiskMap } from '../views/risk-map';
import { computeDestructionView } from '../views/destruction';
import { computeProposalsView } from '../views/proposals';
import { computeHypothesisDetail } from '../views/hypothesis-detail';
import { computeGapLedgerView } from '../views/gap-ledger';
import { computeGovernorEscalationsView } from '../views/escalations';
import { computeDecisionDeadlinesView } from '../views/deadlines';
import { computeOverviewJourneyView } from '../views/overview-journey';
import type { SectionOrderMap } from './layoutModel';
import { resolveSectionOrder } from './layoutModel';
import { HYPOTHESIS_SECTION_PROFILES } from './hypothesisSectionProfiles';

export type DashboardPanelGroup = 'now' | 'hypothesis' | 'diagnose' | 'validate' | 'decide' | 'design';

export interface DashboardPanelSection {
  id: string;
  label: string;
}

export interface DashboardPanelNavigation {
  label: string;
  shortLabel: string;
  group: DashboardPanelGroup;
  description?: string;
  sections?: DashboardPanelSection[];
}

export interface DashboardPanelNavItem extends DashboardPanelNavigation {
  id: PanelId;
  requiresGapAnalysis?: boolean;
}

export interface DashboardPanelRenderContext {
  register: HypothesisRegister;
  gapAnalysis?: GapAnalysis;
  queueView: ExecutionQueueView | null;
  selectedHypothesis?: HypothesisId;
  sectionOrders: SectionOrderMap;
  onSelectHypothesis: (id: HypothesisId) => void;
  onSelectPanel: (panel: PanelId) => void;
  onBack: () => void;
}

interface DashboardPanelDefinition {
  id: PanelId;
  navigation?: DashboardPanelNavigation;
  requiresGapAnalysis?: boolean;
  render: (context: DashboardPanelRenderContext) => ReactNode;
}

const HYPOTHESIS_SECTION_LABELS: Record<string, string> = {
  claim: 'Claim',
  validationState: 'Validation State',
  evidence: 'Evidence',
  researchSources: 'Research Sources',
  problemScoring: 'Problem Scoring',
  painScoring: 'Pain Scoring',
  pricingInputs: 'Pricing Inputs',
  calculatedMetrics: 'Calculated Metrics',
  clauseTracing: 'Clause Tracing',
  competitiveLandscape: 'Competitive Landscape',
  competitorResponseCapability: 'Competitor Response Capability',
  modeThresholds: 'Mode Validation',
  scenarioAnalysis: 'Scenario Analysis',
  costStructure: 'Cost Structure',
  channelStrategy: 'Channel Strategy',
  assumptions: 'Assumptions',
  killSignal: 'Kill Signal',
  possibilitySpace: 'Possibility Space',
  jobs: 'Jobs',
  observableFilters: 'Observable Filters',
  updateHistory: 'Update History',
};

function hypothesisSections(id: HypothesisId): DashboardPanelSection[] {
  return HYPOTHESIS_SECTION_PROFILES[id].map(sectionId => ({
    id: sectionId,
    label: HYPOTHESIS_SECTION_LABELS[sectionId] ?? sectionId,
  }));
}

function renderHypothesisPanel(
  id: HypothesisId,
  register: HypothesisRegister,
  gapAnalysis: GapAnalysis | undefined,
  sectionOrders: SectionOrderMap,
) {
  return (
    <HypothesisDetailPanel
      view={computeHypothesisDetail(register, id, gapAnalysis)}
      panelId={id}
      sectionOrder={sectionOrders[id]}
      sectionProfile={HYPOTHESIS_SECTION_PROFILES[id]}
    />
  );
}

// Change the order of this array to reshuffle the top-level dashboard.
// Panels without navigation remain available for drill-down flows.
export const DASHBOARD_PANELS: DashboardPanelDefinition[] = [
  {
    id: 'overview',
    navigation: {
      label: 'Overview',
      shortLabel: 'Overview',
      group: 'now',
      description: 'Layered state of play, journey progress, research unlocks, and next moves.',
      sections: [
        { id: 'state', label: 'Current State' },
        { id: 'journey', label: 'Journey' },
        { id: 'hypotheses', label: 'Hypotheses' },
        { id: 'researchUnlocks', label: 'Research Unlocks' },
        { id: 'nextMoves', label: 'Next Moves' },
      ],
    },
    render: ({ register, gapAnalysis, queueView, sectionOrders }) => (
      <OverviewPanel
        view={computeOverviewJourneyView(register, gapAnalysis, queueView)}
        sectionOrder={sectionOrders.overview}
      />
    ),
  },
  {
    id: 'queue',
    navigation: {
      label: 'Now',
      shortLabel: 'Now',
      group: 'now',
      description: 'Current execution queue, action priorities, blockers, and pending decisions.',
      sections: [
        { id: 'header', label: 'Header' },
        { id: 'narrative', label: 'Narrative' },
        { id: 'actions', label: 'Actions' },
        { id: 'workItems', label: 'Queue Files' },
        { id: 'pendingDecisions', label: 'Pending Decisions' },
        { id: 'blockedPaths', label: 'Blocked Paths' },
      ],
    },
    render: ({ queueView, gapAnalysis, sectionOrders, onSelectPanel }) => (
      <QueuePanel
        view={queueView}
        onSelectEscalations={gapAnalysis ? () => onSelectPanel('escalations') : undefined}
        sectionOrder={sectionOrders.queue}
      />
    ),
  },
  {
    id: 'problem',
    navigation: {
      label: 'Problem',
      shortLabel: 'Problem',
      group: 'hypothesis',
      description: 'Problem hypothesis claim, evidence, assumptions, and validation state.',
      sections: hypothesisSections('problem'),
    },
    render: ({ register, gapAnalysis, sectionOrders }) => (
      renderHypothesisPanel('problem', register, gapAnalysis, sectionOrders)
    ),
  },
  {
    id: 'segment',
    navigation: {
      label: 'Segment',
      shortLabel: 'Segment',
      group: 'hypothesis',
      description: 'Segment hypothesis filters, access paths, assumptions, and evidence.',
      sections: hypothesisSections('segment'),
    },
    render: ({ register, gapAnalysis, sectionOrders }) => (
      renderHypothesisPanel('segment', register, gapAnalysis, sectionOrders)
    ),
  },
  {
    id: 'unitEconomics',
    navigation: {
      label: 'Unit Economics',
      shortLabel: 'Economics',
      group: 'hypothesis',
      description: 'Revenue model, cost structure, channel strategy, scenarios, and evidence.',
      sections: hypothesisSections('unitEconomics'),
    },
    render: ({ register, gapAnalysis, sectionOrders }) => (
      renderHypothesisPanel('unitEconomics', register, gapAnalysis, sectionOrders)
    ),
  },
  {
    id: 'valueProposition',
    navigation: {
      label: 'Value Proposition',
      shortLabel: 'Value Prop',
      group: 'hypothesis',
      description: 'Value proposition claim, jobs, validation state, assumptions, and evidence.',
      sections: hypothesisSections('valueProposition'),
    },
    render: ({ register, gapAnalysis, sectionOrders }) => (
      renderHypothesisPanel('valueProposition', register, gapAnalysis, sectionOrders)
    ),
  },
  {
    id: 'gapLedger',
    navigation: {
      label: 'Gap Ledger',
      shortLabel: 'Gaps',
      group: 'diagnose',
      description: 'Ranked strategic gaps, gate decision, and full gap records.',
      sections: [
        { id: 'gateDecision', label: 'Gate Decision' },
        { id: 'summary', label: 'Summary' },
        { id: 'rankedGaps', label: 'Ranked Gaps' },
        { id: 'fullGapRecords', label: 'Full Gap Records' },
      ],
    },
    render: ({ register, gapAnalysis, sectionOrders }) => (
      <GapLedgerPanel view={computeGapLedgerView(register, gapAnalysis)} sectionOrder={sectionOrders.gapLedger} />
    ),
  },
  {
    id: 'escalations',
    navigation: {
      label: 'Escalations',
      shortLabel: 'Escalate',
      group: 'decide',
      description: 'Governor decisions and unresolved strategic escalations.',
      sections: [
        { id: 'openEscalations', label: 'Open Escalations' },
        { id: 'resolvedEscalations', label: 'Resolved Escalations' },
      ],
    },
    requiresGapAnalysis: true,
    render: ({ gapAnalysis, sectionOrders }) => (
      <EscalationsPanel view={computeGovernorEscalationsView(gapAnalysis)} sectionOrder={sectionOrders.escalations} />
    ),
  },
  {
    id: 'deadlines',
    navigation: {
      label: 'Deadlines',
      shortLabel: 'Deadlines',
      group: 'decide',
      description: 'Decision deadlines, urgency summary, and forced dispositions.',
      sections: [
        { id: 'summary', label: 'Summary' },
        { id: 'decisionDeadlines', label: 'Decision Deadlines' },
        { id: 'forcedDispositions', label: 'Forced Dispositions' },
      ],
    },
    render: ({ register, gapAnalysis, sectionOrders }) => (
      <DeadlinesPanel view={computeDecisionDeadlinesView(register, gapAnalysis)} sectionOrder={sectionOrders.deadlines} />
    ),
  },
  {
    id: 'readiness',
    navigation: {
      label: 'Readiness',
      shortLabel: 'Ready',
      group: 'validate',
      description: 'Sell-readiness signals, blockers, warnings, and hypothesis cards.',
      sections: [
        { id: 'alerts', label: 'Alerts' },
        { id: 'hypothesisGrid', label: 'Hypothesis Grid' },
      ],
    },
    render: ({ register, gapAnalysis, sectionOrders, onSelectPanel }) => (
      <ReadinessPanel
        view={computeReadiness(register, gapAnalysis)}
        onSelectHypothesis={id => onSelectPanel(id)}
        sectionOrder={sectionOrders.readiness}
      />
    ),
  },
  {
    id: 'evidence',
    navigation: {
      label: 'Evidence',
      shortLabel: 'Evidence',
      group: 'validate',
      description: 'Evidence quality, coverage, tier gaps, and hypothesis matrix.',
      sections: [
        { id: 'tierLegend', label: 'Tier Legend' },
        { id: 'qualityOverview', label: 'Quality Overview' },
        { id: 'hypothesisMatrix', label: 'Hypothesis Matrix' },
        { id: 'tierGaps', label: 'Tier Gaps' },
      ],
    },
    render: ({ register, sectionOrders }) => (
      <EvidencePanel view={computeEvidenceQuality(register)} sectionOrder={sectionOrders.evidence} />
    ),
  },
  {
    id: 'risk',
    navigation: {
      label: 'Risk',
      shortLabel: 'Risk',
      group: 'diagnose',
      description: 'Load-bearing assumptions, criticality summary, and kill signals.',
      sections: [
        { id: 'summary', label: 'Risk Summary' },
        { id: 'assumptionGroups', label: 'Assumption Groups' },
        { id: 'killSignals', label: 'Kill Signals' },
      ],
    },
    render: ({ register, sectionOrders }) => (
      <RiskPanel view={computeRiskMap(register)} sectionOrder={sectionOrders.risk} />
    ),
  },
  {
    id: 'destruction',
    navigation: {
      label: 'Destruction',
      shortLabel: 'Destruct',
      group: 'diagnose',
      description: 'Pre-mortem, red team response, contradictions, and destruction checks.',
      sections: [
        { id: 'preMortem', label: 'Pre-Mortem' },
        { id: 'redTeamResponse', label: 'Red Team Response' },
        { id: 'constraintInversions', label: 'Constraint Inversions' },
        { id: 'evidenceConcentration', label: 'Evidence Concentration' },
        { id: 'killSignalAudit', label: 'Kill Signal Audit' },
        { id: 'contradictions', label: 'Contradictions' },
      ],
    },
    render: ({ register, gapAnalysis, sectionOrders }) => (
      <DestructionPanel view={computeDestructionView(register, gapAnalysis)} sectionOrder={sectionOrders.destruction} />
    ),
  },
  {
    id: 'proposals',
    navigation: {
      label: 'Solution',
      shortLabel: 'Solution',
      group: 'design',
      description: 'Growth architecture, solution design, GTM plan, and proposal readiness.',
      sections: [
        { id: 'growthArchitecture', label: 'Growth Architecture' },
        { id: 'solutionDesign', label: 'Solution Design' },
        { id: 'gtmPlan', label: 'GTM Plan' },
      ],
    },
    render: ({ register, gapAnalysis, sectionOrders }) => (
      <ProposalsPanel view={computeProposalsView(register, gapAnalysis)} sectionOrder={sectionOrders.proposals} />
    ),
  },
  {
    id: 'detail',
    render: ({ register, gapAnalysis, selectedHypothesis, onBack, onSelectPanel }) => (
      selectedHypothesis ? (
        <HypothesisDetailPanel
          view={computeHypothesisDetail(register, selectedHypothesis, gapAnalysis)}
          panelId="detail"
          onBack={onBack}
          onSelectPanel={onSelectPanel}
        />
      ) : null
    ),
  },
];

export function getDefaultNavigationPanelIds(): PanelId[] {
  return DASHBOARD_PANELS.flatMap(panel => panel.navigation ? [panel.id] : []);
}

export function getDefaultSectionOrders(): SectionOrderMap {
  return Object.fromEntries(
    DASHBOARD_PANELS.flatMap(panel => {
      if (!panel.navigation?.sections) return [];
      return [[panel.id, panel.navigation.sections.map(section => section.id)]];
    }),
  ) as SectionOrderMap;
}

export function getNavigationPanels(
  hasGapAnalysis: boolean,
  order?: PanelId[],
  sectionOrders: SectionOrderMap = {},
): DashboardPanelNavItem[] {
  const panelLookup = new Map(DASHBOARD_PANELS.map(panel => [panel.id, panel]));
  const orderedPanels = order
    ? order.flatMap(id => panelLookup.get(id) ?? [])
    : DASHBOARD_PANELS;

  return orderedPanels.flatMap(panel => {
    if (!panel.navigation) return [];
    if (panel.requiresGapAnalysis && !hasGapAnalysis) return [];
    const sections = panel.navigation.sections
      ? resolveSections(panel.navigation.sections, sectionOrders[panel.id])
      : undefined;

    return [{
      id: panel.id,
      requiresGapAnalysis: panel.requiresGapAnalysis,
      ...panel.navigation,
      sections,
    }];
  });
}

function resolveSections(sections: DashboardPanelSection[], sectionOrder?: string[]): DashboardPanelSection[] {
  const sectionLookup = new Map(sections.map(section => [section.id, section]));
  return resolveSectionOrder(sections.map(section => section.id), sectionOrder)
    .flatMap(id => sectionLookup.get(id) ?? []);
}

export function getLayoutEditorPanels(order?: PanelId[], sectionOrders: SectionOrderMap = {}): DashboardPanelNavItem[] {
  return getNavigationPanels(true, order, sectionOrders);
}

export function renderDashboardPanel(panelId: PanelId, context: DashboardPanelRenderContext): ReactNode {
  const panel = DASHBOARD_PANELS.find(panel => panel.id === panelId);
  if (!panel) {
    if (import.meta.env.DEV) {
      console.warn(`Unknown dashboard panel id: ${panelId}`);
    }
    return null;
  }

  return panel.render(context);
}
