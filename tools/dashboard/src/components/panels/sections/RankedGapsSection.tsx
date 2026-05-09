import type { GapLedgerEntry } from '../../../model/types';
import { GapStatusBadge } from '../../shared/GapStatusBadge';
import './RankedGapsSection.css';

interface Props {
  gaps: GapLedgerEntry[];
}

function ScoreCell({ score }: { score?: number }) {
  if (score === undefined) return <td className="data-table__cell">-</td>;
  const cls =
    score >= 6 ? 'score score--high' : score >= 3 ? 'score score--medium' : 'score score--low';
  return <td className="data-table__cell"><span className={cls}>{score}</span></td>;
}

export function RankedGapsSection({ gaps }: Props) {
  if (gaps.length === 0) return null;

  return (
    <div className="gap-ledger__ranked">
      <h3 className="gap-ledger__section-title">Ranked Gaps</h3>
      <div className="data-table-wrapper" role="region" aria-label="Ranked gaps table">
        <table className="data-table">
          <thead>
            <tr>
              <th className="data-table__header" scope="col">ID</th>
              <th className="data-table__header" scope="col">#</th>
              <th className="data-table__header" scope="col">Target</th>
              <th className="data-table__header" scope="col">Dimension</th>
              <th className="data-table__header" scope="col">Priority</th>
              <th className="data-table__header" scope="col">Action</th>
              <th className="data-table__header" scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {gaps.map((gap, i) => (
              <tr key={i} className="data-table__row">
                <td className="data-table__cell">
                  {gap.id
                    ? <a href={`#gap-record-${gap.id}`} className="gap-id-link">{gap.id}</a>
                    : '-'}
                </td>
                <td className="data-table__cell">{gap.rank ?? i + 1}</td>
                <td className="data-table__cell">{gap.target}</td>
                <td className="data-table__cell">{gap.dimension}</td>
                <ScoreCell score={gap.priorityScore} />
                <td className="data-table__cell">{gap.recommendedAction}</td>
                <td className="data-table__cell"><GapStatusBadge status={gap.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
