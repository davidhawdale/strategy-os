import type { GovernorEscalationsView } from '../../model/types';
import { EscalationListSection } from './sections/EscalationListSection';

interface Props {
  view: GovernorEscalationsView;
}

export function EscalationsPanel({ view }: Props) {
  return (
    <section
      id="panel-escalations"
      role="tabpanel"
      aria-label="Governor Escalations"
      className="panel"
    >
      <div className="panel__header">
        <div className="panel__title-row">
          <h2 className="panel__title">Governor Escalations</h2>
          {view.totalOpen > 0 && (
            <span
              className="escalations-badge"
              aria-label={`${view.totalOpen} open escalation${view.totalOpen === 1 ? '' : 's'}`}
            >
              {view.totalOpen}
            </span>
          )}
        </div>
        <p className="panel__subtitle">Decisions the system cannot make — Governor must resolve</p>
      </div>

      {view.openEscalations.length === 0 && view.resolvedEscalations.length === 0 && (
        <div className="escalations-empty">
          <p className="escalations-empty__message">
            No governor escalations recorded. Gap Definer has not flagged any decisions for escalation.
          </p>
        </div>
      )}

      <EscalationListSection title="Open" escalations={view.openEscalations} />
      <EscalationListSection title="Resolved" escalations={view.resolvedEscalations} resolved />
    </section>
  );
}
