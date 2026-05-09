import type { GapRecord } from '../../../model/types';
import { GapStatusBadge } from '../../shared/GapStatusBadge';
import './FullGapRecordsSection.css';

interface Props {
  gaps?: GapRecord[];
}

export function FullGapRecordsSection({ gaps }: Props) {
  if (!gaps || gaps.length === 0) return null;

  return (
    <div className="gap-ledger__full-records">
      <h3 className="gap-ledger__section-title">Full Gap Records</h3>
      {gaps.map((gap, i) => (
        <FullGapRecord key={gap.id ?? i} gap={gap} />
      ))}
    </div>
  );
}

function FullGapRecord({ gap }: { gap: GapRecord }) {
  return (
    <article id={gap.id ? `gap-record-${gap.id}` : undefined} className="gap-record" data-status={gap.status?.toLowerCase() ?? ''} aria-label={`Gap record: ${gap.id ?? gap.target}`}>
      <div className="gap-record__header">
        <h4 className="gap-record__title">{gap.id ?? gap.target}</h4>
        <GapStatusBadge status={gap.status} />
      </div>

      <dl className="gap-record__fields">
        <div className="gap-record__field">
          <dt>Target</dt>
          <dd>{gap.target}</dd>
        </div>
        <div className="gap-record__field">
          <dt>Dimension</dt>
          <dd>{gap.dimension}</dd>
        </div>
        {gap.desiredCondition && (
          <div className="gap-record__field gap-record__field--full">
            <dt>Desired Condition</dt>
            <dd>{gap.desiredCondition}</dd>
          </div>
        )}
        {gap.currentObservation && (
          <div className="gap-record__field gap-record__field--full">
            <dt>Current Observation</dt>
            <dd>{gap.currentObservation}</dd>
          </div>
        )}
      </dl>

      {gap.finalPriorityScore !== undefined && (
        <div className="gap-record__scores">
          {gap.confidenceGap !== undefined && <span className="gap-score-chip">Conf Gap: {gap.confidenceGap}</span>}
          {gap.evidenceWeakness !== undefined && <span className="gap-score-chip">Evid Weak: {gap.evidenceWeakness}</span>}
          {gap.painUncertainty !== undefined && <span className="gap-score-chip">Pain Uncert: {gap.painUncertainty}</span>}
          {gap.timePenalty !== undefined && <span className="gap-score-chip">Time Pen: {gap.timePenalty}</span>}
          {gap.blastRadiusWeight !== undefined && <span className="gap-score-chip">Blast: {gap.blastRadiusWeight}</span>}
          <span className="gap-score-chip gap-score-chip--total">Final: {gap.finalPriorityScore}</span>
        </div>
      )}

      {gap.recommendedAction && (
        <div className="gap-record__action">
          <h5 className="gap-record__action-title">Recommended Action</h5>
          {gap.recommendedAction.actionType && (
            <span className="gap-action-type">{gap.recommendedAction.actionType}</span>
          )}
          <p className="gap-record__action-desc">{gap.recommendedAction.description}</p>
          {gap.recommendedAction.expectedOutput && (
            <p className="gap-record__action-output">Expected: {gap.recommendedAction.expectedOutput}</p>
          )}
        </div>
      )}

      {gap.decisionRuleTriggered && (
        <p className="gap-record__rule">Rule: {gap.decisionRuleTriggered}</p>
      )}
    </article>
  );
}
