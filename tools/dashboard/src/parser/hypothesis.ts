import type {
  Hypothesis,
  HypothesisId,
  ConfidenceState,
  ParseWarning,
  ChannelStrategy,
  ScenarioAnalysis,
  ScenarioEntry,
  WhyNow,
  PainIntensity,
  ProblemFrequency,
} from '../model/types';
import type { Section } from './sections';
import { extractTablesFromNodes, tableToRows } from './sections';
import {
  extractField,
  extractPriorUpdates,
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
  parsePainScoringTable,
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
  const confidenceRaw = (extractField(text, 'Confidence State') ?? extractField(text, 'Confidence'))
    ?.split('\n')[0]
    .trim();
  const confidence = confidenceRaw && CONFIDENCE_VALUES.has(confidenceRaw.toUpperCase())
    ? (confidenceRaw.toUpperCase() as ConfidenceState)
    : undefined;

  const killCondition = extractField(text, 'Kill Condition');
  const lastUpdated = extractField(text, 'Last Updated');
  const updateRationale = extractField(text, 'Update Rationale');
  const priorUpdates = extractPriorUpdates(text);

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
    priorUpdates: priorUpdates.length > 0 ? priorUpdates : undefined,
  };

  // Problem-specific extensions
  if (id === 'problem') {
    parseProblemExtensions(text, hypothesis);
  }

  // Segment-specific extensions
  if (id === 'segment') {
    parseSegmentExtensions(section, text, hypothesis);
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

function parseSegmentExtensions(section: Section, text: string, hypothesis: Hypothesis): void {
  hypothesis.triggerEvent = extractField(text, 'Trigger Event');
  hypothesis.budgetOwner = extractField(text, 'Budget Owner');
  hypothesis.currentSpend = extractField(text, 'Current Spend');
  hypothesis.observableFilters = extractObservableFilters(text);
  if (hypothesis.observableFilters.length === 0) hypothesis.observableFilters = undefined;

  const accessPaths = extractListItems(text, 'Access Paths');
  hypothesis.accessPaths = accessPaths.length > 0 ? accessPaths : undefined;

  // Pain scoring table
  const tables = extractTablesFromNodes(section.nodes);
  for (const table of tables) {
    const rows = tableToRows(table);
    if (rows.length < 2) continue;
    const headers = rows[0];
    if (headers.some(h => /Segment/i.test(h)) && headers.some(h => /Frequency/i.test(h))) {
      const entries = parsePainScoringTable(table);
      if (entries.length > 0) hypothesis.painScoring = entries;
    }
  }
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

    // Mode thresholds (heading col may be "Metric" or "Threshold")
    if ((headers.some(h => /Metric/i.test(h)) || headers.some(h => /Threshold/i.test(h))) && headers.some(h => /Required/i.test(h))) {
      hypothesis.modeThresholds = parseModeThresholdsTable(table);
    }

    // Scenario table: Scenario | Subs | ARPU | Revenue | Costs | Contribution | Verdict
    if (headers.some(h => /^Scenario$/i.test(h.trim())) && headers.some(h => /Verdict/i.test(h))) {
      const scenarioMap: Record<string, ScenarioEntry> = {};
      for (const row of rows.slice(1)) {
        const name = (row[0] || '').toLowerCase().trim();
        if (!name || name.startsWith('-') || name.startsWith('|')) continue;
        scenarioMap[name] = {
          subs:         row[1] || undefined,
          arpu:         row[2] || undefined,
          revenue:      row[3] || undefined,
          costs:        row[4] || undefined,
          contribution: row[5] || undefined,
          narrative:    row[6] || row[row.length - 1] || '',
        };
      }
      const result: ScenarioAnalysis = {};
      const opt  = Object.entries(scenarioMap).find(([k]) => k.includes('optimistic'));
      const base = Object.entries(scenarioMap).find(([k]) => k.includes('base'));
      const pess = Object.entries(scenarioMap).find(([k]) => k.includes('pessimistic'));
      const kill = Object.entries(scenarioMap).find(([k]) => k.includes('kill'));
      if (opt)  result.optimistic  = opt[1];
      if (base) result.base        = base[1];
      if (pess) result.pessimistic = pess[1];
      if (kill) result.kill        = kill[1].narrative;
      if (result.optimistic || result.base || result.pessimistic) {
        hypothesis.scenarioAnalysis = result;
      }
    }

  }

  // Scenario analysis (text-based fallback — only if table parsing didn't find data)
  if (!hypothesis.scenarioAnalysis) {
    hypothesis.scenarioAnalysis = parseScenarioAnalysis(text);
  }
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
