import type { GapStatus } from '../../model/types';

interface Props {
  status: GapStatus;
}

const LABELS: Record<GapStatus, string> = {
  OPEN: 'OPEN',
  IN_PROGRESS: 'IN PROGRESS',
  RESOLVED: 'RESOLVED',
  BLOCKED: 'BLOCKED',
};

export function GapStatusBadge({ status }: Props) {
  const cls = {
    OPEN: 'gap-status gap-status--open',
    IN_PROGRESS: 'gap-status gap-status--in-progress',
    RESOLVED: 'gap-status gap-status--resolved',
    BLOCKED: 'gap-status gap-status--blocked',
  }[status] ?? 'gap-status';
  return <span className={cls}>{LABELS[status]}</span>;
}
