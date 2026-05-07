import type { HypothesisDetailView, ScenarioEntry, PanelId, Assumption } from '../../model/types';
import { ConfidenceBadge } from '../shared/ConfidenceBadge';
import { TierBadge } from '../shared/TierBadge';
import { BlastRadiusBadge } from '../shared/BlastRadiusBadge';
import { DataTable } from '../shared/DataTable';

interface Props {
  view: HypothesisDetailView;
  onBack: () => void;
  onSelectPanel: (panel: PanelId) => void;
}

function renderUpdateText(text: string) {
  const lines = (text.charAt(0).toUpperCase() + text.slice(1)).split('\n');
  const segments: Array<{ type: 'text' | 'list'; lines: string[] }> = [];
  let current: { type: 'text' | 'list'; lines: string[] } | null = null;
  for (const line of lines) {
    const trimmed = line.trimStart();
    if (trimmed.startsWith('- ')) {
      if (current?.type !== 'list') { current = { type: 'list', lines: [] }; segments.push(current); }
      current.lines.push(trimmed.slice(2));
    } else if (trimmed) {
      if (current?.type !== 'text') { current = { type: 'text', lines: [] }; segments.push(current); }
      current.lines.push(trimmed);
    }
  }
  return segments.map((seg, i) =>
    seg.type === 'list'
      ? <ul key={i} className="update-entry__list">{seg.lines.map((item, j) => <li key={j}>{item}</li>)}</ul>
      : <p key={i} className="update-entry__text">{seg.lines.join(' ')}</p>
  );
}

function renderAssumptions(assumptions: Assumption[]) {
  return (
    <div className="detail-section">
      <h3 className="section-heading">
        Assumptions
        <span className="section-heading__count">{assumptions.length}</span>
      </h3>
      <ul className="assumption-list">
        {assumptions.map((a, i) => (
          <li key={i} className="assumption-item">
            <div className="assumption-item__header">
              {a.status && (
                <span className={`badge assumption-status assumption-status--${a.status.toLowerCase()}`}>
                  {a.status.replace(/_/g, ' ')}
                </span>
              )}
              {a.tag && (
                <span className="assumption-item__tag">
                  {a.tag === 'B' ? 'Belief' : a.tag === 'K' ? 'Knowledge' : 'Observation'}
                </span>
              )}
              <BlastRadiusBadge radius={a.blastRadius} />
              {a.loadBearing && <span className="badge badge--load-bearing">Load-Bearing</span>}
              <TierBadge tier={a.tier} />
            </div>
            <p className="assumption-item__claim">{a.claim}</p>
            {a.falsification && (
              <p className="assumption-item__detail"><strong>Falsification:</strong> {a.falsification}</p>
            )}
            {a.validation && (
              <p className="assumption-item__detail"><strong>Validation:</strong> {a.validation}</p>
            )}
            {a.challenges && a.challenges.map((c, j) => (
              <p key={j} className="assumption-item__detail assumption-item__challenge">
                <strong>Challenge {c.date}:</strong> {c.text}
              </p>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}

type PossibilitySpaceData = NonNullable<HypothesisDetailView['possibilitySpace']>;

function renderPossibilitySpace(ps: PossibilitySpaceData, label: string) {
  const primary = ps.entries.find(e => e.includes('[PRIMARY]'));
  const primaryLabel = primary?.replace(/\s*\[PRIMARY\]/, '');
  return (
    <div className="detail-section">
      <h3 className="section-heading">Possibility Space</h3>

      {primaryLabel && (
        <div className="possibility-primary">
          <span className="possibility-primary__label">Primary {label}</span>
          <p className="possibility-primary__text">{primaryLabel}</p>
        </div>
      )}

      {(ps.carried?.length ?? 0) > 0 && (
        <div className="possibility-zone">
          <h4 className="subsection-heading">Carried into design</h4>
          <ul className="possibility-carried-list">
            {ps.carried.map((c, i) => {
              const codeMatch = c.match(/^\([A-Z]\d+\)\s*/);
              const code = codeMatch ? codeMatch[0].trim() : '';
              const carriedBody = codeMatch ? c.slice(codeMatch[0].length) : c;
              const entry = ps.entries.find(e => e.startsWith(code));
              return (
                <li key={i} className="possibility-carried-item">
                  <span className="possibility-carried-item__entry">{entry ?? code}</span>
                  <span className="possibility-carried-item__reason">{carriedBody}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {(ps.eliminations?.length ?? 0) > 0 && (
        <div className="possibility-zone">
          <h4 className="subsection-heading">Eliminated</h4>
          <ul className="possibility-eliminated-list">
            {ps.eliminations.map((e, i) => {
              const codeFromCandidate = e.candidate.match(/^\([A-Z]\d+\)/)?.[0] ?? '';
              const entry = codeFromCandidate
                ? ps.entries.find(en => en.startsWith(codeFromCandidate))
                : undefined;
              const detail = e.reason === 'Eliminated'
                ? e.evidence
                : [e.reason, e.evidence].filter(Boolean).join(' — ');
              return (
                <li key={i} className="possibility-eliminated-item">
                  <span className="possibility-eliminated-item__entry">{entry ?? e.candidate}</span>
                  {detail && <span className="possibility-eliminated-item__detail">{detail}</span>}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
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

      {/* Desired State */}
      {view.desiredState && (
        <div className="detail-section">
          <h3 className="section-heading">Desired State</h3>
          {view.desiredState.supportedMeans.length > 0 && (
            <div className="validation-zone">
              <h4 className="subsection-heading">SUPPORTED means</h4>
              <ul className="validation-list">
                {view.desiredState.supportedMeans.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}
          {view.desiredState.brokenMeans.length > 0 && (
            <div className="validation-zone">
              <h4 className="subsection-heading">BROKEN means</h4>
              <ul className="validation-list">
                {view.desiredState.brokenMeans.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Current State */}
      {view.currentState && (
        <div className="detail-section">
          <h3 className="section-heading">Current State</h3>
          {view.currentState.met.length > 0 && (
            <div className="validation-zone">
              <h4 className="subsection-heading validation-met">Met</h4>
              <ul className="validation-list">
                {view.currentState.met.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}
          {view.currentState.partial.length > 0 && (
            <div className="validation-zone">
              <h4 className="subsection-heading validation-partial">Partial</h4>
              <ul className="validation-list">
                {view.currentState.partial.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}
          {view.currentState.missing.length > 0 && (
            <div className="validation-zone">
              <h4 className="subsection-heading validation-missing">Missing</h4>
              <ul className="validation-list">
                {view.currentState.missing.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}
          {view.currentState.contradicted.length > 0 && (
            <div className="validation-zone">
              <h4 className="subsection-heading validation-contradicted">Contradicted</h4>
              <ul className="validation-list">
                {view.currentState.contradicted.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Possibility space */}
      {view.possibilitySpace && renderPossibilitySpace(view.possibilitySpace, view.label)}

      {/* VP: Jobs to be Done */}
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

      {/* Segment: Observable Filters */}
      {view.observableFilters && view.observableFilters.length > 0 && (
        <div className="detail-section">
          <h3 className="section-heading">Observable Filters</h3>
          <ol className="observable-characteristics">
            {view.observableFilters.map((f, i) => <li key={i}>{f}</li>)}
          </ol>
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
      {(view.assumptions?.length ?? 0) > 0 && renderAssumptions(view.assumptions)}

      {/* Kill condition */}
      {view.killCondition && (
        <div className="detail-section">
          <h3 className="section-heading">Kill Signal</h3>
          <div className="kill-condition-block">{view.killCondition}</div>
        </div>
      )}

      {/* Update History */}
      {(view.updateRationale || (view.priorUpdates && view.priorUpdates.length > 0)) && (
        <div className="detail-section">
          <h3 className="section-heading">Update History</h3>
          {view.updateRationale && (() => {
            const m = view.updateRationale!.match(/^(\d{4}-\d{2}-\d{2})\s+(CHALLENGE Pass \d+)\s*—\s*([\s\S]+)$/i);
            const date = m?.[1];
            const passLabel = m?.[2];
            const body = m ? m[3] : view.updateRationale!;
            return (
              <div className="update-entry">
                <span className="update-entry__date">{[date, passLabel].filter(Boolean).join('  —  ')}</span>
                {renderUpdateText(body)}
              </div>
            );
          })()}
          {view.priorUpdates?.map((u, i) => {
            const m = u.text.match(/^(CHALLENGE [Pp]ass[^—]*)\s*—\s*([\s\S]+)$/i);
            const passLabel = m?.[1]?.trim();
            const body = m ? m[2] : u.text;
            return (
              <div key={i} className="update-entry update-entry--prior">
                <span className="update-entry__date">{[u.date, passLabel].filter(Boolean).join('  —  ')}</span>
                {renderUpdateText(body)}
              </div>
            );
          })}
        </div>
      )}

      {/* === Hypothesis-specific sections === */}


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
