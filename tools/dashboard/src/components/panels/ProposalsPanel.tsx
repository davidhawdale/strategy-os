import type { ProposalsView } from '../../model/types';
import { SupportStateBadge } from '../shared/SupportStateBadge';
import { TierBadge } from '../shared/TierBadge';
import { DataTable } from '../shared/DataTable';

interface Props {
  view: ProposalsView;
}

export function ProposalsPanel({ view }: Props) {
  return (
    <section
      id="panel-proposals"
      role="tabpanel"
      aria-label="Proposals"
      className="panel"
    >
      <div className="panel__header">
        <h2 className="panel__title">Proposals</h2>
        <p className="panel__subtitle">Growth architecture, solution design, and GTM plan</p>
      </div>

      {/* Growth Architecture */}
      <div className="proposals-card">
        <div className="proposals-card__header">
          <h3 className="proposals-card__title">Growth Architecture</h3>
          <SupportStateBadge state={view.growthArchitecture.supportState} />
        </div>

        {!view.growthArchitecture.hasData ? (
          <p className="proposals-card__empty">No growth architecture recorded.</p>
        ) : (
          <>
            {view.growthArchitecture.architecture && (
              <p className="proposals-architecture__type">
                <strong>Architecture:</strong> {view.growthArchitecture.architecture}
              </p>
            )}

            {view.growthArchitecture.rationale && (
              <dl className="proposals-rationale">
                {view.growthArchitecture.rationale.selectionReason && (
                  <div className="proposals-rationale__item">
                    <dt>Selection Reason</dt>
                    <dd>{view.growthArchitecture.rationale.selectionReason}</dd>
                  </div>
                )}
                {view.growthArchitecture.rationale.acvImplication && (
                  <div className="proposals-rationale__item">
                    <dt>ACV Implication</dt>
                    <dd>{view.growthArchitecture.rationale.acvImplication}</dd>
                  </div>
                )}
                {view.growthArchitecture.rationale.buyerType && (
                  <div className="proposals-rationale__item">
                    <dt>Buyer Type</dt>
                    <dd>{view.growthArchitecture.rationale.buyerType}</dd>
                  </div>
                )}
                {view.growthArchitecture.rationale.timeToValue && (
                  <div className="proposals-rationale__item">
                    <dt>Time to Value</dt>
                    <dd>{view.growthArchitecture.rationale.timeToValue}</dd>
                  </div>
                )}
                {view.growthArchitecture.rationale.collaborationRequirement && (
                  <div className="proposals-rationale__item">
                    <dt>Collaboration Requirement</dt>
                    <dd>{view.growthArchitecture.rationale.collaborationRequirement}</dd>
                  </div>
                )}
              </dl>
            )}

            {view.growthArchitecture.requiredConditions.length > 0 && (
              <div className="proposals-conditions">
                <h4 className="proposals-conditions__title">Required Conditions</h4>
                <ul className="proposals-conditions__list">
                  {view.growthArchitecture.requiredConditions.map((c, i) => (
                    <li key={i} className="proposals-conditions__item">{c}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>

      {/* Solution Design */}
      <div className="proposals-card">
        <div className="proposals-card__header">
          <h3 className="proposals-card__title">Solution Design</h3>
          <SupportStateBadge state={view.solutionDesign.supportState} />
        </div>

        {!view.solutionDesign.hasData ? (
          <p className="proposals-card__empty">No solution design recorded.</p>
        ) : (
          <>
            {view.solutionDesign.positioningStatement && (
              <div className="proposals-positioning">
                <h4 className="proposals-positioning__title">Positioning</h4>
                <blockquote className="proposals-positioning__statement">
                  {view.solutionDesign.positioningStatement}
                </blockquote>
              </div>
            )}

            {/* Feature map */}
            <div className="feature-map">
              <h4 className="proposals-section-heading">Feature Map</h4>

              {view.solutionDesign.featuresByPriority.mvp.length > 0 && (
                <div className="feature-group">
                  <h5 className="feature-group__heading feature-group__heading--mvp">
                    MVP
                    <span className="feature-group__count">
                      {view.solutionDesign.featuresByPriority.mvp.length}
                    </span>
                  </h5>
                  <DataTable
                    caption="MVP features"
                    columns={[
                      { key: 'feature', header: 'Feature', render: r => r.feature },
                      { key: 'problem', header: 'Solves', render: r => r.solvesProblem },
                      { key: 'job', header: 'Job', render: r => r.jobDimension ?? '' },
                      { key: 'tier', header: 'Tier', render: r => <TierBadge tier={r.tier} /> },
                    ]}
                    data={view.solutionDesign.featuresByPriority.mvp}
                    compact
                  />
                </div>
              )}

              {view.solutionDesign.featuresByPriority.postMvp.length > 0 && (
                <div className="feature-group">
                  <h5 className="feature-group__heading feature-group__heading--post">
                    Post-MVP
                    <span className="feature-group__count">
                      {view.solutionDesign.featuresByPriority.postMvp.length}
                    </span>
                  </h5>
                  <DataTable
                    caption="Post-MVP features"
                    columns={[
                      { key: 'feature', header: 'Feature', render: r => r.feature },
                      { key: 'problem', header: 'Solves', render: r => r.solvesProblem },
                      { key: 'job', header: 'Job', render: r => r.jobDimension ?? '' },
                    ]}
                    data={view.solutionDesign.featuresByPriority.postMvp}
                    compact
                  />
                </div>
              )}

              {view.solutionDesign.featuresByPriority.future.length > 0 && (
                <div className="feature-group">
                  <h5 className="feature-group__heading feature-group__heading--future">
                    Future
                    <span className="feature-group__count">
                      {view.solutionDesign.featuresByPriority.future.length}
                    </span>
                  </h5>
                  <DataTable
                    caption="Future features"
                    columns={[
                      { key: 'feature', header: 'Feature', render: r => r.feature },
                      { key: 'problem', header: 'Solves', render: r => r.solvesProblem },
                    ]}
                    data={view.solutionDesign.featuresByPriority.future}
                    compact
                  />
                </div>
              )}

              {view.solutionDesign.featuresByPriority.mvp.length === 0 &&
                view.solutionDesign.featuresByPriority.postMvp.length === 0 &&
                view.solutionDesign.featuresByPriority.future.length === 0 && (
                  <p className="feature-map__empty">No features mapped.</p>
                )}
            </div>

            {/* MVP scope */}
            {view.solutionDesign.mvpScope && (
              <div className="mvp-scope">
                <h4 className="proposals-section-heading">MVP Scope</h4>
                {view.solutionDesign.mvpScope.included.length > 0 && (
                  <div className="mvp-scope__section">
                    <h5 className="mvp-scope__label">Included</h5>
                    <ul className="mvp-scope__list mvp-scope__list--included">
                      {view.solutionDesign.mvpScope.included.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {view.solutionDesign.mvpScope.excluded.length > 0 && (
                  <div className="mvp-scope__section">
                    <h5 className="mvp-scope__label">Excluded</h5>
                    <ul className="mvp-scope__list mvp-scope__list--excluded">
                      {view.solutionDesign.mvpScope.excluded.map((item, i) => (
                        <li key={i}>{item.feature} — {item.whyExcluded}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {view.solutionDesign.mvpScope.ahaMoment && (
                  <p className="mvp-scope__aha">
                    <strong>Aha moment:</strong> {view.solutionDesign.mvpScope.ahaMoment}
                  </p>
                )}
                {view.solutionDesign.mvpScope.timeToValueTarget && (
                  <p className="mvp-scope__ttv">
                    <strong>Time-to-value target:</strong> {view.solutionDesign.mvpScope.timeToValueTarget}
                  </p>
                )}
              </div>
            )}

            {/* Growth loops */}
            {view.solutionDesign.growthLoops.length > 0 && (
              <div className="growth-loops">
                <h4 className="proposals-section-heading">Growth Loops</h4>
                <div className="growth-loops__grid">
                  {view.solutionDesign.growthLoops.map((loop, i) => (
                    <div key={i} className="growth-loop-card">
                      <h5 className="growth-loop-card__name">{loop.name}</h5>
                      <p className="growth-loop-card__mechanism">{loop.mechanism}</p>
                      {loop.tier && <TierBadge tier={loop.tier} />}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Adequacy criteria */}
            {view.solutionDesign.adequacyCriteria.length > 0 && (
              <div className="adequacy-criteria">
                <h4 className="proposals-section-heading">Adequacy Criteria</h4>
                <ul className="adequacy-list">
                  {view.solutionDesign.adequacyCriteria.map((c, i) => (
                    <li key={i} className="adequacy-list__item">{c}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Constraints */}
            {view.solutionDesign.constraints.length > 0 && (
              <div className="constraints-section">
                <h4 className="proposals-section-heading">Constraints from Hypotheses</h4>
                <DataTable
                  caption="Hypothesis constraints on solution"
                  columns={[
                    { key: 'from', header: 'From', render: r => r.fromHypothesis },
                    { key: 'constraint', header: 'Constraint', render: r => r.constraint },
                    { key: 'if', header: 'If Changes', render: r => r.ifChanges },
                  ]}
                  data={view.solutionDesign.constraints}
                />
              </div>
            )}
          </>
        )}
      </div>

      {/* GTM Plan */}
      <div className="proposals-card">
        <div className="proposals-card__header">
          <h3 className="proposals-card__title">GTM Plan</h3>
          <SupportStateBadge state={view.gtmPlan.supportState} />
        </div>

        {!view.gtmPlan.hasData ? (
          <p className="proposals-card__empty">No GTM plan recorded.</p>
        ) : (
          <>
            {/* Channel sequence table */}
            {view.gtmPlan.channelSequence.length > 0 && (
              <div className="gtm-channels">
                <h4 className="proposals-section-heading">Channel Sequence</h4>
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
                      {view.gtmPlan.channelSequence.map((phase, i) => (
                        <tr key={i} className="data-table__row">
                          <td className="data-table__cell">{phase.phaseName}</td>
                          <td className="data-table__cell">{phase.channels.join(', ')}</td>
                          <td className="data-table__cell">{phase.gateCondition ?? '—'}</td>
                          <td className="data-table__cell">{phase.durationEstimate ?? '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Messaging framework */}
            {view.gtmPlan.messagingFramework && (
              <div className="gtm-messaging">
                <h4 className="proposals-section-heading">Messaging Framework</h4>
                {view.gtmPlan.messagingFramework.primaryMessage && (
                  <blockquote className="gtm-messaging__primary">
                    {view.gtmPlan.messagingFramework.primaryMessage}
                  </blockquote>
                )}
                {view.gtmPlan.messagingFramework.supportingMessages.length > 0 && (
                  <ul className="gtm-messaging__supporting">
                    {view.gtmPlan.messagingFramework.supportingMessages.map((m, i) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* Success criteria */}
            {view.gtmPlan.successCriteria.length > 0 && (
              <div className="gtm-criteria">
                <h4 className="proposals-section-heading">Success Criteria</h4>
                <ul className="gtm-criteria__list gtm-criteria__list--success">
                  {view.gtmPlan.successCriteria.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Kill criteria */}
            {view.gtmPlan.killCriteria.length > 0 && (
              <div className="gtm-criteria">
                <h4 className="proposals-section-heading">Kill Criteria</h4>
                <ul className="gtm-criteria__list gtm-criteria__list--kill">
                  {view.gtmPlan.killCriteria.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
