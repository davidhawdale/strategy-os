import type { GovernorEscalationCard } from '../../../model/types';
import { EscalationCardSection } from './EscalationCardSection';
import './EscalationListSection.css';

interface Props {
  title: string;
  escalations: GovernorEscalationCard[];
  resolved?: boolean;
}

export function EscalationListSection({ title, escalations, resolved = false }: Props) {
  if (escalations.length === 0) return null;

  return (
    <div
      className={`escalations-section ${resolved ? 'escalations-section--resolved' : ''}`}
      aria-label={`${title} escalations`}
    >
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
