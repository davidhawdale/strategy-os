import type {
  GapLedger,
  GapLedgerEntry,
  Blocker,
  DecisionDeadline,
  BlastRadius,
  ParseWarning,
} from '../model/types';
import type { Section } from './sections';
import { extractTablesFromNodes, tableToRows } from './sections';
import { extractField } from './fields';
import { parseGapLedgerTable } from './tables';

export function parseGapLedgerSection(section: Section): { ledger: GapLedger; warnings: ParseWarning[] } {
  const warnings: ParseWarning[] = [];
  const text = section.rawText;

  const sellReadyRaw = extractField(text, 'Sell Ready');
  const sellReady = sellReadyRaw?.toLowerCase() === 'true' || sellReadyRaw?.toLowerCase() === 'yes';

  // Scale Ready may not exist in the gap ledger section; default to false
  const scaleReady = false;

  const lastRun = extractField(text, 'Last Run');

  // Ranked Gaps table
  const tables = extractTablesFromNodes(section.nodes);
  let rankedGaps: GapLedgerEntry[] = [];
  const rankedTable = tables.find(t => {
    const rows = tableToRows(t);
    return rows.length > 1 && rows[0].some(h => /Rank/i.test(h)) && rows[0].some(h => /Target/i.test(h));
  });
  if (rankedTable) {
    rankedGaps = parseGapLedgerTable(rankedTable);
  }

  // Open Gap Records (structured list under ### Open Gap Records)
  const gaps = parseOpenGapRecords(text);

  // Active Blockers
  const blockers = parseBlockers(text);

  // Decision Deadlines
  const decisionDeadlines = parseDecisionDeadlines(text);

  return {
    ledger: {
      gaps,
      rankedGaps,
      sellReady,
      scaleReady,
      lastRun,
      blockers,
      decisionDeadlines,
    },
    warnings,
  };
}

function parseOpenGapRecords(text: string): GapLedgerEntry[] {
  const entries: GapLedgerEntry[] = [];

  const block = text.match(/###\s*Open Gap Records\s*\n([\s\S]*?)(?=###\s|$)/i);
  if (!block) return entries;

  // Each gap starts with "- **Gap ID:**"
  const gapBlocks = block[1].split(/(?=^-\s*\*\*Gap ID:\*\*)/m);

  for (const gapBlock of gapBlocks) {
    const idMatch = gapBlock.match(/\*\*Gap ID:\*\*\s*(.+)/);
    if (!idMatch) continue;

    const target = extractListField(gapBlock, 'Target') || '';
    const dimension = extractListField(gapBlock, 'Dimension') || '';
    const desiredCondition = extractListField(gapBlock, 'Desired Condition') || '';
    const currentObservation = extractListField(gapBlock, 'Current Observation') || '';
    const priorityScoreRaw = extractListField(gapBlock, 'Final Priority Score');
    const statusRaw = extractListField(gapBlock, 'Status') || 'OPEN';

    const actionBlock = gapBlock.match(/-\s*Recommended Action:\s*\n([\s\S]*?)(?=-\s*Status:|$)/i);
    let recommendedAction = '';
    if (actionBlock) {
      const descMatch = actionBlock[1].match(/-\s*Description:\s*(.+)/i);
      recommendedAction = descMatch?.[1]?.trim() || '';
    }

    entries.push({
      target,
      dimension,
      desiredCondition,
      currentObservation,
      priorityScore: priorityScoreRaw ? parseInt(priorityScoreRaw, 10) || undefined : undefined,
      recommendedAction,
      status: parseGapStatus(statusRaw),
    });
  }

  return entries;
}

function parseBlockers(text: string): Blocker[] {
  const blockers: Blocker[] = [];

  const block = text.match(/###\s*Active Blockers\s*\n([\s\S]*?)(?=###\s|$)/i);
  if (!block) return blockers;

  for (const line of block[1].split('\n')) {
    const trimmed = line.trim();
    if (!trimmed.startsWith('-')) continue;

    const item = trimmed.replace(/^-\s*/, '');
    // Format: "target: reason [HIGH | MEDIUM | LOW]"
    const match = item.match(/^(.+?):\s*(.+?)\s*\[(\w+)\]/);
    if (match) {
      const blastStr = match[3].toUpperCase();
      blockers.push({
        target: match[1].trim(),
        reason: match[2].trim(),
        blastRadius: (['HIGH', 'MEDIUM', 'LOW'].includes(blastStr) ? blastStr : 'MEDIUM') as BlastRadius,
      });
    }
  }

  return blockers;
}

function parseDecisionDeadlines(text: string): DecisionDeadline[] {
  const deadlines: DecisionDeadline[] = [];

  const block = text.match(/###\s*Decision Deadlines\s*\n([\s\S]*?)(?=###\s|$)/i);
  if (!block) return deadlines;

  for (const line of block[1].split('\n')) {
    const trimmed = line.trim();
    if (!trimmed.startsWith('-')) continue;

    const item = trimmed.replace(/^-\s*/, '');
    // Format: "target -- due YYYY-MM-DD -- iteration n/max -- STATUS"
    const match = item.match(/^(.+?)\s*--\s*due\s+(\d{4}-\d{2}-\d{2})\s*--\s*iteration\s+(\d+)\/(\d+)\s*--\s*(\w+)/i);
    if (match) {
      deadlines.push({
        target: match[1].trim(),
        dueDate: match[2],
        currentIteration: match[3],
        maxIterations: match[4],
        status: parseDeadlineStatus(match[5]),
      });
    } else {
      // Simpler format: "target -- due YYYY-MM-DD -- STATUS"
      const simpleMatch = item.match(/^(.+?)\s*--\s*due\s+(\d{4}-\d{2}-\d{2})\s*--\s*(\w+)/i);
      if (simpleMatch) {
        deadlines.push({
          target: simpleMatch[1].trim(),
          dueDate: simpleMatch[2],
          status: parseDeadlineStatus(simpleMatch[3]),
        });
      }
    }
  }

  return deadlines;
}

function extractListField(text: string, label: string): string | undefined {
  const match = text.match(new RegExp(`-\\s*${label}:\\s*(.+)`, 'i'));
  return match ? match[1].trim() : undefined;
}

function parseGapStatus(s: string): 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'BLOCKED' {
  const upper = s.toUpperCase().replace(/\s+/g, '_');
  if (upper === 'IN_PROGRESS') return 'IN_PROGRESS';
  if (upper === 'RESOLVED') return 'RESOLVED';
  if (upper === 'BLOCKED') return 'BLOCKED';
  return 'OPEN';
}

function parseDeadlineStatus(s: string): 'OPEN' | 'DUE' | 'EXCEEDED' | 'RESOLVED' {
  const upper = s.toUpperCase();
  if (upper === 'DUE') return 'DUE';
  if (upper === 'EXCEEDED') return 'EXCEEDED';
  if (upper === 'RESOLVED') return 'RESOLVED';
  return 'OPEN';
}
