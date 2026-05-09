export interface NarrativeTextPart {
  kind: 'text';
  text: string;
}

export interface NarrativeStrongPart {
  kind: 'strong';
  text: string;
}

export type NarrativeInlinePart = NarrativeTextPart | NarrativeStrongPart;

export type NarrativeBlock =
  | { kind: 'labelled'; label: string; parts: NarrativeInlinePart[] }
  | { kind: 'list'; items: NarrativeInlinePart[][] }
  | { kind: 'paragraph'; parts: NarrativeInlinePart[] };

export function renderInlineMarkdownParts(text: string): NarrativeInlinePart[] {
  const parts: NarrativeInlinePart[] = [];
  const pattern = /\*\*([^*]+)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ kind: 'text', text: text.slice(lastIndex, match.index) });
    }
    parts.push({ kind: 'strong', text: match[1] });
    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push({ kind: 'text', text: text.slice(lastIndex) });
  }

  return parts;
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
