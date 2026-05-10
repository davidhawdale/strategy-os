import type { DiagnosticItem, DiagnosticSeverity, ParseDiagnosticsView } from '../views/diagnostics';
import './ParserDiagnosticsDrawer.css';

interface Props {
  view: ParseDiagnosticsView;
  onClose: () => void;
}

const SEVERITIES: DiagnosticSeverity[] = ['error', 'warning', 'info'];

function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`;
}

function formatSource(source: DiagnosticItem['source']): string {
  return source === 'gapAnalysis' ? 'Gap analysis' : 'Register';
}

export function ParserDiagnosticsDrawer({ view, onClose }: Props) {
  return (
    <div className="diagnostics-drawer" role="dialog" aria-modal="true" aria-labelledby="diagnostics-title">
      <div className="diagnostics-drawer__backdrop" onClick={onClose} />
      <aside className="diagnostics-drawer__panel">
        <div className="diagnostics-drawer__header">
          <div>
            <h2 id="diagnostics-title" className="diagnostics-drawer__title">Parser Diagnostics</h2>
            <p className="diagnostics-drawer__subtitle">
              Technical parse health for the markdown feeding this dashboard.
            </p>
          </div>
          <button
            className="diagnostics-drawer__icon-button"
            type="button"
            onClick={onClose}
            aria-label="Close parser diagnostics"
          >
            X
          </button>
        </div>

        <div className="diagnostics-drawer__body">
          <section className="diagnostics-drawer__summary" aria-label="Parse diagnostics summary">
            <div className="diagnostics-drawer__metric">
              <span>Overall</span>
              <strong>{formatPercent(view.completeness.overall)}</strong>
            </div>
            <div className="diagnostics-drawer__metric">
              <span>Register</span>
              <strong>{formatPercent(view.completeness.register)}</strong>
            </div>
            <div className="diagnostics-drawer__metric">
              <span>Gap analysis</span>
              <strong>{formatPercent(view.completeness.gapAnalysis)}</strong>
            </div>
          </section>

          <section className="diagnostics-drawer__counts" aria-label="Warning counts">
            <div className="diagnostics-drawer__count diagnostics-drawer__count--error">
              <span>Error</span>
              <strong>{view.counts.error}</strong>
            </div>
            <div className="diagnostics-drawer__count diagnostics-drawer__count--warning">
              <span>Warning</span>
              <strong>{view.counts.warning}</strong>
            </div>
            <div className="diagnostics-drawer__count diagnostics-drawer__count--info">
              <span>Info</span>
              <strong>{view.counts.info}</strong>
            </div>
          </section>

          {(view.sourcePaths.register || view.sourcePaths.gapAnalysis) && (
            <section className="diagnostics-drawer__sources" aria-label="Parsed source files">
              <h3>Sources</h3>
              <dl>
                {view.sourcePaths.register && (
                  <>
                    <dt>Register</dt>
                    <dd>{view.sourcePaths.register}</dd>
                  </>
                )}
                {view.sourcePaths.gapAnalysis && (
                  <>
                    <dt>Gap analysis</dt>
                    <dd>{view.sourcePaths.gapAnalysis}</dd>
                  </>
                )}
              </dl>
            </section>
          )}

          {view.counts.total === 0 ? (
            <div className="diagnostics-drawer__empty" role="status">
              <h3>No parser diagnostics</h3>
              <p>The current register and gap analysis loaded without parser warnings.</p>
            </div>
          ) : (
            <div className="diagnostics-drawer__groups">
              {SEVERITIES.map(severity => {
                const items = view.bySeverity[severity];
                if (items.length === 0) return null;

                return (
                  <section key={severity} className="diagnostics-drawer__group" aria-labelledby={`diagnostics-${severity}`}>
                    <h3 id={`diagnostics-${severity}`} className="diagnostics-drawer__group-title">
                      <span>{severity}</span>
                      <strong>{items.length}</strong>
                    </h3>
                    <ul className="diagnostics-drawer__list">
                      {items.map((item, index) => (
                        <li key={`${item.source}-${item.section}-${item.field}-${index}`} className="diagnostics-drawer__item">
                          <div className="diagnostics-drawer__item-meta">
                            <span>{formatSource(item.source)}</span>
                            <span>{item.section}</span>
                            <span>{item.field}</span>
                          </div>
                          <p>{item.message}</p>
                        </li>
                      ))}
                    </ul>
                  </section>
                );
              })}
            </div>
          )}
        </div>

        <div className="diagnostics-drawer__footer">
          <div className="diagnostics-drawer__source-summary">
            <span>Register: {view.bySource.register.total}</span>
            <span>Gap analysis: {view.bySource.gapAnalysis.total}</span>
          </div>
          <button className="diagnostics-drawer__primary-button" type="button" onClick={onClose}>
            Done
          </button>
        </div>
      </aside>
    </div>
  );
}
