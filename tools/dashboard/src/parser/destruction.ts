import type {
  DestructionLog,
  ParseWarning,
} from '../model/types';
import type { Section } from './sections';
import { extractTablesFromNodes, tableToRows } from './sections';
import { extractField } from './fields';
import {
  parseConstraintInversionTable,
  parseEvidenceConcentrationTable,
  parseKillSignalAuditTable,
} from './tables';

export function parseDestructionLog(section: Section): { log: DestructionLog; warnings: ParseWarning[] } {
  const warnings: ParseWarning[] = [];
  const text = section.rawText;
  const tables = extractTablesFromNodes(section.nodes);

  // Pre-Mortem (narrative text under ### Pre-Mortem)
  const preMatch = text.match(/###\s*Pre-?Mortem\s*\n([\s\S]*?)(?=###\s|$)/i);
  const preMortem = preMatch ? preMatch[1].trim() : undefined;

  // Red-Team Response (narrative text under ### Red-Team Response)
  const redMatch = text.match(/###\s*Red-?Team\s+Response\s*\n([\s\S]*?)(?=###\s|$)/i);
  const redTeamResponse = redMatch ? redMatch[1].trim() : undefined;

  // Constraint inversions table
  const inversionTable = tables.find(t => {
    const rows = tableToRows(t);
    return rows.length > 1 && rows[0].some(h => /Assumption.*Inverted|Assumption/i.test(h)) && rows[0].some(h => /Surviv/i.test(h));
  });
  const constraintInversions = inversionTable
    ? parseConstraintInversionTable(inversionTable)
    : [];

  // Evidence concentration table
  const concentrationTable = tables.find(t => {
    const rows = tableToRows(t);
    return rows.length > 1 && rows[0].some(h => /Source/i.test(h)) && rows[0].some(h => /Risk/i.test(h));
  });
  const evidenceConcentrationRisk = concentrationTable
    ? parseEvidenceConcentrationTable(concentrationTable)
    : [];

  // Kill Signal Audit table
  const killTable = tables.find(t => {
    const rows = tableToRows(t);
    return rows.length > 1 && rows[0].some(h => /Signal/i.test(h)) && rows[0].some(h => /Ignored/i.test(h));
  });
  const killSignalAudit = killTable
    ? parseKillSignalAuditTable(killTable)
    : [];

  // Last Run
  const lastRun = extractField(text, 'Last Run');

  return {
    log: {
      preMortem,
      redTeamResponse,
      constraintInversions,
      evidenceConcentrationRisk,
      killSignalAudit,
      lastRun,
    },
    warnings,
  };
}
