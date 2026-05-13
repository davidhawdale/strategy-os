import type { GapLedgerView } from '../../model/types';
import { FullGapRecordsSection } from './sections/FullGapRecordsSection';
import { GapLedgerSummarySection } from './sections/GapLedgerSummarySection';
import { GateDecisionSection } from './sections/GateDecisionSection';
import { RankedGapsSection } from './sections/RankedGapsSection';
import { renderOrderedSections } from './sections/renderOrderedSections';

interface Props {
  view: GapLedgerView;
  sectionOrder?: string[];
}

export function GapLedgerPanel({ view, sectionOrder }: Props) {
  return (
    <section
      id="panel-gapLedger"
      role="tabpanel"
      aria-label="Gaps"
      className="panel"
    >
      <div className="panel__header">
        <h2 className="panel__title">Gaps</h2>
        <p className="panel__subtitle">Ranked gaps and gate decision</p>
      </div>

      {renderOrderedSections(sectionOrder, [
        { id: 'gateDecision', render: () => <GateDecisionSection gateSummary={view.gateSummary} /> },
        { id: 'summary', render: () => <GapLedgerSummarySection view={view} /> },
        { id: 'rankedGaps', render: () => <RankedGapsSection gaps={view.topGaps} /> },
        { id: 'fullGapRecords', render: () => <FullGapRecordsSection gaps={view.fullGapRecords} /> },
      ])}

      {view.topGaps.length === 0 && !view.fullGapRecords?.length && (
        <p className="gap-ledger__empty">No gaps recorded yet. Run the Gap Definer to compute gaps.</p>
      )}
    </section>
  );
}
