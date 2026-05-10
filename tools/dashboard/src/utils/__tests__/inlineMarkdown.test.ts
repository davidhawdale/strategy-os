import { describe, expect, it } from 'vitest';
import { parseInlineMarkdownParts } from '../inlineMarkdown';

describe('parseInlineMarkdownParts', () => {
  it('parses multiple citations in one string', () => {
    expect(parseInlineMarkdownParts('See [A](https://a.example/) and [B](https://b.example/).')).toEqual([
      { kind: 'text', text: 'See ' },
      { kind: 'link', label: 'A', url: 'https://a.example/' },
      { kind: 'text', text: ' and ' },
      { kind: 'link', label: 'B', url: 'https://b.example/' },
      { kind: 'text', text: '.' },
    ]);
  });

  it('parses bold and citations in the same string', () => {
    expect(parseInlineMarkdownParts('**Source:** [Press Gazette](https://pressgazette.co.uk/)')).toEqual([
      { kind: 'strong', text: 'Source:' },
      { kind: 'text', text: ' ' },
      { kind: 'link', label: 'Press Gazette', url: 'https://pressgazette.co.uk/' },
    ]);
  });

  it('leaves malformed citations as plain text', () => {
    expect(parseInlineMarkdownParts('Bad [source](not-a-url) remains.')).toEqual([
      { kind: 'text', text: 'Bad [source](not-a-url) remains.' },
    ]);
  });
});
