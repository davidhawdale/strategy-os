import type { DecisionDeadlinesView, DecisionDeadline } from '../../model/types';

interface Props {
  view: DecisionDeadlinesView;
}

function DeadlineStatusBadge({ status }: { status: DecisionDeadline['status'] }) {
  const cls = {
    OPEN: 'deadline-status deadline-status--open',
    DUE: 'deadline-status deadline-status--due',
    EXCEEDED: 'deadline-status deadline-status--exceeded',
    RESOLVED: 'deadline-status deadline-status--resolved',
  }[status];
  return <span className={cls}>{status}</span>;
}

function deadlineRowClass(deadline: DecisionDeadline): string {
  if (deadline.status === 'EXCEEDED') return 'deadlines-table__row deadlines-table__row--exceeded';
  if (deadline.status === 'DUE') return 'deadlines-table__row deadlines-table__row--due';
  return 'deadlines-table__row';
}

export function DeadlinesPanel({ view }: Props) {
  const hasDeadlines = view.deadlines.length > 0;
  const hasForcedDispositions = view.forcedDispositions.length > 0;

  return (
    <section
      id="panel-deadlines"
      role="tabpanel"
      aria-label="Decision Deadlines"
      className="panel"
    >
      <div className="panel__header">
        <h2 className="panel__title">Decision Deadlines</h2>
        <p className="panel__subtitle">Hypothesis validation deadlines and forced outcomes</p>
      </div>

      {/* Summary stats */}
      {hasDeadlines && (
        <div className="deadlines-summary">
          <div className={`deadlines-stat ${view.exceededCount > 0 ? 'deadlines-stat--danger' : ''}`}>
            <span className="deadlines-stat__value">{view.exceededCount}</span>
            <span className="deadlines-stat__label">Exceeded</span>
          </div>
          <div className={`deadlines-stat ${view.approachingCount > 0 ? 'deadlines-stat--warn' : ''}`}>
            <span className="deadlines-stat__value">{view.approachingCount}</span>
            <span className="deadlines-stat__label">Due Soon</span>
          </div>
          <div className="deadlines-stat">
            <span className="deadlines-stat__value">{view.deadlines.length}</span>
            <span className="deadlines-stat__label">Total</span>
          </div>
        </div>
      )}

      {/* Deadlines table */}
      {hasDeadlines ? (
        <div className="data-table-wrapper" role="region" aria-label="Decision deadlines table">
          <table className="data-table deadlines-table">
            <thead>
              <tr>
                <th className="data-table__header" scope="col">Target</th>
                <th className="data-table__header" scope="col">Due Date</th>
                <th className="data-table__header" scope="col">Iteration</th>
                <th className="data-table__header" scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {view.deadlines.map((d, i) => (
                <tr key={i} className={deadlineRowClass(d)}>
                  <td className="data-table__cell">{d.target}</td>
                  <td className="data-table__cell">{d.dueDate}</td>
                  <td className="data-table__cell">
                    {d.currentIteration !== undefined && d.maxIterations !== undefined
                      ? `${d.currentIteration}/${d.maxIterations}`
                      : '—'}
                  </td>
                  <td className="data-table__cell">
                    <DeadlineStatusBadge status={d.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="deadlines-empty">No decision deadlines recorded in the gap ledger.</p>
      )}

      {/* Forced dispositions from gap analysis */}
      {hasForcedDispositions && (
        <div className="deadlines-forced">
          <h3 className="deadlines-forced__title">Forced Dispositions</h3>
          <p className="deadlines-forced__desc">
            The deadline rule has forced outcomes for the following targets.
          </p>
          <div className="data-table-wrapper" role="region" aria-label="Forced dispositions">
            <table className="data-table">
              <thead>
                <tr>
                  <th className="data-table__header" scope="col">Target</th>
                  <th className="data-table__header" scope="col">Due Date</th>
                  <th className="data-table__header" scope="col">Forced Outcome</th>
                </tr>
              </thead>
              <tbody>
                {view.forcedDispositions.map((d, i) => (
                  <tr key={i} className="data-table__row deadlines-table__row--exceeded">
                    <td className="data-table__cell">{d.target}</td>
                    <td className="data-table__cell">{d.dueDate}</td>
                    <td className="data-table__cell">
                      <span className="forced-outcome">{d.forcedOutcome}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}
