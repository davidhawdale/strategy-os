import type {
  EvidenceItem,
  EvidenceType,
  EpistemicTier,
  ResearchSource,
  Assumption,
  EpistemicTag,
  BlastRadius,
  AssumptionStatus,
  ParseWarning,
  DesiredState,
  CurrentState,
  PossibilitySpace,
  EliminationEntry,
  UpdateEntry,
} from '../model/types';

const EVIDENCE_TYPES: Set<string> = new Set([
  'CONVERSATION', 'OBSERVATION', 'DATA', 'FOUNDER_STATED', 'WEB_RESEARCH', 'COMPETITIVE_ANALYSIS', 'EXPERIMENT_RESULT',
]);

const TIERS: Set<string> = new Set(['T1', 'T2', 'T3']);
const TAGS: Set<string> = new Set(['K', 'B', 'O']);
const BLAST_RADII: Set<string> = new Set(['LOW', 'MEDIUM', 'HIGH']);
const ASSUMPTION_STATUSES: Set<string> = new Set(['OPEN', 'TESTING', 'RESOLVED_TRUE', 'RESOLVED_FALSE', 'ESCALATED']);

export function extractField(text: string, fieldName: string): string | undefined {
  const escaped = fieldName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(
    `\\*\\*${escaped}:\\*\\*\\s*(.+(?:\\n(?!\\*\\*|---).*)*)`,
    'm'
  );
  const match = text.match(pattern);
  return match ? match[1].trim() : undefined;
}

export function extractBoldField(text: string, fieldName: string): string | undefined {
  return extractField(text, fieldName);
}

export function extractPriorUpdates(text: string): UpdateEntry[] {
  const pattern = /\*\*Prior Update(?:\s*\(([^)]+)\))?:\*\*\s*(.+(?:\n(?!\*\*|---).+)*)/gm;
  const results: UpdateEntry[] = [];
  let match;
  while ((match = pattern.exec(text)) !== null) {
    results.push({ date: match[1]?.trim(), text: match[2].trim() });
  }
  return results;
}

export function extractDesiredState(text: string): DesiredState | undefined {
  const block = extractBlockAfterLabel(text, 'Desired State');
  if (!block) return undefined;

  const supportedMeans: string[] = [];
  const brokenMeans: string[] = [];
  let mode: 'supported' | 'broken' | null = null;

  for (const line of block.split('\n')) {
    const trimmed = line.trim();

    if (/^-\s*SUPPORTED means:/i.test(trimmed) || /SUPPORTED means:$/i.test(trimmed)) {
      mode = 'supported';
      continue;
    }
    if (/^-\s*BROKEN means:/i.test(trimmed) || /BROKEN means:$/i.test(trimmed)) {
      mode = 'broken';
      continue;
    }

    if (trimmed.startsWith('-') && mode) {
      const item = trimmed.replace(/^-\s*/, '');
      if (item && !item.startsWith('{')) {
        if (mode === 'supported') supportedMeans.push(item);
        else brokenMeans.push(item);
      }
    }
  }

  if (supportedMeans.length === 0 && brokenMeans.length === 0) return undefined;
  return { supportedMeans, brokenMeans };
}

export function extractCurrentState(text: string): CurrentState | undefined {
  const block = extractBlockAfterLabel(text, 'Current State');
  if (!block) return undefined;

  const met: string[] = [];
  const partial: string[] = [];
  const missing: string[] = [];
  const contradicted: string[] = [];
  let mode: 'met' | 'partial' | 'missing' | 'contradicted' | null = null;

  for (const line of block.split('\n')) {
    const trimmed = line.trim();

    if (/^-\s*Met:/i.test(trimmed)) { mode = 'met'; continue; }
    if (/^-\s*Partial:/i.test(trimmed)) { mode = 'partial'; continue; }
    if (/^-\s*Missing:/i.test(trimmed)) { mode = 'missing'; continue; }
    if (/^-\s*Contradicted:/i.test(trimmed)) { mode = 'contradicted'; continue; }

    if (trimmed.startsWith('-') && mode) {
      const item = trimmed.replace(/^-\s*/, '');
      if (item && !item.startsWith('{')) {
        switch (mode) {
          case 'met': met.push(item); break;
          case 'partial': partial.push(item); break;
          case 'missing': missing.push(item); break;
          case 'contradicted': contradicted.push(item); break;
        }
      }
    }
  }

  if (met.length === 0 && partial.length === 0 && missing.length === 0 && contradicted.length === 0) return undefined;
  return { met, partial, missing, contradicted };
}

export function extractEvidenceItems(text: string, sectionName: string): { items: EvidenceItem[]; warnings: ParseWarning[] } {
  const items: EvidenceItem[] = [];
  const warnings: ParseWarning[] = [];

  const evidenceBlock = extractBlockAfterLabel(text, 'Evidence');
  if (!evidenceBlock) return { items, warnings };

  const lines = evidenceBlock.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed.startsWith('-')) continue;
    if (trimmed.startsWith('->') || trimmed.startsWith('- >')) continue;

    const raw = trimmed.replace(/^-\s*/, '');

    const structuredMatch = trimmed.match(
      /^-\s*\[(\w+(?:_\w+)*)\]\s*\[([T][123])\]\s*(\d{4}-\d{2}-\d{2})\s*--\s*(.+)/
    );

    if (structuredMatch) {
      const [, typeStr, tierStr, date, rawDetail] = structuredMatch;

      // URL pattern allowing one level of nested parens (e.g. Wikipedia URLs like /Southern_Reporter_(newspaper))
      const URL_PAT = String.raw`https?:\/\/(?:[^)(]|\([^)]*\))*`;
      // Extract [Name](URL): detail if link leads; otherwise scan for first [Name](URL) anywhere in detail
      const leadingLinkMatch = rawDetail.match(new RegExp(String.raw`^\[([^\]]+)\]\((${URL_PAT})\):\s*(.*)`, 's'));
      const inlineLinkMatch = !leadingLinkMatch
        ? rawDetail.match(new RegExp(String.raw`\[([^\]]+)\]\((${URL_PAT})\)`))
        : null;
      const source = leadingLinkMatch ? leadingLinkMatch[1] : (inlineLinkMatch ? inlineLinkMatch[1] : undefined);
      const url = leadingLinkMatch ? leadingLinkMatch[2] : (inlineLinkMatch ? inlineLinkMatch[2] : undefined);
      const detail = leadingLinkMatch
        ? leadingLinkMatch[3].trim()
        : inlineLinkMatch
          ? rawDetail.replace(new RegExp(String.raw`[Ss]ources?:\s*\[[^\]]+\]\(${URL_PAT}\)(\s+and\s+\[[^\]]+\]\(${URL_PAT}\))*\.?`, 'g'), '').trim().replace(/\.$/, '').trim()
          : rawDetail.trim();

      items.push({
        raw,
        type: EVIDENCE_TYPES.has(typeStr) ? (typeStr as EvidenceType) : undefined,
        tier: TIERS.has(tierStr) ? (tierStr as EpistemicTier) : undefined,
        date,
        source,
        url,
        detail,
      });
    } else {
      items.push({ raw, detail: raw });
      warnings.push({
        section: sectionName,
        field: 'evidence',
        message: `Could not parse structured evidence: ${raw.substring(0, 80)}`,
        severity: 'info',
      });
    }
  }

  return { items, warnings };
}

export function extractResearchSources(text: string, _sectionName: string): { items: ResearchSource[]; warnings: ParseWarning[] } {
  const items: ResearchSource[] = [];
  const warnings: ParseWarning[] = [];

  const block = extractBlockAfterLabel(text, 'Research Sources');
  if (!block) return { items, warnings };

  const lines = block.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed.startsWith('-')) continue;

    const raw = trimmed.replace(/^-\s*/, '');

    const match = trimmed.match(
      /^-\s*\[([T][123])\]\s*(\d{4}-\d{2}-\d{2})\s*--\s*(.*)/
    );

    if (match) {
      const [, tierStr, date, rest] = match;
      let url: string | undefined;
      let description: string;

      let name: string | undefined;
      let note: string | undefined;

      const mdLinkMatch = rest.match(/^\[([^\]]+)\]\((https?:\/\/(?:[^)(]|\([^)]*\))*)\)(?:\s*(?:--|—)\s*|\s*:\s*)?(.*)/s);
      if (mdLinkMatch) {
        name = mdLinkMatch[1];
        url = mdLinkMatch[2];
        note = mdLinkMatch[3]?.trim() || undefined;
        description = note ? `${name} — ${note}` : name;
      } else {
        const bareUrlMatch = rest.match(/^(https?:\/\/\S+):?\s*(.*)/);
        if (bareUrlMatch) {
          url = bareUrlMatch[1];
          description = bareUrlMatch[2]?.trim() || url;
        } else {
          description = rest;
        }
      }

      items.push({
        raw,
        tier: TIERS.has(tierStr) ? (tierStr as EpistemicTier) : undefined,
        date,
        url,
        name,
        note,
        description: description.trim() || raw,
      });
    } else {
      items.push({ raw, description: raw });
    }
  }

  return { items, warnings };
}

export function extractAssumptions(text: string, sectionName: string): { items: Assumption[]; warnings: ParseWarning[] } {
  const items: Assumption[] = [];
  const warnings: ParseWarning[] = [];

  const block = extractBlockAfterLabel(text, 'Assumptions');
  if (!block) return { items, warnings };

  const lines = block.split('\n');
  let currentAssumption: Partial<Assumption> & { raw: string; claim: string } | null = null;

  function flushAssumption() {
    if (currentAssumption) {
      items.push({
        raw: currentAssumption.raw,
        tag: currentAssumption.tag,
        tier: currentAssumption.tier,
        claim: currentAssumption.claim,
        loadBearing: currentAssumption.loadBearing ?? false,
        blastRadius: currentAssumption.blastRadius,
        falsification: currentAssumption.falsification,
        validation: currentAssumption.validation,
        status: currentAssumption.status,
        challenges: currentAssumption.challenges,
      });
    }
  }

  for (const line of lines) {
    const trimmed = line.trim();

    // Continuation lines for falsification/validation/status
    if (trimmed.startsWith('->') || trimmed.startsWith('- >')) {
      if (currentAssumption) {
        const contMatch = trimmed.match(/^-?>\s*(Falsification|Validation|Status):\s*(.+)/i);
        if (contMatch) {
          const [, fieldType, value] = contMatch;
          const fieldLower = fieldType.toLowerCase();
          if (fieldLower === 'falsification') {
            currentAssumption.falsification = value.trim();
          } else if (fieldLower === 'validation') {
            currentAssumption.validation = value.trim();
          } else if (fieldLower === 'status') {
            const statusUpper = value.trim().toUpperCase();
            if (ASSUMPTION_STATUSES.has(statusUpper)) {
              currentAssumption.status = statusUpper as AssumptionStatus;
            }
          }
        } else {
          const challengeMatch = trimmed.match(/^-?>\s*CHALLENGE\s+(\d{4}-\d{2}-\d{2})\s*:\s*(.+)/i);
          if (challengeMatch) {
            if (!currentAssumption.challenges) currentAssumption.challenges = [];
            currentAssumption.challenges.push({ date: challengeMatch[1], text: challengeMatch[2].trim() });
          }
        }
      }
      continue;
    }

    if (!trimmed.startsWith('-')) continue;

    // New assumption line
    flushAssumption();

    const raw = trimmed.replace(/^-\s*/, '');

    // Try: [TAG] [TIER] claim [LOAD-BEARING] [BLAST:LEVEL]
    const match = trimmed.match(
      /^-\s*\[([KBO])\]\s*\[([T][123])\]\s*(.+)/
    );

    if (match) {
      const [, tagStr, tierStr, rest] = match;
      const loadBearing = /\[LOAD-BEARING\]/i.test(rest);
      const blastMatch = rest.match(/\[BLAST:(\w+)\]/i);
      const blastRadius = blastMatch && BLAST_RADII.has(blastMatch[1].toUpperCase())
        ? (blastMatch[1].toUpperCase() as BlastRadius)
        : undefined;

      let claim = rest
        .replace(/\[LOAD-BEARING\]/gi, '')
        .replace(/\[BLAST:\w+\]/gi, '')
        .trim();

      claim = claim.replace(/\.\s*$/, '').trim();

      currentAssumption = {
        raw,
        tag: TAGS.has(tagStr) ? (tagStr as EpistemicTag) : undefined,
        tier: TIERS.has(tierStr) ? (tierStr as EpistemicTier) : undefined,
        claim,
        loadBearing,
        blastRadius,
      };
    } else {
      currentAssumption = { raw, claim: raw, loadBearing: false };
      warnings.push({
        section: sectionName,
        field: 'assumptions',
        message: `Could not parse structured assumption: ${raw.substring(0, 80)}`,
        severity: 'info',
      });
    }
  }

  flushAssumption();
  return { items, warnings };
}

export function extractBlockAfterLabel(text: string, label: string): string | null {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`\\*\\*${escaped}:\\*\\*`, 'im');
  const match = text.match(pattern);
  if (!match || match.index === undefined) return null;

  const startIndex = match.index + match[0].length;
  const rest = text.substring(startIndex);

  const endMatch = rest.match(/\n\*\*[A-Z][^*]+:\*\*|\n---|\n##\s/);
  const endIndex = endMatch?.index ?? rest.length;

  return rest.substring(0, endIndex);
}

export function extractPossibilitySpace(text: string): PossibilitySpace | undefined {
  const block = extractBlockAfterLabel(text, 'Possibility Space');
  if (!block) return undefined;

  const considered: string[] = [];
  const eliminated: EliminationEntry[] = [];
  const alternativesCarried: string[] = [];

  // Parse Considered items
  const consideredBlock = extractSubBlock(block, 'Considered');
  if (consideredBlock) {
    for (const line of consideredBlock.split('\n')) {
      const trimmed = line.trim();
      if (trimmed.startsWith('-')) {
        const item = trimmed.replace(/^-\s*/, '');
        if (item && !item.startsWith('{')) considered.push(item);
      }
    }
  }

  // Parse Eliminated items
  const eliminatedBlock = extractSubBlock(block, 'Eliminated');
  if (eliminatedBlock) {
    for (const line of eliminatedBlock.split('\n')) {
      const trimmed = line.trim();
      if (trimmed.startsWith('-')) {
        const itemText = trimmed.replace(/^-\s*/, '');
        // Try splitting on " -- "
        const parts = itemText.split(/\s+--\s+/);
        if (parts.length >= 2) {
          eliminated.push({
            candidate: parts[0].trim(),
            reason: parts[1].trim(),
            evidence: parts[2]?.trim(),
          });
        } else {
          eliminated.push({ candidate: itemText, reason: '' });
        }
      }
    }
  }

  // Parse Alternatives carried
  const altBlock = extractSubBlock(block, 'Alternatives carried');
  if (altBlock) {
    for (const line of altBlock.split('\n')) {
      const trimmed = line.trim();
      if (trimmed.startsWith('-')) {
        const item = trimmed.replace(/^-\s*/, '');
        if (item && !item.startsWith('{')) alternativesCarried.push(item);
      }
    }
  }

  if (considered.length === 0 && eliminated.length === 0 && alternativesCarried.length === 0) {
    return undefined;
  }

  return { considered, eliminated, alternativesCarried };
}

function extractSubBlock(text: string, label: string): string | null {
  const pattern = new RegExp(`-\\s*${label}:?\\s*\\n`, 'i');
  const match = text.match(pattern);
  if (!match || match.index === undefined) return null;

  const start = match.index + match[0].length;
  const rest = text.substring(start);

  const endMatch = rest.match(/\n\s*-\s*(Considered|Eliminated|Alternatives carried):?\s*\n/i);
  const endIndex = endMatch?.index ?? rest.length;

  return rest.substring(0, endIndex);
}

export function extractListItems(text: string, label: string): string[] {
  const block = extractBlockAfterLabel(text, label);
  if (!block) return [];

  const items: string[] = [];
  for (const line of block.split('\n')) {
    const trimmed = line.trim();
    if (trimmed.startsWith('-')) {
      const item = trimmed.replace(/^-\s*/, '');
      if (item && !item.startsWith('{')) items.push(item);
    }
  }
  return items;
}

export function extractObservableFilters(text: string): string[] {
  // Try Observable Filters (canonical name), fallback to Observable Characteristics (legacy)
  let block = extractBlockAfterLabel(text, 'Observable Filters');
  if (!block) block = extractBlockAfterLabel(text, 'Observable Characteristics');
  if (!block) return [];

  const filters: string[] = [];
  for (const line of block.split('\n')) {
    const trimmed = line.trim();
    if (trimmed.startsWith('-')) {
      const item = trimmed.replace(/^-\s*/, '');
      if (item && !item.startsWith('{')) filters.push(item);
    }
    const numMatch = trimmed.match(/^\d+\.\s*(.+)/);
    if (numMatch) filters.push(numMatch[1].trim());
  }
  return filters;
}
