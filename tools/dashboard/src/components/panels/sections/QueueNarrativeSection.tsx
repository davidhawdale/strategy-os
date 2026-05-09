import './QueueNarrativeSection.css';

interface Props {
  narrative?: string;
}

export function QueueNarrativeSection({ narrative }: Props) {
  if (!narrative) return null;

  return (
    <div className="queue-narrative">
      <p className="queue-narrative__text">{narrative}</p>
    </div>
  );
}
