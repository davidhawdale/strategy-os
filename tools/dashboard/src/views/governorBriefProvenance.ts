import type { HypothesisId } from '../model/types';

export type GovernorBriefSourceKind = 'evidence' | 'research';

export interface GovernorBriefSourceEntry {
  hypothesisId: HypothesisId;
  hypothesisLabel: string;
  kind: GovernorBriefSourceKind;
  raw: string;
  name?: string;
  url?: string;
  note?: string;
  description: string;
  date?: string;
  tier?: string;
  type?: string;
}

export interface BuildPassProvenanceSourceSelector {
  hypothesisId: HypothesisId;
  sourceKinds?: GovernorBriefSourceKind[];
  matchNameIncludes?: string[];
  matchUrlIncludes?: string[];
  matchNoteIncludes?: string[];
  limit?: number;
}

export interface BuildPassProvenanceEntry {
  label: string;
  hypotheses: HypothesisId[];
  sources: BuildPassProvenanceSourceSelector[];
}

export interface BuildPassProvenanceManifest {
  artifact: string;
  version: number;
  updated?: string;
  whatWasResearched: BuildPassProvenanceEntry[];
}

export interface GovernorBriefResearchTraceItem {
  label: string;
  markdown: string;
  relatedHypotheses: HypothesisId[];
  sources: GovernorBriefSourceEntry[];
}

interface BriefResearchItem {
  label: string;
  markdown: string;
}

type SourceMap = Record<HypothesisId, GovernorBriefSourceEntry[]>;

function includesAny(value: string | undefined, needles: string[] | undefined): boolean {
  if (!needles || needles.length === 0) return true;
  if (!value) return false;

  const lower = value.toLowerCase();
  return needles.some(needle => lower.includes(needle.toLowerCase()));
}

function selectorMatches(
  source: GovernorBriefSourceEntry,
  selector: BuildPassProvenanceSourceSelector,
): boolean {
  if (selector.sourceKinds && selector.sourceKinds.length > 0 && !selector.sourceKinds.includes(source.kind)) {
    return false;
  }

  const hasMatcher =
    !!selector.matchNameIncludes?.length ||
    !!selector.matchUrlIncludes?.length ||
    !!selector.matchNoteIncludes?.length;

  if (!hasMatcher) return false;

  return (
    includesAny(source.name, selector.matchNameIncludes) &&
    includesAny(source.url, selector.matchUrlIncludes) &&
    includesAny(source.note ?? source.description, selector.matchNoteIncludes)
  );
}

function dedupeSources(sources: GovernorBriefSourceEntry[]): GovernorBriefSourceEntry[] {
  const seen = new Set<string>();
  return sources.filter(source => {
    const key = [
      source.hypothesisId,
      source.kind,
      source.url ?? '',
      source.name ?? '',
      source.raw,
    ].join('::');

    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function resolveGovernorBriefResearchTrace(
  items: BriefResearchItem[],
  manifest: BuildPassProvenanceManifest | null,
  sourcesByHypothesis: SourceMap,
): GovernorBriefResearchTraceItem[] {
  return items.map(item => {
    const entry = manifest?.whatWasResearched.find(candidate => candidate.label === item.label);
    if (!entry) {
      return {
        ...item,
        relatedHypotheses: [],
        sources: [],
      };
    }

    const sources = dedupeSources(
      entry.sources.flatMap(selector => {
        const matched = (sourcesByHypothesis[selector.hypothesisId] ?? []).filter(source =>
          selectorMatches(source, selector)
        );

        return selector.limit ? matched.slice(0, selector.limit) : matched;
      })
    );

    return {
      ...item,
      relatedHypotheses: entry.hypotheses,
      sources,
    };
  });
}
