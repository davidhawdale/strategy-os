import type { Hypothesis, HypothesisRegister, HypothesisId, RiskMapView, ValueProposition } from '../model/types';

const IDS: HypothesisId[] = ['problem', 'segment', 'unitEconomics', 'valueProposition'];

export function computeRiskMap(register: HypothesisRegister): RiskMapView {
  const assumptions = IDS.flatMap(id => {
    const h = register.hypotheses[id];
    return h.assumptions.map(a => {
      let riskLevel: 'critical' | 'high' | 'medium' | 'low';

      if (a.loadBearing && a.blastRadius === 'HIGH' && a.tier === 'T3') {
        riskLevel = 'critical';
      } else if (a.loadBearing && (a.blastRadius === 'HIGH' || a.tier === 'T3')) {
        riskLevel = 'high';
      } else if (a.loadBearing && a.blastRadius === 'MEDIUM') {
        riskLevel = 'medium';
      } else {
        riskLevel = 'low';
      }

      return {
        source: id,
        claim: a.claim,
        tag: a.tag,
        tier: a.tier,
        blastRadius: a.blastRadius,
        loadBearing: a.loadBearing,
        falsification: a.falsification,
        validation: a.validation,
        riskLevel,
      };
    });
  });

  const byCriticality = {
    critical: assumptions.filter(a => a.riskLevel === 'critical').length,
    high: assumptions.filter(a => a.riskLevel === 'high').length,
    medium: assumptions.filter(a => a.riskLevel === 'medium').length,
    low: assumptions.filter(a => a.riskLevel === 'low').length,
  };

  const killConditions = IDS
    .filter(id => hasKillCondition(register.hypotheses[id]))
    .map(id => ({
      hypothesis: id,
      condition: (register.hypotheses[id] as Hypothesis).killCondition!,
    }));

  return { assumptions, byCriticality, killConditions };
}

function hasKillCondition(hypothesis: Hypothesis | ValueProposition): hypothesis is Hypothesis {
  return 'killCondition' in hypothesis && !!hypothesis.killCondition;
}
