import { parse, parseCombined } from '../parser/index';
import { parseGapAnalysis } from '../parser/gap-analysis';
import type {
  ParseResult,
  HypothesisRegister,
  GapAnalysis,
  CombinedParseResult,
} from '../model/types';

export type LoadError =
  | { _tag: 'FileNotFound'; path: string }
  | { _tag: 'FileReadError'; path: string; reason: string }
  | { _tag: 'EmptyFile'; path: string };

export type LoadResult =
  | { _tag: 'Ok'; data: ParseResult }
  | { _tag: 'Err'; error: LoadError };

export type CombinedLoadResult =
  | { _tag: 'Ok'; data: CombinedParseResult }
  | { _tag: 'Err'; error: LoadError };

// ============================================================
// Raw fetch helper
// ============================================================

async function fetchText(path: string): Promise<{ _tag: 'Ok'; text: string } | { _tag: 'Err'; error: LoadError }> {
  try {
    const response = await fetch(path);

    if (!response.ok) {
      if (response.status === 404) {
        return { _tag: 'Err', error: { _tag: 'FileNotFound', path } };
      }
      return { _tag: 'Err', error: { _tag: 'FileReadError', path, reason: `HTTP ${response.status}` } };
    }

    const text = await response.text();

    if (!text || text.trim().length === 0) {
      return { _tag: 'Err', error: { _tag: 'EmptyFile', path } };
    }

    return { _tag: 'Ok', text };
  } catch (err) {
    return {
      _tag: 'Err',
      error: {
        _tag: 'FileReadError',
        path,
        reason: err instanceof Error ? err.message : 'Unknown error',
      },
    };
  }
}

// ============================================================
// JSON helpers
// ============================================================

function parseRegisterJson(text: string, path: string): LoadResult {
  try {
    const data = JSON.parse(text);

    if (data.register && data.warnings !== undefined && data.parseCompleteness !== undefined) {
      return { _tag: 'Ok', data: data as ParseResult };
    }

    if (data.metadata && data.hypotheses) {
      const register = data as HypothesisRegister;
      return {
        _tag: 'Ok',
        data: { register, warnings: [], parseCompleteness: 1.0 },
      };
    }

    return {
      _tag: 'Err',
      error: { _tag: 'FileReadError', path, reason: 'JSON does not match expected schema' },
    };
  } catch (err) {
    return {
      _tag: 'Err',
      error: {
        _tag: 'FileReadError',
        path,
        reason: `Invalid JSON: ${err instanceof Error ? err.message : 'parse error'}`,
      },
    };
  }
}

function parseGapAnalysisJson(text: string, path: string): { _tag: 'Ok'; data: GapAnalysis } | { _tag: 'Err'; error: LoadError } {
  try {
    const data = JSON.parse(text);

    // Full GapAnalysisParseResult wrapper
    if (data.gapAnalysis && data.warnings !== undefined) {
      return { _tag: 'Ok', data: data.gapAnalysis as GapAnalysis };
    }

    // Raw GapAnalysis object
    if (data.metadata && data.gateSummary) {
      return { _tag: 'Ok', data: data as GapAnalysis };
    }

    return {
      _tag: 'Err',
      error: { _tag: 'FileReadError', path, reason: 'JSON does not match GapAnalysis schema' },
    };
  } catch (err) {
    return {
      _tag: 'Err',
      error: {
        _tag: 'FileReadError',
        path,
        reason: `Invalid JSON: ${err instanceof Error ? err.message : 'parse error'}`,
      },
    };
  }
}

// ============================================================
// loadRegister — backward-compatible single-file load
// ============================================================

export async function loadRegister(path: string): Promise<LoadResult> {
  const fetched = await fetchText(path);
  if (fetched._tag === 'Err') return { _tag: 'Err', error: fetched.error };

  if (path.endsWith('.json')) {
    return parseRegisterJson(fetched.text, path);
  }

  const result = parse(fetched.text);
  return { _tag: 'Ok', data: result };
}

// ============================================================
// loadCombined — loads both hypothesis register and gap analysis
// Gap analysis is optional: if not found, still succeeds with gapAnalysis: undefined
// ============================================================

export async function loadCombined(
  hypothesesPath: string,
  gapAnalysisPath: string
): Promise<CombinedLoadResult> {
  // Load hypotheses (required)
  const hypothesesFetch = await fetchText(hypothesesPath);
  if (hypothesesFetch._tag === 'Err') {
    return { _tag: 'Err', error: hypothesesFetch.error };
  }

  // Parse hypothesis register
  let registerResult;
  if (hypothesesPath.endsWith('.json')) {
    const jsonResult = parseRegisterJson(hypothesesFetch.text, hypothesesPath);
    if (jsonResult._tag === 'Err') return { _tag: 'Err', error: jsonResult.error };
    registerResult = jsonResult.data;
  } else {
    registerResult = parse(hypothesesFetch.text);
  }

  // Load gap analysis (optional)
  const gapFetch = await fetchText(gapAnalysisPath);
  let gapAnalysis: GapAnalysis | undefined;
  let gapAnalysisWarnings = [];
  let gapAnalysisParseCompleteness = 0;

  if (gapFetch._tag === 'Ok') {
    if (gapAnalysisPath.endsWith('.json')) {
      const jsonResult = parseGapAnalysisJson(gapFetch.text, gapAnalysisPath);
      if (jsonResult._tag === 'Ok') {
        gapAnalysis = jsonResult.data;
        gapAnalysisParseCompleteness = 1.0;
      }
    } else {
      const parsed = parseGapAnalysis(gapFetch.text);
      gapAnalysis = parsed.gapAnalysis;
      gapAnalysisWarnings = parsed.warnings;
      gapAnalysisParseCompleteness = parsed.parseCompleteness;
    }
  }
  // If gap analysis not found (FileNotFound or EmptyFile), that is acceptable

  const combined: CombinedParseResult = {
    register: registerResult.register,
    gapAnalysis,
    registerWarnings: registerResult.warnings,
    gapAnalysisWarnings,
    registerParseCompleteness: registerResult.parseCompleteness,
    gapAnalysisParseCompleteness,
  };

  return { _tag: 'Ok', data: combined };
}

// ============================================================
// loadRegisterFromString — testing / inline
// ============================================================

export function loadRegisterFromString(markdown: string): LoadResult {
  if (!markdown || markdown.trim().length === 0) {
    return { _tag: 'Err', error: { _tag: 'EmptyFile', path: '(inline)' } };
  }

  const result = parse(markdown);
  return { _tag: 'Ok', data: result };
}
