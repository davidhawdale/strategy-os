import type { RegisterMetadata, PanelId } from '../model/types';
import type { DashboardPanelNavItem } from '../dashboard/panelRegistry';

interface Props {
  metadata: RegisterMetadata;
  parseCompleteness: number;
  warningCount: number;
  activePanel: PanelId;
  panels: DashboardPanelNavItem[];
  onSelectPanel: (panel: PanelId) => void;
  onRefresh: () => void;
  onOpenDiagnostics: () => void;
  onOpenLayoutEditor: () => void;
  onReset?: () => void;
  hasGapAnalysis: boolean;
}

export function Header({
  metadata,
  parseCompleteness,
  warningCount,
  activePanel,
  panels,
  onSelectPanel,
  onRefresh,
  onOpenDiagnostics,
  onOpenLayoutEditor,
  onReset,
  hasGapAnalysis,
}: Props) {
  const completenessPercent = Math.round(parseCompleteness * 100);
  const sellReady = metadata.sellReady;

  return (
    <header className="header" role="banner">
      <div className="header__top">
        <div className="header__title-group">
          <h1 className="header__title">Strategy Command Center</h1>
          <div className="header__meta">
            {metadata.businessMode && (
              <span>{metadata.businessMode}</span>
            )}
            {metadata.buildMethod && (
              <span>{metadata.buildMethod}</span>
            )}
            {metadata.lastReviewed && (
              <span>{metadata.lastReviewed}</span>
            )}
            {hasGapAnalysis && (
              <span className="header__meta-badge header__meta-badge--gap">Gap Analysis</span>
            )}
          </div>
        </div>

        <div className="header__status-group">
          <div className={`header__readiness ${sellReady ? 'header__readiness--yes' : 'header__readiness--no'}`}>
            <span className="header__readiness-label">Sell Ready</span>
            <span className="header__readiness-value" role="status">
              {sellReady ? 'Ready' : 'Not Ready'}
            </span>
          </div>

          <button
            className="header__parse-health"
            type="button"
            onClick={onOpenDiagnostics}
            title={`Parse completeness: ${completenessPercent}%, ${warningCount} warnings`}
            aria-label={`Open parser diagnostics: ${completenessPercent}% parsed, ${warningCount} warnings`}
          >
            <div className="header__parse-bar">
              <div
                className="header__parse-fill"
                style={{ width: `${completenessPercent}%` }}
                role="progressbar"
                aria-valuenow={completenessPercent}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Parse completeness: ${completenessPercent}%`}
              />
            </div>
            <span className="header__parse-label">{completenessPercent}% parsed</span>
          </button>

          <button className="header__refresh" onClick={onRefresh} aria-label="Refresh data">
            Refresh
          </button>
          <button className="header__refresh" onClick={onOpenLayoutEditor} aria-label="Open layout editor">
            Layout
          </button>
          {onReset && (
            <button className="header__reset" onClick={onReset} aria-label="Reset to blank state">
              Start Over
            </button>
          )}
        </div>
      </div>

      <nav className="header__nav" role="navigation" aria-label="Dashboard panels">
        <ul className="header__nav-list" role="tablist">
          {panels.map(panel => (
            <li key={panel.id} role="presentation">
              <button
                role="tab"
                aria-selected={activePanel === panel.id}
                aria-controls={`panel-${panel.id}`}
                className={`header__nav-tab ${activePanel === panel.id ? 'header__nav-tab--active' : ''}`}
                onClick={() => onSelectPanel(panel.id)}
              >
                <span className="header__nav-tab-full">{panel.label}</span>
                <span className="header__nav-tab-short">{panel.shortLabel}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
