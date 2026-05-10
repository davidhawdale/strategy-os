import { parseInlineMarkdownParts, type InlineMarkdownPart } from '../../../utils/inlineMarkdown';

export type { InlineMarkdownPart as NarrativeInlinePart };

export type NarrativeBlock =
  | { kind: 'labelled'; label: string; parts: InlineMarkdownPart[] }
  | { kind: 'list'; items: InlineMarkdownPart[][] }
  | { kind: 'paragraph'; parts: InlineMarkdownPart[] };

export function renderInlineMarkdownParts(text: string): InlineMarkdownPart[] {
  return parseInlineMarkdownParts(text);
}

function normaliseListLine(line: string): string {
  return line
    .replace(/^\s*[-*]\s+/, '')
    .replace(/^\s*\d+\.\s+/, '')
    .trim();
}

function parseBlock(rawBlock: string): NarrativeBlock | null {
  const block = rawBlock.trim();
  if (!block) return null;

  const lines = block.split('\n').map(line => line.trim()).filter(Boolean);
  const listLines = lines.filter(line => /^([-*]|\d+\.)\s+/.test(line));

  if (lines.length > 1 && listLines.length === lines.length) {
    return {
      kind: 'list',
      items: lines
        .map(normaliseListLine)
        .filter(Boolean)
        .map(renderInlineMarkdownParts),
    };
  }

  const labelled = block.match(/^\*\*([^:*]+):\*\*\s*([\s\S]*)$/);
  if (labelled) {
    return {
      kind: 'labelled',
      label: labelled[1].trim(),
      parts: renderInlineMarkdownParts(labelled[2].trim()),
    };
  }

  return { kind: 'paragraph', parts: renderInlineMarkdownParts(block) };
}

export function parseDestructionNarrative(text: string): NarrativeBlock[] {
  return text
    .split(/\n\s*\n/)
    .map(parseBlock)
    .filter((block): block is NarrativeBlock => block !== null);
}
