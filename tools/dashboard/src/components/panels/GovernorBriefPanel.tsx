import type { PanelId } from '../../model/types';
import { buildPanelUrl, isAddressablePanelId } from '../../model/panels';
import type { GovernorBriefView } from '../../views/governor-brief';
import { renderOrderedSections } from './sections/renderOrderedSections';
import './GovernorBriefPanel.css';

interface Props {
  view: GovernorBriefView;
  sectionOrder?: string[];
  onSelectPanel: (panel: PanelId) => void;
}

export function GovernorBriefPanel({ view, sectionOrder, onSelectPanel }: Props) {
  void onSelectPanel;

  function dashboardPanelUrl(panel: PanelId): string {
    if (typeof window === 'undefined' || !isAddressablePanelId(panel)) {
      return `?panel=${panel}`;
    }
    return buildPanelUrl(panel, window.location.href);
  }

  return (
    <section
      id="panel-governor-brief"
      role="tabpanel"
      aria-label="Governor Brief"
      className="panel governor-brief-panel"
    >
      <div className="governor-brief-panel__header">
        <h2 className="governor-brief-panel__title">Actions</h2>
        <p className="governor-brief-panel__subtitle">
          Blocking escalations and top-ranked gaps requiring governor attention.
        </p>
      </div>

      {renderOrderedSections(sectionOrder, [
        {
          id: 'escalations',
          render: () => (
            <div className="governor-brief__section">
              <div className="governor-brief__section-header">
                <h3 className="governor-brief__section-title">Blocking Escalations</h3>
                {view.openEscalations.length > 0 && (
                  <a
                    className="governor-brief__section-link"
                    href={dashboardPanelUrl('escalations')}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View all →
                  </a>
                )}
              </div>
              {view.openEscalations.length === 0 ? (
                <div className="governor-brief__empty">No open escalations.</div>
              ) : (
                <div className="governor-brief__link-list">
                  {view.openEscalations.map(e => (
                    <a
                      key={e.id}
                      className="governor-brief__link-item"
                      href={dashboardPanelUrl('escalations')}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="governor-brief__link-item-body">
                        <span className="governor-brief__link-item-id">{e.id}</span>
                        <span className="governor-brief__link-item-title">{e.title}</span>
                      </span>
                      {e.blastRadius && (
                        <span className="governor-brief__link-item-meta">{e.blastRadius}</span>
                      )}
                      <span className="governor-brief__link-arrow">→</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ),
        },
        {
          id: 'gaps',
          render: () => (
            <div className="governor-brief__section">
              <div className="governor-brief__section-header">
                <h3 className="governor-brief__section-title">Top Gaps</h3>
                {view.topGaps.length > 0 && (
                  <a
                    className="governor-brief__section-link"
                    href={dashboardPanelUrl('gapLedger')}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View all →
                  </a>
                )}
              </div>
              {view.topGaps.length === 0 ? (
                <div className="governor-brief__empty">
                  No gap analysis found. Run the Gap Definer to compute gaps.
                </div>
              ) : (
                <div className="governor-brief__link-list">
                  {view.topGaps.map((gap, i) => (
                    <a
                      key={gap.id ?? i}
                      className="governor-brief__link-item"
                      href={dashboardPanelUrl('gapLedger')}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="governor-brief__link-item-body">
                        <span className="governor-brief__link-item-id">{gap.id ?? `G-0${i + 1}`}</span>
                        <span className="governor-brief__link-item-title">
                          {gap.target} — {gap.dimension}
                        </span>
                      </span>
                      {gap.finalPriorityScore !== undefined && (
                        <span className="governor-brief__link-item-meta">
                          Priority {gap.finalPriorityScore}
                        </span>
                      )}
                      <span className="governor-brief__link-arrow">→</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ),
        },
      ])}
    </section>
  );
}
