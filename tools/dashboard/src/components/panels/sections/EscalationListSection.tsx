import type { Escalation } from '../../../model/types';
import { EscalationCardSection } from './EscalationCardSection';
import './EscalationListSection.css';

interface Props {
  title: string;
  escalations: Escalation[];
  resolved?: boolean;
}

export function EscalationListSection({ title, escalations, resolved = false }: Props) {
  if (escalations.length === 0) return null;

  return (
    <div className={`escalations-section ${resolved ? 'escalations-section--resolved' : ''}`}>
      <h3 className="escalations-section__title">
        {title}
        <span className="escalations-section__count">{escalations.length}</span>
      </h3>
      <div className="escalations-list" role="list">
        {escalations.map((escalation, i) => (
          <div key={i} role="listitem">
            <EscalationCardSection escalation={escalation} />
          </div>
        ))}
      </div>
    </div>
  );
}
