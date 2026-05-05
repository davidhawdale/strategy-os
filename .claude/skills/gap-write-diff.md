# gap-write-diff

Write a before/after comparison document for the current CHALLENGE pass.

## When to run

After PASS 5 (Issue Queue) completes. Only runs during CHALLENGE mode — not BUILD.

## Procedure

1. Check `strategy/` for any existing `challenge-diff-*.md` file (from a prior pass).
   If one exists, confirm it is already present in the snapshot directory
   (`strategy/snapshots/{prior-date}/`). Then delete it from `strategy/` — the snapshot
   is the archive; `strategy/` holds only the current diff.

2. Find the most recent directory under `strategy/snapshots/` — this is the
   pre-challenge baseline. If no snapshot directory exists, note
   "No snapshot found — diff cannot be written" and skip.

3. Read the snapshot files:
   - `strategy/snapshots/{date}/hypotheses.md`
   - `strategy/snapshots/{date}/gap-analysis.md`

4. Read the current (post-challenge) versions:
   - `strategy/hypotheses.md`
   - `strategy/gap-analysis.md`

5. Write `strategy/challenge-diff-{today}.md` with the following sections.
   Use today's date in YYYY-MM-DD format for the filename.

---

### Document structure

```
# Challenge Diff — {project name}

**Before:** {prior pass type}, {snapshot date}
**After:** CHALLENGE pass, {today}
**New evidence:** {brief description of what the Strategist reviewed}

---

## Headline

Decision: {before} → {after}
Phase 0 launch status: {before} → {after}
sell_ready: {before} → {after}
scale_ready: {before} → {after}

---

## Hypothesis Confidence States

| Section | Before | After | Reason |
|---------|--------|-------|--------|
| 1 — Problem | ... | ... | ... |
| 2 — Segment | ... | ... | ... |
| 3 — Unit Economics | ... | ... | ... |
| 4 — Value Proposition | ... | ... | ... |
| 5 — Growth Architecture | ... | ... | ... |
| 6 — Solution Design | ... | ... | ... |
| 7 — GTM Plan | ... | ... | ... |

---

## Gap Priority Changes

| Gap | Before (Final Priority) | After (Final Priority) | Change |
|-----|------------------------|----------------------|--------|
| ... | ... | ... | ... |

---

## Assumptions Changed

| Assumption | Before | After |
|-----------|--------|-------|
| ... | ... | ... |

---

## New Contradictions

{List any new C-N entries. If none, write "None."}

---

## Escalations

| Escalation | Before | After |
|-----------|--------|-------|
| ... | ... | ... |

---

## New Failure Modes

{List destruction findings not present in the prior pass. If none, write "None."}

---

## What Did Not Change

{Explicit list with brief rationale for each item.}

---

## Baseline Snapshot Location

`strategy/snapshots/{date}/`
```

## Quality check

- Every section must be populated — no empty tables.
- "What Did Not Change" must be explicit. Do not omit it to save space.
- The Headline section must reflect the actual readiness gate states from
  the Gap Definer's PASS 4 output, not inferred from the hypotheses.
