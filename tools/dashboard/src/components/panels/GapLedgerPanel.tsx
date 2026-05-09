import type { GapLedgerView } from '../../model/types';
import { FullGapRecordsSection } from './sections/FullGapRecordsSection';
import { GapLedgerSummarySection } from './sections/GapLedgerSummarySection';
import { GateDecisionSection } from './sections/GateDecisionSection';
import { RankedGapsSection } from './sections/RankedGapsSection';

interface Props {
  view: GapLedgerView;
}

export function GapLedgerPanel({ view }: Props) {
  return (
    <section
      id="panel-gapLedger"
      role="tabpanel"
      aria-label="Gap Ledger"
      className="panel"
    >
      <div className="panel__header">
        <h2 className="panel__title">Gap Ledger</h2>
        <p className="panel__subtitle">Ranked gaps and gate decision</p>
      </div>

      <GateDecisionSection gateSummary={view.gateSummary} />
      <GapLedgerSummarySection view={view} />
      <RankedGapsSection gaps={view.topGaps} />
      <FullGapRecordsSection gaps={view.fullGapRecords} />

      {view.topGaps.length === 0 && !view.fullGapRecords?.length && (
        <p className="gap-ledger__empty">No gaps recorded yet. Run the Gap Definer to compute gaps.</p>
      )}
    </section>
  );
}
