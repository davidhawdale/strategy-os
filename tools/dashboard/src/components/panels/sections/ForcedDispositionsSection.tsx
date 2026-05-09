import type { DecisionDeadlinesView } from '../../../model/types';
import './ForcedDispositionsSection.css';

interface Props {
  forcedDispositions: DecisionDeadlinesView['forcedDispositions'];
}

export function ForcedDispositionsSection({ forcedDispositions }: Props) {
  if (forcedDispositions.length === 0) return null;

  return (
    <div className="deadlines-forced">
      <h3 className="deadlines-forced__title">Forced Dispositions</h3>
      <p className="deadlines-forced__desc">
        The deadline rule has forced outcomes for the following targets.
      </p>
      <div className="data-table-wrapper" role="region" aria-label="Forced dispositions">
        <table className="data-table">
          <thead>
            <tr>
              <th className="data-table__header" scope="col">Target</th>
              <th className="data-table__header" scope="col">Due Date</th>
              <th className="data-table__header" scope="col">Forced Outcome</th>
            </tr>
          </thead>
          <tbody>
            {forcedDispositions.map((disposition, i) => (
              <tr key={i} className="data-table__row deadlines-table__row--exceeded">
                <td className="data-table__cell">{disposition.target}</td>
                <td className="data-table__cell">{disposition.dueDate}</td>
                <td className="data-table__cell">
                  <span className="forced-outcome">{disposition.forcedOutcome}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
