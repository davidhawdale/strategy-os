import type { HypothesisId, RiskMapView } from '../../../model/types';
import './KillSignalsSection.css';

const HYPOTHESIS_LABELS: Record<HypothesisId, string> = {
  problem: 'Problem',
  segment: 'Segment',
  unitEconomics: 'Unit Economics',
  valueProposition: 'Value Proposition',
};

interface Props {
  killConditions: RiskMapView['killConditions'];
}

export function KillSignalsSection({ killConditions }: Props) {
  if (killConditions.length === 0) return null;

  return (
    <div className="kill-conditions">
      <h3 className="section-heading">Kill Signals</h3>
      <ul className="kill-conditions__list">
        {killConditions.map((killCondition, i) => (
          <li key={i} className="kill-condition-item">
            <span className="kill-condition-item__hypothesis">{HYPOTHESIS_LABELS[killCondition.hypothesis]}</span>
            <p className="kill-condition-item__text">{killCondition.condition}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
