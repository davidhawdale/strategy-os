import { describe, expect, it } from 'vitest';
import type { ExecutionQueueView, QueueWorkItem } from '../../model/types';
import { computeGovernorEscalationsView } from '../escalations';

function queueView(workItems: QueueWorkItem[]): ExecutionQueueView {
  return {
    decisionState: 'CONDITIONAL_GO',
    sellReady: false,
    scaleReady: false,
    actions: [],
    blockedPaths: [],
    pendingDecisions: [],
    workItems,
  };
}

describe('computeGovernorEscalationsView', () => {
  it('uses queue escalation files as the canonical card source', () => {
    const view = computeGovernorEscalationsView(queueView([
      {
        id: 'E-01',
        title: 'Queue title',
        fileName: 'E-01-queue-title.md',
        kind: 'escalation',
        status: 'OPEN',
        type: 'Governor escalation',
        blastRadius: 'HIGH',
        raisedBy: 'Strategist',
        date: '2026-05-10',
        decisionNeeded: 'Queue decision text.',
        whySystemCannotDecide: 'Queue reason.',
        options: [{ label: 'A', text: 'Queue option', consequence: 'Queue consequence.', recommended: true }],
        whatIsAtStake: 'Queue stake.',
        recommendation: 'Queue recommendation.',
        preconditions: [],
      },
    ]));

    expect(view.openEscalations).toHaveLength(1);
    expect(view.openEscalations[0]).toMatchObject({
      id: 'E-01',
      title: 'E-01 — Queue title',
      decisionNeeded: 'Queue decision text.',
      whySystemCannotDecide: 'Queue reason.',
      systemRecommendation: 'Queue recommendation.',
      whatIsAtStake: 'Queue stake.',
      sourceFileName: 'E-01-queue-title.md',
      raisedBy: 'Strategist',
      date: '2026-05-10',
    });
    expect(view.openEscalations[0].options[0]).toMatchObject({
      text: 'Queue option',
      recommended: true,
    });
  });

  it('keeps recommendation text without forcing an option pill when no option label is named', () => {
    const view = computeGovernorEscalationsView(queueView([
      {
        id: 'E-03',
        title: 'Portfolio tolerance',
        fileName: 'E-03-portfolio.md',
        kind: 'escalation',
        status: 'OPEN',
        options: [
          { label: 'A', text: 'Accept smaller title', consequence: 'Keep current threshold.', recommended: false },
          { label: 'B', text: 'Require larger title', consequence: 'Raise growth bar.', recommended: false },
        ],
        recommendation: 'Governor decision — Strategist holds no view on portfolio strategy.',
        preconditions: [],
      },
    ]));

    expect(view.openEscalations[0].options.map(option => option.recommended)).toEqual([false, false]);
  });

  it('does not create cards when no queue escalation files exist', () => {
    const view = computeGovernorEscalationsView(queueView([]));

    expect(view.openEscalations).toEqual([]);
    expect(view.resolvedEscalations).toEqual([]);
    expect(view.totalOpen).toBe(0);
  });

  it('keeps open and resolved queue escalations grouped by resolved status', () => {
    const view = computeGovernorEscalationsView(queueView([
      {
        id: 'E-01',
        title: 'Open decision',
        fileName: 'E-01-open.md',
        kind: 'escalation',
        status: 'OPEN',
        preconditions: [],
      },
      {
        id: 'E-02',
        title: 'Resolved decision',
        fileName: 'E-02-resolved.md',
        kind: 'escalation',
        status: 'RESOLVED',
        preconditions: [],
      },
    ]));

    expect(view.totalOpen).toBe(1);
    expect(view.openEscalations.map(item => item.id)).toEqual(['E-01']);
    expect(view.resolvedEscalations.map(item => item.id)).toEqual(['E-02']);
  });

  it('ignores non-escalation queue work items', () => {
    const view = computeGovernorEscalationsView(queueView([
      {
        id: 'T-01',
        title: 'Task',
        fileName: 'T-01-task.md',
        kind: 'task',
        status: 'OPEN',
        preconditions: [],
      },
    ]));

    expect(view.totalOpen).toBe(0);
    expect(view.openEscalations).toEqual([]);
  });
});
