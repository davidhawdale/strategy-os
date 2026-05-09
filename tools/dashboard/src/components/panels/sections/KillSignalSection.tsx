import './KillSignalSection.css';

interface Props {
  killCondition?: string;
}

export function KillSignalSection({ killCondition }: Props) {
  if (!killCondition) return null;

  return (
    <div className="detail-section">
      <h3 className="section-heading">Kill Signal</h3>
      <div className="kill-condition-block">{killCondition}</div>
    </div>
  );
}
