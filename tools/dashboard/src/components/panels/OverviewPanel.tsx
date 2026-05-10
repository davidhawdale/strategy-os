import type { OverviewJourneyView } from '../../model/types';
import { ConfidenceBadge } from '../shared/ConfidenceBadge';
import { EvidenceBar } from '../shared/EvidenceBar';
import { GapStatusBadge } from '../shared/GapStatusBadge';
import { renderOrderedSections } from './sections/renderOrderedSections';
import './OverviewPanel.css';

interface Props {
  view: OverviewJourneyView;
  sectionOrder?: string[];
}

function formatDecisionState(state?: string): string {
  return state ? state.replace(/_/g, ' ') : 'Not queued';
}

function StateSection({ view }: { view: OverviewJourneyView }) {
  return (
    <section className="overview-state" aria-label="Current state">
      <div className="overview-state__item">
        <span className="overview-state__label">Sell Ready</span>
        <span className={`overview-state__value ${view.currentState.sellReady ? 'overview-state__value--good' : 'overview-state__value--bad'}`}>
          {view.currentState.sellReady ? 'Ready' : 'Not Ready'}
        </span>
      </div>
      <div className="overview-state__item">
        <span className="overview-state__label">Scale Ready</span>
        <span className={`overview-state__value ${view.currentState.scaleReady ? 'overview-state__value--good' : ''}`}>
          {view.currentState.scaleReady ? 'Ready' : 'Not Ready'}
        </span>
      </div>
      <div className="overview-state__item">
        <span className="overview-state__label">Gate</span>
        <span className="overview-state__value">{view.currentState.gateDecision ?? 'No review'}</span>
      </div>
      <div className="overview-state__item">
        <span className="overview-state__label">Queue</span>
        <span className="overview-state__value">{formatDecisionState(view.currentState.decisionState)}</span>
      </div>
      {view.currentState.topBlocker && (
        <div className="overview-state__blocker">
          <span className="overview-state__label">Top Blocker</span>
          <p>{view.currentState.topBlocker}</p>
        </div>
      )}
    </section>
  );
}

function JourneySection({ view }: { view: OverviewJourneyView }) {
  return (
    <section className="overview-section" aria-label="Journey">
      <h3 className="section-heading">Journey</h3>
      <div className="overview-journey">
        {view.journeyStages.map(stage => (
          <article key={stage.id} className={`overview-stage overview-stage--${stage.status}`}>
            <div className="overview-stage__header">
              <span className="overview-stage__label">{stage.label}</span>
              <span className="overview-stage__status">{stage.status}</span>
            </div>
            <p>{stage.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function HypothesesSection({ view }: { view: OverviewJourneyView }) {
  return (
    <section className="overview-section" aria-label="Live hypotheses">
      <h3 className="section-heading">Live Hypotheses</h3>
      <div className="overview-hypotheses">
        {view.hypothesisLayer.map(hypothesis => (
          <article key={hypothesis.id} className="overview-hypothesis">
            <div className="overview-hypothesis__header">
              <h4>{hypothesis.label}</h4>
              <ConfidenceBadge confidence={hypothesis.confidence} />
            </div>
            <EvidenceBar
              t1={hypothesis.t1Count}
              t2={hypothesis.t2Count}
              t3={hypothesis.t3Count}
              total={hypothesis.evidenceCount}
            />
            <div className="overview-hypothesis__meta">
              <span>{hypothesis.evidenceCount} evidence</span>
              <span>{hypothesis.highBlastCount} high-blast</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ResearchUnlocksSection({ view }: { view: OverviewJourneyView }) {
  return (
    <section className="overview-section" aria-label="Research unlocks">
      <h3 className="section-heading">
        Research Unlocks
        <span className="section-heading__count">{view.researchUnlocks.length}</span>
      </h3>
      {view.researchUnlocks.length === 0 ? (
        <p className="overview-empty">No immediate research unlocks detected from the parsed register.</p>
      ) : (
        <ol className="overview-unlocks">
          {view.researchUnlocks.map(unlock => (
            <li key={unlock.id} className={`overview-unlock overview-unlock--${unlock.priority}`}>
              <div className="overview-unlock__header">
                <span className="overview-unlock__source">{unlock.source}</span>
                <span className="overview-unlock__priority">{unlock.priority}</span>
              </div>
              <p className="overview-unlock__reason">{unlock.reason}</p>
              <p className="overview-unlock__effect">{unlock.unlocks}</p>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

function NextMovesSection({ view }: { view: OverviewJourneyView }) {
  const hasActions = view.nextMoves.queueActions.length > 0;
  const hasDecisions = view.nextMoves.pendingDecisions.length > 0;

  return (
    <section className="overview-section" aria-label="Next moves">
      <h3 className="section-heading">Next Moves</h3>
      {!hasActions && !hasDecisions ? (
        <p className="overview-empty">No queue actions or pending decisions are currently visible.</p>
      ) : (
        <div className="overview-next">
          {hasActions && (
            <div className="overview-next__group">
              <h4>Queue Actions</h4>
              <ul className="overview-next__list">
                {view.nextMoves.queueActions.slice(0, 4).map(action => (
                  <li key={`${action.rank}-${action.gapId}`}>
                    <span className="overview-next__rank">#{action.rank}</span>
                    <span>{action.description}</span>
                    <GapStatusBadge status={action.isUrgent ? 'BLOCKED' : 'OPEN'} />
                  </li>
                ))}
              </ul>
            </div>
          )}
          {hasDecisions && (
            <div className="overview-next__group">
              <h4>Pending Decisions</h4>
              <ul className="overview-next__list">
                {view.nextMoves.pendingDecisions.slice(0, 4).map(decision => (
                  <li key={`${decision.id}-${decision.title}`}>
                    <span className="overview-next__rank">{decision.id || 'Decision'}</span>
                    <span>{decision.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export function OverviewPanel({ view, sectionOrder }: Props) {
  return (
    <section id="panel-overview" role="tabpanel" aria-label="Overview" className="panel overview-panel">
      <div className="panel__header">
        <h2 className="panel__title">Strategy Overview</h2>
        <p className="panel__subtitle">Current state, journey stage, research unlocks, and next moves.</p>
      </div>

      {renderOrderedSections(sectionOrder, [
        { id: 'state', render: () => <StateSection view={view} /> },
        { id: 'journey', render: () => <JourneySection view={view} /> },
        { id: 'hypotheses', render: () => <HypothesesSection view={view} /> },
        { id: 'researchUnlocks', render: () => <ResearchUnlocksSection view={view} /> },
        { id: 'nextMoves', render: () => <NextMovesSection view={view} /> },
      ])}
    </section>
  );
}
