# Challenge Diff — DC Thomson Scottish Borders Extension

**Before:** BUILD pass, 2026-04-24
**After:** CHALLENGE pass, 2026-05-05
**New evidence:** P&J product briefing + 23 screenshots (assembled 2026-05-05)

---

## Headline

Decision: **CONDITIONAL_GO** → **CONDITIONAL_GO (narrowed)**

Phase 0 launch status: **open** → **BLOCKED** (new contradiction C-3)

sell_ready: **false** → **false (worsened — new blocker)**
scale_ready: **false** → **false**

---

## Hypothesis Confidence States

| Section | Before | After | Reason |
|---------|--------|-------|--------|
| 1 — Problem | RESEARCHED | RESEARCHED | No change in confidence state. Kill condition extended to cover three product configurations (free newsletter / paid daily / paid section), not just binary paid/no-paid. |
| 2 — Segment | RESEARCHED | RESEARCHED | No change in confidence state. New calibration: Borders (~117k) sits in DCT's observed borderline band between newsletter-only (Moray ~95k) and paid title (NE Scotland ~260k). Raises urgency of G-04. |
| 3 — Unit Economics | RESEARCHED | RESEARCHED | Pricing corrected to T1-confirmed tiers (£4.99/£8.99/£23.99). Print+digital bundle assumption removed — live product has no bundle. ARPU revised upward. LTV:CAC base case improved (6-12x, was 4.5-8x). Pessimistic scenario still kills. |
| 4 — Value Proposition | RESEARCHED | RESEARCHED | Refined "daily" differentiator to mean daily Borders-specific reporting, not just delivery cadence. WTP probe extended to three configurations. |
| 5 — Growth Architecture | RESEARCHED | RESEARCHED | E-01 partially resolved: multi-locale app feature is T1 evidence for locale-within-existing-brand pathway. Separate-brand pathway remains BLIND. |
| 6 — Solution Design | PROPOSED | PROPOSED | Two-stage MVP introduced: Stage 1 = free Borders newsletter (Phase 0); Stage 2 = paid product. Matches DCT's observed pattern in Elgin, Inverness, Oban. |
| 7 — GTM Plan | PROPOSED | PROPOSED | Phase 0 (Newsletter Validation, Months -3 to 0) added with exit gates: ≥1,500 signups, CAC <£8, open rate >35%, ≥7 of 11 towns represented. |

---

## Gap Priority Changes (Top 10)

| Gap | Before (Final Priority) | After (Final Priority) | Change |
|-----|------------------------|----------------------|--------|
| G-01 Problem pain | 21 | 21 | No change |
| G-06 VP validity | 21 | 21 | No change; test expanded to 3-cell configuration |
| G-04 Segment size | 18 | 21 | **Raised** — now also a form-of-product question (is Borders above/below DCT's newsletter-only threshold?) |
| G-02 Platform cost | 21 | 18 | **Lowered** — multi-locale app evidence partially resolves the separate-brand assumption; remaining uncertainty is narrower |
| G-03 Unit economics | 18 | 15 | **Lowered** — T1 pricing now known; residual gap is Borders-specific ARPU and churn, not the reference pricing |
| G-13 Newsletter cannibalisation threshold | (new) | 15 | **New gap** — kill threshold not defined in the two-stage model |
| G-14 Phase 0 path-dependency on brand | (new) | 15 | **New gap** — driving new contradiction C-3 |
| G-15 Phase 0 engagement vs WTP signal | (new) | 12 | **New gap** — free newsletter signup is a weaker demand signal than paid trial |
| G-05 Churn | 15 | 12 | Lowered — pricing correction improves LTV:CAC; churn risk is real but not the primary constraint |
| G-07 Print carrier | 12 | 12 | No change; deferred |

---

## Assumptions Changed

| Assumption | Before | After |
|-----------|--------|-------|
| Pricing range for Borders product | £4.99–£5.99/mo (single tier, T3) | Web Pack £7.99/mo; Web+ePaper £14.99/mo (anchored on T1 P&J and Evening Express comparators) |
| Print+digital bundle | Assumed as a product option (T3) | Removed — P&J has no bundle; print sold separately |
| Phase 0 entry mechanism | Landing page A/B test (T3) | Newsletter MVP Stage 1, then paid product Stage 2 (T1 observed DCT practice) |
| Platform multi-geography | BLIND (T3) | T2 for locale-within-brand path; BLIND for separate-brand path |
| GTM sequence | Phase 1 launch directly | Phase 0 newsletter (months -3 to 0) → Phase 1 paid product |
| Newsquest response window | 90 days | 6–9 months (extended by the two-stage entry sequence) |

---

## New Contradiction (Pass 2)

**C-3 — Phase 0 launch blocked pending brand architecture decision**

Section 5 (Growth Architecture) requires a brand-architecture decision before Phase 1. Section 7 (GTM Plan) now proposes a Phase 0 newsletter launching before that decision. Running a newsletter under the P&J brand for 3–6 months may make a later separate-brand decision costly (path-dependency). Phase 0 launch is BLOCKED until E-03 (brand architecture) is resolved by the governor.

This is the principal worsening of the sell_ready gate vs Pass 1.

---

## Escalations

| Escalation | Before | After |
|-----------|--------|-------|
| E-01 Platform marginal cost | Open, due 2026-05-08 | Narrowed — now concerns separate-brand path only; locale-within-brand path partially resolved by T1 app evidence |
| E-02 Overhead allocation | Open, due 2026-05-08 | Unchanged — URGENT (3 days) |
| E-03 Budget authorisation | Open (Esc-3) | Unchanged; cost envelope updated to £10–21k (wider range reflects Phase 0 newsletter cost and optional G-15 paid-trial cell) |
| E-04 Decision deadline | Open | Unchanged |
| **E-05 Brand architecture** | Not in Pass 1 | **New** — governor must decide: (A) separate Borders brand, (B) section within existing brand, (C) defer to after Phase 0 data. Strategist preference is (C). Needed before Phase 0 launches. Due ~2026-06-15. |

---

## New Failure Modes (Pass 2 Destruction — not in Pass 1)

1. **Newsletter cannibalisation** — residents receive free weekly Borders newsletter and do not convert to the paid daily product. DCT's own portfolio history (do existing free newsletters in Moray/Inverness convert?) is not in the evidence base. Governor-supplied data could test this.

2. **Phase 0 path-dependency** — running a Borders newsletter inside an existing DCT brand for 3–6 months may make a later separate-brand decision costly. If the governor wants brand optionality, the brand decision must precede Phase 0, not follow it.

3. **Extended Newsquest response window** — the two-stage model gives Newsquest 6–9 months of observable signal before DC Thomson commits to a paid product. In Pass 1, Newsquest had 90 days. A Newsquest defensive newsletter mirroring DCT's Phase 0 is now a plausible 90-day response — one that was not available in the Pass 1 model.

4. **False demand signal from free signups** — newsletter signup (free, low-friction) is a weaker behavioural signal than paid-trial signup. Pass 2 action queue includes a recommendation to add a paid-trial test cell within Phase 0 itself (G-15), increasing Phase 0 budget.

---

## What Did Not Change

- **Overall decision: CONDITIONAL_GO** — no hypothesis is BROKEN; the strategy is not dead.
- **Pessimistic scenario still kills** — the pricing correction improves base and optimistic scenarios; the pessimistic floor (segment 30% smaller, CAC 3×, churn 2×) still reaches kill condition at month 9.
- **Phase 1 launch remains BLOCKED** — unchanged from Pass 1; still gated on E-01, E-02, and G-04.
- **Editorial recruitment remains BLOCKED** — unchanged.
- **Public pre-announcement remains BLOCKED** — unchanged.
- **Architecture: TRADITIONAL subscription** — unchanged; confirmed by live reference product.

---

## Baseline Snapshots

The Pass 1 artifacts are preserved at `strategy/snapshots/2026-04-24/` and will not be modified:

- `hypotheses.md` — 751 lines, all nine sections
- `gap-analysis.md` — 428 lines, full gap register
- `gap-definer-actions.md` — 98 lines, top-3 action queue
- `strategist-escalations.md` — 48 lines, E-01 and E-02
