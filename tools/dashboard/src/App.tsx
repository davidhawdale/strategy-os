import { useReducer, useEffect, useCallback, useState } from 'react';
import { designTokensCSS } from './tokens/design-tokens';
import type { AppState, AppEvent, CombinedParseResult, ExecutionQueueView, HypothesisId, PanelId } from './model/types';
import { transition } from './model/types';
import { loadCombined } from './loader/index';
import { Header } from './components/Header';
import { LayoutEditor } from './components/LayoutEditor';
import { OnboardingDialog } from './components/OnboardingDialog';
import { ParserDiagnosticsDrawer } from './components/ParserDiagnosticsDrawer';
import type { RegisterSeed } from './components/OnboardingDialog';
import { computeQueueView } from './views/queue';
import { computeParseDiagnostics } from './views/diagnostics';
import { parseExecutionQueue, parseQueueWorkItems, type QueueFileInput } from './parser/queue';
import { getDefaultNavigationPanelIds, getDefaultSectionOrders, getLayoutEditorPanels, getNavigationPanels, renderDashboardPanel } from './dashboard/panelRegistry';
import type { DashboardLayout, SectionOrderMap } from './dashboard/layoutModel';
import { clearPanelOrder, loadDashboardLayout, movePanelOrderItem, moveSectionOrderItem, resolvePanelOrder, resolveSectionOrders, saveDashboardLayout } from './dashboard/layoutModel';
import './App.css';

function reducer(state: AppState, event: AppEvent): AppState {
  return transition(state, event);
}

const INITIAL_STATE: AppState = { _tag: 'Loading' };
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

const EMPTY_QUEUE_VIEW: ExecutionQueueView = {
  decisionState: 'UNKNOWN',
  sellReady: false,
  scaleReady: false,
  actions: [],
  blockedPaths: [],
  pendingDecisions: [],
  workItems: [],
};

function App() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [rawQueueText, setRawQueueText] = useState<string | null>(null);
  const [rawQueueFiles, setRawQueueFiles] = useState<QueueFileInput[]>([]);
  const [onboardingDismissed, setOnboardingDismissed] = useState(false);
  const [buildTriggered, setBuildTriggered] = useState(false);
  const [panelOrder, setPanelOrder] = useState<PanelId[]>(INITIAL_DASHBOARD_LAYOUT.panelOrder);
  const [sectionOrders, setSectionOrders] = useState<SectionOrderMap>(INITIAL_DASHBOARD_LAYOUT.sectionOrders);
  const [layoutEditorOpen, setLayoutEditorOpen] = useState(false);
  const [diagnosticsOpen, setDiagnosticsOpen] = useState(false);

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

  useEffect(() => {
    fetch('/gap-definer-actions.md')
      .then(r => r.ok ? r.text() : null)
      .then(text => { if (text) setRawQueueText(text); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetch('/api/queue-files')
      .then(r => r.ok ? r.json() as Promise<{ files?: QueueFileInput[] }> : null)
      .then(data => { if (data?.files) setRawQueueFiles(data.files); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetch('/problem.md')
      .then(r => { if (r.ok) setOnboardingDismissed(true); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!buildTriggered) return;
    const id = setInterval(fetchData, 5000);
    return () => clearInterval(id);
  }, [buildTriggered, fetchData]);

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

  const handleReset = useCallback(async () => {
    if (!window.confirm('Danger Will Robinson — this will delete problem.md, reset both strategy files, and clear the execution queue. Continue?')) return;
    const res = await fetch('/api/reset', { method: 'POST' });
    if (res.ok) {
      setOnboardingDismissed(false);
      setBuildTriggered(false);
      fetchData();
    }
  }, [fetchData]);

  const handleMovePanel = useCallback((panel: PanelId, direction: 'up' | 'down') => {
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

  const handleMoveSection = useCallback((panel: PanelId, section: string, direction: 'up' | 'down') => {
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

  const handleResetLayout = useCallback(() => {
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

  const handleGenerate = useCallback(async (seed: RegisterSeed) => {
    const today = new Date().toISOString().slice(0, 10);
    const constraints = seed.otherConstraints.trim() || 'None';
    const content = [
      '# Strategy Seed',
      '',
      `Date: ${today}`,
      `Mode: ${seed.mode.toUpperCase()}`,
      '',
      '## Problem or Opportunity',
      seed.problem,
      '',
      '## Goals',
      seed.goals,
      '',
      '## Capabilities and Resources',
      seed.capabilities,
      '',
      '## Other Constraints',
      constraints,
    ].join('\n');

    const problemRes = await fetch('/api/problem', {
      method: 'POST',
      headers: { 'Content-Type': 'text/markdown' },
      body: content,
    });

    if (problemRes.ok) {
      setOnboardingDismissed(true);
      setBuildTriggered(true);
      fetchData();
      fetch('/api/build', { method: 'POST' }).catch(() => {});
    }
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

  const showOnboarding = !onboardingDismissed;

  // Stop polling once the register has real content (created date is no longer a placeholder)
  const registerIsBuilt = !!(register.metadata.created && !register.metadata.created.includes('{'));
  if (buildTriggered && registerIsBuilt) setBuildTriggered(false);

  // Parse completeness: average of both (gap analysis may be 0 if not present)
  const parseCompleteness = gapAnalysis
    ? (data.registerParseCompleteness + data.gapAnalysisParseCompleteness) / 2
    : data.registerParseCompleteness;

  const warningCount = data.registerWarnings.length + data.gapAnalysisWarnings.length;
  const diagnosticsView = computeParseDiagnostics(data);

  const queueWorkItems = parseQueueWorkItems(rawQueueFiles);
  const rawQueueView = rawQueueText
    ? parseExecutionQueue(rawQueueText)
    : queueWorkItems.length > 0
      ? EMPTY_QUEUE_VIEW
      : null;
  const queueView = rawQueueView
    ? computeQueueView(rawQueueView, gapAnalysis, queueWorkItems)
    : null;
  const navigationPanels = getNavigationPanels(!!gapAnalysis, panelOrder, sectionOrders);
  const layoutEditorPanels = getLayoutEditorPanels(panelOrder, sectionOrders);

  return (
    <div className="app">
      {state._tag === 'Stale' && (
        <div className="stale-banner" role="alert">
          Showing cached data. Refresh failed: {state.error}
        </div>
      )}

      {buildTriggered && (
        <div className="build-banner" role="status" aria-live="polite">
          Build in progress — watch the terminal running <code>npm run dev</code>.
          This page will refresh automatically when the register is ready.
          <button className="build-banner__dismiss" onClick={() => setBuildTriggered(false)}>Dismiss</button>
        </div>
      )}

      {showOnboarding && (
        <OnboardingDialog
          onDismiss={() => setOnboardingDismissed(true)}
          onGenerate={handleGenerate}
        />
      )}

      <Header
        metadata={register.metadata}
        parseCompleteness={parseCompleteness}
        warningCount={warningCount}
        activePanel={activePanel}
        panels={navigationPanels}
        onSelectPanel={handleSelectPanel}
        onRefresh={handleRefresh}
        onOpenDiagnostics={() => setDiagnosticsOpen(true)}
        onOpenLayoutEditor={() => setLayoutEditorOpen(true)}
        onReset={handleReset}
        hasGapAnalysis={!!gapAnalysis}
      />

      {diagnosticsOpen && (
        <ParserDiagnosticsDrawer
          view={diagnosticsView}
          onClose={() => setDiagnosticsOpen(false)}
        />
      )}

      {layoutEditorOpen && (
        <LayoutEditor
          panels={layoutEditorPanels}
          order={panelOrder}
          sectionOrders={sectionOrders}
          onMovePanel={handleMovePanel}
          onMoveSection={handleMoveSection}
          onReset={handleResetLayout}
          onClose={() => setLayoutEditorOpen(false)}
        />
      )}

      <main className="app__main">
        {renderDashboardPanel(activePanel, {
          register,
          gapAnalysis,
          queueView,
          selectedHypothesis,
          sectionOrders,
          onSelectHypothesis: handleSelectHypothesis,
          onSelectPanel: handleSelectPanel,
          onBack: handleBack,
        })}
      </main>
    </div>
  );
}

export default App;
