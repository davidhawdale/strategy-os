import type { UpdateEntry } from '../../../model/types';
import { InlineMarkdownText } from '../../shared/InlineMarkdownText';
import './UpdateHistorySection.css';

interface Props {
  lastUpdated?: string;
  updateRationale?: string;
  priorUpdates?: UpdateEntry[];
}

function renderUpdateText(text: string) {
  const lines = (text.charAt(0).toUpperCase() + text.slice(1)).split('\n');
  const segments: Array<{ type: 'text' | 'list'; lines: string[] }> = [];
  let current: { type: 'text' | 'list'; lines: string[] } | null = null;
  for (const line of lines) {
    const trimmed = line.trimStart();
    if (trimmed.startsWith('- ')) {
      if (current?.type !== 'list') { current = { type: 'list', lines: [] }; segments.push(current); }
      current.lines.push(trimmed.slice(2));
    } else if (trimmed) {
      if (current?.type !== 'text') { current = { type: 'text', lines: [] }; segments.push(current); }
      current.lines.push(trimmed);
    }
  }
  return segments.map((seg, i) =>
    seg.type === 'list'
      ? <ul key={i} className="update-entry__list">{seg.lines.map((item, j) => <li key={j}><InlineMarkdownText text={item} /></li>)}</ul>
      : <p key={i} className="update-entry__text"><InlineMarkdownText text={seg.lines.join(' ')} /></p>
  );
}

export function UpdateHistorySection({ lastUpdated, updateRationale, priorUpdates }: Props) {
  if (!lastUpdated && !updateRationale && (!priorUpdates || priorUpdates.length === 0)) return null;

  return (
    <div className="detail-section">
      <h3 className="section-heading">Update History</h3>
      {lastUpdated && (
        <div className="update-entry">
          <span className="update-entry__date">Last Updated</span>
          {renderUpdateText(lastUpdated)}
        </div>
      )}
      {updateRationale && (() => {
        const m = updateRationale.match(/^(\d{4}-\d{2}-\d{2})\s+(CHALLENGE Pass \d+)\s*—\s*([\s\S]+)$/i);
        const date = m?.[1];
        const passLabel = m?.[2];
        const body = m ? m[3] : updateRationale;
        return (
          <div className="update-entry">
            <span className="update-entry__date">{[date, passLabel].filter(Boolean).join('  —  ')}</span>
            {renderUpdateText(body)}
          </div>
        );
      })()}
      {priorUpdates?.map((u, i) => {
        const m = u.text.match(/^(CHALLENGE [Pp]ass[^—]*)\s*—\s*([\s\S]+)$/i);
        const passLabel = m?.[1]?.trim();
        const body = m ? m[2] : u.text;
        return (
          <div key={i} className="update-entry update-entry--prior">
            <span className="update-entry__date">{[u.date, passLabel].filter(Boolean).join('  —  ')}</span>
            {renderUpdateText(body)}
          </div>
        );
      })}
    </div>
  );
}
