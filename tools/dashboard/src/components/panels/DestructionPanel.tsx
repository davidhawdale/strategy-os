import type { DestructionView } from '../../model/types';
import { ConstraintInversionsSection } from './sections/ConstraintInversionsSection';
import { ContradictionsSection } from './sections/ContradictionsSection';
import { EvidenceConcentrationSection } from './sections/EvidenceConcentrationSection';
import { KillSignalAuditSection } from './sections/KillSignalAuditSection';
import { PreMortemSection } from './sections/PreMortemSection';
import { RedTeamResponseSection } from './sections/RedTeamResponseSection';

interface Props {
  view: DestructionView;
}

export function DestructionPanel({ view }: Props) {
  if (!view.hasDestructionLog) {
    return (
      <section id="panel-destruction" role="tabpanel" aria-label="Destruction Findings" className="panel">
        <div className="panel__header">
          <h2 className="panel__title">Destruction Findings</h2>
        </div>
        <div className="panel__empty" role="status">
          <p>No destruction log found. The strategy has not been stress-tested yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="panel-destruction" role="tabpanel" aria-label="Destruction Findings" className="panel">
      <div className="panel__header">
        <h2 className="panel__title">Destruction Findings</h2>
        <p className="panel__subtitle">What did the destruction phase find?</p>
      </div>

      {view.preMortem && (
        <PreMortemSection text={view.preMortem} />
      )}

      {view.redTeamResponse && (
        <RedTeamResponseSection text={view.redTeamResponse} />
      )}

      <ConstraintInversionsSection constraintInversions={view.constraintInversions} />
      <EvidenceConcentrationSection evidenceConcentration={view.evidenceConcentration} />
      <KillSignalAuditSection killSignalAudit={view.killSignalAudit} />
      <ContradictionsSection contradictions={view.contradictions} />
    </section>
  );
}
