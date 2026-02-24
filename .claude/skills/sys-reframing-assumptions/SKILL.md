---
name: sys-reframing-assumptions
description: Breaks the conformity loop when default treatments keep failing. Inverts the embedded assumption and generates an alternative. Mirrors instead of faster elevators. Use after 2+ failed treatment cycles on the same gap.
allowed-tools: Read, Grep, Glob

serves: sys
affects: all
domain: governance
frequency: on-failure
---

# Creative Reframe

## Core Principle

Expected answers cannot be creative. When the obvious treatment
keeps failing, the problem isn't execution — it's the frame.

## Procedure

### 1. Document the Failed Default
What was tried? How many times? Which agent? What viewpoint?

### 2. Name the Embedded Assumption
"Spawn content-producer" assumes the problem is content.
"Spawn builder" assumes the problem is product capability.
State it: "We assumed _____ was the bottleneck."

### 3. Invert the Assumption
What if the opposite were true?
- "Insufficient visibility" → too much visibility with wrong audience?
- "Product needs features" → too many features, needs simplification?
- "Not enough leads" → enough leads but wrong ones?

### 4. Generate Treatment from Inverted Frame
What follows from the inversion? Which DIFFERENT agent?

### 5. Assess

| Treatment | Assumption | Agent | Leverage |
|-----------|------------|-------|----------|
| Default (failed) | {original} | {same} | Low (proven) |
| Inverted | {inverted} | {different} | {estimate} |

## Output Format

```
## Creative Reframe
Gap: {description}
Failed: {treatment, N times}
Assumption: {what default assumed}
Inversion: {opposite assumption}
New treatment: {what follows} — Task({different agent})
If this also fails: escalate to Human
```
