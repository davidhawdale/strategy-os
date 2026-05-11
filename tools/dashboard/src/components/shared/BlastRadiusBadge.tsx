import type { BlastRadius } from '../../model/types';
import { TermHelp } from './TermHelp';

interface Props {
  radius?: BlastRadius;
  termHelp?: boolean;
}

export function BlastRadiusBadge({ radius, termHelp = false }: Props) {
  if (!radius) return null;
  return (
    <>
      <span className={`badge badge--blast-${radius.toLowerCase()}`}>
        {radius}
      </span>
      {termHelp && <TermHelp termKey="blast-radius" />}
    </>
  );
}
