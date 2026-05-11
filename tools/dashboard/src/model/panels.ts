import type { PanelId } from './types';

export type AddressablePanelId = Exclude<PanelId, 'detail'>;

export const DEFAULT_PANEL_ID: AddressablePanelId = 'governorBrief';
export const DETAIL_FALLBACK_PANEL_ID: AddressablePanelId = 'readiness';

const ADDRESSABLE_PANEL_IDS = [
  'governorBrief',
  'problem',
  'segment',
  'unitEconomics',
  'valueProposition',
  'readiness',
  'gapLedger',
  'evidence',
  'risk',
  'destruction',
  'proposals',
  'escalations',
  'deadlines',
] satisfies AddressablePanelId[];

export function isAddressablePanelId(value: string | null | undefined): value is AddressablePanelId {
  return !!value && ADDRESSABLE_PANEL_IDS.includes(value as AddressablePanelId);
}

export function getAddressablePanelIdFromSearch(search: string): AddressablePanelId | null {
  const panel = new URLSearchParams(search).get('panel');
  return isAddressablePanelId(panel) ? panel : null;
}

export function getInitialPanelIdFromLocation(search: string): AddressablePanelId {
  return getAddressablePanelIdFromSearch(search) ?? DEFAULT_PANEL_ID;
}

export function buildPanelUrl(panel: AddressablePanelId, href: string): string {
  const url = new URL(href);
  url.searchParams.set('panel', panel);
  return url.toString();
}
