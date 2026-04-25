# Plan: Hypothesis Iteration Log

## Context

Each hypothesis (Problem, Segment, Unit Economics, Value Proposition) currently stores only a single `lastUpdated` date and `updateRationale` note — one snapshot of the most recent change. As the strategy iterates (reframing the problem after research, tightening unit economics after conversations, etc.) there is no in-app way to see how a hypothesis evolved. This plan adds an optional `Iteration Log` section to each hypothesis in `hypotheses.md` and wires it through the parser, types, view, and UI so the detail pages show a chronological timeline of how each hypothesis has changed.

---

## Files to Modify

| File | Change |
|---|---|
| `strategy/hypotheses.md` | Add `**Iteration Log:**` section to each hypothesis, seeded with current entry |
| `tools/dashboard/src/model/types.ts` | Add `IterationEntry` interface; add `iterationLog?` to `Hypothesis`, `ValueProposition`, `HypothesisDetailView` |
| `tools/dashboard/src/parser/hypothesis.ts` | Add `extractIterationLog()` function; extract it for each hypothesis |
| `tools/dashboard/src/views/hypothesis-detail.ts` | Pass `iterationLog` through to view |
| `tools/dashboard/src/components/panels/HypothesisDetailPanel.tsx` | Render iteration timeline section |
| `tools/dashboard/src/App.css` | Add styles for `.iteration-log`, `.iteration-entry`, `.iteration-entry__*` |

---

## Markdown Format

New section added at the end of each hypothesis block (before `Last Updated` / `Update Rationale`):

```markdown
**Iteration Log:**
- 2026-04-24 [RESEARCHED]: Initial construction.
```

Each entry format: `- YYYY-MM-DD [CONFIDENCE]: Summary text.`

Parsed by regex: `/^-\s+(\d{4}-\d{2}-\d{2})\s+\[([A-Z_]+)\]:\s+(.+)$/`

Entries are listed oldest-first in the markdown (append new ones at the bottom). The UI renders them newest-first.

---

## Implementation Steps

### 1. `strategy/hypotheses.md`

Add `**Iteration Log:**` section to each of the four hypotheses (Problem, Segment, Unit Economics, Value Proposition), seeded with one entry using the existing `lastUpdated` date, confidence, and `updateRationale` text:

```markdown
**Iteration Log:**
- 2026-04-24 [RESEARCHED]: Initial construction.
```

Place it just before `**Last Updated:**` in each section.

---

### 2. `model/types.ts`

**New interface** (add near other shared interfaces):
```ts
export interface IterationEntry {
  date: string;           // "2026-04-24"
  confidence?: string;    // "RESEARCHED", "SUPPORTED", etc.
  summary: string;        // free text
}
```

**`Hypothesis` interface** — add optional field:
```ts
iterationLog?: IterationEntry[];
```

**`ValueProposition` interface** — add same optional field:
```ts
iterationLog?: IterationEntry[];
```

**`HypothesisDetailView`** — add optional field:
```ts
iterationLog?: IterationEntry[];
```

---

### 3. `parser/hypothesis.ts`

Add parsing function after existing extract helpers:

```ts
function extractIterationLog(text: string): IterationEntry[] {
  const block = extractBlockAfterLabel(text, 'Iteration Log');
  if (!block) return [];
  return block
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.startsWith('-'))
    .map(line => {
      const m = line.match(/^-\s+(\d{4}-\d{2}-\d{2})\s+\[([A-Z_]+)\]:\s+(.+)$/);
      if (!m) return null;
      return { date: m[1], confidence: m[2], summary: m[3] };
    })
    .filter((e): e is IterationEntry => e !== null);
}
```

Call it alongside the other field extractions:
```ts
const iterationLog = extractIterationLog(text);
```

Add to the returned hypothesis object:
```ts
iterationLog: iterationLog.length > 0 ? iterationLog : undefined,
```

---

### 4. `views/hypothesis-detail.ts`

Add pass-through in `computeHypothesisDetail`, alongside `lastUpdated` and `updateRationale`:
```ts
iterationLog: h.iterationLog,
```

---

### 5. `HypothesisDetailPanel.tsx`

Add a new section after the existing `updateRationale` block:

```tsx
{view.iterationLog && view.iterationLog.length > 0 && (
  <div className="detail-section">
    <h3 className="section-heading">
      Iteration Log
      <span className="section-heading__count">{view.iterationLog.length}</span>
    </h3>
    <ol className="iteration-log">
      {[...view.iterationLog].reverse().map((entry, i) => (
        <li key={i} className="iteration-entry">
          <span className="iteration-entry__date">{entry.date}</span>
          {entry.confidence && (
            <span className={`iteration-entry__confidence iteration-entry__confidence--${entry.confidence.toLowerCase()}`}>
              {entry.confidence}
            </span>
          )}
          <p className="iteration-entry__summary">{entry.summary}</p>
        </li>
      ))}
    </ol>
  </div>
)}
```

---

### 6. `App.css`

Add styles after the `.rationale-text` block (~line 1532):

```css
/* Iteration log */
.iteration-log {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.iteration-entry {
  display: grid;
  grid-template-columns: auto auto 1fr;
  gap: var(--space-2) var(--space-3);
  align-items: baseline;
  padding: var(--space-3) var(--space-4);
  background: var(--color-surface-raised);
  border-radius: var(--radius-md);
  border-left: 3px solid var(--color-border);
}

.iteration-entry__date {
  font-size: var(--text-xs);
  font-family: var(--font-mono);
  color: var(--color-on-surface-muted);
  white-space: nowrap;
}

.iteration-entry__confidence {
  font-size: var(--text-xs);
  font-weight: 600;
  padding: 1px var(--space-2);
  border-radius: var(--radius-sm);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.iteration-entry__confidence--researched  { background: #dbeafe; color: #1d4ed8; }
.iteration-entry__confidence--supported   { background: #dcfce7; color: #15803d; }
.iteration-entry__confidence--unvalidated { background: var(--color-surface-raised); color: var(--color-on-surface-muted); }
.iteration-entry__confidence--broken      { background: #fee2e2; color: #dc2626; }

.iteration-entry__summary {
  font-size: var(--text-sm);
  color: var(--color-on-surface);
  margin: 0;
  grid-column: 1 / -1;
}
```

---

## How to Add a New Iteration

When you reframe a hypothesis, append a new line to its `**Iteration Log:**` section in `hypotheses.md`:

```markdown
**Iteration Log:**
- 2026-04-24 [RESEARCHED]: Initial construction.
- 2026-05-10 [RESEARCHED]: Reframed scope after resident interviews — narrowed to assisted-living facilities only.
```

The dashboard will pick it up on next load (or refresh), showing the two entries newest-first.

---

## Verification

1. Run `npm run dev` in `tools/dashboard/`
2. Navigate to any hypothesis detail page (Problem, Segment, Unit Economics, Value Proposition)
3. Scroll past the Update Rationale section — confirm **Iteration Log** section appears with one entry
4. Confirm entry shows date, confidence badge (colour-coded), and summary text
5. To test multi-entry rendering: add a second entry to one hypothesis in `hypotheses.md` and confirm newest appears first
6. Hypotheses with no `**Iteration Log:**` section should render no timeline section (graceful absence)
