export interface InlineTextPart {
  kind: 'text';
  text: string;
}

export interface InlineStrongPart {
  kind: 'strong';
  text: string;
}

export interface InlineLinkPart {
  kind: 'link';
  label: string;
  url: string;
}

export type InlineMarkdownPart = InlineTextPart | InlineStrongPart | InlineLinkPart;

export function parseInlineMarkdownParts(text: string): InlineMarkdownPart[] {
  const parts: InlineMarkdownPart[] = [];
  const urlPattern = String.raw`https?:\/\/(?:[^)(\s]|\([^)]*\))*`;
  const pattern = new RegExp(String.raw`\*\*([^*]+)\*\*|\[([^\]]+)\]\((${urlPattern})\)`, 'g');
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ kind: 'text', text: text.slice(lastIndex, match.index) });
    }

    if (match[1] !== undefined) {
      parts.push({ kind: 'strong', text: match[1] });
    } else {
      parts.push({ kind: 'link', label: match[2], url: match[3] });
    }

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push({ kind: 'text', text: text.slice(lastIndex) });
  }

  return parts;
}
