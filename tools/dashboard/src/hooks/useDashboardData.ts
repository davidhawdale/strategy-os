import { useCallback, useEffect, useReducer } from 'react';
import type { AppEvent, AppState, HypothesisId, PanelId } from '../model/types';
import { buildPanelUrl, getInitialPanelIdFromLocation, isAddressablePanelId } from '../model/panels';
import { transition } from '../model/types';
import { loadCombined } from '../loader/index';

const INITIAL_STATE: AppState = { _tag: 'Loading' };

function reducer(state: AppState, event: AppEvent): AppState {
  return transition(state, event);
}

function formatLoadError(error: { _tag: string; path: string; reason?: string }): string {
  return `${error._tag}: ${error.path}${error.reason ? ` — ${error.reason}` : ''}`;
}

export function useDashboardData() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const initialPanel = typeof window === 'undefined'
    ? undefined
    : getInitialPanelIdFromLocation(window.location.search);

  const fetchData = useCallback(async () => {
    dispatch({ _tag: 'FetchStart' });

    const jsonResult = await loadCombined('/register.json', '/gap-analysis.json');
    if (jsonResult._tag === 'Ok') {
      dispatch({ _tag: 'FetchSuccess', data: jsonResult.data, activePanel: initialPanel });
      return;
    }

    const mdResult = await loadCombined('/hypotheses.md', '/gap-analysis.md');
    if (mdResult._tag === 'Ok') {
      dispatch({ _tag: 'FetchSuccess', data: mdResult.data, activePanel: initialPanel });
    } else {
      dispatch({ _tag: 'FetchError', message: formatLoadError(mdResult.error) });
    }
  }, [initialPanel]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (state._tag !== 'Loaded' && state._tag !== 'Stale') return;
    if (!isAddressablePanelId(state.activePanel)) return;

    const nextUrl = buildPanelUrl(state.activePanel, window.location.href);
    if (nextUrl !== window.location.href) {
      window.history.replaceState({}, '', nextUrl);
    }
  }, [state]);

  const selectPanel = useCallback((panel: PanelId) => {
    dispatch({ _tag: 'SelectPanel', panel });
  }, []);

  const selectHypothesis = useCallback((id: HypothesisId) => {
    dispatch({ _tag: 'SelectHypothesis', id });
  }, []);

  const back = useCallback(() => {
    dispatch({ _tag: 'Back' });
  }, []);

  const refresh = useCallback(() => {
    dispatch({ _tag: 'Refresh' });
    fetchData();
  }, [fetchData]);

  return {
    state,
    fetchData,
    selectPanel,
    selectHypothesis,
    back,
    refresh,
  };
}
