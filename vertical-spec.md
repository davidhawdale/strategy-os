# Vertical Spec: Unified Agentic Validation System

Generated: 2026-04-01
Project: LeanOS Core
Relationship: decomposes the construction spec into production verticals, agents, skills, and workflow routing

## 1. Vertical Summary

Two verticals:

| Vertical               | Agent        | Purpose                                                              | Purity                          |
|------------------------|--------------|----------------------------------------------------------------------|---------------------------------|
| Strategy Construction  | strategist   | build candidate truth and proposed design                            | effectful                       |
| Decision Control       | gap-definer  | compute gaps, enforce rules, run adversarial destruction, gate readiness | mostly pure over system state |

Each vertical owns a distinct responsibility. Neither may absorb the authority of the other.

Downstream revenue execution is an external system that consumes validated outputs via readiness gates (sell_ready / scale_ready).

## 2. Dependency Graph

```
Strategist  -> produces candidate register state (including GTM Plan proposal)
Gap Definer -> consumes strategist state, produces readiness signals and blockers
Gap Definer -> produces gap analysis register as detailed working document
Evidence    -> returns to Strategist and Gap Definer on next cycle
```

No direct path from this system to execution exists without Gap Definer's readiness gate.

## 3. Peer Review / Control Model

| Producer    | Reviewer / Controller | Rationale                                        |
|-------------|-----------------------|--------------------------------------------------|
| strategist  | gap-definer           | creation must not self-authorize                 |
| gap-definer | governor              | values and judgment escalations only             |

There is no "self-review counts as validation" rule anywhere in the system.

## 4. Vertical 1: Strategy Construction

### Agent: strategist

```yaml
name: strategist
description: >
  Autonomous strategy builder. Constructs candidate truth and proposed design
  from governor input using public research, structural reasoning, and
  possibility-space compression.
function: strategize
model: opus
reads:
  - strategy/hypotheses.md
  - execution/queue/
tools:
  - Read
  - Write
  - Edit
  - Grep
  - Glob
  - WebSearch
  - WebFetch
writes:
  - strategy/hypotheses.md
  - execution/queue/
skills:
  - stg-sizing-markets
  - stg-segmenting-customers
  - stg-scoring-problems
  - stg-analyzing-competition
  - stg-designing-pricing
  - stg-calculating-economics
  - stg-designing-channels
  - stg-designing-solutions
  - stg-extracting-insights
maxTurns: 50
escalates_to: governor
```

### Embedded in Prompt

Always embedded:

- identity and compression model
- T1/T2/T3 epistemics
- overconfidence markers
- technical founder failure patterns
- evidence-vs-framework distinction
- agent-specific escalation triggers (what strategist escalates vs handles autonomously)
- skill-loading instructions
- explicit reminder that solution and architecture are proposals, not execution authority

Shared governor protocol (classification, format, quality standard, bright lines, response handling) is inherited from CLAUDE.md system instructions and not duplicated in the agent prompt.

### Workflow

**BUILD**
1. load governor input and current register
2. run research skills
3. run construction skills
4. write candidate register sections (including GTM Plan proposal)
5. identify unresolved T3 blockers
6. hand off to gap-definer

**CHALLENGE**
1. fetch fresh public information
2. revise evidence and claims
3. preserve alternatives and uncertainty
4. hand off revised register to gap-definer

**REVIEW**
1. run challenge pass
2. optimize the register for handoff clarity
3. do not self-certify readiness

### Constraints

- cannot set readiness gates (sell_ready / scale_ready)
- cannot own destruction log
- cannot turn a design proposal into validated truth
- cannot collapse possibility space to one option without documented elimination

### Strategist Skills

#### 4.1 stg-sizing-markets

**Purpose:**
- TAM / SAM / SOM
- timing assessment
- mode-specific threshold checks

**Must produce:**
- range-based, tier-labeled figures
- source-cited evidence
- notes that feed Problem and Segment

**Key checks:**
- top-down and bottom-up TAM
- explicit SAM filters
- realistic SOM capture

#### 4.2 stg-segmenting-customers

**Purpose:**
- candidate segment enumeration
- observable filters
- pain scoring
- elimination log

**Must produce:**
- primary segment + alternatives carried
- explicit trigger event / budget owner / current spend hypotheses

#### 4.3 stg-scoring-problems

**Purpose:**
- enumerate 5+ candidate problems
- score frequency, severity, breadth, alternative inadequacy
- select primary problem without solution bias

**Must produce:**
- problem possibility space
- pain intensity / frequency / workaround notes

#### 4.4 stg-analyzing-competition

**Purpose:**
- direct and indirect competitor map
- positioning matrix
- competitor response capability notes

**Must produce:**
- evidence for Problem, VP, Architecture, Economics
- concentration-aware provenance

#### 4.5 stg-designing-pricing

**Purpose:**
- pricing hypothesis
- revenue model
- channel-economics coherence

**Must produce:**
- price ranges
- WTP marked T3
- tier structure and upgrade triggers

#### 4.6 stg-calculating-economics

**Purpose:**
- LTV / CAC / payback / margins
- cost structure
- scenario analysis

**Must produce:**
- optimistic/base/pessimistic/kill scenarios
- threshold checks for bootstrap / venture

#### 4.7 stg-designing-channels

**Purpose:**
- channel identification and analysis for the segment
- where segments gather, how to reach them
- channel-segment fit assessment
- per-channel CAC estimation
- channel mix design with investment allocation
- channel sequencing by phase

**Must produce:**
- ranked channel list with segment reach and CAC estimates
- channel-economics coherence assessment
- ACV-channel viability check
- phase-sequenced channel plan

**Key checks:**
- distinct from channel economics in stg-calculating-economics (this skill focuses on channel identification and fit, not aggregate unit economics)
- channel strategy feeds both Unit Economics and GTM Plan sections

#### 4.8 stg-designing-solutions

**Purpose:**
- propose growth architecture
- propose positioning and feature map
- define MVP scope and aha moment
- encode hypothesis constraints on design

**Must produce:**
- non-binding architecture and solution sections

#### 4.9 stg-extracting-insights

**Purpose:**
- process governor-provided books, articles, podcasts, transcripts
- map extracted claims into evidence items

**Must produce:**
- tier-labeled insight evidence

## 5. Vertical 2: Decision Control

### Agent: gap-definer

```yaml
name: gap-definer
description: >
  Decision engine. Computes gaps between desired and current state, runs
  adversarial destruction, enforces decision rules, writes execution queues,
  and determines readiness gates for downstream systems.
function: define_gaps
model: opus
reads:
  - strategy/hypotheses.md
  - strategy/gap-analysis.md
  - execution/queue/
tools:
  - Read
  - Write
  - Edit
  - Grep
  - Glob
writes:
  - strategy/hypotheses.md
  - strategy/gap-analysis.md
  - execution/queue/
skills:
  - gap-computing-ledger
  - gap-running-destruction
  - gap-enforcing-decisions
maxTurns: 40
escalates_to: governor
```

### Embedded in Prompt

Always embedded:

- desired-state framing
- gap score semantics
- 10 decision rules
- readiness gate criteria (sell_ready / scale_ready)
- authority boundary over destruction and progression
- agent-specific escalation triggers (what gap-definer escalates vs decides autonomously)
- contradiction detection rules

Shared governor protocol (classification, format, quality standard, bright lines, response handling) is inherited from CLAUDE.md system instructions and not duplicated in the agent prompt.

### Primary Workflow

**PASS 1: normalize register state**
1. read register
2. ensure desired-state and current-state sections are interpretable
3. detect malformed entries and mark blockers

**PASS 2: compute gap ledger**
1. compare desired vs current conditions
2. score gaps
3. rank gaps
4. map each to an action spec

**PASS 3: run destruction**
1. pre-mortem
2. red-team response
3. assumption inversion
4. evidence concentration analysis
5. kill-signal audit

**PASS 4: enforce decisions**
1. reclassify confidence / support states where needed
2. block invalid architecture or solution paths
3. create governor escalations if required
4. set sell_ready / scale_ready

**PASS 5: issue queue**
1. write top-3 actions
2. write only gap-reduction tasks / escalations
3. update gap analysis register with full detail
4. update hypothesis register summary sections (Destruction Log, Gap Ledger)

### Decision Rules

These are mandatory and must appear in the agent spec exactly as operational rules:

1. Work the highest gap score x blast radius
2. Reject tasks that do not reduce a top-3 gap
3. T3 cannot directly earn SUPPORTED
4. Meeting a kill condition or seeing contradictory T1 forces BROKEN
5. Exceeded deadline forces KILL | PIVOT | COMMIT
6. Any internal contradiction blocks execution
7. Architecture-dependent work is blocked if architecture conditions are unmet
8. Solution-led validation invalidates the test
9. Downstream systems may proceed only if readiness gate predicate passes
10. Maximum 3 active gaps

### Gap Skills

#### 5.1 gap-computing-ledger

**Purpose:**
- compute desired-current deltas
- quantify component scores
- produce ranked gap ledger

**Inputs:**
- desired states
- current states
- evidence tiers
- deadlines
- blast radii

**Outputs:**
- scored GapRecords
- top-3 priority list
- recommended action per gap

**Quality criteria:**
- every gap references a concrete missing condition
- score rationale is documented
- ranking is deterministic from inputs

#### 5.2 gap-running-destruction

**Purpose:**
- adversarially attack the current register

**Inputs:**
- hypotheses
- assumptions
- evidence provenance
- architecture and solution proposals

**Outputs:**
- Destruction Log
- contradiction findings
- concentrated evidence warnings

**Quality criteria:**
- every load-bearing assumption receives inversion treatment
- red-team response is specific, not generic
- pre-mortem identifies a real failure chain, not a slogan

#### 5.3 gap-enforcing-decisions

**Purpose:**
- apply rule engine and progression logic

**Inputs:**
- Gap Ledger
- Destruction Log
- deadlines
- blockers
- architecture validity
- governor responses

**Outputs:**
- updated confidence/support states
- sell_ready / scale_ready flags
- execution queue
- escalations

**Quality criteria:**
- no rule is skipped
- every block has explicit rationale
- every governor escalation includes options and consequences

## 6. Skill Loading Architecture

| Vertical    | Skill                       | Loaded When                        |
|-------------|-----------------------------|------------------------------------|
| strategist  | stg-sizing-markets          | research phase                     |
| strategist  | stg-analyzing-competition   | research phase                     |
| strategist  | stg-scoring-problems        | construction phase                 |
| strategist  | stg-segmenting-customers    | construction phase                 |
| strategist  | stg-designing-pricing       | economics construction             |
| strategist  | stg-calculating-economics   | economics construction             |
| strategist  | stg-designing-channels      | channel analysis and GTM planning  |
| strategist  | stg-designing-solutions     | design proposal construction       |
| strategist  | stg-extracting-insights     | on-demand                          |
| gap-definer | gap-computing-ledger        | every gap pass                     |
| gap-definer | gap-running-destruction     | every major review                 |
| gap-definer | gap-enforcing-decisions     | every pass after gap computation   |

## 7. Queue Contracts

### Governor Escalation Queue

`execution/queue/`

Used by:
- Strategist for discovery-time T3 blockers
- Gap Definer for governor escalations

## 8. Read / Write Contracts

| Path                        | strategist | gap-definer |
|-----------------------------|------------|-------------|
| `strategy/hypotheses.md`    | read/write | read/write  |
| `strategy/gap-analysis.md`  | read       | read/write  |
| `execution/queue/`          | read/write | read/write  |

## 9. Failure Modes and Recovery

### 9.1 Strategist Biasing Validation

**Signal:** design proposal changes hypothesis confidence by implication
**Recovery:** Gap Definer blocks change and requires neutral reframe

### 9.2 Gap Definer Becoming Passive

**Signal:** gap ledger only summarizes, does not block or prioritize
**Recovery:** enforce mandatory decision rules and queue ownership

### 9.3 Endless Analysis

**Signal:** deadlines repeatedly extended without forced disposition
**Recovery:** deadline rule triggers KILL | PIVOT | COMMIT

### 9.4 Narrative Coherence Trap

**Signal:** clean internal story but thin or concentrated evidence
**Recovery:** destruction pass and concentration risk warning become blocking

## 10. Verification Criteria

- Two agent files exist
- Strategist has 9 skills
- Gap Definer has 3 skills
- Gap Definer owns readiness gates and destruction log
- Hypothesis register includes gap ledger and destruction log (summary sections)
- Gap analysis register exists as Gap Definer's detailed working document
- Every vertical has explicit constraints and failure recovery

## 11. Bottom Line

This vertical spec makes the system operational because it assigns:

- one builder
- one controller

That is the minimum structure required for autonomy without self-delusion. Revenue execution is downstream, external, and gated by readiness signals this system produces.
