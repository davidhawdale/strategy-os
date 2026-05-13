import { describe, expect, it } from 'vitest';
import termHelpMarkdown from '../../../../../TERM_HELP.md?raw';
import { parseTermHelpMarkdown } from '../parser';

describe('parseTermHelpMarkdown', () => {
  it('parses keyed term help rows from markdown', () => {
    const terms = parseTermHelpMarkdown(`
| Key | Term | Dashboard Label | Help Text | Canonical Source |
| --- | --- | --- | --- | --- |
| assumptions | Assumptions | Dependencies | Things that must be true. | STANDARDS.md |
| t3 | T3 | | Needs real-world validation. | CLAUDE.md |
`);

    expect(terms.assumptions).toEqual({
      key: 'assumptions',
      term: 'Assumptions',
      dashboardLabel: 'Dependencies',
      helpText: 'Things that must be true.',
      canonicalSource: 'STANDARDS.md',
    });
    expect(terms.t3.helpText).toBe('Needs real-world validation.');
  });

  it('parses the root TERM_HELP.md content file', () => {
    const terms = parseTermHelpMarkdown(termHelpMarkdown);

    expect(terms.evidence?.canonicalSource).toContain('STANDARDS.md');
    expect(terms.assumptions?.canonicalSource).toContain('STANDARDS.md');
    expect(terms.t1?.canonicalSource).toContain('CLAUDE.md');
    expect(terms['load-bearing']?.helpText).toBeTruthy();
  });
});
