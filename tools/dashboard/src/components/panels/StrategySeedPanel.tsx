import { useEffect, useState } from 'react';
import type { PanelId } from '../../model/types';
import type { GovernorBriefView } from '../../views/governor-brief';
import { renderOrderedSections } from './sections/renderOrderedSections';
import './StrategySeedPanel.css';

interface Props {
  view: GovernorBriefView;
  sectionOrder?: string[];
  onSelectPanel: (panel: PanelId) => void;
}

interface StrategySeedView {
  title: string;
  date?: string;
  mode?: string;
  futureState: string;
  currentReality: string;
  strategicBet: string;
  validationStandard: string;
}

function extractMarkdownSection(markdown: string, heading: string): string {
  const pattern = new RegExp(`^##\\s+${heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`, 'im');
  const match = markdown.match(pattern);
  if (!match || match.index === undefined) return '';

  const after = markdown.slice(match.index + match[0].length);
  const nextHeading = after.search(/\n##\s+/);
  return (nextHeading === -1 ? after : after.slice(0, nextHeading)).trim();
}

function extractSection(markdown: string, heading: string): string {
  return extractMarkdownSection(markdown, heading).replace(/\s+/g, ' ');
}

function extractField(markdown: string, label: string): string | undefined {
  const match = markdown.match(new RegExp(`^${label}:\\s*(.+)$`, 'im'));
  return match?.[1]?.trim();
}

function parseStrategySeed(markdown: string): StrategySeedView | null {
  const title = markdown.match(/^#\s+(.+)$/m)?.[1]?.trim();
  const futureState = extractSection(markdown, 'Future State');
  const currentReality = extractSection(markdown, 'Current Reality');
  const strategicBet = extractSection(markdown, 'Strategic Bet');
  const validationStandard = extractSection(markdown, 'Validation Standard');

  if (!title || !futureState || !currentReality || !strategicBet || !validationStandard) {
    return null;
  }

  return {
    title,
    date: extractField(markdown, 'Date'),
    mode: extractField(markdown, 'Mode'),
    futureState,
    currentReality,
    strategicBet,
    validationStandard,
  };
}

export function StrategySeedPanel({ view, sectionOrder, onSelectPanel }: Props) {
  void view;
  void onSelectPanel;

  const [strategySeed, setStrategySeed] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadText = async (path: string) => {
      const response = await fetch(path);
      if (!response.ok) return null;
      const text = await response.text();
      return text.trim() || null;
    };

    loadText('/problem.md')
      .then(problemText => {
        if (cancelled) return;
        setStrategySeed(problemText);
      })
      .catch(() => {
        if (cancelled) return;
        setStrategySeed(null);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const parsedSeed = strategySeed ? parseStrategySeed(strategySeed) : null;

  return (
    <section
      id="panel-strategy-seed"
      role="tabpanel"
      aria-label="Strategy Seed"
      className="panel governor-brief-panel"
    >
      <div className="governor-brief-panel__header">
        <h2 className="governor-brief-panel__title">Strategy Seed</h2>
      </div>

      {parsedSeed && (parsedSeed.date || parsedSeed.mode) && (
        <div className="governor-brief__seed-meta-row" aria-label="Strategy seed metadata">
          <div className="governor-brief__seed-meta">
            {parsedSeed.date && (
              <span className="governor-brief__seed-meta-item">
                <span className="governor-brief__seed-meta-label">Date:</span>
                <span>{parsedSeed.date}</span>
              </span>
            )}
            {parsedSeed.mode && (
              <span className="governor-brief__seed-mode">{parsedSeed.mode}</span>
            )}
          </div>
        </div>
      )}

      {renderOrderedSections(sectionOrder, [
        {
          id: 'strategySeed',
          render: () => strategySeed && (
            parsedSeed ? (
              <section className="governor-brief__seed-card" aria-label="Strategy Seed">
                <div className="governor-brief__seed-grid">
                  <article className="governor-brief__seed-panel">
                    <div className="governor-brief__seed-panel-label">
                      <span className="governor-brief__seed-panel-icon governor-brief__seed-panel-icon--blue" aria-hidden="true">◎</span>
                      <span>Future State</span>
                    </div>
                    <p className="governor-brief__seed-panel-text">{parsedSeed.futureState}</p>
                  </article>

                  <article className="governor-brief__seed-panel">
                    <div className="governor-brief__seed-panel-label">
                      <span className="governor-brief__seed-panel-icon governor-brief__seed-panel-icon--amber" aria-hidden="true">ϟ</span>
                      <span>Current Reality</span>
                    </div>
                    <p className="governor-brief__seed-panel-text">{parsedSeed.currentReality}</p>
                  </article>

                  <article className="governor-brief__seed-panel">
                    <div className="governor-brief__seed-panel-label">
                      <span className="governor-brief__seed-panel-icon governor-brief__seed-panel-icon--green" aria-hidden="true">↗</span>
                      <span>Strategic Bet</span>
                    </div>
                    <p className="governor-brief__seed-panel-text">{parsedSeed.strategicBet}</p>
                  </article>

                  <article className="governor-brief__seed-panel">
                    <div className="governor-brief__seed-panel-label">
                      <span className="governor-brief__seed-panel-icon governor-brief__seed-panel-icon--purple" aria-hidden="true">☑</span>
                      <span>Validation Standard</span>
                    </div>
                    <p className="governor-brief__seed-panel-text">{parsedSeed.validationStandard}</p>
                  </article>
                </div>
              </section>
            ) : (
              <div className="governor-brief__section">
                <div className="governor-brief__section-header">
                  <h3 className="governor-brief__section-title">Strategy Seed</h3>
                </div>
                <pre className="governor-brief__strategy-seed">{strategySeed}</pre>
              </div>
            )
          ),
        },
      ])}
    </section>
  );
}
