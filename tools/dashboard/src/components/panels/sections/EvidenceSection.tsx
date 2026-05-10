import type { EvidenceItem } from '../../../model/types';
import { InlineMarkdownText } from '../../shared/InlineMarkdownText';
import { TierBadge } from '../../shared/TierBadge';
import './EvidenceSection.css';

interface Props {
  evidence: EvidenceItem[];
}

export function EvidenceSection({ evidence }: Props) {
  return (
    <div className="detail-section">
      <h3 className="section-heading">
        Evidence
        <span className="section-heading__count">{evidence.length}</span>
      </h3>
      <ul className="evidence-list">
        {evidence.map((e, i) => (
          <li key={i} className="evidence-item">
            <div className="evidence-item__meta">
              {e.type && <span className="evidence-item__type">{e.type.replace(/_/g, ' ')}</span>}
              <TierBadge tier={e.tier} />
              {e.date && <span className="evidence-item__date">{e.date}</span>}
            </div>
            <p className="evidence-item__detail">
              {e.url ? (
                <>
                  <a href={e.url} target="_blank" rel="noopener noreferrer" className="source-link">{e.source}</a>
                  {e.detail && <>: <InlineMarkdownText text={e.detail} /></>}
                </>
              ) : (
                <InlineMarkdownText text={e.detail} />
              )}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
