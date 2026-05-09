import type { ProposalsView } from '../../model/types';
import { GrowthArchitectureSection } from './sections/GrowthArchitectureSection';
import { GTMPlanSection } from './sections/GTMPlanSection';
import { SolutionDesignSection } from './sections/SolutionDesignSection';

interface Props {
  view: ProposalsView;
}

export function ProposalsPanel({ view }: Props) {
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

      <GrowthArchitectureSection growthArchitecture={view.growthArchitecture} />
      <SolutionDesignSection solutionDesign={view.solutionDesign} />
      <GTMPlanSection gtmPlan={view.gtmPlan} />
    </section>
  );
}
