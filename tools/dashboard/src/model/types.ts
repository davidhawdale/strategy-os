// ============================================================
// Register Root
// ============================================================

export interface HypothesisRegister {
  metadata: RegisterMetadata;
  hypotheses: {
    problem: Hypothesis;
    segment: Hypothesis;
    unitEconomics: Hypothesis;
    valueProposition: ValueProposition;
  };
  proposals: {
    growthArchitecture: GrowthArchitectureProposal;
    solutionDesign: SolutionDesignProposal;
    gtmPlan: GTMPlanProposal;
  };
  destructionLog?: DestructionLog;
  gapLedger?: GapLedger;
  governance?: GovernanceState;
}

// ============================================================
// Gap Analysis Root
// ============================================================

export interface GapAnalysis {
  metadata: GapAnalysisMetadata;
  gateSummary: GateSummary;
  rankedGaps: GapRecord[];
  fullGapRecords: GapRecord[];
  contradictions: Contradiction[];
  destructionOutcomes: DestructionOutcomes;
  decisionRulesApplication: DecisionRulesApplication;
  readinessHandoff: ReadinessHandoff;
  governorEscalations: Escalation[];
  nextCyclePlan: NextCyclePlan;
}

// ============================================================
// Combined Parse Result
// ============================================================

export interface CombinedParseResult {
  register: HypothesisRegister;
  gapAnalysis?: GapAnalysis;
  registerWarnings: ParseWarning[];
  gapAnalysisWarnings: ParseWarning[];
  registerParseCompleteness: number;
  gapAnalysisParseCompleteness: number;
}

// ============================================================
// Metadata
// ============================================================

export interface RegisterMetadata {
  created?: string;
  lastReviewed?: string;
  businessMode?: BusinessMode;
  buildMethod?: BuildMethod;
  systemMode?: SystemMode;
  sellReady: boolean;
  scaleReady: boolean;
  registerVersion?: number;
}

export interface GapAnalysisMetadata {
  created?: string;
  lastRun?: string;
  sourceRegisterVersion?: number;
  businessMode?: BusinessMode;
  sellReady: boolean;
}

export type BusinessMode = 'VENTURE' | 'BOOTSTRAP' | 'HYBRID';
export type BuildMethod = 'AUTONOMOUS' | 'GOVERNOR_AUTHORED' | 'MIXED';
export type SystemMode = 'BUILD' | 'CHALLENGE' | 'REVIEW';

// ============================================================
// IDs and State Enums
// ============================================================

export type HypothesisId = 'problem' | 'segment' | 'unitEconomics' | 'valueProposition';
export type ProposalId = 'growthArchitecture' | 'solutionDesign' | 'gtmPlan';
export type ConfidenceState = 'UNVALIDATED' | 'RESEARCHED' | 'SUPPORTED' | 'BROKEN';
export type SupportState = 'PROPOSED' | 'VALIDATED' | 'BLOCKED';
export type AssumptionStatus = 'OPEN' | 'TESTING' | 'RESOLVED_TRUE' | 'RESOLVED_FALSE' | 'ESCALATED';

// ============================================================
// Hypothesis (Problem, Segment, Unit Economics)
// ============================================================

export interface Hypothesis {
  id: HypothesisId;
  claim?: string;
  confidence?: ConfidenceState;
  desiredState?: DesiredState;
  currentState?: CurrentState;
  possibilitySpace?: PossibilitySpace;
  evidence: EvidenceItem[];
  researchSources: ResearchSource[];
  assumptions: Assumption[];
  killCondition?: string;
  lastUpdated?: string;
  updateRationale?: string;

  // Problem-specific extensions
  painIntensity?: PainIntensity;
  frequency?: ProblemFrequency;
  whyNow?: WhyNow;
  workarounds?: string[];

  // Segment-specific extensions
  triggerEvent?: string;
  budgetOwner?: string;
  currentSpend?: string;
  observableCharacteristics?: string[];
  accessPaths?: string[];

  // Unit Economics extensions
  revenueModel?: RevenueModel;
  priceHypothesis?: PriceHypothesis;
  costStructure?: CostStructure;
  channelStrategy?: ChannelStrategy;
  modeThresholds?: ModeThreshold[];
  scenarioAnalysis?: ScenarioAnalysis;
}

export type PainIntensity = 'LOW' | 'MODERATE' | 'ACUTE' | 'EXISTENTIAL';
export type ProblemFrequency = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'RARE';

export interface WhyNow {
  enablers: string[];
  changesLast36Months: string[];
  whyNot5YearsAgo?: string;
}

export interface RevenueModel {
  modelType?: string;
  pricingUnit?: string;
  billingMotion?: string;
}

export interface PriceHypothesis {
  low?: string;
  high?: string;
  currency?: string;
  tier?: EpistemicTier;
}

export interface CostStructure {
  entries: CostEntry[];
  grossMarginRange?: string;
  burnRateRange?: string;
  runwayMonthsRange?: string;
}

// ============================================================
// Value Proposition
// ============================================================

export interface ValueProposition {
  claim?: string;
  confidence?: ConfidenceState;
  jobs?: JobsToBeDone;
  clauseValidation: ClauseValidation[];
  evidence: EvidenceItem[];
  assumptions: Assumption[];
  desiredState?: DesiredState;
  currentState?: CurrentState;
  lastUpdated?: string;
  updateRationale?: string;
}

export interface JobsToBeDone {
  functional?: string;
  emotional?: string;
  social?: string;
}

export interface ClauseValidation {
  clause: string;
  clauseType?: VPClauseType;
  status?: ClauseStatus;
  tier?: EpistemicTier;
  evidence?: string;
}

export type VPClauseType =
  | 'TARGET_CUSTOMER'
  | 'PROBLEM'
  | 'CATEGORY'
  | 'DIFFERENTIATOR'
  | 'CURRENT_ALTERNATIVE'
  | 'UNIQUE_CAPABILITY';

export type ClauseStatus = 'TESTED' | 'UNTESTED' | 'CONTRADICTED';

// ============================================================
// Proposals
// ============================================================

export interface GrowthArchitectureProposal {
  architecture?: GrowthArchitectureType;
  hybridConfig?: HybridConfig;
  supportState?: SupportState;
  rationale?: ArchitectureRationale;
  requiredConditions: string[];
  assumptions: Assumption[];
  lastUpdated?: string;
}

export type GrowthArchitectureType = 'PLG' | 'NETWORK' | 'SALES_LED' | 'MARKETPLACE' | 'HYBRID';

export interface HybridConfig {
  primaryMotion?: string;
  secondaryMotion?: string;
  transitionTrigger?: string;
}

export interface ArchitectureRationale {
  acvImplication?: string;
  buyerType?: string;
  timeToValue?: string;
  collaborationRequirement?: string;
  selectionReason?: string;
}

export interface SolutionDesignProposal {
  supportState?: SupportState;
  positioningStatement?: string;
  categoryFraming?: string;
  categoryRationale?: string;
  featureMap: FeatureMapEntry[];
  mvpScope?: MVPScope;
  growthLoops: GrowthLoop[];
  constraintsFromHypotheses: HypothesisConstraint[];
  adequacyCriteria: string[];
  lastUpdated?: string;
}

export interface GTMPlanProposal {
  supportState?: SupportState;
  channelSequence: GTMPhase[];
  messagingFramework?: MessagingFramework;
  operationalConstraints: HypothesisConstraint[];
  successCriteria: string[];
  killCriteria: string[];
  lastUpdated?: string;
}

export interface GTMPhase {
  phaseName: string;
  channels: string[];
  gateCondition?: string;
  targetKPIs?: PhaseKPIs;
  durationEstimate?: string;
  tier?: EpistemicTier;
}

export interface PhaseKPIs {
  cacTarget?: string;
  conversionTarget?: string;
  activationTarget?: string;
  revenueTarget?: string;
}

export interface MessagingFramework {
  primaryMessage?: string;
  supportingMessages: string[];
  derivedFromVP?: boolean;
  tier?: EpistemicTier;
}

// ============================================================
// Desired / Current State
// ============================================================

export interface DesiredState {
  supportedMeans: string[];
  brokenMeans: string[];
}

export interface CurrentState {
  met: string[];
  partial: string[];
  missing: string[];
  contradicted: string[];
}

// ============================================================
// Epistemics
// ============================================================

export type EpistemicTier = 'T1' | 'T2' | 'T3';

export type EvidenceType =
  | 'CONVERSATION'
  | 'OBSERVATION'
  | 'DATA'
  | 'FOUNDER_STATED'
  | 'WEB_RESEARCH'
  | 'COMPETITIVE_ANALYSIS'
  | 'EXPERIMENT_RESULT';

export type EpistemicTag = 'K' | 'B' | 'O';
export type BlastRadius = 'LOW' | 'MEDIUM' | 'HIGH';

// ============================================================
// Evidence and Sources
// ============================================================

export interface EvidenceItem {
  raw: string;
  type?: EvidenceType;
  tier?: EpistemicTier;
  date?: string;
  detail: string;
}

export interface ResearchSource {
  raw: string;
  tier?: EpistemicTier;
  date?: string;
  url?: string;
  description?: string;
}

// ============================================================
// Assumptions
// ============================================================

export interface Assumption {
  raw: string;
  tag?: EpistemicTag;
  tier?: EpistemicTier;
  claim: string;
  loadBearing: boolean;
  blastRadius?: BlastRadius;
  falsification?: string;
  validation?: string;
  status?: AssumptionStatus;
}

// ============================================================
// Possibility Space
// ============================================================

export interface PossibilitySpace {
  considered: string[];
  eliminated: EliminationEntry[];
  alternativesCarried: string[];
}

export interface EliminationEntry {
  candidate: string;
  reason: string;
  evidence?: string;
}

// ============================================================
// Feature Map and MVP
// ============================================================

export interface FeatureMapEntry {
  feature: string;
  solvesProblem: string;
  jobDimension?: 'FUNCTIONAL' | 'EMOTIONAL' | 'SOCIAL' | string;
  priority?: 'MVP' | 'POST_MVP' | 'FUTURE';
  tier?: EpistemicTier;
}

export interface MVPScope {
  included: string[];
  excluded: ExclusionEntry[];
  ahaMoment?: string;
  timeToValueTarget?: string;
}

export interface ExclusionEntry {
  feature: string;
  whyExcluded: string;
  whenToAdd: string;
}

export interface GrowthLoop {
  name: string;
  mechanism: string;
  requirements: string[];
  tier?: EpistemicTier;
}

export interface HypothesisConstraint {
  fromHypothesis: string;
  constraint: string;
  ifChanges: string;
}

// ============================================================
// Cost / Channel / Threshold (Unit Economics extensions)
// ============================================================

export interface CostEntry {
  category: string;
  items: string;
  type: 'Fixed' | 'Variable';
  monthlyCostRange: string;
  tier?: EpistemicTier;
  source?: string;
}

export interface ChannelEntry {
  channel: string;
  segmentReach: string;
  cacEstimate: string;
  investmentSplit: string;
  tier?: EpistemicTier;
  source?: string;
}

export interface ChannelStrategy {
  channels: ChannelEntry[];
  coherence?: string;
  acvConstraint?: string;
  sequencingRationale?: string;
}

export interface ModeThreshold {
  metric: string;
  required: string;
  estimate: string;
  tier?: EpistemicTier;
  source?: string;
}

export interface ScenarioAnalysis {
  optimistic?: ScenarioEntry;
  base?: ScenarioEntry;
  pessimistic?: ScenarioEntry;
  kill?: string;
}

export interface ScenarioEntry {
  ltvCacRange?: string;
  paybackMonthsRange?: string;
  grossMarginRange?: string;
  narrative: string;
}

// ============================================================
// Destruction Log (from hypothesis register section 8)
// ============================================================

export interface DestructionLog {
  preMortem?: string;
  redTeamResponse?: string;
  constraintInversions: ConstraintInversion[];
  evidenceConcentrationRisk: EvidenceConcentrationEntry[];
  killSignalAudit: KillSignalAuditEntry[];
  lastRun?: string;
}

export interface ConstraintInversion {
  assumption: string;
  consequence: string;
  survives: 'YES' | 'NO' | 'WITH_MODIFICATION' | string;
}

export interface EvidenceConcentrationEntry {
  source: string;
  hypothesesSupported: string;
  riskLevel: 'OK' | 'CONCENTRATED' | string;
}

export interface KillSignalAuditEntry {
  signal: string;
  ignored: boolean;
  consequenceIfIgnored: string;
}

// ============================================================
// Gap Ledger (from hypothesis register section 9)
// ============================================================

export interface GapLedger {
  gaps: GapLedgerEntry[];
  rankedGaps: GapLedgerEntry[];
  sellReady: boolean;
  scaleReady: boolean;
  lastRun?: string;
  blockers: Blocker[];
  decisionDeadlines: DecisionDeadline[];
}

export interface GapLedgerEntry {
  rank?: number;
  target: string;
  dimension: string;
  desiredCondition: string;
  currentObservation: string;
  priorityScore?: number;
  recommendedAction: string;
  status: GapStatus;
}

export type GapStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'BLOCKED';

export interface Blocker {
  target: string;
  reason: string;
  blastRadius: BlastRadius;
}

export interface DecisionDeadline {
  target: string;
  dueDate: string;
  currentIteration?: string;
  maxIterations?: string;
  status: 'OPEN' | 'DUE' | 'EXCEEDED' | 'RESOLVED';
}

// ============================================================
// Governance State
// ============================================================

export interface GovernanceState {
  decisionDeadlines: DecisionDeadline[];
  blockers: Blocker[];
}

// ============================================================
// Gap Analysis Types (from gap-analysis.md)
// ============================================================

export interface GateSummary {
  decision?: 'GO' | 'NO_GO' | 'CONDITIONAL_GO';
  reasons: string[];
  predicateChecks: PredicateCheck[];
  constraints: string[];
}

export interface PredicateCheck {
  predicate: string;
  result: 'pass' | 'fail';
}

export interface GapRecord {
  id?: string;
  rank?: number;
  target: string;
  dimension: string;
  desiredCondition: string;
  currentObservation: string;
  confidenceGap?: number;
  evidenceWeakness?: number;
  painUncertainty?: number;
  timePenalty?: number;
  blastRadiusWeight?: number;
  finalPriorityScore?: number;
  recommendedAction?: ActionSpec;
  decisionRuleTriggered?: string;
  status: GapStatus;
}

export interface ActionSpec {
  actionType?: string;
  description: string;
  expectedOutput?: string;
  evidenceTarget?: EpistemicTier;
}

export interface Contradiction {
  id?: string;
  between: string;
  description: string;
  impact: string;
  requiredResolution: string;
  blockExecution: boolean;
}

export interface DestructionOutcomes {
  preMortemSummary?: string;
  redTeamSummary?: string;
  constraintInversions: ConstraintInversion[];
  evidenceConcentrationRisk: EvidenceConcentrationEntry[];
  killSignalAudit: KillSignalAuditEntry[];
}

export interface DecisionRulesApplication {
  priorityRule?: { gapId: string; reason: string };
  executionRule?: { validTasks: string[]; rejectedTasks: { task: string; reason: string }[] };
  evidencePromotionRule?: { blockedClaims: string[] };
  killRule?: { targets: { target: string; reason: string }[] };
  deadlineRule?: { targets: { target: string; dueDate: string; forcedOutcome: string }[] };
  contradictionRule?: { blockingContradictions: string[] };
  architectureRule?: { blockedActions: { action: string; reason: string }[] };
  contaminationRule?: { invalidTests: { test: string; reason: string }[] };
  readinessGateRule?: { sellReady: boolean; rationale: string };
  focusRule?: { activeCount: number; maxActive: number; deferred: string[] };
}

export interface ReadinessHandoff {
  approvedActions: string[];
  forbiddenActions: string[];
  allowedConstraints: {
    targetSegment?: string;
    pricingBounds?: string;
    architectureMode?: string;
    offerFraming?: string;
    channelSet?: string;
  };
  successSignals: string[];
  failureSignals: string[];
}

export interface Escalation {
  title: string;
  decisionType?: 'VALUES' | 'GROUND_TRUTH' | 'JUDGMENT';
  blastRadius?: BlastRadius;
  decisionNeeded: string;
  whySystemCannotDecide?: string;
  options: { label: string; option: string; consequence: string }[];
  systemRecommendation?: string;
  whatIsAtStake?: string;
  status: 'OPEN' | 'RESOLVED';
}

export interface NextCyclePlan {
  topActions: string[];
  expectedChanges: string[];
  reRunDate?: string;
}

// ============================================================
// Parser Types
// ============================================================

export interface ParseWarning {
  section: string;
  field: string;
  message: string;
  severity: 'info' | 'warning' | 'error';
}

export interface ParseResult {
  register: HypothesisRegister;
  warnings: ParseWarning[];
  parseCompleteness: number;
}

export interface GapAnalysisParseResult {
  gapAnalysis: GapAnalysis;
  warnings: ParseWarning[];
  parseCompleteness: number;
}

// ============================================================
// View Models
// ============================================================

export interface ReadinessView {
  sellReady: boolean;
  scaleReady: boolean;
  businessMode?: BusinessMode;
  buildMethod?: BuildMethod;
  systemMode?: SystemMode;
  registerVersion?: number;

  hypothesisSummary: {
    id: HypothesisId;
    label: string;
    confidence?: ConfidenceState;
    evidenceCount: number;
    t1Count: number;
    t2Count: number;
    t3Count: number;
    assumptionCount: number;
    highBlastCount: number;
    hasKillCondition: boolean;
    desiredStateMet: number;
    desiredStateTotal: number;
  }[];

  proposalSummary: {
    id: ProposalId;
    label: string;
    supportState?: SupportState;
  }[];

  blockers: string[];
  warnings: string[];

  gateDecision?: 'GO' | 'NO_GO' | 'CONDITIONAL_GO';
  predicateChecks?: PredicateCheck[];
}

export interface EvidenceQualityView {
  byHypothesis: {
    id: HypothesisId;
    label: string;
    tierBreakdown: { t1: number; t2: number; t3: number };
    typeBreakdown: Partial<Record<EvidenceType, number>>;
    totalEvidence: number;
    qualityScore: number;
  }[];

  overall: {
    totalEvidence: number;
    tierBreakdown: { t1: number; t2: number; t3: number };
    qualityScore: number;
  };

  tierGaps: {
    hypothesis: HypothesisId;
    item: EvidenceItem;
    impact: string;
  }[];
}

export interface RiskMapView {
  assumptions: {
    source: HypothesisId | ProposalId;
    claim: string;
    tag?: EpistemicTag;
    tier?: EpistemicTier;
    blastRadius?: BlastRadius;
    loadBearing: boolean;
    falsification?: string;
    validation?: string;
    status?: AssumptionStatus;
    riskLevel: 'critical' | 'high' | 'medium' | 'low';
  }[];

  byCriticality: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };

  killConditions: {
    hypothesis: HypothesisId;
    condition: string;
  }[];
}

export interface DestructionView {
  hasDestructionLog: boolean;

  preMortem?: string;
  redTeamResponse?: string;

  constraintInversions?: {
    survives: number;
    fails: number;
    withModification: number;
    entries: ConstraintInversion[];
  };

  evidenceConcentration?: {
    highRisk: EvidenceConcentrationEntry[];
    entries: EvidenceConcentrationEntry[];
  };

  killSignalAudit?: {
    total: number;
    ignored: number;
    entries: KillSignalAuditEntry[];
  };

  lastRun?: string;

  gapDestructionOutcomes?: DestructionOutcomes;
  contradictions?: Contradiction[];
}

export interface ProposalsView {
  growthArchitecture: {
    hasData: boolean;
    architecture?: GrowthArchitectureType;
    supportState?: SupportState;
    rationale?: ArchitectureRationale;
    requiredConditions: string[];
  };

  solutionDesign: {
    hasData: boolean;
    supportState?: SupportState;
    positioningStatement?: string;
    featuresByPriority: {
      mvp: FeatureMapEntry[];
      postMvp: FeatureMapEntry[];
      future: FeatureMapEntry[];
    };
    mvpScope?: MVPScope;
    growthLoops: GrowthLoop[];
    constraints: HypothesisConstraint[];
    adequacyCriteria: string[];
  };

  gtmPlan: {
    hasData: boolean;
    supportState?: SupportState;
    channelSequence: GTMPhase[];
    messagingFramework?: MessagingFramework;
    successCriteria: string[];
    killCriteria: string[];
  };
}

export interface GapLedgerView {
  topGaps: GapLedgerEntry[];
  activeGapCount: number;
  maxActiveGaps: number;
  gapStatusDistribution: {
    open: number;
    inProgress: number;
    resolved: number;
    blocked: number;
  };
  sellReady: boolean;
  scaleReady: boolean;

  fullGapRecords?: GapRecord[];
  gateSummary?: GateSummary;
}

export interface DestructionHealthView {
  evidenceConcentrationFlags: EvidenceConcentrationEntry[];
  killSignalsIgnored: KillSignalAuditEntry[];
  lastDestructionRunDate?: string;
  contradictions: Contradiction[];
}

export interface DecisionDeadlinesView {
  deadlines: DecisionDeadline[];
  approachingCount: number;
  exceededCount: number;
  forcedDispositions: {
    target: string;
    dueDate: string;
    forcedOutcome: string;
  }[];
}

export interface GovernorEscalationsView {
  openEscalations: Escalation[];
  resolvedEscalations: Escalation[];
  totalOpen: number;
}

export interface EvidenceInventoryView {
  byType: Partial<Record<EvidenceType, number>>;
  byTier: { t1: number; t2: number; t3: number };
  byHypothesis: {
    id: HypothesisId;
    label: string;
    count: number;
    tierBreakdown: { t1: number; t2: number; t3: number };
    typeBreakdown: Partial<Record<EvidenceType, number>>;
  }[];
  totalItems: number;
}

export interface HypothesisDetailView {
  id: HypothesisId;
  label: string;
  claim?: string;
  confidence?: ConfidenceState;

  desiredState?: DesiredState;
  currentState?: CurrentState;

  possibilitySpace?: {
    consideredCount: number;
    eliminatedCount: number;
    carriedCount: number;
    entries: string[];
    eliminations: EliminationEntry[];
    carried: string[];
  };

  evidence: EvidenceItem[];
  researchSources: ResearchSource[];
  assumptions: Assumption[];
  killCondition?: string;
  lastUpdated?: string;
  updateRationale?: string;

  // Problem-specific
  painIntensity?: PainIntensity;
  frequency?: ProblemFrequency;
  whyNow?: WhyNow;
  workarounds?: string[];

  // Segment-specific
  triggerEvent?: string;
  budgetOwner?: string;
  currentSpend?: string;
  observableCharacteristics?: string[];
  accessPaths?: string[];

  // Unit Economics specific
  revenueModel?: RevenueModel;
  priceHypothesis?: PriceHypothesis;
  costStructure?: CostStructure;
  channelStrategy?: ChannelStrategy;
  modeThresholds?: ModeThreshold[];
  scenarioAnalysis?: ScenarioAnalysis;

  // Value Proposition specific
  jobs?: JobsToBeDone;
  clauseValidation?: ClauseValidation[];

  // Related gaps from gap analysis
  relatedGaps?: GapRecord[];
}

// ============================================================
// UI State Machine
// ============================================================

export type PanelId =
  | 'readiness'
  | 'gapLedger'
  | 'evidence'
  | 'risk'
  | 'destruction'
  | 'proposals'
  | 'escalations'
  | 'detail'
  | 'deadlines';

export type AppState =
  | { _tag: 'Loading' }
  | { _tag: 'Loaded'; data: CombinedParseResult; activePanel: PanelId; selectedHypothesis?: HypothesisId }
  | { _tag: 'Error'; message: string }
  | { _tag: 'Stale'; data: CombinedParseResult; activePanel: PanelId; selectedHypothesis?: HypothesisId; error: string };

export type AppEvent =
  | { _tag: 'FetchStart' }
  | { _tag: 'FetchSuccess'; data: CombinedParseResult }
  | { _tag: 'FetchError'; message: string }
  | { _tag: 'SelectPanel'; panel: PanelId }
  | { _tag: 'SelectHypothesis'; id: HypothesisId }
  | { _tag: 'Back' }
  | { _tag: 'Refresh' };

export function transition(state: AppState, event: AppEvent): AppState {
  switch (state._tag) {
    case 'Loading':
      switch (event._tag) {
        case 'FetchSuccess':
          return { _tag: 'Loaded', data: event.data, activePanel: 'readiness' };
        case 'FetchError':
          return { _tag: 'Error', message: event.message };
        default:
          return state;
      }

    case 'Loaded':
      switch (event._tag) {
        case 'SelectPanel':
          return { ...state, activePanel: event.panel, selectedHypothesis: undefined };
        case 'SelectHypothesis':
          return { ...state, activePanel: 'detail', selectedHypothesis: event.id };
        case 'Back':
          return { ...state, activePanel: 'readiness', selectedHypothesis: undefined };
        case 'Refresh':
          return { _tag: 'Loading' };
        case 'FetchError':
          return { _tag: 'Stale', data: state.data, activePanel: state.activePanel, selectedHypothesis: state.selectedHypothesis, error: event.message };
        default:
          return state;
      }

    case 'Error':
      switch (event._tag) {
        case 'FetchStart':
          return { _tag: 'Loading' };
        case 'FetchSuccess':
          return { _tag: 'Loaded', data: event.data, activePanel: 'readiness' };
        default:
          return state;
      }

    case 'Stale':
      switch (event._tag) {
        case 'Refresh':
          return { _tag: 'Loading' };
        case 'FetchSuccess':
          return { _tag: 'Loaded', data: event.data, activePanel: state.activePanel, selectedHypothesis: state.selectedHypothesis };
        case 'SelectPanel':
          return { ...state, activePanel: event.panel, selectedHypothesis: undefined };
        case 'SelectHypothesis':
          return { ...state, activePanel: 'detail', selectedHypothesis: event.id };
        case 'Back':
          return { ...state, activePanel: 'readiness', selectedHypothesis: undefined };
        default:
          return state;
      }

    default:
      return state;
  }
}
