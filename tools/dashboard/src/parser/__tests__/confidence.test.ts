import { describe, expect, it } from 'vitest';
import { splitSections } from '../sections';
import { parseValueProposition } from '../value-proposition';

function parseVP(confidenceLine: string) {
  const md = `## 4. Value Proposition

${confidenceLine}

### Claim

A value proposition claim.
`;
  const sections = splitSections(md);
  return parseValueProposition(sections.get('valueProposition')!).valueProposition;
}

describe('value proposition confidence field variants', () => {
  it('parses legacy Confidence label', () => {
    const vp = parseVP('**Confidence:** RESEARCHED');
    expect(vp.confidence).toBe('RESEARCHED');
  });

  it('parses Confidence State label', () => {
    const vp = parseVP('**Confidence State:** RESEARCHED');
    expect(vp.confidence).toBe('RESEARCHED');
  });
});
