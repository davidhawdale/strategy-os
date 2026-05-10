---
name: gap-write-pass-summary
description: >
  Writes a human-readable Gap Definer pass summary document to
  strategy/gap-definer-pass-complete.md. Run at the end of every
  Gap Definer pass, after the execution queue is issued. Overwrites
  any prior version.
license: Complete terms in LICENSE.txt
serves: gap-definer
domain: output-documentation
affects: strategy/gap-definer-pass-complete.md
depends-on: none
produces: summary-document
---

# Write Gap Definer Pass Summary

Write a plain-language summary of the completed Gap Definer pass to
`strategy/gap-definer-pass-complete.md`. This document captures the
gate decision, ranked gaps, destruction findings, contradictions, open
escalations, and next re-run trigger. It is a durable reference — not
a register section — and is overwritten on every Gap Definer pass.

---

## Process

### Step 1: Collect Inputs [S]

Read from the current session state (use what was produced during this
Gap Definer pass; do not re-read the full register):

1. Date and source register version.
2. Gate decision (NO_GO / CONDITIONAL_GO / GO), sell_ready, scale_ready.
3. Top-3 ranked gaps (from gap-computing-ledger output).
4. Destruction findings:
   - Pre-mortem dominant failure mode and causal chain
   - Red-team 90-day response (specific incumbent, specific actions)
   - Constraint inversions table (assumption, inversion, consequence, survival)
   - Evidence concentration table (source, claims supported, risk level)
   - Kill signal audit (signal, observed, ignored, consequence)
5. Contradictions detected (if any).
6. Open escalations in execution/queue/ (E-NN files, unresolved).
7. Files written during this pass.
8. Next re-run trigger (governor response to top escalation, or date).

**Gate:** `inputs_available: bool` — Gap Definer pass output accessible in session context.
- Pass: Step 2.
- Fail: halt. Report: "Cannot write summary — Gap Definer pass output not in context."

### Step 2: Write `strategy/gap-definer-pass-complete.md` [S]

Write the file using the structure below. Overwrite if the file exists.

**Required structure:**

```
# Gap Definer Pass Complete

Date: {YYYY-MM-DD}
Source Register Version: {int}
Subject: {business / product name}

---

## Gate Decision: {NO_GO | CONDITIONAL_GO | GO}

{One sentence explaining the gate decision.}

- `sell_ready = {true | false}` — {reason}
- `scale_ready = {true | false}` — {reason}

---

## Top-3 Active Gaps

| Rank | Gap | Target | Dimension | Priority |
|---|---|---|---|---:|
{One row per gap.}

{One sentence: whether all three reduce via a common action or require separate responses.}

---

## Key Destruction Findings

### Pre-Mortem
{Dominant failure mode. Specific failure chain, not generic. 2–4 sentences.}

### Red-Team Response ({incumbent name}, 90 days)
{Specific actions the incumbent would take. What this exposes or compresses.}

### Constraint Inversions

| Assumption Inverted | Consequence | Strategy Survives? |
|---|---|---|
{One row per inversion.}

### Evidence Concentration Risk

| Source | Claims Supported | Risk Level |
|---|---|---|
{One row per concentrated source.}

### Kill Signal Audit
{If no kill conditions are met: one sentence. If signals are approaching: list each with consequence.}

---

## Contradictions

{If none: "No blocking contradictions detected." Otherwise:}

| ID | Between | Description | Impact | Block Execution? |
|---|---|---|---|---|
{One row per contradiction.}

---

## Open Escalations

{List each open E-NN file: name, one-line description of decision needed.}

---

## Files Written by This Pass

{Bullet list of every file written: relative path from repo root.}

---

## Next Re-Run Trigger

{Governor response to {E-NN}, or {YYYY-MM-DD}, whichever is sooner.}
```

**Gate:** `file_written: bool` — `strategy/gap-definer-pass-complete.md` exists and contains all required sections.
- Pass: Step 3.
- Fail: re-write. Check which section is missing.

### Step 3: Confirm and Return [S]

Confirm the file was written. Return the file path to the agent for
inclusion in the pass report.

**Gate:** `confirmed: bool` — file path returned.
- Pass: done.
- Fail: retry write.

---

## Quality Criteria

- Gate decision matches the value set in strategy/hypotheses.md header
- All three top gaps appear in the gaps table with correct scores
- Every pre-mortem failure chain is specific (named assumption, named consequence)
- Red-team response names a specific incumbent and specific actions
- Every constraint inversion from the destruction pass appears in the table
- Every concentrated source is named
- Every open E-NN file in execution/queue/ is listed under Open Escalations
- Next re-run trigger references a specific escalation file or a specific date

## Failure Modes

| Signal | Recovery |
|---|---|
| Gap Definer pass context not available | Halt. Report: "gap-write-pass-summary must be called at the end of a Gap Definer pass." |
| strategy/ directory does not exist | Create it, then write the file. |
| Prior gap-definer-pass-complete.md exists | Overwrite silently — this is expected behaviour. |
| Destruction pass not run (no findings to summarise) | Halt. Report: "gap-write-pass-summary requires destruction pass output. Run gap-running-destruction first." |

## Boundaries

**In scope:** Writing the summary document from Gap Definer pass context.

**Out of scope:** Writing to gap-analysis.md or hypotheses.md (agent handles those), enforcing decisions, computing gaps, running destruction.
