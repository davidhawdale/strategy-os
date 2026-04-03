import type { RegisterMetadata, PanelId } from '../model/types';

interface Props {
  metadata: RegisterMetadata;
  parseCompleteness: number;
  warningCount: number;
  activePanel: PanelId;
  onSelectPanel: (panel: PanelId) => void;
  onRefresh: () => void;
  openEscalationsCount: number;
  hasGapAnalysis: boolean;
}

interface PanelDef {
  id: PanelId;
  label: string;
  shortLabel: string;
  gapAnalysisOnly?: boolean;
}

const PANELS: PanelDef[] = [
  { id: 'readiness', label: 'Readiness', shortLabel: 'Ready' },
  { id: 'evidence', label: 'Evidence Quality', shortLabel: 'Evidence' },
  { id: 'risk', label: 'Risk Map', shortLabel: 'Risk' },
  { id: 'destruction', label: 'Destruction', shortLabel: 'Destruct' },
  { id: 'proposals', label: 'Solution', shortLabel: 'Solution' },
  { id: 'gapLedger', label: 'Gap Ledger', shortLabel: 'Gaps', gapAnalysisOnly: false },
  { id: 'escalations', label: 'Escalations', shortLabel: 'Escalate', gapAnalysisOnly: true },
  { id: 'deadlines', label: 'Deadlines', shortLabel: 'Deadlines', gapAnalysisOnly: false },
];

export function Header({
  metadata,
  parseCompleteness,
  warningCount,
  activePanel,
  onSelectPanel,
  onRefresh,
  openEscalationsCount,
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

          <div className="header__parse-health" title={`Parse completeness: ${completenessPercent}%, ${warningCount} warnings`}>
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
          </div>

          <button className="header__refresh" onClick={onRefresh} aria-label="Refresh data">
            Refresh
          </button>
        </div>
      </div>

      <nav className="header__nav" role="navigation" aria-label="Dashboard panels">
        <ul className="header__nav-list" role="tablist">
          {PANELS.map(panel => {
            if (panel.gapAnalysisOnly && !hasGapAnalysis) return null;
            const isEscalations = panel.id === 'escalations';
            return (
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
                  {isEscalations && openEscalationsCount > 0 && (
                    <span
                      className="header__nav-badge"
                      aria-label={`${openEscalationsCount} open escalation${openEscalationsCount === 1 ? '' : 's'}`}
                    >
                      {openEscalationsCount}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
