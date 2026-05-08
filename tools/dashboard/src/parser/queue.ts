import type { ExecutionQueueView, QueueAction, BlockedPath } from '../model/types';

function extractBoldField(text: string, label: string): string | undefined {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const m = text.match(new RegExp(`\\*\\*${escaped}:\\*\\*\\s*(.+)`, 'i'));
  return m ? m[1].trim() : undefined;
}

function sectionAfter(markdown: string, heading: string): string {
  const idx = markdown.indexOf(heading);
  if (idx === -1) return '';
  const after = markdown.slice(idx + heading.length);
  const nextH2 = after.search(/\n## /);
  return nextH2 === -1 ? after : after.slice(0, nextH2);
}

export function parseExecutionQueue(markdown: string): ExecutionQueueView {
  // --- Header fields (preamble before first ---) ---
  const preamble = markdown.split(/\n---/)[0] ?? markdown;

  const rawDate = extractBoldField(preamble, 'Date');
  const passDate = rawDate?.match(/\d{4}-\d{2}-\d{2}/)?.[0];

  const rawPass = extractBoldField(preamble, 'Pass');
  const passNumber = rawPass ? parseInt(rawPass, 10) || undefined : undefined;

  const rawSell = extractBoldField(preamble, 'Sell Ready');
  const sellReady = rawSell?.toLowerCase().startsWith('true') ?? false;

  const rawScale = extractBoldField(preamble, 'Scale Ready');
  const scaleReady = rawScale?.toLowerCase().startsWith('true') ?? false;

  const rawDecision = extractBoldField(preamble, 'Decision');
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

  return {
    decisionState,
    passDate,
    passNumber,
    sellReady,
    scaleReady,
    actions,
    blockedPaths,
  };
}
