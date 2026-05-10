import { useEffect, useMemo, useState } from 'react';
import type { ExecutionQueueView, GapAnalysis } from '../model/types';
import { parseExecutionQueue, parseQueueWorkItems, type QueueFileInput } from '../parser/queue';
import { computeQueueView } from '../views/queue';

const EMPTY_QUEUE_VIEW: ExecutionQueueView = {
  decisionState: 'UNKNOWN',
  sellReady: false,
  scaleReady: false,
  actions: [],
  blockedPaths: [],
  pendingDecisions: [],
  workItems: [],
};

export function useExecutionQueue(gapAnalysis?: GapAnalysis) {
  const [rawQueueText, setRawQueueText] = useState<string | null>(null);
  const [rawQueueFiles, setRawQueueFiles] = useState<QueueFileInput[]>([]);

  useEffect(() => {
    fetch('/gap-definer-actions.md')
      .then(r => r.ok ? r.text() : null)
      .then(text => { if (text) setRawQueueText(text); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetch('/api/queue-files')
      .then(r => r.ok ? r.json() as Promise<{ files?: QueueFileInput[] }> : null)
      .then(data => { if (data?.files) setRawQueueFiles(data.files); })
      .catch(() => {});
  }, []);

  return useMemo(() => {
    const queueWorkItems = parseQueueWorkItems(rawQueueFiles);
    const rawQueueView = rawQueueText
      ? parseExecutionQueue(rawQueueText)
      : queueWorkItems.length > 0
        ? EMPTY_QUEUE_VIEW
        : null;

    return rawQueueView
      ? computeQueueView(rawQueueView, gapAnalysis, queueWorkItems)
      : null;
  }, [gapAnalysis, rawQueueFiles, rawQueueText]);
}
