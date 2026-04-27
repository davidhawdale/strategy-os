# Dev Fixes — Not Reported or Applied

## 1. `DestructionPanel.tsx` — Extracted Assumptions section is unfinished

**User impact:** None currently visible. The "Extracted Assumptions" section in the Destruction tab will never appear, but it also won't crash. The panel guards with `{view.assumptions && (` so it silently skips the section.

**What's actually happening:** This is incomplete feature code. Bella wrote the UI for an Extracted Assumptions section in `DestructionPanel.tsx`, but the data pipeline behind it was never built:

- The **destruction parser** (`src/parser/destruction.ts`) never extracts assumptions
- The **destruction view** (`src/views/destruction.ts`) never populates assumptions
- The **`DestructionView` type** (`src/model/types.ts`) has no `assumptions` field

The TypeScript error (7 errors referencing `view.assumptions`) is a symptom of this incompleteness.

**What a full fix requires:** This is a feature to build, not a bug to fix:

1. A parser that reads assumption data from the destruction log section of `hypotheses.md`
2. A view builder that aggregates those assumptions (with blast radius counts) into `DestructionView`
3. The `assumptions` field added to the `DestructionView` type

---

## 2. Duplicate import from `./solution` in `index.ts`

**File:** `tools/dashboard/src/parser/index.ts`

`parseSolutionDesign` and `emptySolutionDesign` are imported from `./solution` on two separate lines. ESLint flags this as a duplicate import.

**Note:** This was partially resolved as a side effect of applying the Group C fix — the two imports were merged at the same time. The fix is already locally applied but has not been reported to Bella as a standalone issue.

---

## 3. `HypothesisDetailPanel.tsx` — Pain Scoring and Phase Economics sections are unfinished on Segment Page

**User impact:** None currently visible. The Pain Scoring section on the Segment detail page and the Phase Economics section on the Unit Economics detail page will never appear, but neither will crash. Both panels guard with `{view.painScoring && view.painScoring.length > 0 && (` so they silently skip.

**What's actually happening:** This is incomplete feature code, following the same pattern as the DestructionPanel assumptions. The UI was written for both sections, but the data pipeline behind them was never built:

- No parser extracts Pain Scoring or Phase Economics data from `hypotheses.md`
- Neither field appears anywhere in the model types (`src/model/types.ts`)
- The view builder (`src/views/hypothesis-detail.ts`) has no mapping for either field

**What a full fix requires:** These are features to build, not bugs to fix:

**Pain Scoring (Segment detail page):**

1. A parser that reads the Pain Scoring table from the Segment section of `hypotheses.md`
2. The `painScoring` field added to the `Segment` model type and to `HypothesisDetailView`
3. The view builder mapping `h.painScoring` into the returned view object

**Phase Economics (Unit Economics detail page):**

1. A parser that reads Phase Economics data from the Unit Economics section of `hypotheses.md`
2. The `phaseEconomics` field added to the `UnitEconomics` model type and to `HypothesisDetailView`
3. The view builder mapping `h.phaseEconomics` into the returned view object

---

## 4. `HypothesisDetailPanel.tsx` — Jobs Addressed and Clause Validation not rendered on Value Proposition page

**User impact:** The Jobs Addressed and Clause Validation sections do not appear on the Value Proposition detail page, even though the data is now parsed and available (as of the Group C fix). The view receives `jobs` and `clauseValidation` correctly, but the panel has no rendering sections for them.

**What's actually happening:** The parser (`src/parser/value-proposition.ts`) extracts both fields. The view builder (`src/views/hypothesis-detail.ts`) now passes them through. But `HypothesisDetailPanel.tsx` has no JSX sections that read `view.jobs` or `view.clauseValidation`, so they are silently ignored.

**What a full fix requires:** New rendering sections added to `HypothesisDetailPanel.tsx`:

- A **Jobs Addressed** section showing functional, emotional, and social jobs as a list
- A **Clause Validation** section rendering the clause table (Clause / Status / Tier / Evidence columns)

The data and types are already in place — this is a panel UI addition only.

---

## 5. Remaining build failures (no known user impact)

**User impact:** No visible crash in the dev server, but a production build will fail.

**Full error list from `tsc --noEmit -p tsconfig.app.json`:**

```
src/views/risk-map.ts — 'killCondition' does not exist on 'ValueProposition'; 'hypothesis' used where 'source' is required
src/views/readiness.ts — 'killCondition' does not exist on type 'ValueProposition'
src/views/evidence-quality.ts — 'valueProposition' missing from hypothesis id map
src/parser/value-proposition.ts — Variable 'clauseValidation' implicitly has type 'any[]'
src/parser/hypothesis.ts — 'RevenueModel', 'PriceHypothesis', 'CostStructure' declared but never used; 'findTableNearHeading' declared but never read
src/parser/solution.ts — 'HypothesisConstraint' declared but never used
src/components/panels/EscalationsPanel.tsx — 'BlastRadius' declared but never used
src/components/panels/GapLedgerPanel.tsx — 'BlastRadiusBadge' declared but its value is never read
src/loader/index.ts — implicit 'any[]' types on variables
```
