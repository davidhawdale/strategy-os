import type { ResearchSource } from '../../../model/types';
import { HelpedLabel } from '../../shared/HelpedLabel';
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
        <HelpedLabel termKey="research-sources">Research Sources</HelpedLabel>
        <span className="section-heading__count">{researchSources.length}</span>
      </h3>
      <ul className="research-source-list">
        {researchSources.map((source, i) => {
          const label = source.name ?? source.url ?? source.description ?? source.raw;
          const detail = source.note ?? (!source.name && !source.url ? source.description : undefined);

          return (
            <li key={i} className="research-source-item">
              <div className="research-source-item__meta">
                {source.type && <span className="research-source-item__type">{source.type.replace(/_/g, ' ')}</span>}
                <TierBadge tier={source.tier} termHelp />
                {source.date && <span className="research-source-item__date">{source.date}</span>}
              </div>
              <p className="research-source-item__detail">
                {source.url ? (
                  <>
                    <a href={source.url} target="_blank" rel="noopener noreferrer" className="source-link">
                      {label}
                    </a>
                    {detail && <>: <InlineMarkdownText text={detail} /></>}
                  </>
                ) : (
                  <InlineMarkdownText text={detail ?? label} />
                )}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
