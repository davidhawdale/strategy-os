import type { ModeThreshold } from '../../../model/types';
import { InlineMarkdownText } from '../../shared/InlineMarkdownText';
import { TierBadge } from '../../shared/TierBadge';
import { DataTable } from '../../shared/DataTable';
import './ModeThresholdsSection.css';

interface Props {
  modeThresholds: ModeThreshold[];
}

export function ModeThresholdsSection({ modeThresholds }: Props) {
  if (modeThresholds.length === 0) return null;

  const hasPassFail = modeThresholds.some(m => m.passFail && !m.tier);
  const hasTier = modeThresholds.some(m => m.tier);
  const hasSource = modeThresholds.some(m => m.source);

  return (
    <div className="detail-section">
      <h3 className="section-heading">Mode Thresholds</h3>
      <DataTable
        caption="Mode threshold assessment"
        columns={[
          { key: 'metric',   header: 'Threshold',  render: r => r.metric },
          { key: 'required', header: 'Required',   render: r => r.required },
          { key: 'estimate', header: 'Estimate',   render: r => r.estimate },
          ...(hasTier ? [{ key: 'tier', header: 'Tier', render: (r: ModeThreshold) => <TierBadge tier={r.tier} /> }] : []),
          ...(hasPassFail ? [{ key: 'passFail', header: 'Pass/Fail', render: (r: ModeThreshold) => r.passFail ?? '' }] : []),
          ...(hasSource ? [{ key: 'source', header: 'Source', render: (r: ModeThreshold) => <InlineMarkdownText text={r.source} /> }] : []),
        ]}
        data={modeThresholds}
        compact
      />
    </div>
  );
}
