# Pain Scoring Pipeline — full implementation spec

## Context

The `HypothesisDetailPanel` had a Pain Scoring section written aspirationally but never wired up — no data in the register, no type, no parser, no view builder entry. It was removed as dead code (2026-05-06). This spec describes restoring it properly end-to-end.

Two layers of work are required:
1. **Data** — add a pain scoring table to the Segment section of `hypotheses.md` using scores implied by existing evidence
2. **Pipeline** — type → parser → view builder → panel

`phaseEconomics` is NOT being restored — it has no data and no schema in the register format.

---

## Layer 1 — `strategy/hypotheses.md` (Segment section)

Add a `**Pain Scoring:**` subsection after the Evidence block in Section 2 (Segment). Format follows the stg-segmenting-customers skill schema (5-point scale per dimension, composite = product of four dimensions, max 625).

Scoring for the primary and alternative segments:

| Segment | Frequency | Severity | Breadth | Alt. Inadequacy | Composite |
|---|---|---|---|---|---|
| 50+ civic-engaged Borders residents | 4 | 4 | 3 | 4 | 192 |
| General Borders residents (18–49) | 2 | 2 | 3 | 3 | 36 |

Rationale for primary segment scores:
- **Frequency 4**: daily/weekly engagement with local news (Facebook groups, print habit) — T2 inferred
- **Severity 4**: meaningful civic gap (council, court, planning) with no daily substitute — T2
- **Breadth 3**: c.117k population, meaningful but not mass — T1
- **Alt. Inadequacy 4**: Border Telegraph weekly-only, Southern Reporter weekly-only, BBC broadcast-cadence — T1

---

## Layer 2 — Dashboard pipeline

### 2a. `tools/dashboard/src/model/types.ts`

Add interface and extend `HypothesisDetailView`:

```typescript
export interface PainScoringEntry {
  segment: string;
  frequency: number;
  severity: number;
  breadth: number;
  alternativesInadequacy: number;
  composite: number;
}
```

In `HypothesisDetailView`, add:
```typescript
painScoring?: PainScoringEntry[];
```

### 2b. `tools/dashboard/src/parser/tables.ts`

Add function following the existing `parseModeThresholdsTable` pattern:

```typescript
export function parsePainScoringTable(table: Table): PainScoringEntry[] {
  const rows = tableToRows(table);
  if (rows.length < 2) return [];
  return rows.slice(1).map(row => ({
    segment: row[0] || '',
    frequency: parseInt(row[1] || '0', 10),
    severity: parseInt(row[2] || '0', 10),
    breadth: parseInt(row[3] || '0', 10),
    alternativesInadequacy: parseInt(row[4] || '0', 10),
    composite: parseInt(row[5] || '0', 10),
  }));
}
```

### 2c. `tools/dashboard/src/parser/hypothesis.ts`

Add table detection in the Segment section parser, alongside the existing table detectors (cost structure / channel strategy / mode thresholds). Detect by first two headers: `Segment` and `Frequency`.

Add `painScoring?: PainScoringEntry[]` to the parsed hypothesis result and populate from the detected table.

### 2d. `tools/dashboard/src/views/hypothesis-detail.ts`

In `computeHypothesisDetail`, pass `painScoring` through from the hypothesis to the view.

### 2e. `tools/dashboard/src/components/panels/HypothesisDetailPanel.tsx`

Restore the Pain Scoring section. Render after Observable Filters, before Scenario Analysis:

```tsx
{view.painScoring && view.painScoring.length > 0 && (
  <div className="detail-section">
    <h3 className="section-heading">Pain Scoring</h3>
    <DataTable
      caption="Segment pain scoring"
      columns={[
        { key: 'segment', header: 'Segment', render: r => r.segment },
        { key: 'freq', header: 'Freq', render: r => r.frequency, align: 'center' },
        { key: 'sev', header: 'Sev', render: r => r.severity, align: 'center' },
        { key: 'breadth', header: 'Breadth', render: r => r.breadth, align: 'center' },
        { key: 'alt', header: 'Alt Inad.', render: r => r.alternativesInadequacy, align: 'center' },
        { key: 'comp', header: 'Composite', render: r => <strong>{r.composite}/625</strong>, align: 'center' },
      ]}
      data={view.painScoring}
    />
  </div>
)}
```

---

## Files touched

| File | Change |
|---|---|
| `strategy/hypotheses.md` | Add Pain Scoring table to Segment section |
| `tools/dashboard/src/model/types.ts` | Add `PainScoringEntry` interface; add `painScoring?` to `HypothesisDetailView` |
| `tools/dashboard/src/parser/tables.ts` | Add `parsePainScoringTable` |
| `tools/dashboard/src/parser/hypothesis.ts` | Add table detection + population for `painScoring` |
| `tools/dashboard/src/views/hypothesis-detail.ts` | Pass `painScoring` through to view |
| `tools/dashboard/src/components/panels/HypothesisDetailPanel.tsx` | Restore Pain Scoring section |

---

## Verification

Open the Segment hypothesis detail panel in the dashboard — Pain Scoring table should appear with two rows, showing the segment name and the five dimension scores.
