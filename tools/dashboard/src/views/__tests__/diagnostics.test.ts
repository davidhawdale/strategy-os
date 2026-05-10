import { describe, expect, it } from 'vitest';
import type { CombinedParseResult, HypothesisRegister } from '../../model/types';
import { computeParseDiagnostics } from '../diagnostics';

const register = {
  metadata: { sellReady: false, scaleReady: false },
  hypotheses: {
    problem: { id: 'problem', evidence: [], researchSources: [], assumptions: [] },
    segment: { id: 'segment', evidence: [], researchSources: [], assumptions: [] },
    unitEconomics: { id: 'unitEconomics', evidence: [], researchSources: [], assumptions: [] },
    valueProposition: { evidence: [], assumptions: [], clauseValidation: [] },
  },
  proposals: {
    growthArchitecture: { requiredConditions: [], assumptions: [] },
    solutionDesign: {
      featureMap: [],
      growthLoops: [],
      constraintsFromHypotheses: [],
      adequacyCriteria: [],
    },
    gtmPlan: {
      channelSequence: [],
      operationalConstraints: [],
      successCriteria: [],
      killCriteria: [],
    },
  },
} satisfies HypothesisRegister;

function makeCombined(overrides: Partial<CombinedParseResult> = {}): CombinedParseResult {
  return {
    register,
    registerWarnings: [],
    gapAnalysisWarnings: [],
    registerParseCompleteness: 1,
    gapAnalysisParseCompleteness: 0,
    ...overrides,
  };
}

describe('computeParseDiagnostics', () => {
  it('returns calm empty diagnostics when there are no warnings', () => {
    const view = computeParseDiagnostics(makeCombined());

    expect(view.counts).toEqual({ error: 0, warning: 0, info: 0, total: 0 });
    expect(view.items).toEqual([]);
    expect(view.completeness.overall).toBe(1);
  });

  it('surfaces parser source paths when the loader provides them', () => {
    const view = computeParseDiagnostics(makeCombined({
      sourcePaths: {
        register: '/hypotheses.md',
        gapAnalysis: '/gap-analysis.md',
      },
    }));

    expect(view.sourcePaths).toEqual({
      register: '/hypotheses.md',
      gapAnalysis: '/gap-analysis.md',
    });
  });

  it('keeps gap-analysis source path empty when gap analysis is absent', () => {
    const view = computeParseDiagnostics(makeCombined({
      sourcePaths: {
        register: '/hypotheses.md',
      },
    }));

    expect(view.sourcePaths.gapAnalysis).toBeUndefined();
    expect(view.completeness.gapAnalysis).toBe(0);
  });

  it('combines register and gap analysis warnings with source labels', () => {
    const view = computeParseDiagnostics(makeCombined({
      registerWarnings: [
        { section: 'metadata', field: 'created', message: 'Missing date', severity: 'warning' },
      ],
      gapAnalysisWarnings: [
        { section: 'gateSummary', field: 'section', message: 'Missing section', severity: 'error' },
        { section: 'rankedGaps', field: 'section', message: 'No ranked gaps', severity: 'info' },
      ],
    }));

    expect(view.items.map(item => item.source)).toEqual(['register', 'gapAnalysis', 'gapAnalysis']);
    expect(view.counts).toEqual({ error: 1, warning: 1, info: 1, total: 3 });
    expect(view.bySource.register.total).toBe(1);
    expect(view.bySource.gapAnalysis.total).toBe(2);
  });

  it('groups diagnostics by severity', () => {
    const view = computeParseDiagnostics(makeCombined({
      registerWarnings: [
        { section: 'root', field: 'document', message: 'Empty document', severity: 'error' },
        { section: 'problem', field: 'evidence', message: 'No evidence', severity: 'info' },
      ],
    }));

    expect(view.bySeverity.error).toHaveLength(1);
    expect(view.bySeverity.warning).toHaveLength(0);
    expect(view.bySeverity.info).toHaveLength(1);
  });
});
