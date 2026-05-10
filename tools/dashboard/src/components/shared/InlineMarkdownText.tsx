import type { ReactNode } from 'react';
import { parseInlineMarkdownParts, type InlineMarkdownPart } from '../../utils/inlineMarkdown';

interface Props {
  text?: string;
  parts?: InlineMarkdownPart[];
  linkClassName?: string;
}

export function renderInlineMarkdownParts(
  parts: InlineMarkdownPart[],
  linkClassName = 'source-link',
): ReactNode[] {
  return parts.map((part, i) => {
    switch (part.kind) {
      case 'strong':
        return <strong key={i}>{part.text}</strong>;
      case 'link':
        return (
          <a key={i} href={part.url} target="_blank" rel="noopener noreferrer" className={linkClassName}>
            {part.label}
          </a>
        );
      case 'text':
      default:
        return part.text;
    }
  });
}

export function InlineMarkdownText({ text, parts, linkClassName = 'source-link' }: Props) {
  const inlineParts = parts ?? parseInlineMarkdownParts(text ?? '');
  return <>{renderInlineMarkdownParts(inlineParts, linkClassName)}</>;
}
