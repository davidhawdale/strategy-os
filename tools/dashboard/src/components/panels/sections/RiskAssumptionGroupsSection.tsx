import type { RiskMapView } from '../../../model/types';
import { BlastRadiusBadge } from '../../shared/BlastRadiusBadge';
import { TierBadge } from '../../shared/TierBadge';
import './RiskAssumptionGroupsSection.css';

const RISK_ORDER = ['critical', 'high', 'medium', 'low'] as const;

const HYPOTHESIS_LABELS: Record<string, string> = {
  problem: 'Problem',
  segment: 'Segment',
  unitEconomics: 'Unit Economics',
  valueProposition: 'Value Proposition',
  growthArchitecture: 'Growth Architecture',
  solutionDesign: 'Solution Design',
  gtmPlan: 'GTM Plan',
};

interface Props {
  assumptions: RiskMapView['assumptions'];
}

export function RiskAssumptionGroupsSection({ assumptions }: Props) {
  return (
    <>
      {RISK_ORDER.map(level => {
        const items = assumptions.filter(assumption => assumption.riskLevel === level);
        if (items.length === 0) return null;

        return (
          <div key={level} className="risk-group">
            <h3 className={`risk-group__heading risk-group__heading--${level}`}>
              {level.charAt(0).toUpperCase() + level.slice(1)} Risk
              <span className="risk-group__count">{items.length}</span>
            </h3>
            <ul className="risk-group__list">
              {items.map((assumption, i) => (
                <li key={i} className={`risk-item risk-item--${level}`}>
                  <div className="risk-item__header">
                    <span className="risk-item__hypothesis">
                      {getSourceLabel(assumption)}
                    </span>
                    <div className="risk-item__badges">
                      <TierBadge tier={assumption.tier} />
                      <BlastRadiusBadge radius={assumption.blastRadius} />
                      {assumption.loadBearing && <span className="badge badge--load-bearing">Load-Bearing</span>}
                    </div>
                  </div>
                  <p className="risk-item__claim">{assumption.claim}</p>
                  {assumption.falsification && (
                    <div className="risk-item__detail">
                      <strong>Falsification:</strong> {assumption.falsification}
                    </div>
                  )}
                  {assumption.validation && (
                    <div className="risk-item__detail">
                      <strong>Validation:</strong> {assumption.validation}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </>
  );
}

function getSourceLabel(assumption: RiskMapView['assumptions'][number]) {
  const legacyHypothesis = (assumption as { hypothesis?: string }).hypothesis;
  const source = assumption.source ?? legacyHypothesis ?? 'unknown';
  return HYPOTHESIS_LABELS[source] ?? source;
}
