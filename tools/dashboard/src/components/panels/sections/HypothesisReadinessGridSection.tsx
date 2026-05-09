import type { HypothesisId, ReadinessView } from '../../../model/types';
import { ConfidenceBadge } from '../../shared/ConfidenceBadge';
import { EvidenceBar } from '../../shared/EvidenceBar';
import './HypothesisReadinessGridSection.css';

interface Props {
  hypotheses: ReadinessView['hypothesisSummary'];
  onSelectHypothesis: (id: HypothesisId) => void;
}

export function HypothesisReadinessGridSection({ hypotheses, onSelectHypothesis }: Props) {
  return (
    <div className="hypothesis-grid">
      {hypotheses.map(hypothesis => (
        <button
          key={hypothesis.id}
          className="hypothesis-card"
          onClick={() => onSelectHypothesis(hypothesis.id)}
          aria-label={`View ${hypothesis.label} hypothesis details`}
        >
          <div className="hypothesis-card__header">
            <h3 className="hypothesis-card__title">{hypothesis.label}</h3>
            <ConfidenceBadge confidence={hypothesis.confidence} />
          </div>

          <div className="hypothesis-card__evidence">
            <EvidenceBar
              t1={hypothesis.t1Count}
              t2={hypothesis.t2Count}
              t3={hypothesis.t3Count}
              total={hypothesis.evidenceCount}
            />
          </div>

          <div className="hypothesis-card__stats">
            <div className="hypothesis-card__stat">
              <span className="hypothesis-card__stat-value">{hypothesis.assumptionCount}</span>
              <span className="hypothesis-card__stat-label">Assumptions</span>
            </div>
            <div className="hypothesis-card__stat">
              <span className={`hypothesis-card__stat-value ${hypothesis.highBlastCount > 0 ? 'hypothesis-card__stat-value--danger' : ''}`}>
                {hypothesis.highBlastCount}
              </span>
              <span className="hypothesis-card__stat-label">HIGH Blast</span>
            </div>
            <div className="hypothesis-card__stat">
              <span className={`hypothesis-card__stat-value ${hypothesis.hasKillCondition ? '' : 'hypothesis-card__stat-value--warn'}`}>
                {hypothesis.hasKillCondition ? 'Yes' : 'No'}
              </span>
              <span className="hypothesis-card__stat-label">Kill Signal</span>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
