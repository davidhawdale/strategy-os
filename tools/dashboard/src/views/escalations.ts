import type {
  BlastRadius,
  ExecutionQueueView,
  GovernorEscalationCard,
  GovernorEscalationsView,
  QueueWorkItem,
} from '../model/types';

export function computeGovernorEscalationsView(
  queueView?: ExecutionQueueView | null,
): GovernorEscalationsView {
  if (!queueView) {
    return { openEscalations: [], resolvedEscalations: [], totalOpen: 0 };
  }

  const cards = queueView.workItems
    .filter(item => item.kind === 'escalation')
    .map(item => queueItemToCard(item));

  const openEscalations = cards.filter(e => e.status === 'OPEN');
  const resolvedEscalations = cards.filter(e => e.status === 'RESOLVED');

  return {
    openEscalations,
    resolvedEscalations,
    totalOpen: openEscalations.length,
  };
}

function normalizeBlastRadius(raw?: string): BlastRadius | undefined {
  const upper = raw?.toUpperCase();
  if (upper?.includes('HIGH')) return 'HIGH';
  if (upper?.includes('MEDIUM')) return 'MEDIUM';
  if (upper?.includes('LOW')) return 'LOW';
  return undefined;
}

function normalizeStatus(raw?: string): 'OPEN' | 'RESOLVED' {
  return raw?.toUpperCase().includes('RESOLVED') ? 'RESOLVED' : 'OPEN';
}

function queueItemToCard(queueItem: QueueWorkItem): GovernorEscalationCard {
  return {
    id: queueItem.id,
    title: `${queueItem.id} — ${queueItem.title}`,
    status: normalizeStatus(queueItem.status),
    type: queueItem.type,
    blastRadius: normalizeBlastRadius(queueItem.blastRadius),
    blastRadiusRaw: queueItem.blastRadius,
    decisionNeeded: queueItem.decisionNeeded ?? queueItem.summary ?? '',
    whySystemCannotDecide: queueItem.whySystemCannotDecide,
    options: queueItem.options ?? [],
    systemRecommendation: queueItem.recommendation,
    whatIsAtStake: queueItem.whatIsAtStake,
    sourceFileName: queueItem.fileName,
    raisedBy: queueItem.raisedBy ?? queueItem.issuedBy,
    date: queueItem.date ?? queueItem.issued,
  };
}
