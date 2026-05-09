import type { DestructionView } from '../../../model/types';
import { DataTable } from '../../shared/DataTable';
import './ContradictionsSection.css';

interface Props {
  contradictions?: DestructionView['contradictions'];
}

export function ContradictionsSection({ contradictions }: Props) {
  if (!contradictions || contradictions.length === 0) return null;

  return (
    <div className="destruction-section">
      <h3 className="section-heading">
        Contradictions
        <span className="section-heading__count">{contradictions.length}</span>
      </h3>
      <DataTable
        caption="Blocking contradictions"
        columns={[
          { key: 'id', header: 'ID', render: r => r.id ?? '-' },
          { key: 'between', header: 'Between', render: r => r.between },
          { key: 'description', header: 'Description', render: r => r.description },
          { key: 'impact', header: 'Impact', render: r => r.impact },
          { key: 'resolution', header: 'Resolution', render: r => r.requiredResolution },
          {
            key: 'blocks',
            header: 'Blocks?',
            render: r => <span className={r.blockExecution ? 'text-fails' : 'text-muted'}>{r.blockExecution ? 'Yes' : 'No'}</span>,
          },
        ]}
        data={contradictions}
        compact
      />
    </div>
  );
}
