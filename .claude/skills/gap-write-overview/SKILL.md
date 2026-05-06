# gap-write-overview

Write a short, governor-facing overview of where the strategy stands after this pass.

## When to run

After PASS 6 (gap-write-diff) completes. Runs after every CHALLENGE pass.

## Purpose

This is the document a governor reads first. It must be scannable in under two minutes.
It is not a summary of the diff — it is a forward-looking status document.
One page maximum.

## Procedure

1. Check `strategy/` for any existing `overview.md` file (the previous pass overview).
   If one exists, confirm it is already present in the snapshot directory
   (`strategy/snapshots/{prior-date}/`). Then delete it from `strategy/` — the snapshot
   is the archive; `strategy/` holds only the current overview.
2. Read `strategy/hypotheses.md` (header and key sections) for current decision state.
3. Read the action queue from `execution/queue/` (most recent gap-definer-actions file).
4. Read the challenge-diff written by gap-write-diff for the "what changed" table.
5. Write `strategy/overview.md` using the structure below.

---

### Document structure

```
# {Project Name} — Strategy Overview

**Date:** {today}
**Pass:** CHALLENGE (Pass {N})
**System:** StrategistOS
**Decision:** {CONDITIONAL_GO / GO / KILL}
**Sell Ready:** {true / false}
**Scale Ready:** {true / false}

---

## What Happened

{One short paragraph. What evidence was reviewed, what agents ran,
what the overall result was. No more than 4 sentences.}

---

## What Changed

| Change | Effect |
|--------|--------|
| ... | ... |

{Draw this from the challenge-diff. Include only material changes —
not every minor evidence addition.}

---

## Most Urgent Items

{Numbered list. Each item: action, deadline, why it is urgent.
Maximum 5 items. These are the things the governor must act on now.}

---

## Full Register Files

| File | Contents |
|------|----------|
| `strategy/hypotheses.md` | ... |
| `strategy/gap-analysis.md` | ... |
| `strategy/challenge-diff.md` | ... |
| `execution/queue/gap-definer-actions.md` | ... |
| `strategy/snapshots/{prior-date}/` | ... |

{List all current artifacts with a one-line description of each.}

---

## Re-run Trigger

{Bullet list of specific conditions that should trigger the next pass.
Always include a date-based trigger as the last item.}
```

## Quality check

- "What Happened" must not exceed 4 sentences.
- "Most Urgent Items" must include deadlines — no open-ended items.
- "Full Register Files" must list every artifact written this pass.
- Do not repeat the diff detail here — the overview points to the diff,
  it does not reproduce it.
