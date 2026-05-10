import { useCallback, useState } from 'react';
import type { PanelId } from '../model/types';
import {
  getDefaultNavigationPanelIds,
  getDefaultSectionOrders,
  getLayoutEditorPanels,
  getNavigationPanels,
} from '../dashboard/panelRegistry';
import type { DashboardLayout, SectionOrderMap } from '../dashboard/layoutModel';
import {
  clearPanelOrder,
  loadDashboardLayout,
  movePanelOrderItem,
  moveSectionOrderItem,
  resolvePanelOrder,
  resolveSectionOrders,
  saveDashboardLayout,
} from '../dashboard/layoutModel';

const DEFAULT_PANEL_ORDER = getDefaultNavigationPanelIds();
const DEFAULT_SECTION_ORDERS = getDefaultSectionOrders();

function loadInitialDashboardLayout(): DashboardLayout {
  const defaultLayout = {
    panelOrder: DEFAULT_PANEL_ORDER,
    sectionOrders: DEFAULT_SECTION_ORDERS,
  };
  if (typeof window === 'undefined') return defaultLayout;

  try {
    const savedLayout = loadDashboardLayout(window.localStorage);
    return {
      panelOrder: resolvePanelOrder(DEFAULT_PANEL_ORDER, savedLayout.panelOrder),
      sectionOrders: resolveSectionOrders(DEFAULT_SECTION_ORDERS, savedLayout.sectionOrders),
    };
  } catch {
    return defaultLayout;
  }
}

const INITIAL_DASHBOARD_LAYOUT = loadInitialDashboardLayout();

export function useDashboardLayout(hasGapAnalysis: boolean) {
  const [panelOrder, setPanelOrder] = useState<PanelId[]>(INITIAL_DASHBOARD_LAYOUT.panelOrder);
  const [sectionOrders, setSectionOrders] = useState<SectionOrderMap>(INITIAL_DASHBOARD_LAYOUT.sectionOrders);

  const movePanel = useCallback((panel: PanelId, direction: 'up' | 'down') => {
    setPanelOrder(currentOrder => {
      const nextOrder = movePanelOrderItem(currentOrder, panel, direction);
      try {
        saveDashboardLayout(window.localStorage, { panelOrder: nextOrder, sectionOrders });
      } catch {
        // Local layout persistence is a convenience; the live layout can still update.
      }
      return nextOrder;
    });
  }, [sectionOrders]);

  const moveSection = useCallback((panel: PanelId, section: string, direction: 'up' | 'down') => {
    setSectionOrders(currentOrders => {
      const nextOrders = moveSectionOrderItem(currentOrders, panel, section, direction);
      try {
        saveDashboardLayout(window.localStorage, { panelOrder, sectionOrders: nextOrders });
      } catch {
        // Local layout persistence is a convenience; the live layout can still update.
      }
      return nextOrders;
    });
  }, [panelOrder]);

  const resetLayout = useCallback(() => {
    const defaultOrder = [...DEFAULT_PANEL_ORDER];
    const defaultSectionOrders = { ...DEFAULT_SECTION_ORDERS };
    setPanelOrder(defaultOrder);
    setSectionOrders(defaultSectionOrders);
    try {
      clearPanelOrder(window.localStorage);
    } catch {
      // Ignore storage failures and keep the reset visible for this session.
    }
  }, []);

  return {
    panelOrder,
    sectionOrders,
    navigationPanels: getNavigationPanels(hasGapAnalysis, panelOrder, sectionOrders),
    layoutEditorPanels: getLayoutEditorPanels(panelOrder, sectionOrders),
    movePanel,
    moveSection,
    resetLayout,
  };
}
