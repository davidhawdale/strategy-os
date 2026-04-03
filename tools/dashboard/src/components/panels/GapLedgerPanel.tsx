import type { GapLedgerView, GapRecord } from '../../model/types';
import { BlastRadiusBadge } from '../shared/BlastRadiusBadge';
import { GapStatusBadge } from '../shared/GapStatusBadge';

interface Props {
  view: GapLedgerView;
}

function GateDecisionBadge({ decision }: { decision?: 'GO' | 'NO_GO' | 'CONDITIONAL_GO' }) {
  if (!decision) return null;
  const cls =
    decision === 'GO'
      ? 'gate-badge gate-badge--go'
      : decision === 'NO_GO'
      ? 'gate-badge gate-badge--no-go'
      : 'gate-badge gate-badge--conditional';
  const label =
    decision === 'GO' ? 'GO' : decision === 'NO_GO' ? 'NO GO' : 'CONDITIONAL GO';
  return <span className={cls}>{label}</span>;
}


function ScoreCell({ score }: { score?: number }) {
  if (score === undefined) return <td className="data-table__cell">—</td>;
  const cls =
    score >= 6 ? 'score score--high' : score >= 3 ? 'score score--medium' : 'score score--low';
  return <td className="data-table__cell"><span className={cls}>{score}</span></td>;
}

export function GapLedgerPanel({ view }: Props) {
  return (
    <section
      id="panel-gapLedger"
      role="tabpanel"
      aria-label="Gap Ledger"
      className="panel"
    >
      <div className="panel__header">
        <h2 className="panel__title">Gap Ledger</h2>
        <p className="panel__subtitle">Ranked gaps and gate decision</p>
      </div>

      {/* Gate decision */}
      {view.gateSummary && (
        <div className="gap-ledger__gate">
          <div className="gap-ledger__gate-header">
            <h3 className="gap-ledger__gate-title">Gate Decision</h3>
            <GateDecisionBadge decision={view.gateSummary.decision} />
          </div>

          {view.gateSummary.predicateChecks.length > 0 && (
            <ul className="predicate-list" aria-label="Readiness gate predicate checks">
              {view.gateSummary.predicateChecks.map((check, i) => (
                <li key={i} className={`predicate-list__item predicate-list__item--${check.result}`}>
                  <span className="predicate-list__icon" aria-hidden="true">
                    {check.result === 'pass' ? '\u2713' : '\u2717'}
                  </span>
                  <span className="predicate-list__label">{check.predicate}</span>
                </li>
              ))}
            </ul>
          )}

          {view.gateSummary.reasons.length > 0 && (
            <div className="gap-ledger__gate-reasons">
              <h4 className="gap-ledger__gate-reasons-title">Why</h4>
              <ul className="gap-ledger__reasons-list">
                {view.gateSummary.reasons.map((r, i) => (
                  <li key={i} className="gap-ledger__reason">{r}</li>
                ))}
              </ul>
            </div>
          )}

          {view.gateSummary.constraints.length > 0 && (
            <div className="gap-ledger__constraints">
              <h4 className="gap-ledger__constraints-title">Active Constraints</h4>
              <ul className="gap-ledger__constraints-list">
                {view.gateSummary.constraints.map((c, i) => (
                  <li key={i} className="gap-ledger__constraint">{c}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Active gap count */}
      <div className="gap-ledger__summary">
        <div className="gap-ledger__stat">
          <span className={`gap-ledger__stat-value ${view.activeGapCount > view.maxActiveGaps ? 'gap-ledger__stat-value--warn' : ''}`}>
            {view.activeGapCount}/{view.maxActiveGaps}
          </span>
          <span className="gap-ledger__stat-label">Active gaps (max {view.maxActiveGaps})</span>
        </div>
        <div className="gap-ledger__stat">
          <span className={`gap-ledger__stat-value ${view.sellReady ? 'gap-ledger__stat-value--ready' : 'gap-ledger__stat-value--not-ready'}`}>
            {view.sellReady ? 'Ready' : 'Not Ready'}
          </span>
          <span className="gap-ledger__stat-label">Sell Ready</span>
        </div>
        <div className="gap-ledger__stat">
          <span className={`gap-ledger__stat-value ${view.scaleReady ? 'gap-ledger__stat-value--ready' : 'gap-ledger__stat-value--not-ready'}`}>
            {view.scaleReady ? 'Ready' : 'Not Ready'}
          </span>
          <span className="gap-ledger__stat-label">Scale Ready</span>
        </div>
      </div>

      {/* Status distribution */}
      <div className="gap-ledger__status-row" aria-label="Gap status distribution">
        <span className="gap-status-count gap-status-count--open">{view.gapStatusDistribution.open} Open</span>
        <span className="gap-status-count gap-status-count--in-progress">{view.gapStatusDistribution.inProgress} In Progress</span>
        <span className="gap-status-count gap-status-count--blocked">{view.gapStatusDistribution.blocked} Blocked</span>
        <span className="gap-status-count gap-status-count--resolved">{view.gapStatusDistribution.resolved} Resolved</span>
      </div>

      {/* Ranked gaps table */}
      {view.topGaps.length > 0 && (
        <div className="gap-ledger__ranked">
          <h3 className="gap-ledger__section-title">Ranked Gaps</h3>
          <div className="data-table-wrapper" role="region" aria-label="Ranked gaps table">
            <table className="data-table">
              <thead>
                <tr>
                  <th className="data-table__header" scope="col">#</th>
                  <th className="data-table__header" scope="col">Target</th>
                  <th className="data-table__header" scope="col">Dimension</th>
                  <th className="data-table__header" scope="col">Priority</th>
                  <th className="data-table__header" scope="col">Action</th>
                  <th className="data-table__header" scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {view.topGaps.map((gap, i) => (
                  <tr key={i} className="data-table__row">
                    <td className="data-table__cell">{gap.rank ?? i + 1}</td>
                    <td className="data-table__cell">{gap.target}</td>
                    <td className="data-table__cell">{gap.dimension}</td>
                    <ScoreCell score={gap.priorityScore} />
                    <td className="data-table__cell">{gap.recommendedAction}</td>
                    <td className="data-table__cell"><GapStatusBadge status={gap.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Full gap records */}
      {view.fullGapRecords && view.fullGapRecords.length > 0 && (
        <div className="gap-ledger__full-records">
          <h3 className="gap-ledger__section-title">Full Gap Records</h3>
          {view.fullGapRecords.map((gap, i) => (
            <FullGapRecord key={gap.id ?? i} gap={gap} />
          ))}
        </div>
      )}

      {view.topGaps.length === 0 && !view.fullGapRecords?.length && (
        <p className="gap-ledger__empty">No gaps recorded yet. Run the Gap Definer to compute gaps.</p>
      )}
    </section>
  );
}

function FullGapRecord({ gap }: { gap: GapRecord }) {
  return (
    <article className="gap-record" aria-label={`Gap record: ${gap.id ?? gap.target}`}>
      <div className="gap-record__header">
        <h4 className="gap-record__title">{gap.id ?? gap.target}</h4>
        <GapStatusBadge status={gap.status} />
      </div>

      <dl className="gap-record__fields">
        <div className="gap-record__field">
          <dt>Target</dt>
          <dd>{gap.target}</dd>
        </div>
        <div className="gap-record__field">
          <dt>Dimension</dt>
          <dd>{gap.dimension}</dd>
        </div>
        {gap.desiredCondition && (
          <div className="gap-record__field gap-record__field--full">
            <dt>Desired Condition</dt>
            <dd>{gap.desiredCondition}</dd>
          </div>
        )}
        {gap.currentObservation && (
          <div className="gap-record__field gap-record__field--full">
            <dt>Current Observation</dt>
            <dd>{gap.currentObservation}</dd>
          </div>
        )}
      </dl>

      {/* Scores */}
      {gap.finalPriorityScore !== undefined && (
        <div className="gap-record__scores">
          {gap.confidenceGap !== undefined && <span className="gap-score-chip">Conf Gap: {gap.confidenceGap}</span>}
          {gap.evidenceWeakness !== undefined && <span className="gap-score-chip">Evid Weak: {gap.evidenceWeakness}</span>}
          {gap.painUncertainty !== undefined && <span className="gap-score-chip">Pain Uncert: {gap.painUncertainty}</span>}
          {gap.timePenalty !== undefined && <span className="gap-score-chip">Time Pen: {gap.timePenalty}</span>}
          {gap.blastRadiusWeight !== undefined && <span className="gap-score-chip">Blast: {gap.blastRadiusWeight}</span>}
          <span className="gap-score-chip gap-score-chip--total">Final: {gap.finalPriorityScore}</span>
        </div>
      )}

      {gap.recommendedAction && (
        <div className="gap-record__action">
          <h5 className="gap-record__action-title">Recommended Action</h5>
          {gap.recommendedAction.actionType && (
            <span className="gap-action-type">{gap.recommendedAction.actionType}</span>
          )}
          <p className="gap-record__action-desc">{gap.recommendedAction.description}</p>
          {gap.recommendedAction.expectedOutput && (
            <p className="gap-record__action-output">Expected: {gap.recommendedAction.expectedOutput}</p>
          )}
        </div>
      )}

      {gap.decisionRuleTriggered && (
        <p className="gap-record__rule">Rule: {gap.decisionRuleTriggered}</p>
      )}
    </article>
  );
}
