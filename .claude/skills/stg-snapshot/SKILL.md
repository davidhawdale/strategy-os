# stg-snapshot

Snapshot strategy and queue artefacts before a CHALLENGE pass overwrites them.

## When to run

At the start of CHALLENGE mode (Step 0), before any research or analysis begins.

## Procedure

1. Read `strategy/hypotheses.md` and extract the register date from the header
   (look for the most recent "Last updated" or "Register Version" date in YYYY-MM-DD format).

2. **Strategy snapshot:** Construct the path `strategy/snapshots/{date}/`.
   If it already exists, note "Strategy snapshot for {date} already exists — skipping."
   Otherwise, create the directory and copy into it:
   - `strategy/hypotheses.md`
   - `strategy/gap-analysis.md`
   - `strategy/overview.md` (if any exists)
   - `strategy/challenge-diff.md` (if any exists)

3. **Queue snapshot:** Construct the path `execution/queue/snapshots/{date}/`.
   If it already exists, note "Queue snapshot for {date} already exists — skipping."
   Otherwise, create the directory and copy all files in `execution/queue/` into it,
   except `.gitkeep`.

4. Snapshot files must not be modified after copying.
