import type { DestructionView } from '../../../model/types';
import { DataTable } from '../../shared/DataTable';
import { InlineMarkdownText } from '../../shared/InlineMarkdownText';
import './EvidenceConcentrationSection.css';

interface Props {
  evidenceConcentration?: DestructionView['evidenceConcentration'];
}

export function EvidenceConcentrationSection({ evidenceConcentration }: Props) {
  if (!evidenceConcentration) return null;

  return (
    <div className="destruction-section">
      <h3 className="section-heading">Evidence Concentration Risk</h3>
      <DataTable
        caption="Evidence concentration analysis"
        columns={[
          { key: 'source', header: 'Source', render: r => <InlineMarkdownText text={r.source} /> },
          { key: 'supports', header: 'Hypotheses Supported', render: r => r.hypothesesSupported },
          {
            key: 'risk',
            header: 'Risk Level',
            render: r => {
              const isHigh = /HIGH|CONCENTRATED/i.test(r.riskLevel);
              return <span className={isHigh ? 'text-fails' : 'text-muted'}>{r.riskLevel}</span>;
            },
          },
        ]}
        data={evidenceConcentration.entries}
      />
    </div>
  );
}
