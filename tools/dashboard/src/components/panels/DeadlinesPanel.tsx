import type { DecisionDeadlinesView } from '../../model/types';
import { DeadlinesSummarySection } from './sections/DeadlinesSummarySection';
import { DecisionDeadlinesTableSection } from './sections/DecisionDeadlinesTableSection';
import { ForcedDispositionsSection } from './sections/ForcedDispositionsSection';

interface Props {
  view: DecisionDeadlinesView;
}

export function DeadlinesPanel({ view }: Props) {
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

      <DeadlinesSummarySection view={view} />
      <DecisionDeadlinesTableSection deadlines={view.deadlines} />
      <ForcedDispositionsSection forcedDispositions={view.forcedDispositions} />
    </section>
  );
}
