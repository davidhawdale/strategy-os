import type { ReadinessView, HypothesisId } from '../../model/types';
import { HypothesisReadinessGridSection } from './sections/HypothesisReadinessGridSection';
import { ReadinessAlertsSection } from './sections/ReadinessAlertsSection';
import { renderOrderedSections } from './sections/renderOrderedSections';

interface Props {
  view: ReadinessView;
  onSelectHypothesis: (id: HypothesisId) => void;
  sectionOrder?: string[];
}

export function ReadinessPanel({ view, onSelectHypothesis, sectionOrder }: Props) {
  return (
    <section
      id="panel-readiness"
      role="tabpanel"
      aria-label="Readiness Overview"
      className="panel"
    >
      <div className="panel__header">
        <h2 className="panel__title">Readiness Overview</h2>
        <p className="panel__subtitle">Am I Sell & Grow ready? What's blocking?</p>
      </div>

      {renderOrderedSections(sectionOrder, [
        { id: 'alerts', render: () => <ReadinessAlertsSection blockers={view.blockers} warnings={view.warnings} /> },
        {
          id: 'hypothesisGrid',
          render: () => (
            <HypothesisReadinessGridSection
              hypotheses={view.hypothesisSummary}
              onSelectHypothesis={onSelectHypothesis}
            />
          ),
        },
      ])}
    </section>
  );
}
