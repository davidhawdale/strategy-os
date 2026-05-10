import type { ExecutionQueueView } from '../../model/types';
import { QueueActionsSection } from './sections/QueueActionsSection';
import { QueueBlockedPathsSection } from './sections/QueueBlockedPathsSection';
import { QueueHeaderSection } from './sections/QueueHeaderSection';
import { QueueNarrativeSection } from './sections/QueueNarrativeSection';
import { QueuePendingDecisionsSection } from './sections/QueuePendingDecisionsSection';
import { QueueWorkItemsSection } from './sections/QueueWorkItemsSection';
import { renderOrderedSections } from './sections/renderOrderedSections';
import './QueuePanel.css';

interface Props {
  view: ExecutionQueueView | null;
  onSelectEscalations?: () => void;
  sectionOrder?: string[];
}

export function QueuePanel({ view, onSelectEscalations, sectionOrder }: Props) {
  if (!view) {
    return (
      <section id="panel-queue" role="tabpanel" aria-label="Execution Queue" className="panel queue-panel queue-panel--empty">
        <p className="queue-empty-message">
          No execution queue found. Run Gap Definer to generate actions.
        </p>
      </section>
    );
  }

  return (
    <section id="panel-queue" role="tabpanel" aria-label="Execution Queue" className="panel queue-panel">
      {renderOrderedSections(sectionOrder, [
        { id: 'header', render: () => <QueueHeaderSection view={view} /> },
        { id: 'narrative', render: () => <QueueNarrativeSection narrative={view.narrative} /> },
        { id: 'actions', render: () => <QueueActionsSection actions={view.actions} /> },
        { id: 'workItems', render: () => <QueueWorkItemsSection workItems={view.workItems} /> },
        {
          id: 'pendingDecisions',
          render: () => (
            <QueuePendingDecisionsSection
              pendingDecisions={view.pendingDecisions}
              onSelectEscalations={onSelectEscalations}
            />
          ),
        },
        { id: 'blockedPaths', render: () => <QueueBlockedPathsSection blockedPaths={view.blockedPaths} /> },
      ])}
    </section>
  );
}
