import type { ResearchSource } from '../../../model/types';
import { InlineMarkdownText } from '../../shared/InlineMarkdownText';
import { TierBadge } from '../../shared/TierBadge';
import './ResearchSourcesSection.css';

interface Props {
  researchSources: ResearchSource[];
}

export function ResearchSourcesSection({ researchSources }: Props) {
  if (researchSources.length === 0) return null;

  return (
    <div className="detail-section">
      <h3 className="section-heading">
        Research Sources
        <span className="section-heading__count">{researchSources.length}</span>
      </h3>
      <ul className="research-source-list">
        {researchSources.map((source, i) => {
          const label = source.name ?? source.url ?? source.raw;
          const detail = source.note ?? source.description;

          return (
            <li key={i} className="research-source-item">
              <div className="research-source-item__meta">
                <TierBadge tier={source.tier} />
                {source.date && <span className="research-source-item__date">{source.date}</span>}
              </div>
              <p className="research-source-item__title">
                {source.url ? (
                  <a href={source.url} target="_blank" rel="noopener noreferrer" className="source-link">
                    {label}
                  </a>
                ) : (
                  <InlineMarkdownText text={label} />
                )}
              </p>
              {detail && (
                <p className="research-source-item__detail">
                  <InlineMarkdownText text={detail} />
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
