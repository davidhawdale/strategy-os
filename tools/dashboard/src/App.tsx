import { useEffect, useState } from 'react';
import { designTokensCSS } from './tokens/design-tokens';
import type { CombinedParseResult, HypothesisId, PanelId } from './model/types';
import { Header } from './components/Header';
import { LayoutEditor } from './components/LayoutEditor';
import { OnboardingDialog } from './components/OnboardingDialog';
import { ParserDiagnosticsDrawer } from './components/ParserDiagnosticsDrawer';
import { PanelErrorBoundary } from './components/PanelErrorBoundary';
import { StartOverDialog } from './components/StartOverDialog';
import { TermHelpProvider } from './term-help/TermHelpContext';
import { computeParseDiagnostics } from './views/diagnostics';
import { renderDashboardPanel } from './dashboard/panelRegistry';
import { useBuildPolling } from './hooks/useBuildPolling';
import { useDashboardData } from './hooks/useDashboardData';
import { useDashboardLayout } from './hooks/useDashboardLayout';
import { useExecutionQueue } from './hooks/useExecutionQueue';
import { useOnboardingState } from './hooks/useOnboardingState';
import './App.css';

function App() {
  const [layoutEditorOpen, setLayoutEditorOpen] = useState(false);
  const [diagnosticsOpen, setDiagnosticsOpen] = useState(false);
  const [startOverOpen, setStartOverOpen] = useState(false);
  const {
    state,
    fetchData,
    selectPanel: handleSelectPanel,
    selectHypothesis: handleSelectHypothesis,
    back: handleBack,
    refresh: handleRefresh,
  } = useDashboardData();
  const {
    onboardingDismissed,
    setOnboardingDismissed,
    buildTriggered,
    setBuildTriggered,
    resetStrategy: handleReset,
    generate: handleGenerate,
  } = useOnboardingState(fetchData);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = designTokensCSS;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  useBuildPolling(buildTriggered, fetchData);

  const data = state._tag === 'Loaded' || state._tag === 'Stale' ? state.data : undefined;
  const gapAnalysis = data?.gapAnalysis;
  const queueView = useExecutionQueue(gapAnalysis);
  const {
    panelOrder,
    sectionOrders,
    navigationPanels,
    layoutEditorPanels,
    movePanel: handleMovePanel,
    moveSection: handleMoveSection,
    resetLayout: handleResetLayout,
  } = useDashboardLayout(!!gapAnalysis);

  const registerIsBuilt = !!(data?.register.metadata.created && !data.register.metadata.created.includes('{'));
  useEffect(() => {
    if (buildTriggered && registerIsBuilt) setBuildTriggered(false);
  }, [buildTriggered, registerIsBuilt, setBuildTriggered]);

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
  const loadedData: CombinedParseResult = state.data;
  const activePanel: PanelId = state.activePanel;
  const selectedHypothesis: HypothesisId | undefined = state.selectedHypothesis;

  const register = loadedData.register;
  const loadedGapAnalysis = loadedData.gapAnalysis;

  const showOnboarding = !onboardingDismissed;

  // Parse completeness: average of both (gap analysis may be 0 if not present)
  const parseCompleteness = loadedGapAnalysis
    ? (loadedData.registerParseCompleteness + loadedData.gapAnalysisParseCompleteness) / 2
    : loadedData.registerParseCompleteness;

  const warningCount = loadedData.registerWarnings.length + loadedData.gapAnalysisWarnings.length;
  const diagnosticsView = computeParseDiagnostics(loadedData);
  const hasActiveNavigationPanel = navigationPanels.some(panel => panel.id === activePanel);
  const renderedPanel = activePanel === 'detail' || hasActiveNavigationPanel ? activePanel : 'governorBrief';

  async function handleStartOver(archive: boolean) {
    await handleReset(archive);
    window.location.reload();
  }

  function handleDismissOnboarding() {
    setOnboardingDismissed(true);
    handleRefresh();
  }

  return (
    <TermHelpProvider>
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
          onDismiss={handleDismissOnboarding}
          onGenerate={handleGenerate}
        />
      )}

      <Header
        metadata={register.metadata}
        parseCompleteness={parseCompleteness}
        warningCount={warningCount}
        activePanel={renderedPanel}
        panels={navigationPanels}
        onSelectPanel={handleSelectPanel}
        onRefresh={handleRefresh}
        onOpenDiagnostics={() => setDiagnosticsOpen(true)}
        onOpenLayoutEditor={() => setLayoutEditorOpen(true)}
        onReset={() => setStartOverOpen(true)}
        hasGapAnalysis={!!loadedGapAnalysis}
      />

      {startOverOpen && (
        <StartOverDialog
          onCancel={() => setStartOverOpen(false)}
          onConfirm={handleStartOver}
        />
      )}

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
        <PanelErrorBoundary key={renderedPanel}>
          {renderDashboardPanel(renderedPanel, {
            register,
            gapAnalysis: loadedGapAnalysis,
            queueView,
            selectedHypothesis,
            sectionOrders,
            onSelectHypothesis: handleSelectHypothesis,
            onSelectPanel: handleSelectPanel,
            onBack: handleBack,
          })}
        </PanelErrorBoundary>
      </main>
      </div>
    </TermHelpProvider>
  );
}

export default App;
