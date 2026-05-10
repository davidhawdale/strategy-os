import type {
  HypothesisRegister,
  Hypothesis,
  ValueProposition,
  ParseResult,
  ParseWarning,
  CombinedParseResult,
  GapAnalysisParseResult,
} from '../model/types';
import { splitSections, type SectionId } from './sections';
import { parseMetadata } from './metadata';
import { parseHypothesis, emptyHypothesis } from './hypothesis';
import { parseSolutionDesign, emptySolutionDesign } from './solution';
import {
  parseGrowthArchitecture,
  parseGTMPlan,
  emptyGrowthArchitecture,
  emptyGTMPlan,
} from './proposals';
import { parseDestructionLog } from './destruction';
import { parseGapAnalysis } from './gap-analysis';
import { parseValueProposition, emptyValueProposition } from './value-proposition';
import { parseGapLedgerSection } from './gap-ledger';

export { parseGapAnalysis } from './gap-analysis';

type CoreHypothesisId = 'problem' | 'segment' | 'unitEconomics';

const HYPOTHESIS_SECTIONS: { sectionId: SectionId; hypothesisId: CoreHypothesisId }[] = [
  { sectionId: 'problem', hypothesisId: 'problem' },
  { sectionId: 'segment', hypothesisId: 'segment' },
  { sectionId: 'unitEconomics', hypothesisId: 'unitEconomics' },
];

export function parse(markdown: string): ParseResult {
  const warnings: ParseWarning[] = [];
  let fieldsAttempted = 0;
  let fieldsExtracted = 0;

  if (!markdown || markdown.trim().length === 0) {
    return {
      register: emptyRegister(),
      warnings: [{ section: 'root', field: 'document', message: 'Empty document', severity: 'error' }],
      parseCompleteness: 0,
    };
  }

  // Step 1: Split into sections
  const sections = splitSections(markdown);

  // Step 2: Parse metadata from root section
  const rootSection = sections.get('root');
  const rootText = rootSection?.rawText ?? markdown.split(/\n##\s/)[0] ?? '';
  const { metadata, warnings: metadataWarnings } = parseMetadata(rootText);
  warnings.push(...metadataWarnings);

  // Track completeness for metadata
  fieldsAttempted += 5;
  if (metadata.created) fieldsExtracted++;
  if (metadata.lastReviewed) fieldsExtracted++;
  if (metadata.businessMode) fieldsExtracted++;
  if (metadata.buildMethod) fieldsExtracted++;
  fieldsExtracted++; // sellReady always has a value (defaults false)

  // Step 3: Parse hypotheses
  const hypotheses: {
    problem: Hypothesis;
    segment: Hypothesis;
    unitEconomics: Hypothesis;
    valueProposition: ValueProposition;
  } = {
    problem: emptyHypothesis('problem'),
    segment: emptyHypothesis('segment'),
    unitEconomics: emptyHypothesis('unitEconomics'),
    valueProposition: emptyValueProposition(),
  };

  for (const { sectionId, hypothesisId } of HYPOTHESIS_SECTIONS) {
    const section = sections.get(sectionId);
    fieldsAttempted += 6; // claim, confidence, evidence, assumptions, killCondition, lastUpdated

    if (!section) {
      warnings.push({
        section: sectionId,
        field: 'section',
        message: `Section "${sectionId}" not found in document`,
        severity: 'warning',
      });
      continue;
    }

    const { hypothesis, warnings: hWarnings } = parseHypothesis(section, hypothesisId);
    hypotheses[hypothesisId] = hypothesis;
    warnings.push(...hWarnings);

    if (hypothesis.claim) fieldsExtracted++;
    if (hypothesis.confidence) fieldsExtracted++;
    if (hypothesis.evidence.length > 0) fieldsExtracted++;
    if (hypothesis.assumptions.length > 0) fieldsExtracted++;
    if (hypothesis.killCondition) fieldsExtracted++;
    if (hypothesis.lastUpdated) fieldsExtracted++;
  }

  // Step 3b: Parse Value Proposition
  const vpSection = sections.get('valueProposition');
  if (vpSection) {
    const { valueProposition: vp, warnings: vpWarnings } = parseValueProposition(vpSection);
    hypotheses.valueProposition = vp;
    warnings.push(...vpWarnings);
    fieldsAttempted += 6;
    if (vp.claim) fieldsExtracted++;
    if (vp.confidence) fieldsExtracted++;
    if (vp.evidence.length > 0) fieldsExtracted++;
    if (vp.assumptions.length > 0) fieldsExtracted++;
    if (vp.clauseValidation.length > 0) fieldsExtracted++;
    if (vp.lastUpdated) fieldsExtracted++;
  } else {
    warnings.push({
      section: 'valueProposition',
      field: 'section',
      message: 'Value Proposition section not found',
      severity: 'info',
    });
  }

  // Step 4: Parse proposals
  let growthArchitectureProposal = emptyGrowthArchitecture();
  const growthArchitectureSection = sections.get('growthArchitecture');
  fieldsAttempted += 3; // architecture, supportState, requiredConditions

  if (growthArchitectureSection) {
    const { proposal, warnings: gaWarnings } = parseGrowthArchitecture(growthArchitectureSection);
    growthArchitectureProposal = proposal;
    warnings.push(...gaWarnings);

    if (proposal.architecture) fieldsExtracted++;
    if (proposal.supportState) fieldsExtracted++;
    if (proposal.requiredConditions.length > 0) fieldsExtracted++;
  } else {
    warnings.push({
      section: 'growthArchitecture',
      field: 'section',
      message: 'Growth Architecture section not found',
      severity: 'info',
    });
  }

  let solutionDesignProposal = emptySolutionDesign();
  const solutionSection = sections.get('solutionDesign');
  fieldsAttempted += 3; // featureMap, mvpScope, growthLoops

  if (solutionSection) {
    const { solution, warnings: sWarnings } = parseSolutionDesign(solutionSection);
    solutionDesignProposal = solution;
    warnings.push(...sWarnings);

    if (solution.featureMap.length > 0) fieldsExtracted++;
    if (solution.mvpScope) fieldsExtracted++;
    if (solution.growthLoops.length > 0) fieldsExtracted++;
  } else {
    warnings.push({
      section: 'solutionDesign',
      field: 'section',
      message: 'Solution Design section not found',
      severity: 'info',
    });
  }

  let gtmPlanProposal = emptyGTMPlan();
  const gtmSection = sections.get('gtmPlan');
  fieldsAttempted += 4; // channelSequence, messagingFramework, successCriteria, killCriteria

  if (gtmSection) {
    const { proposal, warnings: gtmWarnings } = parseGTMPlan(gtmSection);
    gtmPlanProposal = proposal;
    warnings.push(...gtmWarnings);

    if (proposal.channelSequence.length > 0) fieldsExtracted++;
    if (proposal.messagingFramework) fieldsExtracted++;
    if (proposal.successCriteria.length > 0) fieldsExtracted++;
    if (proposal.killCriteria.length > 0) fieldsExtracted++;
  } else {
    warnings.push({
      section: 'gtmPlan',
      field: 'section',
      message: 'GTM Plan section not found',
      severity: 'info',
    });
  }

  // Step 5: Parse gap ledger (section 9)
  let gapLedger;
  const gapLedgerSection = sections.get('gapLedger');
  if (gapLedgerSection) {
    const { ledger, warnings: glWarnings } = parseGapLedgerSection(gapLedgerSection);
    gapLedger = ledger;
    warnings.push(...glWarnings);
  }

  // Step 7: Parse destruction log
  let destructionLog;
  const destructionSection = sections.get('destructionLog');
  fieldsAttempted += 5;

  if (destructionSection) {
    const { log, warnings: dWarnings } = parseDestructionLog(destructionSection);
    destructionLog = log;
    warnings.push(...dWarnings);

    if (log.preMortem) fieldsExtracted++;
    if (log.redTeamResponse) fieldsExtracted++;
    if (log.constraintInversions.length > 0) fieldsExtracted++;
    if (log.evidenceConcentrationRisk.length > 0) fieldsExtracted++;
    // killSignalAudit is on the gap analysis side; count evidenceConcentrationRisk twice
  } else {
    warnings.push({
      section: 'destructionLog',
      field: 'section',
      message: 'Destruction Log section not found',
      severity: 'info',
    });
  }

  // Step 8: Assemble
  const register: HypothesisRegister = {
    metadata,
    hypotheses,
    proposals: {
      growthArchitecture: growthArchitectureProposal,
      solutionDesign: solutionDesignProposal,
      gtmPlan: gtmPlanProposal,
    },
    destructionLog,
    gapLedger,
  };

  const parseCompleteness = fieldsAttempted > 0 ? fieldsExtracted / fieldsAttempted : 0;

  return { register, warnings, parseCompleteness };
}

/**
 * Parse both hypothesis register and gap analysis markdown, assembling a CombinedParseResult.
 * Gap analysis is optional — if gapAnalysisMd is undefined/empty, gapAnalysis is omitted.
 */
export function parseCombined(
  hypothesesMd: string,
  gapAnalysisMd?: string
): { result: CombinedParseResult; warnings: ParseWarning[] } {
  const registerResult = parse(hypothesesMd);
  const allWarnings: ParseWarning[] = [...registerResult.warnings];

  let gapAnalysisResult: GapAnalysisParseResult | undefined;
  if (gapAnalysisMd && gapAnalysisMd.trim().length > 0) {
    gapAnalysisResult = parseGapAnalysis(gapAnalysisMd);
    allWarnings.push(...gapAnalysisResult.warnings);
  }

  const result: CombinedParseResult = {
    register: registerResult.register,
    gapAnalysis: gapAnalysisResult?.gapAnalysis,
    registerWarnings: registerResult.warnings,
    gapAnalysisWarnings: gapAnalysisResult?.warnings ?? [],
    registerParseCompleteness: registerResult.parseCompleteness,
    gapAnalysisParseCompleteness: gapAnalysisResult?.parseCompleteness ?? 0,
  };

  return { result, warnings: allWarnings };
}

function emptyRegister(): HypothesisRegister {
  return {
    metadata: { sellReady: false, scaleReady: false },
    hypotheses: {
      problem: emptyHypothesis('problem'),
      segment: emptyHypothesis('segment'),
      unitEconomics: emptyHypothesis('unitEconomics'),
      valueProposition: emptyValueProposition(),
    },
    proposals: {
      growthArchitecture: emptyGrowthArchitecture(),
      solutionDesign: emptySolutionDesign(),
      gtmPlan: emptyGTMPlan(),
    },
  };
}
