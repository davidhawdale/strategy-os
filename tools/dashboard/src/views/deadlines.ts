import type {
  HypothesisRegister,
  GapAnalysis,
  DecisionDeadlinesView,
  DecisionDeadline,
} from '../model/types';

export function computeDecisionDeadlinesView(
  register: HypothesisRegister,
  gapAnalysis?: GapAnalysis
): DecisionDeadlinesView {
  // Collect deadlines from register gap ledger
  const deadlines: DecisionDeadline[] = register.gapLedger?.decisionDeadlines ?? [];

  const today = new Date().toISOString().slice(0, 10);

  const approachingCount = deadlines.filter(d => {
    return d.status === 'DUE' || (d.status === 'OPEN' && d.dueDate <= today);
  }).length;

  const exceededCount = deadlines.filter(d => d.status === 'EXCEEDED').length;

  // Forced dispositions from gap analysis deadline rule
  const forcedDispositions = gapAnalysis?.decisionRulesApplication?.deadlineRule?.targets
    ?.filter(t => t.forcedOutcome)
    .map(t => ({
      target: t.target,
      dueDate: t.dueDate,
      forcedOutcome: t.forcedOutcome,
    })) ?? [];

  return {
    deadlines,
    approachingCount,
    exceededCount,
    forcedDispositions,
  };
}
