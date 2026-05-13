export interface TermHelpEntry {
  key: string;
  term: string;
  dashboardLabel?: string;
  helpText: string;
  canonicalSource?: string;
}

export type TermHelpMap = Record<string, TermHelpEntry>;
