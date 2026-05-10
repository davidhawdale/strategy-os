# StrategistOS Dashboard

This dashboard is a local technical surface for inspecting the StrategistOS
markdown artifacts. It reads the strategy files, parses them into typed models,
turns those models into view models, and renders them through thin panel shells
and colocated section components.

## Data Flow

The main path is:

1. Markdown artifacts live in the repository, mainly:
   - `strategy/hypotheses.md`
   - `strategy/gap-analysis.md`
   - `execution/queue/gap-definer-actions.md`
   - individual `execution/queue/*.md` work-item files
2. Vite dev-server routes expose those files to the browser.
3. `src/loader/` fetches the files.
4. `src/parser/` parses markdown into typed register, gap-analysis, proposal,
   and queue models.
5. `src/views/` computes dashboard-specific view models.
6. `src/dashboard/panelRegistry.tsx` defines the top-level panel order,
   metadata, section ids, and render functions.
7. `src/hooks/` owns dashboard orchestration concerns such as loading,
   queue fetching, layout persistence, onboarding, and build polling.
8. `src/components/panels/` render page shells.
9. `src/components/panels/sections/` render the actual dashboard blocks with
   colocated CSS.

Keep business/data interpretation in parsers and view models where possible.
Panels should mostly pass data to sections.

## Dev Server Routes

The local Vite config adds development-only routes:

- `GET /hypotheses.md`: serves `strategy/hypotheses.md`.
- `GET /gap-analysis.md`: serves `strategy/gap-analysis.md`.
- `GET /gap-definer-actions.md`: serves
  `execution/queue/gap-definer-actions.md`.
- `GET /api/queue-files`: returns individual markdown files from
  `execution/queue/`, excluding `gap-definer-actions.md`.
- `GET /problem.md`: serves `strategy/problem.md`.
- `POST /api/problem`: writes `strategy/problem.md`.
- `POST /api/build`: shells out locally to
  `claude -p "Run the stg-build-register skill."`.
- `POST /api/reset`: resets local strategy files from templates and clears the
  queue directory except `.gitkeep`. Send `{ "archive": true }` to first copy
  the current strategy and queue files into a timestamped
  `archive/dashboard-snapshots/` folder.

These routes are local orchestration helpers, not a production API. The build
and reset endpoints can modify files in the working tree. Archive snapshots are
not served by the dashboard routes and are not parsed as live strategy content.

## Parser Diagnostics

The header parse-health control opens a parser diagnostics drawer. It combines
register and gap-analysis warnings into one technical view with:

- source labels;
- parsed source paths when available;
- severity counts;
- section and field details;
- register and gap-analysis completeness.

Diagnostics are intentionally outside the panel registry because they are a
dashboard utility, not strategic content.

## Layout Editor

The header Layout control opens a local layout editor. It can reorder:

- top-level navigable panels;
- sections inside each top-level panel.

The canonical default order still lives in `src/dashboard/panelRegistry.tsx`.
Browser-specific overrides are saved in `localStorage` under:

```text
strategist-dashboard-layout:v1
```

Reset clears the local override and restores registry order. Stale or unknown
panel/section ids are ignored, and new known ids are appended safely.

## Queue Visibility

The Now panel combines the summary queue view with individual queue work items.
Files in `execution/queue/` are parsed as read-only work items:

- `T-*.md` files become task work items.
- `E-*.md` files become escalation/decision work items.

The dashboard does not edit queue files, mark them complete, or infer business
status from them in this pass.

## Rendering Conventions

Small source-bearing text fragments should render through `InlineMarkdownText`
so `[Name](URL)` citations become styled `.source-link` hyperlinks. Do not render
source-bearing markdown strings directly unless the component already has a
structured `source`/`url` pair.

## Hypothesis Panels

Problem, Segment, Unit Economics, and Value Proposition are top-level panels.
They reuse the hypothesis detail renderer, but each panel has its own section
profile that follows the corresponding `hypotheses.md` structure. Their panels
and sections are locally reorderable in the Layout editor.

## CSS Ownership

CSS ownership is deliberately local:

- `src/App.css`: app shell, header, shared panel primitives, shared headings,
  badges, `EvidenceBar`, `DataTable`, text utilities, onboarding, and global
  responsive shell rules.
- Utility overlays: colocated CSS, such as `LayoutEditor.css` and
  `ParserDiagnosticsDrawer.css`.
- Utility components: colocated CSS, such as `PanelErrorBoundary.css`.
- Panel shells: panel-specific CSS beside the panel where needed.
- Sections: section-specific cards, lists, tables, and responsive rules beside
  the section component.

Avoid adding panel-specific blocks back into `App.css`.

## Commands

Run from `tools/dashboard`:

```bash
npm run dev
npm test
npm run build
npm run preview
```

Use `npm test` for parser/view/helper regression tests and `npm run build` for
TypeScript plus production bundle verification.
