# Improvements

## 1. Escalation headings should link to their gap records

**Files changed:**

- `tools/dashboard/src/parser/gap-analysis.ts`
- `tools/dashboard/src/model/types.ts`
- `tools/dashboard/src/components/panels/EscalationsPanel.tsx`
- `tools/dashboard/src/App.tsx`
- `tools/dashboard/src/components/panels/GapLedgerPanel.tsx`

Escalation titles like "Marginal cost of platform extension (G-02)" contain gap record cross-references in their `(G-XX)` suffix, but clicking them did nothing — the linking infrastructure was completely absent.

**What was added:**

1. **Parser** — extract `gapId` from the title suffix:

```ts
const gapIdMatch = title.match(/\(G-(\d+)\)/i);
const gapId = gapIdMatch ? `G-${gapIdMatch[1].padStart(2, '0')}` : undefined;
```

2. **`Escalation` type** — new optional field `gapId?: string`
3. **`AppState` / `AppEvent`** — added `selectedGapId?: string` to `Loaded` and `Stale` states; added `SelectGap` event; wired handler in `transition` to navigate to `gapLedger` panel
4. **`EscalationsPanel`** — accepts `onSelectGap?` callback; renders title as a `<button>` when `gapId` is present, plain text otherwise
5. **`GapLedgerPanel`** — accepts `selectedGapId?`; scrolls to the matching gap record article on mount via `useEffect`; gap record `<article>` elements now have `id={gap.id}`

Escalations with `(G-XX)` references are now clickable and navigate to the Gap Ledger, scrolling to the specific record. Escalations without a gap reference remain plain text.
