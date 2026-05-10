import { describe, expect, it } from 'vitest';
import { parseQueueWorkItem, parseQueueWorkItems } from '../queue';

const TASK = `# T-01 — Borders Resident Fieldwork (Problem)

**Issued:** 2026-05-09
**Issued by:** Gap Definer
**Reduces gap:** G-01 (PROBLEM, PAIN_CLARITY, priority 21)
**Action type:** INTERVIEW + RESEARCH
**Evidence target:** T1
**Status:** OPEN — pending governor decision on E-01 (deadline) and E-02 (budget)

## Objective

Produce T1 ground-truth evidence on whether assumptions A1 and A2 hold.

## Expected output

- Quantified A1 dissatisfaction rate.
- Qualitative texture.

## Pre-conditions before this task can start

- E-01 resolved.
- E-02 resolved.
`;

const ESCALATION = `# E-01 — Decision deadlines policy

**Type:** Governor escalation (VALUES)
**Issued:** 2026-05-09
**Issued by:** Gap Definer
**Blast radius:** MEDIUM
**Status:** OPEN

## Decision needed

What deadline does the governor set for fieldwork completion?

## Expected response

A bound deadline for each task.
`;

describe('queue work item parser', () => {
  it('parses task queue files', () => {
    const item = parseQueueWorkItem('T-01-borders-fieldwork.md', TASK);

    expect(item.kind).toBe('task');
    expect(item.id).toBe('T-01');
    expect(item.title).toBe('Borders Resident Fieldwork (Problem)');
    expect(item.status).toBe('OPEN — pending governor decision on E-01 (deadline) and E-02 (budget)');
    expect(item.reducesGap).toContain('G-01');
    expect(item.actionType).toBe('INTERVIEW + RESEARCH');
    expect(item.evidenceTarget).toBe('T1');
    expect(item.summary).toBe('Produce T1 ground-truth evidence on whether assumptions A1 and A2 hold.');
    expect(item.preconditions).toEqual(['E-01 resolved.', 'E-02 resolved.']);
  });

  it('parses escalation queue files', () => {
    const item = parseQueueWorkItem('E-01-deadlines-policy.md', ESCALATION);

    expect(item.kind).toBe('escalation');
    expect(item.id).toBe('E-01');
    expect(item.title).toBe('Decision deadlines policy');
    expect(item.type).toBe('Governor escalation (VALUES)');
    expect(item.blastRadius).toBe('MEDIUM');
    expect(item.decisionNeeded).toBe('What deadline does the governor set for fieldwork completion?');
    expect(item.expectedResponse).toBe('A bound deadline for each task.');
  });

  it('sorts individual queue files and skips summary files', () => {
    const items = parseQueueWorkItems([
      { fileName: 'T-01-borders-fieldwork.md', content: TASK },
      { fileName: 'gap-definer-actions.md', content: '# Summary' },
      { fileName: 'E-01-deadlines-policy.md', content: ESCALATION },
    ]);

    expect(items.map(item => item.id)).toEqual(['E-01', 'T-01']);
  });
});
