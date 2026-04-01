import type {
  ValueProposition,
  ConfidenceState,
  ParseWarning,
} from '../model/types';
import type { Section } from './sections';
import { extractTablesFromNodes, tableToRows } from './sections';
import {
  extractField,
  extractEvidenceItems,
  extractAssumptions,
  extractDesiredState,
  extractCurrentState,
  extractBlockAfterLabel,
} from './fields';
import { parseClauseValidationTable } from './tables';

const CONFIDENCE_VALUES: Set<string> = new Set(['UNVALIDATED', 'RESEARCHED', 'SUPPORTED', 'BROKEN']);

export function parseValueProposition(
  section: Section
): { valueProposition: ValueProposition; warnings: ParseWarning[] } {
  const warnings: ParseWarning[] = [];
  const text = section.rawText;

  const claim = extractField(text, 'Claim');
  const confidenceRaw = extractField(text, 'Confidence');
  const confidence = confidenceRaw && CONFIDENCE_VALUES.has(confidenceRaw.toUpperCase())
    ? (confidenceRaw.toUpperCase() as ConfidenceState)
    : undefined;

  const lastUpdated = extractField(text, 'Last Updated');
  const updateRationale = extractField(text, 'Update Rationale');

  // Jobs Addressed
  const jobsBlock = extractBlockAfterLabel(text, 'Jobs Addressed');
  let jobs;
  if (jobsBlock) {
    const funcMatch = jobsBlock.match(/-\s*Functional:\s*(.+)/i);
    const emoMatch = jobsBlock.match(/-\s*Emotional:\s*(.+)/i);
    const socMatch = jobsBlock.match(/-\s*Social:\s*(.+)/i);
    if (funcMatch || emoMatch || socMatch) {
      jobs = {
        functional: funcMatch?.[1]?.trim(),
        emotional: emoMatch?.[1]?.trim(),
        social: socMatch?.[1]?.trim(),
      };
    }
  }

  // Clause Validation table
  const tables = extractTablesFromNodes(section.nodes);
  let clauseValidation = [];
  const clauseTable = tables.find(t => {
    const rows = tableToRows(t);
    return rows.length > 1 && rows[0].some(h => /Clause/i.test(h)) && rows[0].some(h => /Status/i.test(h));
  });
  if (clauseTable) {
    clauseValidation = parseClauseValidationTable(clauseTable);
  }

  // Evidence and Assumptions
  const evidenceResult = extractEvidenceItems(text, 'valueProposition');
  const assumptionsResult = extractAssumptions(text, 'valueProposition');
  warnings.push(...evidenceResult.warnings, ...assumptionsResult.warnings);

  // Desired/Current State
  const desiredState = extractDesiredState(text);
  const currentState = extractCurrentState(text);

  return {
    valueProposition: {
      claim,
      confidence,
      jobs,
      clauseValidation,
      evidence: evidenceResult.items,
      assumptions: assumptionsResult.items,
      desiredState,
      currentState,
      lastUpdated,
      updateRationale,
    },
    warnings,
  };
}

export function emptyValueProposition(): ValueProposition {
  return {
    clauseValidation: [],
    evidence: [],
    assumptions: [],
  };
}
