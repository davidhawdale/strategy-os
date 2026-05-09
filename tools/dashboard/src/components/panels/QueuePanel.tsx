import type { ExecutionQueueView } from '../../model/types';
import { QueueActionsSection } from './sections/QueueActionsSection';
import { QueueBlockedPathsSection } from './sections/QueueBlockedPathsSection';
import { QueueHeaderSection } from './sections/QueueHeaderSection';
import { QueueNarrativeSection } from './sections/QueueNarrativeSection';
import { QueuePendingDecisionsSection } from './sections/QueuePendingDecisionsSection';
import './QueuePanel.css';

interface Props {
  view: ExecutionQueueView | null;
  onSelectEscalations?: () => void;
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
      <QueueHeaderSection view={view} />
      <QueueNarrativeSection narrative={view.narrative} />
      <QueueActionsSection actions={view.actions} />
      <QueuePendingDecisionsSection
        pendingDecisions={view.pendingDecisions}
        onSelectEscalations={onSelectEscalations}
      />
      <QueueBlockedPathsSection blockedPaths={view.blockedPaths} />
    </div>
  );
}
