import type { CombinedParseResult, ParseWarning } from '../model/types';

export type DiagnosticSource = 'register' | 'gapAnalysis';
export type DiagnosticSeverity = ParseWarning['severity'];

export interface DiagnosticItem extends ParseWarning {
  source: DiagnosticSource;
}

export interface DiagnosticSourceSummary {
  info: number;
  warning: number;
  error: number;
  total: number;
}

export interface ParseDiagnosticsView {
  items: DiagnosticItem[];
  bySeverity: Record<DiagnosticSeverity, DiagnosticItem[]>;
  counts: {
    info: number;
    warning: number;
    error: number;
    total: number;
  };
  bySource: Record<DiagnosticSource, DiagnosticSourceSummary>;
  completeness: {
    register: number;
    gapAnalysis: number;
    overall: number;
  };
}

function emptySummary(): DiagnosticSourceSummary {
  return { info: 0, warning: 0, error: 0, total: 0 };
}

function sourceWarnings(source: DiagnosticSource, warnings: ParseWarning[]): DiagnosticItem[] {
  return warnings.map(warning => ({ ...warning, source }));
}

export function computeParseDiagnostics(data: CombinedParseResult): ParseDiagnosticsView {
  const items = [
    ...sourceWarnings('register', data.registerWarnings),
    ...sourceWarnings('gapAnalysis', data.gapAnalysisWarnings),
  ];

  const bySeverity: Record<DiagnosticSeverity, DiagnosticItem[]> = {
    error: items.filter(item => item.severity === 'error'),
    warning: items.filter(item => item.severity === 'warning'),
    info: items.filter(item => item.severity === 'info'),
  };

  const bySource: Record<DiagnosticSource, DiagnosticSourceSummary> = {
    register: emptySummary(),
    gapAnalysis: emptySummary(),
  };

  for (const item of items) {
    bySource[item.source][item.severity] += 1;
    bySource[item.source].total += 1;
  }

  const gapAnalysisCompleteness = data.gapAnalysis
    ? data.gapAnalysisParseCompleteness
    : 0;
  const overall = data.gapAnalysis
    ? (data.registerParseCompleteness + data.gapAnalysisParseCompleteness) / 2
    : data.registerParseCompleteness;

  return {
    items,
    bySeverity,
    counts: {
      error: bySeverity.error.length,
      warning: bySeverity.warning.length,
      info: bySeverity.info.length,
      total: items.length,
    },
    bySource,
    completeness: {
      register: data.registerParseCompleteness,
      gapAnalysis: gapAnalysisCompleteness,
      overall,
    },
  };
}
