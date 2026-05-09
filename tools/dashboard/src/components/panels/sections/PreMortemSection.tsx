import { DestructionNarrative } from './DestructionNarrative';
import './PreMortemSection.css';

interface Props {
  text: string;
}

export function PreMortemSection({ text }: Props) {
  return (
    <div className="detail-section">
      <h3 className="section-heading">Pre-Mortem</h3>
      <DestructionNarrative
        text={text}
        className="pre-mortem-card"
        itemClassName="pre-mortem-item"
        accent="warning"
      />
    </div>
  );
}
