import type { HypothesisDetailView, PanelId } from '../../model/types';
import { ConfidenceBadge } from '../shared/ConfidenceBadge';
import { AssumptionsSection } from './sections/AssumptionsSection';
import { ChannelStrategySection } from './sections/ChannelStrategySection';
import { ClaimSection } from './sections/ClaimSection';
import { CostStructureSection } from './sections/CostStructureSection';
import { EvidenceSection } from './sections/EvidenceSection';
import { JobsSection } from './sections/JobsSection';
import { KillSignalSection } from './sections/KillSignalSection';
import { ValidationStateSection } from './sections/ValidationStateSection';
import { UpdateHistorySection } from './sections/UpdateHistorySection';
import { ScenarioAnalysisSection } from './sections/ScenarioAnalysisSection';
import { ModeThresholdsSection } from './sections/ModeThresholdsSection';
import { ObservableFiltersSection } from './sections/ObservableFiltersSection';
import { PossibilitySpaceSection } from './sections/PossibilitySpaceSection';
import { ResearchSourcesSection } from './sections/ResearchSourcesSection';
import { renderOrderedSections } from './sections/renderOrderedSections';

interface Props {
  view: HypothesisDetailView;
  panelId?: PanelId;
  onBack?: () => void;
  onSelectPanel?: (panel: PanelId) => void;
  sectionOrder?: string[];
}

export function HypothesisDetailPanel({ view, panelId = 'detail', onBack, sectionOrder }: Props) {
  return (
    <section id={`panel-${panelId}`} role="tabpanel" aria-label={`${view.label} Hypothesis Detail`} className="panel">
      <div className="panel__header">
        {onBack && (
          <button className="back-button" onClick={onBack} aria-label="Back to previous panel">
            Back
          </button>
        )}
        <div className="panel__header-content">
          <h2 className="panel__title">{view.label}</h2>
          <ConfidenceBadge confidence={view.confidence} size="md" />
        </div>
        {view.lastUpdated && (
          <p className="panel__date">Last updated: {view.lastUpdated}</p>
        )}
      </div>

      {renderOrderedSections(sectionOrder, [
        { id: 'claim', render: () => <ClaimSection claim={view.claim} /> },
        { id: 'validationState', render: () => <ValidationStateSection desiredState={view.desiredState} currentState={view.currentState} /> },
        { id: 'evidence', render: () => (view.evidence?.length ?? 0) > 0 ? <EvidenceSection evidence={view.evidence} /> : null },
        { id: 'researchSources', render: () => <ResearchSourcesSection researchSources={view.researchSources} /> },
        { id: 'modeThresholds', render: () => view.modeThresholds && view.modeThresholds.length > 0 ? <ModeThresholdsSection modeThresholds={view.modeThresholds} /> : null },
        { id: 'scenarioAnalysis', render: () => view.scenarioAnalysis ? <ScenarioAnalysisSection scenarioAnalysis={view.scenarioAnalysis} /> : null },
        { id: 'costStructure', render: () => <CostStructureSection costStructure={view.costStructure} /> },
        { id: 'channelStrategy', render: () => <ChannelStrategySection channelStrategy={view.channelStrategy} /> },
        { id: 'assumptions', render: () => (view.assumptions?.length ?? 0) > 0 ? <AssumptionsSection assumptions={view.assumptions} /> : null },
        { id: 'killSignal', render: () => <KillSignalSection killCondition={view.killCondition} /> },
        { id: 'possibilitySpace', render: () => view.possibilitySpace ? <PossibilitySpaceSection possibilitySpace={view.possibilitySpace} label={view.label} /> : null },
        { id: 'jobs', render: () => <JobsSection jobs={view.jobs} /> },
        { id: 'observableFilters', render: () => <ObservableFiltersSection observableFilters={view.observableFilters} /> },
        { id: 'updateHistory', render: () => <UpdateHistorySection updateRationale={view.updateRationale} priorUpdates={view.priorUpdates} /> },
      ])}
    </section>
  );
}
