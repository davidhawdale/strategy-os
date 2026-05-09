import type { EvidenceQualityView } from '../../../model/types';
import './EvidenceQualityOverviewSection.css';

interface Props {
  overall: EvidenceQualityView['overall'];
}

export function EvidenceQualityOverviewSection({ overall }: Props) {
  return (
    <div className="quality-overview">
      <div className="quality-gauge">
        <div className="quality-gauge__score">
          {Math.round(overall.qualityScore * 100)}
        </div>
        <div className="quality-gauge__label">Quality Score</div>
        <div className="quality-gauge__sublabel">{overall.totalEvidence} total evidence items</div>
      </div>
      <div className="quality-breakdown">
        <div className="quality-breakdown__item quality-breakdown__item--t1">
          <span className="quality-breakdown__count">{overall.tierBreakdown.t1}</span>
          <span className="quality-breakdown__label">T1 Direct</span>
        </div>
        <div className="quality-breakdown__item quality-breakdown__item--t2">
          <span className="quality-breakdown__count">{overall.tierBreakdown.t2}</span>
          <span className="quality-breakdown__label">T2 Inferred</span>
        </div>
        <div className="quality-breakdown__item quality-breakdown__item--t3">
          <span className="quality-breakdown__count">{overall.tierBreakdown.t3}</span>
          <span className="quality-breakdown__label">T3 Stated</span>
        </div>
      </div>
    </div>
  );
}
