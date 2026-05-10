import { describe, expect, it } from 'vitest';
import type { ExecutionQueueView, QueueWorkItem } from '../../model/types';
import { computeQueueView } from '../queue';

const rawQueue: ExecutionQueueView = {
  decisionState: 'CONDITIONAL_GO',
  sellReady: false,
  scaleReady: false,
  actions: [],
  blockedPaths: [],
  pendingDecisions: [],
  workItems: [],
};

const workItems: QueueWorkItem[] = [
  {
    id: 'E-01',
    title: 'Decision deadlines policy',
    fileName: 'E-01-deadlines-policy.md',
    kind: 'escalation',
    status: 'OPEN',
    preconditions: [],
  },
  {
    id: 'T-01',
    title: 'Borders Resident Fieldwork',
    fileName: 'T-01-borders-fieldwork.md',
    kind: 'task',
    status: 'OPEN',
    preconditions: ['E-01 resolved.'],
  },
];

describe('computeQueueView', () => {
  it('adds individual queue work items to the queue view', () => {
    const view = computeQueueView(rawQueue, undefined, workItems);

    expect(view.workItems).toEqual(workItems);
    expect(view.pendingDecisions).toEqual([]);
  });

  it('keeps an empty work item list when no files are parsed', () => {
    const view = computeQueueView(rawQueue);

    expect(view.workItems).toEqual([]);
  });
});
