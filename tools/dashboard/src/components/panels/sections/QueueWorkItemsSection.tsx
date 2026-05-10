import type { QueueWorkItem } from '../../../model/types';
import './QueueWorkItemsSection.css';

interface Props {
  workItems: QueueWorkItem[];
}

function kindLabel(kind: QueueWorkItem['kind']): string {
  return kind === 'escalation' ? 'Decision' : 'Task';
}

function statusClass(status: string | undefined): string {
  if (!status) return 'queue-work-item__status';
  return `queue-work-item__status queue-work-item__status--${status.toLowerCase().split(/\s+/)[0]}`;
}

export function QueueWorkItemsSection({ workItems }: Props) {
  const decisions = workItems.filter(item => item.kind === 'escalation').length;
  const tasks = workItems.length - decisions;

  return (
    <section className="queue-work-items detail-section" aria-labelledby="queue-work-items-title">
      <div className="queue-work-items__heading">
        <div>
          <h3 id="queue-work-items-title" className="section-heading">
            Queue Files
            <span className="section-heading__count">{workItems.length}</span>
          </h3>
          <p className="queue-work-items__subtitle">
            Individual task and escalation files from the execution queue.
          </p>
        </div>
        {workItems.length > 0 && (
          <div className="queue-work-items__summary" aria-label="Queue file summary">
            <span>{tasks} tasks</span>
            <span>{decisions} decisions</span>
          </div>
        )}
      </div>

      {workItems.length === 0 ? (
        <div className="queue-work-items__empty" role="status">
          No individual queue files found.
        </div>
      ) : (
        <div className="queue-work-items__grid">
          {workItems.map(item => (
            <article key={`${item.fileName}-${item.id}`} className={`queue-work-item queue-work-item--${item.kind}`}>
              <div className="queue-work-item__header">
                <div>
                  <div className="queue-work-item__kicker">
                    <span>{item.id}</span>
                    <span>{kindLabel(item.kind)}</span>
                    {item.evidenceTarget && <span>{item.evidenceTarget}</span>}
                  </div>
                  <h4 className="queue-work-item__title">{item.title}</h4>
                </div>
                {item.status && (
                  <span className={statusClass(item.status)}>{item.status}</span>
                )}
              </div>

              {item.summary && (
                <p className="queue-work-item__summary-text">{item.summary}</p>
              )}

              <dl className="queue-work-item__meta">
                {item.issued && (
                  <>
                    <dt>Issued</dt>
                    <dd>{item.issued}</dd>
                  </>
                )}
                {item.reducesGap && (
                  <>
                    <dt>Gap</dt>
                    <dd>{item.reducesGap}</dd>
                  </>
                )}
                {item.actionType && (
                  <>
                    <dt>Action</dt>
                    <dd>{item.actionType}</dd>
                  </>
                )}
                {item.type && (
                  <>
                    <dt>Type</dt>
                    <dd>{item.type}</dd>
                  </>
                )}
                {item.blastRadius && (
                  <>
                    <dt>Blast</dt>
                    <dd>{item.blastRadius}</dd>
                  </>
                )}
                {item.blocks && (
                  <>
                    <dt>Blocks</dt>
                    <dd>{item.blocks}</dd>
                  </>
                )}
              </dl>

              {item.preconditions.length > 0 && (
                <div className="queue-work-item__preconditions">
                  <h5>Preconditions</h5>
                  <ul>
                    {item.preconditions.map(precondition => (
                      <li key={precondition}>{precondition}</li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
