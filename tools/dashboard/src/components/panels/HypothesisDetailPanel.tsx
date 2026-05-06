import type { HypothesisDetailView, ScenarioEntry } from '../../model/types';
import { ConfidenceBadge } from '../shared/ConfidenceBadge';
import { TierBadge } from '../shared/TierBadge';
import { BlastRadiusBadge } from '../shared/BlastRadiusBadge';
import { DataTable } from '../shared/DataTable';

interface Props {
  view: HypothesisDetailView;
  onBack: () => void;
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

      {/* Claim */}
      {view.claim && (
        <div className="detail-section">
          <h3 className="section-heading">Claim</h3>
          <blockquote className="claim-block">{view.claim}</blockquote>
        </div>
      )}

      {/* Update rationale */}
      {view.updateRationale && (
        <div className="detail-section">
          <h3 className="section-heading">Update Rationale</h3>
          <p className="rationale-text">{view.updateRationale}</p>
        </div>
      )}

      {/* Possibility space */}
      {view.possibilitySpace && (
        <div className="detail-section">
          <h3 className="section-heading">Possibility Space</h3>
          <div className="possibility-counts">
            <span className="possibility-count">{view.possibilitySpace.consideredCount} considered</span>
            <span className="possibility-count">{view.possibilitySpace.eliminatedCount} eliminated</span>
            <span className="possibility-count">{view.possibilitySpace.carriedCount} carried</span>
          </div>
          {(view.possibilitySpace.entries?.length ?? 0) > 0 && (
            <ul className="possibility-list">
              {view.possibilitySpace.entries.map((e, i) => (
                <li key={i} className={`possibility-item possibility-item--${(e.status ?? '').toLowerCase()}`}>
                  <span className="possibility-item__status">{e.status}</span>
                  <span className="possibility-item__desc">{e.description}</span>
                </li>
              ))}
            </ul>
          )}
          {(view.possibilitySpace.eliminations?.length ?? 0) > 0 && (
            <details className="elimination-details">
              <summary>Elimination reasoning</summary>
              <ul className="elimination-list">
                {view.possibilitySpace.eliminations.map((e, i) => (
                  <li key={i}>
                    <strong>{e.candidate}:</strong> {e.reason}
                  </li>
                ))}
              </ul>
            </details>
          )}
        </div>
      )}

      {/* Evidence */}
      {(view.evidence?.length ?? 0) > 0 && (
        <div className="detail-section">
          <h3 className="section-heading">
            Evidence
            <span className="section-heading__count">{view.evidence?.length}</span>
          </h3>
          <ul className="evidence-list">
            {view.evidence.map((e, i) => (
              <li key={i} className="evidence-item">
                <div className="evidence-item__meta">
                  {e.type && <span className="evidence-item__type">{e.type.replace(/_/g, ' ')}</span>}
                  <TierBadge tier={e.tier} />
                  {e.date && <span className="evidence-item__date">{e.date}</span>}
                </div>
                <p className="evidence-item__detail">
                  {e.url ? (
                    <>
                      <a href={e.url} target="_blank" rel="noopener noreferrer" className="evidence-item__source-link">{e.source}</a>
                      {e.detail && <>: {e.detail}</>}
                    </>
                  ) : (
                    e.detail
                  )}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Assumptions */}
      {(view.assumptions?.length ?? 0) > 0 && (
        <div className="detail-section">
          <h3 className="section-heading">
            Assumptions
            <span className="section-heading__count">{view.assumptions?.length}</span>
          </h3>
          <ul className="assumption-list">
            {view.assumptions.map((a, i) => (
              <li key={i} className="assumption-item">
                <div className="assumption-item__header">
                  {a.tag && <span className="assumption-item__tag">{a.tag}</span>}
                  <TierBadge tier={a.tier} />
                  <BlastRadiusBadge radius={a.blastRadius} />
                  {a.loadBearing && <span className="badge badge--load-bearing">Load-Bearing</span>}
                </div>
                <p className="assumption-item__claim">{a.claim}</p>
                {a.falsification && (
                  <p className="assumption-item__detail"><strong>Falsification:</strong> {a.falsification}</p>
                )}
                {a.validation && (
                  <p className="assumption-item__detail"><strong>Validation:</strong> {a.validation}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Kill condition */}
      {view.killCondition && (
        <div className="detail-section">
          <h3 className="section-heading">Kill Signal</h3>
          <div className="kill-condition-block">{view.killCondition}</div>
        </div>
      )}

      {/* === Hypothesis-specific sections === */}

      {/* Segment: Observable Filters */}
      {view.observableFilters && view.observableFilters.length > 0 && (
        <div className="detail-section">
          <h3 className="section-heading">Observable Filters</h3>
          <ol className="observable-filters">
            {view.observableFilters.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ol>
        </div>
      )}


      {/* Economics: Scenario Analysis */}
      {view.scenarioAnalysis && (
        <div className="detail-section">
          <h3 className="section-heading">Scenario Analysis</h3>
          <div className="scenario-grid">
            {view.scenarioAnalysis.base && <ScenarioCard label="Base" scenario={view.scenarioAnalysis.base} />}
            {view.scenarioAnalysis.optimistic && <ScenarioCard label="Optimistic" scenario={view.scenarioAnalysis.optimistic} />}
            {view.scenarioAnalysis.pessimistic && <ScenarioCard label="Pessimistic" scenario={view.scenarioAnalysis.pessimistic} />}
          </div>
          {view.scenarioAnalysis.kill && (
            <div className="kill-scenario">
              <h4 className="subsection-heading">Kill Scenario</h4>
              <p>{view.scenarioAnalysis.kill}</p>
            </div>
          )}
        </div>
      )}

      {/* Economics: Cost Structure */}
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

      {/* Economics: Channel Strategy */}
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

      {/* Economics: Mode Thresholds */}
      {view.modeThresholds && view.modeThresholds.length > 0 && (
        <div className="detail-section">
          <h3 className="section-heading">HYBRID Mode Thresholds</h3>
          <DataTable
            caption="Mode threshold assessment"
            columns={[
              { key: 'metric', header: 'Metric', render: r => r.metric },
              { key: 'required', header: 'Required', render: r => r.required },
              { key: 'estimate', header: 'Estimate', render: r => r.estimate },
              { key: 'tier', header: 'Tier', render: r => <TierBadge tier={r.tier} /> },
            ]}
            data={view.modeThresholds}
          />
        </div>
      )}
    </section>
  );
}

function ScenarioCard({ label, scenario }: { label: string; scenario: ScenarioEntry }) {
  return (
    <div className="scenario-card">
      <h4 className="scenario-card__label">{label}</h4>
      {scenario.ltvCacRange && (
        <div className="scenario-card__metric">
          <span className="scenario-card__value">{scenario.ltvCacRange}</span>
          <span className="scenario-card__name">LTV:CAC</span>
        </div>
      )}
      {scenario.paybackMonthsRange && (
        <div className="scenario-card__metric">
          <span className="scenario-card__value">{scenario.paybackMonthsRange}</span>
          <span className="scenario-card__name">Payback</span>
        </div>
      )}
      {scenario.grossMarginRange && (
        <div className="scenario-card__metric">
          <span className="scenario-card__value">{scenario.grossMarginRange}</span>
          <span className="scenario-card__name">Gross Margin</span>
        </div>
      )}
      {scenario.narrative && (
        <p className="scenario-card__narrative">{scenario.narrative}</p>
      )}
    </div>
  );
}
