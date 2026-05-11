import type { ExecutionQueueView, QueueAction, BlockedPath, PendingDecision, QueueEscalationOption, QueueWorkItem } from '../model/types';
import { extractBoldField } from './fields';

function extractQueueField(text: string, label: string): string | undefined {
  return extractBoldField(text, label)?.split('\n')[0]?.trim();
}

function sectionAfter(markdown: string, heading: string): string {
  const idx = markdown.indexOf(heading);
  if (idx === -1) return '';
  const after = markdown.slice(idx + heading.length);
  const nextH2 = after.search(/\n## /);
  return nextH2 === -1 ? after : after.slice(0, nextH2);
}

function sectionContent(markdown: string, heading: string): string | undefined {
  const pattern = new RegExp(`^##\\s+${heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`, 'im');
  const match = markdown.match(pattern);
  if (!match || match.index === undefined) return undefined;

  const after = markdown.slice(match.index + match[0].length);
  const nextHeading = after.search(/\n##\s+/);
  const content = nextHeading === -1 ? after : after.slice(0, nextHeading);
  const trimmed = content.trim();
  return trimmed || undefined;
}

function firstParagraph(markdown: string | undefined): string | undefined {
  if (!markdown) return undefined;
  const paragraph = markdown
    .split(/\n\s*\n/)
    .map(part => part.trim())
    .find(Boolean);
  return paragraph?.replace(/\s+/g, ' ');
}

function bulletItems(markdown: string | undefined): string[] {
  if (!markdown) return [];
  return markdown
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.startsWith('- '))
    .map(line => line.replace(/^-\s+/, '').trim())
    .filter(Boolean);
}

function normalizeSectionText(markdown: string | undefined): string | undefined {
  if (!markdown) return undefined;
  const normalized = markdown
    .trim()
    .replace(/\*\*/g, '')
    .replace(/\s+/g, ' ');
  return normalized || undefined;
}

function stripRecommended(text: string): { text: string; recommended: boolean } {
  const recommended = /\brecommended\b/i.test(text);
  const cleaned = text
    .replace(/\s*\*{0,2}Recommended\.?\*{0,2}\s*$/i, '')
    .replace(/\s*\(?recommended\)?\.?\s*$/i, '')
    .trim();
  return { text: cleaned, recommended };
}

function parseEscalationOptions(markdown: string | undefined): QueueEscalationOption[] {
  if (!markdown) return [];

  return markdown
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.startsWith('- '))
    .flatMap(line => {
      const raw = line.replace(/^-\s+/, '').trim();
      const labelMatch = raw.match(/^\*\*?([A-Z])[\.:]\s+(.+?)\*\*?\s*(?:[—-]\s*(.+))?$/);
      const plainMatch = raw.match(/^([A-Z])[\.:]\s*(.+?)(?:\s+[—-]\s*(.+))?$/);
      const match = labelMatch ?? plainMatch;

      if (!match) {
        const { text, recommended } = stripRecommended(raw.replace(/\*\*/g, ''));
        return text ? [{ text, recommended }] : [];
      }

      const { text: optionText, recommended: optionRecommended } = stripRecommended(match[2].replace(/\*\*/g, ''));
      const { text: consequenceText, recommended: consequenceRecommended } = stripRecommended((match[3] ?? '').replace(/\*\*/g, ''));

      return [{
        label: match[1],
        text: optionText,
        consequence: consequenceText || undefined,
        recommended: optionRecommended || consequenceRecommended,
      }];
    });
}

function recommendedOptionLabel(recommendation: string | undefined): string | undefined {
  if (!recommendation) return undefined;

  const normalized = recommendation.replace(/\*\*/g, '').trim();
  const optionMatch = normalized.match(/\bOption\s+([A-Z])\b/i);
  if (optionMatch) return optionMatch[1].toUpperCase();

  const labelMatch = normalized.match(/^([A-Z])[\.:]\b/);
  if (labelMatch) return labelMatch[1].toUpperCase();

  return undefined;
}

function applyRecommendationToOptions(
  options: QueueEscalationOption[],
  recommendation: string | undefined,
): QueueEscalationOption[] {
  const recommendedLabel = recommendedOptionLabel(recommendation);
  if (!recommendedLabel) return options;

  return options.map(option => ({
    ...option,
    recommended: option.recommended || option.label?.toUpperCase() === recommendedLabel,
  }));
}

function parseTitle(markdown: string, fileName: string): { id: string; title: string } {
  const heading = markdown.match(/^#\s+(.+)$/m)?.[1]?.trim();
  const fromHeading = heading?.match(/^([A-Z]+-\d+)\s+[—-]\s+(.+)$/);
  if (fromHeading) {
    return { id: fromHeading[1], title: fromHeading[2].trim() };
  }

  const fromFile = fileName.match(/^([A-Z]+-\d+)/)?.[1];
  return {
    id: fromFile ?? fileName.replace(/\.md$/i, ''),
    title: heading ?? fileName.replace(/\.md$/i, ''),
  };
}

function normalizeStatus(status: string | undefined): string | undefined {
  return status?.replace(/\*\*/g, '').trim();
}

export interface QueueFileInput {
  fileName: string;
  content: string;
}

export function parseQueueWorkItem(fileName: string, markdown: string): QueueWorkItem {
  const { id, title } = parseTitle(markdown, fileName);
  const kind = id.startsWith('E-') ? 'escalation' : 'task';
  const decisionNeeded = firstParagraph(sectionContent(markdown, 'Decision needed'));
  const objective = firstParagraph(sectionContent(markdown, 'Objective'));
  const whatNeedsReconciling = firstParagraph(sectionContent(markdown, 'What needs reconciling'));
  const expectedResponse = firstParagraph(sectionContent(markdown, 'Expected response'));
  const expectedOutput = firstParagraph(sectionContent(markdown, 'Expected output'));
  const whySystemCannotDecide = normalizeSectionText(sectionContent(markdown, 'Why system cannot decide'));
  const whatIsAtStake = normalizeSectionText(sectionContent(markdown, 'What is at stake'));
  const recommendation = normalizeSectionText(sectionContent(markdown, 'Recommendation'));
  const options = applyRecommendationToOptions(
    parseEscalationOptions(sectionContent(markdown, 'Options')),
    recommendation,
  );
  const preconditions = [
    ...bulletItems(sectionContent(markdown, 'Pre-conditions before this task can start')),
    ...bulletItems(sectionContent(markdown, 'Pre-conditions')),
    ...bulletItems(sectionContent(markdown, 'Preconditions')),
  ];

  return {
    id,
    title,
    fileName,
    kind,
    issued: extractQueueField(markdown, 'Issued'),
    issuedBy: extractQueueField(markdown, 'Issued by'),
    raisedBy: extractQueueField(markdown, 'Raised by'),
    date: extractQueueField(markdown, 'Date'),
    status: normalizeStatus(extractQueueField(markdown, 'Status')),
    type: extractQueueField(markdown, 'Type'),
    blastRadius: extractQueueField(markdown, 'Blast radius'),
    reducesGap: extractQueueField(markdown, 'Reduces gap'),
    actionType: extractQueueField(markdown, 'Action type'),
    evidenceTarget: extractQueueField(markdown, 'Evidence target'),
    blocks: extractQueueField(markdown, 'Blocks'),
    summary: decisionNeeded ?? objective ?? whatNeedsReconciling,
    decisionNeeded,
    whySystemCannotDecide,
    options,
    whatIsAtStake,
    recommendation,
    expectedResponse,
    expectedOutput,
    preconditions,
  };
}

export function parseQueueWorkItems(files: QueueFileInput[]): QueueWorkItem[] {
  return files
    .filter(file => file.fileName.endsWith('.md'))
    .filter(file => !file.fileName.startsWith('gap-definer-actions'))
    .map(file => parseQueueWorkItem(file.fileName, file.content))
    .sort((a, b) => a.id.localeCompare(b.id));
}

export function parseExecutionQueue(markdown: string): ExecutionQueueView {
  // --- Header fields (preamble before first ---) ---
  const preamble = markdown.split(/\n---/)[0] ?? markdown;

  const rawDate = extractQueueField(preamble, 'Date');
  const passDate = rawDate?.match(/\d{4}-\d{2}-\d{2}/)?.[0];

  const rawPass = extractQueueField(preamble, 'Pass');
  const passNumber = rawPass ? parseInt(rawPass, 10) || undefined : undefined;

  const rawSell = extractQueueField(preamble, 'Sell Ready');
  const sellReady = rawSell?.toLowerCase().startsWith('true') ?? false;

  const rawScale = extractQueueField(preamble, 'Scale Ready');
  const scaleReady = rawScale?.toLowerCase().startsWith('true') ?? false;

  const rawDecision = extractQueueField(preamble, 'Decision');
  const decisionState = rawDecision
    ? rawDecision.split(/[\s——]/)[0].toUpperCase()
    : 'UNKNOWN';

  // --- Actions ---
  const actionsSection = sectionAfter(markdown, '## Top 3 Actions');
  const actionBlocks = actionsSection.split(/\n### Action /).slice(1);

  const actions: QueueAction[] = actionBlocks.map((block, i) => {
    // Heading: "1 — G-04: Borders segment-size data pull (URGENT)"
    const headingLine = block.split('\n')[0] ?? '';
    const gapIdMatch = headingLine.match(/\b(G-\d+)\b/);
    const gapId = gapIdMatch ? gapIdMatch[1] : `G-${String(i + 1).padStart(2, '0')}`;
    const isUrgentHeading = /URGENT/i.test(headingLine);

    const typeMatch = block.match(/\*\*Type:\*\*\s*(\w+)/i);
    const actionType = typeMatch ? typeMatch[1].toUpperCase() : 'UNKNOWN';

    // Deadline: look for ISO date in the deadline line
    const deadlineLineMatch = block.match(/\*\*Deadline:\*\*[^\n]+/i);
    const deadlineLine = deadlineLineMatch ? deadlineLineMatch[0] : '';
    const dateMatch = deadlineLine.match(/\d{4}-\d{2}-\d{2}/);
    const deadline = dateMatch ? dateMatch[0] : undefined;
    const isUrgent = isUrgentHeading || /URGENT/i.test(deadlineLine);

    // Gated on: extract the reference (e.g. "Esc-3" or "E-03")
    const gatedMatch = block.match(/\*\*Gated on:\*\*\s*(.+)/i);
    let gatedOn: string | undefined;
    if (gatedMatch) {
      // Extract escalation/gap references from the text
      const refs = gatedMatch[1].match(/[A-Z]+-\d+/g);
      gatedOn = refs ? refs.join(', ') : gatedMatch[1].trim().slice(0, 60);
    }

    // Evidence target
    const evidenceMatch = block.match(/\*\*Evidence target:\*\*\s*(T\d)/i);
    const produces = evidenceMatch ? evidenceMatch[1].toUpperCase() : undefined;

    // Description: extract the **Description:** field value (first line only for summary)
    const descMatch = block.match(/\*\*Description:\*\*\s*([^\n]+)/i);
    let description = descMatch ? descMatch[1].trim() : headingLine.replace(/^\d+\s*[—-]\s*[A-Z0-9-]+:\s*/, '').replace(/\s*\(URGENT\)\s*$/i, '').trim();
    // Strip trailing bold markers if any
    description = description.replace(/\*\*/g, '');

    return {
      rank: i + 1,
      gapId,
      actionType,
      description,
      deadline,
      isUrgent,
      gatedOn,
      produces,
    };
  });

  // --- Blocked paths ---
  const blockedSection = sectionAfter(markdown, '## Blocked Execution Paths');
  const blockedLines = blockedSection
    .split('\n')
    .filter(l => l.trim().startsWith('-'));

  const blockedPaths: BlockedPath[] = blockedLines.map(line => {
    // Pattern: - **path name — BLOCKED...** reason
    // Or: - **path name** — BLOCKED... reason
    const boldMatch = line.match(/^-\s+\*\*([^*]+)\*\*\s*(.*)/);
    if (boldMatch) {
      const boldText = boldMatch[1].trim();
      const rest = boldMatch[2].trim();
      // The bold text may include "— BLOCKED (NEW)" etc; strip the BLOCKED marker for the path name
      const pathName = boldText.replace(/\s*[—\-]+\s*BLOCKED[^]*$/i, '').trim();
      // Combine any BLOCKED detail from bold with the trailing rest
      const blockedDetail = boldText.replace(/^[^—\-]+[—\-]?\s*/i, '').trim();
      const blocker = [blockedDetail, rest].filter(Boolean).join(' ').trim();
      return { path: pathName, blocker };
    }
    // Fallback: strip leading `- ` and split at ` — BLOCKED`
    const plain = line.replace(/^-\s+/, '');
    const splitIdx = plain.search(/\s+[—\-]+\s+BLOCKED/i);
    if (splitIdx !== -1) {
      return {
        path: plain.slice(0, splitIdx).trim(),
        blocker: plain.slice(splitIdx).replace(/^[^A-Za-z]+/, '').trim(),
      };
    }
    return { path: plain.trim(), blocker: '' };
  }).filter(b => b.path.length > 0);

  const pendingDecisions: PendingDecision[] = [];

  return {
    decisionState,
    passDate,
    passNumber,
    sellReady,
    scaleReady,
    actions,
    blockedPaths,
    pendingDecisions,
    workItems: [],
  };
}
