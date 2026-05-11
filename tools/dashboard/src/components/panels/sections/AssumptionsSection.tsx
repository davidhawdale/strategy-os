import type { Assumption } from '../../../model/types';
import { BlastRadiusBadge } from '../../shared/BlastRadiusBadge';
import { HelpedLabel } from '../../shared/HelpedLabel';
import { InlineMarkdownText } from '../../shared/InlineMarkdownText';
import { TermHelp } from '../../shared/TermHelp';
import { TierBadge } from '../../shared/TierBadge';
import './AssumptionsSection.css';

interface Props {
  assumptions: Assumption[];
}

export function AssumptionsSection({ assumptions }: Props) {
  return (
    <div className="detail-section">
      <h3 className="section-heading">
        <HelpedLabel termKey="assumptions">Assumptions</HelpedLabel>
        <span className="section-heading__count">{assumptions.length}</span>
      </h3>
      <ul className="assumption-list">
        {assumptions.map((a, i) => (
          <li key={i} className="assumption-item">
            <div className="assumption-item__header">
              {a.status && (
                <span className={`badge assumption-status assumption-status--${a.status.toLowerCase()}`}>
                  {a.status.replace(/_/g, ' ')}
                </span>
              )}
              {a.tag && (
                <>
                  <span className="assumption-item__tag">
                    {a.tag === 'B' ? 'Belief' : a.tag === 'K' ? 'Knowledge' : 'Observation'}
                  </span>
                  <TermHelp termKey={a.tag === 'B' ? 'belief' : a.tag === 'K' ? 'knowledge' : 'observation'} />
                </>
              )}
              <BlastRadiusBadge radius={a.blastRadius} termHelp />
              {a.loadBearing && (
                <>
                  <span className="badge badge--load-bearing">Load-Bearing</span>
                  <TermHelp termKey="load-bearing" />
                </>
              )}
              <TierBadge tier={a.tier} termHelp />
            </div>
            <p className="assumption-item__claim"><InlineMarkdownText text={a.claim} /></p>
            {a.falsification && (
              <p className="assumption-item__detail"><strong>Falsification:</strong> <InlineMarkdownText text={a.falsification} /></p>
            )}
            {a.validation && (
              <p className="assumption-item__detail"><strong>Validation:</strong> <InlineMarkdownText text={a.validation} /></p>
            )}
            {a.challenges && a.challenges.map((c, j) => (
              <p key={j} className="assumption-item__detail assumption-item__challenge">
                <strong>Challenge {c.date}:</strong> <InlineMarkdownText text={c.text} />
              </p>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}
