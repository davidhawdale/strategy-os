---
name: str-defining-values
description: Derives the value function from the completed canvas. Captures hard constraints (non-negotiables), soft constraints (strong preferences), and tradeoff preferences (founder input required). Produces strategy/values.md — the decision filter used on every execution cycle.
allowed-tools: Read, Write
license: Complete terms in LICENSE.txt
serves: strategy
domain: strategy
affects: product
---

# Defining Values

Derive the founder's value function from the completed canvas. Produce `strategy/values.md`.

## Prerequisite

All 16 canvas sections must exist and be non-empty (G4 complete). Run after strategist reaches G4.

## Reads

| Source | Purpose |
|--------|---------|
| `strategy/canvas/00.mode.md` | VENTURE/BOOTSTRAP/HYBRID mode shapes priority ordering |
| `strategy/canvas/02.constraints.md` | Hard constraints (budget, timeline, regulatory) |
| `strategy/canvas/07.uvp.md` | Core value proposition — informs what must never be compromised |
| `strategy/canvas/08.unfair.md` | Unfair advantages — hard constraints around protecting them |
| `strategy/canvas/12.revenue.md` | Revenue model — economic non-negotiables |
| `strategy/canvas/13.metrics.md` | Unit economics thresholds |

## Procedure

### Step 1: Extract hard constraints

Scan `02.constraints.md` for absolute limits. A hard constraint has zero flexibility — violating it ends the venture or breaches an obligation.

Examples: regulatory compliance, budget ceiling, data privacy rules, IP boundaries.

Write to `strategy/values.md` under `## Hard Constraints`.

### Step 2: Extract soft constraints

Scan `07.uvp.md`, `08.unfair.md`, `12.revenue.md` for strong preferences that represent identity. A soft constraint bends only with explicit founder override — not by default.

Examples: "never charge per seat", "always open-source the core", "no enterprise sales before $1M ARR".

Write under `## Soft Constraints`.

### Step 3: Elicit tradeoff preferences (K-open gate)

Canvas data cannot resolve tradeoffs — only the founder can. Present the following pairs and ask the founder to rank each:

1. Speed vs quality — when they conflict, which wins?
2. Growth vs margin — at what stage does margin become non-negotiable?
3. Breadth vs depth — expand segments or dominate the current one?
4. Autonomy vs capital — at what dilution does external funding stop being worth it?

**Stop here. Wait for founder response before writing Step 3 output.**

### Step 4: Write `strategy/values.md`

```markdown
# Value Function

Generated: {YYYY-MM-DD}
Canvas state: G4 complete

## Hard Constraints

| Constraint | Source | Consequence of violation |
|------------|--------|--------------------------|
| {constraint} | {canvas section} | {what breaks} |

## Soft Constraints

| Preference | Source | Override condition |
|------------|--------|--------------------|
| {preference} | {canvas section} | {when it can be bypassed} |

## Tradeoff Preferences

| Tradeoff | Preference | Threshold |
|----------|------------|-----------|
| Speed vs quality | {which wins} | {when to flip} |
| Growth vs margin | {which wins} | {when to flip} |
| Breadth vs depth | {which wins} | {when to flip} |
| Autonomy vs capital | {which wins} | {dilution limit} |
```

## Output

`strategy/values.md` — decision filter for sys-evaluating-values.
