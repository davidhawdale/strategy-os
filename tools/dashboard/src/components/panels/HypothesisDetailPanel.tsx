import type { HypothesisDetailView, PanelId } from '../../model/types';
import { ConfidenceBadge } from '../shared/ConfidenceBadge';
import { TierBadge } from '../shared/TierBadge';
import { DataTable } from '../shared/DataTable';
import { PossibilitySpaceSection } from './sections/PossibilitySpaceSection';
import { AssumptionsSection } from './sections/AssumptionsSection';
import { EvidenceSection } from './sections/EvidenceSection';
import { ValidationStateSection } from './sections/ValidationStateSection';
import { UpdateHistorySection } from './sections/UpdateHistorySection';
import { ScenarioAnalysisSection } from './sections/ScenarioAnalysisSection';
import { ModeThresholdsSection } from './sections/ModeThresholdsSection';

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

      {view.claim && (
        <div className="detail-section">
          <h3 className="section-heading">Claim</h3>
          <blockquote className="claim-block">{view.claim}</blockquote>
        </div>
      )}

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

      {(view.costStructure?.entries?.length ?? 0) > 0 && (
        <div className="detail-section">
          <h3 className="section-heading">Cost Structure</h3>
          <DataTable
            caption="Monthly cost structure"
            columns={[
              { key: 'category', header: 'Category', render: r => r.category },
              { key: 'items', header: 'Items', render: r => r.items || '' },
              { key: 'monthly', header: 'Monthly', render: r => r.monthlyCostRange },
              { key: 'tier', header: 'Tier', render: r => <TierBadge tier={r.tier} /> },
              { key: 'source', header: 'Source', render: r => r.source || '' },
            ]}
            data={view.costStructure!.entries}
            compact
          />
        </div>
      )}

      {view.channelStrategy && view.channelStrategy.channels.length > 0 && (
        <div className="detail-section">
          <h3 className="section-heading">Channel Strategy</h3>
          <DataTable
            caption="GTM channel strategy"
            columns={[
              { key: 'channel', header: 'Channel', render: r => r.channel },
              { key: 'reach', header: 'Segment Reach', render: r => r.segmentReach },
              { key: 'cac', header: 'CAC Estimate', render: r => r.cacEstimate },
              { key: 'split', header: 'Investment Split', render: r => r.investmentSplit },
              { key: 'tier', header: 'Tier', render: r => <TierBadge tier={r.tier} /> },
            ]}
            data={view.channelStrategy.channels}
            compact
          />
          {view.channelStrategy.coherence && (
            <p className="channel-meta"><strong>Coherence:</strong> {view.channelStrategy.coherence}</p>
          )}
          {view.channelStrategy.acvConstraint && (
            <p className="channel-meta"><strong>ACV constraint:</strong> {view.channelStrategy.acvConstraint}</p>
          )}
          {view.channelStrategy.sequencingRationale && (
            <p className="channel-meta"><strong>Sequencing:</strong> {view.channelStrategy.sequencingRationale}</p>
          )}
        </div>
      )}

      {(view.assumptions?.length ?? 0) > 0 && (
        <AssumptionsSection assumptions={view.assumptions} />
      )}

      {view.killCondition && (
        <div className="detail-section">
          <h3 className="section-heading">Kill Signal</h3>
          <div className="kill-condition-block">{view.killCondition}</div>
        </div>
      )}

      {view.possibilitySpace && (
        <PossibilitySpaceSection possibilitySpace={view.possibilitySpace} label={view.label} />
      )}

      {view.jobs && (view.jobs.functional || view.jobs.emotional || view.jobs.social) && (
        <div className="detail-section">
          <h3 className="section-heading">Jobs to be Done</h3>
          <dl className="jobs-list">
            {view.jobs.functional && (
              <>
                <dt className="jobs-list__term">Functional</dt>
                <dd className="jobs-list__def">{view.jobs.functional}</dd>
              </>
            )}
            {view.jobs.emotional && (
              <>
                <dt className="jobs-list__term">Emotional</dt>
                <dd className="jobs-list__def">{view.jobs.emotional}</dd>
              </>
            )}
            {view.jobs.social && (
              <>
                <dt className="jobs-list__term">Social</dt>
                <dd className="jobs-list__def">{view.jobs.social}</dd>
              </>
            )}
          </dl>
        </div>
      )}

      {view.observableFilters && view.observableFilters.length > 0 && (
        <div className="detail-section">
          <h3 className="section-heading">Observable Filters</h3>
          <ol className="observable-characteristics">
            {view.observableFilters.map((f, i) => <li key={i}>{f}</li>)}
          </ol>
        </div>
      )}

      <UpdateHistorySection updateRationale={view.updateRationale} priorUpdates={view.priorUpdates} />

    </section>
  );
}
