import './EvidenceTierLegendSection.css';

export function EvidenceTierLegendSection() {
  return (
    <div className="tier-legend">
      <div className="tier-legend__item">
        <span className="tier-legend__badge tier-legend__badge--t1">T1</span>
        <div className="tier-legend__text">
          <strong>Derivable</strong> - from public data through valid reasoning. Census, industry reports, published regulations, competitor websites.
        </div>
      </div>
      <div className="tier-legend__item">
        <span className="tier-legend__badge tier-legend__badge--t2">T2</span>
        <div className="tier-legend__text">
          <strong>Synthesized</strong> - plausible conclusions combining data with structural reasoning. These are bets, not findings.
        </div>
      </div>
      <div className="tier-legend__item">
        <span className="tier-legend__badge tier-legend__badge--t3">T3</span>
        <div className="tier-legend__text">
          <strong>Needs ground truth</strong> - requires contact with reality the system does not have. Governor must run tests.
        </div>
      </div>
    </div>
  );
}
