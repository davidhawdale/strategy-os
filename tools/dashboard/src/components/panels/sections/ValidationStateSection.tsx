import type { DesiredState, CurrentState } from '../../../model/types';
import { InlineMarkdownText } from '../../shared/InlineMarkdownText';
import './ValidationStateSection.css';

interface Props {
  desiredState?: DesiredState;
  currentState?: CurrentState;
  desiredStateText?: string;
  currentStateText?: string;
}

function hasDesiredStateItems(desiredState?: DesiredState) {
  return !!desiredState && (desiredState.supportedMeans.length > 0 || desiredState.brokenMeans.length > 0);
}

function hasCurrentStateItems(currentState?: CurrentState) {
  return !!currentState && (
    currentState.met.length > 0 ||
    currentState.partial.length > 0 ||
    currentState.missing.length > 0 ||
    currentState.contradicted.length > 0
  );
}

function renderParagraphs(text: string) {
  return text.split(/\n{2,}/)
    .map(paragraph => paragraph.trim())
    .filter(Boolean)
    .map((paragraph, index) => (
      <p key={index} className="validation-state-text">
        <InlineMarkdownText text={paragraph.replace(/\n/g, ' ')} />
      </p>
    ));
}

export function ValidationStateSection({
  desiredState,
  currentState,
  desiredStateText,
  currentStateText,
}: Props) {
  const hasDesired = hasDesiredStateItems(desiredState) || !!desiredStateText?.trim();
  const hasCurrent = hasCurrentStateItems(currentState) || !!currentStateText?.trim();
  if (!hasDesired && !hasCurrent) return null;

  return (
    <div className="detail-section">
      <h3 className="section-heading">Validation State</h3>
      {hasDesired && (
        <div className="validation-zone">
          <h4 className="subsection-heading">Desired State</h4>
          {desiredStateText && !hasDesiredStateItems(desiredState) && renderParagraphs(desiredStateText)}
          {(desiredState?.supportedMeans.length ?? 0) > 0 && (
            <div className="validation-zone">
              <h4 className="subsection-heading">SUPPORTED means</h4>
              <ul className="validation-list">
                {desiredState?.supportedMeans.map((s, i) => <li key={i}><InlineMarkdownText text={s} /></li>)}
              </ul>
            </div>
          )}
          {(desiredState?.brokenMeans.length ?? 0) > 0 && (
            <div className="validation-zone">
              <h4 className="subsection-heading">BROKEN means</h4>
              <ul className="validation-list">
                {desiredState?.brokenMeans.map((s, i) => <li key={i}><InlineMarkdownText text={s} /></li>)}
              </ul>
            </div>
          )}
          {desiredStateText && hasDesiredStateItems(desiredState) && renderParagraphs(desiredStateText)}
        </div>
      )}

      {hasCurrent && (
        <div className="validation-zone">
          <h4 className="subsection-heading">Current State</h4>
          {currentStateText && !hasCurrentStateItems(currentState) && renderParagraphs(currentStateText)}
          {(currentState?.met.length ?? 0) > 0 && (
            <div className="validation-zone">
              <h4 className="subsection-heading validation-met">Met</h4>
              <ul className="validation-list">
                {currentState?.met.map((s, i) => <li key={i}><InlineMarkdownText text={s} /></li>)}
              </ul>
            </div>
          )}
          {(currentState?.partial.length ?? 0) > 0 && (
            <div className="validation-zone">
              <h4 className="subsection-heading validation-partial">Partial</h4>
              <ul className="validation-list">
                {currentState?.partial.map((s, i) => <li key={i}><InlineMarkdownText text={s} /></li>)}
              </ul>
            </div>
          )}
          {(currentState?.missing.length ?? 0) > 0 && (
            <div className="validation-zone">
              <h4 className="subsection-heading validation-missing">Missing</h4>
              <ul className="validation-list">
                {currentState?.missing.map((s, i) => <li key={i}><InlineMarkdownText text={s} /></li>)}
              </ul>
            </div>
          )}
          {(currentState?.contradicted.length ?? 0) > 0 && (
            <div className="validation-zone">
              <h4 className="subsection-heading validation-contradicted">Contradicted</h4>
              <ul className="validation-list">
                {currentState?.contradicted.map((s, i) => <li key={i}><InlineMarkdownText text={s} /></li>)}
              </ul>
            </div>
          )}
          {currentStateText && hasCurrentStateItems(currentState) && renderParagraphs(currentStateText)}
        </div>
      )}
    </div>
  );
}
