import type { Table } from 'mdast';
import type {
  EpistemicTier,
  CostEntry,
  ChannelEntry,
  ModeThreshold,
  ConstraintInversion,
  EvidenceConcentrationEntry,
  KillSignalAuditEntry,
  FeatureMapEntry,
  HypothesisConstraint,
  ClauseValidation,
  ClauseStatus,
  VPClauseType,
  GapLedgerEntry,
  GapStatus,
  GTMPhase,
  Contradiction,
  GapRecord,
} from '../model/types';
import { tableToRows } from './sections';

function parseTier(s: string): EpistemicTier | undefined {
  const cleaned = s.trim().toUpperCase();
  const match = cleaned.match(/T([123])/);
  return match ? (`T${match[1]}` as EpistemicTier) : undefined;
}

function parseNumber(s: string): number {
  const n = parseFloat(s.replace(/[^0-9.-]/g, ''));
  return isNaN(n) ? 0 : n;
}

function parseGapStatus(s: string): GapStatus {
  const upper = s.toUpperCase().replace(/\s+/g, '_');
  if (upper === 'IN_PROGRESS') return 'IN_PROGRESS';
  if (upper === 'RESOLVED') return 'RESOLVED';
  if (upper === 'BLOCKED') return 'BLOCKED';
  return 'OPEN';
}

export function parseCostStructureTable(table: Table): CostEntry[] {
  const rows = tableToRows(table);
  if (rows.length < 2) return [];

  const headers = rows[0];
  const hasItems = headers.some(h => /Items/i.test(h));

  return rows.slice(1).map(row => {
    const category = row[0] || '';
    const typeFromCategory = /^Variable/i.test(category) ? 'Variable' as const : 'Fixed' as const;

    if (hasItems) {
      return {
        category,
        items: row[1] || '',
        type: typeFromCategory,
        monthlyCostRange: row[2] || '',
        tier: parseTier(row[3] || ''),
        source: row[4] || undefined,
      };
    }
    return {
      category,
      items: '',
      type: (row[1]?.trim() === 'Variable' ? 'Variable' : 'Fixed') as 'Fixed' | 'Variable',
      monthlyCostRange: row[2] || '',
      tier: parseTier(row[3] || ''),
    };
  });
}

export function parseChannelStrategyTable(table: Table): ChannelEntry[] {
  const rows = tableToRows(table);
  if (rows.length < 2) return [];

  return rows.slice(1).map(row => ({
    channel: row[0] || '',
    segmentReach: row[1] || '',
    cacEstimate: row[2] || '',
    investmentSplit: row[3] || '',
    tier: parseTier(row[4] || ''),
    source: row[5] || undefined,
  }));
}

export function parseModeThresholdsTable(table: Table): ModeThreshold[] {
  const rows = tableToRows(table);
  if (rows.length < 2) return [];

  return rows.slice(1).map(row => ({
    metric: row[0] || '',
    required: row[1] || '',
    estimate: row[2] || '',
    tier: parseTier(row[3] || ''),
    source: row[4] || undefined,
  }));
}

export function parseConstraintInversionTable(table: Table): ConstraintInversion[] {
  const rows = tableToRows(table);
  if (rows.length < 2) return [];

  return rows.slice(1).map(row => ({
    assumption: row[0] || '',
    consequence: row[1] || '',
    survives: row[2] || '',
  }));
}

export function parseEvidenceConcentrationTable(table: Table): EvidenceConcentrationEntry[] {
  const rows = tableToRows(table);
  if (rows.length < 2) return [];

  return rows.slice(1).map(row => ({
    source: row[0] || '',
    hypothesesSupported: row[1] || '',
    riskLevel: row[2] || '',
  }));
}

export function parseKillSignalAuditTable(table: Table): KillSignalAuditEntry[] {
  const rows = tableToRows(table);
  if (rows.length < 2) return [];

  return rows.slice(1).map(row => ({
    signal: row[0] || '',
    ignored: /yes/i.test(row[1] || '') || /yes/i.test(row[2] || ''),
    consequenceIfIgnored: row[3] || row[2] || '',
  }));
}

export function parseFeatureMapTable(table: Table): FeatureMapEntry[] {
  const rows = tableToRows(table);
  if (rows.length < 2) return [];

  return rows.slice(1).map(row => {
    const priorityStr = (row[3] || '').toUpperCase().replace(/\s+/g, '_');
    let priority: 'MVP' | 'POST_MVP' | 'FUTURE' | undefined;
    if (priorityStr === 'MVP') priority = 'MVP';
    else if (priorityStr.includes('POST')) priority = 'POST_MVP';
    else if (priorityStr.includes('FUTURE')) priority = 'FUTURE';

    return {
      feature: row[0] || '',
      solvesProblem: row[1] || '',
      jobDimension: row[2] || undefined,
      priority,
      tier: parseTier(row[4] || ''),
    };
  });
}

export function parseConstraintsTable(table: Table): HypothesisConstraint[] {
  const rows = tableToRows(table);
  if (rows.length < 2) return [];

  return rows.slice(1).map(row => ({
    fromHypothesis: row[0] || '',
    constraint: row[1] || '',
    ifChanges: row[2] || '',
  }));
}

export function parseClauseValidationTable(table: Table): ClauseValidation[] {
  const rows = tableToRows(table);
  if (rows.length < 2) return [];

  return rows.slice(1).map(row => {
    const clause = row[0] || '';
    const statusStr = (row[1] || '').toUpperCase();
    let status: ClauseStatus | undefined;
    if (statusStr.includes('TESTED') && !statusStr.includes('UNTESTED')) status = 'TESTED';
    else if (statusStr.includes('UNTESTED')) status = 'UNTESTED';
    else if (statusStr.includes('CONTRADICTED')) status = 'CONTRADICTED';

    // Try to detect clause type from text
    let clauseType: VPClauseType | undefined;
    const clauseLower = clause.toLowerCase();
    if (clauseLower.includes('target')) clauseType = 'TARGET_CUSTOMER';
    else if (clauseLower.includes('problem')) clauseType = 'PROBLEM';
    else if (clauseLower.includes('category')) clauseType = 'CATEGORY';
    else if (clauseLower.includes('differentiator')) clauseType = 'DIFFERENTIATOR';
    else if (clauseLower.includes('alternative')) clauseType = 'CURRENT_ALTERNATIVE';
    else if (clauseLower.includes('unique')) clauseType = 'UNIQUE_CAPABILITY';

    return {
      clause,
      clauseType,
      status,
      tier: parseTier(row[2] || ''),
      evidence: row[3] || undefined,
    };
  });
}

export function parseGapLedgerTable(table: Table): GapLedgerEntry[] {
  const rows = tableToRows(table);
  if (rows.length < 2) return [];

  return rows.slice(1).map(row => ({
    rank: row[0] ? parseInt(row[0], 10) || undefined : undefined,
    target: row[1] || '',
    dimension: row[2] || '',
    desiredCondition: row[3] || '',
    currentObservation: row[4] || '',
    priorityScore: row[5] ? parseNumber(row[5]) || undefined : undefined,
    recommendedAction: row[6] || '',
    status: parseGapStatus(row[7] || ''),
  }));
}

export function parseGTMChannelSequenceTable(table: Table): GTMPhase[] {
  const rows = tableToRows(table);
  if (rows.length < 2) return [];

  return rows.slice(1).map(row => ({
    phaseName: row[0] || '',
    channels: (row[1] || '').split(/[,;]/).map(s => s.trim()).filter(Boolean),
    gateCondition: row[2] || undefined,
    targetKPIs: row[3] ? { cacTarget: row[3] } : undefined,
    durationEstimate: row[4] || undefined,
    tier: parseTier(row[5] || ''),
  }));
}

export function parseContradictionsTable(table: Table): Contradiction[] {
  const rows = tableToRows(table);
  if (rows.length < 2) return [];

  return rows.slice(1).map(row => ({
    id: row[0] || undefined,
    between: row[1] || '',
    description: row[2] || '',
    impact: row[3] || '',
    requiredResolution: row[4] || '',
    blockExecution: /yes/i.test(row[5] || ''),
  }));
}

export function parseRankedGapsTable(table: Table): GapRecord[] {
  const rows = tableToRows(table);
  if (rows.length < 2) return [];

  return rows.slice(1).map(row => ({
    rank: row[0] ? parseInt(row[0], 10) || undefined : undefined,
    id: row[1] || undefined,
    target: row[2] || '',
    dimension: row[3] || '',
    desiredCondition: row[4] || '',
    currentObservation: row[5] || '',
    confidenceGap: row[6] ? parseNumber(row[6]) : undefined,
    evidenceWeakness: row[7] ? parseNumber(row[7]) : undefined,
    painUncertainty: row[8] ? parseNumber(row[8]) : undefined,
    timePenalty: row[9] ? parseNumber(row[9]) : undefined,
    blastRadiusWeight: row[10] ? parseNumber(row[10]) : undefined,
    finalPriorityScore: row[11] ? parseNumber(row[11]) : undefined,
    recommendedAction: row[12] ? { description: row[12] } : undefined,
    status: parseGapStatus(row[13] || ''),
  }));
}
