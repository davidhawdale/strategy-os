import type { PanelId } from '../model/types';

export const DASHBOARD_LAYOUT_STORAGE_KEY = 'strategist-dashboard-layout:v1';

export type SectionOrderMap = Partial<Record<PanelId, string[]>>;

export interface DashboardLayout {
  panelOrder: PanelId[];
  sectionOrders: SectionOrderMap;
}

interface SavedDashboardLayout {
  version: 1;
  panelOrder: PanelId[];
  sectionOrders?: SectionOrderMap;
}

interface LayoutStorage {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
}

export function resolvePanelOrder(defaultOrder: PanelId[], savedOrder?: PanelId[] | null): PanelId[] {
  if (!savedOrder) return [...defaultOrder];

  const knownIds = new Set(defaultOrder);
  const orderedKnownIds = savedOrder.filter((id): id is PanelId => knownIds.has(id));
  const orderedSet = new Set(orderedKnownIds);
  const missingIds = defaultOrder.filter(id => !orderedSet.has(id));

  return [...orderedKnownIds, ...missingIds];
}

export function resolveSectionOrder(defaultOrder: string[], savedOrder?: string[] | null): string[] {
  if (!savedOrder) return [...defaultOrder];

  const knownIds = new Set(defaultOrder);
  const orderedKnownIds = savedOrder.filter(id => knownIds.has(id));
  const orderedSet = new Set(orderedKnownIds);
  const missingIds = defaultOrder.filter(id => !orderedSet.has(id));

  return [...orderedKnownIds, ...missingIds];
}

export function resolveSectionOrders(
  defaultOrders: SectionOrderMap,
  savedOrders?: SectionOrderMap | null,
): SectionOrderMap {
  return Object.fromEntries(
    Object.entries(defaultOrders).map(([panelId, defaultOrder]) => [
      panelId,
      resolveSectionOrder(defaultOrder, savedOrders?.[panelId as PanelId]),
    ]),
  ) as SectionOrderMap;
}

export function movePanelOrderItem(order: PanelId[], id: PanelId, direction: 'up' | 'down'): PanelId[] {
  const index = order.indexOf(id);
  if (index === -1) return [...order];

  const targetIndex = direction === 'up' ? index - 1 : index + 1;
  if (targetIndex < 0 || targetIndex >= order.length) return [...order];

  const nextOrder = [...order];
  const [item] = nextOrder.splice(index, 1);
  nextOrder.splice(targetIndex, 0, item);
  return nextOrder;
}

export function moveSectionOrderItem(
  sectionOrders: SectionOrderMap,
  panel: PanelId,
  section: string,
  direction: 'up' | 'down',
): SectionOrderMap {
  const currentOrder = sectionOrders[panel];
  if (!currentOrder) return { ...sectionOrders };

  return {
    ...sectionOrders,
    [panel]: moveStringOrderItem(currentOrder, section, direction),
  };
}

function moveStringOrderItem(order: string[], id: string, direction: 'up' | 'down'): string[] {
  const index = order.indexOf(id);
  if (index === -1) return [...order];

  const targetIndex = direction === 'up' ? index - 1 : index + 1;
  if (targetIndex < 0 || targetIndex >= order.length) return [...order];

  const nextOrder = [...order];
  const [item] = nextOrder.splice(index, 1);
  nextOrder.splice(targetIndex, 0, item);
  return nextOrder;
}

export function parseStoredDashboardLayout(raw: string | null): Partial<DashboardLayout> {
  if (!raw) return {};

  try {
    const parsed = JSON.parse(raw) as Partial<SavedDashboardLayout>;
    if (parsed.version !== 1) return {};

    const panelOrder = Array.isArray(parsed.panelOrder)
      ? parsed.panelOrder.filter((id): id is PanelId => typeof id === 'string')
      : undefined;
    const sectionOrders = parseSectionOrders(parsed.sectionOrders);

    return { panelOrder, sectionOrders };
  } catch {
    return {};
  }
}

function parseSectionOrders(sectionOrders: unknown): SectionOrderMap | undefined {
  if (!sectionOrders || typeof sectionOrders !== 'object' || Array.isArray(sectionOrders)) {
    return undefined;
  }

  return Object.fromEntries(
    Object.entries(sectionOrders)
      .filter(([, order]) => Array.isArray(order))
      .map(([panelId, order]) => [
        panelId,
        (order as unknown[]).filter((id): id is string => typeof id === 'string'),
      ]),
  ) as SectionOrderMap;
}

export function parseStoredPanelOrder(raw: string | null): PanelId[] | null {
  return parseStoredDashboardLayout(raw).panelOrder ?? null;
}

export function loadDashboardLayout(storage: LayoutStorage): Partial<DashboardLayout> {
  return parseStoredDashboardLayout(storage.getItem(DASHBOARD_LAYOUT_STORAGE_KEY));
}

export function loadPanelOrder(storage: LayoutStorage): PanelId[] | null {
  return loadDashboardLayout(storage).panelOrder ?? null;
}

export function saveDashboardLayout(storage: LayoutStorage, layout: DashboardLayout) {
  const payload: SavedDashboardLayout = {
    version: 1,
    panelOrder: layout.panelOrder,
    sectionOrders: layout.sectionOrders,
  };
  storage.setItem(DASHBOARD_LAYOUT_STORAGE_KEY, JSON.stringify(payload));
}

export function savePanelOrder(storage: LayoutStorage, order: PanelId[]) {
  saveDashboardLayout(storage, { panelOrder: order, sectionOrders: {} });
}

export function clearPanelOrder(storage: LayoutStorage) {
  storage.removeItem(DASHBOARD_LAYOUT_STORAGE_KEY);
}

export function createPanelOrderExportSnippet(order: PanelId[], sectionOrders: SectionOrderMap = {}): string {
  const lines = order.map(id => `  '${id}',`);
  const sectionEntries = Object.entries(sectionOrders)
    .filter(([, sections]) => sections && sections.length > 0)
    .map(([panelId, sections]) => `  ${panelId}: [${sections.map(section => `'${section}'`).join(', ')}],`);

  if (sectionEntries.length === 0) {
    return ['const PANEL_ORDER = [', ...lines, '];'].join('\n');
  }

  return [
    'const PANEL_ORDER = [',
    ...lines,
    '];',
    '',
    'const SECTION_ORDERS = {',
    ...sectionEntries,
    '};',
  ].join('\n');
}
