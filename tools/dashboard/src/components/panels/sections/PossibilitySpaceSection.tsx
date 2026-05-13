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

      {ps.entries.length > 0 && (
        <div className="possibility-zone">
          <h4 className="subsection-heading">Considered</h4>
          <ul className="possibility-considered-list">
            {ps.entries.map((entry, i) => {
              const clean = stripMd(entry);
              const colonIdx = clean.indexOf(':');
              const label = colonIdx !== -1 ? clean.slice(0, colonIdx + 1) : null;
              const rest = colonIdx !== -1 ? clean.slice(colonIdx + 1).trim() : clean;
              return (
                <li key={i} className="possibility-considered-item">
                  {label && <strong>{label}</strong>}{label ? ' ' : ''}{rest}
                </li>
              );
            })}
          </ul>
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
                    <strong>{entryName} (#{numMatch[1]})</strong>
                    {entryDesc && <> — {entryDesc}</>}
                    {reason && <> — {reason}</>}
                  </li>
                );
              }

              const entryText = dashIdx !== -1 ? c.slice(0, dashIdx) : c;
              return (
                <li key={i} className="possibility-carried-item">
                  <strong>{stripMd(entryText)}</strong>
                  {reason && <> — {reason}</>}
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
                  <strong>{entryName}{numMatch ? ` (#${numMatch[1]})` : ''}</strong>
                  {entryDesc && <> — {entryDesc}</>}
                  {detail && <> — {stripMd(detail)}</>}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
