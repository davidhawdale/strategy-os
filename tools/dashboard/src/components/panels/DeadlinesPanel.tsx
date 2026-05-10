import type { DecisionDeadlinesView } from '../../model/types';
import { DeadlinesSummarySection } from './sections/DeadlinesSummarySection';
import { DecisionDeadlinesTableSection } from './sections/DecisionDeadlinesTableSection';
import { ForcedDispositionsSection } from './sections/ForcedDispositionsSection';
import { renderOrderedSections } from './sections/renderOrderedSections';

interface Props {
  view: DecisionDeadlinesView;
  sectionOrder?: string[];
}

export function DeadlinesPanel({ view, sectionOrder }: Props) {
  return (
    <section
      id="panel-deadlines"
      role="tabpanel"
      aria-label="Decision Deadlines"
      className="panel"
    >
      <div className="panel__header">
        <h2 className="panel__title">Decision Deadlines</h2>
        <p className="panel__subtitle">Hypothesis validation deadlines and forced outcomes</p>
      </div>

      {renderOrderedSections(sectionOrder, [
        { id: 'summary', render: () => <DeadlinesSummarySection view={view} /> },
        { id: 'decisionDeadlines', render: () => <DecisionDeadlinesTableSection deadlines={view.deadlines} /> },
        { id: 'forcedDispositions', render: () => <ForcedDispositionsSection forcedDispositions={view.forcedDispositions} /> },
      ])}
    </section>
  );
}
