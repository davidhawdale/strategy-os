import type { QueueAction } from '../../../model/types';
import './QueueActionsSection.css';

interface Props {
  actions: QueueAction[];
}

function ActionTypeBadge({ type }: { type: string }) {
  return <span className={`queue-action-type queue-action-type--${type.toLowerCase()}`}>{type}</span>;
}

function ActionCard({ action }: { action: QueueAction }) {
  const accentCls = action.isUrgent
    ? 'queue-action-card--urgent'
    : action.gatedOn
    ? 'queue-action-card--gated'
    : 'queue-action-card--normal';

  return (
    <div className={`queue-action-card ${accentCls}`}>
      <div className="queue-action-card__header">
        <div className="queue-action-card__meta">
          <span className="queue-action-card__rank">#{action.rank}</span>
          <span className="queue-action-card__gap-id">{action.gapId}</span>
          <ActionTypeBadge type={action.actionType} />
        </div>
        <div className="queue-action-card__flags">
          {action.isUrgent && (
            <span className="queue-action-flag queue-action-flag--urgent">URGENT</span>
          )}
          {action.gatedOn && (
            <span className="queue-action-flag queue-action-flag--gated">
              Gated: {action.gatedOn}
            </span>
          )}
        </div>
      </div>

      <p className="queue-action-card__description">{action.description}</p>

      <div className="queue-action-card__footer">
        {action.deadline && (
          <span className="queue-action-card__deadline">{action.deadline}</span>
        )}
        {action.produces && (
          <span className="queue-action-card__produces">{action.produces}</span>
        )}
      </div>
    </div>
  );
}

export function QueueActionsSection({ actions }: Props) {
  if (actions.length === 0) return null;

  return (
    <section className="queue-section">
      <h3 className="queue-section__title">Priority Actions</h3>
      <div className="queue-actions-list">
        {actions.map(action => (
          <ActionCard key={action.rank} action={action} />
        ))}
      </div>
    </section>
  );
}
