# Vertical Spec: Autonomous Strategist

Generated: 2026-03-29
Generator: specifier (spc-specifying-verticals)
Project: LeanOS Core
Source: autonomous-strategist.md (construction spec) + doc_2.md (expertise) + doc.md (downstream consumer) + knowledge/autonomous-strategy-generation.md (epistemic model)
Relationship: Decomposes autonomous-strategist.md Module 1 (AutonomousStrategist) into agent prompt + on-demand skills

---

## Task 1: Solution Hypothesis Gap

### The Problem

The autonomous-strategist.md construction spec defines four hypotheses: Problem, Segment, Value Proposition, Unit Economics. But the Sell & Grow chain (doc.md) needs concrete solution definition to produce Revenue Architecture -- specifically "activation design, signal taxonomy, pricing, demo formats." The VP hypothesis provides positioning ("For [target] who [problem], [product] is [category] that [differentiator]") but not solution definition (growth architecture, feature-to-problem mapping, MVP scope).

In the old system, section 09 (solution) was a separate canvas section handled by str-designing-solutions. It selected growth architecture (PLG/Network/Traditional), mapped features to problems, defined MVP scope, and designed growth loops.

### Analysis

Options considered:

1. **5th hypothesis (Solution).** Adds a full hypothesis block with claim, evidence, possibility space, kill condition. Problem: solutions are not hypotheses in the same way problems and segments are. "We will build X" is a design decision constrained by validated hypotheses, not a falsifiable claim about reality. A solution does not have a "kill condition" in the same sense -- it has adequacy criteria.

2. **Solution embedded in VP (expanded).** Merge solution details into the VP hypothesis. Problem: the VP is already complex with clause validation. Adding growth architecture, feature mapping, and MVP scope makes it a mega-section that conflates positioning (market-facing) with solution design (build-facing).

3. **Solution as a sub-document of the register.** A dedicated section within hypotheses.md that is not a hypothesis but a derived design artifact -- constrained by the four hypotheses, not independently falsifiable. This respects the epistemic model: the four hypotheses are about reality (what problem exists, for whom, why they would choose this, whether the economics work). The solution is about what to build given those realities.

4. **Solution as a separate artifact.** A file outside the register (strategy/solution.md) that the strategist also writes. Problem: splits the single-source-of-truth and the Sell & Grow interface becomes two files.

### Decision: Option 3 -- Solution Design Section in Register

The register gets a 5th section that is explicitly NOT a hypothesis. It is a derived design artifact with a different structure:

- No confidence state (it is a decision, not a claim about reality)
- No kill condition (it has adequacy criteria instead)
- Constrained by: all four hypotheses (if any hypothesis changes, solution must be re-evaluated)
- Contains: growth architecture selection, feature-to-problem mapping, MVP scope, growth loops
- Epistemic status: the selection of growth architecture from segment characteristics is T1/T2 (derivable from ACV, buyer type, time-to-value). The feature set is T2 (structural reasoning about what solves the problem). MVP scope decisions involve T3 judgment (what is "minimum" enough to test).

This gives Sell & Grow what it needs: Revenue Architecture can read growth architecture (PLG/Network/Traditional), feature set, and MVP scope to produce activation design, signal taxonomy, pricing alignment, and demo formats.

### Register Schema Addition

```
Product SolutionDesign = {
  growth_architecture: GrowthArchitecture,
  architecture_rationale: NonEmptyString,
  feature_map: List<FeatureMapping>,
  mvp_scope: MVPScope,
  growth_loops: List<GrowthLoop>,
  constraints_from_hypotheses: List<HypothesisConstraint>,
  adequacy_criteria: List<NonEmptyString>,
  last_updated: Date
}

Sum GrowthArchitecture = PLG | NETWORK | TRADITIONAL | HYBRID
  -- Selected based on ACV, buyer type, time-to-value, collaboration nature

Product FeatureMapping = {
  feature: NonEmptyString,
  solves_problem: NonEmptyString,
  job_dimension: JobDimension,
  priority: FeaturePriority,
  tier: EpistemicTier
}

Sum JobDimension = FUNCTIONAL | EMOTIONAL | SOCIAL

Sum FeaturePriority = MVP | POST_MVP | FUTURE

Product MVPScope = {
  included: List<String>,
  excluded_with_rationale: List<ExclusionEntry>,
  aha_moment: NonEmptyString,
  time_to_value_target: NonEmptyString
}

Product ExclusionEntry = {
  feature: NonEmptyString,
  why_excluded: NonEmptyString,
  when_to_add: NonEmptyString
}

Product GrowthLoop = {
  name: NonEmptyString,
  mechanism: NonEmptyString,
  requires: List<String>,
  tier: EpistemicTier
}

Product HypothesisConstraint = {
  from_hypothesis: HypothesisName,
  constraint: NonEmptyString,
  if_hypothesis_changes: NonEmptyString
}

Sum HypothesisName = PROBLEM | SEGMENT | VALUE_PROPOSITION | UNIT_ECONOMICS
```

### Register File Format Addition

After the four hypothesis sections and before the Destruction Log:

```markdown
---

## 5. Solution Design

*This is not a hypothesis. It is a design artifact derived from and constrained
by the four hypotheses above. If any hypothesis changes, re-evaluate this section.*

**Growth Architecture:** {PLG | Network | Traditional | Hybrid}

**Architecture Rationale:**
- ACV: {from unit economics} -> {implication for growth model}
- Buyer type: {from segment} -> {user=buyer or committee}
- Time-to-value: {from solution nature} -> {fast or slow}
- Collaboration: {inherent or optional} -> {network effects or not}
- Selection: {which architecture and why}

**Feature Map:**

| Feature | Solves Problem | Job Dimension | Priority | Tier |
|---------|---------------|---------------|----------|------|
| {feature} | {which problem from hypothesis 1} | {F/E/S} | {MVP/POST/FUTURE} | {T1/T2/T3} |

**MVP Scope:**
- Included: {features with MVP priority}
- Aha moment: {the single experience that demonstrates value}
- Time-to-value target: {how fast to first value}
- Excluded:
  - {feature} -- {why excluded} -- {when to add}

**Growth Loops:**
- {loop name}: {mechanism} (requires: {what}) [{T1|T2|T3}]

**Constraints from Hypotheses:**
| From | Constraint | If Hypothesis Changes |
|------|-----------|----------------------|
| Problem | {what the problem demands of the solution} | {what to re-evaluate} |
| Segment | {what the segment demands} | {what to re-evaluate} |
| VP | {what the VP promises the solution must deliver} | {what to re-evaluate} |
| Unit Economics | {what the economics require of the cost structure} | {what to re-evaluate} |

**Adequacy Criteria:**
- {criterion 1: specific, measurable}
- {criterion 2}

**Last Updated:** {YYYY-MM-DD}
```

### Sell & Grow Interface Update

The chain now reads:

| Chain Needs | Register Provides |
|------------|------------------|
| Validated problem | Problem hypothesis (claim + evidence + research sources) |
| Target segment | Segment hypothesis (claim + evidence + possibility space) |
| Value proposition | VP hypothesis (claim + jobs + clause validation table) |
| Unit economics | Unit Economics hypothesis (claim + mode thresholds + scenario analysis) |
| **Growth architecture** | **Solution Design (architecture + rationale)** |
| **Feature set + MVP scope** | **Solution Design (feature map + MVP scope + aha moment)** |
| **Growth loops** | **Solution Design (growth loops + mechanisms)** |

Revenue Architecture can now produce activation design (from growth architecture + aha moment), signal taxonomy (from feature map + growth loops), pricing alignment (from ACV in unit economics + growth architecture), and demo formats (from MVP scope + time-to-value target).

### Invariant Additions

```
invariants:
  - name: "solution_constrained_by_hypotheses"
    category: Consistency
    predicate: "solution_design.constraints_from_hypotheses references all four
                hypothesis names"
    enforcement: structural
    mechanism: "Agent must trace every hypothesis's constraint on the solution"

  - name: "mvp_features_solve_stated_problems"
    category: Referential
    predicate: "every feature in mvp_scope.included has a feature_map entry where
                solves_problem references a problem from the Problem hypothesis"
    enforcement: runtime_check
    mechanism: "No feature in MVP that does not trace to a validated problem"

  - name: "growth_architecture_matches_economics"
    category: Consistency
    predicate: "growth_architecture is consistent with ACV range in unit_economics
                (PLG requires ACV < $5K; Traditional requires ACV > $25K or committee buyer)"
    enforcement: runtime_check
    mechanism: "Agent checks architecture-ACV alignment during BUILD and CHALLENGE"

  - name: "aha_moment_is_specific"
    category: Completeness
    predicate: "mvp_scope.aha_moment describes a specific user experience, not a
                vague benefit statement"
    enforcement: runtime_check
    mechanism: "Agent challenges vague aha moments: 'see value' is not specific.
                'Generate a complete design system from 3 inputs in 90 seconds' is specific."
```

---

## Task 2: Old Skill and Agent Evaluation

### Old Agents

| Agent | Verdict | Rationale |
|-------|---------|-----------|
| **strategist** (prev/strategist.md) | **REPLACE** | Being replaced by autonomous strategist. Old agent was a canvas section builder that routed to 12 skills in fixed order. New agent is a hypothesis constructor with compression model and adversarial protocol. The fixed-order section building is gone. The dependency-aware reasoning is embedded in the agent prompt. |
| **researcher** (prev/researcher.md) | **ABSORB partially, DROP agent** | The researcher's WebSearch/WebFetch capabilities are now embedded in the strategist (tools list). The researcher's structured extraction patterns (rsh-extracting-insights, rsh-creating-playbooks) have genuine procedural depth -- these are ADAPT candidates as skills. The researcher as a separate agent is dissolved because the strategist now researches autonomously. However, the insight extraction and playbook creation procedures are worth preserving as skills the strategist can load when processing governor-provided sources. |
| **scout** (prev/scout.md) | **DROP** | The scout discovers external opportunities (accelerators, events, grants). This is valuable functionality but it operates on a different axis than strategy construction. It reads canvas sections that no longer exist (segments, problem, UVP as separate files). It writes to information/opportunities/ and information/signals/ -- paths that don't exist in the new system. The scout's function could be a future vertical but it does not belong in the strategist vertical. It would need its own spec if the governor wants opportunity intelligence. For now: drop. If needed later, spec separately. |

### Old Skills

| Skill | Verdict | Rationale |
|-------|---------|-----------|
| **str-sizing-markets** | **ADAPT** | Deep procedural knowledge: TAM/SAM/SOM calculation with top-down + bottom-up methods, filter types, market timing assessment. The compression model needs this during BUILD step 3 (research phase). Adapt to: epistemic tier labeling on all figures, range-based estimates, source citation requirements. |
| **str-segmenting-customers** | **ADAPT** | Observable filter methodology, pain intensity scoring, segment sizing. The compression model needs this during BUILD step 4b (segment hypothesis construction). Adapt to: compression format (enumerate candidates, score, eliminate), tier labeling, possibility space recording. |
| **str-scoring-problems** | **ADAPT** | Four-property scoring (frequency, severity, breadth, alternatives' inadequacy) with lookup tables. The compression model needs this during BUILD step 4a (problem hypothesis construction). Adapt to: compression format, tier labeling. Note: the four properties are already embedded in the agent prompt from doc_2.md, but the detailed scoring tables and evidence requirements have procedural depth worth preserving as a loadable skill. |
| **str-analyzing-competition** | **ADAPT** | Structured competitive mapping: direct competitors (web search strategy, data sources, profiling), indirect competitors (5-type taxonomy), positioning matrix. The compression model needs this during BUILD step 3c (competitive research). Adapt to: tier labeling on all competitive claims, red-team integration. |
| **str-positioning-value** | **ABSORB** | The VP formula and positioning strategy selection are already embedded in the agent prompt (doc_2.md expertise + VP testability structure). The old skill's main value -- For-Only-That formula, value equation, positioning strategy matrix -- is fully captured in the embedded expertise. The skill's procedure is too tightly coupled to the old canvas format (reads UVP canvas section, writes UVP + Unfair advantage sections). Drop as separate skill; the reasoning is embedded. |
| **str-designing-solutions** | **ADAPT** | Growth architecture selection matrix (PLG/Network/Traditional based on ACV, buyer type, TTV, collaboration, shareability), feature-to-problem mapping, MVP prioritization. This is exactly what Task 1 identified as missing. The procedural depth -- decision logic, feature prioritization framework, growth loop design -- warrants a skill. Adapt to: new Solution Design section format, compression model, tier labeling. |
| **str-designing-pricing** | **ADAPT** | Value-based pricing methodology (value anchor calculation, Van Westendorp sensitivity), tier architecture (Good-Better-Best), PLG tier design, upgrade triggers. The unit economics hypothesis needs this during BUILD step 4d. Adapt to: range-based estimates (not point estimates), tier labeling on WTP assumptions (always T3), mode-specific pricing guidance. |
| **str-calculating-economics** | **ADAPT** | LTV/CAC/payback formulas, benchmark validation tables, growth-model-specific metrics. The unit economics hypothesis needs this during BUILD step 4d. Adapt to: range-based calculations (optimistic/base/pessimistic), tier labeling on every input, scenario analysis format. |
| **str-structuring-costs** | **ABSORB** | Cost categorization (fixed: team/infra/software/ops; variable: hosting/payment/support/onboarding) and burn rate calculation are mechanical enough to embed in the economics skill rather than maintaining a separate skill. The cost structure is a sub-procedure of economics calculation, not a standalone capability. Merge into the adapted economics skill. |
| **str-extracting-assumptions** | **ABSORB** | Assumption extraction is now a core part of the adversarial protocol (destruction phase step 5a). The extraction taxonomy and risk scoring (impact x uncertainty) are embedded in the agent prompt. The old skill's per-section scanning approach doesn't apply -- the new system has four hypotheses, not 16 sections. The concept is fully absorbed into the destruction protocol. |
| **str-selecting-channels** | **ABSORB** | Channel selection by ACV range and segment type are lookup tables that the agent can apply inline during unit economics and solution design work. The tables from the old skill (ACV-channel viability, segment-channel matching, channel CAC formulas) should be embedded in the economics/pricing skill or the agent prompt. Not enough standalone procedural depth for a separate skill in the new system -- channels are an implication of segment + ACV, computed during economics work. |
| **str-planning-gtm** | **DROP** | GTM planning was the capstone canvas section (15.gtm.md) that assembled the full go-to-market from all prior sections. In the new system, the register does not produce a GTM plan -- it produces validated hypotheses + solution design that the Sell & Grow chain consumes to build GTM. The GTM function has moved downstream to the Sell & Grow chain. Keeping a GTM skill would duplicate the chain's responsibility. |
| **rsh-extracting-insights** | **ADAPT** | Structured extraction from expert sources (videos, podcasts, articles) into frameworks, principles, tactics, warnings. This serves a different function than the strategist's autonomous research -- it processes governor-provided sources (books, articles, expert content) into structured knowledge the strategist can consume. Adapt to: tier labeling on extracted claims, integration with hypothesis register (extracted insights become evidence items). |
| **rsh-researching-market** | **ABSORB** | Mode-calibrated market research (bootstrap vs venture focus areas). The strategist now does this autonomously during BUILD step 3. The bootstrap/venture mode distinction is embedded in the agent prompt. The focus areas (spend flows for bootstrap, TAM/growth for venture) are absorbed into the market sizing skill. Drop as separate skill. |
| **rsh-creating-playbooks** | **DROP** | Playbook creation (synthesizing insights into step-by-step guides) is a knowledge management function, not a strategy construction function. The strategist does not produce playbooks -- it produces a hypothesis register. If playbook creation is needed, it belongs in a different vertical (knowledge management). |
| **sct-discovering-opportunities** | **DROP** | Scout function. Does not belong in strategist vertical. See scout agent evaluation above. |
| **sct-assessing-fit** | **DROP** | Scout function. Same rationale. |

### Reuse Summary

| Verdict | Count | Skills |
|---------|-------|--------|
| **ADAPT** | 7 | str-sizing-markets, str-segmenting-customers, str-scoring-problems, str-analyzing-competition, str-designing-solutions, str-designing-pricing, str-calculating-economics + str-structuring-costs (merged), rsh-extracting-insights |
| **ABSORB** | 5 | str-positioning-value, str-extracting-assumptions, str-selecting-channels, str-structuring-costs (into economics), rsh-researching-market |
| **DROP** | 4 | str-planning-gtm, rsh-creating-playbooks, sct-discovering-opportunities, sct-assessing-fit |

---

## Task 3: Full Vertical Decomposition

### Vertical Summary

One vertical. One agent. Seven skills.

The autonomous strategist is a single functional vertical -- it constructs, challenges, and maintains the hypothesis register. It does not decompose into multiple verticals because all its work writes to a single artifact (strategy/hypotheses.md) and follows a single protocol (compression + adversarial challenge).

| Vertical | Agent | Skills | Model | Purity |
|----------|-------|--------|-------|--------|
| Strategy Construction | strategist | 7 | opus | effectful (WebSearch/WebFetch) |

### Dependency Graph

```
(no dependencies -- single vertical, governor-directed)
```

### Peer Review Routing

Single vertical. No peer reviewer available within the system. The adversarial self-challenge protocol (destruction phase) serves as the internal review mechanism. The governor serves as external reviewer via escalation responses.

| Producer | Reviewer | Rationale |
|----------|----------|-----------|
| strategist | strategist (destruction phase) | Structural separation via adversarial framing -- construction under one frame, destruction under a different frame |
| strategist | governor (escalation) | Values decisions, ground-truth gaps, judgment calls |

---

## Vertical: Strategy Construction

### Agent: strategist

```
name: strategist
description: >
  Autonomous strategy builder. Constructs business strategy from governor
  input using public research, structural reasoning, compression model,
  and adversarial self-challenge. Writes a hypothesis register with
  earned confidence states and epistemic tier labels.
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
escalates-to: governor (via execution/queue/)
maxTurns: 50
```

#### What Goes in the Agent Prompt vs. Skills

The agent prompt is the identity + reasoning substrate. Skills are domain procedures loaded on demand.

**EMBEDDED IN AGENT PROMPT (always loaded):**

1. **Identity.** Compression model framing ("you start from the full possibility space and systematically eliminate"), deliverable definition (hypothesis register with earned confidence).

2. **Three-tier epistemic model.** Full T1/T2/T3 definitions with operational test ("what new data would change my mind?"). This is the agent's core reasoning discipline -- it must be available on every invocation, not loaded on demand.

3. **Modes.** BUILD / CHALLENGE / REVIEW with high-level procedure outlines. The agent prompt contains the workflow sequence (research -> construct -> destroy -> integrate). Skills contain the deep procedures for each domain within those phases.

4. **Governor protocol.** Decision type classification (VALUES / INFORMATION / GROUND_TRUTH / JUDGMENT), escalation bright lines, escalation quality standard, escalation file format. This is always needed -- every invocation may encounter an escalation boundary.

5. **Self-challenge protocol.** The four destruction mechanisms (assumption extraction, pre-mortem, red-team, constraint inversion). These are invoked on every BUILD and CHALLENGE pass. They are protocol, not domain procedure.

6. **Failure mode awareness.** Six autonomous failure modes (narrative coherence, anchoring, sophistication bias, evidence recycling, premature precision, governor atrophy) + four overconfidence markers (precision without basis, causal language for correlations, disappearing uncertainty, missing base rates). These are self-monitoring instructions that must be active on every invocation.

7. **Technical founder failure patterns.** Five patterns from doc_2.md (building as validation, architecture as moat, feature completeness before launch, undervaluing non-technical work, single-player assumption). Active scanning instructions.

8. **Behavioral science awareness.** Confirmation bias and sunk cost warnings from doc.md. Brief -- two paragraphs.

9. **Evidence vs framework distinction.** "Frameworks organize evidence -- they are not substitutes for evidence." One paragraph.

10. **Register schema reference.** The agent needs to know the register format to write it correctly. Embedded as a structural reference, not as a procedure.

11. **Sell & Grow interface.** What the downstream chain needs and when it can proceed. Brief section.

**EXTRACTED INTO SKILLS (loaded on demand during BUILD/CHALLENGE):**

Domain procedures with enough procedural depth that embedding them all would exceed useful prompt length and dilute the core reasoning. Each skill contains:
- Specific methodology (scoring tables, calculation formulas, decision matrices)
- Domain-specific search strategies
- Quality criteria for domain outputs
- Failure modes specific to that domain

The agent prompt references skills by name and loads them at the appropriate BUILD step. The prompt says "load and follow stg-sizing-markets" -- it does not contain the TAM/SAM/SOM calculation methodology inline.

#### PREREQUISITES

```
prerequisites:
  - condition: "Governor input exists (either in conversation context or in a prior
                hypotheses.md with extension request)"
    gate: governor_input_present
    on_fail: "Ask governor: What problem space are you exploring? What can you build?
              What constraints exist (bootstrap/venture, timeline, resources)?"

  - condition: "strategy/ directory exists"
    gate: directory_exists
    on_fail: create

  - condition: "execution/queue/ directory exists"
    gate: directory_exists
    on_fail: create
```

#### WORKFLOW

```
workflow:
  routing:
    | Signal | Mode |
    |--------|------|
    | "build", "start", "create strategy", no existing register | BUILD |
    | Default (register exists) | CHALLENGE |
    | "review", "ready for sell & grow", "readiness check" | REVIEW |
    | Register exists + governor says "start over" | BUILD (with confirmation) |

  BUILD:
    phase_1: research
      action: "Autonomous research using WebSearch/WebFetch"
      skills_invoked:
        - stg-sizing-markets (market opportunity research)
        - stg-analyzing-competition (competitive landscape mapping)
      gate: "Research notes exist for: market size, competitive landscape,
             segment signals, channel benchmarks. Each note has tier labels."
      on_fail: "Report which research areas have insufficient data. Proceed
                with available data, noting gaps as T3 assumptions."

    phase_2: construction
      action: "Compress possibility space into hypotheses"
      skills_invoked:
        - stg-scoring-problems (problem hypothesis construction)
        - stg-segmenting-customers (segment hypothesis construction)
        - stg-designing-pricing (unit economics -- pricing inputs)
        - stg-calculating-economics (unit economics -- LTV/CAC/payback)
        - stg-designing-solutions (solution design section)
      gate: "All four hypotheses written with: claim, evidence (tier-labeled),
             assumptions, kill condition, possibility space with >= 2 candidates
             considered. Solution design section written with growth architecture,
             feature map, MVP scope."
      on_fail: "If a hypothesis cannot be constructed (insufficient research),
                mark as UNVALIDATED with explicit gap statement. Do not fabricate."

    phase_3: destruction
      action: "Adversarial self-challenge (embedded protocol, no skill needed)"
      gate: "Destruction log written with: pre-mortem, red-team response,
             constraint inversions for all load-bearing assumptions,
             evidence concentration risk check."
      on_fail: "If destruction phase finds a hypothesis should be BROKEN,
                mark it and report. If destruction is inconclusive, note
                which mechanisms were applied and what they found."

    phase_4: integration
      action: "Revise hypotheses based on destruction findings. Set confidence
               states. Write escalations if boundaries hit."
      gate: "Register written to strategy/hypotheses.md. All escalations
             written to execution/queue/. Governor report produced."
      on_fail: "Write partial register with explicit incomplete markers.
                Report what is done and what is blocked."

  CHALLENGE:
    phase_1: fresh_research
      action: "WebSearch for new data since last review"
      skills_invoked: (same research skills as BUILD, scoped to updates)
      gate: "New data noted or 'no significant changes' documented"
      on_fail: "Proceed with existing evidence base"

    phase_2: evidence_review
      action: "Test evidence quality, tier labels, overconfidence markers"
      gate: "Each hypothesis reviewed with findings documented"
      on_fail: "Report which hypotheses could not be reviewed and why"

    phase_3: destruction
      action: "Run destruction protocol on hypotheses with changed evidence"
      gate: "Destruction findings documented for changed hypotheses"
      on_fail: "Same as BUILD phase 3"

    phase_4: update
      action: "Update confidence states, revise claims if warranted, write escalations"
      gate: "Updated register written. Changes documented with rationale."
      on_fail: "Write partial update with explicit change log"

  REVIEW:
    phase_1: full_challenge
      action: "Run complete CHALLENGE pass"
      gate: "CHALLENGE phases 1-4 complete"

    phase_2: cross_hypothesis_consistency
      action: "Check: segment characteristics consistent between problem and VP?
               Unit economics consistent with growth architecture? Assumptions
               from one hypothesis contradicted by evidence in another?"
      gate: "Consistency findings documented"
      on_fail: "Report inconsistencies found"

    phase_3: too_clean_check
      action: "If all hypotheses align without tension, flag warning"
      gate: "Tension check documented"

    phase_4: sell_grow_readiness
      action: "Check: all four hypotheses SUPPORTED? Solution design adequate
               for Revenue Architecture consumption?"
      gate: "Readiness status reported with specific gaps if not ready"
```

#### CONSTRAINTS

```
constraints:
  - "Do not set confidence = SUPPORTED without ground-truth evidence
     (CONVERSATION or DATA at T1). RESEARCHED is the ceiling for
     autonomous research."
  - "Do not skip the destruction phase. Every BUILD and CHALLENGE
     must run at least assumption extraction and one other mechanism."
  - "Do not write point estimates for economics. Always ranges with
     tier labels and source citations."
  - "Do not fabricate market data, segment sizes, competitive positions,
     or customer behavior. Every claim traces to a source or is labeled
     as T2/T3 hypothesis."
  - "Do not make values decisions (mode selection, tradeoff preferences).
     Escalate always."
  - "Do not proceed past a load-bearing T3 assumption with HIGH blast
     radius without escalation."
  - "Skills are loaded on demand via Read tool. Do not attempt to execute
     a skill procedure from memory -- load the SKILL.md file and follow it."
```

#### ERROR HANDLING

```
error_handling:
  | Condition | Recovery |
  |-----------|----------|
  | Governor input insufficient | Escalate with specific questions. Do not guess. |
  | WebSearch returns no results for a research area | Note gap. Use alternative search strategies. If still nothing, mark dependent claims as T3. |
  | Hypothesis construction produces only 1 candidate | Violation of compression model. Actively search for at least 1 alternative before proceeding. |
  | Destruction phase breaks all hypotheses | Report to governor. This is useful information -- the strategy space may not support a viable business. Do not reconstruct to avoid the finding. |
  | Escalation queue has unresolved items from prior run | Read and integrate responses. If no response yet, report waiting status. Do not re-escalate the same item. |
  | Register file corrupted or malformed | Reconstruct from last known good state if version control available. Otherwise, report and ask governor for direction. |
  | Skill file not found at expected path | Report which skill is missing. Proceed without it, applying embedded reasoning. Note reduced procedural depth in output. |
```

---

### Skills

All skills use prefix `stg-` (strategy). Skills are loaded by the agent during BUILD and CHALLENGE workflow phases via `Read .claude/skills/{skill-name}/SKILL.md`.

#### Skill Loading Map

| BUILD Phase | Step | Skills Loaded |
|-------------|------|---------------|
| Research (phase 1) | Market opportunity research | stg-sizing-markets |
| Research (phase 1) | Competitive landscape mapping | stg-analyzing-competition |
| Construction (phase 2) | Problem hypothesis | stg-scoring-problems |
| Construction (phase 2) | Segment hypothesis | stg-segmenting-customers |
| Construction (phase 2) | Unit economics -- pricing | stg-designing-pricing |
| Construction (phase 2) | Unit economics -- calculations | stg-calculating-economics |
| Construction (phase 2) | Solution design section | stg-designing-solutions |
| Destruction (phase 3) | (no skills -- embedded protocol) | -- |
| Integration (phase 4) | (no skills -- register writing) | -- |

| CHALLENGE Phase | Step | Skills Loaded |
|-----------------|------|---------------|
| Fresh research (phase 1) | Scoped market/competition updates | stg-sizing-markets, stg-analyzing-competition (if market data is stale) |
| Evidence review (phase 2) | (no skills -- embedded protocol) | -- |
| Destruction (phase 3) | (no skills -- embedded protocol) | -- |
| Update (phase 4) | (no skills -- register writing) | -- |

| On-Demand (any mode) | Trigger | Skill Loaded |
|----------------------|---------|--------------|
| Governor provides expert source for processing | "Process this source" | stg-extracting-insights |

---

#### stg-sizing-markets

```
function: Calculate market opportunity with TAM/SAM/SOM and timing analysis.
invoked_by: strategist
invoked_when: BUILD phase 1 (research) or CHALLENGE phase 1 (fresh research)
adapted_from: str-sizing-markets (old system)

INPUTS:
  - Business mode (VENTURE/BOOTSTRAP/HYBRID) from governor input or register metadata
  - Constraints from governor input (budget, team, timeline)
  - Problem space description from governor input

OUTPUTS:
  - Market sizing notes with tier-labeled figures
  - Written as research evidence within the register's Problem and Segment hypotheses

ADAPTATIONS FROM OLD SKILL:
  - All figures carry epistemic tier labels (TAM from reports = T1, SAM filters = T2,
    SOM projections = T2-T3)
  - Range-based estimates, not point estimates
  - Source citation on every figure with date accessed
  - Mode-specific thresholds embedded (VENTURE needs TAM >$1B; BOOTSTRAP can target
    smaller niches but SOM * ARPU must exceed operating costs)
  - Output feeds hypothesis register, not canvas section

PROCEDURE:
  1. Load context
     reads: governor input (mode, constraints, problem space)
     produces: research parameters (industry, geography, segment filters)

  2. Calculate TAM using BOTH methods
     reads: research parameters
     action: WebSearch for industry reports (Gartner, Forrester, IBISWorld, Statista).
             Top-down: industry size x relevant segment %.
             Bottom-up: total potential customers x average revenue per customer.
             If methods differ >50%, investigate and report both with reconciliation.
     produces: TAM range [low, high] with sources, each figure labeled T1 or T2

  3. Calculate SAM
     reads: TAM range, segment filters
     action: Apply geographic, segment, technical, vertical filters to TAM.
             Each filter documented with rationale and reduction percentage.
     produces: SAM range with filter chain documented, labeled T2

  4. Calculate SOM
     reads: SAM range, constraints (resources, timeline)
     action: Estimate realistically capturable market in 12-24 months given
             current resources. SOM = SAM x realistic capture rate.
             Capture rate justified by analogous companies or channel benchmarks.
     produces: SOM range, labeled T2-T3 (capture rate is hypothesis)

  5. Assess market timing
     reads: industry data from step 2
     action: Evaluate timing signals -- technology readiness, regulatory shifts,
             behavioral changes, competitive density. Score: early, right time,
             late, too late.
     produces: timing assessment with evidence, labeled T2

  6. Mode-specific validation
     reads: all calculations, business mode
     action: VENTURE -- is TAM >$1B? Is growth rate >15%? Is timing right?
             BOOTSTRAP -- is SOM * estimated ARPU > operating costs within 6 months?
             Flag violations.
     produces: mode validation result with specific concerns if any

QUALITY_CRITERIA:
  - TAM calculated using both top-down and bottom-up methods
  - Every figure cites a specific source with date (not "industry reports say")
  - All figures presented as ranges, not points
  - Every figure carries a tier label (T1/T2/T3)
  - SAM filters are enumerated with individual reduction ratios
  - SOM capture rate is justified (not asserted)
  - Mode-specific threshold check is explicit (pass/fail with numbers)

FAILURE_MODES:
  - mode: "Fabricated market size"
    signal: "Figure has no source citation or cites a source that cannot be verified"
    recovery: "Remove figure. Replace with 'insufficient data -- requires [specific search]'
               or widen search terms"

  - mode: "False precision"
    signal: "TAM stated as single number ($2.3B) rather than range"
    recovery: "Convert to range. If only one source, range = source figure +/- 20%.
               If multiple sources, range = min to max of sources."

  - mode: "SAM = TAM (no real filtering)"
    signal: "SAM reduction is <20% of TAM without extraordinary justification"
    recovery: "Review filters. At minimum: geographic, segment, and technical
               filters should apply. If genuinely broad, document why."

  - mode: "SOM wishful thinking"
    signal: "SOM capture rate >5% of SAM in first year without evidence of
             existing traction or analogous precedent"
    recovery: "Justify or reduce. Most startups capture <1% of SAM in year 1."
```

---

#### stg-segmenting-customers

```
function: Generate strategic customer segment definitions with observable
          filters, pain scoring, and compression-model elimination.
invoked_by: strategist
invoked_when: BUILD phase 2 (construction -- segment hypothesis)
adapted_from: str-segmenting-customers (old system)

INPUTS:
  - Market sizing notes from stg-sizing-markets (TAM/SAM/SOM)
  - Problem space description from governor input
  - Research signals from BUILD phase 1

OUTPUTS:
  - Segment hypothesis in register format: claim, evidence, possibility space
    (candidates considered, eliminated, alternatives carried), assumptions, kill condition

ADAPTATIONS FROM OLD SKILL:
  - Compression model: enumerate 3-5 candidate segments, score each, eliminate
    weak candidates, carry at least 1 alternative
  - Observable filters required (reject psychographic filters)
  - Pain intensity scoring with evidence tier labels
  - Possibility space recorded (what was considered and why eliminated)
  - Output is a hypothesis with kill condition, not a canvas section

PROCEDURE:
  1. Load context
     reads: market sizing notes, governor input, research signals
     produces: segment generation parameters

  2. Enumerate candidate segments (minimum 3)
     reads: market data, problem space, research signals
     action: From market research, identify 3-5 potential customer groups.
             For each: who they are (role, company type), why they might
             have the problem, rough size from TAM/SAM data.
             WebSearch for segment-specific signals if needed.
     produces: candidate segment list with initial evidence

  3. Define observable filters for each candidate
     reads: candidate list
     action: For each segment, identify 2-4 searchable criteria.
             VALID: company size, industry (NAICS), technology used,
             geography, behavioral signals (job postings, tool usage).
             INVALID (reject): "innovative companies", "growth-minded founders",
             any psychographic or subjective filter.
     produces: filtered candidate list (candidates with only invalid filters
               are weakened but not eliminated -- flag for governor input)

  4. Score pain intensity for each candidate
     reads: filtered candidates, research signals
     action: For each segment, assess pain signal strength from public data:
             5 = hair-on-fire, actively buying solutions (evidence: G2 reviews,
                 competitor traction, job postings for manual workaround roles)
             4 = recognized pain, some buying (evidence: forum complaints,
                 budget line items, partial solutions adopted)
             3 = latent pain, workarounds common (evidence: DIY tools,
                 spreadsheet solutions, occasional complaints)
             2 = mild inconvenience (evidence: mentioned but not prioritized)
             1 = unaware or accepting (evidence: no public signal)
             Every score requires cited evidence. No score without signal.
     produces: scored candidate list, each score with evidence and tier label

  5. Eliminate weak candidates (compression)
     reads: scored candidates
     action: Eliminate candidates that fail on 2+ of:
             - Pain score < 3
             - Observable filters are insufficient (cannot find them)
             - Market size too small (segment * estimated ARPU < operating costs)
             - No public signal of the problem in this segment
             Record elimination rationale with evidence.
     produces: surviving segments + elimination log

  6. Select primary and carry alternatives
     reads: surviving segments
     action: Primary = highest pain score with adequate market size.
             If two segments tie, carry both and flag as governor decision.
             At least 1 alternative must survive (if all but one eliminated,
             note the closest eliminated candidate as "weak alternative").
     produces: segment hypothesis with possibility space

  7. Write hypothesis
     reads: primary segment, alternatives, elimination log
     action: Write claim (one paragraph: who has this problem acutely,
             observable characteristics). Write evidence (tier-labeled).
             Write possibility space (considered, eliminated, alternatives).
             Write assumptions (what must be true about this segment).
             Write kill condition (what would prove this is the wrong segment).
     produces: complete segment hypothesis in register format

QUALITY_CRITERIA:
  - Minimum 3 candidate segments considered (possibility space recorded)
  - At least 1 alternative carried (not just the winner)
  - Every segment defined by observable, searchable filters (no psychographics)
  - Pain scores backed by cited evidence with tier labels
  - Elimination rationale documented for every eliminated candidate
  - Kill condition is specific and observable (not "segment doesn't work")
  - Claim uses behavioral language, not demographic generalization

FAILURE_MODES:
  - mode: "Single-player assumption"
    signal: "Primary segment matches governor's own profile exactly"
    recovery: "Flag to governor: 'You may be designing for yourself. Is this
               segment defined by your characteristics or by market evidence?'
               Carry an alternative that explicitly differs from governor profile."

  - mode: "Psychographic filters masquerading as observable"
    signal: "Filters include 'tech-savvy', 'growth-oriented', 'innovative'"
    recovery: "Replace with observable proxies: 'tech-savvy' -> 'uses [specific tools]';
               'growth-oriented' -> 'raised funding in last 12 months' or
               'headcount grew >20% YoY'"

  - mode: "Pain score without evidence"
    signal: "Score assigned but evidence field is empty or says 'likely' / 'probably'"
    recovery: "WebSearch for specific signals. If no signals found, score = 1 (unaware)
               with note: 'no public signal found -- T3 assumption'"

  - mode: "Anchoring on first segment"
    signal: "First segment listed gets highest score; alternatives feel perfunctory"
    recovery: "Re-score with the second segment as the assumed primary.
               Does the scoring change? If not, anchoring is not the issue.
               If yes, the scores are framing-dependent -- carry both."
```

---

#### stg-scoring-problems

```
function: Score problem candidates using four-property framework (frequency,
          severity, breadth, alternatives' inadequacy) with compression-model elimination.
invoked_by: strategist
invoked_when: BUILD phase 2 (construction -- problem hypothesis)
adapted_from: str-scoring-problems (old system)

INPUTS:
  - Segment hypothesis (or candidates if segment not yet finalized)
  - Governor's problem space description
  - Research signals from BUILD phase 1

OUTPUTS:
  - Problem hypothesis in register format: claim, evidence, possibility space,
    assumptions, kill condition

ADAPTATIONS FROM OLD SKILL:
  - Compression model: enumerate 5-7 candidate problems, score, eliminate on 2+ failures
  - Four-property scoring carries tier labels per property
  - Existing alternatives analysis integrated (not separate competitive step)
  - Output is a hypothesis, not a canvas section

PROCEDURE:
  1. Load context
     reads: segment hypothesis/candidates, governor input, research signals
     produces: problem generation parameters anchored to segment

  2. Enumerate candidate problems (minimum 5)
     reads: segment context, governor's problem description, research signals
     action: For the target segment, identify 5-7 candidate problems.
             Sources: governor input (what they believe the problem is),
             public signals (forums, reviews, job postings, support tickets),
             competitive analysis (what alternatives solve -- implies the problem),
             adjacent segment patterns.
             WebSearch for segment-specific pain signals.
     produces: candidate problem list

  3. Score each problem on four properties
     reads: candidate list
     action: For each problem, score:

     Frequency (1-5): 5=multiple times daily, 4=daily, 3=weekly, 2=monthly, 1=rarely
       Tier: T1 if frequency observable from workflow analysis; T2 if inferred
       Evidence: cite specific signal (job descriptions mentioning task, forum post frequency)

     Severity (1-5): 5=business stops, 4=significant loss, 3=notable pain, 2=mild, 1=trivial
       Tier: T2 from public signals; T3 for actual pain intensity
       Evidence: quantified cost (time, money, risk) if available; qualitative signal if not

     Breadth (1-5): 5=>1M potential buyers, 4=100K-1M, 3=10K-100K, 2=1K-10K, 1=<1K
       Tier: T1 if from market sizing; T2 if estimated
       Evidence: cross-reference with segment size from stg-segmenting-customers

     Alternatives' Inadequacy (1-5): 5=no alternatives, 4=poor alternatives,
       3=adequate but painful, 2=good alternatives exist, 1=well-served
       Tier: T1 for observable alternative landscape; T2 for inadequacy assessment
       Evidence: cite specific alternatives and their gaps

     Composite = Frequency x Severity x Breadth x Alternatives_Inadequacy
       (max 625, useful for ranking, not absolute)
     produces: scored problem matrix with per-property tier labels

  4. Eliminate weak candidates (compression)
     reads: scored matrix
     action: Eliminate problems that score 1-2 on 2+ properties.
             Record elimination rationale. If governor's stated problem
             is eliminated, flag explicitly -- do not silently drop it.
     produces: surviving problems + elimination log

  5. Write hypothesis
     reads: surviving problems, scores, elimination log
     action: Primary = highest composite score. Claim states the problem
             independent of any solution. Evidence is tier-labeled.
             Kill condition: what would prove this problem is not worth solving?
             (e.g., "interviews reveal <2/5 people in the segment experience this
             problem weekly" or "existing alternative achieves >80% satisfaction")
     produces: complete problem hypothesis in register format

QUALITY_CRITERIA:
  - Minimum 5 candidate problems enumerated
  - Each problem scored on all four properties with tier labels
  - Every score cites specific evidence (not "likely high frequency")
  - Governor's stated problem is evaluated honestly (not auto-promoted)
  - Composite score used for ranking, not as false-precision metric
  - Kill condition references specific observable thresholds
  - Problem statement is independent of solution ("customers struggle with X"
    not "customers need a tool that does Y")

FAILURE_MODES:
  - mode: "Solution-shaped problem"
    signal: "Problem statement includes solution language ('need a tool', 'need a platform')"
    recovery: "Rewrite as pain: 'teams spend 40 hours building design systems'
               not 'teams need an automated design system generator'"

  - mode: "Governor's problem auto-promoted"
    signal: "Governor's stated problem has highest score despite weak evidence"
    recovery: "Explicitly compare evidence quality between governor's problem
               and alternatives. If governor's problem has weaker evidence but higher
               score, flag: 'Your stated problem scored highest but evidence is thinner
               than alternative X. This may be confirmation bias.'"

  - mode: "All problems score similarly"
    signal: "Top 3 problems within 20% of each other"
    recovery: "This is useful information, not a failure. Carry all 3 as
               alternatives. Recommend governor input to distinguish."
```

---

#### stg-analyzing-competition

```
function: Map competitive landscape, identify positioning gaps, and assess
          competitor response capability.
invoked_by: strategist
invoked_when: BUILD phase 1 (research) and destruction phase (red-team input)
adapted_from: str-analyzing-competition (old system)

INPUTS:
  - Problem hypothesis (or candidates)
  - Segment hypothesis (or candidates)
  - Governor's problem space description

OUTPUTS:
  - Competitive landscape notes used as evidence across multiple hypotheses
  - Red-team intelligence used in destruction phase

ADAPTATIONS FROM OLD SKILL:
  - All competitive claims carry tier labels (features from website = T1,
    strategy inferred from hiring patterns = T2)
  - Red-team perspective integrated (not just mapping but "how would they respond?")
  - Output feeds hypothesis evidence, not a standalone canvas section
  - Evidence provenance tracking (same competitive data used across hypotheses
    is flagged as concentration risk)

PROCEDURE:
  1. Build competitive frame
     reads: problem candidates, segment candidates
     action: Define competitive frame from problem + segment intersection.
             Competition is framed by what problems you solve for whom,
             not by technology similarity.
     produces: competitive frame definition

  2. Identify direct competitors
     reads: competitive frame
     action: WebSearch for companies solving the same problem for the same
             segment. Search strategies: "[Problem] software",
             "[Problem] solution for [segment]", "Alternative to [known competitor]".
             Data sources: G2, Capterra, Product Hunt, Crunchbase, company websites.
             For each: positioning (headline/tagline), target segment, pricing model,
             key differentiators. All claims cite source. [T1]
     produces: direct competitor profiles

  3. Identify indirect competitors
     reads: competitive frame
     action: Classify alternatives into types:
             - Manual process (spreadsheets, email, paper)
             - Adjacent product (feature in larger platform)
             - Service provider (consultants, agencies)
             - DIY solution (internal tools, scripts)
             - Status quo (do nothing)
             For each: how used, why inadequate. [T1 for existence, T2 for inadequacy]
     produces: indirect competitor map

  4. Build positioning matrix
     reads: direct competitors, problem candidates
     action: For each direct competitor, map: which problems they address,
             which segments they target, price range, strength, weakness.
             Identify gaps: problems unaddressed, segments underserved, price
             points uncovered.
     produces: positioning matrix with gap analysis [T1 for observable, T2 for gaps]

  5. Assess competitor response capability (red-team input)
     reads: top 2-3 direct competitors
     action: For each, assess: resource level (funding, team size -- from
             Crunchbase/LinkedIn), product velocity (feature release frequency
             -- from changelogs, Product Hunt), strategic focus (from hiring
             patterns, blog posts, conference talks). This feeds the destruction
             phase red-team mechanism.
     produces: competitor response profiles [T2 -- inferred from public signals]

QUALITY_CRITERIA:
  - Minimum 3 direct competitors identified (or documented that fewer exist with evidence)
  - All 5 indirect competitor types evaluated (even if "not applicable" for some)
  - Every competitor claim cites a specific source with URL
  - Positioning matrix identifies at least 1 gap (or documents "no gaps found -- market is saturated" as a finding)
  - Competitor response profiles include resource level, product velocity, and strategic focus
  - Tier labels on every claim (T1 for observable facts, T2 for inferred strategy)

FAILURE_MODES:
  - mode: "Fabricated competitors"
    signal: "Competitor names that return no results on WebSearch"
    recovery: "Remove. Only include verifiable competitors."

  - mode: "Straw man competitors"
    signal: "All competitors described as weak, slow, or poorly positioned"
    recovery: "Re-evaluate with adversarial frame: 'What would a smart investor
               see as the incumbent advantage?' Report competitor strengths honestly."

  - mode: "Missing the real competition"
    signal: "Competitor list is only direct SaaS competitors; status quo and
             manual processes ignored"
    recovery: "The most common 'competitor' is doing nothing or using spreadsheets.
               Always evaluate status quo and DIY alternatives."
```

---

#### stg-designing-pricing

```
function: Develop pricing hypothesis using value-based methodology, tier
          architecture, and mode-specific constraints.
invoked_by: strategist
invoked_when: BUILD phase 2 (construction -- unit economics hypothesis, pricing inputs)
adapted_from: str-designing-pricing (old system)

INPUTS:
  - Problem hypothesis (quantified cost for value anchor)
  - Segment hypothesis (buyer characteristics for tier design)
  - Solution design (growth architecture for pricing alignment)
  - Business mode (VENTURE/BOOTSTRAP)
  - Competitive pricing data from stg-analyzing-competition

OUTPUTS:
  - Pricing inputs for unit economics hypothesis: revenue model, price range,
    tier structure, upgrade triggers

ADAPTATIONS FROM OLD SKILL:
  - All WTP estimates are T3 (always -- willingness to pay requires ground truth)
  - Value anchor calculation uses ranges from problem severity (not point estimates)
  - Competitive pricing is T1 (observable); pricing gap analysis is T2
  - Channel economics table from old str-selecting-channels absorbed here
    (ACV determines viable channels, which constrains pricing decisions)

PROCEDURE:
  1. Calculate value anchor
     reads: problem hypothesis (quantified cost)
     action: Value = problem cost * % resolved by solution.
             Price ceiling = value * capture rate (10-25% for SaaS).
             Present as range. Label: value anchor is T2 (derived from
             problem cost estimate which may itself be T2).
     produces: value anchor range [T2]

  2. Analyze competitive pricing
     reads: competitor profiles from stg-analyzing-competition
     action: Map competitor pricing: tiers, price points, packaging.
             Identify price gaps (underserved price ranges).
     produces: competitive pricing map [T1] + gap analysis [T2]

  3. Select revenue model
     reads: growth architecture, business mode
     action: Match revenue model to growth architecture:
             PLG -> freemium or usage-based with paid conversion
             Network -> free tier with network-gated premium
             Traditional -> subscription (monthly/annual)
             Hybrid -> base subscription + usage overage
             Mode overlay: BOOTSTRAP biases toward immediate revenue
             (no extended free tiers); VENTURE can sustain longer free periods.
     produces: revenue model selection with rationale

  4. Design tier architecture
     reads: revenue model, value anchor, competitive pricing, segment
     action: Apply Good-Better-Best framework:
             Good = entry point (free or low friction). Better = main revenue
             driver (2-3x Good). Best = price anchor (3-5x Better).
             60-70% should land on Better.
             For PLG: define free tier value + natural upgrade pressure points.
             Channel constraint check: ACV < $1K = near-zero-touch channels only.
             ACV $1K-$10K = light-touch. ACV > $10K = sales-assisted viable.
     produces: tier structure with price ranges [T2 for tiers, T3 for conversion rates]

  5. Define upgrade triggers
     reads: tier structure, growth architecture
     action: For each tier boundary, define what triggers upgrade:
             usage limits, feature gates, team expansion, time limits.
             Each trigger is a hypothesis -- conversion rate estimates are T3.
     produces: upgrade trigger list [T3 for effectiveness]

  6. Validate pricing-economics coherence
     reads: tier structure, mode thresholds
     action: Check: does the price range support required LTV:CAC?
             VENTURE: LTV:CAC > 3x, payback < 18mo.
             BOOTSTRAP: LTV:CAC > 5x, payback < 6mo.
             If pricing cannot meet thresholds, flag conflict.
     produces: coherence check result

QUALITY_CRITERIA:
  - Value anchor derived from quantified problem cost (not asserted)
  - Competitive pricing cites specific competitor price points with sources
  - Revenue model aligned with growth architecture (not arbitrary)
  - All WTP estimates labeled T3 with explicit note: "requires customer validation"
  - Price ranges, not point prices
  - Channel viability check performed (ACV vs channel type)
  - Mode-specific thresholds checked

FAILURE_MODES:
  - mode: "Pricing by competitor mimicry"
    signal: "Price set at competitor average without value-based justification"
    recovery: "Calculate value anchor first. Competitor pricing is context, not methodology."

  - mode: "WTP presented as known"
    signal: "Price stated without T3 label or 'customers will pay' language"
    recovery: "All WTP is T3 until sales data exists. Reframe as hypothesis."

  - mode: "Free tier too generous"
    signal: "Free tier delivers full core value with no natural upgrade pressure"
    recovery: "Identify the specific usage limit or feature gate that creates
               upgrade motivation. Free must deliver value but not full value."
```

---

#### stg-calculating-economics

```
function: Calculate unit economics (LTV, CAC, payback, margins) with range-based
          estimates and scenario analysis.
invoked_by: strategist
invoked_when: BUILD phase 2 (construction -- unit economics hypothesis)
adapted_from: str-calculating-economics + str-structuring-costs (merged)

INPUTS:
  - Pricing inputs from stg-designing-pricing (revenue model, price ranges, tiers)
  - Market sizing from stg-sizing-markets (SOM for revenue projections)
  - Competitive data from stg-analyzing-competition (benchmark reference)
  - Solution design (growth architecture for model-specific metrics)
  - Business mode (VENTURE/BOOTSTRAP)

OUTPUTS:
  - Unit economics hypothesis in register format: claim with LTV:CAC range,
    payback range, gross margin trajectory, scenario analysis

ADAPTATIONS FROM OLD SKILL:
  - Range-based calculations throughout (optimistic/base/pessimistic)
  - Every input carries tier label; output inherits highest (weakest) tier
  - Scenario analysis required (not optional)
  - Cost structure integrated (from old str-structuring-costs)
  - Growth-model-specific metrics included
  - Channel economics absorbed from old str-selecting-channels

PROCEDURE:
  1. Gather inputs with tier labels
     reads: pricing inputs, market sizing, competitive data, solution design
     action: Assemble input table:
             ARPU: from pricing tiers [T2 -- hypothesis]
             Gross margin: 80% default for SaaS, adjust for AI inference costs [T2]
             Churn rate: benchmark for category + ACV range [T2 -- no customer data]
             S&M spend: from cost structure estimate [T2]
             Growth model: from solution design [T1 -- a choice, not a prediction]
     produces: input table with tier labels and source citations

  2. Calculate core metrics as ranges
     reads: input table
     action:
       LTV = ARPU x Gross Margin x (1 / Monthly Churn Rate)
       Calculate for: optimistic inputs, base inputs, pessimistic inputs.
       CAC = (S&M Spend + Allocated Overhead) / New Customers Acquired
       Calculate for: optimistic, base, pessimistic.
       LTV:CAC = LTV / CAC (for each scenario)
       Payback = CAC / (ARPU x Gross Margin) (for each scenario)
       Label output tier = max(input tiers) -- if any input is T3, output is T3.
     produces: metric ranges across scenarios

  3. Calculate cost structure
     reads: solution design (features to build), growth architecture, constraints
     action: Fixed costs: team, infrastructure, software, operations.
             Variable costs (COGS): hosting/compute per user, payment processing,
             support per ticket, onboarding per customer.
             Gross margin = (revenue - COGS) / revenue.
             Burn rate = fixed costs + variable costs at current scale.
             Runway = available capital / monthly burn rate.
             If AI inference is part of delivery, model per-interaction cost explicitly.
     produces: cost structure with categories and monthly totals [T2]

  4. Validate against benchmarks
     reads: metric ranges
     action: Compare against benchmark thresholds:
             LTV:CAC: healthy >3:1, warning 2-3:1, critical <2:1
             Payback: healthy <12mo, warning 12-18mo, critical >18mo
             Gross margin: healthy >70%, warning 50-70%, critical <50%
             Monthly churn: healthy <5%, warning 5-10%, critical >10%
             Flag any metric in warning or critical range.
     produces: benchmark validation with flags

  5. Add growth-model-specific metrics
     reads: growth architecture from solution design
     action: PLG: signup->activation rate, free->paid conversion, PQL rate,
             expansion revenue %. Network: viral coefficient, invite rate,
             network density threshold. Traditional: sales cycle length,
             demo->close rate, AE productivity.
             All estimates are T2 (benchmarks) or T3 (predictions).
     produces: growth-specific metrics with tier labels

  6. Build scenario analysis
     reads: all metric ranges
     action: Optimistic: favorable assumptions resolve (CAC at low end, LTV at
             high end). Base: estimates as calculated. Pessimistic: CAC 3x
             estimate, segment 40% smaller, churn 2x benchmark. Kill: at
             what point do economics not work? (specific threshold values)
     produces: four scenarios in register format

  7. Mode-specific validation
     reads: scenarios, business mode
     action: VENTURE check: LTV:CAC > 3x in base scenario? Payback < 18mo?
             BOOTSTRAP check: LTV:CAC > 5x in base scenario? Payback < 6mo?
             Can reach profitability within runway?
             If base scenario fails mode thresholds, flag as critical finding.
     produces: mode validation result

  8. Write hypothesis
     reads: all calculations, scenarios, validations
     action: Claim: one paragraph stating revenue model, LTV:CAC range,
             payback range, gross margin trajectory. Evidence: all calculations
             with sources and tier labels. Assumptions: every input that is T2
             or T3 is an assumption. Kill condition: at what LTV:CAC ratio or
             payback period does this stop working? Possibility space: what
             alternative revenue models were considered and why eliminated.
     produces: complete unit economics hypothesis in register format

QUALITY_CRITERIA:
  - All calculations shown, not just results
  - Every input cites source and carries tier label
  - Three scenarios presented (optimistic, base, pessimistic) plus kill scenario
  - Gross margin accounts for AI inference costs if applicable
  - Mode-specific thresholds explicitly checked (pass/fail with numbers)
  - No point estimates -- ranges throughout
  - Cost structure broken into fixed and variable with category detail

FAILURE_MODES:
  - mode: "Premature precision"
    signal: "Specific CAC ($47.32) or LTV ($2,847) stated as if measured"
    recovery: "These are pre-launch estimates. Present as ranges: CAC $30-$80.
               Cite the benchmark or assumption behind each bound."

  - mode: "Optimistic-only scenario"
    signal: "Only base case presented, or pessimistic case is barely different from base"
    recovery: "Pessimistic must stress-test: 3x CAC, 40% smaller segment, 2x churn.
               If the strategy works only in the optimistic scenario, that is a finding."

  - mode: "Revenue without cost structure"
    signal: "LTV:CAC calculated but gross margin assumed at 80% without COGS analysis"
    recovery: "Calculate actual COGS. AI inference costs can push margins below 60%.
               If COGS are genuinely low, document why."

  - mode: "Disappearing uncertainty"
    signal: "T2 pricing estimate becomes T1 input to LTV calculation"
    recovery: "Output tier = max(input tiers). If ARPU is T2 and churn is T2,
               LTV is T2. If any input is T3, LTV is T3."
```

---

#### stg-designing-solutions

```
function: Design solution architecture, select growth model, map features to problems,
          and define MVP scope.
invoked_by: strategist
invoked_when: BUILD phase 2 (construction -- solution design section)
adapted_from: str-designing-solutions (old system)

INPUTS:
  - Problem hypothesis (what to solve, ranked by severity)
  - Segment hypothesis (buyer characteristics)
  - VP hypothesis (value to deliver, jobs addressed)
  - Business mode (VENTURE/BOOTSTRAP)
  - Competitive gap analysis from stg-analyzing-competition

OUTPUTS:
  - Solution Design section in register format (see Task 1 schema)

ADAPTATIONS FROM OLD SKILL:
  - Output is Solution Design section (not a hypothesis, not a canvas section)
  - Growth architecture selection matrix preserved but with tier labels
  - Feature-to-problem mapping uses JTBD three-dimension test
  - MVP scope includes "aha moment" definition
  - Constrained by all four hypotheses (constraints from hypotheses table)
  - Adequacy criteria replace kill condition

PROCEDURE:
  1. Load hypothesis context
     reads: problem, segment, VP, unit economics hypotheses
     action: Extract constraints each hypothesis places on the solution:
             Problem -> what must be solved (top problems by severity)
             Segment -> buyer type (user=buyer or committee), ACV range,
             time-to-value expectations
             VP -> what was promised (differentiator, unique capability)
             Unit Economics -> cost constraints (gross margin target, COGS limits)
     produces: hypothesis constraints table

  2. Select growth architecture
     reads: hypothesis constraints, competitive gaps
     action: Score buyer characteristics against decision matrix:
             ACV: >$25K -> Traditional; <$5K -> PLG or Network; between -> Hybrid
             Buyer type: committee -> Traditional; user=buyer -> PLG/Network
             Time-to-value: <1 day -> PLG/Network; weeks+ -> Traditional
             Collaboration: inherent -> Network; optional -> PLG
             Shareability: high -> Network; medium -> PLG
             Selection is T1/T2 (derivable from segment characteristics).
     produces: growth architecture selection with rationale [T1/T2]

  3. Map features to problems
     reads: problem hypothesis (top problems), VP hypothesis (jobs addressed)
     action: For each top problem, identify features that solve it.
             For each feature, classify: functional/emotional/social job dimension.
             Flag if all features are functional-only (technical founder pattern).
             Prioritize: MVP (minimum for aha moment), POST_MVP (important but
             not for first value), FUTURE (nice to have or expansion).
     produces: feature map with job dimensions and priorities [T2]

  4. Define MVP scope
     reads: feature map, growth architecture
     action: MVP = minimum set that delivers the aha moment.
             Define aha moment: the specific experience where the user says
             "this solves my problem." Must be concrete ("generate a complete
             design system from 3 inputs in 90 seconds"), not vague
             ("see value in the product").
             Time-to-value target: how fast from first use to aha moment.
             For PLG: must be < 1 day. For Traditional: must be < first sales call.
             Excluded features: list each with why excluded and when to add.
             Mode overlay: BOOTSTRAP -> smallest possible MVP for fastest revenue.
             VENTURE -> MVP can be slightly larger if it enables growth loop.
     produces: MVP scope with aha moment and time-to-value [T2 for scope, T3 for timing]

  5. Design growth loops
     reads: growth architecture, feature map, segment
     action: For selected architecture, define growth mechanisms:
             PLG: product usage -> sharing -> new signups -> more usage
             Network: user joins -> invites others -> network value increases
             Traditional: sales close -> implementation success -> referral
             Each loop: mechanism, what it requires (features, scale), tier label.
     produces: growth loop definitions [T2]

  6. Write solution design section
     reads: all outputs from steps 1-5
     action: Write complete Solution Design section in register format:
             growth architecture + rationale, feature map, MVP scope with
             aha moment, growth loops, constraints from hypotheses table,
             adequacy criteria.
     produces: complete solution design section

QUALITY_CRITERIA:
  - Growth architecture selection justified by segment characteristics (not asserted)
  - Every MVP feature traces to a problem in the Problem hypothesis
  - At least one feature addresses emotional or social job (not all functional)
  - Aha moment is specific and experiential (not a vague benefit)
  - Constraints from all four hypotheses documented
  - Excluded features have rationale and "when to add" guidance
  - Growth loops are mechanistically described (not just named)

FAILURE_MODES:
  - mode: "Feature completeness before launch"
    signal: "MVP contains > 5 features or includes 'platform' / 'ecosystem' language"
    recovery: "Flag technical founder pattern. Ask: which single feature delivers
               the aha moment? Start there. Everything else is POST_MVP until
               customer evidence demands it."

  - mode: "Aha moment is vague"
    signal: "'Users see value', 'teams get results', 'experience efficiency'"
    recovery: "Rewrite as specific experience with observable outcome and timeframe.
               'Complete X task in Y minutes that previously took Z hours.'"

  - mode: "Growth architecture mismatch"
    signal: "PLG selected but ACV > $25K, or Traditional selected but ACV < $2K"
    recovery: "Architecture-ACV misalignment. Either the pricing is wrong or the
               architecture is wrong. Flag for resolution in economics hypothesis."

  - mode: "Solution not constrained by hypotheses"
    signal: "Features that do not trace to any stated problem; growth loops that
             assume segment behaviors not in evidence"
    recovery: "Every feature must trace to the Problem hypothesis. Every growth loop
               must be consistent with Segment characteristics. Remove untraced elements
               or add the tracing."
```

---

#### stg-extracting-insights

```
function: Process governor-provided expert sources into structured, tier-labeled
          insights that feed the hypothesis register as evidence.
invoked_by: strategist
invoked_when: Governor provides an expert source (book, article, video, podcast)
              for processing. On-demand, not part of standard BUILD flow.
adapted_from: rsh-extracting-insights (old system)

INPUTS:
  - Source URL, file, or transcript (governor-provided)
  - Governor brief (domain focus, extraction priorities)
  - Current hypothesis register (for relevance filtering)

OUTPUTS:
  - Structured insights written as evidence items in the register, or
  - Standalone insight file in knowledge/ if source is broadly relevant

ADAPTATIONS FROM OLD SKILL:
  - Every extracted claim carries a tier label
  - Insights are mapped to specific hypotheses (which hypothesis does this evidence support or challenge?)
  - Behavioral vs hypothetical evidence distinction applied to extracted quotes
  - Integration with register format (insights become EvidenceItems)

PROCEDURE:
  1. Ingest source
     reads: source URL/file/transcript
     action: Extract full content. Identify structure (chapters, sections,
             speakers). Capture metadata (date, author, platform).
             If URL: WebFetch. If file: Read. If transcript: Read.
     produces: raw content + metadata

  2. Extract claims and frameworks
     reads: raw content
     action: Identify: frameworks (mental models, decision structures),
             principles (universal rules), tactics (specific actions),
             data points (benchmarks, metrics), warnings (anti-patterns).
             For each: state the claim, cite the specific quote or passage,
             note the context.
     produces: extracted claims list

  3. Tier-label each claim
     reads: extracted claims
     action: For each claim, apply operational test:
             "What new data would I need to see to change my mind about this?"
             If answer is "none -- this is definitional or from cited data" -> T1
             If answer is "validate the reasoning chain" -> T2
             If answer is "customer/market data I don't have" -> T3
             Also distinguish: behavioral evidence ("we observed X happen")
             vs hypothetical ("X should work because Y").
     produces: tier-labeled claims

  4. Map to hypotheses
     reads: tier-labeled claims, current register
     action: For each claim, determine: which hypothesis does this support
             or challenge? Problem (evidence about pain), Segment (evidence
             about who), VP (evidence about differentiation), Economics
             (evidence about pricing/costs/metrics), Solution (evidence about
             what to build), General (domain knowledge, not hypothesis-specific).
     produces: hypothesis-mapped claims

  5. Write outputs
     reads: mapped claims
     action: For hypothesis-specific insights: format as EvidenceItems and
             note which hypothesis they should be added to (agent integrates
             on next BUILD/CHALLENGE pass).
             For general insights: write to knowledge/ as standalone file.
     produces: evidence items for register integration + optional knowledge file

QUALITY_CRITERIA:
  - Every extracted claim cites specific passage from source (not paraphrased without reference)
  - Tier labels applied to every claim with justification
  - Behavioral vs hypothetical distinction maintained (quotes about what happened vs what should happen)
  - Claims mapped to specific hypotheses (not all dumped as "general")
  - Source metadata complete (date, author, URL if applicable)

FAILURE_MODES:
  - mode: "Uncritical extraction"
    signal: "All claims extracted as T1 or all labeled as important"
    recovery: "Apply tier test rigorously. Expert opinion about what customers want
               is still T3. Expert frameworks are T2. Only cited data is T1."

  - mode: "Confirmation bias in extraction"
    signal: "Only insights supporting existing hypotheses extracted; challenging
             insights omitted"
    recovery: "Explicitly search for claims that contradict current register.
               Challenging evidence is more valuable than confirming evidence."

  - mode: "Quote without context"
    signal: "Extracted quote is stripped of qualifying language that changes its meaning"
    recovery: "Include surrounding context. 'This works' may have been preceded by
               'In enterprise markets above $50K ACV' -- the qualifier matters."
```

---

## Updated CLAUDE.md Content

The following replaces the CLAUDE.md content specified in autonomous-strategist.md Module 4, adding skill references and the Solution Design section.

Changes from the construction spec's CLAUDE.md:

1. Agent Registry adds `skills:` field listing 7 skills
2. Skill Loading Architecture section added (filesystem read mechanism)
3. Hypothesis Register section updated to include Solution Design (5th section, not a hypothesis)
4. File Location Index updated with `.claude/skills/` entries
5. Modes section updated: BUILD references skill loading at each phase

```markdown
# LeanOS Core -- System Instructions

## Operating Model

Governor-directed autonomous strategy. One agent builds strategy
autonomously from governor input, self-challenges it, and escalates
only at defined boundaries. Governor provides the problem space and
values. The system does the research, construction, and adversarial
testing.

{rest of operating model unchanged from construction spec}

## Agent Registry

| Agent | Model | What It Does | Reads | Writes | Tools | Skills |
|-------|-------|-------------|-------|--------|-------|--------|
| strategist | opus | Autonomous strategy builder with self-challenge protocol. | strategy/hypotheses.md, execution/queue/ | strategy/hypotheses.md, execution/queue/ | Read, Write, Edit, Grep, Glob, WebSearch, WebFetch | stg-sizing-markets, stg-segmenting-customers, stg-scoring-problems, stg-analyzing-competition, stg-designing-pricing, stg-calculating-economics, stg-designing-solutions, stg-extracting-insights |

One agent. Seven on-demand skills. Escalation queue for governor decisions.

## Skill Loading Architecture

Skills load via filesystem read (on demand). The agent reads skills from
`.claude/skills/{name}/SKILL.md` when its workflow step references them.

| Skill | Domain | Loaded During |
|-------|--------|---------------|
| stg-sizing-markets | Market opportunity | BUILD phase 1 (research) |
| stg-analyzing-competition | Competitive landscape | BUILD phase 1 (research) |
| stg-scoring-problems | Problem validation | BUILD phase 2 (construction) |
| stg-segmenting-customers | Customer segments | BUILD phase 2 (construction) |
| stg-designing-pricing | Pricing methodology | BUILD phase 2 (construction) |
| stg-calculating-economics | Unit economics | BUILD phase 2 (construction) |
| stg-designing-solutions | Solution design | BUILD phase 2 (construction) |
| stg-extracting-insights | Source processing | On-demand (governor provides source) |

## Hypothesis Register

Single file: `strategy/hypotheses.md`

Four hypotheses: Problem, Segment, Value Proposition, Unit Economics.
One derived design artifact: Solution Design (constrained by the four hypotheses).

{rest of register description updated to include Solution Design section}

## File Location Index

strategy/
  hypotheses.md    The hypothesis register (4 hypotheses + solution design)

execution/
  queue/           Escalations awaiting governor response

.claude/
  agents/
    strategist.md  Agent definition
  skills/
    stg-sizing-markets/SKILL.md
    stg-segmenting-customers/SKILL.md
    stg-scoring-problems/SKILL.md
    stg-analyzing-competition/SKILL.md
    stg-designing-pricing/SKILL.md
    stg-calculating-economics/SKILL.md
    stg-designing-solutions/SKILL.md
    stg-extracting-insights/SKILL.md

{rest of CLAUDE.md unchanged from construction spec}
```

---

## Deletion Manifest

**Status: EXECUTED.** All deletions and creations completed. This section is the historical record.

### Execution Summary

| Category | Before | After | Status |
|----------|--------|-------|--------|
| Agents | 3 (strategist, researcher, planner) | 1 (strategist) | Done |
| Skills | 29 (str-*, crt-*, rsh-*, sys-*, rsn-*) | 8 (stg-*) | Done |
| Canvas sections | 16 files | 0 | Done |
| Register files | 0 | 1 (strategy/hypotheses.md) | Done |
| Old assessments | 3 specs | 0 | Done |

### Skills Created (8)

| Skill | Path | Adapted From |
|-------|------|-------------|
| stg-sizing-markets | `.claude/skills/stg-sizing-markets/SKILL.md` | str-sizing-markets |
| stg-segmenting-customers | `.claude/skills/stg-segmenting-customers/SKILL.md` | str-segmenting-customers |
| stg-scoring-problems | `.claude/skills/stg-scoring-problems/SKILL.md` | str-scoring-problems |
| stg-analyzing-competition | `.claude/skills/stg-analyzing-competition/SKILL.md` | str-analyzing-competition |
| stg-designing-pricing | `.claude/skills/stg-designing-pricing/SKILL.md` | str-designing-pricing |
| stg-calculating-economics | `.claude/skills/stg-calculating-economics/SKILL.md` | str-calculating-economics + str-structuring-costs |
| stg-designing-solutions | `.claude/skills/stg-designing-solutions/SKILL.md` | str-designing-solutions |
| stg-extracting-insights | `.claude/skills/stg-extracting-insights/SKILL.md` | rsh-extracting-insights |

### Old Skills Disposition (for reference)

| Old Skill | Disposition | Where It Went |
|-----------|-------------|---------------|
| str-positioning-value | ABSORBED | Agent prompt (doc_2.md expertise, VP testability) |
| str-extracting-assumptions | ABSORBED | Agent prompt (destruction phase protocol) |
| str-selecting-channels | ABSORBED | stg-designing-pricing (channel economics tables) + stg-calculating-economics |
| str-structuring-costs | ABSORBED | stg-calculating-economics (merged) |
| rsh-researching-market | ABSORBED | Agent prompt (autonomous research capability) + stg-sizing-markets |
| str-planning-gtm | DROPPED | Function moved to Sell & Grow chain |
| rsh-creating-playbooks | DROPPED | Knowledge management function, not strategy construction |
| sct-discovering-opportunities | DROPPED | Scout function, separate vertical if needed |
| sct-assessing-fit | DROPPED | Scout function, separate vertical if needed |

### Remaining docs/ files (not part of this system)

```
docs/canvas.md            (old reference -- can be removed if no longer needed)
docs/quickstart.md        (old reference -- can be removed if no longer needed)
docs/value-function.md    (old reference -- can be removed if no longer needed)
```
| Canvas sections | 16 files | 0 |
| Register files | 0 | 1 (strategy/hypotheses.md) |
| Hypothesis blocks | 0 | 4 + 1 solution design |

---

## Build Order for Composer

1. Create directory structure:
   - `strategy/` (if not exists)
   - `execution/queue/` (if not exists)
   - `.claude/skills/stg-sizing-markets/`
   - `.claude/skills/stg-segmenting-customers/`
   - `.claude/skills/stg-scoring-problems/`
   - `.claude/skills/stg-analyzing-competition/`
   - `.claude/skills/stg-designing-pricing/`
   - `.claude/skills/stg-calculating-economics/`
   - `.claude/skills/stg-designing-solutions/`
   - `.claude/skills/stg-extracting-insights/`

2. Write skill files (8 SKILL.md files from specs above)

3. Write `strategy/hypotheses.md` (empty template with evolved register structure including Solution Design section)

4. Write `.claude/agents/strategist.md` (agent definition with embedded identity, epistemic model, modes, governor protocol, self-challenge protocol, failure mode awareness + skill references in frontmatter)

5. Write `CLAUDE.md` (replacement system instructions with skill loading architecture)

6. Execute deletion manifest (remove old agents, old skills, old directories)

Step 6 MUST be last. Old system remains intact until new system is fully written.

---

## Verification Criteria

All criteria from autonomous-strategist.md remain valid. Additional criteria:

1. `.claude/skills/stg-sizing-markets/SKILL.md` exists with: TAM/SAM/SOM procedure, range-based estimates, tier labeling, source citation requirements, mode-specific thresholds, quality criteria, failure modes
2. `.claude/skills/stg-segmenting-customers/SKILL.md` exists with: compression model (enumerate, score, eliminate), observable filter requirement, pain scoring with evidence, possibility space recording, quality criteria, failure modes
3. `.claude/skills/stg-scoring-problems/SKILL.md` exists with: four-property scoring (frequency, severity, breadth, alternatives), tier labels per property, compression model, quality criteria, failure modes
4. `.claude/skills/stg-analyzing-competition/SKILL.md` exists with: direct + indirect competitor mapping, positioning matrix, red-team intelligence output, tier labeling, quality criteria, failure modes
5. `.claude/skills/stg-designing-pricing/SKILL.md` exists with: value-based methodology, tier architecture, WTP always T3, channel economics tables, mode-specific guidance, quality criteria, failure modes
6. `.claude/skills/stg-calculating-economics/SKILL.md` exists with: LTV/CAC/payback formulas, range-based calculations, scenario analysis (optimistic/base/pessimistic/kill), cost structure integration, tier propagation, quality criteria, failure modes
7. `.claude/skills/stg-designing-solutions/SKILL.md` exists with: growth architecture selection matrix, feature-to-problem mapping with JTBD, MVP scope with aha moment, growth loops, hypothesis constraints table, adequacy criteria, quality criteria, failure modes
8. `.claude/skills/stg-extracting-insights/SKILL.md` exists with: source ingestion, claim extraction, tier labeling, hypothesis mapping, quality criteria, failure modes
9. `strategy/hypotheses.md` template includes Solution Design section between hypothesis 4 and the Destruction Log
10. `.claude/agents/strategist.md` frontmatter lists all 8 skills
11. `.claude/agents/strategist.md` body references skills by name at appropriate BUILD phases ("load and follow stg-sizing-markets")
12. `CLAUDE.md` documents skill loading architecture with skill-to-phase mapping table
13. Every skill procedure step reads something and produces something (no steps that are just descriptions)
14. Every skill has quality criteria that are specific, measurable, and falsifiable
15. Every skill has failure modes with signal (how to detect) and recovery (what to change)
16. No skill references canvas sections, canvas directories, or the old 16-section format
17. All skills work with the hypothesis register format (not canvas format)
18. All skills label outputs with epistemic tiers (T1/T2/T3)
19. All skills support the compression model where applicable (enumerate candidates, eliminate, record survivors)

---

## Notes for Composer

Composer reads this spec and creates:
- `.claude/agents/strategist.md` -- agent definition
  - Frontmatter: name, description, function, model, tools, reads, writes, skills (list of 8), maxTurns, escalates-to
  - Body: identity, epistemic model (full T1/T2/T3), modes (BUILD/CHALLENGE/REVIEW with workflow), governor protocol, self-challenge protocol, failure mode awareness, technical founder patterns, behavioral science awareness, register schema reference, Sell & Grow interface, skill loading instructions
  - The body does NOT contain skill procedures -- it references skills by name
  - The body DOES contain: destruction protocol (always needed), overconfidence markers (always needed), evidence vs framework distinction (always needed)
- `.claude/skills/{name}/SKILL.md` for each of 8 skills
  - Frontmatter: name, description, allowed-tools, serves, domain
  - Body: procedure steps from this spec, quality criteria, failure modes
  - Skills read hypothesis register and write evidence/hypotheses to it
  - Skills do NOT reference canvas sections or old file paths

## Notes for spc-specifying-intelligence

If intelligence layer is specced later:
- The adversarial self-challenge protocol is the internal review mechanism
- Quality criteria from skills inform what to evaluate
- The single-vertical structure means no peer review routing -- intelligence would need to create a separate review agent or rely on the governor

## Notes for spc-assembling-orchestrator

No orchestrator needed. This is a governor-directed system. Human invokes the strategist directly. Escalations are written to `execution/queue/` and the governor responds.
