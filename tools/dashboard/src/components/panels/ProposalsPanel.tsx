import type { ProposalsView } from '../../model/types';
import { GrowthArchitectureSection } from './sections/GrowthArchitectureSection';
import { GTMPlanSection } from './sections/GTMPlanSection';
import { SolutionDesignSection } from './sections/SolutionDesignSection';
import { renderOrderedSections } from './sections/renderOrderedSections';

interface Props {
  view: ProposalsView;
  sectionOrder?: string[];
}

export function ProposalsPanel({ view, sectionOrder }: Props) {
  return (
    <section
      id="panel-proposals"
      role="tabpanel"
      aria-label="Proposals"
      className="panel"
    >
      <div className="panel__header">
        <h2 className="panel__title">Proposals</h2>
        <p className="panel__subtitle">Growth architecture, solution design, and GTM plan</p>
      </div>

      {renderOrderedSections(sectionOrder, [
        { id: 'growthArchitecture', render: () => <GrowthArchitectureSection growthArchitecture={view.growthArchitecture} /> },
        { id: 'solutionDesign', render: () => <SolutionDesignSection solutionDesign={view.solutionDesign} /> },
        { id: 'gtmPlan', render: () => <GTMPlanSection gtmPlan={view.gtmPlan} /> },
      ])}
    </section>
  );
}
