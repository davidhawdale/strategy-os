# Skills Reference

Core ships with 29 skills across 5 categories. All load on demand from `.claude/skills/{name}/SKILL.md` — none are injected at startup except `sys-managing-goals` (planner).

---

## Strategy Skills (`str-*`) — 13 skills

Canvas-building procedures. Each maps to one or more canvas sections. Loaded by the strategist per phase.

| Skill | Canvas Section | What It Does |
|-------|---------------|-------------|
| `str-sizing-markets` | 03.opportunity | Calculates TAM/SAM/SOM. Assesses market timing. |
| `str-segmenting-customers` | 04.segments | Generates behavioral segment definitions with observable entry criteria. |
| `str-scoring-problems` | 05.problem | Scores problem severity, frequency, and willingness-to-pay signal. |
| `str-analyzing-competition` | 06.competitive | Maps competitive landscape, identifies positioning gaps. |
| `str-positioning-value` | 07.uvp, 08.unfair | Crafts value proposition and moat analysis. |
| `str-designing-solutions` | 09.solution | Designs MVP feature set, selects growth architecture (PLG/Network/Sales). |
| `str-designing-pricing` | 12.revenue | Designs pricing model and tier structure. |
| `str-calculating-economics` | 13.metrics | Calculates LTV, CAC, payback period. |
| `str-structuring-costs` | 14.costs | Documents cost structure, projects runway. |
| `str-extracting-assumptions` | 10.assumptions | Extracts implicit assumptions, ranks by risk. |
| `str-selecting-channels` | 11.channels | Selects acquisition channels aligned to ACV. |
| `str-planning-gtm` | 15.gtm | Plans go-to-market motion. |
| `str-defining-values` | strategy/values.md | Derives value function from completed canvas. |

---

## Validation Skills (`crt-validating-*`) — 5 skills

Canvas gate validators. Run at phase completion. A failing section is flagged with specific items — it does not advance until resolved.

| Skill | Validates | Gate |
|-------|-----------|------|
| `crt-validating-segments` | `04.segments.md` — behavioral definitions, observable criteria, reachability | G1 (end of Discovery) |
| `crt-validating-uvp` | `07.uvp.md` — specificity, segment match, differentiation | G2 (end of Definition) |
| `crt-validating-solution` | `09.solution.md` — problem-solution fit, scope minimalism, growth model alignment | G2 |
| `crt-validating-economics` | `13.metrics.md` — LTV:CAC ratio vs mode threshold, payback period vs mode maximum | G2 |
| `crt-validating-metrics` | `13.metrics.md` — quantitative rigor, testability, time-bounding | G2 |

**Scoring:** Each validator scores sections on a 0–100 scale. Threshold for advancement varies by gate. Items below threshold are listed with specific failure reasons — not generic "improve this section" feedback.

---

## Research Skills (`rsh-*`) — 3 skills

Intelligence-gathering procedures for the researcher agent.

| Skill | What It Does |
|-------|-------------|
| `rsh-researching-market` | Market research calibrated to business mode. BOOTSTRAP = SOM depth. VENTURE = TAM/competitive breadth. |
| `rsh-extracting-insights` | Processes expert sources — videos, podcasts, articles, books — and extracts structured insights. |
| `rsh-creating-playbooks` | Generates actionable playbooks from a body of extracted insights. |

---

## Reasoning Skills (`sys-*`) — 7 skills

Reasoning frameworks. Available to all agents. These shape how decisions are made, not what is built.

| Skill | What It Does | When to Apply |
|-------|-------------|--------------|
| `sys-auditing-effectiveness` | Wisdom-level gate — checks whether the target is the right target before executing. | Before committing to any significant canvas section or goal |
| `sys-dissolving-problems` | Applies dissolution hierarchy: redesign the system so the problem can't occur, before solving or optimizing. | When the same problem keeps recurring |
| `sys-formulating-mess` | Treats interacting problems as a whole. Prevents fixing one problem that worsens another. | When multiple canvas sections pull in different directions |
| `sys-reframing-assumptions` | Breaks conformity loop when default approaches keep failing. Inverts assumptions. | When previous attempts on the same problem failed >2 times |
| `sys-rotating-viewpoints` | Examines a problem from every stakeholder and system perspective before choosing a path. | When stuck on a high-stakes section |
| `sys-managing-goals` | Full goal lifecycle: define from canvas → track → resolve. | Planner (always loaded via frontmatter) |
| `sys-evaluating-values` | Evaluates a proposed action against the value function. Returns BLOCK / EXECUTE / EXECUTE+FLAG / ESCALATE. | Before any significant decision |

---

## Learning Skill (`rsn-*`) — 1 skill

| Skill | What It Does |
|-------|-------------|
| `rsn-learning-outcomes` | Extracts insights from experience and improves future performance. Single-loop (fix the error) and double-loop (change the assumption that caused the error). |

---

## How Skills Are Structured

Each skill file has:

1. **Frontmatter** — name, description, allowed tools, domain, frequency
2. **Input** — what the agent must have before running this skill
3. **Procedure** — numbered steps, labeled [S] (synthesize) or [R] (research)
4. **Output** — what gets written and where
5. **Quality check** — verification criteria before the skill is considered complete

Skills are procedures, not prompts. They tell the agent exactly what to do, in what order, using which tools. An agent that loads a skill and follows it will produce consistent output regardless of phrasing in the work order.
