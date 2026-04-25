import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import type { Root, Content, Table, PhrasingContent } from 'mdast';
import type {
  GapAnalysis,
  GapAnalysisMetadata,
  GapAnalysisParseResult,
  GateSummary,
  PredicateCheck,
  GapRecord,
  ActionSpec,
  Contradiction,
  DestructionOutcomes,
  DecisionRulesApplication,
  ReadinessHandoff,
  Escalation,
  NextCyclePlan,
  BusinessMode,
  BlastRadius,
  GapStatus,
  EpistemicTier,
  ParseWarning,
  ConstraintInversion,
  EvidenceConcentrationEntry,
  KillSignalAuditEntry,
} from '../model/types';
import {
  parseContradictionsTable,
  parseConstraintInversionTable,
  parseEvidenceConcentrationTable,
  parseKillSignalAuditTable,
  parseRankedGapsTable,
} from './tables';
import { tableToRows } from './sections';

// ============================================================
// Section splitting
// ============================================================

type GapSectionId =
  | 'root'
  | 'gateSummary'
  | 'scoringRules'
  | 'rankedGaps'
  | 'fullGapRecords'
  | 'contradictions'
  | 'destructionOutcomes'
  | 'decisionRules'
  | 'readinessHandoff'
  | 'governorEscalations'
  | 'nextCyclePlan';

interface GapSection {
  id: GapSectionId;
  rawText: string;
  nodes: Content[];
}

const SECTION_PATTERNS: [RegExp, GapSectionId][] = [
  [/^##\s+1\.\s+Gate\s+Summary/i, 'gateSummary'],
  [/^##\s+2\.\s+Gap\s+Scoring\s+Rules/i, 'scoringRules'],
  [/^##\s+3\.\s+Ranked\s+Gaps/i, 'rankedGaps'],
  [/^##\s+4\.\s+Full\s+Gap\s+Records/i, 'fullGapRecords'],
  [/^##\s+5\.\s+Contradictions/i, 'contradictions'],
  [/^##\s+6\.\s+Destruction\s+Outcomes/i, 'destructionOutcomes'],
  [/^##\s+7\.\s+Decision\s+Rules\s+Application/i, 'decisionRules'],
  [/^##\s+8\.\s+Readiness\s+Handoff/i, 'readinessHandoff'],
  [/^##\s+9\.\s+Governor\s+Escalations/i, 'governorEscalations'],
  [/^##\s+10\.\s+Next\s+Cycle\s+Plan/i, 'nextCyclePlan'],
];

function headingText(node: Content): string {
  if (node.type !== 'heading') return '';
  return (node.children as PhrasingContent[]).map(c => {
    if ('value' in c) return c.value;
    if ('children' in c) return (c.children as PhrasingContent[]).map(cc => ('value' in cc ? cc.value : '')).join('');
    return '';
  }).join('');
}

function identifyGapSection(text: string): GapSectionId | null {
  for (const [pattern, id] of SECTION_PATTERNS) {
    if (pattern.test(text)) return id;
  }
  return null;
}

function splitGapSections(markdown: string): Map<GapSectionId, GapSection> {
  const tree = unified().use(remarkParse).use(remarkGfm).parse(markdown) as Root;
  const sections = new Map<GapSectionId, GapSection>();
  const lines = markdown.split('\n');

  let currentId: GapSectionId = 'root';
  let currentNodes: Content[] = [];
  let currentStart = 0;

  function flushSection() {
    if (currentNodes.length > 0 || currentId === 'root') {
      const lastNode = currentNodes[currentNodes.length - 1];
      const endLine = lastNode?.position?.end?.line ?? currentStart;
      const rawText = lines.slice(Math.max(0, currentStart - 1), endLine).join('\n');
      sections.set(currentId, { id: currentId, rawText, nodes: currentNodes });
    }
  }

  for (const node of tree.children) {
    if (node.type === 'heading' && node.depth === 2) {
      const text = headingText(node);
      const sectionId = identifyGapSection(`## ${text}`);
      if (sectionId) {
        flushSection();
        currentId = sectionId;
        currentNodes = [node];
        currentStart = node.position?.start?.line ?? 0;
        continue;
      }
    }
    currentNodes.push(node);
  }
  flushSection();

  return sections;
}

function getTablesFromNodes(nodes: Content[]): Table[] {
  return nodes.filter(n => n.type === 'table') as Table[];
}

// ============================================================
// Metadata parser
// ============================================================

function parseGapAnalysisMetadata(text: string): GapAnalysisMetadata {
  const created = extractSimple(text, /^Created:\s*(.+)/m);
  const lastRun = extractSimple(text, /^Last Run:\s*(.+)/m);

  const versionRaw = extractSimple(text, /^Source Register Version:\s*(\d+)/m);
  const sourceRegisterVersion = versionRaw ? parseInt(versionRaw, 10) : undefined;

  const businessModeRaw = extractSimple(text, /^Business Mode:\s*(\w+)/m);
  const businessMode = parseBusinessMode(businessModeRaw);

  const sellReadyRaw = extractSimple(text, /^Sell Ready:\s*(yes|no|true|false)/mi);
  const sellReady = sellReadyRaw?.toLowerCase() === 'yes' || sellReadyRaw?.toLowerCase() === 'true';

  return { created, lastRun, sourceRegisterVersion, businessMode, sellReady };
}

function parseBusinessMode(raw: string | undefined): BusinessMode | undefined {
  if (!raw) return undefined;
  const upper = raw.toUpperCase();
  if (upper === 'VENTURE') return 'VENTURE';
  if (upper === 'BOOTSTRAP') return 'BOOTSTRAP';
  if (upper === 'HYBRID') return 'HYBRID';
  return undefined;
}

function extractSimple(text: string, pattern: RegExp): string | undefined {
  const match = text.match(pattern);
  return match ? match[1].trim() : undefined;
}

// ============================================================
// Section parsers
// ============================================================

function parseGateSummary(text: string): GateSummary {
  const decisionRaw = extractSimple(text, /\*\*Decision:\*\*\s*(GO|NO_GO|CONDITIONAL_GO)/i);
  let decision: GateSummary['decision'];
  if (decisionRaw) {
    const upper = decisionRaw.toUpperCase();
    if (upper === 'GO') decision = 'GO';
    else if (upper === 'NO_GO') decision = 'NO_GO';
    else if (upper === 'CONDITIONAL_GO') decision = 'CONDITIONAL_GO';
  }

  // Parse **Why:** bullets
  const whyBlock = text.match(/\*\*Why:\*\*\s*\n([\s\S]*?)(?=\n\*\*|\n---|\n##|$)/i);
  const reasons: string[] = [];
  if (whyBlock) {
    for (const line of whyBlock[1].split('\n')) {
      const t = line.trim();
      if (t.startsWith('-')) {
        const item = t.replace(/^-\s*/, '').trim();
        if (item && !item.startsWith('{')) reasons.push(item);
      }
    }
  }

  // Parse **Readiness Gate Predicate Check:**
  const predicateBlock = text.match(/\*\*Readiness Gate Predicate Check:\*\*\s*\n([\s\S]*?)(?=\n\*\*|\n---|\n##|$)/i);
  const predicateChecks: PredicateCheck[] = [];
  if (predicateBlock) {
    for (const line of predicateBlock[1].split('\n')) {
      const t = line.trim();
      if (!t.startsWith('-')) continue;
      const inner = t.replace(/^-\s*/, '');
      // "Some predicate text: pass" or "...: fail"
      const match = inner.match(/^(.+?):\s*(pass|fail)\s*$/i);
      if (match) {
        predicateChecks.push({
          predicate: match[1].trim(),
          result: match[2].toLowerCase() as 'pass' | 'fail',
        });
      }
    }
  }

  // Parse **Current Constraint Summary:**
  const constraintBlock = text.match(/\*\*Current Constraint Summary:\*\*\s*\n([\s\S]*?)(?=\n\*\*|\n---|\n##|$)/i);
  const constraints: string[] = [];
  if (constraintBlock) {
    for (const line of constraintBlock[1].split('\n')) {
      const t = line.trim();
      if (t.startsWith('-')) {
        const item = t.replace(/^-\s*/, '').trim();
        if (item && !item.startsWith('{')) constraints.push(item);
      }
    }
  }

  return { decision, reasons, predicateChecks, constraints };
}

function parseFullGapRecords(text: string): GapRecord[] {
  const records: GapRecord[] = [];

  // Each gap record starts with "### Gap: {id}"
  const gapBlocks = text.split(/(?=###\s+Gap:\s*)/i);

  for (const block of gapBlocks) {
    const idMatch = block.match(/###\s+Gap:\s*(.+)/i);
    if (!idMatch) continue;

    const id = idMatch[1].trim();

    const target = extractDashField(block, 'Target') || '';
    const dimension = extractDashField(block, 'Dimension') || '';
    const desiredCondition = extractDashField(block, 'Desired Condition') || '';
    const currentObservation = extractDashField(block, 'Current Observation') || '';
    const confidenceGap = parseOptionalNumber(extractDashField(block, 'Confidence Gap'));
    const evidenceWeakness = parseOptionalNumber(extractDashField(block, 'Evidence Weakness'));
    const painUncertainty = parseOptionalNumber(extractDashField(block, 'Pain Uncertainty'));
    const timePenalty = parseOptionalNumber(extractDashField(block, 'Time Penalty'));
    const blastRadiusWeight = parseOptionalNumber(extractDashField(block, 'Blast Radius Weight'));
    const finalPriorityScore = parseOptionalNumber(extractDashField(block, 'Final Priority Score'));
    const statusRaw = extractDashField(block, 'Status') || 'OPEN';
    const decisionRuleTriggered = extractDashField(block, 'Decision Rule Triggered');

    // Recommended Action block
    const actionBlock = block.match(/\*\*Recommended Action\*\*\s*\n([\s\S]*?)(?=\*\*Decision Rule|\*\*Status:|---|\n###|$)/i);
    let recommendedAction: ActionSpec | undefined;
    if (actionBlock) {
      const actionText = actionBlock[1];
      const actionType = extractDashField(actionText, 'Type');
      const description = extractDashField(actionText, 'Description') || '';
      const expectedOutput = extractDashField(actionText, 'Expected Output');
      const evidenceTargetRaw = extractDashField(actionText, 'Evidence Target');
      const evidenceTarget = parseEvidenceTier(evidenceTargetRaw);
      recommendedAction = { actionType, description, expectedOutput, evidenceTarget };
    }

    records.push({
      id,
      target,
      dimension,
      desiredCondition,
      currentObservation,
      confidenceGap,
      evidenceWeakness,
      painUncertainty,
      timePenalty,
      blastRadiusWeight,
      finalPriorityScore,
      recommendedAction,
      decisionRuleTriggered,
      status: parseGapStatus(statusRaw),
    });
  }

  return records;
}

function parseDestructionOutcomes(text: string, nodes: Content[]): DestructionOutcomes {
  // Pre-Mortem Summary
  const preMatch = text.match(/###\s*Pre-?Mortem\s+Summary\s*\n([\s\S]*?)(?=###\s|$)/i);
  const preMortemSummary = preMatch ? preMatch[1].trim() : undefined;

  // Red-Team Summary
  const redMatch = text.match(/###\s*Red-?Team\s+Summary\s*\n([\s\S]*?)(?=###\s|$)/i);
  const redTeamSummary = redMatch ? redMatch[1].trim() : undefined;

  // Tables
  const tables = getTablesFromNodes(nodes);

  const inversionTable = tables.find(t => {
    const rows = tableToRows(t);
    return rows.length > 1 && rows[0].some(h => /Assumption/i.test(h)) && rows[0].some(h => /Surviv/i.test(h));
  });
  const constraintInversions: ConstraintInversion[] = inversionTable
    ? parseConstraintInversionTable(inversionTable)
    : [];

  const concentrationTable = tables.find(t => {
    const rows = tableToRows(t);
    return rows.length > 1 && rows[0].some(h => /Source/i.test(h)) && rows[0].some(h => /Risk/i.test(h));
  });
  const evidenceConcentrationRisk: EvidenceConcentrationEntry[] = concentrationTable
    ? parseEvidenceConcentrationTable(concentrationTable)
    : [];

  const killTable = tables.find(t => {
    const rows = tableToRows(t);
    return rows.length > 1 && rows[0].some(h => /Signal/i.test(h)) && rows[0].some(h => /Ignored/i.test(h));
  });
  const killSignalAudit: KillSignalAuditEntry[] = killTable
    ? parseKillSignalAuditTable(killTable)
    : [];

  return { preMortemSummary, redTeamSummary, constraintInversions, evidenceConcentrationRisk, killSignalAudit };
}

function parseDecisionRulesApplication(text: string): DecisionRulesApplication {
  const rules: DecisionRulesApplication = {};

  // Priority Rule
  const priorityRuleBlock = text.match(/###\s*Priority Rule\s*\n([\s\S]*?)(?=###\s|$)/i);
  if (priorityRuleBlock) {
    const gapIdMatch = priorityRuleBlock[1].match(/highest.+?is:\s*(.+)/i);
    const reasonMatch = priorityRuleBlock[1].match(/Reason.+?first:\s*(.+)/i);
    if (gapIdMatch) {
      rules.priorityRule = {
        gapId: gapIdMatch[1].trim(),
        reason: reasonMatch ? reasonMatch[1].trim() : '',
      };
    }
  }

  // Execution Rule
  const execBlock = text.match(/###\s*Execution Rule\s*\n([\s\S]*?)(?=###\s|$)/i);
  if (execBlock) {
    const validBlock = execBlock[1].match(/Valid active tasks:\s*\n([\s\S]*?)(?=- Rejected|$)/i);
    const rejectedBlock = execBlock[1].match(/Rejected tasks:\s*\n([\s\S]*?)(?=###|$)/i);
    const validTasks = extractBulletList(validBlock?.[1] || '');
    const rejectedRaw = extractBulletList(rejectedBlock?.[1] || '');
    const rejectedTasks = rejectedRaw.map(s => {
      const parts = s.split(/\s+--\s+/);
      return { task: parts[0] || s, reason: parts[1] || '' };
    });
    rules.executionRule = { validTasks, rejectedTasks };
  }

  // Evidence Promotion Rule
  const evidenceBlock = text.match(/###\s*Evidence Promotion Rule\s*\n([\s\S]*?)(?=###\s|$)/i);
  if (evidenceBlock) {
    const blockedClaims = extractBulletList(evidenceBlock[1]);
    if (blockedClaims.length > 0) {
      rules.evidencePromotionRule = { blockedClaims };
    }
  }

  // Kill Rule
  const killBlock = text.match(/###\s*Kill Rule\s*\n([\s\S]*?)(?=###\s|$)/i);
  if (killBlock) {
    const rawTargets = extractBulletList(killBlock[1]);
    const targets = rawTargets.map(s => {
      const parts = s.split(/\s+--\s+/);
      return { target: parts[0] || s, reason: parts[1] || '' };
    });
    if (targets.length > 0) {
      rules.killRule = { targets };
    }
  }

  // Deadline Rule
  const deadlineBlock = text.match(/###\s*Deadline Rule\s*\n([\s\S]*?)(?=###\s|$)/i);
  if (deadlineBlock) {
    const rawTargets = extractBulletList(deadlineBlock[1]);
    const targets = rawTargets.map(s => {
      // format: "target -- due YYYY-MM-DD -- forced outcome OUTCOME"
      const dateMatch = s.match(/due\s+(\d{4}-\d{2}-\d{2})/i);
      const outcomeMatch = s.match(/forced outcome\s+(.+)/i);
      const targetPart = s.split(/\s+--/)[0]?.trim() || s;
      return {
        target: targetPart,
        dueDate: dateMatch ? dateMatch[1] : '',
        forcedOutcome: outcomeMatch ? outcomeMatch[1].trim() : '',
      };
    });
    if (targets.length > 0) {
      rules.deadlineRule = { targets };
    }
  }

  // Contradiction Rule
  const contradictionBlock = text.match(/###\s*Contradiction Rule\s*\n([\s\S]*?)(?=###\s|$)/i);
  if (contradictionBlock) {
    const blockingContradictions = extractBulletList(contradictionBlock[1]);
    if (blockingContradictions.length > 0) {
      rules.contradictionRule = { blockingContradictions };
    }
  }

  // Architecture Validity Rule
  const archBlock = text.match(/###\s*Architecture Validity Rule\s*\n([\s\S]*?)(?=###\s|$)/i);
  if (archBlock) {
    const rawActions = extractBulletList(archBlock[1]);
    const blockedActions = rawActions.map(s => {
      const parts = s.split(/\s+--\s+/);
      return { action: parts[0] || s, reason: parts[1] || '' };
    });
    if (blockedActions.length > 0) {
      rules.architectureRule = { blockedActions };
    }
  }

  // Solution Contamination Rule
  const contamBlock = text.match(/###\s*Solution Contamination Rule\s*\n([\s\S]*?)(?=###\s|$)/i);
  if (contamBlock) {
    const rawTests = extractBulletList(contamBlock[1]);
    const invalidTests = rawTests.map(s => {
      const parts = s.split(/\s+--\s+/);
      return { test: parts[0] || s, reason: parts[1] || '' };
    });
    if (invalidTests.length > 0) {
      rules.contaminationRule = { invalidTests };
    }
  }

  // Readiness Gate Rule
  const readinessBlock = text.match(/###\s*Readiness Gate Rule\s*\n([\s\S]*?)(?=###\s|$)/i);
  if (readinessBlock) {
    const sellReadyRaw = extractSimple(readinessBlock[1], /Sell Ready:\s*(true|false|yes|no)/i);
    const sellReady = sellReadyRaw?.toLowerCase() === 'true' || sellReadyRaw?.toLowerCase() === 'yes';
    const rationaleMatch = readinessBlock[1].match(/Rationale:\s*(.+)/i);
    rules.readinessGateRule = {
      sellReady,
      rationale: rationaleMatch ? rationaleMatch[1].trim() : '',
    };
  }

  // Focus Rule
  const focusBlock = text.match(/###\s*Focus Rule\s*\n([\s\S]*?)(?=###\s|$)/i);
  if (focusBlock) {
    const activeMatch = focusBlock[1].match(/Active gaps count:\s*(\d+)\/(\d+)/i);
    if (activeMatch) {
      const deferredBlock = focusBlock[1].match(/deferred:\s*(.+)/i);
      const deferred = deferredBlock
        ? deferredBlock[1].split(/[,;]/).map(s => s.trim()).filter(Boolean)
        : [];
      rules.focusRule = {
        activeCount: parseInt(activeMatch[1], 10),
        maxActive: parseInt(activeMatch[2], 10),
        deferred,
      };
    }
  }

  return rules;
}

function parseReadinessHandoff(text: string): ReadinessHandoff {
  const approvedBlock = text.match(/###\s*Approved Actions for Downstream Systems\s*\n([\s\S]*?)(?=###\s|$)/i);
  const approvedActions = extractBulletList(approvedBlock?.[1] || '');

  const forbiddenBlock = text.match(/###\s*Explicitly Forbidden Actions\s*\n([\s\S]*?)(?=###\s|$)/i);
  const forbiddenActions = extractBulletList(forbiddenBlock?.[1] || '');

  const constraintsBlock = text.match(/###\s*Allowed Constraints\s*\n([\s\S]*?)(?=###\s|$)/i);
  const constraintsText = constraintsBlock?.[1] || '';
  const targetSegment = extractSimple(constraintsText, /Target segment:\s*(.+)/i);
  const pricingBounds = extractSimple(constraintsText, /Pricing bounds:\s*(.+)/i);
  const architectureMode = extractSimple(constraintsText, /Architecture mode:\s*(.+)/i);
  const offerFraming = extractSimple(constraintsText, /Offer framing:\s*(.+)/i);
  const channelSet = extractSimple(constraintsText, /Channel set:\s*(.+)/i);

  const successBlock = text.match(/###\s*Success Signals Downstream Should Return\s*\n([\s\S]*?)(?=###\s|$)/i);
  const successSignals = extractBulletList(successBlock?.[1] || '');

  const failureBlock = text.match(/###\s*Failure Signals Downstream Should Return Immediately\s*\n([\s\S]*?)(?=###\s|$)/i);
  const failureSignals = extractBulletList(failureBlock?.[1] || '');

  return {
    approvedActions,
    forbiddenActions,
    allowedConstraints: { targetSegment, pricingBounds, architectureMode, offerFraming, channelSet },
    successSignals,
    failureSignals,
  };
}

function parseGovernorEscalations(text: string): Escalation[] {
  const escalations: Escalation[] = [];

  // Each escalation starts with "### Escalation: {title}"
  const blocks = text.split(/(?=###\s+Escalation:\s*)/i);

  for (const block of blocks) {
    const titleMatch = block.match(/###\s+Escalation:\s*(.+)/i);
    if (!titleMatch) continue;

    const title = titleMatch[1].trim();
    const gapIdMatch = title.match(/\(G-(\d+)\)/i);
    const gapId = gapIdMatch ? `G-${gapIdMatch[1].padStart(2, '0')}` : undefined;

    const decisionTypeRaw = extractDashField(block, 'Decision Type');
    let decisionType: Escalation['decisionType'];
    if (decisionTypeRaw) {
      const upper = decisionTypeRaw.toUpperCase();
      if (upper === 'VALUES') decisionType = 'VALUES';
      else if (upper === 'GROUND_TRUTH') decisionType = 'GROUND_TRUTH';
      else if (upper === 'JUDGMENT') decisionType = 'JUDGMENT';
    }

    const blastRaw = extractDashField(block, 'Blast Radius');
    let blastRadius: BlastRadius | undefined;
    if (blastRaw) {
      const upper = blastRaw.toUpperCase();
      if (upper === 'HIGH') blastRadius = 'HIGH';
      else if (upper === 'MEDIUM') blastRadius = 'MEDIUM';
      else if (upper === 'LOW') blastRadius = 'LOW';
    }

    const decisionNeeded = extractDashField(block, 'Decision Needed') || '';
    const whySystemCannotDecide = extractDashField(block, 'Why System Cannot Decide');
    const systemRecommendation = extractDashField(block, 'System Recommendation');
    const whatIsAtStake = extractDashField(block, 'What Is at Stake');

    const statusRaw = extractDashField(block, 'Status') || 'OPEN';
    const status: 'OPEN' | 'RESOLVED' = statusRaw.toUpperCase() === 'RESOLVED' ? 'RESOLVED' : 'OPEN';

    // Options block
    const optionsBlock = block.match(/-\s*Options:\s*\n([\s\S]*?)(?=-\s*System Recommendation:|-\s*What Is|$)/i);
    const options: Escalation['options'] = [];
    if (optionsBlock) {
      for (const line of optionsBlock[1].split('\n')) {
        const t = line.trim();
        // "  - A: {option} -> {consequence}"
        const optMatch = t.match(/^-\s+([A-Z]):\s*(.+?)\s*->\s*(.+)/);
        if (optMatch) {
          options.push({ label: optMatch[1], option: optMatch[2].trim(), consequence: optMatch[3].trim() });
        }
      }
    }

    escalations.push({
      title,
      gapId,
      decisionType,
      blastRadius,
      decisionNeeded,
      whySystemCannotDecide,
      options,
      systemRecommendation,
      whatIsAtStake,
      status,
    });
  }

  return escalations;
}

function parseNextCyclePlan(text: string): NextCyclePlan {
  // Top 3 actions — numbered list
  const topActionsBlock = text.match(/\*\*Top 3 actions for next pass\*\*\s*\n([\s\S]*?)(?=\*\*|\n---|\n##|$)/i);
  const topActions: string[] = [];
  if (topActionsBlock) {
    for (const line of topActionsBlock[1].split('\n')) {
      const match = line.trim().match(/^\d+\.\s*(.+)/);
      if (match) topActions.push(match[1].trim());
    }
  }

  const changesBlock = text.match(/\*\*Expected register changes if successful\*\*\s*\n([\s\S]*?)(?=\*\*|\n---|\n##|$)/i);
  const expectedChanges = extractBulletList(changesBlock?.[1] || '');

  const reRunDate = extractSimple(text, /\*\*Re-run date:\*\*\s*(.+)/i);

  return { topActions, expectedChanges, reRunDate };
}

// ============================================================
// Utility helpers
// ============================================================

function extractDashField(text: string, label: string): string | undefined {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`-\\s*\\*\\*${escaped}:\\*\\*\\s*(.+)`, 'i');
  const match = text.match(pattern);
  return match ? match[1].trim() : undefined;
}

function extractBulletList(text: string): string[] {
  const items: string[] = [];
  for (const line of text.split('\n')) {
    const t = line.trim();
    if (t.startsWith('-')) {
      const item = t.replace(/^-\s*/, '').trim();
      if (item && !item.startsWith('{')) items.push(item);
    }
  }
  return items;
}

function parseOptionalNumber(raw: string | undefined): number | undefined {
  if (!raw) return undefined;
  const n = parseFloat(raw.replace(/[^0-9.-]/g, ''));
  return isNaN(n) ? undefined : n;
}

function parseGapStatus(s: string): GapStatus {
  const upper = s.toUpperCase().replace(/\s+/g, '_');
  if (upper === 'IN_PROGRESS') return 'IN_PROGRESS';
  if (upper === 'RESOLVED') return 'RESOLVED';
  if (upper === 'BLOCKED') return 'BLOCKED';
  return 'OPEN';
}

function parseEvidenceTier(raw: string | undefined): EpistemicTier | undefined {
  if (!raw) return undefined;
  const upper = raw.trim().toUpperCase();
  if (upper === 'T1') return 'T1';
  if (upper === 'T2') return 'T2';
  if (upper === 'T3') return 'T3';
  return undefined;
}

// ============================================================
// Main export
// ============================================================

export function parseGapAnalysis(markdown: string): GapAnalysisParseResult {
  const warnings: ParseWarning[] = [];
  let fieldsAttempted = 0;
  let fieldsExtracted = 0;

  if (!markdown || markdown.trim().length === 0) {
    return {
      gapAnalysis: emptyGapAnalysis(),
      warnings: [{ section: 'root', field: 'document', message: 'Empty gap analysis document', severity: 'error' }],
      parseCompleteness: 0,
    };
  }

  const sections = splitGapSections(markdown);

  // Metadata from root section
  const rootText = sections.get('root')?.rawText ?? markdown.split(/\n##\s/)[0] ?? '';
  fieldsAttempted += 5;
  const metadata = parseGapAnalysisMetadata(rootText);
  if (metadata.created) fieldsExtracted++;
  if (metadata.lastRun) fieldsExtracted++;
  if (metadata.sourceRegisterVersion !== undefined) fieldsExtracted++;
  if (metadata.businessMode) fieldsExtracted++;
  fieldsExtracted++; // sellReady always present

  // Gate Summary
  fieldsAttempted += 3;
  const gateSummarySection = sections.get('gateSummary');
  let gateSummary: GateSummary = { reasons: [], predicateChecks: [], constraints: [] };
  if (gateSummarySection) {
    gateSummary = parseGateSummary(gateSummarySection.rawText);
    if (gateSummary.decision) fieldsExtracted++;
    if (gateSummary.reasons.length > 0) fieldsExtracted++;
    if (gateSummary.predicateChecks.length > 0) fieldsExtracted++;
  } else {
    warnings.push({ section: 'gateSummary', field: 'section', message: 'Gate Summary section not found', severity: 'warning' });
  }

  // Ranked Gaps
  fieldsAttempted += 1;
  const rankedGapsSection = sections.get('rankedGaps');
  let rankedGaps: GapRecord[] = [];
  if (rankedGapsSection) {
    const tables = getTablesFromNodes(rankedGapsSection.nodes);
    const ranked = tables.find(t => {
      const rows = tableToRows(t);
      return rows.length > 1 && rows[0].some(h => /Rank/i.test(h));
    });
    if (ranked) {
      rankedGaps = parseRankedGapsTable(ranked);
      fieldsExtracted++;
    }
  } else {
    warnings.push({ section: 'rankedGaps', field: 'section', message: 'Ranked Gaps section not found', severity: 'info' });
  }

  // Full Gap Records
  fieldsAttempted += 1;
  const fullGapSection = sections.get('fullGapRecords');
  let fullGapRecords: GapRecord[] = [];
  if (fullGapSection) {
    fullGapRecords = parseFullGapRecords(fullGapSection.rawText);
    if (fullGapRecords.length > 0) fieldsExtracted++;
  } else {
    warnings.push({ section: 'fullGapRecords', field: 'section', message: 'Full Gap Records section not found', severity: 'info' });
  }

  // Contradictions
  fieldsAttempted += 1;
  const contradictionsSection = sections.get('contradictions');
  let contradictions: Contradiction[] = [];
  if (contradictionsSection) {
    const tables = getTablesFromNodes(contradictionsSection.nodes);
    if (tables.length > 0) {
      contradictions = parseContradictionsTable(tables[0]);
      if (contradictions.length > 0) fieldsExtracted++;
    }
  }

  // Destruction Outcomes
  fieldsAttempted += 2;
  const destructionSection = sections.get('destructionOutcomes');
  let destructionOutcomes: DestructionOutcomes = {
    constraintInversions: [],
    evidenceConcentrationRisk: [],
    killSignalAudit: [],
  };
  if (destructionSection) {
    destructionOutcomes = parseDestructionOutcomes(destructionSection.rawText, destructionSection.nodes);
    if (destructionOutcomes.preMortemSummary) fieldsExtracted++;
    if (destructionOutcomes.constraintInversions.length > 0) fieldsExtracted++;
  } else {
    warnings.push({ section: 'destructionOutcomes', field: 'section', message: 'Destruction Outcomes section not found', severity: 'info' });
  }

  // Decision Rules
  fieldsAttempted += 1;
  const decisionRulesSection = sections.get('decisionRules');
  let decisionRulesApplication: DecisionRulesApplication = {};
  if (decisionRulesSection) {
    decisionRulesApplication = parseDecisionRulesApplication(decisionRulesSection.rawText);
    fieldsExtracted++;
  }

  // Readiness Handoff
  fieldsAttempted += 2;
  const handoffSection = sections.get('readinessHandoff');
  let readinessHandoff: ReadinessHandoff = {
    approvedActions: [],
    forbiddenActions: [],
    allowedConstraints: {},
    successSignals: [],
    failureSignals: [],
  };
  if (handoffSection) {
    readinessHandoff = parseReadinessHandoff(handoffSection.rawText);
    if (readinessHandoff.approvedActions.length > 0) fieldsExtracted++;
    if (readinessHandoff.forbiddenActions.length > 0) fieldsExtracted++;
  } else {
    warnings.push({ section: 'readinessHandoff', field: 'section', message: 'Readiness Handoff section not found', severity: 'info' });
  }

  // Governor Escalations
  fieldsAttempted += 1;
  const escalationsSection = sections.get('governorEscalations');
  let governorEscalations: Escalation[] = [];
  if (escalationsSection) {
    governorEscalations = parseGovernorEscalations(escalationsSection.rawText);
    if (governorEscalations.length > 0) fieldsExtracted++;
  }

  // Next Cycle Plan
  fieldsAttempted += 1;
  const nextCycleSection = sections.get('nextCyclePlan');
  let nextCyclePlan: NextCyclePlan = { topActions: [], expectedChanges: [] };
  if (nextCycleSection) {
    nextCyclePlan = parseNextCyclePlan(nextCycleSection.rawText);
    if (nextCyclePlan.topActions.length > 0) fieldsExtracted++;
  } else {
    warnings.push({ section: 'nextCyclePlan', field: 'section', message: 'Next Cycle Plan section not found', severity: 'info' });
  }

  const gapAnalysis: GapAnalysis = {
    metadata,
    gateSummary,
    rankedGaps,
    fullGapRecords,
    contradictions,
    destructionOutcomes,
    decisionRulesApplication,
    readinessHandoff,
    governorEscalations,
    nextCyclePlan,
  };

  const parseCompleteness = fieldsAttempted > 0 ? fieldsExtracted / fieldsAttempted : 0;
  return { gapAnalysis, warnings, parseCompleteness };
}

function emptyGapAnalysis(): GapAnalysis {
  return {
    metadata: { sellReady: false },
    gateSummary: { reasons: [], predicateChecks: [], constraints: [] },
    rankedGaps: [],
    fullGapRecords: [],
    contradictions: [],
    destructionOutcomes: { constraintInversions: [], evidenceConcentrationRisk: [], killSignalAudit: [] },
    decisionRulesApplication: {},
    readinessHandoff: {
      approvedActions: [],
      forbiddenActions: [],
      allowedConstraints: {},
      successSignals: [],
      failureSignals: [],
    },
    governorEscalations: [],
    nextCyclePlan: { topActions: [], expectedChanges: [] },
  };
}
