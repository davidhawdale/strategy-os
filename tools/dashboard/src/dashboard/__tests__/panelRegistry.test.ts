import { describe, expect, it, vi } from 'vitest';
import type { CombinedParseResult, ExecutionQueueView } from '../../model/types';
import { getDefaultNavigationPanelIds, getDefaultSectionOrders, renderDashboardPanel } from '../panelRegistry';

const data = {
  register: {
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
  },
  registerWarnings: [],
  gapAnalysisWarnings: [],
  registerParseCompleteness: 1,
  gapAnalysisParseCompleteness: 0,
} satisfies CombinedParseResult;

const queueView: ExecutionQueueView = {
  decisionState: 'WAITING_ON_RESEARCH',
  sellReady: false,
  scaleReady: false,
  actions: [],
  blockedPaths: [],
  pendingDecisions: [],
  workItems: [],
};

describe('renderDashboardPanel', () => {
  it('renders the governor brief panel and includes it in layout metadata', () => {
    const result = renderDashboardPanel('governorBrief', {
      register: data.register,
      queueView,
      sectionOrders: getDefaultSectionOrders(),
      onSelectHypothesis: vi.fn(),
      onSelectPanel: vi.fn(),
      onBack: vi.fn(),
    });

    expect(result).not.toBeNull();
    expect(getDefaultNavigationPanelIds()[0]).toBe('governorBrief');
    expect(getDefaultSectionOrders().governorBrief).toEqual([
      'researchFindings',
      'escalations',
      'gaps',
    ]);
    expect(getDefaultSectionOrders().strategySeed).toEqual(['strategySeed']);
  });

  it('does not include the removed queue panel in navigation defaults', () => {
    expect(getDefaultNavigationPanelIds()).not.toContain('queue');
  });

  it('warns in development when an unknown panel id is requested', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const result = renderDashboardPanel('missing-panel' as never, {} as never);

    expect(result).toBeNull();
    expect(warn).toHaveBeenCalledWith('Unknown dashboard panel id: missing-panel');

    warn.mockRestore();
  });
});
