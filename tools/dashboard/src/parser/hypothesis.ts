import type {
  Hypothesis,
  HypothesisId,
  ConfidenceState,
  ParseWarning,
  ChannelStrategy,
  ScenarioAnalysis,
  ScenarioEntry,
  WhyNow,
  RevenueModel,
  PriceHypothesis,
  CostStructure,
  PainIntensity,
  ProblemFrequency,
} from '../model/types';
import type { Section } from './sections';
import { extractTablesFromNodes, tableToRows, findTableNearHeading } from './sections';
import {
  extractField,
  extractEvidenceItems,
  extractResearchSources,
  extractAssumptions,
  extractPossibilitySpace,
  extractObservableFilters,
  extractDesiredState,
  extractCurrentState,
  extractListItems,
  extractBlockAfterLabel,
} from './fields';
import {
  parseCostStructureTable,
  parseChannelStrategyTable,
  parseModeThresholdsTable,
} from './tables';

const CONFIDENCE_VALUES: Set<string> = new Set(['UNVALIDATED', 'RESEARCHED', 'SUPPORTED', 'BROKEN']);
const PAIN_INTENSITIES: Set<string> = new Set(['LOW', 'MODERATE', 'ACUTE', 'EXISTENTIAL']);
const FREQUENCIES: Set<string> = new Set(['DAILY', 'WEEKLY', 'MONTHLY', 'RARE']);

export function parseHypothesis(
  section: Section,
  id: HypothesisId
): { hypothesis: Hypothesis; warnings: ParseWarning[] } {
  const warnings: ParseWarning[] = [];
  const text = section.rawText;
  const sectionName = id;

  // Core fields
  const claim = extractField(text, 'Claim');
  const confidenceRaw = extractField(text, 'Confidence');
  const confidence = confidenceRaw && CONFIDENCE_VALUES.has(confidenceRaw.toUpperCase())
    ? (confidenceRaw.toUpperCase() as ConfidenceState)
    : undefined;

  const killCondition = extractField(text, 'Kill Condition');
  const lastUpdated = extractField(text, 'Last Updated');
  const updateRationale = extractField(text, 'Update Rationale');

  // Desired/Current State
  const desiredState = extractDesiredState(text);
  const currentState = extractCurrentState(text);

  // Structured sub-sections
  const possibilitySpace = extractPossibilitySpace(text);
  const evidenceResult = extractEvidenceItems(text, sectionName);
  const sourcesResult = extractResearchSources(text, sectionName);
  const assumptionsResult = extractAssumptions(text, sectionName);

  warnings.push(...evidenceResult.warnings, ...sourcesResult.warnings, ...assumptionsResult.warnings);

  const hypothesis: Hypothesis = {
    id,
    claim,
    confidence,
    desiredState,
    currentState,
    possibilitySpace,
    evidence: evidenceResult.items,
    researchSources: sourcesResult.items,
    assumptions: assumptionsResult.items,
    killCondition,
    lastUpdated,
    updateRationale,
  };

  // Problem-specific extensions
  if (id === 'problem') {
    parseProblemExtensions(text, hypothesis);
  }

  // Segment-specific extensions
  if (id === 'segment') {
    parseSegmentExtensions(text, hypothesis);
  }

  // Unit Economics extensions
  if (id === 'unitEconomics') {
    parseUnitEconomicsExtensions(section, hypothesis, warnings);
  }

  return { hypothesis, warnings };
}

function parseProblemExtensions(text: string, hypothesis: Hypothesis): void {
  const painRaw = extractField(text, 'Pain Intensity');
  if (painRaw && PAIN_INTENSITIES.has(painRaw.toUpperCase())) {
    hypothesis.painIntensity = painRaw.toUpperCase() as PainIntensity;
  }

  const freqRaw = extractField(text, 'Frequency');
  if (freqRaw && FREQUENCIES.has(freqRaw.toUpperCase())) {
    hypothesis.frequency = freqRaw.toUpperCase() as ProblemFrequency;
  }

  // Why Now
  const whyNowBlock = extractBlockAfterLabel(text, 'Why Now');
  if (whyNowBlock) {
    const whyNow: WhyNow = {
      enablers: [],
      changesLast36Months: [],
    };

    let mode: 'enablers' | 'changes' | 'why5' | null = null;
    for (const line of whyNowBlock.split('\n')) {
      const trimmed = line.trim();
      if (/^-\s*Enablers:/i.test(trimmed)) { mode = 'enablers'; continue; }
      if (/^-\s*Changes in last 36 months:/i.test(trimmed)) { mode = 'changes'; continue; }
      if (/^-\s*Why not 5 years ago:/i.test(trimmed)) {
        const val = trimmed.replace(/^-\s*Why not 5 years ago:\s*/i, '');
        if (val) whyNow.whyNot5YearsAgo = val;
        mode = 'why5';
        continue;
      }
      if (trimmed.startsWith('-') && mode) {
        const item = trimmed.replace(/^-\s*/, '');
        if (item && !item.startsWith('{')) {
          if (mode === 'enablers') whyNow.enablers.push(item);
          else if (mode === 'changes') whyNow.changesLast36Months.push(item);
        }
      }
    }
    if (whyNow.enablers.length > 0 || whyNow.changesLast36Months.length > 0 || whyNow.whyNot5YearsAgo) {
      hypothesis.whyNow = whyNow;
    }
  }

  // Workarounds
  hypothesis.workarounds = extractListItems(text, 'Workarounds');
  if (hypothesis.workarounds.length === 0) hypothesis.workarounds = undefined;
}

function parseSegmentExtensions(text: string, hypothesis: Hypothesis): void {
  hypothesis.triggerEvent = extractField(text, 'Trigger Event');
  hypothesis.budgetOwner = extractField(text, 'Budget Owner');
  hypothesis.currentSpend = extractField(text, 'Current Spend');
  hypothesis.observableCharacteristics = extractObservableFilters(text);
  if (hypothesis.observableCharacteristics.length === 0) hypothesis.observableCharacteristics = undefined;

  const accessPaths = extractListItems(text, 'Access Paths');
  hypothesis.accessPaths = accessPaths.length > 0 ? accessPaths : undefined;
}

function parseUnitEconomicsExtensions(
  section: Section,
  hypothesis: Hypothesis,
  _warnings: ParseWarning[]
): void {
  const text = section.rawText;

  // Revenue Model
  const modelType = extractField(text, 'Type');
  const pricingUnit = extractField(text, 'Pricing Unit');
  const billingMotion = extractField(text, 'Billing Motion');
  if (modelType || pricingUnit || billingMotion) {
    hypothesis.revenueModel = { modelType, pricingUnit, billingMotion };
  }

  // Price Hypothesis
  const priceRaw = extractField(text, 'Price Hypothesis');
  if (priceRaw) {
    const priceMatch = priceRaw.match(/(\S+)\s*--\s*(\S+)\s*(\w+)?\s*(?:\[([T][123])\])?/);
    if (priceMatch) {
      hypothesis.priceHypothesis = {
        low: priceMatch[1],
        high: priceMatch[2],
        currency: priceMatch[3],
        tier: priceMatch[4] as any,
      };
    }
  }

  // Tables
  const tables = extractTablesFromNodes(section.nodes);

  for (const table of tables) {
    const rows = tableToRows(table);
    if (rows.length < 2) continue;
    const headers = rows[0];

    // Cost structure
    if (headers.some(h => /Category/i.test(h)) && headers.some(h => /Monthly/i.test(h))) {
      const entries = parseCostStructureTable(table);
      if (entries.length > 0) {
        // Extract derived fields
        const grossMarginRange = extractField(text, 'Gross margin');
        const burnRateRange = extractField(text, 'Burn rate');
        const runwayMonthsRange = extractField(text, 'Runway');

        hypothesis.costStructure = {
          entries,
          grossMarginRange: grossMarginRange || undefined,
          burnRateRange: burnRateRange || undefined,
          runwayMonthsRange: runwayMonthsRange || undefined,
        };
      }
    }

    // Channel strategy
    if (headers.some(h => /Channel/i.test(h)) && headers.some(h => /CAC/i.test(h))) {
      const channels = parseChannelStrategyTable(table);
      if (channels.length > 0) {
        hypothesis.channelStrategy = {
          channels,
          ...parseChannelStrategyMetadata(text),
        };
      }
    }

    // Mode thresholds
    if (headers.some(h => /Metric/i.test(h)) && headers.some(h => /Required/i.test(h))) {
      hypothesis.modeThresholds = parseModeThresholdsTable(table);
    }
  }

  // Scenario analysis
  hypothesis.scenarioAnalysis = parseScenarioAnalysis(text);
}

function parseChannelStrategyMetadata(text: string): Omit<ChannelStrategy, 'channels'> {
  const result: Omit<ChannelStrategy, 'channels'> = {};

  const coherenceMatch = text.match(/-\s*Channel-economics coherence:\s*(.+)/i);
  if (coherenceMatch) result.coherence = coherenceMatch[1].trim();

  const acvMatch = text.match(/-\s*ACV-channel constraint:\s*(.+)/i);
  if (acvMatch) result.acvConstraint = acvMatch[1].trim();

  const seqMatch = text.match(/-\s*Sequencing rationale:\s*(.+)/i);
  if (seqMatch) result.sequencingRationale = seqMatch[1].trim();

  return result;
}

function parseScenarioAnalysis(text: string): ScenarioAnalysis | undefined {
  const scenarios: ScenarioAnalysis = {};

  // Try new format first: Scenario Analysis block with sub-items
  const saBlock = extractBlockAfterLabel(text, 'Scenario Analysis');
  if (saBlock) {
    const optMatch = saBlock.match(/-\s*Optimistic:\s*(.+)/i);
    if (optMatch) scenarios.optimistic = { narrative: optMatch[1].trim() };

    const baseMatch = saBlock.match(/-\s*Base:\s*(.+)/i);
    if (baseMatch) scenarios.base = { narrative: baseMatch[1].trim() };

    const pessMatch = saBlock.match(/-\s*Pessimistic:\s*(.+)/i);
    if (pessMatch) scenarios.pessimistic = { narrative: pessMatch[1].trim() };

    const killMatch = saBlock.match(/-\s*Kill:\s*(.+)/i);
    if (killMatch) scenarios.kill = killMatch[1].trim();
  }

  // Legacy: separate bold blocks
  if (!scenarios.base) {
    const baseMatch = text.match(/\*\*Base Case[^*]*\*\*:?\s*\n([\s\S]*?)(?=\*\*(?:Optimistic|Pessimistic|Kill)|---|\n##)/i);
    if (baseMatch) scenarios.base = parseScenarioBlock(baseMatch[1]);
  }

  if (!scenarios.optimistic) {
    const optMatch = text.match(/\*\*Optimistic[^*]*\*\*:?\s*\n([\s\S]*?)(?=\*\*(?:Pessimistic|Kill|Base)|---|\n##)/i);
    if (optMatch) scenarios.optimistic = parseScenarioBlock(optMatch[1]);
  }

  if (!scenarios.pessimistic) {
    const pessMatch = text.match(/\*\*Pessimistic[^*]*\*\*:?\s*\n([\s\S]*?)(?=\*\*(?:Kill|Base|Optimistic)\b|---|\n##)/i);
    if (pessMatch) scenarios.pessimistic = parseScenarioBlock(pessMatch[1]);
  }

  if (!scenarios.kill) {
    const killMatch = text.match(/\*\*Kill Scenario:\*\*\s*(.+(?:\n(?!\*\*).+)*)/m);
    if (killMatch) scenarios.kill = killMatch[1].trim();
  }

  if (!scenarios.base && !scenarios.optimistic && !scenarios.pessimistic && !scenarios.kill) {
    return undefined;
  }

  return scenarios;
}

function parseScenarioBlock(block: string): ScenarioEntry {
  const lines = block.split('\n').map(l => l.trim()).filter(l => l.startsWith('-'));
  const narrative = lines.map(l => l.replace(/^-\s*/, '')).join('; ');

  const entry: ScenarioEntry = { narrative };

  for (const line of lines) {
    const text = line.replace(/^-\s*/, '');
    if (/LTV:CAC/i.test(text)) {
      const rangeMatch = text.match(/(\d+[\d.:]*(?:\s*--?\s*\d+[\d.:]*)?)/);
      if (rangeMatch) entry.ltvCacRange = rangeMatch[1];
    }
    if (/Payback/i.test(text)) {
      const rangeMatch = text.match(/(\d+[\d.]*(?:\s*--?\s*\d+[\d.]*)?)\s*months?/i);
      if (rangeMatch) entry.paybackMonthsRange = rangeMatch[1];
    }
    if (/Gross margin/i.test(text)) {
      const rangeMatch = text.match(/([\d.]+(?:\s*--?\s*[\d.]+)?)\s*%/);
      if (rangeMatch) entry.grossMarginRange = rangeMatch[1];
    }
  }

  return entry;
}

export function emptyHypothesis(id: HypothesisId): Hypothesis {
  return {
    id,
    evidence: [],
    researchSources: [],
    assumptions: [],
  };
}
