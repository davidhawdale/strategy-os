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
