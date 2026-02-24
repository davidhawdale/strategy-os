---
name: sys-rotating-viewpoints
description: >
  Rotates a problem through all system perspectives to find the
  highest-leverage treatment. Strips domain adjectives. Finds the
  $500 mirror instead of the $2M elevator. Use when orchestrator
  has a confirmed gap and needs to choose which agent to delegate to.
allowed-tools: Read, Grep, Glob

serves: sys
affects: all
domain: governance
frequency: per-decision
---

# Viewpoint Rotation

## Core Principle

"I've never run across a problem that couldn't better be solved
somewhere other than where it was recognized."

The adjective on a problem (marketing, engineering) describes the
VIEWER, not the problem. Strip it. Examine from every angle.

## Procedure

### 1. Strip the Adjective

Original: "Market State awareness is declining"
Stripped: "Fewer people know about our product than goal requires"

### 2. Rotate Through Every State Level

For each, ask: what reality at THIS level could produce this gap?

**Product State**: Is the product worth knowing about? Did capability
changes affect word-of-mouth?

**Market State**: Right audience? Right channel? Positioning aligned?

**Revenue State**: Confusing awareness with pipeline? Customers not referring?

**Operations State**: Site down or slow? Operational failures visible to market?

**Asset State**: Deprecated skills that supported this? Degraded capability?

**Goal State**: Target realistic? Right metric for this venture stage?

### 3. Estimate Leverage

For each perspective with a plausible cause:

| Perspective | Cause | Treatment | Cost | Impact | Leverage |
|-------------|-------|-----------|------|--------|----------|
| ... | ... | ... | ... | ... | Impact/Cost |

### 4. Recommend

- **Primary**: Highest leverage treatment, which agent
- **Secondary**: If primary fails
- **Anti-recommendation**: The "obvious" but low-leverage option and why to skip it

## Output Format

```
## Viewpoint Rotation
Gap: {stripped description}
Obvious framing: {original adjective-laden version}

Primary: {perspective} — {treatment} — Task({agent})
Secondary: {perspective} — {treatment}
Anti-recommendation: {obvious treatment, why low leverage}
```
