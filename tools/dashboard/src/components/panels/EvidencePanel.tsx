import type { EvidenceQualityView } from '../../model/types';
import { EvidenceHypothesisMatrixSection } from './sections/EvidenceHypothesisMatrixSection';
import { EvidenceQualityOverviewSection } from './sections/EvidenceQualityOverviewSection';
import { EvidenceTierGapsSection } from './sections/EvidenceTierGapsSection';
import { EvidenceTierLegendSection } from './sections/EvidenceTierLegendSection';
import { renderOrderedSections } from './sections/renderOrderedSections';

interface Props {
  view: EvidenceQualityView;
  sectionOrder?: string[];
}

export function EvidencePanel({ view, sectionOrder }: Props) {
  return (
    <section id="panel-evidence" role="tabpanel" aria-label="Evidence Quality" className="panel">
      <div className="panel__header">
        <h2 className="panel__title">Evidence Quality Matrix</h2>
        <p className="panel__subtitle">Where is my evidence weak? What's T3 that should be T1?</p>
      </div>

      {renderOrderedSections(sectionOrder, [
        { id: 'tierLegend', render: () => <EvidenceTierLegendSection /> },
        { id: 'qualityOverview', render: () => <EvidenceQualityOverviewSection overall={view.overall} /> },
        { id: 'hypothesisMatrix', render: () => <EvidenceHypothesisMatrixSection hypotheses={view.byHypothesis} /> },
        { id: 'tierGaps', render: () => <EvidenceTierGapsSection tierGaps={view.tierGaps} /> },
      ])}
    </section>
  );
}
