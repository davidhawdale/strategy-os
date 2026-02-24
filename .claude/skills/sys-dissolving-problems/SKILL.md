---
name: sys-dissolving-problems
description: >
  Applies the dissolution hierarchy: dissolve > solve > resolve > absolve.
  Redesigns the producing system so the problem cannot exist. Use as
  step 4 of the orchestrator's decision flow after effectiveness,
  mess formulation, and viewpoint rotation.
allowed-tools: Read, Grep, Glob

serves: sys
affects: all
domain: governance
frequency: per-decision
---

# Dissolving Problems

## Treatment Hierarchy

| Treatment | What It Does | When |
|-----------|-------------|------|
| **Dissolve** | Redesign so problem can't exist | Always attempt first |
| **Solve** | Optimal action within current system | Dissolution infeasible |
| **Resolve** | Past experience, good enough | Speed > optimality |
| **Absolve** | Ignore, hope self-corrects | Almost never |

## Procedure

### 1. State the Problem
Capture exactly as the orchestrator framed it.

### 2. Find the Producing System
Problems are outputs of systems. What structure produces this?
- Process structured wrong?
- Policy with perverse incentives?
- Structural coupling generating the gap?
- Missing feedback loop (gap can't self-correct)?

### 3. Redesign the Producing System
Propose a redesign where the problem CANNOT recur.

### 4. Dissolution Test
- [ ] Cannot recur without reintroducing old design
- [ ] No ongoing monitoring needed
- [ ] Improves the whole system
- [ ] Doesn't create worse new problems

Pass → recommend dissolution with plan.
Fail → fall to solve. State why dissolution failed.

### 5. Part-Whole Verification
Before ANY treatment:
- Name the whole the affected component belongs to
- State interactions with other components
- Does this treatment improve the whole?

## Output Format

```
## Dissolution Analysis
Problem: {as given}
Producing system: {structure causing this}
Dissolution: {proposed redesign}
Test: {pass/fail on each criterion}
Verdict: DISSOLVE {plan} | SOLVE {optimal action} |
         RESOLVE {good enough} | ABSOLVE {why it self-corrects}
New problems created: {name them}
```
