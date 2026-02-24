---
name: sys-managing-goals
description: >
  Manages the full goal lifecycle: defines goals from canvas targets,
  identifies which functions participate based on state gaps, tracks
  per-function progress, and resolves as accomplished, diverted, or
  cancelled. Use when planner needs to create goals from strategy,
  review goal progress, or close completed goals.
license: Complete terms in LICENSE.txt
allowed-tools: Read, Write, Edit, Grep, Glob

serves: sys
affects: all
domain: governance
frequency: on-demand
depends-on: [metrics-canvas, segment-canvas, revenue-canvas, gtm-canvas, solution-canvas, positioning, icp, product-state, market-state, revenue-state, active-goals]
produces: goal-file
---

# Goal Lifecycle Management

## Reads

| Source | Artifact | Path |
|--------|----------|------|
| Target metrics | metrics-canvas | `strategy/canvas/13.metrics.md` |
| Segments | segment-canvas | `strategy/canvas/04.segments.md` |
| Revenue model | revenue-canvas | `strategy/canvas/12.revenue.md` |
| GTM milestones | gtm-canvas | `strategy/canvas/15.gtm.md` |
| Solution milestones | solution-canvas | `strategy/canvas/09.solution.md` |
| Channels | channels-canvas | `strategy/canvas/11.channels.md` |
| ICP | icp | `strategy/foundations/icp.md` |
| Positioning | positioning | `strategy/foundations/positioning.md` |
| Product reality | product-state | `state/product/state.md` |
| Market reality | market-state | `state/market/state.md` |
| Revenue reality | revenue-state | `state/revenue/state.md` |
| Active goals | active-goals | `strategy/goals/active/*.md` |
| Work order | work-order | `execution/active/{thread-id}/work-order.md` |

## Writes

| Output | Path |
|--------|------|
| New goal file | `strategy/goals/active/{id}.md` |
| Updated goal file | `strategy/goals/active/{id}.md` |
| Completed goal | `strategy/goals/completed/{id}.md` |

## Function Capability Reference

Fixed reference. Used in Step D3 to reason about function participation.
A function participates only if its state domain shows a gap relevant to
the canvas target.

| Function | Domain | State File | Gap Signals |
|----------|--------|------------|-------------|
| builder | Product, operations | `state/product/state.md`, `state/operations/state.md` | Missing features, quality gaps, infra not ready |
| reacher | Market, awareness | `state/market/state.md` | Content missing, channels inactive, audience not built |
| converter | Revenue, pipeline | `state/revenue/state.md` | Pipeline empty, conversion low, retention at risk |
| strategist | Foundations | `strategy/foundations/`, `strategy/canvas/` | Foundations missing or stale |
| researcher | Information | `information/gaps/`, `execution/output/` | Market unknown, competitive landscape unclear |

## Goal File Format

```markdown
# Goal: {title}
ID: {slug}-{YYYYMMDD}
Created: {ISO 8601}
Status: active

## Objective
{One sentence: measurable state change + deadline.}

## Source
Canvas: {section file(s) that define this target}
Foundation: {foundation file(s) that ground this goal}

## Targets
| Metric | Current | Target | Deadline |
|--------|---------|--------|----------|

## Function Responsibilities
| Function | Slice | Success Metric | Current | Status |
|----------|-------|----------------|---------|--------|
| {fn} | {what this function contributes to the goal} | {metric} | {current} | active |

## Progress Log
{YYYY-MM-DD}: {update}

## Resolution
Status: {accomplished | diverted | cancelled}
Date: {ISO 8601}
Reason: {why}
Outcome: {what actually happened}
Learnings: {what this reveals}
```

Goal ID format: `{slug}-{YYYYMMDD}` — 2-4 words, lowercase, hyphens.

---

## Process

### Step 1: Detect Mode [R]

Read the work order objective field:

| Work order says | Mode |
|----------------|------|
| "Define goals", "Create goals", "Translate canvas to goals" | DEFINE |
| "Track goals", "Review progress", "Update goals" | TRACK |
| "Resolve goal {id}" | RESOLVE |

---

### DEFINE Mode

**Step D1: Read canvas targets [S]**

Load in sequence: `strategy/canvas/13.metrics.md`, `09.solution.md`,
`12.revenue.md`, `11.channels.md`, `15.gtm.md`, `04.segments.md`

Then load: `strategy/foundations/icp.md`, `strategy/foundations/narrative.md`

**Step D2: Identify goal candidates [K-grounded]**

Grounded in: canvas sections from D1 only.

Extract explicitly stated targets — metrics with numbers, milestones with
dates, thresholds with conditions. Each distinct measurable target is one
goal candidate. Discard aspirational statements with no measurable target.
Do not infer targets not stated in canvas.

**Step D3: Identify participating functions [K-grounded]**

Grounded in: (1) goal candidate definition from D2, (2) current state from
`state/product/state.md`, `state/market/state.md`, `state/revenue/state.md`,
(3) Function Capability Reference table above.

For each goal candidate, reason:

> Which functions have a gap in their domain that is required to reach
> this target, based on what the state files show?

Assign a function to the goal if and only if its state domain shows a
relevant gap. Do not assign functions whose state shows no gap relevant
to this target.

For each participating function, define:
- **Slice**: what this function contributes to the goal (one sentence)
- **Success metric**: how we measure this function's contribution
- **Current value**: read from the function's state file

Fabrication constraint: do not assign a function if you cannot point to
a specific gap in its state file as justification. Do not invent metrics.
Use only values present in state files.

**Step D4: Write goal files [S]**

For each goal candidate: create `strategy/goals/active/{slug}-{YYYYMMDD}.md`
using the goal file format above. Populate Targets table and Function
Responsibilities table from D2 and D3. Leave Progress Log empty.

---

### TRACK Mode

**Step T1: Read active goals [S]**

Load all files in `strategy/goals/active/`.

**Step T2: Read current state [S]**

For each goal, read state files for every function in its responsibility table:
- builder responsibilities → `state/product/state.md`
- reacher responsibilities → `state/market/state.md`
- converter responsibilities → `state/revenue/state.md`

**Step T3: Update per-function progress [S]**

For each function row in each goal's Function Responsibilities table:
update Current column with value from state file. Update Status column:

| Condition | Status |
|-----------|--------|
| Current ≥ success metric | complete |
| Current < metric AND improved since last log | active |
| Current < metric AND no change for 21+ days | stalled |

**Step T4: Assess goal-level status [R]**

| Condition | Action |
|-----------|--------|
| All function rows complete | Flag to orchestrator: ready to RESOLVE as accomplished |
| Any function row stalled | Append stall signal to Progress Log, flag to orchestrator |
| Canvas target changed AND goal premise invalidated | Append divert signal to Progress Log, flag to orchestrator |

**Step T5: Write Progress Log entry [S]**

Append one line per goal:
`{YYYY-MM-DD}: {summary of per-function status. Flags if any.}`

---

### RESOLVE Mode

**Step R1: Determine resolution type [R]**

| Condition | Type |
|-----------|------|
| All function metrics met | accomplished |
| Direction changed — new goal replacing this one | diverted |
| Goal no longer worth pursuing | cancelled |

**Step R2: Write Resolution section [S]**

Fill: Status, Date, Reason (from work order), Outcome (final metric
values per function), Learnings (one or two sentences grounded in
the outcome and function contribution data).

**Step R3: Move file [S]**

Move `strategy/goals/active/{id}.md` → `strategy/goals/completed/{id}.md`

If diverted: work order must reference the ID of the replacement goal.

---

## Edge Cases

| Condition | Handling |
|-----------|----------|
| Canvas section has no measurable target | Skip. Do not invent. Note skipped sections in output. |
| No function has a relevant gap for a canvas target | Write goal with empty Function Responsibilities table. Flag to orchestrator: "target may already be met or no execution gap identified." |
| Duplicate canvas target matches existing active goal | Update existing goal's Targets table. Do not create duplicate. |
| State file missing or stale | Note in Progress Log: "State for {function} stale — metric not updated." Do not infer values. Flag to orchestrator. |
| Two functions claim the same success metric | Qualify each: "reacher: signups from content" vs "converter: signups from outreach." Keep distinct. |
| Goal file missing Resolution section | Add it before resolving. Do not move to completed/ without filled Resolution. |

## Boundaries

**In scope:** Defining goals from canvas targets, identifying participating functions from state gaps, tracking per-function progress, resolving goal lifecycle.

**Out of scope:** Writing work orders (orchestrator), spawning functions (orchestrator), specifying HOW functions execute their slice (each function decides), updating canvas (strategist), measuring state (observer), executing any function's work.
