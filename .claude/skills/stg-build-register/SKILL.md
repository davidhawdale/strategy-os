# Build Register from Seed

Construct a fresh `strategy/hypotheses.md` from a governor-supplied `strategy/problem.md` seed.

## `problem.md` Format (canonical)

```
# Strategy Seed

Date: YYYY-MM-DD
Mode: BOOTSTRAP | VENTURE | EXTENSION

## Problem or Opportunity
{governor's problem text}

## Goals
{governor's goals text}

## Capabilities and Resources
{governor's capabilities text}

## Other Constraints
{governor's constraints text, or "None"}
```

This format is the contract between the onboarding UI (writer) and this skill (reader).
If the format changes here, update `App.tsx` `handleGenerate` to match.

---

## Procedure

### Step 1: Read Seed

Read `strategy/problem.md`. Extract:
- `date` — from the Date line
- `mode` — BOOTSTRAP, VENTURE, or EXTENSION
- `problem` — full text under `## Problem or Opportunity`
- `goals` — full text under `## Goals`
- `capabilities` — full text under `## Capabilities and Resources`
- `otherConstraints` — full text under `## Other Constraints` (empty string if "None")

**Gate:** all five fields extracted. If `problem.md` is missing or malformed, halt and report.

### Step 2: Construct Header

```
# Hypothesis Register

Created: {date}
Last Reviewed: {date}
Business Mode: {MODE}
Build Method: GOVERNOR_AUTHORED
Sell & Grow Ready: no
```

### Step 3: Build Section 1 — Problem

- **Claim:** verbatim from `problem`
- **Confidence:** unvalidated
- **Possibility Space:** leave all sub-fields as `{placeholders}`
- **Evidence:** empty entry placeholder
- **Research Sources:** empty entry placeholder
- **Assumptions:**
  - First entry: `[B] [T2] {capabilities} [LOAD-BEARING] [BLAST:HIGH]` with Falsification and Validation as `{placeholders}`
  - Second entry (only if otherConstraints non-empty): `[B] [T2] {otherConstraints} [LOAD-BEARING] [BLAST:MEDIUM]`
- **Kill Condition:** verbatim from `goals` — append "— if this outcome is unachievable, the problem is not worth solving."
- **Last Updated:** `{date}`
- **Update Rationale:** "Initial seed from onboarding. Problem, goals, capabilities, and mode entered by governor. No evidence gathered yet — all sections at UNVALIDATED."

### Step 4: Build Sections 2–7

For each section (Segment, Unit Economics, Value Proposition, Growth Architecture, Solution Design, GTM Plan):
- **Claim:** `{placeholder}`
- **Confidence:** unvalidated
- All sub-fields as `{placeholders}` matching the register template structure
- **Kill Condition:** `{placeholder}`
- **Last Updated:** `{date}`
- **Update Rationale:** `{placeholder}`

Use `strategy/hypotheses.md` template structure as reference for section shapes.

### Step 5: Add Sections 8–9

Append empty shells for:
- Section 8: Destruction Log (Pre-Mortem, Red-Team Response, Constraint Inversions, Evidence Concentration Risk — all `{placeholder}`)
- Section 9: Gap Ledger — leave blank; Gap Definer owns this section

### Step 6: Write Output

Write the complete register to `strategy/hypotheses.md`.

---

## Quality Criteria

- All 9 sections present
- No governor input paraphrased — problem, goals, capabilities, otherConstraints inserted verbatim
- Confidence states all UNVALIDATED
- No fabricated evidence or research sources
- Section 9 (Gap Ledger) left empty — Gap Definer authority

## Boundaries

**In scope:** Fresh register construction from `problem.md` seed.

**Out of scope:** Filling in evidence, research, or any placeholders beyond Section 1 seed fields. CHALLENGE passes (use `stg-challenging-hypotheses`). Gap analysis (gap-definer).
