import type { EliminationEntry } from '../../../model/types';
import { stripMd, parseEntry } from '../../../utils/markdown';
import './PossibilitySpaceSection.css';

interface PossibilitySpaceData {
  entries: string[];
  carried: string[];
  eliminations: EliminationEntry[];
}

interface Props {
  possibilitySpace: PossibilitySpaceData;
  label: string;
}

export function PossibilitySpaceSection({ possibilitySpace: ps, label }: Props) {
  const primary = ps.entries.find(e => e.includes('[PRIMARY]') || e.includes('(PRIMARY)'));
  const primaryParsed = primary ? parseEntry(primary) : undefined;

  return (
    <div className="detail-section">
      <h3 className="section-heading">Possibility Space</h3>

      {primaryParsed && (
        <div className="possibility-primary">
          <span className="possibility-primary__label">Primary {label}</span>
          <p className="possibility-primary__text"><strong>{primaryParsed.name}</strong></p>
          {primaryParsed.desc && (
            <ul className="possibility-subbullet-list">
              <li className="possibility-subbullet">{primaryParsed.desc}</li>
            </ul>
          )}
        </div>
      )}

      {ps.carried.length > 0 && (
        <div className="possibility-zone">
          <h4 className="subsection-heading">Alternatives carried</h4>
          <ul className="possibility-carried-list">
            {ps.carried.map((c, i) => {
              const numMatch = c.match(/\(#(\d+)\)/);
              const dashIdx = c.indexOf(' — ');
              const reason = dashIdx !== -1 ? stripMd(c.slice(dashIdx + 3).trim()) : undefined;

              if (numMatch) {
                const n = parseInt(numMatch[1], 10) - 1;
                const entry = n >= 0 && n < ps.entries.length ? ps.entries[n] : undefined;
                const { name: entryName, desc: entryDesc } = entry
                  ? parseEntry(entry)
                  : { name: stripMd(dashIdx !== -1 ? c.slice(0, dashIdx) : c).trim(), desc: undefined };
                return (
                  <li key={i} className="possibility-carried-item">
                    <span className="possibility-carried-item__entry">
                      <strong>{entryName} (#{numMatch[1]})</strong>
                      {entryDesc && <> — {entryDesc}</>}
                    </span>
                    {reason && (
                      <ul className="possibility-subbullet-list">
                        <li className="possibility-subbullet">{reason}</li>
                      </ul>
                    )}
                  </li>
                );
              }

              const entryText = dashIdx !== -1 ? c.slice(0, dashIdx) : c;
              return (
                <li key={i} className="possibility-carried-item">
                  <span className="possibility-carried-item__entry"><strong>{stripMd(entryText)}</strong></span>
                  {reason && (
                    <ul className="possibility-subbullet-list">
                      <li className="possibility-subbullet">{reason}</li>
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {ps.eliminations.length > 0 && (
        <div className="possibility-zone">
          <h4 className="subsection-heading">Eliminated</h4>
          <ul className="possibility-eliminated-list">
            {ps.eliminations.map((e, i) => {
              const numMatch = e.candidate.match(/\(#(\d+)\)/);
              const n = numMatch ? parseInt(numMatch[1], 10) - 1 : -1;
              const entry = n >= 0 && n < ps.entries.length ? ps.entries[n] : undefined;
              const { name: entryName, desc: entryDesc } = entry
                ? parseEntry(entry)
                : { name: stripMd(e.candidate), desc: undefined };
              const rawDetail = e.reason === 'Eliminated'
                ? e.evidence
                : [e.reason, e.evidence].filter(Boolean).join(' — ');
              const detail = rawDetail?.replace(/^eliminated:\s*/i, '');
              return (
                <li key={i} className="possibility-eliminated-item">
                  <span className="possibility-eliminated-item__entry">
                    <strong>{entryName}{numMatch ? ` (#${numMatch[1]})` : ''}</strong>
                    {entryDesc && <> — {entryDesc}</>}
                  </span>
                  {detail && (
                    <ul className="possibility-subbullet-list">
                      <li className="possibility-subbullet">{stripMd(detail)}</li>
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
