import type { RiskMapView } from '../../model/types';
import { KillSignalsSection } from './sections/KillSignalsSection';
import { RiskAssumptionGroupsSection } from './sections/RiskAssumptionGroupsSection';
import { RiskSummarySection } from './sections/RiskSummarySection';
import { renderOrderedSections } from './sections/renderOrderedSections';

interface Props {
  view: RiskMapView;
  sectionOrder?: string[];
}

export function RiskPanel({ view, sectionOrder }: Props) {
  return (
    <section id="panel-risk" role="tabpanel" aria-label="Assumptions" className="panel">
      <div className="panel__header">
        <h2 className="panel__title">Assumptions</h2>
        <p className="panel__subtitle">Which assumptions will kill the strategy if wrong?</p>
      </div>

      {renderOrderedSections(sectionOrder, [
        { id: 'summary', render: () => <RiskSummarySection byCriticality={view.byCriticality} /> },
        { id: 'assumptionGroups', render: () => <RiskAssumptionGroupsSection assumptions={view.assumptions} /> },
        { id: 'killSignals', render: () => <KillSignalsSection killConditions={view.killConditions} /> },
      ])}
    </section>
  );
}
