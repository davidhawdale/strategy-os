import { DestructionNarrative } from './DestructionNarrative';
import './RedTeamResponseSection.css';

interface Props {
  text: string;
}

export function RedTeamResponseSection({ text }: Props) {
  return (
    <div className="detail-section">
      <h3 className="section-heading">Red Team Response</h3>
      <DestructionNarrative
        text={text}
        className="red-team-card"
        itemClassName="red-team-item"
        accent="danger"
      />
    </div>
  );
}
