import type { SupportState } from '../../model/types';

interface Props {
  state?: SupportState;
}

const LABELS: Record<SupportState, string> = {
  PROPOSED: 'PROPOSED',
  VALIDATED: 'VALIDATED',
  BLOCKED: 'BLOCKED',
};

export function SupportStateBadge({ state }: Props) {
  if (!state) return null;
  return (
    <span className={`support-badge support-badge--${state.toLowerCase()}`}>
      {LABELS[state]}
    </span>
  );
}
