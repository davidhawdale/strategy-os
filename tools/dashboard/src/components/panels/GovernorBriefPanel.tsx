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
import './GovernorBriefPanel.css';

interface Props {
  view: GovernorBriefView;
  sectionOrder?: string[];
  onSelectPanel: (panel: PanelId) => void;
}

interface GovernorBriefResearchItem {
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

function parseWhatWasResearched(markdown: string): GovernorBriefResearchItem[] {
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
    .filter((item): item is GovernorBriefResearchItem => item !== null);
}

export function GovernorBriefPanel({ view, sectionOrder, onSelectPanel }: Props) {
  void onSelectPanel;

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
      loadText('/build-pass-complete.md').catch(() => null),
      loadJson<BuildPassProvenanceManifest>('/build-pass-complete.provenance.json').catch(() => null),
    ])
      .then(([buildPassText, manifest]) => {
        if (cancelled) return;
        setBuildPassComplete(buildPassText);
        setProvenanceManifest(manifest);
      });

    return () => {
      cancelled = true;
    };
  }, []);

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
        <h2 className="governor-brief-panel__title">Governor Brief</h2>
        <p className="governor-brief-panel__subtitle">
          Research findings, blocking escalations, and top-ranked gaps requiring governor attention.
        </p>
      </div>

      {renderOrderedSections(sectionOrder, [
        {
          id: 'researchFindings',
          render: () => researchedItems.length > 0 && (
            <div className="governor-brief__section">
              <div className="governor-brief__section-header">
                <h3 className="governor-brief__section-title">Research Findings</h3>
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

      {activeResearchItem && (
        <div
          className="governor-brief__sources-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="governor-brief-sources-title"
          onClick={event => {
            if (event.target === event.currentTarget) {
              closeResearchSources();
            }
          }}
        >
          <div className="governor-brief__sources-dialog">
            <div className="governor-brief__sources-dialog-header">
              <div className="governor-brief__sources-dialog-heading">
                <p className="governor-brief__sources-dialog-eyebrow">Research Findings</p>
                <h3 className="governor-brief__sources-dialog-title" id="governor-brief-sources-title">
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
