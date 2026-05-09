import type { EvidenceQualityView } from '../../model/types';
import { EvidenceHypothesisMatrixSection } from './sections/EvidenceHypothesisMatrixSection';
import { EvidenceQualityOverviewSection } from './sections/EvidenceQualityOverviewSection';
import { EvidenceTierGapsSection } from './sections/EvidenceTierGapsSection';
import { EvidenceTierLegendSection } from './sections/EvidenceTierLegendSection';

interface Props {
  view: EvidenceQualityView;
}

export function EvidencePanel({ view }: Props) {
  return (
    <section id="panel-evidence" role="tabpanel" aria-label="Evidence Quality" className="panel">
      <div className="panel__header">
        <h2 className="panel__title">Evidence Quality Matrix</h2>
        <p className="panel__subtitle">Where is my evidence weak? What's T3 that should be T1?</p>
      </div>

      <EvidenceTierLegendSection />
      <EvidenceQualityOverviewSection overall={view.overall} />
      <EvidenceHypothesisMatrixSection hypotheses={view.byHypothesis} />
      <EvidenceTierGapsSection tierGaps={view.tierGaps} />
    </section>
  );
}
