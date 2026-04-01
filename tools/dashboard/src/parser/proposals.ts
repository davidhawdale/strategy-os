import type {
  GrowthArchitectureProposal,
  GrowthArchitectureType,
  GTMPlanProposal,
  SupportState,
  ParseWarning,
} from '../model/types';
import type { Section } from './sections';
import { extractTablesFromNodes, tableToRows } from './sections';
import {
  extractField,
  extractAssumptions,
  extractListItems,
  extractBlockAfterLabel,
} from './fields';
import { parseGTMChannelSequenceTable, parseConstraintsTable } from './tables';

const SUPPORT_STATES: Set<string> = new Set(['PROPOSED', 'VALIDATED', 'BLOCKED']);
const ARCH_TYPES: Set<string> = new Set(['PLG', 'NETWORK', 'SALES_LED', 'MARKETPLACE', 'HYBRID']);

export function parseGrowthArchitecture(
  section: Section
): { proposal: GrowthArchitectureProposal; warnings: ParseWarning[] } {
  const warnings: ParseWarning[] = [];
  const text = section.rawText;

  const archRaw = extractField(text, 'Architecture');
  const architecture = archRaw && ARCH_TYPES.has(archRaw.toUpperCase())
    ? (archRaw.toUpperCase() as GrowthArchitectureType)
    : undefined;

  const supportStateRaw = extractField(text, 'Support State');
  const supportState = supportStateRaw && SUPPORT_STATES.has(supportStateRaw.toUpperCase())
    ? (supportStateRaw.toUpperCase() as SupportState)
    : undefined;

  const lastUpdated = extractField(text, 'Last Updated');

  // Hybrid Config
  let hybridConfig;
  const hybridBlock = extractBlockAfterLabel(text, 'Hybrid Config');
  if (hybridBlock) {
    const primaryMatch = hybridBlock.match(/-\s*Primary motion:\s*(.+)/i);
    const secondaryMatch = hybridBlock.match(/-\s*Secondary motion:\s*(.+)/i);
    const triggerMatch = hybridBlock.match(/-\s*Transition trigger:\s*(.+)/i);
    if (primaryMatch || secondaryMatch || triggerMatch) {
      hybridConfig = {
        primaryMotion: primaryMatch?.[1]?.trim(),
        secondaryMotion: secondaryMatch?.[1]?.trim(),
        transitionTrigger: triggerMatch?.[1]?.trim(),
      };
    }
  }

  // Rationale
  let rationale;
  const rationaleBlock = extractBlockAfterLabel(text, 'Rationale');
  if (rationaleBlock) {
    const acvMatch = rationaleBlock.match(/-\s*ACV implication:\s*(.+)/i);
    const buyerMatch = rationaleBlock.match(/-\s*Buyer type:\s*(.+)/i);
    const ttvMatch = rationaleBlock.match(/-\s*Time-to-value:\s*(.+)/i);
    const collabMatch = rationaleBlock.match(/-\s*Collaboration requirement:\s*(.+)/i);
    const selectionMatch = rationaleBlock.match(/-\s*Selection reason:\s*(.+)/i);
    if (acvMatch || buyerMatch || ttvMatch || collabMatch || selectionMatch) {
      rationale = {
        acvImplication: acvMatch?.[1]?.trim(),
        buyerType: buyerMatch?.[1]?.trim(),
        timeToValue: ttvMatch?.[1]?.trim(),
        collaborationRequirement: collabMatch?.[1]?.trim(),
        selectionReason: selectionMatch?.[1]?.trim(),
      };
    }
  }

  // Required Conditions
  const requiredConditions = extractListItems(text, 'Required Conditions');

  // Assumptions
  const assumptionsResult = extractAssumptions(text, 'growthArchitecture');
  warnings.push(...assumptionsResult.warnings);

  return {
    proposal: {
      architecture,
      hybridConfig,
      supportState,
      rationale,
      requiredConditions,
      assumptions: assumptionsResult.items,
      lastUpdated,
    },
    warnings,
  };
}

export function parseGTMPlan(
  section: Section
): { proposal: GTMPlanProposal; warnings: ParseWarning[] } {
  const warnings: ParseWarning[] = [];
  const text = section.rawText;

  const supportStateRaw = extractField(text, 'Support State');
  const supportState = supportStateRaw && SUPPORT_STATES.has(supportStateRaw.toUpperCase())
    ? (supportStateRaw.toUpperCase() as SupportState)
    : undefined;

  const lastUpdated = extractField(text, 'Last Updated');

  // Channel Sequence table
  const tables = extractTablesFromNodes(section.nodes);
  let channelSequence: GTMPlanProposal['channelSequence'] = [];
  const channelTable = tables.find(t => {
    const rows = tableToRows(t);
    return rows.length > 1 && rows[0].some(h => /Phase/i.test(h)) && rows[0].some(h => /Channel/i.test(h));
  });
  if (channelTable) {
    channelSequence = parseGTMChannelSequenceTable(channelTable);
  }

  // Messaging Framework
  let messagingFramework;
  const msgBlock = extractBlockAfterLabel(text, 'Messaging Framework');
  if (msgBlock) {
    const primaryMatch = msgBlock.match(/-\s*Primary message:\s*(.+)/i);
    const derivedMatch = msgBlock.match(/-\s*Derived from VP:\s*(yes|no)/i);
    const tierMatch = msgBlock.match(/-\s*Tier:\s*([T][123])/i);

    const supportingMessages: string[] = [];
    const supportingBlock = msgBlock.match(/-\s*Supporting messages:\s*\n([\s\S]*?)(?=-\s*Derived|-\s*Tier|$)/i);
    if (supportingBlock) {
      for (const line of supportingBlock[1].split('\n')) {
        const trimmed = line.trim();
        if (trimmed.startsWith('-')) {
          const item = trimmed.replace(/^-\s*/, '');
          if (item && !item.startsWith('{')) supportingMessages.push(item);
        }
      }
    }

    messagingFramework = {
      primaryMessage: primaryMatch?.[1]?.trim(),
      supportingMessages,
      derivedFromVP: derivedMatch?.[1]?.toLowerCase() === 'yes',
      tier: tierMatch?.[1] as any,
    };
  }

  // Operational Constraints table
  let operationalConstraints: GTMPlanProposal['operationalConstraints'] = [];
  const constraintTable = tables.find(t => {
    const rows = tableToRows(t);
    return rows.length > 1 && rows[0].some(h => /From/i.test(h)) && rows[0].some(h => /Constraint/i.test(h));
  });
  if (constraintTable) {
    operationalConstraints = parseConstraintsTable(constraintTable);
  }

  // Success / Kill Criteria
  const successCriteria = extractListItems(text, 'Success Criteria');
  const killCriteria = extractListItems(text, 'Kill Criteria');

  return {
    proposal: {
      supportState,
      channelSequence,
      messagingFramework,
      operationalConstraints,
      successCriteria,
      killCriteria,
      lastUpdated,
    },
    warnings,
  };
}

export function emptyGrowthArchitecture(): GrowthArchitectureProposal {
  return {
    requiredConditions: [],
    assumptions: [],
  };
}

export function emptyGTMPlan(): GTMPlanProposal {
  return {
    channelSequence: [],
    operationalConstraints: [],
    successCriteria: [],
    killCriteria: [],
  };
}
