import './ReadinessAlertsSection.css';

interface Props {
  blockers: string[];
  warnings: string[];
}

export function ReadinessAlertsSection({ blockers, warnings }: Props) {
  return (
    <>
      {blockers.length > 0 && (
        <div className="blockers" role="alert">
          <h3 className="blockers__title">Blockers</h3>
          <ul className="blockers__list">
            {blockers.map((blocker, i) => (
              <li key={i} className="blockers__item">{blocker}</li>
            ))}
          </ul>
        </div>
      )}

      {warnings.length > 0 && (
        <div className="warnings-block">
          <h3 className="warnings-block__title">Warnings</h3>
          <ul className="warnings-block__list">
            {warnings.map((warning, i) => (
              <li key={i} className="warnings-block__item">{warning}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
