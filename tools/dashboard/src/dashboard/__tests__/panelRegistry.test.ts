import { describe, expect, it, vi } from 'vitest';
import { renderDashboardPanel } from '../panelRegistry';

describe('renderDashboardPanel', () => {
  it('warns in development when an unknown panel id is requested', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const result = renderDashboardPanel('missing-panel' as never, {} as never);

    expect(result).toBeNull();
    expect(warn).toHaveBeenCalledWith('Unknown dashboard panel id: missing-panel');

    warn.mockRestore();
  });
});
