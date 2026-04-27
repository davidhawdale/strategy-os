# Sync Guide

## WARNING: Never use GitHub's "Sync fork" button on this repo

This fork contains files that exist in both repos but have completely different content:

| File | Your version | Bella's version |
|---|---|---|
| `strategy/hypotheses.md` | First problem run data | Blank template |
| `strategy/gap-analysis.md` | First problem run data | Blank template |
| `CLAUDE.md` | Customised project instructions | Her original |

Clicking "Sync fork" would overwrite all of the above with Bella's versions, destroying your strategy content.

**The only safe way to pull Bella's changes is selectively via the command line:**

```bash
git fetch upstream
git checkout upstream/main -- tools/dashboard/ .claude/
git commit -m "sync tools/dashboard and .claude to upstream (BellaBe/strategy-os)"
git push
```

This pulls only `tools/dashboard/` and `.claude/` — the directories you want from her. Your `strategy/`, `execution/`, `x_extensions/`, and `CLAUDE.md` are never touched.

Note: `.claude/` is intentionally synced because it is not customised locally. If you ever customise an agent or skill, remove `.claude/` from this command before running it.
