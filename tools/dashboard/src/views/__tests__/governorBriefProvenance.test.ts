import { describe, expect, it } from 'vitest';
import {
  resolveGovernorBriefResearchTrace,
  type BuildPassProvenanceManifest,
  type GovernorBriefSourceEntry,
} from '../governorBriefProvenance';

describe('resolveGovernorBriefResearchTrace', () => {
  it('maps research items to curated hypotheses and sources', () => {
    const manifest: BuildPassProvenanceManifest = {
      artifact: 'build-pass-complete',
      version: 1,
      whatWasResearched: [
        {
          label: 'Competitive landscape',
          hypotheses: ['problem', 'valueProposition'],
          sources: [
            {
              hypothesisId: 'problem',
              sourceKinds: ['research'],
              matchNameIncludes: ['Border Telegraph'],
            },
            {
              hypothesisId: 'valueProposition',
              sourceKinds: ['evidence'],
              matchNameIncludes: ['Southern Reporter'],
            },
          ],
        },
      ],
    };

    const sourcesByHypothesis: Record<'problem' | 'segment' | 'unitEconomics' | 'valueProposition', GovernorBriefSourceEntry[]> = {
      problem: [
        {
          hypothesisId: 'problem',
          hypothesisLabel: 'Problem',
          kind: 'research',
          raw: 'border telegraph source',
          name: 'media.info — Border Telegraph',
          description: 'Border Telegraph source',
        },
      ],
      segment: [],
      unitEconomics: [],
      valueProposition: [
        {
          hypothesisId: 'valueProposition',
          hypothesisLabel: 'Value Proposition',
          kind: 'evidence',
          raw: 'southern reporter source',
          name: 'Southern Reporter',
          description: 'Southern Reporter source',
        },
      ],
    };

    const result = resolveGovernorBriefResearchTrace(
      [{ label: 'Competitive landscape', markdown: '**Competitive landscape**: Weekly competitors and no daily product.' }],
      manifest,
      sourcesByHypothesis,
    );

    expect(result[0].relatedHypotheses).toEqual(['problem', 'valueProposition']);
    expect(result[0].sources.map(source => source.name)).toEqual([
      'media.info — Border Telegraph',
      'Southern Reporter',
    ]);
  });

  it('returns empty trace when no manifest entry exists', () => {
    const result = resolveGovernorBriefResearchTrace(
      [{ label: 'Unmapped', markdown: '**Unmapped**: No mapping yet.' }],
      {
        artifact: 'build-pass-complete',
        version: 1,
        whatWasResearched: [],
      },
      {
        problem: [],
        segment: [],
        unitEconomics: [],
        valueProposition: [],
      },
    );

    expect(result[0].relatedHypotheses).toEqual([]);
    expect(result[0].sources).toEqual([]);
  });
});
