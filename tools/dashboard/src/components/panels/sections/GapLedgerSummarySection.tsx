import type { GapLedgerView } from '../../../model/types';
import './GapLedgerSummarySection.css';

interface Props {
  view: Pick<GapLedgerView, 'activeGapCount' | 'maxActiveGaps' | 'sellReady' | 'scaleReady' | 'gapStatusDistribution'>;
}

export function GapLedgerSummarySection({ view }: Props) {
  return (
    <>
      <div className="gap-ledger__summary">
        <div className="gap-ledger__stat">
          <span className={`gap-ledger__stat-value ${view.activeGapCount > view.maxActiveGaps ? 'gap-ledger__stat-value--warn' : ''}`}>
            {view.activeGapCount}/{view.maxActiveGaps}
          </span>
          <span className="gap-ledger__stat-label">Active gaps (max {view.maxActiveGaps})</span>
        </div>
        <div className="gap-ledger__stat">
          <span className={`gap-ledger__stat-value ${view.sellReady ? 'gap-ledger__stat-value--ready' : 'gap-ledger__stat-value--not-ready'}`}>
            {view.sellReady ? 'Ready' : 'Not Ready'}
          </span>
          <span className="gap-ledger__stat-label">Sell Ready</span>
        </div>
        <div className="gap-ledger__stat">
          <span className={`gap-ledger__stat-value ${view.scaleReady ? 'gap-ledger__stat-value--ready' : 'gap-ledger__stat-value--not-ready'}`}>
            {view.scaleReady ? 'Ready' : 'Not Ready'}
          </span>
          <span className="gap-ledger__stat-label">Scale Ready</span>
        </div>
      </div>

      <div className="gap-ledger__status-row" aria-label="Gap status distribution">
        <span className="gap-status-count gap-status-count--open">{view.gapStatusDistribution.open} Open</span>
        <span className="gap-status-count gap-status-count--in-progress">{view.gapStatusDistribution.inProgress} In Progress</span>
        <span className="gap-status-count gap-status-count--blocked">{view.gapStatusDistribution.blocked} Blocked</span>
        <span className="gap-status-count gap-status-count--resolved">{view.gapStatusDistribution.resolved} Resolved</span>
      </div>
    </>
  );
}
