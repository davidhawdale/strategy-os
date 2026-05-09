import type { DecisionDeadline } from '../../../model/types';
import './DecisionDeadlinesTableSection.css';

interface Props {
  deadlines: DecisionDeadline[];
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

export function DecisionDeadlinesTableSection({ deadlines }: Props) {
  if (deadlines.length === 0) {
    return (
      <div className="deadlines-empty" role="status">
        <p>No decision deadlines recorded in the gap ledger.</p>
      </div>
    );
  }

  return (
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
          {deadlines.map((deadline, i) => (
            <tr key={i} className={deadlineRowClass(deadline)}>
              <td className="data-table__cell">{deadline.target}</td>
              <td className="data-table__cell">{deadline.dueDate}</td>
              <td className="data-table__cell">
                {deadline.currentIteration !== undefined && deadline.maxIterations !== undefined
                  ? `${deadline.currentIteration}/${deadline.maxIterations}`
                  : '-'}
              </td>
              <td className="data-table__cell">
                <DeadlineStatusBadge status={deadline.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
