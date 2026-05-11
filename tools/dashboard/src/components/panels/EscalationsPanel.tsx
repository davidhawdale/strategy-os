import type { GovernorEscalationsView } from '../../model/types';
import { EscalationListSection } from './sections/EscalationListSection';
import { renderOrderedSections } from './sections/renderOrderedSections';
import './EscalationsPanel.css';

interface Props {
  view: GovernorEscalationsView;
  sectionOrder?: string[];
}

export function EscalationsPanel({ view, sectionOrder }: Props) {
  const approvedCount = view.resolvedEscalations.length;

  return (
    <section
      id="panel-escalations"
      role="tabpanel"
      aria-label="Governor Escalation"
      className="panel escalations-panel"
    >
      <div className="escalations-panel__header">
        <h2 className="escalations-panel__title">Governor Escalation</h2>
        <p className="escalations-panel__subtitle">Review and approve strategic decisions requiring human judgment</p>
        <div className="escalations-panel__summary" aria-label="Decision summary">
          <span className="escalations-panel__summary-item escalations-panel__summary-item--open">
            <span className="escalations-panel__summary-dot" aria-hidden="true" />
            {view.totalOpen} Open
          </span>
          <span className="escalations-panel__summary-item escalations-panel__summary-item--approved">
            <span className="escalations-panel__summary-dot" aria-hidden="true" />
            {approvedCount} Approved
          </span>
        </div>
      </div>

      {view.openEscalations.length === 0 && view.resolvedEscalations.length === 0 && (
        <div className="escalations-empty">
          <p className="escalations-empty__message">
            No governor escalations recorded. Gap Definer has not flagged any decisions for escalation.
          </p>
        </div>
      )}

      {renderOrderedSections(sectionOrder, [
        { id: 'openEscalations', render: () => <EscalationListSection title="Open" escalations={view.openEscalations} /> },
        { id: 'resolvedEscalations', render: () => <EscalationListSection title="Resolved" escalations={view.resolvedEscalations} resolved /> },
      ])}
    </section>
  );
}
