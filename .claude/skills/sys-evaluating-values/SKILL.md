---
name: sys-evaluating-values
description: Evaluates a proposed action or decision against the value function in strategy/values.md. Returns BLOCK, EXECUTE, EXECUTE+FLAG, or ESCALATE. Use before any high-stakes decision.
allowed-tools: Read
license: Complete terms in LICENSE.txt
serves: sys
domain: governance
affects: all
---

# Evaluating Values

Check a proposed action against `strategy/values.md` and return a verdict.

## Prerequisite

`strategy/values.md` must exist (produced by `str-defining-values`). If missing, return ESCALATE with reason "value function not defined".

## Verdicts

| Verdict | Meaning |
|---------|---------|
| BLOCK | Action violates a hard constraint — do not proceed |
| EXECUTE | Action passes all constraints — proceed |
| EXECUTE+FLAG | Action passes but touches a soft constraint — proceed with notation |
| ESCALATE | Tradeoff conflict requires founder input — pause and ask |

## Procedure

### Step 1: Read the value function

Load `strategy/values.md`. Extract hard constraints, soft constraints, and tradeoff preferences.

### Step 2: Check hard constraints

For each hard constraint, test: does the proposed action violate it?

- If ANY hard constraint is violated → return **BLOCK**. State which constraint and why.

### Step 3: Check soft constraints

For each soft constraint, test: does the proposed action touch it?

- If a soft constraint is bypassed without an explicit override in the action context → return **EXECUTE+FLAG**. Name the constraint touched.
- If a soft constraint has an explicit override and it is within the stated override condition → continue.

### Step 4: Check tradeoff preferences

Does the action require resolving a tradeoff (speed vs quality, growth vs margin, breadth vs depth, autonomy vs capital)?

- If the tradeoff preference is defined and the action aligns → **EXECUTE**.
- If the tradeoff preference is defined but the action contradicts it → **EXECUTE+FLAG**.
- If the tradeoff cannot be resolved from the preference table (ambiguous, threshold not yet reached, novel conflict) → **ESCALATE**. State the conflict clearly.

### Step 5: Return verdict

Format:

```
Verdict: {BLOCK | EXECUTE | EXECUTE+FLAG | ESCALATE}
Reason: {one sentence}
Constraint touched: {name, if applicable}
Recommended action: {what to do next}
```

## When to Run

Before any of these:
- Spending above soft constraint thresholds
- Committing to a channel not in the canvas
- Changing pricing model
- Taking on a new segment
- Any decision the orchestrator flags as high-stakes
