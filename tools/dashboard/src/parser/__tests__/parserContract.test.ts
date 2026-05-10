import { describe, expect, it } from 'vitest';
import { parse } from '../index';
import { parseExecutionQueue } from '../queue';
import { computeEvidenceQuality } from '../../views/evidence-quality';
import { computeHypothesisDetail } from '../../views/hypothesis-detail';
import { computeReadiness } from '../../views/readiness';
import { computeRiskMap } from '../../views/risk-map';

const FULL_REGISTER = `# Hypothesis Register

**Created:** 2026-05-10
**Business Mode:** BOOTSTRAP
**Build Method:** MIXED
**Sell Ready:** false
**Scale Ready:** false

## 1. Problem

**Confidence State:** RESEARCHED

### Claim

The problem claim.

### Evidence

- [WEB_RESEARCH] [T1] 2026-05-10 -- [Source](https://example.com): Problem evidence.

### Assumptions

| # | Classification | Tier | Claim | Load-bearing | Blast | Falsification | Validation | Status |
| - | -------------- | ---- | ----- | ------------ | ----- | ------------- | ---------- | ------ |
| A1 | Belief | T3 | Problem assumption | Yes | High | Test it | Run survey | OPEN |

### Kill Condition

Problem kill signal.

## 2. Segment

**Confidence:** RESEARCHED

### Claim

The segment claim.

### Evidence

- [WEB_RESEARCH] [T2] 2026-05-10 -- [Source](https://example.com): Segment evidence.

## 3. Unit Economics

**Confidence State:** RESEARCHED

### Claim

The unit economics claim.

### Evidence

- [WEB_RESEARCH] [T2] 2026-05-10 -- [Source](https://example.com): Unit economics evidence.

## 4. Value Proposition

**Confidence State:** RESEARCHED

### Claim

The value proposition claim.

### Jobs Addressed

- Functional: Save time.
- Emotional: Feel confident.
- Social: Be trusted.

### Clause Validation

| Clause | Status | Tier | Evidence |
| ------ | ------ | ---- | -------- |
| Target customer clause | TESTED | T2 | Interview synthesis |

### Evidence

- [WEB_RESEARCH] [T3] 2026-05-10 -- [Source](https://example.com): VP evidence.

### Assumptions

| # | Classification | Tier | Claim | Load-bearing | Blast | Falsification | Validation | Status |
| - | -------------- | ---- | ----- | ------------ | ----- | ------------- | ---------- | ------ |
| A1 | Belief | T3 | VP assumption | Yes | High | Test it | Run interview | OPEN |

## 5. Growth Architecture

**Architecture:** HYBRID
**Support State:** PROPOSED

### Required Conditions

- Founder-led sales works.
- Product loop can compound.

### Assumptions

| # | Classification | Tier | Claim | Load-bearing | Blast | Falsification | Validation | Status |
| - | -------------- | ---- | ----- | ------------ | ----- | ------------- | ---------- | ------ |
| A1 | Belief | T2 | Hybrid motion works | Yes | Medium | Test channel | Pilot | OPEN |

## 6. Solution Design

**Support State:** PROPOSED
**Positioning Statement:** A focused operator dashboard.

### Feature Map

| Feature | Solves Problem | Job Dimension | Priority | Tier |
| ------- | -------------- | ------------- | -------- | ---- |
| Gap inbox | Shows next uncertainty | Functional | MVP | T2 |

### MVP Scope

- Included:
- Gap inbox
- Excluded:
- Automation -- too soon -- after validation

### Growth Loops

- Insight loop: users act on gaps (requires: weekly review) [T2]

## 7. GTM Plan

**Support State:** PROPOSED

### Channel Sequence

| Phase | Channels | Gate Condition | CAC Target | Duration | Tier |
| ----- | -------- | -------------- | ---------- | -------- | ---- |
| Phase 1 | Founder sales, referrals | 5 pilots | Under 500 | 30 days | T2 |

### Messaging Framework

- Primary message: Find the riskiest gap first.
- Supporting messages:
  - Less dashboard theatre.
  - More decision clarity.
- Derived from VP: yes
- Tier: T2

### Operational Constraints

| From | Constraint | If Changes |
| ---- | ---------- | ---------- |
| Segment | Founder-led first | Revisit channels |

### Success Criteria

- 5 pilots.

### Kill Criteria

- No activation.
`;

describe('parser contract', () => {
  it('populates proposal sections through full register parse', () => {
    const { register } = parse(FULL_REGISTER);

    expect(register.proposals.growthArchitecture.architecture).toBe('HYBRID');
    expect(register.proposals.growthArchitecture.supportState).toBe('PROPOSED');
    expect(register.proposals.growthArchitecture.requiredConditions).toHaveLength(2);

    expect(register.proposals.solutionDesign.supportState).toBe('PROPOSED');
    expect(register.proposals.solutionDesign.featureMap).toHaveLength(1);
    expect(register.proposals.solutionDesign.growthLoops).toHaveLength(1);

    expect(register.proposals.gtmPlan.supportState).toBe('PROPOSED');
    expect(register.proposals.gtmPlan.channelSequence).toHaveLength(1);
    expect(register.proposals.gtmPlan.messagingFramework?.primaryMessage).toBe('Find the riskiest gap first.');
    expect(register.proposals.gtmPlan.successCriteria).toContain('5 pilots.');
    expect(register.proposals.gtmPlan.killCriteria).toContain('No activation.');
  });

  it('keeps queue parser shape stable when no pending decisions are present', () => {
    const queue = parseExecutionQueue(`**Decision:** CONDITIONAL_GO
**Sell Ready:** false
**Scale Ready:** false

## Top 3 Actions
`);

    expect(queue.pendingDecisions).toEqual([]);
  });

  it('returns typed risk sources instead of legacy hypothesis fields', () => {
    const { register } = parse(FULL_REGISTER);
    const riskMap = computeRiskMap(register);

    expect(riskMap.assumptions.length).toBeGreaterThan(0);
    expect(riskMap.assumptions[0]).toHaveProperty('source');
    expect(riskMap.assumptions[0]).not.toHaveProperty('hypothesis');
  });

  it('allows value proposition to flow through dashboard view models', () => {
    const { register } = parse(FULL_REGISTER);

    const readiness = computeReadiness(register);
    const detail = computeHypothesisDetail(register, 'valueProposition');
    const evidenceQuality = computeEvidenceQuality(register);

    expect(readiness.hypothesisSummary.find(h => h.id === 'valueProposition')?.label).toBe('Value Proposition');
    expect(detail.jobs?.functional).toBe('Save time.');
    expect(evidenceQuality.byHypothesis.find(h => h.id === 'valueProposition')?.totalEvidence).toBe(1);
  });
});
