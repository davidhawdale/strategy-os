import type { ProposalsView } from '../../../model/types';
import { DataTable } from '../../shared/DataTable';
import { SupportStateBadge } from '../../shared/SupportStateBadge';
import { CriteriaListSection } from './CriteriaListSection';
import { FeatureMapSection } from './FeatureMapSection';
import { GrowthLoopsSection } from './GrowthLoopsSection';
import { MVPScopeSection } from './MVPScopeSection';
import './SolutionDesignSection.css';

interface Props {
  solutionDesign: ProposalsView['solutionDesign'];
}

export function SolutionDesignSection({ solutionDesign }: Props) {
  return (
    <div className="proposal-section-card proposal-section-card--solution">
      <div className="proposal-section-card__header">
        <h3 className="proposal-section-card__title">Solution Design</h3>
        <SupportStateBadge state={solutionDesign.supportState} />
      </div>

      {!solutionDesign.hasData ? (
        <p className="proposal-section-card__empty">No solution design recorded.</p>
      ) : (
        <>
          {solutionDesign.positioningStatement && (
            <div className="solution-positioning">
              <h4 className="proposal-subsection-heading">Positioning</h4>
              <blockquote>{solutionDesign.positioningStatement}</blockquote>
            </div>
          )}

          <FeatureMapSection featuresByPriority={solutionDesign.featuresByPriority} />

          {solutionDesign.mvpScope && (
            <MVPScopeSection mvpScope={solutionDesign.mvpScope} />
          )}

          <GrowthLoopsSection growthLoops={solutionDesign.growthLoops} />

          <CriteriaListSection
            title="Adequacy Criteria"
            items={solutionDesign.adequacyCriteria}
          />

          {solutionDesign.constraints.length > 0 && (
            <div className="solution-constraints">
              <h4 className="proposal-subsection-heading">Constraints from Hypotheses</h4>
              <DataTable
                caption="Hypothesis constraints on solution"
                columns={[
                  { key: 'from', header: 'From', render: r => r.fromHypothesis },
                  { key: 'constraint', header: 'Constraint', render: r => r.constraint },
                  { key: 'if', header: 'If Changes', render: r => r.ifChanges },
                ]}
                data={solutionDesign.constraints}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
