import type { ExecutionQueueView, QueueAction, BlockedPath, PendingDecision } from '../../model/types';

interface Props {
  view: ExecutionQueueView | null;
  onSelectEscalations?: () => void;
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

function PendingDecisionItem({ item, onViewAll }: { item: PendingDecision; onViewAll?: () => void }) {
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

function BlockedItem({ item }: { item: BlockedPath }) {
  return (
    <li className="queue-blocked-item">
      <span className="queue-blocked-item__mark">×</span>
      <div className="queue-blocked-item__body">
        <span className="queue-blocked-item__path">{item.path}</span>
        {item.blocker && (
          <span className="queue-blocked-item__blocker">{item.blocker}</span>
        )}
      </div>
    </li>
  );
}

export function QueuePanel({ view, onSelectEscalations }: Props) {
  if (!view) {
    return (
      <div className="queue-panel queue-panel--empty">
        <p className="queue-empty-message">
          No execution queue found. Run Gap Definer to generate actions.
        </p>
      </div>
    );
  }

  return (
    <div className="queue-panel">
      {/* Header */}
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

      {/* Narrative */}
      {view.narrative && (
        <div className="queue-narrative">
          <p className="queue-narrative__text">{view.narrative}</p>
        </div>
      )}

      {/* Priority Actions */}
      {view.actions.length > 0 && (
        <section className="queue-section">
          <h3 className="queue-section__title">Priority Actions</h3>
          <div className="queue-actions-list">
            {view.actions.map(action => (
              <ActionCard key={action.rank} action={action} />
            ))}
          </div>
        </section>
      )}

      {/* Pending Governor Decisions */}
      {view.pendingDecisions.length > 0 && (
        <section className="queue-section">
          <h3 className="queue-section__title">
            Decisions Needed
            <span className="queue-section__count">{view.pendingDecisions.length}</span>
          </h3>
          <div className="queue-pending-list">
            {view.pendingDecisions.map((item, i) => (
              <PendingDecisionItem key={i} item={item} onViewAll={onSelectEscalations} />
            ))}
            {onSelectEscalations && (
              <button className="queue-pending-viewall" onClick={onSelectEscalations}>
                View full decision details →
              </button>
            )}
          </div>
        </section>
      )}

      {/* Blocked Paths */}
      {view.blockedPaths.length > 0 && (
        <section className="queue-section">
          <h3 className="queue-section__title">
            Blocked Paths
            <span className="queue-section__count">{view.blockedPaths.length}</span>
          </h3>
          <ul className="queue-blocked-list">
            {view.blockedPaths.map((item, i) => (
              <BlockedItem key={i} item={item} />
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
