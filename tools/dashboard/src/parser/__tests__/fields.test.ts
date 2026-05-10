import { describe, it, expect } from 'vitest';
import {
  extractBlockAfterLabel,
  extractEvidenceItems,
  extractResearchSources,
  extractAssumptions,
  extractPossibilitySpace,
  extractDocumentBlock,
  extractDocumentBlocks,
} from '../fields';

// ─── extractBlockAfterLabel ────────────────────────────────────────────────

describe('extractBlockAfterLabel', () => {
  it('matches an exact H3 heading', () => {
    const text = '### Assumptions\n\nsome content\n\n---';
    const block = extractBlockAfterLabel(text, 'Assumptions');
    expect(block).toContain('some content');
  });

  it('matches an H3 heading with a subtitle', () => {
    const text = '### Possibility Space — Revenue Models\n\nsome content\n\n---';
    const block = extractBlockAfterLabel(text, 'Possibility Space');
    expect(block).toContain('some content');
  });

  it('does not match a partial word (e.g. AssumptionsExtra)', () => {
    const text = '### AssumptionsExtra\n\nshould not match\n\n---';
    const block = extractBlockAfterLabel(text, 'Assumptions');
    expect(block).toBeNull();
  });

  it('stops at the next H3', () => {
    const text = '### Assumptions\n\nA content\n\n### Evidence\n\nB content';
    const block = extractBlockAfterLabel(text, 'Assumptions');
    expect(block).toContain('A content');
    expect(block).not.toContain('B content');
  });

  it('matches a bold label', () => {
    const text = '**Assumptions:**\n\nsome content\n\n**Evidence:**\n\nother';
    const block = extractBlockAfterLabel(text, 'Assumptions');
    expect(block).toContain('some content');
    expect(block).not.toContain('other');
  });
});

// ─── extractDocumentBlock ─────────────────────────────────────────────────

describe('extractDocumentBlock', () => {
  it('extracts a named H3 document block and stops at the next H3', () => {
    const text = [
      '### Pricing Inputs',
      '',
      '| Input | Range |',
      '| --- | --- |',
      '| ARPU | £40-£75 |',
      '',
      '### Channel Strategy',
      '',
      'other content',
    ].join('\n');

    expect(extractDocumentBlock(text, 'Pricing Inputs')).toContain('| ARPU | £40-£75 |');
    expect(extractDocumentBlock(text, 'Pricing Inputs')).not.toContain('other content');
  });

  it('matches a heading prefix with a subtitle', () => {
    const text = '### Calculated Metrics (range-based)\n\nmetric content';

    expect(extractDocumentBlock(text, 'Calculated Metrics')).toBe('metric content');
  });

  it('extracts multiple document blocks by stable keys', () => {
    const text = [
      '### Clause-by-clause Tracing',
      '',
      'clause content',
      '',
      '### Competitive Landscape',
      '',
      'competitive content',
    ].join('\n');

    expect(extractDocumentBlocks(text, {
      clauseTracing: 'Clause-by-clause Tracing',
      competitiveLandscape: 'Competitive Landscape',
    })).toEqual({
      clauseTracing: 'clause content',
      competitiveLandscape: 'competitive content',
    });
  });
});

// ─── extractResearchSources ────────────────────────────────────────────────

describe('extractResearchSources', () => {
  it('parses a typed canonical research source line', () => {
    const text = [
      '### Research Sources',
      '',
      '- [WEB_RESEARCH] [T1] 2026-05-09 -- [Scottish Borders Council](https://www.scotborders.gov.uk/): SBC area population ~115,000.',
    ].join('\n');

    const { items } = extractResearchSources(text, 'problem');

    expect(items).toHaveLength(1);
    expect(items[0]).toMatchObject({
      type: 'WEB_RESEARCH',
      tier: 'T1',
      date: '2026-05-09',
      name: 'Scottish Borders Council',
      url: 'https://www.scotborders.gov.uk/',
      note: 'SBC area population ~115,000.',
    });
  });

  it('parses legacy untyped research source lines', () => {
    const text = [
      '### Research Sources',
      '',
      '- [T2] 2026-05-09 -- [Ofcom](https://www.ofcom.org.uk/): UK news consumption data.',
    ].join('\n');

    const { items } = extractResearchSources(text, 'problem');

    expect(items[0]).toMatchObject({
      tier: 'T2',
      date: '2026-05-09',
      name: 'Ofcom',
      url: 'https://www.ofcom.org.uk/',
      note: 'UK news consumption data.',
    });
    expect(items[0].type).toBeUndefined();
  });

  it('keeps malformed research source lines as plain descriptions', () => {
    const text = [
      '### Research Sources',
      '',
      '- Source without canonical metadata',
    ].join('\n');

    const { items } = extractResearchSources(text, 'problem');

    expect(items).toEqual([
      { raw: 'Source without canonical metadata', description: 'Source without canonical metadata' },
    ]);
  });
});

// ─── extractEvidenceItems ──────────────────────────────────────────────────

describe('extractEvidenceItems', () => {
  it('parses a structured evidence line', () => {
    const text = `### Evidence\n\n- [WEB_RESEARCH] [T1] 2026-05-09 -- [Press Gazette](https://pressgazette.co.uk/): regional ad RPMs.\n`;
    const { items } = extractEvidenceItems(text, 'Test');
    expect(items).toHaveLength(1);
    expect(items[0].type).toBe('WEB_RESEARCH');
    expect(items[0].tier).toBe('T1');
    expect(items[0].date).toBe('2026-05-09');
    expect(items[0].source).toBe('Press Gazette');
    expect(items[0].url).toBe('https://pressgazette.co.uk/');
    expect(items[0].detail).toBe('regional ad RPMs.');
  });

  it('strips backticks from evidence lines before parsing', () => {
    const text = `### Evidence\n\n- \`[WEB_RESEARCH] [T2] 2026-05-09 -- [Ofcom](https://ofcom.org.uk/): news consumption data.\`\n`;
    const { items } = extractEvidenceItems(text, 'Test');
    expect(items).toHaveLength(1);
    expect(items[0].type).toBe('WEB_RESEARCH');
    expect(items[0].source).toBe('Ofcom');
    expect(items[0].url).toBe('https://ofcom.org.uk/');
  });

  it('extracts a markdown link from an unstructured fallback line', () => {
    const text = `### Evidence\n\n- See [Southern Reporter](https://thesouthernreporter.co.uk/) for context.\n`;
    const { items } = extractEvidenceItems(text, 'Test');
    expect(items).toHaveLength(1);
    expect(items[0].source).toBe('Southern Reporter');
    expect(items[0].url).toBe('https://thesouthernreporter.co.uk/');
  });

  it('returns empty for no evidence section', () => {
    const { items } = extractEvidenceItems('### Claim\n\nno evidence here', 'Test');
    expect(items).toHaveLength(0);
  });
});

// ─── extractAssumptions ────────────────────────────────────────────────────

describe('extractAssumptions', () => {
  const TABLE_BLOCK = `
### Assumptions

| #  | Classification | Tier | Claim                    | Load-bearing | Blast  | Falsification         | Validation          | Status        |
| -- | -------------- | ---- | ------------------------ | ------------ | ------ | --------------------- | ------------------- | ------------- |
| A1 | Belief         | T3   | Pain is real and ongoing | Yes          | High   | <30% say they want it | Resident survey     | OPEN          |
| A2 | Knowledge      | T2   | Weekly cadence is late   | No           | Medium | Ofcom shows weekly    | Ofcom report        | RESOLVED_TRUE |
| A3 | Observation    | T1   | FB groups are active     | Yes          | Low    | Groups have <100 posts| Manual count        | TESTING       |
`;

  it('parses a markdown table into assumption items', () => {
    const { items } = extractAssumptions(TABLE_BLOCK, 'Test');
    expect(items).toHaveLength(3);
  });

  it('maps Classification to tag correctly', () => {
    const { items } = extractAssumptions(TABLE_BLOCK, 'Test');
    expect(items[0].tag).toBe('B');
    expect(items[1].tag).toBe('K');
    expect(items[2].tag).toBe('O');
  });

  it('maps Tier correctly', () => {
    const { items } = extractAssumptions(TABLE_BLOCK, 'Test');
    expect(items[0].tier).toBe('T3');
    expect(items[1].tier).toBe('T2');
    expect(items[2].tier).toBe('T1');
  });

  it('maps Load-bearing to boolean', () => {
    const { items } = extractAssumptions(TABLE_BLOCK, 'Test');
    expect(items[0].loadBearing).toBe(true);
    expect(items[1].loadBearing).toBe(false);
  });

  it('maps Blast radius correctly', () => {
    const { items } = extractAssumptions(TABLE_BLOCK, 'Test');
    expect(items[0].blastRadius).toBe('HIGH');
    expect(items[1].blastRadius).toBe('MEDIUM');
    expect(items[2].blastRadius).toBe('LOW');
  });

  it('maps Status correctly', () => {
    const { items } = extractAssumptions(TABLE_BLOCK, 'Test');
    expect(items[0].status).toBe('OPEN');
    expect(items[1].status).toBe('RESOLVED_TRUE');
    expect(items[2].status).toBe('TESTING');
  });

  it('captures falsification and validation text', () => {
    const { items } = extractAssumptions(TABLE_BLOCK, 'Test');
    expect(items[0].falsification).toBe('<30% say they want it');
    expect(items[0].validation).toBe('Resident survey');
  });

  it('returns empty for no assumptions section', () => {
    const { items } = extractAssumptions('### Claim\n\nno assumptions', 'Test');
    expect(items).toHaveLength(0);
  });
});

// ─── extractPossibilitySpace ───────────────────────────────────────────────

describe('extractPossibilitySpace', () => {
  const EXACT_HEADING = `
### Possibility Space

**Considered:**

1. **Option A (PRIMARY)** — first option description.
2. **Option B** — second option description.

**Alternatives carried:**

- *Option B (#2)* — carry as secondary.

**Eliminated:**

- *Option C* -- eliminated: too niche.

---
`;

  const SUBTITLE_HEADING = EXACT_HEADING.replace(
    '### Possibility Space',
    '### Possibility Space — Revenue Models',
  );

  it('parses a Possibility Space section with exact heading', () => {
    const ps = extractPossibilitySpace(EXACT_HEADING);
    expect(ps).not.toBeUndefined();
    expect(ps!.considered).toHaveLength(2);
  });

  it('parses a Possibility Space section with a subtitle in the heading', () => {
    const ps = extractPossibilitySpace(SUBTITLE_HEADING);
    expect(ps).not.toBeUndefined();
    expect(ps!.considered).toHaveLength(2);
  });

  it('identifies the PRIMARY entry', () => {
    const ps = extractPossibilitySpace(EXACT_HEADING);
    const primary = ps!.considered.find(e => e.includes('(PRIMARY)'));
    expect(primary).toBeDefined();
    expect(primary).toContain('Option A');
  });

  it('parses alternatives carried', () => {
    const ps = extractPossibilitySpace(EXACT_HEADING);
    expect(ps!.alternativesCarried).toHaveLength(1);
    expect(ps!.alternativesCarried[0]).toContain('Option B (#2)');
  });

  it('parses eliminated entries', () => {
    const ps = extractPossibilitySpace(EXACT_HEADING);
    expect(ps!.eliminated).toHaveLength(1);
    expect(ps!.eliminated[0].candidate).toContain('Option C');
  });
});
