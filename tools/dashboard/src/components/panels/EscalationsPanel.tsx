import type { GovernorEscalationsView, Escalation, BlastRadius } from '../../model/types';
import { BlastRadiusBadge } from '../shared/BlastRadiusBadge';

interface Props {
  view: GovernorEscalationsView;
}

function DecisionTypeBadge({ type }: { type?: Escalation['decisionType'] }) {
  if (!type) return null;
  return <span className={`decision-type decision-type--${type.toLowerCase()}`}>{type}</span>;
}

function EscalationCard({ escalation }: { escalation: Escalation }) {
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
      </div>
    </article>
  );
}

export function EscalationsPanel({ view }: Props) {
  return (
    <section
      id="panel-escalations"
      role="tabpanel"
      aria-label="Governor Escalations"
      className="panel"
    >
      <div className="panel__header">
        <div className="panel__title-row">
          <h2 className="panel__title">Governor Escalations</h2>
          {view.totalOpen > 0 && (
            <span
              className="escalations-badge"
              aria-label={`${view.totalOpen} open escalation${view.totalOpen === 1 ? '' : 's'}`}
            >
              {view.totalOpen}
            </span>
          )}
        </div>
        <p className="panel__subtitle">Decisions the system cannot make — Governor must resolve</p>
      </div>

      {view.openEscalations.length === 0 && view.resolvedEscalations.length === 0 && (
        <div className="escalations-empty">
          <p className="escalations-empty__message">
            No governor escalations recorded. Gap Definer has not flagged any decisions for escalation.
          </p>
        </div>
      )}

      {view.openEscalations.length > 0 && (
        <div className="escalations-section">
          <h3 className="escalations-section__title">
            Open
            <span className="escalations-section__count">{view.openEscalations.length}</span>
          </h3>
          <div className="escalations-list" role="list">
            {view.openEscalations.map((e, i) => (
              <div key={i} role="listitem">
                <EscalationCard escalation={e} />
              </div>
            ))}
          </div>
        </div>
      )}

      {view.resolvedEscalations.length > 0 && (
        <div className="escalations-section escalations-section--resolved">
          <h3 className="escalations-section__title">
            Resolved
            <span className="escalations-section__count">{view.resolvedEscalations.length}</span>
          </h3>
          <div className="escalations-list" role="list">
            {view.resolvedEscalations.map((e, i) => (
              <div key={i} role="listitem">
                <EscalationCard escalation={e} />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
