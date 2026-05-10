import { useState } from 'react';
import './StartOverDialog.css';

interface Props {
  onCancel: () => void;
  onConfirm: (archive: boolean) => Promise<void>;
}

const MIN_SUBMIT_DISPLAY_MS = 3000;

function delay(ms: number) {
  return new Promise(resolve => window.setTimeout(resolve, ms));
}

export function StartOverDialog({ onCancel, onConfirm }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleConfirm(archive: boolean) {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitMessage(archive
      ? 'Archiving current strategy before reset...'
      : 'Resetting workspace...');
    setError(null);
    try {
      await delay(MIN_SUBMIT_DISPLAY_MS);
      await onConfirm(archive);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Reset failed');
      setIsSubmitting(false);
      setSubmitMessage(null);
    }
  }

  if (isSubmitting && submitMessage) {
    return (
      <div className="start-over-dialog" role="dialog" aria-modal="true" aria-labelledby="start-over-progress-title">
        <div className="start-over-dialog__panel start-over-dialog__panel--status">
          <p className="start-over-dialog__eyebrow">Start Over</p>
          <h2 className="start-over-dialog__title" id="start-over-progress-title">
            {submitMessage}
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="start-over-dialog" role="dialog" aria-modal="true" aria-labelledby="start-over-title">
      <div className="start-over-dialog__panel">
        <div className="start-over-dialog__header">
          <p className="start-over-dialog__eyebrow">Start Over</p>
          <h2 className="start-over-dialog__title" id="start-over-title">Archive the current register first?</h2>
        </div>

        <p className="start-over-dialog__body">
          This will reset the strategy files from templates and clear the execution queue.
          You can archive the current files first as a timestamped snapshot.
        </p>

        {submitMessage && (
          <p className="start-over-dialog__progress" role="status" aria-live="polite">
            {submitMessage}
          </p>
        )}

        {error && (
          <p className="start-over-dialog__error" role="alert">
            {error}
          </p>
        )}

        <div className="start-over-dialog__actions">
          <button
            className="start-over-dialog__primary"
            type="button"
            onClick={() => void handleConfirm(true)}
            disabled={isSubmitting}
          >
            Archive and Start Over
          </button>
          <button
            className="start-over-dialog__secondary"
            type="button"
            onClick={() => void handleConfirm(false)}
            disabled={isSubmitting}
          >
            Start Over Without Archive
          </button>
          <button
            className="start-over-dialog__ghost"
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
