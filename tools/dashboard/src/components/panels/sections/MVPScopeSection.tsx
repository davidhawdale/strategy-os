import type { MVPScope } from '../../../model/types';
import './MVPScopeSection.css';

interface Props {
  mvpScope: MVPScope;
}

export function MVPScopeSection({ mvpScope }: Props) {
  return (
    <div className="mvp-scope-section">
      <h4 className="proposal-subsection-heading">MVP Scope</h4>
      <div className="mvp-scope-card">
        {mvpScope.included.length > 0 && (
          <div className="mvp-scope-zone">
            <h5 className="mvp-scope-zone__label">Included</h5>
            <ul className="mvp-scope-list mvp-scope-list--included">
              {mvpScope.included.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {mvpScope.excluded.length > 0 && (
          <div className="mvp-scope-zone">
            <h5 className="mvp-scope-zone__label">Excluded</h5>
            <ul className="mvp-scope-list mvp-scope-list--excluded">
              {mvpScope.excluded.map((item, i) => (
                <li key={i}>
                  <strong>{item.feature}</strong>
                  {item.whyExcluded && <span>{item.whyExcluded}</span>}
                </li>
              ))}
            </ul>
          </div>
        )}

        {(mvpScope.ahaMoment || mvpScope.timeToValueTarget) && (
          <div className="mvp-scope-signals">
            {mvpScope.ahaMoment && (
              <p>
                <strong>Aha moment</strong>
                <span>{mvpScope.ahaMoment}</span>
              </p>
            )}
            {mvpScope.timeToValueTarget && (
              <p>
                <strong>Time-to-value target</strong>
                <span>{mvpScope.timeToValueTarget}</span>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
