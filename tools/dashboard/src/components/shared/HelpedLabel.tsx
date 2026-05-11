import type { ReactNode } from 'react';
import { TermHelp } from './TermHelp';

interface Props {
  children: ReactNode;
  termKey?: string;
}

export function HelpedLabel({ children, termKey }: Props) {
  return (
    <>
      {children}
      <TermHelp termKey={termKey} />
    </>
  );
}
