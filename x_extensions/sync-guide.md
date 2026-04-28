# Sync Guide

## WARNING: Never use GitHub's "Sync fork" button

These files exist in both repos but have completely different content:

- `strategy/hypotheses.md` — your first problem run data vs. Bella's blank template
- `strategy/gap-analysis.md` — your first problem run data vs. Bella's blank template
- `CLAUDE.md` — your customised project instructions vs. her original

Clicking "Sync fork" overwrites all of the above with Bella's versions. Always sync via the command line instead.

---

## If this → do that

- **Bella has pushed new code and you want it** → run a selective sync
- **GitHub shows "N commits behind" after a sync** → run a merge
- **You want both in one step** → selective sync first, then merge

---

## Selective sync — pull Bella's code changes

```bash
git fetch upstream
git checkout upstream/main -- tools/dashboard/ .claude/
git commit -m "sync tools/dashboard and .claude to upstream (BellaBe/strategy-os)"
git push
```

This copies only `tools/dashboard/` and `.claude/` from Bella. Your `strategy/`, `execution/`, `x_extensions/`, and `CLAUDE.md` are never touched.

Note: `.claude/` is intentionally synced because it is not customised locally. If you ever customise an agent or skill, remove `.claude/` from this command before running it.

---

## Merge — clear the "N commits behind" indicator

After a selective sync, GitHub often shows "N commits ahead, 1 commit behind". This happens because the selective sync copies Bella's file changes but does not bring her commit into your git history. To resolve it:

```bash
git fetch upstream
git merge upstream/main --no-edit
git push
```

Git auto-merges cleanly in most cases because your files already contain her changes. Your `strategy/`, `execution/`, `x_extensions/`, and `CLAUDE.md` are not touched — Bella does not have those files, so there is nothing to conflict.

If the merge ever reports a conflict, stop and check with Claude before resolving — it means Bella has changed a file you have also changed locally.
