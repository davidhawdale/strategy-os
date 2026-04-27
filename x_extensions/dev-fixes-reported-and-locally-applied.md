# Dev Fixes

## 1. `require('fs')` in ESM Vite config + missing `gap-analysis.md` middleware

## *REPORTED // LOCALLY APPLIED*

**File:** `tools/dashboard/vite.config.ts`

Two issues:

1. The custom dev server middleware used `require('fs')` inside an ESM module, which is not allowed — this caused a 500 error whenever the browser requested `hypotheses.md`.
2. There was no middleware for `gap-analysis.md`, so it was never served.

**Before:**

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const projectRoot = path.resolve(__dirname, '..', '..')

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'serve-strategy',
      configureServer(server) {
        server.middlewares.use('/hypotheses.md', (_req, res) => {
          const fs = require('fs')   // ❌ require() not allowed in ESM
          const filePath = path.join(projectRoot, 'strategy', 'hypotheses.md')
          try {
            const content = fs.readFileSync(filePath, 'utf-8')
            res.setHeader('Content-Type', 'text/markdown')
            res.end(content)
          } catch {
            res.statusCode = 404
            res.end('Not found')
          }
        })
      },
    },
    // ❌ no middleware for gap-analysis.md
  ],
})
```

**After:**

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'  // ✅ ESM import at top of file

const projectRoot = path.resolve(__dirname, '..', '..')

function serveStrategyFile(urlPath: string, filePath: string) {
  return {
    name: `serve-strategy-${urlPath.replace(/\W/g, '-')}`,
    configureServer(server: import('vite').ViteDevServer) {
      server.middlewares.use(urlPath, (_req, res) => {
        try {
          const content = fs.readFileSync(filePath, 'utf-8')
          res.setHeader('Content-Type', 'text/markdown')
          res.end(content)
        } catch {
          res.statusCode = 404
          res.end('Not found')
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    serveStrategyFile('/hypotheses.md', path.join(projectRoot, 'strategy', 'hypotheses.md')),
    serveStrategyFile('/gap-analysis.md', path.join(projectRoot, 'strategy', 'gap-analysis.md')), // ✅ added
  ],
})
```

---

## 2. Hypothesis detail pages crash — undefined arrays and `status` on incomplete hypotheses — undefined arrays and `status` on incomplete hypotheses

### *REPORTED // LOCALLY APPLIED*

**File:** `tools/dashboard/src/components/panels/HypothesisDetailPanel.tsx`

Problem, Segment, Unit Economics, and Value Proposition detail pages all crashed when clicked. The Value Proposition hypothesis is incomplete (no evidence, no assumptions) so several array properties were `undefined`. The panel accessed `.length` and `.toLowerCase()` on them directly without guards.

**Seven lines changed:**

```tsx
// Before
{view.possibilitySpace.entries.length > 0 && (
  <li className={`possibility-item--${e.status.toLowerCase()}`}>
{view.possibilitySpace.eliminations.length > 0 && (
{view.evidence.length > 0 && (
  <span>{view.evidence.length}</span>
{view.researchSources.length > 0 && (
{view.assumptions.length > 0 && (
  <span>{view.assumptions.length}</span>
{view.channelStrategy && view.channelStrategy.channels.length > 0 && (

// After
{(view.possibilitySpace.entries?.length ?? 0) > 0 && (
  <li className={`possibility-item--${(e.status ?? '').toLowerCase()}`}>
{(view.possibilitySpace.eliminations?.length ?? 0) > 0 && (
{(view.evidence?.length ?? 0) > 0 && (
  <span>{view.evidence?.length}</span>
{(view.researchSources?.length ?? 0) > 0 && (
{(view.assumptions?.length ?? 0) > 0 && (
  <span>{view.assumptions?.length}</span>
{view.channelStrategy && (view.channelStrategy.channels?.length ?? 0) > 0 && (
```

---

## 3. Back button on hypothesis detail pages does nothing

### *REPORTED // LOCALLY APPLIED*

**File:** `tools/dashboard/src/model/types.ts`

The `Back` event was handled in the `Stale` app state but was completely absent from the `Loaded` state. Since the app is normally in `Loaded`, clicking Back fell through to `default: return state` — no navigation occurred.

**Fix:** Added the missing `case 'Back':` to the `Loaded` branch of the `transition` function (around line 968):

```ts
// Before — no Back case in Loaded state
case 'Loaded':
  switch (event._tag) {
    case 'SelectPanel': ...
    case 'SelectHypothesis': ...
    case 'Refresh': ...
    case 'FetchError': ...
    default:
      return state;  // Back silently did nothing
  }

// After
case 'Loaded':
  switch (event._tag) {
    case 'SelectPanel': ...
    case 'SelectHypothesis': ...
    case 'Back':
      return { ...state, activePanel: 'readiness', selectedHypothesis: undefined };
    case 'Refresh': ...
    case 'FetchError': ...
    default:
      return state;
  }
```

---

## 4. Observable Filters missing from Segment detail page

### REPORTED // LOCALLY APPLIED

**User impact:** The Observable Filters section never appeared on the Segment detail page, even when data had been written into `hypotheses.md`. The panel guarded with `{view.observableFilters && view.observableFilters.length > 0 && (` so it silently skipped the section.

**Cause — two issues working together:**

1. The parser (`src/parser/hypothesis.ts` line 156) already extracted this data and stored it as `observableCharacteristics` on the `Segment` model. The data existed.
2. The view builder (`src/views/hypothesis-detail.ts`) never mapped `observableCharacteristics` into the returned view object, so it was dropped before reaching the panel.
3. The panel read `view.observableFilters`, but `HypothesisDetailView` in `types.ts` had the field as `observableCharacteristics` — a name mismatch.

**Fix 1** — `tools/dashboard/src/model/types.ts`

Renamed `observableCharacteristics` to `observableFilters` in `HypothesisDetailView`. Also fixed `possibilitySpace.entries` from `string[]` to `{ status: string; description: string }[]` (the panel already treated entries as objects).

**Fix 2** — `tools/dashboard/src/views/hypothesis-detail.ts`

Added to the return statement of `computeHypothesisDetail`:

```ts
observableFilters: (h as any).observableCharacteristics,
```

---

## 5. Value Proposition panel shows no content

### REPORTED // LOCALLY APPLIED

**User impact:** Clicking the Value Proposition card showed UNKNOWN confidence, no evidence, no assumptions, and no content — even though `strategy/hypotheses.md` had a fully written Value Proposition section.

**Bug 1 — `parser/index.ts` never called `parseValueProposition`**

The parser function existed and worked correctly but was never imported or called. The VP was always initialised to `emptyValueProposition()` and the markdown was never read.

**Fix** — `tools/dashboard/src/parser/index.ts`:

- Added `import { parseValueProposition } from './value-proposition'`
- Also merged the duplicate `./solution` imports into one line
- Added VP parsing block after the Problem/Segment/Unit Economics `for` loop

**Bug 2 — `views/hypothesis-detail.ts` didn't pass VP-specific fields to the panel**

`computeHypothesisDetail` never included `jobs` or `clauseValidation` in its return object.

**Fix** — `tools/dashboard/src/views/hypothesis-detail.ts`:

- Added `const vp = id === 'valueProposition' ? (h as ValueProposition) : undefined`
- Added `jobs: vp?.jobs` and `clauseValidation: vp?.clauseValidation` to the return statement

**Result:** Claim, Confidence (RESEARCHED), Evidence (4 items), and Assumptions (3 items) now appear on the Value Proposition detail page. Jobs Addressed and Clause Validation are wired through to the view but the panel has no rendering sections for them — noted separately in dev-fixes-not-reported-or-applied.md.
