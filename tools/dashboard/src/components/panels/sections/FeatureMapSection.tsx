import type { ProposalsView } from '../../../model/types';
import { DataTable } from '../../shared/DataTable';
import { InlineMarkdownText } from '../../shared/InlineMarkdownText';
import { TierBadge } from '../../shared/TierBadge';
import './FeatureMapSection.css';

interface Props {
  featuresByPriority: ProposalsView['solutionDesign']['featuresByPriority'];
}

export function FeatureMapSection({ featuresByPriority }: Props) {
  const hasFeatures =
    featuresByPriority.mvp.length > 0 ||
    featuresByPriority.postMvp.length > 0 ||
    featuresByPriority.future.length > 0;

  return (
    <div className="feature-map-section">
      <h4 className="proposal-subsection-heading">Feature Map</h4>

      {!hasFeatures && (
        <p className="feature-map-section__empty">No features mapped.</p>
      )}

      {featuresByPriority.mvp.length > 0 && (
        <div className="feature-map-group">
          <h5 className="feature-map-group__heading feature-map-group__heading--mvp">
            MVP
            <span className="feature-map-group__count">{featuresByPriority.mvp.length}</span>
          </h5>
          <DataTable
            caption="MVP features"
            columns={[
              { key: 'feature', header: 'Feature', render: r => r.feature },
              { key: 'problem', header: 'Solves', render: r => <InlineMarkdownText text={r.solvesProblem} /> },
              { key: 'job', header: 'Job', render: r => r.jobDimension ?? '' },
              { key: 'tier', header: 'Tier', render: r => <TierBadge tier={r.tier} /> },
            ]}
            data={featuresByPriority.mvp}
            compact
          />
        </div>
      )}

      {featuresByPriority.postMvp.length > 0 && (
        <div className="feature-map-group">
          <h5 className="feature-map-group__heading feature-map-group__heading--post">
            Post-MVP
            <span className="feature-map-group__count">{featuresByPriority.postMvp.length}</span>
          </h5>
          <DataTable
            caption="Post-MVP features"
            columns={[
              { key: 'feature', header: 'Feature', render: r => r.feature },
              { key: 'problem', header: 'Solves', render: r => <InlineMarkdownText text={r.solvesProblem} /> },
              { key: 'job', header: 'Job', render: r => r.jobDimension ?? '' },
            ]}
            data={featuresByPriority.postMvp}
            compact
          />
        </div>
      )}

      {featuresByPriority.future.length > 0 && (
        <div className="feature-map-group">
          <h5 className="feature-map-group__heading feature-map-group__heading--future">
            Future
            <span className="feature-map-group__count">{featuresByPriority.future.length}</span>
          </h5>
          <DataTable
            caption="Future features"
            columns={[
              { key: 'feature', header: 'Feature', render: r => r.feature },
              { key: 'problem', header: 'Solves', render: r => <InlineMarkdownText text={r.solvesProblem} /> },
            ]}
            data={featuresByPriority.future}
            compact
          />
        </div>
      )}
    </div>
  );
}
