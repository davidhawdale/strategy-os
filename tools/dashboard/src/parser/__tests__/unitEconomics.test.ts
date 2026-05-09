import { describe, it, expect } from 'vitest';
import { splitSections } from '../sections';
import { parseHypothesis } from '../hypothesis';

const UNIT_ECON_HEADER = '## 3. Unit Economics\n\n**Confidence:** RESEARCHED\n\n';

function parseUE(body: string) {
  const md = UNIT_ECON_HEADER + body;
  const sections = splitSections(md);
  const section = sections.get('unitEconomics')!;
  return parseHypothesis(section, 'unitEconomics').hypothesis;
}

// ─── Scenario Analysis table ───────────────────────────────────────────────

describe('scenario analysis — table format', () => {
  const SCENARIO_TABLE = `
### Scenario Analysis

| Scenario    | Subs  | ARPU | Revenue | Costs | Contribution | Verdict                      |
| ----------- | ----- | ---- | ------- | ----- | ------------ | ---------------------------- |
| Optimistic  | 9,000 | £65  | £585K   | £390K | £195K        | Strong bootstrap             |
| Base        | 6,000 | £55  | £330K   | £345K | -£15K        | Marginal; bootstrap edge     |
| Pessimistic | 3,000 | £40  | £120K   | £295K | -£175K       | Not viable; kill             |
| Kill threshold | <3,000 | | | | | Below fixed cost floor    |
`;

  it('parses optimistic scenario from table', () => {
    const h = parseUE(SCENARIO_TABLE);
    expect(h.scenarioAnalysis?.optimistic).toBeDefined();
    expect(h.scenarioAnalysis!.optimistic!.subs).toBe('9,000');
    expect(h.scenarioAnalysis!.optimistic!.arpu).toBe('£65');
    expect(h.scenarioAnalysis!.optimistic!.revenue).toBe('£585K');
    expect(h.scenarioAnalysis!.optimistic!.narrative).toBe('Strong bootstrap');
  });

  it('parses base scenario from table', () => {
    const h = parseUE(SCENARIO_TABLE);
    expect(h.scenarioAnalysis?.base).toBeDefined();
    expect(h.scenarioAnalysis!.base!.subs).toBe('6,000');
    expect(h.scenarioAnalysis!.base!.contribution).toBe('-£15K');
  });

  it('parses pessimistic scenario from table', () => {
    const h = parseUE(SCENARIO_TABLE);
    expect(h.scenarioAnalysis?.pessimistic).toBeDefined();
    expect(h.scenarioAnalysis!.pessimistic!.narrative).toBe('Not viable; kill');
  });

  it('parses kill threshold from table', () => {
    const h = parseUE(SCENARIO_TABLE);
    expect(h.scenarioAnalysis?.kill).toBeDefined();
    expect(h.scenarioAnalysis!.kill).toContain('Below fixed cost floor');
  });
});

// ─── Mode Validation table ("Threshold" column) ────────────────────────────

describe('mode thresholds — Threshold column', () => {
  const MODE_TABLE = `
### Mode Validation

| Threshold             | Required (Bootstrap) | Estimated (Base) | Pass/Fail          |
| --------------------- | -------------------- | ---------------- | ------------------ |
| LTV:CAC               | >5:1                 | 6.9:1            | Pass (base only)   |
| Payback               | <6 months            | 8-12 months      | Fail in base; risk |
| Path to profitability | Within 18 months     | Conditional      | Conditional        |
`;

  it('detects mode thresholds from a Threshold-column table', () => {
    const h = parseUE(MODE_TABLE);
    expect(h.modeThresholds).toBeDefined();
    expect(h.modeThresholds!.length).toBe(3);
  });

  it('maps Threshold → metric correctly', () => {
    const h = parseUE(MODE_TABLE);
    expect(h.modeThresholds![0].metric).toBe('LTV:CAC');
    expect(h.modeThresholds![1].metric).toBe('Payback');
  });

  it('captures required and estimate columns', () => {
    const h = parseUE(MODE_TABLE);
    expect(h.modeThresholds![0].required).toBe('>5:1');
    expect(h.modeThresholds![0].estimate).toBe('6.9:1');
  });

  it('captures Pass/Fail text in passFail field', () => {
    const h = parseUE(MODE_TABLE);
    expect(h.modeThresholds![0].passFail).toBe('Pass (base only)');
    expect(h.modeThresholds![1].passFail).toBe('Fail in base; risk');
  });
});
