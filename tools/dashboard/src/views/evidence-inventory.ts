import type {
  HypothesisRegister,
  EvidenceInventoryView,
  EvidenceItem,
  EvidenceType,
  HypothesisId,
} from '../model/types';

function countByTier(items: EvidenceItem[]): { t1: number; t2: number; t3: number } {
  const counts = { t1: 0, t2: 0, t3: 0 };
  for (const item of items) {
    if (item.tier === 'T1') counts.t1++;
    else if (item.tier === 'T2') counts.t2++;
    else if (item.tier === 'T3') counts.t3++;
  }
  return counts;
}

function countByType(items: EvidenceItem[]): Partial<Record<EvidenceType, number>> {
  const counts: Partial<Record<EvidenceType, number>> = {};
  for (const item of items) {
    if (item.type) {
      counts[item.type] = (counts[item.type] ?? 0) + 1;
    }
  }
  return counts;
}

export function computeEvidenceInventory(
  register: HypothesisRegister
): EvidenceInventoryView {
  const hypotheses: { id: HypothesisId; label: string; evidence: EvidenceItem[] }[] = [
    { id: 'problem', label: 'Problem', evidence: register.hypotheses.problem.evidence },
    { id: 'segment', label: 'Segment', evidence: register.hypotheses.segment.evidence },
    {
      id: 'unitEconomics',
      label: 'Unit Economics',
      evidence: register.hypotheses.unitEconomics.evidence,
    },
    {
      id: 'valueProposition',
      label: 'Value Proposition',
      evidence: register.hypotheses.valueProposition.evidence,
    },
  ];

  const byHypothesis = hypotheses.map(({ id, label, evidence }) => ({
    id,
    label,
    count: evidence.length,
    tierBreakdown: countByTier(evidence),
    typeBreakdown: countByType(evidence),
  }));

  const allEvidence = hypotheses.flatMap(h => h.evidence);

  const byTier = countByTier(allEvidence);

  const byType: Partial<Record<EvidenceType, number>> = countByType(allEvidence);

  return {
    byType,
    byTier,
    byHypothesis,
    totalItems: allEvidence.length,
  };
}
