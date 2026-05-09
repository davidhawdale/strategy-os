import type { ChannelStrategy } from '../../../model/types';
import { DataTable } from '../../shared/DataTable';
import { TierBadge } from '../../shared/TierBadge';
import './ChannelStrategySection.css';

interface Props {
  channelStrategy?: ChannelStrategy;
}

export function ChannelStrategySection({ channelStrategy }: Props) {
  if (!channelStrategy || channelStrategy.channels.length === 0) return null;

  return (
    <div className="detail-section">
      <h3 className="section-heading">Channel Strategy</h3>
      <DataTable
        caption="GTM channel strategy"
        columns={[
          { key: 'channel', header: 'Channel', render: r => r.channel },
          { key: 'reach', header: 'Segment Reach', render: r => r.segmentReach },
          { key: 'cac', header: 'CAC Estimate', render: r => r.cacEstimate },
          { key: 'split', header: 'Investment Split', render: r => r.investmentSplit },
          { key: 'tier', header: 'Tier', render: r => <TierBadge tier={r.tier} /> },
        ]}
        data={channelStrategy.channels}
        compact
      />
      {channelStrategy.coherence && (
        <p className="channel-meta"><strong>Coherence:</strong> {channelStrategy.coherence}</p>
      )}
      {channelStrategy.acvConstraint && (
        <p className="channel-meta"><strong>ACV constraint:</strong> {channelStrategy.acvConstraint}</p>
      )}
      {channelStrategy.sequencingRationale && (
        <p className="channel-meta"><strong>Sequencing:</strong> {channelStrategy.sequencingRationale}</p>
      )}
    </div>
  );
}
