# Dev Fixes

## 1. Duplicate `emptySolutionDesign` declaration

**File:** `tools/dashboard/src/parser/index.ts`

A local `emptySolutionDesign()` function was defined at the bottom of `index.ts` while the same function was already imported from `./solution` at line 17. The duplicate caused a JS runtime error ("Identifier 'emptySolutionDesign' has already been declared") and a blank page.

**Removed this block** (was around line 217):

```ts
function emptySolutionDesign() {
  return {
    featureMap: [],
    growthLoops: [],
    constraintsFromHypotheses: [],
    adequacyCriteria: [],
  };
}
```

---

## 2. `require('fs')` in ESM Vite config + missing `gap-analysis.md` middleware

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

## 3. Destruction page crash — undefined properties on `preMortem` and `redTeam`

**File:** `tools/dashboard/src/components/panels/DestructionPanel.tsx`

The Destruction panel crashed with a blank page because it accessed `.split()` and `.length` directly on properties of `view.preMortem` and `view.redTeam` without guarding against those properties being `undefined`. The parent objects existed, but their inner fields did not — so the guards like `{view.preMortem && (` were not enough.

**Four lines changed:**

```tsx
// Before
{view.preMortem.narrative.split('\n\n').map(...)
{view.preMortem.keyFindings.length > 0 && (
{view.redTeam.responses.length > 0 && (
{view.redTeam.survivalDependsOn.length > 0 && (

// After
{(view.preMortem.narrative ?? '').split('\n\n').map(...)}
{(view.preMortem.keyFindings?.length ?? 0) > 0 && (
{(view.redTeam.responses?.length ?? 0) > 0 && (
{(view.redTeam.survivalDependsOn?.length ?? 0) > 0 && (
```

---

## 4. Hypothesis detail pages crash — undefined arrays and `status` on incomplete hypotheses

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

## 5. Back button on hypothesis detail pages does nothing

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
