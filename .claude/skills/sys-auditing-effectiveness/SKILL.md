---
name: sys-auditing-effectiveness
description: >
  Wisdom-level gate that prevents efficiently doing the wrong thing.
  Evaluates whether the end being pursued is correct before resources
  are committed. Checks reward structure alignment. Use before
  committing to close any gap.
allowed-tools: Read, Grep, Glob

# Custom LeanOS fields
serves: sys
affects: all
domain: governance
frequency: per-decision
---

# Effectiveness Audit

## The Core Question

Are we doing the right thing, or efficiently doing the wrong thing?
The wronger you do the wrong thing, the wronger you become.

## Procedure

### 1. State the Objective
- What gap does the orchestrator want to close?
- What metric would improve?
- Which goal in strategy/goals/active/ does this serve?

### 2. Reward Structure Check
What does the system ACTUALLY get rewarded for by pursuing this metric?

Misalignment examples:
- "Increase content output" → rewards volume, not impact
- "Reduce response time" → rewards speed, not quality
- "Grow skill count" → rewards proliferation, not capability
- "Increase leads" → rewards pipeline width, not conversion

Ask: if we perfectly achieved this metric, would the venture
be better off? Or efficiently achieving something irrelevant?

### 3. Name the Actual Behavior
Systems are named for aspiration, not behavior.
"Health care" rewards sickness care. "Education" rewards teaching,
not learning. What does pursuing this gap ACTUALLY produce?

### 4. Evaluate Ends

| Question | Answer |
|----------|--------|
| Connects to venture revenue? | |
| Connects to customer value? | |
| Would Human stake reputation on this? | |
| Different objective that makes this one irrelevant? | |

### 5. Verdict

**GO** — End is correct. Proceed.
**REDIRECT** — End is wrong. State the right end, why this is wrong.
**ESCALATE** — Uncertain. State competing interpretations.

## Output Format

```
## Effectiveness Audit
Objective: {gap}
Metric: {what improves}
Reward structure: {what pursuing this actually rewards}
Actual behavior: {what system would do}
Verdict: GO | REDIRECT | ESCALATE
Reasoning: {why}
```
