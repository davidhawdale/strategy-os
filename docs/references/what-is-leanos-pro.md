# What is LeanOS Pro?

AI-native operating system for building and running a business. One person operates with 5–10× effectiveness.

15 specialized agents governed by an AI orchestrator. 172 skills covering every business function. All transparent, all modifiable, all yours for $499 once.

---

## How It Works

```
You (direction + approvals at gates)
       ↑ escalations
Orchestrator (governance) → reads state, reasons, writes work orders
       ↓ Task delegation
Functions (execution) — 15 specialized agents
       ↓
State Layer — state/, information/, execution/
```

The orchestrator is not a router. On each cycle it observes all state files, reasons about the highest-priority gap, writes a work order, delegates to the right agent, and evaluates what changed. You respond when it escalates — strategy pivots, brand voice direction, design approvals, channel setup. Everything else executes autonomously.

Canvas targets → Goals → Gaps → Work orders → Execution → Gap closes

---

## 15 Agents

| Agent | Model | Function |
|-------|-------|----------|
| orchestrator | opus | Governance — reads state, reasons, writes work orders |
| observer | haiku | State refresh, gap computation, health scoring |
| planner | sonnet | Goal lifecycle — define, track, resolve |
| strategist | sonnet | 16-section canvas through 4 gated phases |
| narrator | opus | Full foundation pipeline — ICP, brand, design system, channels |
| builder | sonnet | Spec pipeline + codegen + frontend |
| modeler | sonnet | Feature specs, wireframes, prioritization |
| tester | sonnet | Test design, execution, bug diagnosis |
| deployer | sonnet | Deployment, monitoring, incident response |
| reacher | sonnet | Content, visuals, campaigns |
| converter | sonnet | Acquisition pipeline to close |
| nurturer | sonnet | Post-close customer lifecycle |
| researcher | sonnet | Market research, competitive analysis, source extraction |
| reviewer | sonnet | Independent quality validation |
| pruner | sonnet | Deprecation, archival, dead weight removal |

---

## 172 Skills

Skills are domain procedures loaded on demand. Each skill is a self-contained methodology — procedure, quality checks, output format. Agents read skills from disk when their workflow step needs them. Skills not needed for the current task consume no context.

| Domain | Skills | Agents |
|--------|--------|--------|
| Strategy | 14 | strategist |
| Acquisition | 17 | converter |
| Customer success | 14 | nurturer |
| Awareness / content | 8 | reacher |
| Narrative & design foundations | 6 + 16 | narrator |
| Engineering (backend + frontend) | 36 | builder |
| Product modeling | 6 | modeler |
| Quality & critique | 11 | reviewer |
| Research | 3 | researcher |
| Observer / state | 5 | observer |
| Behavioral science | 6 | reacher, converter, modeler |
| System governance | 12 | orchestrator |
| Testing & QA | 5 | tester |
| Deployment | 3 | deployer |

---

## Directory Structure

```
{your-project}/
├── strategy/
│   ├── canvas/          # 16-section business canvas
│   ├── foundations/     # ICP, brand voice, design system, channels
│   ├── goals/           # Goal definitions (active/ + archive/)
│   └── policies/        # Operational policies
├── state/
│   ├── product/         # Build status, feature state
│   ├── market/          # Content, channels, audience
│   ├── revenue/         # Pipeline, customers, metrics
│   ├── operations/      # Deployments, incidents
│   └── assets/          # Skill registry, capability map
├── information/
│   ├── gaps/            # Gap files per domain
│   ├── pressures/       # Pressure signals
│   └── health/          # System health scores
├── execution/
│   ├── active/          # Active work orders + output
│   ├── completed/       # Archived threads
│   └── queue/           # Escalations and pending signals
├── knowledge/           # Domain knowledge — frameworks, playbooks, research
└── .claude/
    ├── agents/          # 15 agent definitions
    └── skills/          # 172 domain skills
```

---

## Business Modes

Set in `strategy/canvas/00.mode.md`. Affects prioritization, impact scoring, and resource allocation.

| Mode | Optimizes For |
|------|---------------|
| **BOOTSTRAP** | Profitability, cash flow, fast decisions |
| **VENTURE** | Growth rate, market size, defensibility |

---

## Getting Started

1. Copy the project template: `cp docs/reference/what-is-PROJECT.template.md docs/reference/what-is-{your-project}.md`
2. Fill in every section — the orchestrator reads this for context
3. Run `claude --agent orchestrator`
4. The orchestrator bootstraps canvas → foundations → goals and then enters its governance loop

**[Get LeanOS Pro](https://bellabe.github.io/leanos)**
