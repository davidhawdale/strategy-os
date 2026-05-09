import type { DestructionView } from '../../../model/types';
import { DataTable } from '../../shared/DataTable';
import './ConstraintInversionsSection.css';

interface Props {
  constraintInversions?: DestructionView['constraintInversions'];
}

export function ConstraintInversionsSection({ constraintInversions }: Props) {
  if (!constraintInversions) return null;

  return (
    <div className="destruction-section">
      <h3 className="section-heading">Constraint Inversions</h3>
      <div className="inversion-summary">
        <span className="inversion-summary__item inversion-summary__item--survives">
          {constraintInversions.survives} Survives
        </span>
        <span className="inversion-summary__item inversion-summary__item--fails">
          {constraintInversions.fails} Fails
        </span>
        <span className="inversion-summary__item inversion-summary__item--marginal">
          {constraintInversions.withModification} With Modification
        </span>
      </div>
      <DataTable
        caption="Constraint inversion analysis"
        columns={[
          { key: 'assumption', header: 'Assumption Inverted', render: r => r.assumption },
          { key: 'consequence', header: 'Consequence', render: r => r.consequence },
          {
            key: 'survives',
            header: 'Survives?',
            render: r => {
              const cls = /^Yes/i.test(r.survives) ? 'text-passes'
                : /^No/i.test(r.survives) ? 'text-fails'
                : 'text-warning';
              return <span className={cls}>{r.survives}</span>;
            },
          },
        ]}
        data={constraintInversions.entries}
      />
    </div>
  );
}
