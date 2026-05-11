import { useEffect, useId, useRef, useState } from 'react';
import { useTermHelp } from '../../term-help/TermHelpContext';
import { InlineMarkdownText } from './InlineMarkdownText';
import './TermHelp.css';

interface Props {
  termKey?: string;
}

export function TermHelp({ termKey }: Props) {
  const entry = useTermHelp(termKey);
  const [open, setOpen] = useState(false);
  const id = useId();
  const rootRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  if (!entry) return null;

  return (
    <span ref={rootRef} className="term-help">
      <button
        type="button"
        className="term-help__button"
        aria-label={`Show help for ${entry.term}`}
        aria-expanded={open}
        aria-describedby={open ? id : undefined}
        onClick={() => setOpen(value => !value)}
      >
        i
      </button>
      {open && (
        <span id={id} role="tooltip" className="term-help__popover">
          <span className="term-help__text">
            <InlineMarkdownText text={entry.helpText} />
          </span>
          {entry.canonicalSource && (
            <span className="term-help__source">
              <InlineMarkdownText text={entry.canonicalSource} />
            </span>
          )}
        </span>
      )}
    </span>
  );
}
