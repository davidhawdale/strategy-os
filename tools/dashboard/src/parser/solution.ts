import type {
  SolutionDesignProposal,
  SupportState,
  GrowthLoop,
  HypothesisConstraint,
  MVPScope,
  ExclusionEntry,
  ParseWarning,
} from '../model/types';
import type { Section } from './sections';
import { extractTablesFromNodes, tableToRows, findTableNearHeading } from './sections';
import { extractField, extractBlockAfterLabel } from './fields';
import { parseFeatureMapTable, parseConstraintsTable } from './tables';

const SUPPORT_STATES: Set<string> = new Set(['PROPOSED', 'VALIDATED', 'BLOCKED']);

export function parseSolutionDesign(section: Section): { solution: SolutionDesignProposal; warnings: ParseWarning[] } {
  const warnings: ParseWarning[] = [];
  const text = section.rawText;

  const supportStateRaw = extractField(text, 'Support State');
  const supportState = supportStateRaw && SUPPORT_STATES.has(supportStateRaw.toUpperCase())
    ? (supportStateRaw.toUpperCase() as SupportState)
    : undefined;

  const lastUpdated = extractField(text, 'Last Updated');

  // Positioning
  const positioningStatement = extractField(text, 'Positioning Statement');
  const categoryFraming = extractField(text, 'Category Framing');
  const categoryRationale = extractField(text, 'Category Rationale');

  // Feature map table
  const featureTable = findTableNearHeading(section.nodes, /Feature Map/i);
  const featureMap = featureTable ? parseFeatureMapTable(featureTable) : [];

  // If no table found near heading, look for any table with Feature column
  if (featureMap.length === 0) {
    const tables = extractTablesFromNodes(section.nodes);
    for (const t of tables) {
      const rows = tableToRows(t);
      if (rows.length > 1 && rows[0].some(h => /Feature/i.test(h))) {
        featureMap.push(...parseFeatureMapTable(t));
        break;
      }
    }
  }

  // MVP Scope
  const mvpScope = parseMVPScope(text);

  // Growth loops
  const growthLoops = parseGrowthLoops(text);

  // Constraints from hypotheses
  const constraintTable = findTableNearHeading(section.nodes, /Constraints from Hypotheses/i);
  const constraints = constraintTable ? parseConstraintsTable(constraintTable) : [];

  // Adequacy criteria
  const adequacyCriteria = parseAdequacyCriteria(text);

  return {
    solution: {
      supportState,
      positioningStatement,
      categoryFraming,
      categoryRationale,
      featureMap,
      mvpScope,
      growthLoops,
      constraintsFromHypotheses: constraints,
      adequacyCriteria,
      lastUpdated,
    },
    warnings,
  };
}

function parseMVPScope(text: string): MVPScope | undefined {
  const mvpBlock = extractBlockAfterLabel(text, 'MVP Scope');
  if (!mvpBlock) return undefined;

  const included: string[] = [];
  const excluded: ExclusionEntry[] = [];
  let ahaMoment: string | undefined;
  let timeToValueTarget: string | undefined;

  let mode: 'included' | 'excluded' | null = null;

  for (const line of mvpBlock.split('\n')) {
    const trimmed = line.trim();

    if (/^-\s*Included:/i.test(trimmed)) { mode = 'included'; continue; }
    if (/^-\s*Excluded:/i.test(trimmed)) { mode = 'excluded'; continue; }
    if (/^-\s*Aha moment:/i.test(trimmed)) {
      ahaMoment = trimmed.replace(/^-\s*Aha moment:\s*/i, '').trim();
      continue;
    }
    if (/^-\s*Time-to-value target:/i.test(trimmed)) {
      timeToValueTarget = trimmed.replace(/^-\s*Time-to-value target:\s*/i, '').trim();
      continue;
    }

    if (trimmed.startsWith('-') && mode) {
      const item = trimmed.replace(/^-\s*/, '');
      if (!item || item.startsWith('{')) continue;

      if (mode === 'included') {
        included.push(item);
      } else {
        // Try to parse "feature -- why -- when"
        const parts = item.split(/\s+--\s+/);
        if (parts.length >= 2) {
          excluded.push({
            feature: parts[0].trim(),
            whyExcluded: parts[1].trim(),
            whenToAdd: parts[2]?.trim() || '',
          });
        } else {
          excluded.push({ feature: item, whyExcluded: '', whenToAdd: '' });
        }
      }
    }
  }

  if (included.length === 0 && excluded.length === 0) return undefined;

  return { included, excluded, ahaMoment, timeToValueTarget };
}

function parseGrowthLoops(text: string): GrowthLoop[] {
  const loops: GrowthLoop[] = [];

  const block = extractBlockAfterLabel(text, 'Growth Loops');
  if (!block) return loops;

  const lines = block.split('\n');

  for (const line of lines) {
    const trimmed = line.trim();
    // Match: "- name: mechanism (requires: ...) [T1/T2/T3]"
    const loopMatch = trimmed.match(/^-\s*(.+?):\s*(.+?)(?:\(requires?:\s*(.+?)\))?\s*(?:\[([T][123])\])?\s*$/i);
    if (loopMatch) {
      const [, name, mechanism, reqStr, tierStr] = loopMatch;
      loops.push({
        name: name.trim(),
        mechanism: mechanism.trim(),
        requirements: reqStr ? reqStr.split(/[,;]/).map(s => s.trim()).filter(Boolean) : [],
        tier: tierStr as any,
      });
      continue;
    }

    // Legacy numbered format
    const numMatch = trimmed.match(/^\d+\.\s*\*\*(.+?)\*\*:?\s*(.*)/);
    if (numMatch) {
      const name = numMatch[1];
      const rest = numMatch[2];
      const mechanism = rest.split('.')[0]?.trim() || '';
      const tierMatch = rest.match(/\[([T][123])\]/);

      loops.push({
        name,
        mechanism,
        requirements: [],
        tier: tierMatch ? (tierMatch[1] as any) : undefined,
      });
    }
  }

  return loops;
}

function parseAdequacyCriteria(text: string): string[] {
  const block = extractBlockAfterLabel(text, 'Adequacy Criteria');
  if (!block) return [];

  const criteria: string[] = [];
  for (const line of block.split('\n')) {
    const trimmed = line.trim();
    if (trimmed.startsWith('-')) {
      const item = trimmed.replace(/^-\s*/, '');
      if (item && !item.startsWith('{')) criteria.push(item);
    }
  }
  return criteria;
}

export function emptySolutionDesign(): SolutionDesignProposal {
  return {
    featureMap: [],
    growthLoops: [],
    constraintsFromHypotheses: [],
    adequacyCriteria: [],
  };
}
