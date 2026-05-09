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

interface Props {
  view: HypothesisDetailView;
  onBack: () => void;
  onSelectPanel: (panel: PanelId) => void;
}

export function HypothesisDetailPanel({ view, onBack }: Props) {
  return (
    <section id="panel-detail" role="tabpanel" aria-label={`${view.label} Hypothesis Detail`} className="panel">
      <div className="panel__header">
        <button className="back-button" onClick={onBack} aria-label="Back to previous panel">
          Back
        </button>
        <div className="panel__header-content">
          <h2 className="panel__title">{view.label}</h2>
          <ConfidenceBadge confidence={view.confidence} size="md" />
        </div>
        {view.lastUpdated && (
          <p className="panel__date">Last updated: {view.lastUpdated}</p>
        )}
      </div>

      <ClaimSection claim={view.claim} />

      <ValidationStateSection desiredState={view.desiredState} currentState={view.currentState} />

      {(view.evidence?.length ?? 0) > 0 && (
        <EvidenceSection evidence={view.evidence} />
      )}

      {view.modeThresholds && view.modeThresholds.length > 0 && (
        <ModeThresholdsSection modeThresholds={view.modeThresholds} />
      )}

      {view.scenarioAnalysis && (
        <ScenarioAnalysisSection scenarioAnalysis={view.scenarioAnalysis} />
      )}

      <CostStructureSection costStructure={view.costStructure} />
      <ChannelStrategySection channelStrategy={view.channelStrategy} />

      {(view.assumptions?.length ?? 0) > 0 && (
        <AssumptionsSection assumptions={view.assumptions} />
      )}

      <KillSignalSection killCondition={view.killCondition} />

      {view.possibilitySpace && (
        <PossibilitySpaceSection possibilitySpace={view.possibilitySpace} label={view.label} />
      )}

      <JobsSection jobs={view.jobs} />
      <ObservableFiltersSection observableFilters={view.observableFilters} />

      <UpdateHistorySection updateRationale={view.updateRationale} priorUpdates={view.priorUpdates} />

    </section>
  );
}
