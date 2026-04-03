import type { AssumptionStatus } from '../../model/types';

interface Props {
  status?: AssumptionStatus;
}

const LABELS: Record<AssumptionStatus, string> = {
  OPEN: 'OPEN',
  TESTING: 'TESTING',
  RESOLVED_TRUE: 'RESOLVED \u2713',
  RESOLVED_FALSE: 'RESOLVED \u2717',
  ESCALATED: 'ESCALATED',
};

const CLASS_SUFFIX: Record<AssumptionStatus, string> = {
  OPEN: 'open',
  TESTING: 'testing',
  RESOLVED_TRUE: 'resolved-true',
  RESOLVED_FALSE: 'resolved-false',
  ESCALATED: 'escalated',
};

export function AssumptionStatusBadge({ status }: Props) {
  if (!status) return null;
  return (
    <span className={`assumption-status assumption-status--${CLASS_SUFFIX[status]}`}>
      {LABELS[status]}
    </span>
  );
}
