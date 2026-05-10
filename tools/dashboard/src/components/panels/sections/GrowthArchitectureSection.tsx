import type { ProposalsView } from '../../../model/types';
import { InlineMarkdownText } from '../../shared/InlineMarkdownText';
import { SupportStateBadge } from '../../shared/SupportStateBadge';
import './GrowthArchitectureSection.css';

interface Props {
  growthArchitecture: ProposalsView['growthArchitecture'];
}

export function GrowthArchitectureSection({ growthArchitecture }: Props) {
  return (
    <div className="proposal-section-card proposal-section-card--architecture">
      <div className="proposal-section-card__header">
        <h3 className="proposal-section-card__title">Growth Architecture</h3>
        <SupportStateBadge state={growthArchitecture.supportState} />
      </div>

      {!growthArchitecture.hasData ? (
        <p className="proposal-section-card__empty">No growth architecture recorded.</p>
      ) : (
        <>
          {growthArchitecture.architecture && (
            <p className="growth-architecture-type">
              <span className="growth-architecture-type__label">Architecture</span>
              <strong>{growthArchitecture.architecture.replace(/_/g, ' ')}</strong>
            </p>
          )}

          {growthArchitecture.rationale && (
            <dl className="growth-architecture-rationale">
              {growthArchitecture.rationale.selectionReason && (
                <div className="growth-architecture-rationale__item">
                  <dt>Selection Reason</dt>
                  <dd><InlineMarkdownText text={growthArchitecture.rationale.selectionReason} /></dd>
                </div>
              )}
              {growthArchitecture.rationale.acvImplication && (
                <div className="growth-architecture-rationale__item">
                  <dt>ACV Implication</dt>
                  <dd><InlineMarkdownText text={growthArchitecture.rationale.acvImplication} /></dd>
                </div>
              )}
              {growthArchitecture.rationale.buyerType && (
                <div className="growth-architecture-rationale__item">
                  <dt>Buyer Type</dt>
                  <dd><InlineMarkdownText text={growthArchitecture.rationale.buyerType} /></dd>
                </div>
              )}
              {growthArchitecture.rationale.timeToValue && (
                <div className="growth-architecture-rationale__item">
                  <dt>Time to Value</dt>
                  <dd><InlineMarkdownText text={growthArchitecture.rationale.timeToValue} /></dd>
                </div>
              )}
              {growthArchitecture.rationale.collaborationRequirement && (
                <div className="growth-architecture-rationale__item">
                  <dt>Collaboration Requirement</dt>
                  <dd><InlineMarkdownText text={growthArchitecture.rationale.collaborationRequirement} /></dd>
                </div>
              )}
            </dl>
          )}

          {growthArchitecture.requiredConditions.length > 0 && (
            <div className="growth-architecture-conditions">
              <h4 className="proposal-subsection-heading">Required Conditions</h4>
              <ul className="growth-architecture-conditions__list">
                {growthArchitecture.requiredConditions.map((condition, i) => (
                  <li key={i}><InlineMarkdownText text={condition} /></li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}
