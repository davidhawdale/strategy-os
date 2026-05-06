---
name: stg-challenging-hypotheses
description: >
  Runs a CHALLENGE pass on one or more existing hypothesis sections.
  Re-tests claims against new evidence, updates confidence state,
  and maintains update history in the standard format. Use when
  new research arrives after BUILD phase 2.
serves: strategist
domain: hypothesis-validation
affects: hypotheses.md (sections 1-7)
depends-on:
  - stg-scoring-problems
  - stg-segmenting-customers
  - stg-designing-pricing
  - stg-designing-solutions
  - stg-designing-channels
  - stg-calculating-economics
produces: updated hypothesis sections with challenge evidence and update history
---

# Hypothesis Challenge Pass

Re-test one or more existing hypothesis sections against new evidence. Update confidence state and maintain the update history in machine-readable format.

## Procedure

### Step 1: Identify Scope [S]

Read the target hypothesis section(s) from `strategy/hypotheses.md`. Note:
- Current confidence state
- Existing `**Update Rationale:**` text and its embedded date (`YYYY-MM-DD CHALLENGE Pass N —`)
- Any existing `**Prior Update (date):**` entries
- Current `**Last Updated:**` date

**Gate:** `scope_loaded: bool` -- target sections read, current update history noted.

### Step 2: Apply New Evidence [K-grounded]

**Grounded in:** new research, updated competitive data, ground-truth signals.

For each challenged section, test new evidence against:
- The claim — does evidence support, weaken, or falsify it?
- Load-bearing assumptions — does any assumption flip from open to resolved?
- Kill condition — is any kill threshold crossed?

**Updating individual assumptions during a CHALLENGE pass:**
- If an assumption's status changes, update the `-> Status:` line in place (e.g. `OPEN` → `TESTING` or `RESOLVED_TRUE`).
- Append a `-> CHALLENGE YYYY-MM-DD: [one-line note]` line after the Status line to record what changed. Do not remove prior CHALLENGE lines — each pass accumulates them.
- Do not rewrite or remove the original assumption claim, Falsification, or Validation lines unless they are factually wrong.

Determine confidence state transition:
- No change if evidence is additive but claim holds
- UNVALIDATED → RESEARCHED if T1/T2 evidence now supports the claim
- RESEARCHED → SUPPORTED only with T3 ground-truth validation
- Any state → BROKEN if kill condition is crossed

**Gate:** `evidence_applied: bool` -- each section has a stated net effect on claim, assumptions, and confidence state.

### Step 3: Write Update History [S]

**Critical format rule — must be followed exactly:**

1. Take the current `**Update Rationale:**` text. Extract the date from its first line (pattern: `YYYY-MM-DD ...`). Demote it to `**Prior Update (YYYY-MM-DD):**`.
2. If `**Prior Update:**` entries already exist, leave them below — oldest entries stay last.
3. Write a new `**Update Rationale:**` for today's date, incrementing the Pass number.
4. Update `**Last Updated:**` to today's date.

**Output format:**

```
**Last Updated:** YYYY-MM-DD

**Update Rationale:** YYYY-MM-DD CHALLENGE Pass N — [what changed, why, net effect on confidence]
- [evidence item 1, if enumerated]
- [evidence item 2, if enumerated]

[Prose continuation if needed.]

**Prior Update (YYYY-MM-DD):** [previous rationale text, verbatim — do not paraphrase]

**Prior Update (YYYY-MM-DD):** [older entry if present, verbatim]
```

**Bullet rule:** When the update adds enumerated items (e.g. "Added N evidence items:"), list them as markdown bullets (`-`) under the intro sentence. Do not use semicolon-separated prose for lists — the dashboard parser renders bullets as list items.

**Gate:** `history_formatted: bool` -- new Update Rationale written, previous rationale demoted verbatim, Last Updated current.

### Step 4: Write Back [S]

Write the updated section(s) to `strategy/hypotheses.md`. Do not alter sections outside the challenge scope. Do not alter sections 8–9 (Gap Definer authority).

**Gate:** `written_back: bool` -- only target sections modified, all other sections unchanged.

## Quality Criteria

- Update Rationale states net effect on confidence, not just what was found
- Evidence items enumerated as bullets, not semicolon prose
- Prior Update text is verbatim — never paraphrased or summarised
- Pass number increments correctly (Pass 1 → Pass 2 → Pass 3)
- Kill condition explicitly checked and result stated (not silently passed)
- Sections outside scope are not touched

## Failure Modes

| Mode | Signal | Recovery |
|------|--------|----------|
| Paraphrased prior update | Prior Update text differs from original | Copy the original Update Rationale text verbatim before overwriting |
| Missing pass number | Update Rationale says "CHALLENGE pass" without N | Count existing Prior Update entries + 1 |
| Semicolon list in rationale | Evidence items joined by `;` | Reformat as `- item` bullets |
| Silent kill condition pass | Kill condition not mentioned | Explicitly state "Kill condition checked: [result]" |
| Scope creep | Sections not in scope are edited | Read scope list before writing. Write only named sections |

## Boundaries

**In scope:** Re-testing existing claims, updating confidence state, adding new evidence, maintaining update history format.

**Out of scope:** Initial hypothesis construction (BUILD phase skills), gap analysis (gap-definer), GTM execution (Revenue OS), sections 8–9 of hypotheses.md.
