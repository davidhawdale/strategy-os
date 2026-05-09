import type { Escalation } from '../../../model/types';
import { BlastRadiusBadge } from '../../shared/BlastRadiusBadge';
import './EscalationCardSection.css';

interface Props {
  escalation: Escalation;
}

function DecisionTypeBadge({ type }: { type?: Escalation['decisionType'] }) {
  if (!type) return null;
  return <span className={`decision-type decision-type--${type.toLowerCase()}`}>{type}</span>;
}

export function EscalationCardSection({ escalation }: Props) {
  return (
    <article
      className={`escalation-card escalation-card--${escalation.status.toLowerCase()}`}
      aria-label={`Escalation: ${escalation.title}`}
    >
      <div className="escalation-card__header">
        <div className="escalation-card__title-row">
          <h3 className="escalation-card__title">{escalation.title}</h3>
          <span className={`escalation-status escalation-status--${escalation.status.toLowerCase()}`}>
            {escalation.status}
          </span>
        </div>
        <div className="escalation-card__badges">
          {escalation.decisionType && <DecisionTypeBadge type={escalation.decisionType} />}
          {escalation.blastRadius && <BlastRadiusBadge radius={escalation.blastRadius} />}
        </div>
      </div>

      <div className="escalation-card__body">
        <div className="escalation-card__field">
          <span className="escalation-card__field-label">Decision Needed</span>
          <p className="escalation-card__field-value">{escalation.decisionNeeded}</p>
        </div>

        {escalation.whySystemCannotDecide && (
          <div className="escalation-card__field">
            <span className="escalation-card__field-label">Why System Cannot Decide</span>
            <p className="escalation-card__field-value">{escalation.whySystemCannotDecide}</p>
          </div>
        )}

        {escalation.options.length > 0 && (
          <div className="escalation-card__options">
            <span className="escalation-card__field-label">Options</span>
            <ul className="escalation-options-list">
              {escalation.options.map((opt, i) => (
                <li key={i} className="escalation-options-list__item">
                  <span className="escalation-options-list__label">{opt.label}:</span>
                  <span className="escalation-options-list__option">{opt.option}</span>
                  <span className="escalation-options-list__consequence">
                    {'\u2192'} {opt.consequence}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {escalation.systemRecommendation && (
          <div className="escalation-card__field">
            <span className="escalation-card__field-label">System Recommendation</span>
            <p className="escalation-card__field-value escalation-card__field-value--recommendation">
              {escalation.systemRecommendation}
            </p>
          </div>
        )}

        {escalation.whatIsAtStake && (
          <div className="escalation-card__field">
            <span className="escalation-card__field-label">What Is at Stake</span>
            <p className="escalation-card__field-value escalation-card__field-value--stake">
              {escalation.whatIsAtStake}
            </p>
          </div>
        )}

        {escalation.queueFileNote && (
          <div className="escalation-queue-note">
            <span className="escalation-card__field-label">See queue files</span>
            <p className="escalation-queue-note__text">{escalation.queueFileNote}</p>
          </div>
        )}
      </div>
    </article>
  );
}
