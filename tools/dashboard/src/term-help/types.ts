export interface TermHelpEntry {
  key: string;
  term: string;
  helpText: string;
  canonicalSource?: string;
}

export type TermHelpMap = Record<string, TermHelpEntry>;
