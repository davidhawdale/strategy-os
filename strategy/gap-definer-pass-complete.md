# Gap Definer Pass Complete

Date: 2026-05-10
Source Register Version: 1 (BUILD pass, 2026-05-10)
Subject: DC Thomson — Scottish Borders daily news service

---

## Gate Decision: NO_GO

No spend beyond fieldwork is authorised.

- `sell_ready = false` — one HIGH-blast unresolved blocker (E-01 open; three T3 HIGH-blast assumptions unvalidated)
- `scale_ready = false` — four of five conditions fail

---

## Top-3 Active Gaps

| Rank | Gap | Target | Dimension | Priority |
|---|---|---|---|---:|
| 1 | G-01 | PROBLEM | PAIN_CLARITY | 21 |
| 2 | G-02 | UNIT_ECONOMICS | ECONOMIC_VIABILITY | 21 |
| 3 | G-03 | SEGMENT | SEGMENT_CLARITY | 18 |

All three gaps reduce together via the E-01 fieldwork programme.

---

## Key Destruction Findings

### Pre-Mortem
The dominant failure mode is **ambiguous slow bleed**, not catastrophic collapse. The register's kill conditions are currently tuned for clear failure and would miss this mode. Slow bleed scenario: resident interest is real but not strong enough to drive subscription at P&J-equivalent ARPU; churn exceeds new acquisition after 18 months; title limps on DCT subsidy rather than reaching self-sufficiency.

### Red-Team Response (Newsquest, 90 days)
Newsquest's most credible response is moving Border Telegraph to a semi-weekly cadence — adding a mid-week edition — at minimal incremental cost to their existing operation. This directly compresses the VP differentiator ("the whole Borders, every day") before DCT has established the habit. No register kill condition currently captures incumbent response of this type.

### Constraint Inversions

| Assumption Inverted | Consequence | Strategy Survives? |
|---|---|---|
| Resident pain is weak / latent | Subscription ARPU cannot be achieved; economics collapse | NO |
| Towns reject shared Borders identity | Core VP destroyed; segmented products multiply cost beyond viability | NO |
| DCT shared services cost allocation is unfavourable | UE1 hybrid unviable; fallback to UE2 newsletter-only | WITH_MODIFICATION |
| SME advertiser appetite is low | Hybrid revenue model degrades to subscription-only; payback extends | WITH_MODIFICATION |
| Digital reach limited by 60+ offline cohort | Digital-only MVP cannot reach primary segment; print required from launch | WITH_MODIFICATION |
| Newsquest responds within 90 days | VP differentiation window shortened; requires faster launch cadence | WITH_MODIFICATION |
| P&J model transfer cost is higher than estimated | Break-even timeline extends; portfolio tolerance question becomes acute | WITH_MODIFICATION |
| Diaspora segment unmonetisable | Growth expansion segment removed; SAM smaller | WITH_MODIFICATION |

### Evidence Concentration Risk

| Source | Claims Supported | Risk Level |
|---|---|---|
| Press Gazette / JICREG data | P&J circulation, UK regional press trends, competitive positioning | CONCENTRATED |
| Poynter / Mill Media coverage | Transferability analogs, subscription model viability | CONCENTRATED |
| DCT corporate marketing / annual report | P&J revenue, digital subscriber counts | CONCENTRATED |
| Borders resident voices | Pain clarity, WTP, segment clarity | CONCENTRATED-BY-ABSENCE (zero T1) |

### Kill Signal Audit
No kill conditions currently met. Two signals require monitoring:
1. Resident pain signal — no T1 evidence yet; absence is not disproof but is a structural gap
2. Incumbent response — Newsquest semi-weekly move would be observable; no monitoring in place

---

## Contradictions

| ID | Between | Description | Impact | Block Execution? |
|---|---|---|---|---|
| C-01 | Segment (digital-inclusion data) vs Solution Design (digital-only MVP) | ~20% of primary segment (60+, rural) have limited digital access; digital-only MVP excludes a material portion of S1 | MEDIUM | No (does not block fieldwork; will block pilot scope decision) |

---

## Open Escalations

All three escalations from the BUILD pass remain OPEN, awaiting governor decision:

- **E-01** — Borders fieldwork mandate (fund resident and SME interviews)
- **E-02** — DCT internal cost-allocation and cross-promotion data
- **E-03** — Portfolio tolerance for a sub-scale title (values decision)

---

## Files Written by This Pass

- `strategy/gap-analysis.md` — full gap analysis register
- `strategy/hypotheses.md` — §8 Destruction Log and §9 Gap Ledger updated; header metadata updated
- `execution/queue/T-01-borders-resident-fieldwork.md`
- `execution/queue/T-02-borders-sme-advertiser-fieldwork.md`
- `execution/queue/T-03-dct-internal-data-request.md`

---

## Next Re-Run Trigger

Governor response to E-01, or 2026-07-31, whichever is sooner.
