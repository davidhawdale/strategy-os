import type { DecisionDeadlinesView } from '../../../model/types';
import './DeadlinesSummarySection.css';

interface Props {
  view: DecisionDeadlinesView;
}

export function DeadlinesSummarySection({ view }: Props) {
  if (view.deadlines.length === 0) return null;

  return (
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
  );
}
