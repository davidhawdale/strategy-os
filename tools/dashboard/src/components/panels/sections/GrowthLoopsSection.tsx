import type { GrowthLoop } from '../../../model/types';
import { InlineMarkdownText } from '../../shared/InlineMarkdownText';
import { TierBadge } from '../../shared/TierBadge';
import './GrowthLoopsSection.css';

interface Props {
  growthLoops: GrowthLoop[];
}

export function GrowthLoopsSection({ growthLoops }: Props) {
  if (growthLoops.length === 0) return null;

  return (
    <div className="growth-loops-section">
      <h4 className="proposal-subsection-heading">Growth Loops</h4>
      <div className="growth-loops-grid">
        {growthLoops.map((loop, i) => (
          <div key={i} className="growth-loop-tile">
            <div className="growth-loop-tile__header">
              <h5>{loop.name}</h5>
              {loop.tier && <TierBadge tier={loop.tier} />}
            </div>
            <p><InlineMarkdownText text={loop.mechanism} /></p>
          </div>
        ))}
      </div>
    </div>
  );
}
