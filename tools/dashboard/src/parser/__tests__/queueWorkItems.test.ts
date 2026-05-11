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
**Raised by:** Strategist
**Date:** 2026-05-10
**Blast radius:** MEDIUM
**Status:** OPEN

## Decision needed

What deadline does the governor set for fieldwork completion?

## Why system cannot decide

This requires a governor resource decision.

## Options

- **A. Set a firm deadline** — creates forcing function. Recommended.
- **B. Leave open** — preserves flexibility.

## What is at stake

Fieldwork may drift without a deadline.

## Recommendation

Option A.

## Expected response

A bound deadline for each task.
`;

const RECOMMENDATION_ONLY_ESCALATION = `# E-02 — Shared services data

**Type:** Governor escalation (DATA)
**Status:** OPEN

## Decision needed

Which internal route should gather the numbers first?

## Options

- **A. Request finance and ad ops data.**
- **B. Use proxy benchmarks and revisit later.**

## Recommendation

Option A. This is the highest leverage internal ask.
`;

const NO_OPTION_RECOMMENDATION_ESCALATION = `# E-03 — Portfolio tolerance

**Type:** Governor escalation (VALUES)
**Status:** OPEN

## Decision needed

What success floor should govern this title?

## Options

- **A. Accept small-but-positive.**
- **B. Require larger scale.**

## Recommendation

Governor decision — Strategist holds no view on portfolio strategy.
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

  it('keeps queue metadata fields to their own line when using shared field extraction', () => {
    const item = parseQueueWorkItem('T-01-borders-fieldwork.md', TASK);

    expect(item.issued).toBe('2026-05-09');
    expect(item.issuedBy).toBe('Gap Definer');
    expect(item.status).not.toContain('## Objective');
  });

  it('parses escalation queue files', () => {
    const item = parseQueueWorkItem('E-01-deadlines-policy.md', ESCALATION);

    expect(item.kind).toBe('escalation');
    expect(item.id).toBe('E-01');
    expect(item.title).toBe('Decision deadlines policy');
    expect(item.type).toBe('Governor escalation (VALUES)');
    expect(item.blastRadius).toBe('MEDIUM');
    expect(item.raisedBy).toBe('Strategist');
    expect(item.date).toBe('2026-05-10');
    expect(item.decisionNeeded).toBe('What deadline does the governor set for fieldwork completion?');
    expect(item.whySystemCannotDecide).toBe('This requires a governor resource decision.');
    expect(item.options).toEqual([
      {
        label: 'A',
        text: 'Set a firm deadline',
        consequence: 'creates forcing function.',
        recommended: true,
      },
      {
        label: 'B',
        text: 'Leave open',
        consequence: 'preserves flexibility.',
        recommended: false,
      },
    ]);
    expect(item.whatIsAtStake).toBe('Fieldwork may drift without a deadline.');
    expect(item.recommendation).toBe('Option A.');
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

  it('marks a recommended option from the recommendation section when the option line is not tagged inline', () => {
    const item = parseQueueWorkItem('E-02-shared-services.md', RECOMMENDATION_ONLY_ESCALATION);

    expect(item.options).toEqual([
      {
        label: 'A',
        text: 'Request finance and ad ops data.',
        consequence: undefined,
        recommended: true,
      },
      {
        label: 'B',
        text: 'Use proxy benchmarks and revisit later.',
        consequence: undefined,
        recommended: false,
      },
    ]);
  });

  it('does not mark an option as recommended when the recommendation names no option', () => {
    const item = parseQueueWorkItem('E-03-portfolio-tolerance.md', NO_OPTION_RECOMMENDATION_ESCALATION);

    expect((item.options ?? []).map(option => option.recommended)).toEqual([false, false]);
  });
});
