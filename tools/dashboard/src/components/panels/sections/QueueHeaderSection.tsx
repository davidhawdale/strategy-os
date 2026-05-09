import type { ExecutionQueueView } from '../../../model/types';
import './QueueHeaderSection.css';

interface Props {
  view: ExecutionQueueView;
}

function DecisionStateBadge({ state }: { state: string }) {
  const cls = state === 'GO'
    ? 'queue-decision--go'
    : state === 'NO_GO'
    ? 'queue-decision--no-go'
    : state === 'BLOCKED'
    ? 'queue-decision--blocked'
    : 'queue-decision--conditional';

  const label = state.replace(/_/g, ' ');
  return <span className={`queue-decision-badge ${cls}`}>{label}</span>;
}

export function QueueHeaderSection({ view }: Props) {
  return (
    <div className="queue-header">
      <div className="queue-header__title-row">
        <h2 className="queue-header__title">Now</h2>
        <DecisionStateBadge state={view.decisionState} />
      </div>
      <div className="queue-header__meta">
        {view.passNumber !== undefined && (
          <span className="queue-header__meta-item">Pass {view.passNumber}</span>
        )}
        {view.passDate && (
          <span className="queue-header__meta-item">{view.passDate}</span>
        )}
        <span className={`queue-header__readiness ${view.sellReady ? 'queue-header__readiness--yes' : 'queue-header__readiness--no'}`}>
          Sell Ready: {view.sellReady ? 'Yes' : 'No'}
        </span>
        <span className={`queue-header__readiness ${view.scaleReady ? 'queue-header__readiness--yes' : 'queue-header__readiness--no'}`}>
          Scale Ready: {view.scaleReady ? 'Yes' : 'No'}
        </span>
      </div>
    </div>
  );
}
