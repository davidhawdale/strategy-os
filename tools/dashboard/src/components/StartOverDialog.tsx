import { useState } from 'react';
import './StartOverDialog.css';

interface Props {
  onCancel: () => void;
  onConfirm: (archive: boolean) => Promise<void>;
}

export function StartOverDialog({ onCancel, onConfirm }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleConfirm(archive: boolean) {
    setIsSubmitting(true);
    setError(null);
    try {
      await onConfirm(archive);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Reset failed');
      setIsSubmitting(false);
    }
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
