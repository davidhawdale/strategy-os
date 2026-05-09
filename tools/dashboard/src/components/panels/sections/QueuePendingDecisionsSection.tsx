import type { PendingDecision } from '../../../model/types';
import './QueuePendingDecisionsSection.css';

interface Props {
  pendingDecisions: PendingDecision[];
  onSelectEscalations?: () => void;
}

function PendingDecisionItem({ item }: { item: PendingDecision }) {
  return (
    <div className={`queue-pending-item ${item.isOverdue ? 'queue-pending-item--overdue' : ''}`}>
      <div className="queue-pending-item__header">
        {item.id && <span className="queue-pending-item__id">{item.id}</span>}
        <span className="queue-pending-item__title">{item.title}</span>
        {item.isOverdue && <span className="queue-pending-item__overdue">OVERDUE</span>}
      </div>
      {item.whatIsAtStake && (
        <p className="queue-pending-item__stake">{item.whatIsAtStake}</p>
      )}
    </div>
  );
}

export function QueuePendingDecisionsSection({ pendingDecisions, onSelectEscalations }: Props) {
  if (pendingDecisions.length === 0) return null;

  return (
    <section className="queue-section">
      <h3 className="queue-section__title">
        Decisions Needed
        <span className="queue-section__count">{pendingDecisions.length}</span>
      </h3>
      <div className="queue-pending-list">
        {pendingDecisions.map((item, i) => (
          <PendingDecisionItem key={i} item={item} />
        ))}
        {onSelectEscalations && (
          <button className="queue-pending-viewall" onClick={onSelectEscalations}>
            View full decision details {'\u2192'}
          </button>
        )}
      </div>
    </section>
  );
}
