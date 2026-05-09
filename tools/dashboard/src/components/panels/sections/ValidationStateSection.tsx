import type { DesiredState, CurrentState } from '../../../model/types';
import './ValidationStateSection.css';

interface Props {
  desiredState?: DesiredState;
  currentState?: CurrentState;
}

export function ValidationStateSection({ desiredState, currentState }: Props) {
  if (!desiredState && !currentState) return null;

  return (
    <>
      {desiredState && (
        <div className="detail-section">
          <h3 className="section-heading">Desired State</h3>
          {desiredState.supportedMeans.length > 0 && (
            <div className="validation-zone">
              <h4 className="subsection-heading">SUPPORTED means</h4>
              <ul className="validation-list">
                {desiredState.supportedMeans.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}
          {desiredState.brokenMeans.length > 0 && (
            <div className="validation-zone">
              <h4 className="subsection-heading">BROKEN means</h4>
              <ul className="validation-list">
                {desiredState.brokenMeans.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}
        </div>
      )}

      {currentState && (
        <div className="detail-section">
          <h3 className="section-heading">Current State</h3>
          {currentState.met.length > 0 && (
            <div className="validation-zone">
              <h4 className="subsection-heading validation-met">Met</h4>
              <ul className="validation-list">
                {currentState.met.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}
          {currentState.partial.length > 0 && (
            <div className="validation-zone">
              <h4 className="subsection-heading validation-partial">Partial</h4>
              <ul className="validation-list">
                {currentState.partial.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}
          {currentState.missing.length > 0 && (
            <div className="validation-zone">
              <h4 className="subsection-heading validation-missing">Missing</h4>
              <ul className="validation-list">
                {currentState.missing.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}
          {currentState.contradicted.length > 0 && (
            <div className="validation-zone">
              <h4 className="subsection-heading validation-contradicted">Contradicted</h4>
              <ul className="validation-list">
                {currentState.contradicted.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  );
}
