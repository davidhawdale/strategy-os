import type { ProposalsView } from '../../../model/types';
import { SupportStateBadge } from '../../shared/SupportStateBadge';
import { CriteriaListSection } from './CriteriaListSection';
import './GTMPlanSection.css';

interface Props {
  gtmPlan: ProposalsView['gtmPlan'];
}

export function GTMPlanSection({ gtmPlan }: Props) {
  return (
    <div className="proposal-section-card proposal-section-card--gtm">
      <div className="proposal-section-card__header">
        <h3 className="proposal-section-card__title">GTM Plan</h3>
        <SupportStateBadge state={gtmPlan.supportState} />
      </div>

      {!gtmPlan.hasData ? (
        <p className="proposal-section-card__empty">No GTM plan recorded.</p>
      ) : (
        <>
          {gtmPlan.channelSequence.length > 0 && (
            <div className="gtm-channel-sequence">
              <h4 className="proposal-subsection-heading">Channel Sequence</h4>
              <div className="data-table-wrapper" role="region" aria-label="GTM channel sequence">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th className="data-table__header" scope="col">Phase</th>
                      <th className="data-table__header" scope="col">Channels</th>
                      <th className="data-table__header" scope="col">Gate Condition</th>
                      <th className="data-table__header" scope="col">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gtmPlan.channelSequence.map((phase, i) => (
                      <tr key={i} className="data-table__row">
                        <td className="data-table__cell">{phase.phaseName}</td>
                        <td className="data-table__cell">{phase.channels.join(', ')}</td>
                        <td className="data-table__cell">{phase.gateCondition ?? '-'}</td>
                        <td className="data-table__cell">{phase.durationEstimate ?? '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {gtmPlan.messagingFramework && (
            <div className="gtm-messaging-section">
              <h4 className="proposal-subsection-heading">Messaging Framework</h4>
              {gtmPlan.messagingFramework.primaryMessage && (
                <blockquote>{gtmPlan.messagingFramework.primaryMessage}</blockquote>
              )}
              {gtmPlan.messagingFramework.supportingMessages.length > 0 && (
                <ul>
                  {gtmPlan.messagingFramework.supportingMessages.map((message, i) => (
                    <li key={i}>{message}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <CriteriaListSection
            title="Success Criteria"
            items={gtmPlan.successCriteria}
            tone="success"
          />

          <CriteriaListSection
            title="Kill Criteria"
            items={gtmPlan.killCriteria}
            tone="danger"
          />
        </>
      )}
    </div>
  );
}
