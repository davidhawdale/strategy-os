# Gap Definer Action Queue

**From:** gap-definer
**Date:** 2026-05-05
**Pass:** 2 (post Strategist CHALLENGE incorporating P&J product briefing T1 evidence)
**Sell Ready:** false (worsened vs Pass 1 — new architecture contradiction C-3 introduced)
**Scale Ready:** false (unchanged)
**Decision:** CONDITIONAL_GO — narrowed
**Supersedes:** execution/queue/2026-04-24-gap-definer-actions.md (Pass 1 actions; carry forward where unchanged)

---

## Top 3 Actions (Validation Sequence — Phase 0)

Three-way tie at Final Priority 21 (G-04, G-01, G-06). Listed in execution order by deadline urgency within tied priority.

### Action 1 — G-04: Borders segment-size data pull (URGENT)

- **Type:** RESEARCH
- **Reduces gap:** G-04 (Final Priority 21, rose from 18 in Pass 1)
- **Deadline:** **2026-05-15 (10 days from today). URGENT.**
- **NOT gated on Esc-3 budget authorisation** — this is desk research executable by DCT analyst capacity. This was true in Pass 1 and remains true.
- **Description:** Pull NRS Households and Dwellings 2024 dataset for Scottish Borders council area. Cross-reference Ofcom Connected Nations 2025 Borders data (fixed broadband by output area). Cross-reference Project Gigabit programme coverage map. Compute the 50+/broadband-served household population. Compare against:
  - (a) the 25-35k modelled assumption (Section 2)
  - (b) the 15k Section 2 kill floor
  - (c) **CHALLENGE-added:** the DCT revealed-preference newsletter-vs-paid threshold band — Moray ~95k pop = newsletter-only; NE Scotland ~260k+ pop = paid title; Borders ~117k pop sits in the borderline band
- **Expected output:** Single-page tabulation with NRS + Ofcom + Project Gigabit triangulation; pass/fail vs Section 2 kill condition; **explicit calibration of where Borders sits within DCT's revealed-preference threshold band** (newsletter-only vs paid-title side).
- **Why upgraded urgency:** CHALLENGE pass elevated this from a segment-size question to a *form-of-product* question. If addressable HH segment is closer to 15k than 30k, the strategy converges on the newsletter-inside-existing-title pattern observed in Moray/Inverness/Oban — this changes the entire decision frame.
- **Evidence target:** T1 (official statistical data)
- **Owner:** TBD — assignment urgent. **Action required by 2026-05-08:** confirm owner identified and pull in progress (or escalate as blocker).

### Action 2 — G-01: Borders resident interviews (extended script)

- **Type:** INTERVIEW
- **Reduces gap:** G-01 (Final Priority 21) and G-06 (Final Priority 21, secondary)
- **Deadline:** 2026-06-23 (49 days from today)
- **Gated on:** Esc-3 governor authorisation of Phase 0 validation budget (currently unresolved)
- **Description:** Conduct 10-15 structured Borders resident interviews. Sampling spec unchanged from Pass 1: across at least 4 of 11 main towns (incl. one rural-only postcode); across age cohorts (40-50, 51-65, 66+); mix of current Border Telegraph / Southern Reporter subscribers, lapsed subscribers, never-subscribers.
- **Mandatory script structure:**
  1. Current local-news consumption (open-ended; no leading)
  2. Felt gaps in current consumption (problem-led probe)
  3. Hypothetical: cadence elasticity (do you want news daily / weekly / less often, and why)
  4. Hypothetical: WTP probe (what would make you pay £4.99/mo for a daily product)
  5. **CHALLENGE-extended Stage 5: Three-configuration probe.** Introduce sequentially:
     - (a) free Borders weekly newsletter from DCT (working title "Borders Bulletin from The Press & Journal")
     - (b) paid daily Borders product at £7.99/mo (working title "The Borders Journal")
     - (c) paid Borders coverage as section/topic within an existing P&J or Courier subscription at £8.99/mo
     - Probe preference and stated WTP for each. **The configuration order should be randomised across interviews to control for primacy effects.**
- **Solution Contamination Rule applies:** stages 1-4 must complete BEFORE any product configuration is mentioned in stage 5. If the script introduces the product or pricing before establishing problem-felt-pain, the test is invalid.
- **NEW sequencing constraint:** G-01 interviews must complete BEFORE any Phase 0 newsletter launches. If Phase 0 launches first, residents are exposed to a DCT Borders product and the interview test becomes solution-contaminated.
- **Expected output:** Interview-evidence summary mapped to Section 1 desired-state thresholds AND to the CHALLENGE-extended kill condition (does the newsletter form satisfy the gap?). Resolves the form-of-product question that E-03 cannot resolve from desk analysis alone.
- **Evidence target:** T1 (CONVERSATION ground truth)
- **Owner:** TBD (Strategist or external research operator)

### Action 3 — G-06: Pre-launch landing-page test (3-cell configuration test)

- **Type:** EXPERIMENT
- **Reduces gap:** G-06 (Final Priority 21)
- **Deadline:** 2026-06-23 (49 days from today)
- **Gated on:** Esc-3 governor authorisation
- **Description:** Build *three* pre-launch landing pages, not one (CHANGED from Pass 1's 2-cell price test):
  - **Page A:** Free Borders weekly newsletter from "Borders Bulletin powered by The Press & Journal" (or equivalent)
  - **Page B:** "The Borders Journal" (separate brand) — paid daily Borders product at £7.99/mo (with annual option)
  - **Page C:** "Borders coverage" within an existing P&J subscription — pricing reverts to existing P&J Web Pack £8.99/mo, presented as expanded coverage within an established product
- Each page contains the proposition, 3 sample (illustrative) story summaries across council/court/sport, and a clear next-step CTA. Drive c.2,500-3,000 paid Facebook clicks split equally across the three pages, targeted to TD postcodes 50+. Measure: email-capture rate, click-through to "subscribe / sign up", explicit intent ("notify me at launch"); per-page differential.
- **Pair with G-01 interview tail:** identical clause-recognition probes asked across both methods to triangulate.
- **Expected output:** Quantitative intent rate per configuration, allowing comparison of (a) free vs paid demand, (b) separate-brand vs section-in-existing-brand, (c) interaction effect with the E-03 brand-architecture decision. **Triangulates E-03 with behavioural data the desk-only escalation cannot produce.**
- **Pass threshold:** >5% intent at the *winning* configuration (rather than at a fixed price point — the winning config is itself an output)
- **Kill threshold:** <2% intent at all three configurations
- **Evidence target:** T1 (BEHAVIOURAL for intent; CONVERSATION for clauses)
- **Cost implication:** Adds c.£1-2k to Esc-3 envelope (£8-15k → £9-17k). With G-15 paid-trial cell added: c.£12-21k.
- **Owner:** TBD

---

## Governor Escalations

### Awaiting (do NOT re-escalate per error-handling rule — report waiting status)

1. **E-01 (G-02) — Platform marginal cost (separate-brand path)** — deadline 2026-05-08 (3 days). **URGENT.** CHALLENGE narrowed scope to separate-brand pathway only; locale-within-existing-brand path partially resolved by T1 evidence (multi-locale capability per pj-app-onboarding-4.PNG).
2. **E-02 (G-03) — Overhead allocation policy** — deadline 2026-05-08 (3 days). **URGENT.** Loses force entirely if E-03 resolves to (B); otherwise unchanged.
3. **Esc-3 — Phase 0 validation budget** — no governor response. **Now URGENT in effect** because G-01 and G-06 cannot execute without authorisation. **Updated cost envelope:** c.£10-17k (was £8-15k); c.£12-21k if G-15 paid-trial cell incorporated.
4. **Esc-4 — Decision-deadline confirmation** — no governor response.

### NEW from Strategist this pass (carried into the queue from 2026-05-05-strategist-escalations.md)

5. **E-03 (G-16) — Brand architecture decision** — separate Borders brand vs section in existing brand vs sequenced. Deadline ~2026-06-15 (41 days). HIGH blast — cascades through Sec 3, 4, 5, 6, 7. Strategist preference (C); Gap Definer assessment: (C) only feasible with brand-neutral Phase 0 design, which contradicts cost-minimisation logic that argues for hosting inside existing brand.

### NEW from Gap Definer this pass (back-pass to Strategist, NOT a governor escalation)

6. **Esc-5 — Strategist clarification on C-3 resolution path:**
   - Section 5 lists "Brand-architecture decision made before Phase 1" as required architecture condition
   - Section 7 has Phase 0 launching BEFORE the brand decision is made
   - These are internally inconsistent: hosting Phase 0 inside an existing brand de facto pre-commits the brand
   - **Question for Strategist:** Does the Section 5 condition bind at Phase 0 launch, or only at Phase 1 launch?
     - If Phase 1 only: add a brand-neutral Phase 0 design spec to Section 6 / Section 7 that preserves all three E-03 options through to Phase 1 transition
     - If Phase 0: Phase 0 cannot proceed until E-03 resolves
   - **Why this is a Strategist clarification, not a governor escalation:** this is a methodology / register-quality issue that the Strategist can resolve without a values choice. The values choice (E-03) is separate.

---

## Blocked Execution Paths (Pass 2)

- **Phase 0 Newsletter MVP launch — BLOCKED (NEW)** until C-3 resolves via either (i) E-03 governor decision OR (ii) Esc-5 Strategist clarification
- **Phase 1 launch (any channel)** — BLOCKED (carried) pending E-01 (separate-brand cost) + G-04 (segment NRS) + E-03 (brand architecture)
- **Editorial recruitment for Borders newsroom** — BLOCKED (carried)
- **Public messaging / pre-announcement** — BLOCKED (carried, **strengthened**) — Pass 2 red-team finding: Newsquest's optimal counter to a free DCT newsletter is a defensive newsletter mirror; pre-launch leakage shortens DCT's solo window from 6+ weeks to <4 weeks
- **Hosting Phase 0 inside an existing P&J/Courier brand** — BLOCKED (NEW) until E-03 governor decision specifies (B) or (C-with-host-confirmed)
- **Carrier / print delivery commitments** — DEFERRED (G-07; importance reduced post-CHALLENGE because print is now an adjacent product)
- **Any solution-led validation test** — FORBIDDEN by Solution Contamination Rule

---

## Tasks Rejected This Pass

| Task | Reason rejected |
|---|---|
| Phase 0 newsletter launch | Triggers C-3 (Sec 5/Sec 7 contradiction); creates G-14 (Phase 0 path-dependency on brand); sequencing-contaminates G-01 if interviews not done first |
| Phase 1 channel activation | Premature; gated on E-01 + G-04 + E-03 |
| Editorial recruitment | Premature |
| Public pre-announcement | Pass 2 red-team strengthens this rejection — Newsquest mirror response is a more dangerous play than the Pass 1 price-drop response |
| Carrier tender for print delivery | G-07 deferred; print now an adjacent product, not in unit |
| Coverage audit Border Telegraph vs P&J | G-10 deferred |
| DCT brand-awareness survey in Borders | G-11 deferred — but importance contingent on E-03 outcome (rises if (B) chosen) |

---

## Re-run trigger

Gap Definer should re-run when ANY of:
- Any governor response arrives (G-02, G-03, E-03, Esc-3, Esc-4)
- Strategist responds to Esc-5 (C-3 resolution path)
- Any Action 1-3 produces evidence (interim signal)
- A kill signal observed in the field
- 2026-05-15 (G-04 deadline) — re-run on segment data to update Section 2 confidence
- 2026-06-30 (planned next CHALLENGE pass)

---

## Items requiring governor or Strategist action this week

| Item | Decider | By when | Status |
|---|---|---|---|
| E-01 platform cost (separate-brand path) | Governor | 2026-05-08 | OPEN — overdue-imminent |
| E-02 overhead allocation | Governor | 2026-05-08 | OPEN — overdue-imminent |
| Esc-3 Phase 0 budget authorisation | Governor | ASAP — blocks G-01 and G-06 | OPEN — no response since 2026-04-24 |
| G-04 NRS pull owner assignment | DCT (does not need budget) | 2026-05-08 | TBD |
| Esc-5 C-3 resolution path | Strategist | ASAP — blocks Phase 0 design work | OPEN — NEW |
| E-03 brand architecture decision | Governor | ~2026-06-15 | OPEN — NEW |
