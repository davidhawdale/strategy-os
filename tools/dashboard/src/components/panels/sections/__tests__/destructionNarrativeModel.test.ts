import { describe, expect, it } from 'vitest';
import {
  parseDestructionNarrative,
  renderInlineMarkdownParts,
} from '../destructionNarrativeModel';

describe('renderInlineMarkdownParts', () => {
  it('tokenizes inline bold markers', () => {
    expect(renderInlineMarkdownParts('This is **important** now.')).toEqual([
      { kind: 'text', text: 'This is ' },
      { kind: 'strong', text: 'important' },
      { kind: 'text', text: ' now.' },
    ]);
  });

  it('returns a single text part when no bold markers exist', () => {
    expect(renderInlineMarkdownParts('Plain narrative.')).toEqual([
      { kind: 'text', text: 'Plain narrative.' },
    ]);
  });

  it('tokenizes markdown citation links', () => {
    expect(renderInlineMarkdownParts('[National World](https://nationalworld.com/) responds.')).toEqual([
      { kind: 'link', label: 'National World', url: 'https://nationalworld.com/' },
      { kind: 'text', text: ' responds.' },
    ]);
  });

  it('preserves text around multiple citation links', () => {
    expect(renderInlineMarkdownParts('Sources: [A](https://a.example/) and [B](https://b.example/).')).toEqual([
      { kind: 'text', text: 'Sources: ' },
      { kind: 'link', label: 'A', url: 'https://a.example/' },
      { kind: 'text', text: ' and ' },
      { kind: 'link', label: 'B', url: 'https://b.example/' },
      { kind: 'text', text: '.' },
    ]);
  });

  it('leaves malformed links as text', () => {
    expect(renderInlineMarkdownParts('[National World](not-a-url) responds.')).toEqual([
      { kind: 'text', text: '[National World](not-a-url) responds.' },
    ]);
  });
});

describe('parseDestructionNarrative', () => {
  it('parses plain paragraphs split by blank lines', () => {
    expect(parseDestructionNarrative('First paragraph.\n\nSecond paragraph.')).toEqual([
      { kind: 'paragraph', parts: [{ kind: 'text', text: 'First paragraph.' }] },
      { kind: 'paragraph', parts: [{ kind: 'text', text: 'Second paragraph.' }] },
    ]);
  });

  it('parses labelled blocks', () => {
    expect(parseDestructionNarrative('**Failure scenario:** The strategy failed because demand was weak.')).toEqual([
      {
        kind: 'labelled',
        label: 'Failure scenario',
        parts: [{ kind: 'text', text: 'The strategy failed because demand was weak.' }],
      },
    ]);
  });

  it('preserves inline bold inside labelled blocks', () => {
    expect(parseDestructionNarrative('**Incumbent:** **National World** responds quickly.')).toEqual([
      {
        kind: 'labelled',
        label: 'Incumbent',
        parts: [
          { kind: 'strong', text: 'National World' },
          { kind: 'text', text: ' responds quickly.' },
        ],
      },
    ]);
  });

  it('handles bold and citation links in the same labelled block', () => {
    expect(parseDestructionNarrative('**Incumbent:** **National World** via [The Southern Reporter](https://www.thesouthernreporter.co.uk/).')).toEqual([
      {
        kind: 'labelled',
        label: 'Incumbent',
        parts: [
          { kind: 'strong', text: 'National World' },
          { kind: 'text', text: ' via ' },
          { kind: 'link', label: 'The Southern Reporter', url: 'https://www.thesouthernreporter.co.uk/' },
          { kind: 'text', text: '.' },
        ],
      },
    ]);
  });

  it('parses red-team incumbent citation blocks', () => {
    const narrative = [
      '**Incumbent:** [National World](https://nationalworld.com/) — publisher of [The Southern Reporter](https://www.thesouthernreporter.co.uk/), [Border Telegraph](https://www.bordertelegraph.com/), and [Hawick News](https://www.hawick-news.co.uk/).',
      '',
      '**Secondary incumbent:** [DC Thomson](https://www.dcthomson.co.uk/).',
    ].join('\n');

    expect(parseDestructionNarrative(narrative)).toEqual([
      {
        kind: 'labelled',
        label: 'Incumbent',
        parts: [
          { kind: 'link', label: 'National World', url: 'https://nationalworld.com/' },
          { kind: 'text', text: ' — publisher of ' },
          { kind: 'link', label: 'The Southern Reporter', url: 'https://www.thesouthernreporter.co.uk/' },
          { kind: 'text', text: ', ' },
          { kind: 'link', label: 'Border Telegraph', url: 'https://www.bordertelegraph.com/' },
          { kind: 'text', text: ', and ' },
          { kind: 'link', label: 'Hawick News', url: 'https://www.hawick-news.co.uk/' },
          { kind: 'text', text: '.' },
        ],
      },
      {
        kind: 'labelled',
        label: 'Secondary incumbent',
        parts: [
          { kind: 'link', label: 'DC Thomson', url: 'https://www.dcthomson.co.uk/' },
          { kind: 'text', text: '.' },
        ],
      },
    ]);
  });

  it('parses multi-line numbered lists', () => {
    expect(parseDestructionNarrative('1. Trigger happens\n2. Consequence follows')).toEqual([
      {
        kind: 'list',
        items: [
          [{ kind: 'text', text: 'Trigger happens' }],
          [{ kind: 'text', text: 'Consequence follows' }],
        ],
      },
    ]);
  });

  it('parses multi-line bullet lists', () => {
    expect(parseDestructionNarrative('- First risk\n- **Second** risk')).toEqual([
      {
        kind: 'list',
        items: [
          [{ kind: 'text', text: 'First risk' }],
          [
            { kind: 'strong', text: 'Second' },
            { kind: 'text', text: ' risk' },
          ],
        ],
      },
    ]);
  });

  it('ignores blank and whitespace-only blocks', () => {
    expect(parseDestructionNarrative('\n\n  \n\nActual paragraph.\n\n')).toEqual([
      { kind: 'paragraph', parts: [{ kind: 'text', text: 'Actual paragraph.' }] },
    ]);
  });
});
