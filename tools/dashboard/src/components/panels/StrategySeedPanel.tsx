import { useEffect, useState } from 'react';
import type { HypothesisId, PanelId } from '../../model/types';
import { buildPanelUrl, isAddressablePanelId } from '../../model/panels';
import type { GovernorBriefView } from '../../views/governor-brief';
import {
  resolveGovernorBriefResearchTrace,
  type BuildPassProvenanceManifest,
} from '../../views/governorBriefProvenance';
import { InlineMarkdownText } from '../shared/InlineMarkdownText';
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

interface ResearchItem {
  label: string;
  markdown: string;
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

function parseWhatWasResearched(markdown: string): ResearchItem[] {
  const section = extractMarkdownSection(markdown, 'What Was Researched');
  if (!section) return [];

  return section
    .split(/\n(?=-\s+)/)
    .map(item => item.trim())
    .filter(Boolean)
    .map(item => item.replace(/^-+\s*/, ''))
    .map(item => {
      const match = item.match(/^\*\*(.+?)\*\*:\s*(.+)$/s);
      if (!match) return null;
      return {
        label: match[1].trim(),
        markdown: item.replace(/\s+/g, ' ').trim(),
      };
    })
    .filter((item): item is ResearchItem => item !== null);
}

export function StrategySeedPanel({ view, sectionOrder, onSelectPanel }: Props) {
  void onSelectPanel;

  const [strategySeed, setStrategySeed] = useState<string | null>(null);
  const [buildPassComplete, setBuildPassComplete] = useState<string | null>(null);
  const [provenanceManifest, setProvenanceManifest] = useState<BuildPassProvenanceManifest | null>(null);
  const [activeResearchSourcesLabel, setActiveResearchSourcesLabel] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadText = async (path: string) => {
      const response = await fetch(path);
      if (!response.ok) return null;
      const text = await response.text();
      return text.trim() || null;
    };

    const loadJson = async <T,>(path: string): Promise<T | null> => {
      const response = await fetch(path);
      if (!response.ok) return null;
      return response.json() as Promise<T>;
    };

    Promise.all([
      loadText('/problem.md').catch(() => null),
      loadText('/build-pass-complete.md').catch(() => null),
      loadJson<BuildPassProvenanceManifest>('/build-pass-complete.provenance.json').catch(() => null),
    ])
      .then(([problemText, buildPassText, manifest]) => {
        if (cancelled) return;
        setStrategySeed(problemText);
        setBuildPassComplete(buildPassText);
        setProvenanceManifest(manifest);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const parsedSeed = strategySeed ? parseStrategySeed(strategySeed) : null;

  const researchedItems = resolveGovernorBriefResearchTrace(
    buildPassComplete ? parseWhatWasResearched(buildPassComplete) : [],
    provenanceManifest,
    view.sourceEntriesByHypothesis,
  );
  const activeResearchItem = activeResearchSourcesLabel
    ? researchedItems.find(item => item.label === activeResearchSourcesLabel) ?? null
    : null;

  function openResearchSources(label: string) {
    setActiveResearchSourcesLabel(label);
  }

  function closeResearchSources() {
    setActiveResearchSourcesLabel(null);
  }

  function hypothesisPanelUrl(id: HypothesisId): string {
    if (typeof window === 'undefined' || !isAddressablePanelId(id)) {
      return `?panel=${id}`;
    }
    return buildPanelUrl(id, window.location.href);
  }

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
        {
          id: 'researchFindings',
          render: () => researchedItems.length > 0 && (
            <div className="governor-brief__section">
              <div className="governor-brief__section-header">
                <h3 className="governor-brief__section-title">Research Summary</h3>
              </div>
              <ul className="governor-brief__research-list">
                {researchedItems.map(item => (
                  <li key={item.label} className="governor-brief__research-item">
                    <p className="governor-brief__research-summary">
                      <InlineMarkdownText text={item.markdown} />
                      {item.sources.length > 0 && (
                        <>
                          {' '}
                          <button
                            type="button"
                            className="governor-brief__research-toggle"
                            onClick={() => openResearchSources(item.label)}
                          >
                            View sources
                          </button>
                        </>
                      )}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ),
        },
      ])}

      {activeResearchItem && (
        <div
          className="governor-brief__sources-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="strategy-seed-sources-title"
          onClick={event => {
            if (event.target === event.currentTarget) {
              closeResearchSources();
            }
          }}
        >
          <div className="governor-brief__sources-dialog">
            <div className="governor-brief__sources-dialog-header">
              <div className="governor-brief__sources-dialog-heading">
                <p className="governor-brief__sources-dialog-eyebrow">Research Summary</p>
                <h3 className="governor-brief__sources-dialog-title" id="strategy-seed-sources-title">
                  Sources
                </h3>
                <p className="governor-brief__sources-dialog-label">{activeResearchItem.label}</p>
              </div>
              <button
                type="button"
                className="governor-brief__sources-dialog-close"
                onClick={closeResearchSources}
                aria-label="Close sources"
              >
                Close
              </button>
            </div>

            <ul className="governor-brief__research-sources">
              {activeResearchItem.sources.map(source => (
                <li
                  key={[
                    source.hypothesisId,
                    source.kind,
                    source.url ?? '',
                    source.name ?? '',
                    source.raw,
                  ].join('::')}
                  className="governor-brief__research-source"
                >
                  <div className="governor-brief__research-source-meta">
                    <a
                      href={hypothesisPanelUrl(source.hypothesisId)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="governor-brief__research-source-pill"
                    >
                      {source.hypothesisLabel}
                    </a>
                    <span className="governor-brief__research-source-kind">
                      {source.kind === 'evidence' ? 'Evidence' : 'Research'}
                    </span>
                  </div>
                  <p className="governor-brief__research-source-text">
                    {source.url ? (
                      <>
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="source-link"
                        >
                          {source.name ?? source.url}
                        </a>
                        {source.note && <>: {source.note}</>}
                      </>
                    ) : (
                      source.name ?? source.description
                    )}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
