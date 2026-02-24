# LeanOS Core — System Instructions

## Operating Model

Human-directed. There is no orchestrator in Core. Human invokes agents directly via CLI. Agents read their work context, execute their procedure, write output to the filesystem, and stop. Escalations are written to `execution/queue/` and wait for human response.

```
Human → invokes agent via CLI
        ↑ reads escalations from execution/queue/
Agent → reads context, executes procedure, writes output
        ↓ writes to filesystem
Output → strategy/canvas/, strategy/goals/, execution/
```

Every canvas section traces to research. Every goal traces to a canvas section. The value function traces to constraints and GTM choices already committed to in the canvas.

---

## Agent Registry

| Agent | Model | What It Does | Writes To | Frontmatter Skills |
|-------|-------|-------------|-----------|-------------------|
| strategist | opus | Builds and validates the 16-section canvas through 4 gated phases. Derives `strategy/values.md` in VALUE mode. | `strategy/canvas/`, `strategy/values.md`, `execution/queue/` | — |
| researcher | sonnet | External intelligence. Market research, competitive analysis, source extraction, playbook creation. Feeds strategist with evidence. | `execution/active/{thread}/output/` | — |
| planner | sonnet | Translates completed canvas into active goals. Tracks and resolves goal lifecycle. | `strategy/goals/` | `sys-managing-goals` |

---

## Skill Loading Architecture

Skills load through two mechanisms.

### Mechanism 1: Frontmatter injection (startup)

Skills listed in an agent's `skills:` frontmatter are injected fully at startup — every line, before the first instruction. Use only for skills the agent needs on every invocation.

Only `sys-managing-goals` uses frontmatter in Core (planner). Strategist and researcher load all skills on demand.

### Mechanism 2: Filesystem read (on demand)

Agents read skills from `.claude/skills/{name}/SKILL.md` when their workflow step references them. Pay-as-you-go — loads only what the current task needs.

```bash
# Discover skills by prefix
ls .claude/skills/{prefix}-*/SKILL.md
```

| Prefix | Domain | Count | Primary Agent |
|--------|--------|-------|--------------|
| `str-` | Strategy — canvas phases | 13 | strategist |
| `crt-validating-*` | Canvas section validation | 5 | strategist |
| `rsh-` | Research and playbooks | 3 | researcher |
| `sys-` | Reasoning frameworks | 7 | all agents |
| `rsn-` | Learning from outcomes | 1 | all agents |

**Total: 29 skills.**

Full skill list: `docs/skills-reference.md`

---

## File Location Index

```
strategy/
├── canvas/              16 section files (00.mode.md → 15.gtm.md)
│   └── index.md         Section map with dependencies
├── values.md            Value function — derived from canvas by strategist VALUE mode
└── goals/
    ├── active/          Active goal files (planner writes here)
    └── archive/         Completed or cancelled goals

execution/
├── active/{thread-id}/  output/ — agent artifacts
└── queue/               Escalations awaiting human response (escalation-{id}.md)

.claude/
├── agents/              Agent definitions
└── skills/              Skill files by prefix
```

No `state/`, `information/`, or `foundations/` directories in Core. Those are Pro execution-layer paths.

---

## Write Authority

| Path | Authoritative Agent |
|------|-------------------|
| `strategy/canvas/` | strategist only |
| `strategy/values.md` | strategist only (VALUE mode) |
| `strategy/goals/` | planner only |
| `execution/active/{thread}/output/` | the agent that owns the thread |
| `execution/queue/` | any agent (escalations) |

No agent writes outside its scope.

---

## Escalation Rules

Agents write to `execution/queue/escalation-{id}.md` and stop when:

- Human input is required to proceed (mode selection, UVP/unfair advantage judgment, tradeoff preferences)
- A canvas gate validation fails — the failing items are listed, the section is not advanced
- A prerequisite is missing (e.g. canvas sections required by planner are incomplete)

**K-open gates** — human must respond before the agent continues:

| Gate | When | What Human Decides |
|------|------|-------------------|
| Canvas Phase 0 | Mode not specified | BOOTSTRAP / VENTURE / HYBRID selection |
| Canvas Phase 2 (step 1) | After UVP + unfair advantage drafted | Whether the draft captures their differentiation; any unfair advantage not in research |
| Values derivation | After `strategy/values.md` written | Tradeoff preferences (Tier 3) — cannot be derived from canvas |

Human responds by editing the escalation file directly or re-invoking the agent with the answer in context. On response, agent re-reads and continues.

---

## Canvas Section Map

| # | File | Phase | Depends On |
|---|------|-------|-----------|
| 00 | mode.md | Setup | — |
| 01 | context.md | Setup | — |
| 02 | constraints.md | Setup | — |
| 03 | opportunity.md | Discovery | 00–02 |
| 04 | segments.md | Discovery | 00–02 |
| 05 | problem.md | Discovery | 04 |
| 06 | competitive.md | Discovery | 03–05 |
| 07 | uvp.md | Definition | 03–06 |
| 08 | unfair.md | Definition | 03–06 |
| 09 | solution.md | Definition | 07–08 |
| 10 | assumptions.md | Launch | 00–09 |
| 11 | channels.md | Launch | 07, 09, 13 |
| 12 | revenue.md | Definition | 07–09 |
| 13 | metrics.md | Definition | 09, 12 |
| 14 | costs.md | Definition | 12–13 |
| 15 | gtm.md | Launch | 00–14 |

Gate G1 runs after section 06 (segments validation).
Gate G2 runs after section 14 (UVP, solution, economics validation).
Gate G4 runs after section 15 (all 16 exist, cross-file consistency check).