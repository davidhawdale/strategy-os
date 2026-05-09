import type { EvidenceQualityView } from '../../../model/types';
import { TierBadge } from '../../shared/TierBadge';
import './EvidenceTierGapsSection.css';

interface Props {
  tierGaps: EvidenceQualityView['tierGaps'];
}

export function EvidenceTierGapsSection({ tierGaps }: Props) {
  if (tierGaps.length === 0) return null;

  return (
    <div className="tier-gaps">
      <h3 className="section-heading">Investigate: T3 Evidence in Validated Hypotheses</h3>
      <ul className="tier-gaps__list">
        {tierGaps.map((gap, i) => (
          <li key={i} className="tier-gap-item">
            <div className="tier-gap-item__header">
              <TierBadge tier={gap.item.tier} />
              <span className="tier-gap-item__hypothesis">{gap.hypothesis}</span>
            </div>
            <p className="tier-gap-item__detail">{gap.item.detail}</p>
            <p className="tier-gap-item__impact">{gap.impact}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
