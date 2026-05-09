import type { ScenarioAnalysis, ScenarioEntry } from '../../../model/types';
import './ScenarioAnalysisSection.css';

interface Props {
  scenarioAnalysis: ScenarioAnalysis;
}

function ScenarioCard({ label, scenario }: { label: string; scenario: ScenarioEntry }) {
  const hasTableMetrics = scenario.subs || scenario.arpu || scenario.revenue || scenario.costs || scenario.contribution;
  const hasRatioMetrics = scenario.ltvCacRange || scenario.paybackMonthsRange || scenario.grossMarginRange;

  return (
    <div className="scenario-card">
      <h4 className="scenario-card__label">{label}</h4>
      {hasRatioMetrics && (
        <>
          {scenario.ltvCacRange && (
            <div className="scenario-card__metric">
              <span className="scenario-card__value">{scenario.ltvCacRange}</span>
              <span className="scenario-card__name">LTV:CAC</span>
            </div>
          )}
          {scenario.paybackMonthsRange && (
            <div className="scenario-card__metric">
              <span className="scenario-card__value">{scenario.paybackMonthsRange}</span>
              <span className="scenario-card__name">Payback</span>
            </div>
          )}
          {scenario.grossMarginRange && (
            <div className="scenario-card__metric">
              <span className="scenario-card__value">{scenario.grossMarginRange}</span>
              <span className="scenario-card__name">Gross Margin</span>
            </div>
          )}
        </>
      )}
      {hasTableMetrics && (
        <div className="scenario-card__table-metrics">
          {scenario.subs && <div className="scenario-card__row"><span className="scenario-card__row-label">Subs</span><span>{scenario.subs}</span></div>}
          {scenario.arpu && <div className="scenario-card__row"><span className="scenario-card__row-label">ARPU</span><span>{scenario.arpu}</span></div>}
          {scenario.revenue && <div className="scenario-card__row"><span className="scenario-card__row-label">Revenue</span><span>{scenario.revenue}</span></div>}
          {scenario.costs && <div className="scenario-card__row"><span className="scenario-card__row-label">Costs</span><span>{scenario.costs}</span></div>}
          {scenario.contribution && <div className="scenario-card__row"><span className="scenario-card__row-label">Contribution</span><span>{scenario.contribution}</span></div>}
        </div>
      )}
      {scenario.narrative && (
        <p className="scenario-card__narrative">{scenario.narrative}</p>
      )}
    </div>
  );
}

export function ScenarioAnalysisSection({ scenarioAnalysis }: Props) {
  return (
    <div className="detail-section">
      <h3 className="section-heading">Scenario Analysis</h3>
      <div className="scenario-grid">
        {scenarioAnalysis.base && <ScenarioCard label="Base" scenario={scenarioAnalysis.base} />}
        {scenarioAnalysis.optimistic && <ScenarioCard label="Optimistic" scenario={scenarioAnalysis.optimistic} />}
        {scenarioAnalysis.pessimistic && <ScenarioCard label="Pessimistic" scenario={scenarioAnalysis.pessimistic} />}
      </div>
    </div>
  );
}
