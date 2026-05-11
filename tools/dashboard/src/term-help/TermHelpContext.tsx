import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { parseTermHelpMarkdown } from './parser';
import type { TermHelpMap } from './types';

const TermHelpContext = createContext<TermHelpMap>({});

interface Props {
  children: ReactNode;
  initialTerms?: TermHelpMap;
}

export function TermHelpProvider({ children, initialTerms }: Props) {
  const [terms, setTerms] = useState<TermHelpMap>(initialTerms ?? {});

  useEffect(() => {
    if (initialTerms) return;

    let cancelled = false;
    fetch('/TERM_HELP.md')
      .then(response => response.ok ? response.text() : '')
      .then(markdown => {
        if (!cancelled && markdown.trim()) {
          setTerms(parseTermHelpMarkdown(markdown));
        }
      })
      .catch(() => {
        if (!cancelled) setTerms({});
      });

    return () => {
      cancelled = true;
    };
  }, [initialTerms]);

  const value = useMemo(() => terms, [terms]);
  return <TermHelpContext.Provider value={value}>{children}</TermHelpContext.Provider>;
}

export function useTermHelp(termKey?: string) {
  const terms = useContext(TermHelpContext);
  if (!termKey) return undefined;
  return terms[termKey];
}
