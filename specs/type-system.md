# Type System: Unified Agentic Validation System

Generated: 2026-04-01
Project: LeanOS Core
Status: Final
Supersedes: Autonomous Strategist register and prompt specs where they conflict with this document

---

## 1. Purpose

This type system defines the canonical data model, ownership model, invariants, and state transitions for an autonomous system with two agents:

1. Strategist -- constructs candidate truth
2. Gap Definer -- determines actionable truth and controls progression

The central design correction is authority separation:

- **Strategist proposes**
- **Gap Definer decides**

Downstream revenue execution is an external system that consumes validated outputs via readiness gates. It is not part of this type system.

---

## 2. System Model

```
Governor    -> inputs problem space, constraints, values, ground-truth evidence
Strategist  -> constructs versioned register from public research + structural reasoning
Gap Definer -> computes gaps, runs decision rules, executes destruction protocol, gates readiness
Downstream  -> executes validated paths (external to this system)
```

Two artifacts form the operational state:
- The hypothesis register (shared state, section-level ownership)
- The gap analysis register (Gap Definer's authoritative working document)

---

## 3. Ownership Model

| Section / Artifact           | Stored In                  | Owner                                                    | Authority                              |
|------------------------------|----------------------------|----------------------------------------------------------|----------------------------------------|
| Metadata                     | hypothesis register        | Strategist                                               | authoritative                          |
| Problem Hypothesis           | hypothesis register        | Strategist proposes, Gap Definer reclassifies             | authoritative after Gap pass           |
| Segment Hypothesis           | hypothesis register        | Strategist proposes, Gap Definer reclassifies             | authoritative after Gap pass           |
| Unit Economics Hypothesis    | hypothesis register        | Strategist proposes, Gap Definer reclassifies             | authoritative after Gap pass           |
| Value Proposition            | hypothesis register        | Strategist proposes, Gap Definer validates for execution  | semi-authoritative                     |
| Growth Architecture          | hypothesis register        | Strategist proposes, Gap Definer validates / blocks       | non-binding until validated            |
| Solution Design              | hypothesis register        | Strategist proposes, Gap Definer validates adequacy       | non-binding until validated            |
| GTM Plan                     | hypothesis register        | Strategist proposes, Gap Definer validates feasibility    | non-binding until validated            |
| Destruction Log (summary)    | hypothesis register        | Gap Definer executes and owns                            | authoritative                          |
| Gap Ledger (summary)         | hypothesis register        | Gap Definer                                              | authoritative                          |
| Gap Analysis Register        | strategy/gap-analysis.md   | Gap Definer                                              | authoritative (full detail)            |
| Execution Queue              | execution/queue/           | Gap Definer                                              | authoritative                          |

---

## 4. Core Algebraic Types

### 4.1 Register

```
Product HypothesisRegister = {
  metadata: RegisterMetadata,
  problem: ProblemHypothesis,
  segment: SegmentHypothesis,
  unit_economics: UnitEconomicsHypothesis,
  value_proposition: ValueProposition,
  growth_architecture: GrowthArchitectureProposal,
  solution_design: SolutionDesignProposal,
  gtm_plan: GTMPlanProposal,
  destruction_log: DestructionLog,
  gap_ledger: GapLedger,
  governance: GovernanceState
}
```

### 4.2 Metadata

```
Product RegisterMetadata = {
  created: Date,
  last_reviewed: Date,
  business_mode: BusinessMode,
  build_method: BuildMethod,
  current_mode: SystemMode,
  sell_ready: Bool,
  scale_ready: Bool,
  register_version: Integer
}

Sum BusinessMode = VENTURE | BOOTSTRAP | HYBRID
Sum BuildMethod = AUTONOMOUS | GOVERNOR_AUTHORED | MIXED
Sum SystemMode = BUILD | CHALLENGE | REVIEW
```

### 4.3 Canonical Confidence and State

```
Sum ConfidenceState = UNVALIDATED | RESEARCHED | SUPPORTED | BROKEN
Sum SupportState = PROPOSED | VALIDATED | BLOCKED
```

Use:
- `ConfidenceState` for hypotheses
- `SupportState` for derived design layers and architecture

### 4.4 Epistemics

```
Sum EpistemicTier = T1 | T2 | T3
  -- T1 = derivable from public or observed data
  -- T2 = synthesized from structural reasoning over evidence
  -- T3 = requires direct ground truth not currently possessed

Sum EvidenceType =
    CONVERSATION
  | OBSERVATION
  | DATA
  | FOUNDER_STATED
  | WEB_RESEARCH
  | COMPETITIVE_ANALYSIS
  | EXPERIMENT_RESULT
```

### 4.5 Assumption Model

```
Product Assumption = {
  id: AssumptionId,
  claim: NonEmptyString,
  tag: EpistemicTag,
  tier: EpistemicTier,
  load_bearing: Bool,
  blast_radius: BlastRadius,
  falsification_condition: Option<NonEmptyString>,
  validation_plan: Option<NonEmptyString>,
  status: AssumptionStatus
}

Sum EpistemicTag = K | B | O
  -- K = known
  -- B = belief
  -- O = open question

Sum BlastRadius = LOW | MEDIUM | HIGH
Sum AssumptionStatus = OPEN | TESTING | RESOLVED_TRUE | RESOLVED_FALSE | ESCALATED
```

### 4.6 Evidence and Sources

```
Product EvidenceItem = {
  id: EvidenceId,
  source: NonEmptyString,
  type: EvidenceType,
  tier: EpistemicTier,
  date: Date,
  detail: NonEmptyString,
  supports: List<ClaimRef>,
  contradicts: List<ClaimRef>,
  provenance: Provenance
}

Product Provenance = {
  url: Option<String>,
  description: NonEmptyString,
  date_accessed: Date,
  extract_method: ExtractMethod
}

Sum ExtractMethod = MANUAL | WEB_FETCH | WEB_SEARCH | GOVERNOR_SUPPLIED | SYSTEM_GENERATED
```

### 4.7 Possibility Space

```
Product PossibilitySpace = {
  candidates_considered: List<NonEmptyString>,
  eliminations: List<EliminationEntry>,
  alternatives_carried: List<NonEmptyString>
}

Product EliminationEntry = {
  candidate: NonEmptyString,
  reason: NonEmptyString,
  evidence: Option<NonEmptyString>
}
```

### 4.8 Decision Deadlines and Governance

```
Product GovernanceState = {
  decision_deadlines: List<DecisionDeadline>,
  escalation_queue_refs: List<EscalationRef>,
  active_limits: ActiveWorkLimit,
  current_blockers: List<Blocker>
}

Product DecisionDeadline = {
  target: GovernedTarget,
  due_date: Date,
  max_iterations: PositiveInt,
  current_iteration: NonNegativeInt,
  status: DeadlineStatus
}

Sum GovernedTarget =
    PROBLEM
  | SEGMENT
  | UNIT_ECONOMICS
  | VALUE_PROPOSITION
  | GROWTH_ARCHITECTURE
  | SOLUTION_DESIGN
  | GTM_PLAN
  | REGISTER_LEVEL

Sum DeadlineStatus = OPEN | DUE | EXCEEDED | RESOLVED

Product ActiveWorkLimit = {
  max_active_gaps: PositiveInt,
  max_parallel_experiments: PositiveInt
}

Product Blocker = {
  target: GovernedTarget,
  reason: NonEmptyString,
  blast_radius: BlastRadius
}
```

---

## 5. Hypothesis Types

### 5.1 Shared Hypothesis Base

```
Product BaseHypothesis = {
  claim: NonEmptyString,
  confidence: ConfidenceState,
  evidence: List<EvidenceItem>,
  research_sources: List<Provenance>,
  assumptions: List<Assumption>,
  possibility_space: PossibilitySpace,
  kill_condition: NonEmptyString,
  desired_state: DesiredState,
  current_state: CurrentState,
  last_updated: Date,
  update_rationale: Option<String>
}
```

### 5.2 Problem Hypothesis

```
Product ProblemHypothesis = BaseHypothesis & {
  pain_intensity: PainIntensity,
  frequency: ProblemFrequency,
  why_now: WhyNow,
  workarounds: List<NonEmptyString>
}

Sum PainIntensity = LOW | MODERATE | ACUTE | EXISTENTIAL
Sum ProblemFrequency = DAILY | WEEKLY | MONTHLY | RARE

Product WhyNow = {
  enablers: List<NonEmptyString>,
  changes_last_36_months: List<NonEmptyString>,
  why_not_5_years_ago: NonEmptyString
}
```

### 5.3 Segment Hypothesis

```
Product SegmentHypothesis = BaseHypothesis & {
  trigger_event: NonEmptyString,
  budget_owner: NonEmptyString,
  current_spend: NonEmptyString,
  observable_characteristics: List<NonEmptyString>,
  access_paths: List<ChannelRef>
}
```

### 5.4 Unit Economics Hypothesis

```
Product UnitEconomicsHypothesis = BaseHypothesis & {
  revenue_model: RevenueModel,
  price_hypothesis: PriceHypothesis,
  cost_structure: CostStructure,
  channel_strategy: ChannelStrategy,
  metric_thresholds: ModeThresholds,
  scenarios: ScenarioAnalysis
}

Product RevenueModel = {
  model_type: RevenueModelType,
  pricing_unit: NonEmptyString,
  billing_motion: BillingMotion
}

Sum RevenueModelType = SUBSCRIPTION | USAGE_BASED | TRANSACTIONAL | SERVICES | HYBRID_REVENUE
Sum BillingMotion = MONTHLY | ANNUAL | PER_USE | ONE_TIME | MIXED

Product PriceHypothesis = {
  low: Decimal,
  high: Decimal,
  currency: CurrencyCode,
  tier: EpistemicTier
}

Product CostStructure = {
  fixed_costs: List<CostLine>,
  variable_costs: List<CostLine>,
  gross_margin_range: PercentageRange,
  burn_rate_range: MoneyRange,
  runway_months_range: NumericRange
}

Product CostLine = {
  category: CostCategory,
  items: List<NonEmptyString>,
  monthly_cost_range: MoneyRange,
  tier: EpistemicTier,
  source: NonEmptyString
}

Sum CostCategory =
    TEAM
  | INFRASTRUCTURE
  | SOFTWARE
  | OPERATIONS
  | HOSTING_COMPUTE
  | PAYMENT_PROCESSING
  | SUPPORT
  | ONBOARDING
  | OTHER

Product ChannelStrategy = {
  channels: List<ChannelEstimate>,
  coherence_note: NonEmptyString,
  sequencing_rationale: NonEmptyString
}

Product ChannelEstimate = {
  channel: ChannelRef,
  reach: NonEmptyString,
  cac_range: MoneyRange,
  investment_split: NonEmptyString,
  tier: EpistemicTier,
  source: NonEmptyString
}

Product ModeThresholds = {
  ltv_cac_minimum: NumericRange,
  payback_maximum_months: NumericRange,
  gross_margin_target: PercentageRange
}

Product ScenarioAnalysis = {
  optimistic: Scenario,
  base: Scenario,
  pessimistic: Scenario,
  kill: Scenario
}

Product Scenario = {
  ltv_cac_range: NumericRange,
  payback_months_range: NumericRange,
  gross_margin_range: PercentageRange,
  narrative: NonEmptyString
}
```

### 5.5 Value Proposition

This is retained because downstream systems need a canonical market-facing value contract. It is more execution-facing than Problem or Segment, but it is still testable.

```
Product ValueProposition = {
  claim: NonEmptyString,
  confidence: ConfidenceState,
  jobs: JobsToBeDone,
  clause_validation: List<ClauseValidation>,
  evidence: List<EvidenceItem>,
  assumptions: List<Assumption>,
  desired_state: DesiredState,
  current_state: CurrentState,
  last_updated: Date,
  update_rationale: Option<String>
}

Product JobsToBeDone = {
  functional: NonEmptyString,
  emotional: NonEmptyString,
  social: NonEmptyString
}

Product ClauseValidation = {
  clause: VPClause,
  status: ClauseStatus,
  tier: EpistemicTier,
  evidence: Option<NonEmptyString>
}

Sum VPClause =
    TARGET_CUSTOMER
  | PROBLEM
  | CATEGORY
  | DIFFERENTIATOR
  | CURRENT_ALTERNATIVE
  | UNIQUE_CAPABILITY

Sum ClauseStatus = TESTED | UNTESTED | CONTRADICTED
```

---

## 6. Derived Proposal Types

These are stored in the register, produced by Strategist, but not execution-authoritative until Gap Definer validates them.

### 6.1 Growth Architecture Proposal

```
Product GrowthArchitectureProposal = {
  architecture: GrowthArchitecture,
  config: Option<HybridConfig>,
  rationale: ArchitectureRationale,
  required_conditions: List<NonEmptyString>,
  assumptions: List<Assumption>,
  support_state: SupportState,
  last_updated: Date
}

Sum GrowthArchitecture =
    PLG
  | NETWORK
  | SALES_LED
  | MARKETPLACE
  | HYBRID

Product HybridConfig = {
  primary_motion: GrowthArchitecture,
  secondary_motion: GrowthArchitecture,
  transition_trigger: NonEmptyString
}

Product ArchitectureRationale = {
  acv_implication: NonEmptyString,
  buyer_type: NonEmptyString,
  time_to_value: NonEmptyString,
  collaboration_requirement: NonEmptyString,
  selection_reason: NonEmptyString
}
```

### 6.2 Solution Design Proposal

```
Product SolutionDesignProposal = {
  positioning_statement: NonEmptyString,
  category_framing: NonEmptyString,
  category_rationale: NonEmptyString,
  feature_map: List<FeatureMapping>,
  mvp_scope: MVPScope,
  growth_loops: List<GrowthLoop>,
  constraints_from_hypotheses: List<HypothesisConstraint>,
  adequacy_criteria: List<NonEmptyString>,
  support_state: SupportState,
  last_updated: Date
}

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
  included: List<NonEmptyString>,
  excluded: List<ExclusionEntry>,
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
  requires: List<NonEmptyString>,
  tier: EpistemicTier
}

Product HypothesisConstraint = {
  from: HypothesisRef,
  constraint: NonEmptyString,
  if_changed: NonEmptyString
}

Sum HypothesisRef = PROBLEM_REF | SEGMENT_REF | UNIT_ECONOMICS_REF | VALUE_PROPOSITION_REF
```

### 6.3 GTM Plan Proposal

```
Product GTMPlanProposal = {
  channel_sequence: List<GTMPhase>,
  messaging_framework: MessagingFramework,
  operational_constraints: List<HypothesisConstraint>,
  success_criteria: List<NonEmptyString>,
  kill_criteria: List<NonEmptyString>,
  support_state: SupportState,
  last_updated: Date
}

Product GTMPhase = {
  phase_name: NonEmptyString,
  channels: List<ChannelRef>,
  gate_condition: NonEmptyString,
  target_kpis: PhaseKPIs,
  duration_estimate: NonEmptyString,
  tier: EpistemicTier
}

Product PhaseKPIs = {
  cac_target: MoneyRange,
  conversion_target: PercentageRange,
  activation_target: PercentageRange,
  revenue_target: Option<MoneyRange>
}

Product MessagingFramework = {
  primary_message: NonEmptyString,
  supporting_messages: List<NonEmptyString>,
  derived_from_vp: Bool,
  tier: EpistemicTier
}
```

---

## 7. Gap System Types

### 7.1 Desired and Current State

```
Product DesiredState = {
  supported_means: List<Condition>,
  broken_means: List<Condition>
}

Product CurrentState = {
  conditions_met: List<ConditionStatus>,
  conditions_missing: List<ConditionStatus>
}

Product Condition = {
  name: NonEmptyString,
  description: NonEmptyString,
  evidence_required: EvidenceRequirement
}

Product ConditionStatus = {
  condition: Condition,
  status: ConditionFulfillment
}

Sum ConditionFulfillment = MET | PARTIAL | MISSING | CONTRADICTED

Product EvidenceRequirement = {
  min_t1_count: NonNegativeInt,
  min_t2_count: NonNegativeInt,
  qualitative_requirements: List<NonEmptyString>
}
```

### 7.2 Gap Ledger

```
Product GapLedger = {
  gaps: List<GapRecord>,
  ranked_gaps: List<GapRef>,
  sell_ready: Bool,
  scale_ready: Bool,
  last_run: Date
}

Product GapRecord = {
  id: GapId,
  target: GovernedTarget,
  dimension: GapDimension,
  desired_condition: NonEmptyString,
  current_observation: NonEmptyString,
  confidence_gap: NonNegativeInt,
  evidence_weakness: NonNegativeInt,
  pain_uncertainty: NonNegativeInt,
  time_penalty: NonNegativeInt,
  blast_radius_weight: PositiveInt,
  final_priority_score: PositiveInt,
  recommended_action: ActionSpec,
  status: GapStatus
}

Sum GapDimension =
    EVIDENCE_STRENGTH
  | PAIN_CLARITY
  | SEGMENT_CLARITY
  | ECONOMIC_VIABILITY
  | VALUE_PROP_VALIDITY
  | ARCHITECTURE_READINESS
  | SOLUTION_ADEQUACY
  | GTM_FEASIBILITY
  | INTERNAL_CONTRADICTION
  | GOVERNOR_DECISION_REQUIRED

Product ActionSpec = {
  action_type: ActionType,
  description: NonEmptyString,
  expected_output: NonEmptyString,
  evidence_target: EpistemicTier
}

Sum ActionType =
    RESEARCH
  | INTERVIEW
  | PRESELL
  | EXPERIMENT
  | MODEL_REVISION
  | ESCALATION
  | HALT
  | ARCHITECTURE_CHANGE
  | SOLUTION_REDESIGN

Sum GapStatus = OPEN | IN_PROGRESS | RESOLVED | BLOCKED
```

### 7.3 Decision Rules as Types

```
Product DecisionRuleSet = {
  priority_rule: PriorityRule,
  execution_rule: ExecutionRule,
  evidence_promotion_rule: EvidencePromotionRule,
  kill_rule: KillRule,
  deadline_rule: DeadlineRule,
  contradiction_rule: ContradictionRule,
  architecture_rule: ArchitectureRule,
  contamination_rule: ContaminationRule,
  readiness_gate_rule: ReadinessGateRule,
  focus_rule: FocusRule
}
```

Operational semantics:

- **Priority Rule:** always work on highest final_priority_score
- **Execution Rule:** task valid only if it reduces a top-3 open gap and targets T1/T2 evidence
- **Evidence Promotion Rule:** T3 cannot directly produce SUPPORTED
- **Kill Rule:** contradictory T1 or satisfied kill condition forces BROKEN
- **Deadline Rule:** exceeded deadline forces KILL | PIVOT | COMMIT
- **Contradiction Rule:** register contradictions block execution
- **Architecture Rule:** unmet architecture conditions block architecture-specific execution
- **Contamination Rule:** solution-led validation invalidates the test
- **Readiness Gate Rule:** downstream systems only proceed if gate predicate is true
- **Focus Rule:** no more than 3 active gaps

---

## 8. Destruction Log Types

Stored in register (summary). Full detail in gap analysis register. Executed and owned by Gap Definer.

```
Product DestructionLog = {
  pre_mortem: NonEmptyString,
  red_team_response: NonEmptyString,
  constraint_inversions: List<ConstraintInversion>,
  evidence_concentration_risk: List<EvidenceConcentrationEntry>,
  kill_signal_audit: List<KillSignalAuditEntry>,
  last_run: Date
}

Product ConstraintInversion = {
  assumption_id: AssumptionId,
  inversion: NonEmptyString,
  consequence: NonEmptyString,
  survives: SurvivalState
}

Sum SurvivalState = YES | NO | WITH_MODIFICATION

Product EvidenceConcentrationEntry = {
  source: NonEmptyString,
  hypotheses_supported: List<GovernedTarget>,
  risk_level: RiskLevel
}

Sum RiskLevel = OK | CONCENTRATED

Product KillSignalAuditEntry = {
  signal: NonEmptyString,
  ignored: Bool,
  consequence_if_ignored: NonEmptyString
}
```

---

## 9. Invariants

### 9.1 Authority Invariants

- Strategist cannot set `sell_ready = true` or `scale_ready = true`
- Gap Definer cannot fabricate new market evidence without citing source or experiment

### 9.2 Hypothesis Invariants

- SUPPORTED requires qualifying T1 evidence
- RESEARCHED requires at least one WEB_RESEARCH or COMPETITIVE_ANALYSIS item at T1/T2
- BROKEN requires `update_rationale`
- load-bearing B assumptions require a validation plan
- high-blast-radius T3 assumptions require escalation or blocking

### 9.3 Possibility Space Invariants

- Autonomous builds must consider at least 2 candidates for every hypothesis-like section
- At least 1 alternative remains carried unless evidence clearly collapses the space
- Eliminations must state reason

### 9.4 Gap Invariants

- No task may execute unless mapped to an open gap
- Ranked gaps must be strictly sorted by priority score descending
- Maximum 3 active open gaps
- Exceeded deadlines must produce forced disposition

### 9.5 Design Invariants

- Every MVP feature must map to a stated problem
- Growth architecture must be coherent with ACV and buyer motion
- Solution design cannot upgrade a weak hypothesis to stronger confidence
- Design layers remain PROPOSED until Gap Definer validates execution fitness
- GTM Plan must derive channel sequence from Unit Economics channel strategy

### 9.6 Destruction Invariants

- Every major register update must trigger destruction pass
- Contradictory evidence cannot be omitted from the destruction log
- Concentrated evidence risk must be surfaced, not hidden

### 9.7 Readiness Gate Invariant

```
sell_ready = true implies:
  problem.confidence in {RESEARCHED, SUPPORTED}
  AND segment.confidence in {RESEARCHED, SUPPORTED}
  AND no open HIGH-blast T3 blocker
  AND no architecture contradiction

scale_ready = true implies:
  problem.confidence = SUPPORTED
  AND segment.confidence = SUPPORTED
  AND unit_economics.confidence = SUPPORTED
  AND value_proposition.confidence in {RESEARCHED, SUPPORTED}
  AND sell_ready = true
```

---

## 10. State Transition Rules

### 10.1 Hypothesis Confidence

| From        | To         | Allowed When                                                   |
|-------------|------------|----------------------------------------------------------------|
| UNVALIDATED | RESEARCHED | public research produces T1/T2 evidence                        |
| RESEARCHED  | SUPPORTED  | T1 ground-truth evidence meets desired state                   |
| UNVALIDATED | BROKEN     | disconfirming evidence or kill condition met                    |
| RESEARCHED  | BROKEN     | disconfirming evidence or kill condition met                    |
| SUPPORTED   | BROKEN     | strong contradictory T1 evidence                               |
| SUPPORTED   | RESEARCHED | not allowed; use update rationale and keep SUPPORTED or BROKEN |

### 10.2 Design Support State

| From      | To        | Allowed When                                    |
|-----------|-----------|-------------------------------------------------|
| PROPOSED  | VALIDATED | Gap Definer confirms no blocking contradictions |
| PROPOSED  | BLOCKED   | architecture or design conditions unmet         |
| BLOCKED   | PROPOSED  | Strategist revises proposal                     |
| VALIDATED | BLOCKED   | upstream contradiction emerges                  |

---

## 11. Canonical Register Markdown Shape

This is the required file-level shape for `strategy/hypotheses.md`.

```
# Hypothesis Register

Created: {YYYY-MM-DD}
Last Reviewed: {YYYY-MM-DD}
Business Mode: {VENTURE | BOOTSTRAP | HYBRID}
Build Method: {AUTONOMOUS | GOVERNOR_AUTHORED | MIXED}
System Mode: {BUILD | CHALLENGE | REVIEW}
Sell Ready: {yes | no}
Scale Ready: {yes | no}
Register Version: {int}

---

## 1. Problem
...
## 2. Segment
...
## 3. Unit Economics
...
## 4. Value Proposition
...
## 5. Growth Architecture (Proposed)
...
## 6. Solution Design (Proposed)
...
## 7. GTM Plan (Proposed)
...
## 8. Destruction Log
...
## 9. Gap Ledger
...
```

---

## 12. Compatibility Notes

### 12.1 Old Autonomous Strategist Spec

**Preserved:**
- T1/T2/T3 model
- RESEARCHED state
- possibility-space compression
- escalation boundaries
- public-research-first behavior

**Changed:**
- Gap Definer now owns destruction execution and progression control
- Solution Design and Growth Architecture remain in the register but are non-binding until validated
- GTM Plan added as a derived proposal section
- Gap analysis separated into its own register artifact owned by Gap Definer

### 12.2 Downstream System Compatibility

Downstream consumers should read:

- Problem
- Segment
- Value Proposition
- Unit Economics
- Growth Architecture
- Solution Design
- GTM Plan
- Gap Ledger readiness flags (sell_ready / scale_ready)

They must not read raw Strategist prose as equivalent to validated truth.

---

## 13. Bottom Line

This type system makes the system executable because it separates:

- stored state
- ownership
- decision authority
- transition rules

Without that separation, autonomy degrades into narrative generation.
