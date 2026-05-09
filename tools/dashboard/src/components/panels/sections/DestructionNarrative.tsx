import type { ReactNode } from 'react';
import { parseDestructionNarrative, type NarrativeInlinePart } from './destructionNarrativeModel';

type Accent = 'warning' | 'danger';

interface Props {
  text: string;
  className: string;
  itemClassName: string;
  accent: Accent;
}

function renderParts(parts: NarrativeInlinePart[]): ReactNode[] {
  return parts.map((part, i) => (
    part.kind === 'strong'
      ? <strong key={i}>{part.text}</strong>
      : part.text
  ));
}

export function DestructionNarrative({ text, className, itemClassName, accent }: Props) {
  const blocks = parseDestructionNarrative(text);

  return (
    <div className={`${className} ${className}--${accent}`}>
      {blocks.map((block, i) => {
        if (block.kind === 'labelled') {
          return (
            <div key={i} className={`${itemClassName} ${itemClassName}--labelled`}>
              <span className={`${itemClassName}__label`}>{block.label}</span>
              <p className={`${itemClassName}__text`}>
                {renderParts(block.parts)}
              </p>
            </div>
          );
        }

        if (block.kind === 'list') {
          return (
            <ul key={i} className={`${itemClassName}__list`}>
              {block.items.map((item, j) => (
                <li key={j}>{renderParts(item)}</li>
              ))}
            </ul>
          );
        }

        return (
          <p key={i} className={`${itemClassName}__paragraph`}>
            {renderParts(block.parts)}
          </p>
        );
      })}
    </div>
  );
}
