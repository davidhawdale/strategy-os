import type { GateSummary } from '../../../model/types';
import './GateDecisionSection.css';

interface Props {
  gateSummary?: GateSummary;
}

function GateDecisionBadge({ decision }: { decision?: GateSummary['decision'] }) {
  if (!decision) return null;
  const cls =
    decision === 'GO'
      ? 'gate-badge gate-badge--go'
      : decision === 'NO_GO'
      ? 'gate-badge gate-badge--no-go'
      : 'gate-badge gate-badge--conditional';
  const label =
    decision === 'GO' ? 'GO' : decision === 'NO_GO' ? 'NO GO' : 'CONDITIONAL GO';
  return <span className={cls}>{label}</span>;
}

export function GateDecisionSection({ gateSummary }: Props) {
  if (!gateSummary) return null;

  return (
    <div className="gap-ledger__gate">
      <div className="gap-ledger__gate-header">
        <h3 className="gap-ledger__gate-title">Gate Decision</h3>
        <GateDecisionBadge decision={gateSummary.decision} />
      </div>

      {gateSummary.predicateChecks.length > 0 && (
        <ul className="predicate-list" aria-label="Readiness gate predicate checks">
          {gateSummary.predicateChecks.map((check, i) => (
            <li key={i} className={`predicate-list__item predicate-list__item--${check.result}`}>
              <span className="predicate-list__icon" aria-hidden="true">
                {check.result === 'pass' ? '\u2713' : '\u2717'}
              </span>
              <span className="predicate-list__label">{check.predicate}</span>
            </li>
          ))}
        </ul>
      )}

      {gateSummary.reasons.length > 0 && (
        <div className="gap-ledger__gate-reasons">
          <h4 className="gap-ledger__gate-reasons-title">Why</h4>
          <ul className="gap-ledger__reasons-list">
            {gateSummary.reasons.map((reason, i) => (
              <li key={i} className="gap-ledger__reason">{reason}</li>
            ))}
          </ul>
        </div>
      )}

      {gateSummary.constraints.length > 0 && (
        <div className="gap-ledger__constraints">
          <h4 className="gap-ledger__constraints-title">Active Constraints</h4>
          <ul className="gap-ledger__constraints-list">
            {gateSummary.constraints.map((constraint, i) => (
              <li key={i} className="gap-ledger__constraint">{constraint}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
