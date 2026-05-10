---
name: stg-write-build-summary
description: >
  Writes a human-readable BUILD pass summary document to
  strategy/build-pass-complete.md. Run at the end of every BUILD
  pass, after the escalation check. Overwrites any prior version.
license: Complete terms in LICENSE.txt
serves: strategist
domain: output-documentation
affects: strategy/build-pass-complete.md
depends-on: none
produces: summary-document
---

# Write Build Pass Summary

Write a plain-language summary of the completed BUILD pass to
`strategy/build-pass-complete.md`. This document captures what the
strategist did, what survived, what was eliminated, and what the
governor must do next. It is a durable reference — not a register
section — and is overwritten on every BUILD pass.

---

## Process

### Step 1: Collect Inputs [S]

Read from the current session state (do not re-read the full register;
use what was constructed during the BUILD pass):

1. Date and mode (from strategy seed or session context).
2. Research areas covered and key finding per area.
3. Hypotheses and proposals that survived compression, with alternatives carried.
4. Candidates eliminated, with reasons.
5. Governor next steps (escalations raised, T3 assumptions requiring fieldwork).
6. Files written during this pass (hypotheses.md, execution/queue/ entries).

**Gate:** `inputs_available: bool` — BUILD pass output accessible in session context.
- Pass: Step 2.
- Fail: halt. Report: "Cannot write summary — BUILD pass output not in context."

### Step 2: Write `strategy/build-pass-complete.md` [S]

Write the file using the structure below. Overwrite if the file exists.

**Required structure:**

```
# Build Pass Complete

Date: {YYYY-MM-DD}
Mode: {BUILD mode and extension/bootstrap/venture as applicable}
Subject: {business / product name from strategy seed}

---

## What Was Researched

{For each research area: one bullet with area name in bold and key finding.}

---

## What Survived Compression

{For each surviving hypothesis/proposal: name, one-sentence claim,
and alternatives carried (if any).}

---

## What Was Eliminated and Why

| Candidate | Eliminated | Reason |
|---|---|---|
{One row per eliminated candidate.}

---

## What the Governor Needs to Do Next

{Numbered list. Each item references a specific escalation file (E-NN)
or action. State what it unlocks.}

---

## Files Written by This Pass

{Bullet list of every file written: relative path from repo root.}
```

**Gate:** `file_written: bool` — `strategy/build-pass-complete.md` exists and contains all required sections.
- Pass: Step 3.
- Fail: re-write. Check which section is missing.

### Step 3: Confirm and Return [S]

Confirm the file was written. Return the file path to the agent for
inclusion in the report to governor.

**Gate:** `confirmed: bool` — file path returned.
- Pass: done.
- Fail: retry write.

---

## Quality Criteria

- Every research area from the BUILD pass appears in "What Was Researched"
- Every eliminated candidate appears in the elimination table
- Every escalation file (E-NN) raised during the pass is referenced in "What the Governor Needs to Do Next"
- File path is relative from repo root, not absolute
- No section is empty

## Failure Modes

| Signal | Recovery |
|---|---|
| BUILD context not available (skill called outside BUILD) | Halt. Report: "stg-write-build-summary must be called at the end of a BUILD pass." |
| strategy/ directory does not exist | Create it, then write the file. |
| Prior build-pass-complete.md exists | Overwrite silently — this is expected behaviour. |

## Boundaries

**In scope:** Writing the summary document from BUILD pass context.

**Out of scope:** Writing to hypotheses.md or execution/queue/ (agent handles those), conducting research, making strategy decisions.
