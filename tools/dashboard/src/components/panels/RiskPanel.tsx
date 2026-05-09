import type { RiskMapView } from '../../model/types';
import { KillSignalsSection } from './sections/KillSignalsSection';
import { RiskAssumptionGroupsSection } from './sections/RiskAssumptionGroupsSection';
import { RiskSummarySection } from './sections/RiskSummarySection';

interface Props {
  view: RiskMapView;
}

export function RiskPanel({ view }: Props) {
  return (
    <section id="panel-risk" role="tabpanel" aria-label="Risk Map" className="panel">
      <div className="panel__header">
        <h2 className="panel__title">Risk Map</h2>
        <p className="panel__subtitle">Which assumptions will kill the strategy if wrong?</p>
      </div>

      <RiskSummarySection byCriticality={view.byCriticality} />
      <RiskAssumptionGroupsSection assumptions={view.assumptions} />
      <KillSignalsSection killConditions={view.killConditions} />
    </section>
  );
}
