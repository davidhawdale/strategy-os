# Gap Definer Action Queue

**From:** gap-definer
**Date:** 2026-04-24
**Pass:** Initial (post Strategist BUILD)
**Sell Ready:** false
**Scale Ready:** false
**Decision:** CONDITIONAL_GO

---

## Top 3 Actions (Validation Sequence — Phase 0)

### Action 1 — G-01: Borders resident interviews

- **Type:** INTERVIEW
- **Reduces gap:** G-01 (Final Priority 21) and G-06 (Final Priority 21, secondary)
- **Description:** Conduct 10-15 structured Borders resident interviews. Sampling: across at least 4 of 11 main towns including one rural-only postcode; across age cohorts (40-50, 51-65, 66+); mix of current Border Telegraph / Southern Reporter subscribers, lapsed subscribers, and never-subscribers.
- **Mandatory script structure:**
  1. Current local-news consumption (open-ended; no leading)
  2. Felt gaps in current consumption (problem-led probe)
  3. Hypothetical: cadence elasticity (do you want news daily / weekly / less often, and why)
  4. Hypothetical: WTP probe (what would make you pay £4.99/mo for a daily product)
  5. ONLY in the tail: introduce DCT product clauses for recognition probe (supports G-06)
- **Solution Contamination Rule applies:** if the script introduces the product or pricing before establishing problem-felt-pain, the test is invalid.
- **Expected output:** Interview-evidence summary mapped to Section 1 Desired State thresholds (≥5/5 felt deficit; ≥2 weekly subscribers WTP £4.99-£5.99/mo) and to the Section 1 kill condition (<3/10 felt deficit AND <2/10 WTP — would mark BROKEN).
- **Evidence target:** T1 (CONVERSATION ground truth)
- **Owner:** TBD (Strategist or external research operator)
- **Deadline:** 2026-06-23

### Action 2 — G-06: Pre-launch landing-page test

- **Type:** EXPERIMENT
- **Reduces gap:** G-06 (Final Priority 21)
- **Description:** Build a pre-launch landing page for "Borders Journal" containing: the proposition headline, 3 sample (illustrative) story summaries across council/court/sport, and a pricing offer. Drive c.2,000 paid clicks via Facebook to TD postcodes. Split A/B between £4.99/mo and £2.99/mo (annual price-pressure red-team simulation). Measure email-capture / "notify me at launch" intent rate.
- **Pair with G-01 interview tail:** identical clause-recognition probes asked across both methods to triangulate.
- **Expected output:** Quantitative intent-rate per price point (pass threshold >5%; kill threshold <2%); clause-level recognition signal.
- **Evidence target:** T1 (BEHAVIOURAL for intent; CONVERSATION for clauses)
- **Owner:** TBD
- **Deadline:** 2026-06-23

### Action 3 — G-04: Segment-size data pull

- **Type:** RESEARCH
- **Reduces gap:** G-04 (Final Priority 18)
- **Description:** Pull NRS Households and Dwellings 2024 dataset for Scottish Borders council area. Cross-reference Ofcom Connected Nations 2025 Borders fixed-broadband coverage by output area. Cross-reference Project Gigabit programme coverage map. Compute the 50+/broadband-served household population precisely. Compare against the 25-35k assumption and the 15k floor (Section 2 kill condition).
- **Why immediate:** This is desk research, not gated on field interviews; it is an ignored kill-signal currently in the register.
- **Expected output:** Single-page tabulation with NRS + Ofcom + Project Gigabit triangulation; pass/fail vs Section 2 kill condition.
- **Evidence target:** T1 (official statistical data)
- **Owner:** TBD
- **Deadline:** 2026-05-15 (faster turnaround possible — desk work)

---

## Governor Escalations (Awaiting Response)

### From queue file 2026-04-24-strategist-escalations.md

1. **Escalation 1 — Platform marginal cost** (G-02) — requested response by **2026-05-08**
   - Without this, architecture-dependent execution remains blocked
2. **Escalation 2 — Overhead allocation policy** (G-03) — requested response by **2026-05-08**
   - Without this, Section 3 unit economics cannot be promoted

### NEW from this Gap Definer pass

3. **Escalation 3 — Phase 0 validation budget authorisation** (£8-15k) — see gap-analysis.md §9
4. **Escalation 4 — Decision deadline confirmation** — see gap-analysis.md §9

---

## Blocked Execution Paths

- **Phase 1 launch (any channel):** BLOCKED until Escalation 1 (platform cost) resolved AND G-04 (segment NRS data) confirms segment >= 15k HH
- **Editorial recruitment for Borders newsroom:** BLOCKED until validation outcome confirms proceed
- **Public messaging / pre-announcement:** BLOCKED — leakage triggers Newsquest red-team response chain (Border Telegraph price drop + channel inventory buyout) before DCT has validation evidence
- **Carrier / print delivery commitments:** DEFERRED (G-07) — do not commit pre-validation
- **Any solution-led validation test:** FORBIDDEN by Solution Contamination Rule

---

## Tasks Rejected This Pass

| Task | Reason rejected |
|---|---|
| Carrier tender for print delivery | G-07 deferred; not top-3 |
| Coverage audit Border Telegraph vs P&J | G-10 deferred; not top-3 |
| DCT brand-awareness survey in Borders | G-11 deferred; lower priority than felt-pain validation |
| Phase 1 channel activation | Premature; gated on validation + Escalation 1 |

---

## Re-run trigger

Gap Definer should re-run when ANY of:
- Both governor escalations (G-02, G-03) resolved
- Any Action 1-3 produces evidence (interim signal)
- A kill signal is observed in the field
- 2026-06-30 (planned CHALLENGE mode pass)
