import type { GovernorEscalationCard } from '../../../model/types';
import './EscalationCardSection.css';

interface Props {
  escalation: GovernorEscalationCard;
}

function renderSourceMeta(escalation: GovernorEscalationCard) {
  const items = [
    escalation.sourceFileName && ['Source', escalation.sourceFileName],
    escalation.raisedBy && ['Raised by', escalation.raisedBy],
    escalation.date && ['Date', escalation.date],
  ].filter(Boolean) as string[][];

  if (items.length === 0) return null;

  return (
    <dl className="escalation-source-meta">
      {items.map(([label, value]) => (
        <div key={label} className="escalation-source-meta__item">
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function statusLabel(status: GovernorEscalationCard['status']) {
  return status === 'RESOLVED' ? 'Approved' : 'Decision Needed';
}

export function EscalationCardSection({ escalation }: Props) {
  const hasRecommendedOption = escalation.options.some(option => option.recommended);

  return (
    <article
      className={`escalation-card escalation-card--${escalation.status.toLowerCase()}`}
      aria-label={`Escalation: ${escalation.title}`}
    >
      <div className="escalation-card__header">
        <div className="escalation-card__title-row">
          <h3 className="escalation-card__title">{escalation.title}</h3>
          <span className={`escalation-status escalation-status--${escalation.status.toLowerCase()}`}>
            {statusLabel(escalation.status)}
          </span>
        </div>
        {renderSourceMeta(escalation)}
      </div>

      <div className="escalation-card__body">
        <section className="escalation-card__section">
          <span className="escalation-card__field-label">Decision Context</span>
          <p className="escalation-card__field-value">{escalation.decisionNeeded}</p>
        </section>

        {escalation.whySystemCannotDecide && (
          <section className="escalation-card__section escalation-card__section--cannot-decide">
            <span className="escalation-card__field-label">Why System Cannot Decide</span>
            <p className="escalation-card__field-value">{escalation.whySystemCannotDecide}</p>
          </section>
        )}

        {escalation.options.length > 0 && (
          <section className="escalation-card__section escalation-card__options">
            <span className="escalation-card__field-label">System Options</span>
            <ul className="escalation-options-list">
              {escalation.options.map((opt, i) => (
                <li
                  key={i}
                  className={`escalation-options-list__item ${
                    opt.recommended ? 'escalation-options-list__item--recommended' : ''
                  }`}
                >
                  {opt.label && <span className="escalation-options-list__label">{opt.label}</span>}
                  <div className="escalation-options-list__content">
                    <span className="escalation-options-list__option">{opt.text}</span>
                    {opt.recommended && <span className="escalation-options-list__recommended">Recommended</span>}
                    {opt.consequence && (
                      <span className="escalation-options-list__consequence">
                        {'\u2192'} {opt.consequence}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {!hasRecommendedOption && escalation.systemRecommendation && (
          <section className="escalation-card__section escalation-card__section--recommendation">
            <span className="escalation-card__field-label">No Recommendation</span>
            <p className="escalation-card__field-value escalation-card__field-value--recommendation">
              {escalation.systemRecommendation}
            </p>
          </section>
        )}

        {escalation.whatIsAtStake && (
          <section className="escalation-card__section">
            <span className="escalation-card__field-label">What Is at Stake</span>
            <p className="escalation-card__field-value">
              {escalation.whatIsAtStake}
            </p>
          </section>
        )}
      </div>
    </article>
  );
}
