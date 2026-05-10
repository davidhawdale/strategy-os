import type { CostStructure } from '../../../model/types';
import { DataTable } from '../../shared/DataTable';
import { InlineMarkdownText } from '../../shared/InlineMarkdownText';
import { TierBadge } from '../../shared/TierBadge';
import './CostStructureSection.css';

interface Props {
  costStructure?: CostStructure;
}

export function CostStructureSection({ costStructure }: Props) {
  if (!costStructure || costStructure.entries.length === 0) return null;

  return (
    <div className="detail-section">
      <h3 className="section-heading">Cost Structure</h3>
      <DataTable
        caption="Monthly cost structure"
        columns={[
          { key: 'category', header: 'Category', render: r => r.category },
          { key: 'items', header: 'Items', render: r => r.items || '' },
          { key: 'monthly', header: 'Monthly', render: r => r.monthlyCostRange },
          { key: 'tier', header: 'Tier', render: r => <TierBadge tier={r.tier} /> },
          { key: 'source', header: 'Source', render: r => <InlineMarkdownText text={r.source} /> },
        ]}
        data={costStructure.entries}
        compact
      />
    </div>
  );
}
