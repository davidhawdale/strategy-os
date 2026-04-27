import { useReducer, useEffect, useCallback } from 'react';
import { designTokensCSS } from './tokens/design-tokens';
import type { AppState, AppEvent, CombinedParseResult, HypothesisId, PanelId } from './model/types';
import { transition } from './model/types';
import { loadCombined } from './loader/index';
import { Header } from './components/Header';
import { ReadinessPanel } from './components/panels/ReadinessPanel';
import { EvidencePanel } from './components/panels/EvidencePanel';
import { RiskPanel } from './components/panels/RiskPanel';
import { DestructionPanel } from './components/panels/DestructionPanel';
import { ProposalsPanel } from './components/panels/ProposalsPanel';
import { HypothesisDetailPanel } from './components/panels/HypothesisDetailPanel';
import { GapLedgerPanel } from './components/panels/GapLedgerPanel';
import { EscalationsPanel } from './components/panels/EscalationsPanel';
import { DeadlinesPanel } from './components/panels/DeadlinesPanel';
import { computeReadiness } from './views/readiness';
import { computeEvidenceQuality } from './views/evidence-quality';
import { computeRiskMap } from './views/risk-map';
import { computeDestructionView } from './views/destruction';
import { computeProposalsView } from './views/proposals';
import { computeHypothesisDetail } from './views/hypothesis-detail';
import { computeGapLedgerView } from './views/gap-ledger';
import { computeGovernorEscalationsView } from './views/escalations';
import { computeDecisionDeadlinesView } from './views/deadlines';
import './App.css';

function reducer(state: AppState, event: AppEvent): AppState {
  return transition(state, event);
}

const INITIAL_STATE: AppState = { _tag: 'Loading' };

function App() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const fetchData = useCallback(async () => {
    dispatch({ _tag: 'FetchStart' });

    // Try pre-computed JSON first, fall back to markdown files
    const jsonResult = await loadCombined('/register.json', '/gap-analysis.json');
    if (jsonResult._tag === 'Ok') {
      dispatch({ _tag: 'FetchSuccess', data: jsonResult.data });
      return;
    }

    // Fall back to markdown
    const mdResult = await loadCombined('/hypotheses.md', '/gap-analysis.md');
    if (mdResult._tag === 'Ok') {
      dispatch({ _tag: 'FetchSuccess', data: mdResult.data });
    } else {
      const err = mdResult.error;
      dispatch({
        _tag: 'FetchError',
        message: `${err._tag}: ${err.path}${'reason' in err ? ` — ${err.reason}` : ''}`,
      });
    }
  }, []);

  useEffect(() => {
    // Inject design tokens
    const style = document.createElement('style');
    style.textContent = designTokensCSS;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSelectPanel = useCallback((panel: PanelId) => {
    dispatch({ _tag: 'SelectPanel', panel });
  }, []);

  const handleSelectHypothesis = useCallback((id: HypothesisId) => {
    dispatch({ _tag: 'SelectHypothesis', id });
  }, []);

  const handleBack = useCallback(() => {
    dispatch({ _tag: 'Back' });
  }, []);

  const handleRefresh = useCallback(() => {
    dispatch({ _tag: 'Refresh' });
    fetchData();
  }, [fetchData]);

  // Loading
  if (state._tag === 'Loading') {
    return (
      <div className="app">
        <div className="app__loading" role="status" aria-live="polite">
          <div className="loading-spinner" />
          <p className="loading-text">Loading strategy register...</p>
        </div>
      </div>
    );
  }

  // Error
  if (state._tag === 'Error') {
    return (
      <div className="app">
        <div className="app__error" role="alert">
          <h1 className="error-title">Failed to load register</h1>
          <p className="error-message">{state.message}</p>
          <button className="error-retry" onClick={handleRefresh}>Retry</button>
        </div>
      </div>
    );
  }

  // Loaded or Stale
  const data: CombinedParseResult = state.data;
  const activePanel: PanelId = state.activePanel;
  const selectedHypothesis: HypothesisId | undefined = state.selectedHypothesis;

  const register = data.register;
  const gapAnalysis = data.gapAnalysis;

  // Parse completeness: average of both (gap analysis may be 0 if not present)
  const parseCompleteness = gapAnalysis
    ? (data.registerParseCompleteness + data.gapAnalysisParseCompleteness) / 2
    : data.registerParseCompleteness;

  const warningCount = data.registerWarnings.length + data.gapAnalysisWarnings.length;

  // Open escalations count — drives badge
  const openEscalationsCount = gapAnalysis
    ? gapAnalysis.governorEscalations.filter(e => e.status === 'OPEN').length
    : 0;

  return (
    <div className="app">
      {state._tag === 'Stale' && (
        <div className="stale-banner" role="alert">
          Showing cached data. Refresh failed: {state.error}
        </div>
      )}

      <Header
        metadata={register.metadata}
        parseCompleteness={parseCompleteness}
        warningCount={warningCount}
        activePanel={activePanel}
        onSelectPanel={handleSelectPanel}
        onRefresh={handleRefresh}
        openEscalationsCount={openEscalationsCount}
        hasGapAnalysis={!!gapAnalysis}
      />

      <main className="app__main">
        {activePanel === 'readiness' && (
          <ReadinessPanel
            view={computeReadiness(register, gapAnalysis)}
            onSelectHypothesis={handleSelectHypothesis}
          />
        )}

        {activePanel === 'evidence' && (
          <EvidencePanel view={computeEvidenceQuality(register)} />
        )}

        {activePanel === 'risk' && (
          <RiskPanel view={computeRiskMap(register)} />
        )}

        {activePanel === 'destruction' && (
          <DestructionPanel view={computeDestructionView(register, gapAnalysis)} />
        )}

        {activePanel === 'proposals' && (
          <ProposalsPanel view={computeProposalsView(register, gapAnalysis)} />
        )}

        {activePanel === 'gapLedger' && (
          <GapLedgerPanel view={computeGapLedgerView(register, gapAnalysis)} />
        )}

        {activePanel === 'escalations' && (
          <EscalationsPanel view={computeGovernorEscalationsView(gapAnalysis)} />
        )}

        {activePanel === 'deadlines' && (
          <DeadlinesPanel view={computeDecisionDeadlinesView(register, gapAnalysis)} />
        )}

        {activePanel === 'detail' && selectedHypothesis && (
          <HypothesisDetailPanel
            view={computeHypothesisDetail(register, selectedHypothesis, gapAnalysis)}
            onBack={handleBack}
          />
        )}
      </main>
    </div>
  );
}

export default App;
