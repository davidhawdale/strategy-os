# Dashboard Considerations Document

This note captures Codex's review of the `tools/` dashboard so the ideas can be
worked through separately from the live dashboard implementation.

Last updated: 2026-05-10, after queue work-item visibility, README replacement,
and the Gap Ledger status deduplication fix.

## Summary

The dashboard has a good core architecture: markdown artifacts are parsed into
typed models, transformed into view models, and rendered through thin panel
shells, colocated section components, and shared UI primitives. The direction is
right, and the recent refactor materially improved component ownership.

The main work is now less about panel structure and more about deciding the
right operating model for the command centre: what should be surfaced first,
which strategic flows belong together, and how queue/escalation/deadline
material should converge now that the technical surfaces are visible.

## What Changed Yesterday

- The major dashboard panels were componentized into `components/panels/sections`
  with colocated CSS:
  - Gap Ledger
  - Escalations
  - Deadlines
  - Readiness
  - Evidence
  - Risk
  - Destruction
  - Queue
  - Hypothesis Detail
  - Proposals / Solution
- `App.css` was reduced from a large mixed-purpose stylesheet to a much smaller
  global shell stylesheet. It now keeps app layout, header, shared panel
  structure, section headings, badges, evidence bar, tables, text utilities,
  responsive shell rules, and onboarding styles.
- Panel-specific CSS now mostly lives beside the section that renders the
  markup. `QueuePanel.css` was added for the queue panel shell.
- Destruction rendering improved:
  - Pre-Mortem and Red Team Response use dedicated narrative sections.
  - Constraint Inversions, Evidence Concentration, Kill Signal Audit, and
    Contradictions now render through dedicated sections.
  - The invalid `view.assumptions` destruction block was removed because the
    current `DestructionView` type does not expose it.
- The solution/proposals page now renders through dedicated proposal sections:
  Growth Architecture, Solution Design, GTM Plan, Feature Map, MVP Scope,
  Growth Loops, Criteria List, and related subsections.
- Lightweight narrative parsing tests were added for destruction narrative
  formatting.
- Readiness confidence parsing was fixed to accept both `Confidence` and
  `Confidence State`, with tests.
- `GapStatusBadge` now covers `DEFERRED` and `ESCALATED`.

## What Changed Today

- Parser contract stabilisation was completed:
  - Growth Architecture and GTM Plan are now wired into `parse()` alongside
    Solution Design.
  - duplicate local empty proposal helpers were removed in favour of canonical
    proposal parser helpers.
  - queue parsing now consistently returns `pendingDecisions`.
  - `ValueProposition` handling in readiness, detail, and evidence views is
    safely narrowed instead of assuming all hypothesis fields exist.
  - risk-map now returns typed `source` values rather than the legacy
    `hypothesis` field.
- Parser and view contract tests were expanded, including full proposal parsing
  coverage and queue/risk/value-proposition contract cases.
- The dashboard now has a central `dashboard/panelRegistry.tsx`:
  - one source of truth for top-level panels, labels, short labels, groups,
    descriptions, section metadata, gap-analysis-only visibility, and panel
    rendering.
  - `App.tsx` now renders the active panel through the registry instead of a
    long conditional block.
  - `Header.tsx` receives navigation panels from the registry instead of owning
    a duplicated panel list.
- A local in-dashboard Layout editor was added:
  - panels can be reordered with native Up/Down controls.
  - sections inside each top-level panel can also be reordered.
  - layout changes are saved locally in `localStorage` under
    `strategist-dashboard-layout:v1`.
  - reset restores the canonical registry order.
  - the editor shows panel groups, descriptions, and section maps.
  - it exports a source-friendly order snippet for turning experiments into
    committed registry changes later.
- `QueuePanel` now has the same `tabpanel`/`panel-queue` wiring as the other
  top-level panels.
- A small `renderOrderedSections()` helper lets panels keep their own props and
  conditional logic while taking section order from the layout model.
- Parser diagnostics are now visible through a header utility drawer:
  - register and gap-analysis warnings are combined into one technical
    diagnostics view.
  - diagnostics are grouped by severity and source.
  - completeness and warning/error/info counts are visible without changing
    parser behaviour.
- CSS ownership for the new utility surfaces is explicit:
  - `LayoutEditor.css` owns the layout editor overlay.
  - `ParserDiagnosticsDrawer.css` owns the diagnostics overlay.
  - `App.css` only changed for the existing header parse-health control.
- Queue work-item visibility was added to the Now panel:
  - individual `execution/queue/T-*.md` files parse as task work items.
  - individual `execution/queue/E-*.md` files parse as escalation/decision work
    items.
  - `/api/queue-files` lists queue markdown files excluding
    `gap-definer-actions.md`.
  - `QueueWorkItemsSection` renders the items as a reorderable Now-page
    section.
- `tools/dashboard/README.md` was replaced with dashboard-specific technical
  documentation covering data flow, dev routes, diagnostics, layout editor
  persistence, queue visibility, CSS ownership, and commands.
- The Gap Ledger status distribution bug smell was closed:
  - the unused `seen` set was removed.
  - status counts now deduplicate by stable gap id where available.
  - anonymous records still count individually.
  - a focused view regression test covers this behavior.

## Current Verification State

- `npm test` in `tools/dashboard` passes: `10` files, `73` tests.
- `npm run build` passes.
- `git diff --check` passes.
- The refreshed dev server has been running at `http://127.0.0.1:5174/`.

## Key Observations

- The dashboard should act as a **command centre for strategic uncertainty**,
  not just a report viewer: current state, top gap, blockers, queue actions,
  escalations, and readiness should be visible quickly.
- The current layering is promising: `parser/` -> `model/` -> `views/` ->
  `components/`. Keep pushing business logic out of panels and into views and
  parsers.
- The panel layer is now much healthier. Most panel files are thin shells that
  select sections and pass view data through.
- The new layout registry is a useful turning point. Panel order, panel
  metadata, section metadata, and top-level render selection now live in one
  place, making the dashboard easier to reshape deliberately.
- The Layout editor is intentionally local and reversible. It is a planning
  tool as much as a UI feature: use it to discover better command-centre
  sequences before committing changes to `panelRegistry.tsx`.
- `App.tsx` is still doing too much orchestration: fetching, polling,
  onboarding, build trigger, queue parsing, layout persistence, reset, and render
  context creation. Render selection has improved, but data/loading concerns
  should eventually be split into hooks/services.
- The earlier parser gap is now closed: `parse()` wires Growth Architecture,
  Solution Design, and GTM Plan.
- Queue coverage is better than the original review: the Now panel now surfaces
  individual queue files as work items as well as the summary queue. This is a
  visibility pass, not a full execution/escalation inbox yet.
- Escalations and queue are conceptually related but currently split across
  gap analysis, pending decisions, deadlines, and queue files. The dashboard
  should eventually make "decisions needed" and "actions now" feel like one
  operational surface.
- Parser, layout, queue, diagnostics, and view helper tests are a better start
  and currently pass: `10` files, `73` tests. Expand this into fixture tests
  using realistic `hypotheses.md`, `gap-analysis.md`, queue, and escalation
  files.
- `tools/dashboard/README.md` now documents the dashboard rather than the Vite
  template.
- `vite.config.ts` is useful but very dev-environment specific: it writes
  `problem.md`, resets strategy files, clears queue, and shells out to
  `claude`. Keep this clearly marked as local/dev orchestration.
- The shared section components are now the main dashboard composition unit.
  Avoid adding business logic back into panel shells.
- Section order is now configurable for top-level panels. This should make it
  much easier to test different dashboard narratives, but section identity must
  stay stable: avoid renaming section ids unless a migration/reset is acceptable.
- CSS ownership is much clearer after the cleanup. Continue keeping
  panel-specific styles colocated, and treat `App.css` as global shell/shared
  primitive CSS only.
- The Gap Ledger status distribution dedupe smell is closed. Keep an eye on
  any future expansion that counts both ranked and full gap-analysis records.
- The dashboard exposes parse completeness and warning count, and warnings are
  now inspectable through the parser diagnostics drawer.
- Avoid duplicating standards in UI copy. Evidence tier meanings should come
  from one canonical source or mirror `STANDARDS.md` very deliberately.

## Recommended Improvement Tracks

### Command Centre Shape

Use the new Layout editor to test different panel and section orders. The next
product question is what the dashboard wants to be first:

- a "Now" operating surface for action, blockers, decisions, and deadlines;
- a diagnostic surface for gaps, risk, evidence, and destruction;
- a readiness surface for sell/grow confidence;
- or a design surface for proposals and GTM.

Once a sequence feels right, commit it back into `panelRegistry.tsx` as the
canonical default.

### Parser Diagnostics

The first parser diagnostics pass is complete. Next diagnostic improvements
should be practical rather than broad:

- add source file/path information if the loader exposes it;
- distinguish absent optional sections from likely broken required sections;
- optionally link diagnostics to the affected dashboard panel or section.

### Queue + Escalation Inbox

The first queue visibility pass is complete: individual queue files now appear
as read-only work items in the Now panel.

The deeper open work is convergence. Queue actions, pending decisions,
escalations, forced dispositions, and deadlines should feel like one operational
inbox rather than separate places to inspect.

### Dashboard Orchestration

Extract data loading, build polling, onboarding state, queue loading, and layout
persistence out of `App.tsx` into hooks or services.

Possible hooks:

- `useDashboardData()`
- `useExecutionQueue()`
- `useOnboardingState()`
- `useBuildPolling()`
- `useDashboardLayout()`

### UI Abstraction

Keep panels thin. Use section components for meaningful dashboard blocks and
shared components for true primitives only. The next UI abstraction opportunity
is likely not more splitting, but standardizing empty states, diagnostics, and
status/count headers where duplication becomes obvious.

Also consider improving the Layout editor itself once the workflow is proven:
grouped columns, clearer section previews, keyboard movement, or a future
drag-and-drop layer. Avoid adding a dependency until the simple controls stop
being enough.

### CSS Ownership

Maintain the new ownership boundary:

- `App.css`: app shell, header, shared panels, global badges, tables, utilities,
  onboarding.
- Utility overlay CSS: colocated with the overlay component, such as
  `LayoutEditor.css` and `ParserDiagnosticsDrawer.css`.
- Panel CSS: panel shell styles, such as `QueuePanel.css`.
- Section CSS: section-specific cards, lists, summaries, tables, and responsive
  section behavior.

Do not reintroduce large panel-specific blocks into `App.css`.

### Documentation

The README replacement is closed. Keep it current when changing dev routes,
layout persistence, parser diagnostics, local build/reset behavior, or CSS
ownership rules.

## Test Plan For Future Dashboard Changes

- Run `npm test` in `tools/dashboard` after any parser/view change.
- Run `git diff --check` after broad refactors.
- Run `npm run build`; the expected state is now a passing build.
- Add fixture tests for:
  - full `strategy/hypotheses.md` with sections 1-9
  - full `strategy/gap-analysis.md`
  - `gap-definer-actions.md`
  - `strategist-escalations.md`
- Keep regression tests for Growth Architecture and GTM parsing intact now that
  they are wired into `parse()`.
- Keep the gap status distribution deduplication regression test intact.
- Keep focused tests around parse diagnostics grouping and counts intact.
- Add layout/editor tests when changing panel or section order persistence.

## Assumptions

- This is a review/working note, not live doctrine.
- The document belongs in `archive/` so it can be worked through without
  changing the active StrategistOS rules.
- The dashboard implementation has moved ahead of the original review in the
  UI/component/CSS/parser/diagnostics areas; orchestration and operational
  queue/escalation convergence remain open.
