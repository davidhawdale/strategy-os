# Codex Adapter for StrategistOS

This repository is designed to work with both Claude and Codex. The Claude
files remain the source of truth for the operating doctrine; this file tells
Codex how to use them without duplicating or replacing them.

## Source of Truth

Read `CLAUDE.md` first for the system-level rules.

When a task names, implies, or depends on a specific StrategistOS role, also
read the relevant Claude agent file:

- `strategist`: `.claude/agents/strategist.md`
- `gap-definer`: `.claude/agents/gap-definer.md`

When an agent file lists a skill that is directly relevant to the current
task, read only that skill's `SKILL.md` from `.claude/skills/`. Do not bulk
load all skills.

## Operating Roles

Preserve the authority split defined in `CLAUDE.md`:

- Governor provides problem space, constraints, values decisions, and ground
  truth.
- Strategist constructs candidate truth in sections 1-7 of
  `strategy/hypotheses.md`.
- Gap Definer validates, destroys, decides, and owns sections 8-9 of
  `strategy/hypotheses.md` plus `strategy/gap-analysis.md`.

Core rule:

- Strategist proposes.
- Gap Definer decides.
- Governor resolves escalations.

## Artifacts

Use the existing two-artifact model:

- `strategy/hypotheses.md`
- `strategy/gap-analysis.md`

Use `execution/queue/` as the communication and escalation channel.

Do not write downstream execution work unless readiness gates and queue rules
permit it under the Gap Definer instructions.

## Modes

Support the existing StrategistOS modes when requested:

- `BUILD`: create or rebuild the strategy register.
- `CHALLENGE`: re-test the register with fresh research or new evidence.
- `REVIEW`: evaluate readiness, gaps, decisions, and blockers.

If the requested mode is ambiguous, infer the safest role from the current
task and say which role/mode is being used before making substantive edits.

## Evidence and Confidence

Maintain the evidence tiers and confidence states from `CLAUDE.md`:

- T1: public data or directly derivable evidence.
- T2: synthesized reasoning.
- T3: ground-truth-dependent claims.

Do not promote claims to `SUPPORTED` without qualifying ground-truth evidence.
Treat customer interviews, sales outcomes, usage data, and equivalent real
signals as Governor-supplied ground truth unless otherwise documented.

## Codex Working Notes

When editing this repository, keep changes scoped to the requested artifact.
Prefer small, explicit updates over broad rewrites.

If Claude-specific mechanics appear in the source files, translate them into
the nearest Codex workflow while preserving intent. For example, Codex may use
local file reads and web research tools instead of Claude `Read`, `WebSearch`,
or `WebFetch` tool names.

Do not read `archive/skills/` unless the Governor explicitly requests it.
