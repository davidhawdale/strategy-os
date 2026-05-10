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

  // Bold field: **fieldName:** value
  const boldPattern = new RegExp(`\\*\\*${escaped}:\\*\\*\\s*(.+(?:\\n(?!\\*\\*|---).*)*)`, 'm');
  const boldMatch = text.match(boldPattern);
  if (boldMatch) return boldMatch[1].trim();

  // H3 heading fallback: ### fieldName\ncontent
  const h3Pattern = new RegExp(`^###\\s+${escaped}\\b.*`, 'im');
  const h3Match = text.match(h3Pattern);
  if (h3Match && h3Match.index !== undefined) {
    const rest = text.substring(h3Match.index + h3Match[0].length).replace(/^\n+/, '');
    const endMatch = rest.match(/\n###\s|\n##\s|\n---/);
    const snippet = rest.substring(0, endMatch?.index ?? rest.length).trim();
    return snippet || undefined;
  }

  return undefined;
}

export function extractBoldField(text: string, fieldName: string): string | undefined {
  return extractField(text, fieldName);
}

export function extractDocumentBlock(text: string, headingName: string): string | undefined {
  const lines = text.split('\n');
  const target = headingName.toLowerCase();
  const headingIndex = lines.findIndex(line => {
    const heading = line.match(/^###\s+(.+)$/);
    if (!heading) return false;
    const headingText = heading[1].trim().toLowerCase();
    if (!headingText.startsWith(target)) return false;
    const next = headingText[target.length];
    return next === undefined || !/[a-z0-9]/.test(next);
  });
  if (headingIndex < 0) return undefined;

  const blockLines: string[] = [];
  for (const line of lines.slice(headingIndex + 1)) {
    if (/^###\s+/.test(line) || /^##\s+/.test(line) || /^---\s*$/.test(line)) break;
    blockLines.push(line);
  }

  const block = blockLines.join('\n').trim();
  return block || undefined;
}

export function extractDocumentBlocks(
  text: string,
  blocks: Record<string, string>,
): Record<string, string> | undefined {
  const result: Record<string, string> = {};

  for (const [key, headingName] of Object.entries(blocks)) {
    const block = extractDocumentBlock(text, headingName);
    if (block) result[key] = block;
  }

  return Object.keys(result).length > 0 ? result : undefined;
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

    const cleanedLine = trimmed.replace(/`/g, '');
    const raw = cleanedLine.replace(/^-\s*/, '');

    const structuredMatch = cleanedLine.match(
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
      const mdLink = raw.match(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/);
      items.push({
        raw,
        source: mdLink ? mdLink[1] : undefined,
        url: mdLink ? mdLink[2] : undefined,
        detail: mdLink ? raw.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/, '$1').trim() : raw,
      });
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

    const typedMatch = trimmed.match(
      /^-\s*\[(\w+(?:_\w+)*)\]\s*\[([T][123])\]\s*(\d{4}-\d{2}-\d{2})\s*--\s*(.*)/
    );
    const legacyMatch = trimmed.match(
      /^-\s*\[([T][123])\]\s*(\d{4}-\d{2}-\d{2})\s*--\s*(.*)/
    );

    if (typedMatch || legacyMatch) {
      const typeStr = typedMatch?.[1];
      const tierStr = typedMatch?.[2] ?? legacyMatch?.[1] ?? '';
      const date = typedMatch?.[3] ?? legacyMatch?.[2];
      const rest = typedMatch?.[4] ?? legacyMatch?.[3] ?? '';
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
        type: typeStr && EVIDENCE_TYPES.has(typeStr) ? (typeStr as EvidenceType) : undefined,
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

function parseTableAssumptions(block: string, _sectionName: string): { items: Assumption[]; warnings: ParseWarning[] } {
  const items: Assumption[] = [];
  const tableLines = block.split('\n').filter(l => l.trim().startsWith('|'));
  if (tableLines.length < 3) return { items, warnings: [] };

  const headerCells = tableLines[0].split('|').slice(1, -1).map(c => c.trim().toLowerCase());
  const col = (name: string) => headerCells.findIndex(h => h.includes(name));
  const cols = {
    classification: col('classification'),
    tier:           col('tier'),
    claim:          col('claim'),
    loadBearing:    col('load'),
    blast:          col('blast'),
    falsification:  col('falsification'),
    validation:     col('validation'),
    status:         col('status'),
  };

  for (let i = 2; i < tableLines.length; i++) {
    const cells = tableLines[i].split('|').slice(1, -1).map(c => c.trim());
    const get = (idx: number) => (idx >= 0 && idx < cells.length ? cells[idx] : '');

    const claim = get(cols.claim);
    if (!claim || claim.startsWith('-')) continue;

    const classRaw = get(cols.classification).toLowerCase();
    const tag: EpistemicTag | undefined =
      classRaw === 'belief' ? 'B' : classRaw === 'knowledge' ? 'K' : classRaw === 'observation' ? 'O' : undefined;

    const tierRaw = get(cols.tier).toUpperCase();
    const tier = TIERS.has(tierRaw) ? (tierRaw as EpistemicTier) : undefined;

    const loadBearing = get(cols.loadBearing).toLowerCase() === 'yes';

    const blastRaw = get(cols.blast).toUpperCase();
    const blastRadius = BLAST_RADII.has(blastRaw) ? (blastRaw as BlastRadius) : undefined;

    const falsification = get(cols.falsification) || undefined;
    const validation    = get(cols.validation) || undefined;

    const statusRaw = get(cols.status).toUpperCase().replace(/\s+/g, '_');
    const status = ASSUMPTION_STATUSES.has(statusRaw) ? (statusRaw as AssumptionStatus) : undefined;

    items.push({ raw: tableLines[i].trim(), tag, tier, claim, loadBearing, blastRadius, falsification, validation, status });
  }

  return { items, warnings: [] };
}

export function extractAssumptions(text: string, sectionName: string): { items: Assumption[]; warnings: ParseWarning[] } {
  const items: Assumption[] = [];
  const warnings: ParseWarning[] = [];

  const block = extractBlockAfterLabel(text, 'Assumptions');
  if (!block) return { items, warnings };

  if (block.split('\n').some(l => l.trim().startsWith('|'))) {
    return parseTableAssumptions(block, sectionName);
  }

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

  // Bold label: **Label:**
  const boldPattern = new RegExp(`\\*\\*${escaped}:\\*\\*`, 'im');
  const boldMatch = text.match(boldPattern);
  if (boldMatch && boldMatch.index !== undefined) {
    const rest = text.substring(boldMatch.index + boldMatch[0].length);
    const endMatch = rest.match(/\n\*\*[A-Z][^*]+:\*\*|\n---|\n##\s/);
    return rest.substring(0, endMatch?.index ?? rest.length);
  }

  // H3 heading fallback: ### Label (allow optional subtitle after the label)
  const h3Pattern = new RegExp(`^###\\s+${escaped}\\b[^\\n]*`, 'im');
  const h3Match = text.match(h3Pattern);
  if (h3Match && h3Match.index !== undefined) {
    const rest = text.substring(h3Match.index + h3Match[0].length);
    const endMatch = rest.match(/\n###\s|\n##\s|\n---/);
    return rest.substring(0, endMatch?.index ?? rest.length);
  }

  return null;
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
      if (trimmed.match(/^[-*]|\d+\./)) {
        const item = trimmed.replace(/^(?:\d+\.|[-*])\s*/, '');
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
  // Match either bold heading (**Label:**) or dash-prefixed (- Label:)
  const pattern = new RegExp(`(?:\\*\\*${label}:?\\*\\*|-\\s*${label}:?)\\s*\\n`, 'i');
  const match = text.match(pattern);
  if (!match || match.index === undefined) return null;

  const start = match.index + match[0].length;
  const rest = text.substring(start);

  // End at next bold heading or dash-prefixed heading
  const endMatch = rest.match(/\n\s*(?:\*\*(?:Considered|Eliminated|Alternatives carried):?\*\*|-\s*(?:Considered|Eliminated|Alternatives carried):?)\s*\n/i);
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
