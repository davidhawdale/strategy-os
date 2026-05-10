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

### Desired State

Evidence that the problem matters enough to change behaviour.

### Current State

The problem is plausible but not directly validated.

### Evidence

- [WEB_RESEARCH] [T1] 2026-05-10 -- [Source](https://example.com): Problem evidence.

### Problem Scoring

| Property | Score | Tier | Evidence basis |
| -------- | ----- | ---- | -------------- |
| Frequency | 4 | T2 | Daily pain |

### Assumptions

| # | Classification | Tier | Claim | Load-bearing | Blast | Falsification | Validation | Status |
| - | -------------- | ---- | ----- | ------------ | ----- | ------------- | ---------- | ------ |
| A1 | Belief | T3 | Problem assumption | Yes | High | Test it | Run survey | OPEN |

### Kill Condition

Problem kill signal.

### Last Updated

2026-05-10 — initial parser contract fixture.

## 2. Segment

**Confidence:** RESEARCHED

### Claim

The segment claim.

### Evidence

- [WEB_RESEARCH] [T2] 2026-05-10 -- [Source](https://example.com): Segment evidence.

### Pain Scoring

| Segment | Pain score | Tier | Evidence |
| ------- | ---------- | ---- | -------- |
| Primary | 3 | T2 | Active workaround |

## 3. Unit Economics

**Confidence State:** RESEARCHED

### Claim

The unit economics claim.

### Evidence

- [WEB_RESEARCH] [T2] 2026-05-10 -- [Source](https://example.com): Unit economics evidence.

### Pricing Inputs

| Input | Range | Tier | Source / basis |
| ----- | ----- | ---- | -------------- |
| ARPU blended | £40-£75 | T2 | Benchmark |

### Cost Structure

**Fixed (annual):**

- Editorial: £120K – £225K
- Tech & infrastructure: £20K – £50K

**Variable:**

- Payment processing 2-3% of revenue
- AI inference per article: £0.20 – £2

### Calculated Metrics (range-based)

| Metric | Base | Tier |
| ------ | ---- | ---- |
| LTV:CAC | 5:1 | T2 |

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

### Clause-by-clause Tracing

| Clause | Source | Tier |
| ------ | ------ | ---- |
| Target | Segment | T2 |

### Competitive Landscape

No direct competitor.

### Competitor Response Capability

| Competitor | Likely response |
| ---------- | --------------- |
| Incumbent | Watch and wait |

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

  it('preserves hypothesis-specific document blocks for distinct panel sections', () => {
    const { register } = parse(FULL_REGISTER);
    const problem = computeHypothesisDetail(register, 'problem');
    const segment = computeHypothesisDetail(register, 'segment');
    const unitEconomics = computeHypothesisDetail(register, 'unitEconomics');
    const valueProposition = computeHypothesisDetail(register, 'valueProposition');

    expect(problem.documentBlocks?.problemScoring).toContain('Frequency');
    expect(segment.documentBlocks?.painScoring).toContain('Primary');
    expect(unitEconomics.documentBlocks?.pricingInputs).toContain('ARPU blended');
    expect(unitEconomics.documentBlocks?.costStructure).toContain('Fixed (annual)');
    expect(unitEconomics.documentBlocks?.costStructure).toContain('Payment processing');
    expect(unitEconomics.documentBlocks?.calculatedMetrics).toContain('LTV:CAC');
    expect(valueProposition.documentBlocks?.clauseTracing).toContain('Target');
    expect(valueProposition.documentBlocks?.competitiveLandscape).toContain('No direct competitor.');
    expect(valueProposition.documentBlocks?.competitorResponseCapability).toContain('Incumbent');
  });

  it('preserves paragraph validation state and last updated for hypothesis detail sections', () => {
    const { register } = parse(FULL_REGISTER);
    const problem = computeHypothesisDetail(register, 'problem');

    expect(problem.desiredState).toBeUndefined();
    expect(problem.currentState).toBeUndefined();
    expect(problem.desiredStateText).toBe('Evidence that the problem matters enough to change behaviour.');
    expect(problem.currentStateText).toBe('The problem is plausible but not directly validated.');
    expect(problem.lastUpdated).toBe('2026-05-10 — initial parser contract fixture.');
  });
});
