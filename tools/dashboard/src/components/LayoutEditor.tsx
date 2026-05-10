import type { PanelId } from '../model/types';
import type { DashboardPanelNavItem } from '../dashboard/panelRegistry';
import type { SectionOrderMap } from '../dashboard/layoutModel';
import { createPanelOrderExportSnippet } from '../dashboard/layoutModel';
import './LayoutEditor.css';

interface Props {
  panels: DashboardPanelNavItem[];
  order: PanelId[];
  sectionOrders: SectionOrderMap;
  onMovePanel: (panel: PanelId, direction: 'up' | 'down') => void;
  onMoveSection: (panel: PanelId, section: string, direction: 'up' | 'down') => void;
  onReset: () => void;
  onClose: () => void;
}

function formatGroup(group: string): string {
  return group.charAt(0).toUpperCase() + group.slice(1);
}

export function LayoutEditor({
  panels,
  order,
  sectionOrders,
  onMovePanel,
  onMoveSection,
  onReset,
  onClose,
}: Props) {
  const exportSnippet = createPanelOrderExportSnippet(order, sectionOrders);

  return (
    <div className="layout-editor" role="dialog" aria-modal="true" aria-labelledby="layout-editor-title">
      <div className="layout-editor__backdrop" onClick={onClose} />
      <aside className="layout-editor__panel">
        <div className="layout-editor__header">
          <div>
            <h2 id="layout-editor-title" className="layout-editor__title">Dashboard Layout</h2>
            <p className="layout-editor__subtitle">
              Reorder panels locally and use the section map to plan the command centre.
            </p>
          </div>
          <button className="layout-editor__icon-button" type="button" onClick={onClose} aria-label="Close layout editor">
            X
          </button>
        </div>

        <div className="layout-editor__body">
          <ol className="layout-editor__panel-list">
            {panels.map((panel, index) => (
              <li key={panel.id} className="layout-editor__card">
                <div className="layout-editor__card-main">
                  <div className="layout-editor__card-kicker">
                    <span>{index + 1}</span>
                    <span>{formatGroup(panel.group)}</span>
                    {panel.requiresGapAnalysis && <span>Gap analysis</span>}
                  </div>
                  <h3 className="layout-editor__card-title">{panel.label}</h3>
                  {panel.description && (
                    <p className="layout-editor__card-description">{panel.description}</p>
                  )}
                  {panel.sections && panel.sections.length > 0 && (
                    <ul className="layout-editor__section-list" aria-label={`${panel.label} sections`}>
                      {panel.sections.map((section, sectionIndex) => (
                        <li key={section.id}>
                          <span>{section.label}</span>
                          <span className="layout-editor__section-actions" aria-label={`${section.label} order controls`}>
                            <button
                              type="button"
                              onClick={() => onMoveSection(panel.id, section.id, 'up')}
                              disabled={sectionIndex === 0}
                              aria-label={`Move ${section.label} up`}
                            >
                              Up
                            </button>
                            <button
                              type="button"
                              onClick={() => onMoveSection(panel.id, section.id, 'down')}
                              disabled={sectionIndex === panel.sections!.length - 1}
                              aria-label={`Move ${section.label} down`}
                            >
                              Down
                            </button>
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="layout-editor__card-actions" aria-label={`${panel.label} order controls`}>
                  <button
                    type="button"
                    onClick={() => onMovePanel(panel.id, 'up')}
                    disabled={index === 0}
                    aria-label={`Move ${panel.label} up`}
                  >
                    Up
                  </button>
                  <button
                    type="button"
                    onClick={() => onMovePanel(panel.id, 'down')}
                    disabled={index === panels.length - 1}
                    aria-label={`Move ${panel.label} down`}
                  >
                    Down
                  </button>
                </div>
              </li>
            ))}
          </ol>

          <section className="layout-editor__export" aria-labelledby="layout-editor-export-title">
            <h3 id="layout-editor-export-title">Current order</h3>
            <pre>{exportSnippet}</pre>
          </section>
        </div>

        <div className="layout-editor__footer">
          <button className="layout-editor__secondary-button" type="button" onClick={onReset}>
            Reset
          </button>
          <button className="layout-editor__primary-button" type="button" onClick={onClose}>
            Done
          </button>
        </div>
      </aside>
    </div>
  );
}
