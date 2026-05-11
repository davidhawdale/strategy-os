import { describe, expect, it } from 'vitest';
import type { PanelId } from '../../model/types';
import {
  DASHBOARD_LAYOUT_STORAGE_KEY,
  clearPanelOrder,
  createPanelOrderExportSnippet,
  loadDashboardLayout,
  loadPanelOrder,
  moveOrderItem,
  movePanelOrderItem,
  moveSectionOrderItem,
  resolvePanelOrder,
  resolveSectionOrder,
  resolveSectionOrders,
  saveDashboardLayout,
  savePanelOrder,
} from '../layoutModel';
import { getDefaultNavigationPanelIds, getDefaultSectionOrders, getNavigationPanels } from '../panelRegistry';

function createStorage(initial: Record<string, string> = {}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => { values.set(key, value); },
    removeItem: (key: string) => { values.delete(key); },
  };
}

describe('dashboard layout model', () => {
  const defaultOrder: PanelId[] = ['gapLedger', 'escalations', 'deadlines'];

  it('uses the default order when no saved order exists', () => {
    expect(resolvePanelOrder(defaultOrder, null)).toEqual(defaultOrder);
  });

  it('uses saved order for known panel ids', () => {
    expect(resolvePanelOrder(defaultOrder, ['deadlines', 'gapLedger', 'escalations'])).toEqual([
      'deadlines',
      'gapLedger',
      'escalations',
    ]);
  });

  it('ignores unknown panel ids and appends missing known ids', () => {
    expect(resolvePanelOrder(defaultOrder, ['risk', 'deadlines'])).toEqual([
      'deadlines',
      'gapLedger',
      'escalations',
    ]);
  });

  it('moves a panel up or down without mutating the original order', () => {
    const movedUp = movePanelOrderItem(defaultOrder, 'escalations', 'up');
    const movedDown = movePanelOrderItem(defaultOrder, 'gapLedger', 'down');

    expect(movedUp).toEqual(['escalations', 'gapLedger', 'deadlines']);
    expect(movedDown).toEqual(['escalations', 'gapLedger', 'deadlines']);
    expect(defaultOrder).toEqual(['gapLedger', 'escalations', 'deadlines']);
  });

  it('moves generic ordered items without mutating the original order', () => {
    const order = ['header', 'actions', 'blockedPaths'];

    expect(moveOrderItem(order, 'actions', 'up')).toEqual(['actions', 'header', 'blockedPaths']);
    expect(moveOrderItem(order, 'actions', 'down')).toEqual(['header', 'blockedPaths', 'actions']);
    expect(moveOrderItem(order, 'header', 'up')).toEqual(order);
    expect(moveOrderItem(order, 'missing', 'down')).toEqual(order);
    expect(order).toEqual(['header', 'actions', 'blockedPaths']);
  });

  it('stores, loads, and clears local layout order', () => {
    const storage = createStorage();
    savePanelOrder(storage, ['deadlines', 'gapLedger']);

    expect(loadPanelOrder(storage)).toEqual(['deadlines', 'gapLedger']);

    clearPanelOrder(storage);
    expect(loadPanelOrder(storage)).toBeNull();
  });

  it('stores and loads section order alongside panel order', () => {
    const storage = createStorage();
    saveDashboardLayout(storage, {
      panelOrder: ['deadlines', 'gapLedger'],
      sectionOrders: {
        gapLedger: ['fullGapRecords', 'summary'],
        deadlines: ['forcedDispositions', 'summary'],
      },
    });

    expect(loadDashboardLayout(storage)).toEqual({
      panelOrder: ['deadlines', 'gapLedger'],
      sectionOrders: {
        gapLedger: ['fullGapRecords', 'summary'],
        deadlines: ['forcedDispositions', 'summary'],
      },
    });
  });

  it('returns null for invalid saved layout payloads', () => {
    const storage = createStorage({
      [DASHBOARD_LAYOUT_STORAGE_KEY]: JSON.stringify({ version: 2, panelOrder: ['gapLedger'] }),
    });

    expect(loadPanelOrder(storage)).toBeNull();
  });

  it('filters gap-analysis-only panels from resolved navigation', () => {
    const panelsWithoutGapAnalysis = getNavigationPanels(false, ['escalations', 'deadlines']);
    const panelIds = panelsWithoutGapAnalysis.map(panel => panel.id);

    expect(panelIds).toEqual(['escalations', 'deadlines']);
  });

  it('includes promoted hypothesis panels in the default navigation order', () => {
    expect(getDefaultNavigationPanelIds()).toEqual([
      'governorBrief',
      'problem',
      'segment',
      'unitEconomics',
      'valueProposition',
      'gapLedger',
      'escalations',
      'deadlines',
      'readiness',
      'evidence',
      'risk',
      'destruction',
      'proposals',
    ]);
  });

  it('applies section order to navigation panel metadata', () => {
    const [gapLedgerPanel] = getNavigationPanels(true, ['gapLedger'], {
      gapLedger: ['fullGapRecords', 'summary'],
    });

    expect(gapLedgerPanel.sections?.map(section => section.id)).toEqual([
      'fullGapRecords',
      'summary',
      'gateDecision',
      'rankedGaps',
    ]);
  });

  it('applies section order to promoted hypothesis panel metadata', () => {
    const [problemPanel] = getNavigationPanels(true, ['problem'], {
      problem: ['evidence', 'claim'],
    });

    expect(problemPanel.sections?.map(section => section.id).slice(0, 4)).toEqual([
      'evidence',
      'claim',
      'validationState',
      'possibilitySpace',
    ]);
  });

  it('provides distinct default section orders for promoted hypothesis panels', () => {
    const defaultSections = getDefaultSectionOrders();

    expect(defaultSections.problem).toEqual([
      'claim',
      'validationState',
      'possibilitySpace',
      'evidence',
      'researchSources',
      'problemScoring',
      'assumptions',
      'killSignal',
      'updateHistory',
    ]);
    expect(defaultSections.segment).toContain('painScoring');
    expect(defaultSections.unitEconomics).toContain('pricingInputs');
    expect(defaultSections.unitEconomics).toContain('calculatedMetrics');
    expect(defaultSections.valueProposition).toContain('clauseTracing');
    expect(defaultSections.valueProposition).toContain('competitorResponseCapability');
  });

  it('keeps unit economics-only sections out of problem and value proposition panels', () => {
    const defaultSections = getDefaultSectionOrders();

    expect(defaultSections.problem).not.toContain('modeThresholds');
    expect(defaultSections.problem).not.toContain('costStructure');
    expect(defaultSections.problem).not.toContain('jobs');
    expect(defaultSections.valueProposition).not.toContain('costStructure');
    expect(defaultSections.valueProposition).not.toContain('scenarioAnalysis');
    expect(defaultSections.valueProposition).not.toContain('modeThresholds');
  });

  it('keeps unit economics structured around economics-specific sections', () => {
    const defaultSections = getDefaultSectionOrders();

    expect(defaultSections.unitEconomics).toEqual(expect.arrayContaining([
      'pricingInputs',
      'channelStrategy',
      'costStructure',
      'calculatedMetrics',
      'scenarioAnalysis',
      'modeThresholds',
    ]));
  });

  it('resolves section order from defaults when there is no saved order', () => {
    expect(resolveSectionOrder(['header', 'actions'], null)).toEqual(['header', 'actions']);
  });

  it('uses saved section order while appending missing sections', () => {
    expect(resolveSectionOrder(['header', 'narrative', 'actions'], ['actions', 'header'])).toEqual([
      'actions',
      'header',
      'narrative',
    ]);
  });

  it('ignores unknown saved section ids', () => {
    expect(resolveSectionOrder(['header', 'actions'], ['unknown', 'actions'])).toEqual([
      'actions',
      'header',
    ]);
  });

  it('resolves all section orders by panel', () => {
    expect(resolveSectionOrders(
      { gapLedger: ['summary', 'rankedGaps'], risk: ['summary', 'killSignals'] },
      { gapLedger: ['rankedGaps'] },
    )).toEqual({
      gapLedger: ['rankedGaps', 'summary'],
      risk: ['summary', 'killSignals'],
    });
  });

  it('moves a section only within its panel', () => {
    const moved = moveSectionOrderItem(
      {
        gapLedger: ['summary', 'fullGapRecords', 'rankedGaps'],
        risk: ['summary', 'killSignals'],
      },
      'gapLedger',
      'fullGapRecords',
      'up',
    );

    expect(moved).toEqual({
      gapLedger: ['fullGapRecords', 'summary', 'rankedGaps'],
      risk: ['summary', 'killSignals'],
    });
  });

  it('loads old panel-only saved layouts safely', () => {
    const storage = createStorage({
      [DASHBOARD_LAYOUT_STORAGE_KEY]: JSON.stringify({ version: 1, panelOrder: ['gapLedger', 'risk'] }),
    });

    expect(loadDashboardLayout(storage)).toEqual({
      panelOrder: ['gapLedger', 'risk'],
      sectionOrders: undefined,
    });
  });

  it('exports the current order as a source-friendly snippet', () => {
    expect(createPanelOrderExportSnippet(['gapLedger', 'risk'])).toBe([
      'const PANEL_ORDER = [',
      "  'gapLedger',",
      "  'risk',",
      '];',
    ].join('\n'));
  });

  it('exports panel and section order as a source-friendly snippet', () => {
    expect(createPanelOrderExportSnippet(['gapLedger'], { gapLedger: ['fullGapRecords', 'summary'] })).toBe([
      'const PANEL_ORDER = [',
      "  'gapLedger',",
      '];',
      '',
      'const SECTION_ORDERS = {',
      "  gapLedger: ['fullGapRecords', 'summary'],",
      '};',
    ].join('\n'));
  });
});
