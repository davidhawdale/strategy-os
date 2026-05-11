import { describe, expect, it } from 'vitest';
import {
  buildPanelUrl,
  getAddressablePanelIdFromSearch,
  getInitialPanelIdFromLocation,
} from '../panels';

describe('panel URL helpers', () => {
  it('reads a valid panel query from search', () => {
    expect(getAddressablePanelIdFromSearch('?panel=problem')).toBe('problem');
  });

  it('falls back to governor brief for an invalid panel query', () => {
    expect(getInitialPanelIdFromLocation('?panel=detail')).toBe('governorBrief');
    expect(getInitialPanelIdFromLocation('?panel=madeUp')).toBe('governorBrief');
    expect(getInitialPanelIdFromLocation('')).toBe('governorBrief');
  });

  it('builds a deep link URL for a panel without dropping existing query params', () => {
    expect(buildPanelUrl('segment', 'http://localhost:5173/?foo=bar')).toBe(
      'http://localhost:5173/?foo=bar&panel=segment',
    );
  });
});
