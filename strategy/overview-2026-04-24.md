# DC Thomson Scottish Borders Extension — Strategy Overview

**Date:** 2026-04-24
**System:** StrategistOS BUILD — Initial Pass
**Decision:** CONDITIONAL_GO
**Sell Ready:** false
**Scale Ready:** false

---

## Headline Finding

The Scottish Borders extension is viable in base case, fragile in pessimistic, and tight in both. The market is not obviously broken — but the margin of safety is thin enough that committing Phase 1 resource without validation would be imprudent.

Breakeven requires **6,000–9,000 paying subscribers** from a market of roughly **50,000 households** — achievable in optimistic (10–15% subscription rate in the target 50+ cohort), fatal in pessimistic (CAC 3×, churn 2×, segment 40% smaller).

**Geography is load-bearing.** The Scottish Borders has ~63 people/sq mi vs Aberdeen/Aberdeenshire's urban density — print distribution costs are materially higher and no single-town launch is viable without proof the surrounding dispersed population will also convert.

---

## Three Validated Research Findings

| Finding | Tier | Source |
|---|---|---|
| Borders population ~117k, density 63/sq mi; 30.2% in 45–64 cohort; 5th-highest over-65 in Scotland | T1 | NRS / Scottish Borders Council |
| Southern Reporter print circulation collapsed 73% over a decade (12,500 → 3,352); Border Telegraph (Newsquest) only remaining active local title at £4.99/mo | T1 | Press Gazette / Wikipedia |
| DC Thomson digital subscriptions: 30,000+ (Nov 2023), 50,000+ regional total (2024); revenue £40.6m FY24 (only growing line); P&J digital £5.99/mo | T1 | Press Gazette / WAN-IFRA |

---

## Three Actions — Phase 0 Validation (£8–15k estimated)

Do these before committing to Phase 1. In this order.

### Action 1 — NRS Data Pull (due 2026-05-15)

Pull NRS Households 2024 + Ofcom Connected Nations Borders broadband data + Project Gigabit coverage maps. Compute the precise 50+/broadband-served household count.

**Gate:** If this falls below 15,000 households, the segment kill condition is met — halt.

### Action 2 — Resident Interviews (due 2026-06-23)

10–15 structured interviews across at least 4 Borders towns (including one rural-only postcode). Problem-led script only — do not introduce the DCT product until the final section.

Looking for: felt pain at absence of daily local news, and self-reported willingness to pay at £4.99/mo.

**Gate:** If fewer than 3 of 10 interviewees report a felt deficit, the problem hypothesis breaks.

### Action 3 — Landing Page Test (due 2026-06-23)

Pre-launch page ("Borders Journal" or similar), 3 sample stories, £4.99 vs £2.99/mo A/B split, ~2,000 paid Facebook clicks to TD postcodes.

**Gate:** Intent rate >5% = pass; <2% = kill on value proposition.

---

## Four Governor Escalations Awaiting Decision

| # | Question | Why it blocks | Due |
|---|---|---|---|
| E-01 | Can the existing P&J digital platform be extended to Borders at marginal cost, or does it require a rebuild? | Determines whether Phase 1 unit economics work at all | 2026-05-08 |
| E-02 | Should Borders be modelled as standalone overhead or marginal cost on top of existing newsroom? | Shifts the cost basis by £150k–400k/yr — changes viability conclusion | 2026-05-08 |
| E-03 | Is £8–15k Phase 0 validation budget authorised? | Without this, Actions 1–3 cannot proceed | ASAP |
| E-04 | If validation is inconclusive by 2026-07-31, what is the default — KILL, PIVOT, or COMMIT? | Prevents indefinite exploration | ASAP |

---

## Blocked Until Resolved

- Phase 1 launch of any kind
- Editorial recruitment for Borders newsroom
- Any public pre-announcement (leakage triggers Newsquest's 90-day response — price cut to £2.99, channel inventory buyout, "daily" cadence relabel — before DC Thomson has validation evidence)
- Print carrier commitments

---

## Destruction Highlights

The Gap Definer ran adversarial destruction on the register. Key findings:

**Pre-mortem dominant failure chain:** Segment size and channel saturation are modelled as independent variables but they compound. A 30% smaller segment kills Phase 1 at month 9 with approximately £90–120k of spend already committed.

**Red-team (Newsquest / Border Telegraph):** A credible 90-day response is a price reduction to £2.99/mo, purchase of local Facebook/Google inventory in TD postcodes, and a "daily" cadence relabel of their existing product. This blunts three of DC Thomson's load-bearing claims simultaneously — pricing, channel availability, and cadence differentiation.

**Evidence concentration risk:** Two sources (WAN-IFRA DCT trajectory data; Press Gazette/Newsquest conversion benchmarks) each carry load-bearing claims across multiple hypotheses. Both need corroboration before any Section 3 promotion.

---

## Full Register Files

| File | Contents |
|---|---|
| `strategy/hypotheses.md` | Full 9-section hypothesis register (Sections 1–7 by Strategist; Sections 8–9 by Gap Definer) |
| `strategy/gap-analysis.md` | Full gap scoring, destruction log, decision rules, and 10 ranked gaps |
| `execution/queue/2026-04-24-gap-definer-actions.md` | Top-3 action queue, blocked paths, governor escalations |
| `execution/queue/2026-04-24-strategist-escalations.md` | Original Strategist escalations (E-01, E-02) |

---

## Re-run Trigger

Gap Definer should re-run when:
- Escalations E-01 and E-02 are answered
- Any Phase 0 action produces evidence
- A kill signal is observed in the field
- By 2026-06-30 at the latest (scheduled CHALLENGE mode pass)
