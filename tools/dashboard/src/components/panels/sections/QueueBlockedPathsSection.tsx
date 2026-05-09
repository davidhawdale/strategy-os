import type { BlockedPath } from '../../../model/types';
import './QueueBlockedPathsSection.css';

interface Props {
  blockedPaths: BlockedPath[];
}

function BlockedItem({ item }: { item: BlockedPath }) {
  return (
    <li className="queue-blocked-item">
      <span className="queue-blocked-item__mark">x</span>
      <div className="queue-blocked-item__body">
        <span className="queue-blocked-item__path">{item.path}</span>
        {item.blocker && (
          <span className="queue-blocked-item__blocker">{item.blocker}</span>
        )}
      </div>
    </li>
  );
}

export function QueueBlockedPathsSection({ blockedPaths }: Props) {
  if (blockedPaths.length === 0) return null;

  return (
    <section className="queue-section">
      <h3 className="queue-section__title">
        Blocked Paths
        <span className="queue-section__count">{blockedPaths.length}</span>
      </h3>
      <ul className="queue-blocked-list">
        {blockedPaths.map((item, i) => (
          <BlockedItem key={i} item={item} />
        ))}
      </ul>
    </section>
  );
}
