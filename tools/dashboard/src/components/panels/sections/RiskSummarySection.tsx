import type { RiskMapView } from '../../../model/types';
import './RiskSummarySection.css';

const RISK_ORDER = ['critical', 'high', 'medium', 'low'] as const;

interface Props {
  byCriticality: RiskMapView['byCriticality'];
}

export function RiskSummarySection({ byCriticality }: Props) {
  return (
    <div className="risk-summary">
      {RISK_ORDER.map(level => (
        <div key={level} className={`risk-counter risk-counter--${level}`}>
          <span className="risk-counter__value">{byCriticality[level]}</span>
          <span className="risk-counter__label">{level}</span>
        </div>
      ))}
    </div>
  );
}
