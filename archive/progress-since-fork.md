# Progress Since Fork

A high-level overview of work done since the upstream fork merge on 27 April 2026.

---

## System Housekeeping — 28–29 Apr

The first few days after forking were tidy-up: prompt-log and demo instructions added to my_notes, the sync guide simplified, and `.playwright-mcp` added to `.gitignore`. Open questions and model assumptions about the Borders opportunity were also recorded at this point — a working notes layer that would feed later research.

---

## Competitive Research: Press & Journal — 5 May

A structured research session produced a full product briefing on the Press & Journal as a comparator regional publisher. This included pricing screenshots (annual, monthly, and bundle tiers), app store grabs, onboarding walkthroughs, website coverage maps, newsletter and podcast pages, and a written briefing document. All stored in `research/press-and-journal/`.

---

## First CHALLENGE Pass — 5–6 May

The P&J research was put to work immediately: a CHALLENGE pass re-evaluated the existing Borders hypothesis against what P&J's model reveals about what regional digital subscription actually looks like in practice. Alongside this, a snapshotting system was built — CHALLENGE now archives a timestamped copy of `hypotheses.md` and `gap-analysis.md` before any overwriting, creating a recoverable history of strategy states.

---

## Dashboard Iteration Round 1 — 6–8 May

A concentrated run of dashboard improvements:

- Segment view updated with richer display
- Hypothesis detail panel extended with a related gaps table
- Clickable hyperlinks wired into evidence sources across the dashboard and agent prompts
- Evidence entry format backfilled into the hypothesis register to meet the new standard
- Skills converted from flat `.md` files to the `{skill-name}/SKILL.md` directory structure
- Governor Escalations and Decision Deadlines pages populated
- Problem, Segment, Economics, and VP hypothesis panels consolidated into a unified panel layout
- Full dashboard reorganisation pass

---

## System Reset & Consolidation — 8–9 May

A deliberate clean-slate reset: strategy and execution content cleared, blank templates restored for `hypotheses.md` and `gap-analysis.md`. The `gap-definer.md`, `strategist.md`, and `CLAUDE.md` system prompts were consolidated and tightened into their current form. An `archive/` directory was created for deferred skills and older content. A `templates/` directory was added. Settings were updated to support both Claude and Codex as AI providers with a toggle.

---

## Onboarding Workflow + Intake Redesign — 9–10 May

The biggest single work period. The onboarding flow was redesigned from scratch around a new `stg-build-register` skill — a structured intake process that builds the hypothesis register from a strategy seed rather than from freeform conversation. Alongside this:

- Problem capture UI drafted as a new intake screen
- Execution queue switched from a single file to individual per-item files
- Dashboard sections broken out for consistency (Codex refactoring pass)
- Problem, Solution, Unit Economics, and Value Proposition pages wired to correct content
- Dashboard layout made more flexible
- Strategy Seed UI rebuilt; "start over" UX fixed

---

## New Skills — 9–10 May

Two pass-summary skills were added to close the loop on agent runs:

- `stg-write-build-summary` — writes a BUILD pass summary to `strategy/build-pass-complete.md`
- `gap-write-pass-summary` — writes a Gap Definer pass summary to `strategy/gap-definer-pass-complete.md`

---

## First Complete BUILD + Gap Definer Passes — 10 May

The system ran its first full end-to-end strategy cycle on the Borders/DCT problem. The BUILD pass produced a complete hypothesis register across all seven sections. The Gap Definer pass ran the full destruction protocol, enforced decision rules, and set readiness gates. Six execution queue items were issued:

- **E-01** Borders fieldwork mandate
- **E-02** DCT shared-services cost allocation
- **E-03** Portfolio tolerance for small-title investment
- **T-01** Borders resident fieldwork
- **T-02** Borders SME advertiser fieldwork
- **T-03** DCT internal data request

Pass summaries written; full snapshot archived at `archive/dashboard-snapshots/2026-05-10T19-47-15-572Z/`.

---

## Governor Brief Page — 11 May

The Overview and Queue panels were replaced with a purpose-built Governor Brief panel. This surfaces the information a governor actually needs in one place: escalation cards with blast-radius badges, risk and assumption groups, validation state, gap ledger summary, and gate decisions. A `TermHelp` tooltip system was also added — hovering on jargon terms in the UI shows contextual definitions drawn from `TERM_HELP.md`. Provenance tracking for governor brief data was wired in, and substantial test coverage added for the new views.

---

## Minor Fix — 13 May

Hypothesis numbering corrected in the strategist agent prompt.
