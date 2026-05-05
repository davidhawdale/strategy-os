# Gap Analysis Register

Created: 2026-04-24
Last Run: 2026-05-05 (Pass 2 — post Strategist CHALLENGE incorporating P&J product briefing T1 evidence)
Source Register Version: 2
Business Mode: ESTABLISHED (BOOTSTRAP-equivalent thresholds)
Sell Ready: false (worsened vs Pass 1 — new contradiction C-3 introduced)
Scale Ready: false

---

## 1. Gate Summary

**Decision:** CONDITIONAL_GO — narrowed.

**Why (Pass 2 update):**
- The CHALLENGE pass produced material improvements at the unit-economic level (corrected pricing, removed phantom print bundle, improved LTV:CAC base case to 6-12x). Strategist's CHALLENGE pass is honest and disciplined; the corrections strengthen the register.
- Three of the four blocking conditions from Pass 1 are unchanged. One (architecture contradiction) is *worse* — the introduction of Phase 0 created a new contradiction (C-3) between Section 5's brand-architecture condition and Section 7's Phase 0 commencement.
- The two-stage MVP introduces new risks the v1 register did not have: newsletter cannibalisation (G-13), Phase 0 path-dependency on brand architecture (G-14), and weaker demand signal from free newsletter than from paid trial (G-15). The first two are deferred but the third is structurally important.
- The new T1 evidence cluster (pj-product-briefing) is a strong observation source but its *interpretation* — that newsletter-first sequencing reduces overall risk — is itself an inference that is not validated by the underlying screenshots. This is the highest-priority new concentration risk.
- **Governor escalations are now overdue-imminent:** E-01 and E-02 (deadline 2026-05-08, 3 days from today) have no recorded response. E-03 (brand architecture, raised today) is new. Esc-3 (Phase 0 budget, raised Pass 1) has no recorded response and now blocks G-01 + G-06 execution.

**Readiness Gate Predicate Check (Pass 2):**
- Problem ≥ RESEARCHED: pass (unchanged)
- Segment ≥ RESEARCHED: pass (unchanged)
- No HIGH-blast unresolved blocker: **fail** (3 escalations now overdue-imminent; 3 active gaps unvalidated; E-03 newly raised; Esc-3 unauthorised)
- No architecture contradiction: **fail (NEW — C-3 introduced)**

**Current Constraint Summary:**
- Phase 1 launch BLOCKED (carried from Pass 1)
- **Phase 0 launch BLOCKED (NEW this pass)** until C-3 (architecture vs GTM contradiction) is resolved by either E-03 governor decision OR Strategist clarification (Esc-5)
- Section 3 unit economics modestly improved at the level of the model; not yet promotable to SUPPORTED
- Pessimistic scenario in Section 3 still kills (unchanged)
- Three CONCENTRATED evidence sources (WAN-IFRA, Press Gazette/Newsquest, **NEW: pj-product-briefing source**)

---

## 2. Gap Scoring Rules

```text
Gap Score =
Confidence Gap +
Evidence Weakness +
Pain Uncertainty +
Time Penalty

Final Priority = Gap Score x Blast Radius
```

**Scale Definitions**
- Confidence Gap: 3 unvalidated→supported, 2 researched→supported, 1 partial, 0 none
- Evidence Weakness: 3 only T3, 2 mostly T2, 1 mixed T1/T2 thin, 0 enough T1
- Pain Uncertainty: 3 unclear, 2 partial, 1 mostly clear, 0 clear
- Time Penalty: 2 exceeded, 1 due/near, 0 within
- Blast Radius Weight: 3 strategy collapse, 2 hypothesis change, 1 local

---

## 3. Ranked Gaps (Pass 2)

| Rank | Gap ID | Target | Dimension | Desired Condition | Current Observation | CG | EW | PU | TP | BW | Final | Recommended Action | Status | Δ from Pass 1 |
|---|---|---|---|---|---|---:|---:|---:|---:|---:|---:|---|---|---|
| 1 | G-04 | SEGMENT | SEGMENT_CLARITY | NRS data confirms 25-35k Borders HH fit 50+/broadband profile | Pull not done; deadline now 10 days | 2 | 2 | 2 | **1** | 3 | **21** | RESEARCH (NRS / Ofcom / Project Gigabit pull) — **most urgent by deadline** | OPEN | Score 18 → 21 (TP rose; deadline 2026-05-15) |
| 1= | G-01 | PROBLEM | PAIN_CLARITY | n≥10 Borders residents describe felt deficit; n≥2 weekly subscribers WTP £4.99-£5.99 | Structural signals only; CHALLENGE-extended kill condition (newsletter pivot) also untested | 2 | 2 | 3 | 0 | 3 | **21** | INTERVIEW (10-15 residents, problem-led, **now extended with newsletter-pivot probe**) | OPEN | Score unchanged; script extended |
| 1= | G-06 | VALUE_PROPOSITION | VALUE_PROP_VALIDITY | n≥4 of 6 VP clauses validated; landing page intent >5% at advertised pricing **AND format-configuration test resolves between (free newsletter / paid daily / paid section in existing brand)** | All buyer-side clauses untested; landing page does not exist; CHALLENGE-extended assumption now requires 3-cell test, not 2-cell | 2 | 3 | 2 | 0 | 3 | **21** | EXPERIMENT (landing-page test, **now 3-cell configuration test**, paired with G-01 interview tail) | OPEN | Score unchanged; test design expanded |
| — | G-02 | UNIT_ECONOMICS | GOVERNOR_DECISION_REQUIRED | DCT confirms separate-brand platform marginal cost | ESCALATED Pass 1; deadline 2026-05-08 (3 days) | 3 | 2 | 0 | **1** | 3 | **21** | ESCALATION (in queue; **now URGENT**) | ESCALATED | Score 18 → 21 (TP rose; narrowed scope to separate-brand pathway) |
| — | G-03 | UNIT_ECONOMICS | GOVERNOR_DECISION_REQUIRED | DCT confirms overhead allocation policy | ESCALATED Pass 1; deadline 2026-05-08 (3 days) | 3 | 2 | 0 | **1** | 3 | **21** | ESCALATION (in queue; **now URGENT**) | ESCALATED | Score 18 → 21 (TP rose) |
| — | G-16 | GROWTH_ARCH / SOLUTION / GTM | GOVERNOR_DECISION_REQUIRED (NEW) | Brand architecture decision: separate Borders brand vs section in existing brand vs sequenced | ESCALATED today (E-03); deadline ~2026-06-15 (41 days) | 3 | 3 | 0 | 1 | 3 | **21** | ESCALATION (in queue) | ESCALATED | NEW |
| 4 | G-05 | UNIT_ECONOMICS | ECONOMIC_VIABILITY | Behavioural CAC <£30 across ≥2 channels; trial-to-paid >15% | Modelled only | 2 | 2 | 1 | 0 | 3 | 15 | EXPERIMENT (deferred to Phase 1) | DEFERRED | Unchanged |
| 5 | G-14 | SOLUTION / GTM | GTM_FEASIBILITY (NEW) | Phase 0 brand-neutral execution path designed AND path-dependency cost <£15k OR brand decision made before Phase 0 | Strategist preferred (C) deferral; brand-neutral Phase 0 execution not designed; cost unmodelled | 2 | 2 | 2 | 0 | 2 | **12** | RESEARCH (Phase 0 brand-neutral design spec) — **deferred until E-03 resolves** | DEFERRED | NEW |
| 5= | G-15 | SOLUTION / GTM | EVIDENCE_STRENGTH (NEW) | Phase 0 design includes a paid-trial test cell (10-20% of budget) so newsletter signup volume is triangulated against paid demand within Phase 0 itself | Phase 0 design measures newsletter engagement only; paid-demand signal deferred to Phase 1 (post-commitment) | 2 | 2 | 2 | 0 | 2 | **12** | SOLUTION_REDESIGN (insert paid-trial cell into Phase 0; ~£2-4k of Phase 0 budget) | DEFERRED | NEW |
| 6 | G-08 | UNIT_ECONOMICS | ECONOMIC_VIABILITY | Annual churn observed 18-30% in cohort tracking | T3 assumption | 2 | 3 | 1 | 0 | 2 | 12 | EXPERIMENT (deferred to post-launch) | DEFERRED | Unchanged |
| 7 | G-13 | SOLUTION | SOLUTION_ADEQUACY (NEW) | Newsletter cannibalisation kill threshold defined AND tested | Failure mode flagged by Strategist; no kill threshold specified | 2 | 2 | 1 | 0 | 2 | 10 | Flag back to Strategist: define cannibalisation kill condition for Phase 0 | DEFERRED | NEW (subsumed into G-06 test design + Strategist flag) |
| 8 | G-07 | UNIT_ECONOMICS | ECONOMIC_VIABILITY | Print delivery quotes ≤80p/copy with carrier coverage | Modelled only; **print is now an adjacent product, not part of the digital unit** | 1 | 2 | 1 | 0 | 2 | 8 | RESEARCH (carrier tender) — DEFERRED; less urgent post-CHALLENGE because print is no longer in unit | DEFERRED | Unchanged score; importance reduced |
| 8= | G-09 | SEGMENT | SEGMENT_CLARITY | Per-town acquisition CAC measured | Model assumes evenly distributable | 1 | 2 | 1 | 0 | 2 | 8 | EXPERIMENT (deferred to Phase 1) | DEFERRED | Unchanged |
| 8= | G-11 | VALUE_PROPOSITION | VALUE_PROP_VALIDITY | Borders brand-awareness shows DCT/P&J/Courier recognition sufficient OR sub-brand validated | Untested | 1 | 2 | 1 | 0 | 2 | 8 | RESEARCH (small fast survey) — DEFERRED. **Note:** if E-03 resolves to (B) section in existing brand, this gap becomes much higher priority. | DEFERRED | Importance contingent on E-03 |
| 9 | G-10 | PROBLEM | EVIDENCE_STRENGTH | Coverage audit Border Telegraph + Southern Reporter vs P&J | Asserted; no audit | 1 | 2 | 1 | 0 | 1 | 4 | RESEARCH (desk audit) — DEFERRED | DEFERRED | Unchanged |
| 10 | G-12 | SOLUTION / GROWTH_ARCH / GTM | EVIDENCE_STRENGTH | Sections 5-7 have explicit Desired State / Current State blocks AND Section 6 has a paid-MVP kill condition | Strategist did NOT add these in CHALLENGE pass. Carried from Pass 1. | 1 | 2 | 0 | 0 | 1 | 3 | Flag to Strategist: still missing after CHALLENGE; address in next BUILD/CHALLENGE pass | DEFERRED | Unchanged (Strategist did not address) |

**Tie-break for top 3 active:** Three-way tie at Final Priority 21 across G-04, G-01, G-06.
- BW: all 3
- CG: all 2
- Alphabetical / deadline: G-04 has the nearest deadline (10 days vs 49 days for G-01 and G-06), so G-04 leads the queue by deadline-urgency convention even though strict tie-break rule would otherwise alphabetise.

**Active gaps (Focus Rule cap = 3):** G-04, G-01, G-06.
**Governor escalations (tracked separately):** G-02, G-03, G-16/E-03, Esc-3, Esc-4 (carried), and Esc-5 (NEW — Strategist clarification on C-3).

---

## 4. Full Gap Records (changes from Pass 1 only — see Pass 1 record for unchanged gaps)

### Gap: G-04 (UPDATED)

- **Target:** SEGMENT
- **Dimension:** SEGMENT_CLARITY
- **Desired Condition:** NRS data confirms 25-35k Borders households fit 50+/broadband profile; this also tests where Borders falls in DCT's revealed-preference threshold band (Moray ~95k newsletter-only ↔ NE Scotland ~260k+ paid title)
- **Current Observation:** Pull not done. CHALLENGE pass elevated urgency: Borders (~117k) sits in the borderline band where the *form of product* (paid title vs newsletter) is genuinely undetermined. If addressable HH segment is closer to 15k than 30k, the strategy converges on the newsletter-inside-existing-title pattern observed in Moray/Inverness/Oban.
- **Confidence Gap:** 2
- **Evidence Weakness:** 2
- **Pain Uncertainty:** 2
- **Time Penalty:** 1 (deadline 2026-05-15, 10 days)
- **Blast Radius Weight:** 3
- **Final Priority Score:** 21 (rose from 18)

**Recommended Action**
- Type: RESEARCH
- Description: Pull NRS Households and Dwellings 2024 dataset for Scottish Borders council area. Cross-reference Ofcom Connected Nations 2025 Borders data (fixed broadband by output area). Cross-reference Project Gigabit programme coverage. Compute the 50+/broadband-served household population. Compare against (a) the 25-35k modelled assumption, (b) the 15k Section 2 kill floor, (c) the DCT revealed-preference newsletter-vs-paid threshold band (~95k vs ~260k pop). **Output additionally:** a triangulated assessment of whether Borders (~117k pop) sits closer to the newsletter-only side or the paid-title side of the threshold.
- Expected Output: Single-page tabulation; pass/fail vs Section 2 kill condition; explicit calibration against DCT's observed threshold band.
- Evidence Target: T1 (official statistical data)
- Owner: TBD — assignment urgent; should be executable without Esc-3 budget authorisation (desk research within DCT analyst capacity)

**Decision Rule Triggered:** Priority Rule, Deadline Rule (urgent), Kill Rule (audit), Architecture Validity Rule

**Status:** OPEN — URGENT

---

### Gap: G-01 (UPDATED — script extension only)

- **Target:** PROBLEM
- **Dimension:** PAIN_CLARITY
- **Desired Condition:** n≥10 Borders residents describe felt deficit; n≥2 weekly-title subscribers WTP £4.99-£5.99 for daily-cadence DCT product; **CHALLENGE-extended:** interview probe also tests whether residents prefer free DCT-branded Borders newsletter, paid daily product, or paid section in existing brand
- **Current Observation:** Same as Pass 1 — no field evidence. CHALLENGE-extended kill condition (newsletter pivot resolves the problem) makes the interview script load-bearing on the form-of-product question, not just the existence-of-pain question.
- **Confidence Gap:** 2
- **Evidence Weakness:** 2
- **Pain Uncertainty:** 3
- **Time Penalty:** 0
- **Blast Radius Weight:** 3
- **Final Priority Score:** 21

**Recommended Action**
- Type: INTERVIEW
- Description: Same as Pass 1 sampling spec (10-15 residents, ≥4 of 11 towns + 1 rural-only postcode, age cohorts 40-50/51-65/66+, mix of subscriber/lapsed/never). Script structure unchanged in stages 1-4. **Stage 5 extended:** introduce three product configurations sequentially — (a) free Borders weekly newsletter from DCT; (b) paid daily Borders product at £7.99/mo; (c) paid Borders section/topic within an existing P&J or Courier subscription at the existing P&J Web Pack £8.99/mo. Probe preference and stated WTP for each. **Solution Contamination Rule binds:** stages 1-4 must complete before any product configuration is mentioned; the configuration test is in the tail, after problem-felt-pain has been established.
- Expected Output: Interview-evidence summary mapped to Section 1 desired state thresholds AND to the CHALLENGE-extended kill condition (does the newsletter form satisfy the gap?); resolves the form-of-product question that E-03 cannot resolve from desk analysis alone.
- Evidence Target: T1 (CONVERSATION ground truth)
- Sequencing constraint (NEW): G-01 interviews must complete BEFORE any Phase 0 newsletter launches. If Phase 0 launches first, residents are exposed to a DCT Borders product and the interview test becomes solution-contaminated.

**Decision Rule Triggered:** Priority Rule, Solution Contamination Rule, Readiness Gate Rule

**Status:** OPEN — gated on Esc-3 budget authorisation

---

### Gap: G-06 (UPDATED — test design expanded from 2-cell to 3-cell)

- **Target:** VALUE_PROPOSITION
- **Dimension:** VALUE_PROP_VALIDITY
- **Desired Condition:** Resident interviews validate ≥4 of 6 VP clauses; pre-launch landing page test produces signup intent >5% at the *winning* configuration (rather than at a fixed price point — the winning config is itself an output of the test)
- **Current Observation:** Same as Pass 1 plus: CHALLENGE-extended assumption requires test of 3 product configurations (newsletter / paid daily / paid section), not 2 price points. The Pass 1 spec is now under-specified.
- **Confidence Gap:** 2
- **Evidence Weakness:** 3
- **Pain Uncertainty:** 2
- **Time Penalty:** 0
- **Blast Radius Weight:** 3
- **Final Priority Score:** 21

**Recommended Action**
- Type: EXPERIMENT (paired with INTERVIEW)
- Description: Build *three* pre-launch landing pages, not one:
  - Page A: free Borders weekly newsletter from "Borders Bulletin powered by The Press & Journal" (or equivalent — sender brand identity is itself a small test variable)
  - Page B: "The Borders Journal" (separate brand) — paid daily Borders product at £7.99/mo (with annual option)
  - Page C: "Borders coverage" within an existing P&J subscription — pricing reverts to existing P&J Web Pack £8.99/mo, presented as expanded coverage
  - Each page contains the proposition, 3 sample (illustrative) story summaries across council/court/sport, and a clear next-step CTA. Drive c.2,500-3,000 paid Facebook clicks split equally across the three pages, targeted to TD postcodes 50+. Measure: email-capture rate, click-through to "subscribe / sign up", explicit intent ("notify me at launch"); per-page differential.
- Expected Output: Quantitative intent rate per configuration, allowing comparison of (a) free vs paid demand, (b) separate-brand vs section-in-existing-brand, (c) interaction effect with E-03 brand-architecture decision. Triangulates E-03 with behavioural data the desk-only escalation cannot produce.
- Evidence Target: T1 (BEHAVIOURAL for intent rate; CONVERSATION for clauses via interview tail)
- Cost implication: G-06 expanded scope adds c.£1-2k to the Phase 0 validation budget already in Esc-3 (£8-15k → £9-17k).

**Decision Rule Triggered:** Priority Rule, Solution Contamination Rule

**Status:** OPEN — gated on Esc-3 budget authorisation

---

### Gap: G-02 (UPDATED — narrowed scope; deadline urgent)

- **Target:** UNIT_ECONOMICS / ARCHITECTURE
- **Dimension:** GOVERNOR_DECISION_REQUIRED
- **Desired Condition:** DCT internal CTO confirms whether standing up a *separate* Borders brand (own masthead, own subscription product, possibly own Pugpig instance) is marginal cost or material build (£200k+)
- **Scope change (CHALLENGE):** The "Borders-as-locale-within-existing-brand" path is partially resolved by T1 evidence (multi-locale app capability). G-02 now concerns *only* the separate-brand pathway.
- **Current Observation:** Awaiting governor; deadline 2026-05-08 (3 days). Strategist's E-01 status update notes that the question should be re-scoped to the separate-brand path specifically.
- **Final Priority Score:** 21 (rose from 18; TP=1)
- **Recommended Action:** ESCALATION (already in queue) — **URGENT, deadline imminent**. Status: OPEN

---

### Gap: G-03 (UPDATED — deadline urgent)

- Unchanged scope. Deadline 2026-05-08 (3 days). TP rose to 1; Final Priority 21.
- Status: ESCALATED — URGENT

---

### Gap: G-16 (NEW — tracked as governor escalation E-03)

- **Target:** GROWTH_ARCH / SOLUTION / GTM
- **Dimension:** GOVERNOR_DECISION_REQUIRED
- **Desired Condition:** Governor decides between (A) separate Borders brand, (B) section within existing P&J/Courier, (C) sequenced — Phase 0 inside existing brand, brand decision deferred until Phase 0 data
- **Current Observation:** Strategist raised E-03 today (2026-05-05); preference (C) on optionality grounds, flagged as values decision
- **Confidence Gap:** 3 (no decision)
- **Evidence Weakness:** 3 (decision is values-driven; no evidence will fully resolve it)
- **Pain Uncertainty:** 0
- **Time Penalty:** 1 (deadline ~2026-06-15)
- **Blast Radius Weight:** 3 (cascades through Sec 3, 4, 5, 6, 7)
- **Final Priority Score:** 21
- **Recommended Action:** ESCALATION — see queue file 2026-05-05-strategist-escalations.md and §9 of this document
- **Status:** ESCALATED (NEW this pass)

---

### Gap: G-13 (NEW — newsletter cannibalisation)

- **Target:** SOLUTION (Stage 2 paid MVP)
- **Dimension:** SOLUTION_ADEQUACY
- **Desired Condition:** Phase 0 newsletter design includes a kill threshold for cannibalisation (e.g. "if newsletter-list-to-paid conversion <X% at Phase 1 month 3, the cannibalisation hypothesis is confirmed and the strategy must pivot")
- **Current Observation:** Strategist flagged cannibalisation as a new failure mode but did not specify a threshold. Section 7 has "newsletter-list-to-paid <3% triggers re-examination" — this is a re-examination trigger, not a kill threshold for the cannibalisation hypothesis.
- **Final Priority Score:** 10 (DEFERRED but flagged)
- **Recommended Action:** Flag back to Strategist: define cannibalisation kill condition for the Phase 0 design BEFORE Phase 0 launches. Without a threshold the failure mode cannot be operationally tested.

---

### Gap: G-14 (NEW — Phase 0 path-dependency on brand)

- **Target:** GTM (Phase 0 design)
- **Dimension:** GTM_FEASIBILITY
- **Desired Condition:** Phase 0 either (a) executed brand-neutrally so it preserves all three E-03 options as open at Phase 1 transition, OR (b) executed inside a chosen host brand because E-03 has been resolved to (B) or (C-with-host-confirmed)
- **Current Observation:** Strategist proposes Phase 0 commences before E-03 resolves. This is internally inconsistent with Section 5's required condition "Brand-architecture decision made before Phase 1" if Phase 0 commits to a host brand. Path-dependency cost unmodelled.
- **Final Priority Score:** 12 (DEFERRED until E-03 resolves)
- **Recommended Action:** Constraint inversion identified that brand-neutral Phase 0 contradicts the cost-minimisation logic of hosting Phase 0 inside an existing brand. Strategist should design a brand-neutral Phase 0 spec that preserves all three E-03 options, OR governor must resolve E-03 before Phase 0.

---

### Gap: G-15 (NEW — newsletter signal weakness)

- **Target:** GTM (Phase 0 design)
- **Dimension:** EVIDENCE_STRENGTH
- **Desired Condition:** Phase 0 includes a paid-trial test cell so willingness-to-pay is measured *within* Phase 0 (rather than only after Phase 1 commitment is sunk)
- **Current Observation:** Phase 0 exit gates are signup volume, CAC, open rate, town distribution — all newsletter-engagement metrics. None directly measure paid demand. The single direct paid-demand metric (newsletter-list-to-paid conversion) only becomes measurable in Phase 1.
- **Final Priority Score:** 12 (DEFERRED until Phase 0 design is reconsidered)
- **Recommended Action:** SOLUTION_REDESIGN — insert a paid-trial test cell into Phase 0 (~£2-4k of £8-15k budget). Specifically: a fourth Facebook test cell driving traffic to a "£1 first month, £7.99/mo thereafter" trial signup page, in parallel with the newsletter capture. Provides a concurrent paid-demand signal in Phase 0 that the newsletter test does not produce.
- Note: Subsumes part of G-06 already (the 3-cell landing-page test does produce intent data; G-15 specifically asks for *behavioural commitment* via an actual trial signup, which is a stronger signal than landing-page intent).

---

## 5. Contradictions

| Contradiction ID | Between | Description | Impact | Required Resolution | Block Execution? |
|---|---|---|---|---|---|
| C-1 | Methodology vs Sections 5-7 | Sections 5, 6, 7 lack explicit Desired State / Current State blocks. Carried from Pass 1; Strategist did NOT address in CHALLENGE pass. | LOW | Strategist to add in next pass | No |
| C-2 | Section 3 base vs pessimistic | Routed via E-02 | MEDIUM | Resolved by E-02 governor response | No |
| C-3 (NEW) | Section 5 vs Section 7 | Section 5 lists "Brand-architecture decision made before Phase 1" as a required architecture condition. Section 7 has Phase 0 commencing months -3 to 0, BEFORE the brand decision. If Phase 0 hosts inside an existing brand, the brand decision is *de facto* made by Phase 0 execution; the architecture condition is therefore violated by the GTM plan. | MEDIUM | Either (i) E-03 governor decision resolves the brand choice before Phase 0; or (ii) Strategist clarifies that the Section 5 condition binds at Phase 1 not Phase 0, AND adds a brand-neutral Phase 0 design spec that preserves E-03 optionality. Tracked as Esc-5 (Strategist clarification, not governor escalation). | **YES** — Phase 0 launch BLOCKED until C-3 resolves |
| C-4 (NEW) | Section 6 vs Section 4 | Section 6 feature map still lists "Print bundle" as a downgraded-but-present feature. Section 4 differentiator clauses make no reference to a print bundle. T1 correction removed bundle from the unit; Section 6 feature-map row is residual. | LOW | Cosmetic — Strategist remove the row in next pass | No |

---

## 6. Destruction Outcomes (Pass 2 — full re-run)

### Pre-Mortem (12-month failure scenario, two-stage MVP)

The dominant failure chain shifts under the two-stage model. New failure scenario:

1. **Month 0-2 (Phase 0 launch):** Borders newsletter launches via Facebook capture + print insert + SEO seeding. Signups exceed 1,500 within 6 weeks at £6 CPS; open rate 38%; per-town distribution covers 9 of 11 towns. Phase 0 exit gates appear comfortably met.
2. **Month 3-4 (the deceptive signal):** Strategist and Governor read the Phase 0 numbers as validation. Phase 1 paid product greenlit. Editorial team scales to 4-5 FTE; paid product launches at £7.99/mo Web tier.
3. **Month 5-7 (cannibalisation reveal):** Newsletter-list-to-paid trial conversion lands at 4-6% (above the 3% kill criterion but well below the 8% target). The subscribers who signed up "because it was free" are predominantly the cohort that does not convert at price. Other channels deliver planned CAC at lower volume than projected.
4. **Month 8-9 (Newsquest's deeper response):** Newsquest, with 6 months to prepare instead of 0-3, executes a sophisticated counter — drops Border Telegraph to £2.99 *plus* launches a free Border Telegraph weekly newsletter mirror to defend against the captured-but-unconverted DCT readers. DCT trial-to-paid drops to 8-9%. Paying subs at month 9: 700-900 against the >900 floor.
5. **Month 10-12 (brand-architecture trap):** If Phase 0 was hosted inside the existing P&J brand (Strategist's recommended (C) configuration), the captured Borders newsletter list is attached to the P&J brand. A standalone Borders Journal launch loses or has to re-permission the list. The Phase 0 asset is partially stranded by the deferred brand decision.

**Dominant causal factors (NEW):**
- **Free-to-paid bridge weakness** (G-13/G-15): Phase 0 measures newsletter performance, not paid demand.
- **Path-dependency** (G-14): deferred brand decision creates Phase 0 / Phase 1 asset friction.
- **Extended Newsquest response window**: Phase 0 + Phase 1 sequencing gives Newsquest 6-9 months reaction time vs the 90-day window modelled in Pass 1.

**What is missed in CHALLENGE-revised register:** The Phase 0 exit gates measure engagement, not WTP. The single direct WTP metric (newsletter-to-paid conversion) only becomes available *after* Phase 1 commitment is sunk. Phase 0 produces high-confidence data on the wrong question.

### Red-Team (Newsquest 90-day response — newsletter-first scenario)

- **Week 0-4:** Initially under-react. Free DCT newsletter is not an immediate competitive threat to a paid Border Telegraph subscription. **This is the strongest argument for the newsletter-first sequence — but only true for the first 6-8 weeks.**
- **Week 4-12:** As Borders newsletter signups cross 1,000+, Newsquest recognises the play. Response window opens.
- **Month 3-4:** Newsquest launches its own free Border Telegraph weekly newsletter — defensive imitation. Marginal cost c.£10-20k. **DCT loses the newsletter format as a unique offering.**
- **Month 4-6:** Both newsletters compete for TD-postcode Facebook acquisition inventory. CPS rises £6 → £10-12. DCT's Phase 0 CAC ceiling of £8 breached. Phase 0 exit gates missed on second-order test.
- **Month 6-9 (DCT launches paid product):** Newsquest, having had 6 months to prepare, executes a deeper response: Border Telegraph at £2.99 + free Border Telegraph daily newsletter (defensive cadence match) + targeted Facebook retargeting against captured DCT newsletter audience.

**Strategy impact (NEW):** The newsletter-first strategy *invites* a longer Newsquest response window and gives Newsquest the asymmetric advantage of imitating the cheaper play before DCT can launch the more expensive play. The Pass 1 red-team identified Newsquest's price drop as the dominant response; Pass 2 identifies *Newsquest free newsletter mirror* as a new and arguably more damaging response, available only because the two-stage sequence creates the time-window.

### Constraint Inversions (Pass 2 — re-run on updated assumption set)

| Assumption | Inversion | Consequence | Survival |
|---|---|---|---|
| Web Pack ARPU c.£7.99-£8.99/mo holds in Borders (Sec 3 T1-anchored) | Borders cannot hold above £4.99 (Border Telegraph anchor) | ARPU £75 → c.£55; LTV:CAC base falls 8x → 5-6x; payback 5mo → 7-9mo | WITH_MODIFICATION (revise Sec 3 scenarios; ePaper upsell becomes the ARPU lever) |
| Multi-locale platform supports adding Borders as topic at marginal cost (Sec 5 NEW T2) | Adding 10th locale needs editorial-CMS work DCT has not done in this configuration; £30-60k integration | Phase 0 cost envelope (£8-15k) breached; Phase 0 timeline slips 2-3 months | WITH_MODIFICATION (extend Phase 0 budget OR use email-only newsletter without app/web integration; latter weakens the asset built in Phase 0) |
| Phase 0 newsletter ≥1,500 signups in 6 weeks at CAC <£8 indicates paid-product demand (Sec 6/7 NEW T2) | Newsletter signup volume uncorrelated with paid demand; ≥1,500 free signups → 4% paid conversion (60 trials), not 12% (180 trials) | Phase 0 succeeds on its own metrics; Phase 1 fails because newsletter-list does not deliver expected paid base | WITH_MODIFICATION (Phase 0 must include a paid-trial test cell — see G-15 — to triangulate WTP within Phase 0) |
| Brand architecture deferrable to post-Phase-0 (E-03 option C) | Brand decision is path-dependent on Phase 0 execution choices (host brand, sender identity, app-section vs separate domain) | Phase 0 / Phase 1 transition costs c.£15-30k in re-permissioning + brand re-attribution | WITH_MODIFICATION (option C feasible only if Phase 0 designed brand-neutrally — see G-14 — which contradicts the cost-minimisation logic that argued for hosting inside an existing brand) |
| Borders is in the borderline DCT-revealed-preference band (Sec 2 T1) | Borders converges to newsletter-only outcome; segment too small/dispersed for paid title | Phase 0 succeeds; Phase 1 paid fails; net is a free Borders newsletter at near-zero contribution | NO for paid-product hypothesis; YES for "minimum viable presence" but probably does not justify c.£20-30k Phase 0 + c.£60-120k Phase 1 spend |
| Newsletter-list-to-paid conversion >8% (Sec 7 NEW T3) | Conversion lands 3-5% — within Sec 7 kill but well below target | Phase 1 misses paid-subs floor; KILL not formally triggered but base case fails | NO for base case; would force Phase 2 redesign |
| Pessimistic scenario in Sec 3 still kills (unchanged) | Already kill | n/a | n/a |
| Editorial cost £300-450k/yr 4-6 FTE (Sec 3 unchanged T2) | Two-stage MVP requires 1-2 FTE in Phase 0 + 4-6 in Phase 1; mid-stage scale; recruitment lag | Phase 1 launch slips 2-3 months from recruitment trigger; CAC degrades while editorial scales | WITH_MODIFICATION (specify recruitment lead-time as Phase 0 deliverable: by Phase 0 week 4, Phase 1 recruitment must commence regardless of exit-gate uncertainty) |

**Net update from Pass 1:** Three previously WITH_MODIFICATION assumptions now compound under the two-stage model (Phase 0 cost overrun + brand-architecture path-dependency + recruitment lag). Strategist's Phase 0 design *reduces* unit-economic risk (smaller initial commitment) but *increases* execution-coordination risk (more moving parts across more time). The newsletter-list-to-paid conversion assumption is the linchpin of the two-stage logic and is T3 — completely unvalidated. **This is the central uncertainty CHALLENGE introduced and did not resolve.**

### Evidence Concentration Risk (Pass 2)

| Source | Claims Supported | Risk Level | Required Mitigation |
|---|---|---|---|
| WAN-IFRA Nov 2023 (DCT subs trajectory) | Sec 1, 3, 4 | **CONCENTRATED** (carried) | Triangulate via governor — unchanged |
| Press Gazette / Newsquest 21% court / 20% sport | Sec 1, 2, 4, 6 | **CONCENTRATED** (carried) | Cross-check with alternative regional benchmark — unchanged |
| `research/press-and-journal/pj-product-briefing-2026-05-05.md` (and screenshots) | **All 7 hypothesis/proposal sections** | **STRUCTURALLY CONCENTRATED (NEW)** | Strategist's framing: "logically equivalent to observing DCT's live product directly" — accepted for the screenshot-level *observations*. **Rejected** for the *interpretation* leap from "DCT does newsletters in Moray" to "newsletters are a validated path to paid in Borders". The latter is an inference, not an observation. **Required mitigation:** triangulate the interpretation via (a) DCT internal documentation on the rationale for Moray/Inverness/Oban newsletter-only configuration, (b) DCT internal data on whether those newsletters have produced any paid follow-on (i.e. the Phase 0 → Phase 1 conversion question is testable inside DCT's own portfolio history), (c) governor input on whether the observed pattern is strategic intent or path-dependency. **Without (b) in particular, the two-stage MVP logic is built on the unstated assumption that DCT's existing free newsletters *would* convert if a paid product followed — and there is no evidence in the register that DCT has ever tested this.** Highest-priority concentration risk this pass. |
| Southern Reporter circulation 12,500→3,352 | Sec 1, 2, 4 | OK | None required |
| Scottish Borders Council demographics | Sec 1, 2 | OK | None required |
| Project Gigabit Borders rollout | Sec 1, 2, 5 | OK | None required |
| Press Gazette DCT FY24 financials | Sec 1, 3, 4 | OK | None required |
| Border Telegraph subscribe page | Sec 2, 3, 4 | OK | None required |

**Net concentration finding:** Three CONCENTRATED sources now (was 2). The pj-product-briefing source is the most structurally important because it carries the entire two-stage MVP logic via interpretation, not observation.

### Pass 1 evidence-quality issue (flagged retroactively)

The v1 register included print production/distribution as a unit cost within the digital subscription model. T1 evidence in CHALLENGE pass establishes that the reference product (P&J) sells print separately and has no print+digital bundle. **The Pass 1 destruction did not catch this error**: Pass 1 constraint-inversion table lists "Borders residents pay 3-4x weekly for daily" as the price-related load-bearing assumption, but did not interrogate the bundle-pricing assumption that was structurally wrong. This is a Pass 1 destruction-quality lesson: the destruction protocol should include a "does the model match the reference product" check when one exists, not only first-principles inversions. Logged here for future pass discipline.

### Kill Signal Audit (Pass 2)

| Signal | Observed? | Ignored? | Consequence |
|---|---|---|---|
| Problem kill: <3/10 felt-deficit AND <2/10 WTP £4.99/mo | No (no interviews) | n/a | G-01 |
| Problem kill (extended): residents prefer free DCT newsletter over paid daily | No (no interviews) | n/a | G-01 must test this branch (extended script per CHALLENGE) |
| Segment kill: <3/10 match profile AND <15k HH per NRS | NRS not pulled | **YES (worse than Pass 1)** — Borders is in DCT's revealed-preference borderline band; G-04 is now load-bearing on form-of-product, not just segment-size | G-04 deadline 2026-05-15 |
| Unit Economics kill: CAC>£40 OR conversion<8% OR churn>35% OR subs<1,500 mo18 | No launch | n/a | Cannot pre-audit |
| VP kill: clauses not recognised OR landing page <2% intent | No (no test) | n/a | G-06 (now 3-cell test) |
| Solution Design kill (Phase 0) | NEW criteria added in CHALLENGE: signups <800 OR CPS >£12 OR open rate <25% OR ≤4 towns. Legible. | n/a | OK |
| Solution Design kill (Stage 2 paid MVP) | **STILL MISSING** — Section 6 inherits Sec 3 unit-econ + Sec 7 Phase 1 kill, but no kill at the design level | **YES (carried from Pass 1)** | Flag to Strategist; G-12 |
| GTM Phase 0 kill | Newly added, legible | n/a | OK |
| GTM Phase 1 kill | Strengthened (newsletter-list-to-paid <3% added) | n/a | OK |
| **Newsletter-cannibalisation kill** | **No threshold stated** despite Strategist explicitly flagging the failure mode | **YES (NEW)** | G-13 — flag to Strategist for threshold |
| **Newsletter-as-Newsquest-bait kill** (red-team finding) | Not in register | **YES (NEW)** | If Newsquest launches a defensive newsletter mirror within Phase 0, the Phase 0 strategic logic collapses; needs an "abandon Phase 0 if Newsquest mirrors within X weeks" decision rule |

**Net kill-audit finding:** CHALLENGE pass added Phase 0 kill conditions but did not close the previously-flagged Section 6 paid-MVP kill gap. Two new failure modes (cannibalisation; Newsquest mirror) lack kill thresholds. **Three kill conditions now missing or under-specified.**

---

## 7. Decision Rules Application (Pass 2)

### Priority Rule
- Three-way tie at Final Priority 21 across G-04, G-01, G-06.
- By tie-break (BW=3, CG=2 all): alphabetical → G-01, G-04, G-06.
- **By deadline-urgency convention (G-04 deadline 10 days; others 49 days):** queue places G-04 first within the tier.
- Effective execution priority: G-04 → G-01 → G-06 (with G-01 + G-06 paired in Phase 0 validation).

### Execution Rule
- Valid: G-04 NRS pull (T1, no Esc-3 dependency); G-01 interviews (T1, gated on Esc-3); G-06 3-cell landing-page test (T1, gated on Esc-3).
- Rejected (carried + new):
  - Phase 0 newsletter LAUNCH — REJECTED. Triggers C-3 (architecture/GTM contradiction); creates G-14 path-dependency; sequencing-contaminates G-01 if interviews not done first.
  - Phase 1 launch (any channel) — REJECTED.
  - Editorial recruitment — REJECTED.
  - Public messaging / pre-announcement — REJECTED. **Strengthened by Pass 2 red-team:** Newsquest's optimal counter to a free newsletter is a defensive mirror; pre-launch leakage shortens DCT's solo window from 6+ weeks to <4.
  - Carrier negotiations — DEFERRED (G-07).
  - Solution-led validation — FORBIDDEN.

### Evidence Promotion Rule
- All four hypotheses remain RESEARCHED. No promotion this pass.
- **Confirmed:** Strategist did not improperly promote any hypothesis to SUPPORTED in CHALLENGE. T1 reference-product observations correctly held confidence at RESEARCHED (T1 about *the reference product* does not establish T1 about *the Borders unit*).

### Kill Rule
- No hypothesis or proposal marked BROKEN this pass.
- Pessimistic Section 3 scenario still kills but is modelled, not observed.

### Deadline Rule
- **G-02 deadline 2026-05-08 (3 days):** ESCALATED, awaiting governor. Per error-handling rule, do not re-escalate same decision; report waiting status. **Status: URGENT.**
- **G-03 deadline 2026-05-08 (3 days):** Same. URGENT.
- **G-04 deadline 2026-05-15 (10 days):** OPEN. Not gated on Esc-3 (desk research, do-able by DCT analyst). **Action required: assign owner immediately; confirm by 2026-05-08 whether NRS pull is in progress.**
- **G-01, G-06 deadline 2026-06-23 (49 days):** OPEN, gated on Esc-3 budget authorisation. If Esc-3 not resolved by 2026-05-15, the 2026-06-23 deadline is at risk.
- **E-03 deadline ~2026-06-15 (41 days):** ESCALATED today.
- **No deadline currently EXCEEDED.** No forced disposition.

### Contradiction Rule
- C-1 (LOW): non-blocking; carried.
- C-2 (MEDIUM): routed via E-02; non-blocking.
- **C-3 (MEDIUM, NEW): Phase 0 launch BLOCKED until resolved.** Resolution paths: (i) E-03 governor decision (preferred but external); (ii) Strategist clarifies Section 5 condition binds at Phase 1 not Phase 0 AND adds brand-neutral Phase 0 design (raised as Esc-5 — Strategist clarification, not governor escalation).
- C-4 (LOW): non-blocking; cosmetic.

### Architecture Validity Rule
- Phase 1 launch BLOCKED (carried) — pending G-02 + G-04 + E-03.
- **Phase 0 launch BLOCKED (NEW)** — pending C-3 resolution (i.e. E-03 OR Esc-5).
- Architecture support state: PROPOSED (cannot promote).

### Solution Contamination Rule
- No tests in flight; no current contamination.
- **NEW sequencing constraint:** G-01 interviews must complete BEFORE Phase 0 newsletter launches. Otherwise the interview test becomes solution-led ("do you like our newsletter?") rather than problem-led ("do you have a felt local-news gap?").

### Readiness Gate Rule
- **sell_ready = false** (worsened vs Pass 1 by C-3)
  - Problem ≥ RESEARCHED: pass
  - Segment ≥ RESEARCHED: pass
  - No HIGH-blast unresolved blocker: **fail** (G-02, G-03 escalations imminent; G-01, G-04, G-06 unvalidated; E-03 newly raised; Esc-3 unauthorised)
  - No architecture contradiction: **fail (NEW — C-3)**
- **scale_ready = false** (unchanged)
  - Problem = SUPPORTED: fail
  - Segment = SUPPORTED: fail
  - Unit Economics = SUPPORTED: fail
  - Value Proposition ≥ RESEARCHED: pass
  - sell_ready = true: fail

### Focus Rule
- Active gaps: 3 (G-04, G-01, G-06) — at cap.
- Governor escalations tracked separately: G-02, G-03, G-16/E-03, Esc-3, Esc-4 (carried), Esc-5 (NEW Strategist clarification).

---

## 8. Readiness Handoff

### Approved Actions for Downstream Systems
- **None** for revenue/build execution
- Approved for validation work:
  - G-04 NRS pull (independent of Esc-3 budget; should commence immediately if not already in progress)
  - G-01 interviews (CHALLENGE-extended script with newsletter-pivot probe) — **gated on Esc-3 authorisation**
  - G-06 3-cell landing-page test (extended from Pass 1's 2-cell design) — **gated on Esc-3 authorisation**
  - Awaiting governor responses on G-02, G-03, E-03, Esc-3, Esc-4
  - Awaiting Strategist clarification on Esc-5 (C-3 resolution path)

### Explicitly Forbidden Actions
- **Phase 0 Newsletter MVP launch — BLOCKED until C-3 resolves** (NEW this pass)
- Phase 1 launch in any channel (carried)
- Editorial recruitment (carried)
- Public messaging / pre-announcement — **strengthened by Pass 2 red-team finding** that Newsquest's optimal counter to a free newsletter is a defensive mirror; leakage shortens DCT's solo window
- Carrier negotiations — DEFERRED (G-07)
- Solution-led validation — FORBIDDEN
- Hosting Phase 0 inside an existing P&J or Courier brand without explicit E-03 (B) or (C-with-host-confirmed) governor decision — would violate C-3 and create G-14 path-dependency

### Allowed Constraints (carried forward subject to validation, with CHALLENGE updates)
- Target segment: unchanged (TD1-TD15 50+ broadband-served)
- Pricing bounds (UPDATED): £7.99-£8.99/mo Web tier (anchored on P&J Web Pack, not the £4.99 Border Telegraph competitor floor); £14.99-£21.99/mo Web+ePaper tier; print as separate SKU at ~£610/yr if pursued at all
- Architecture mode: TRADITIONAL subscription (unchanged)
- Offer framing (UPDATED): The "daily" differentiator must specify *daily Borders-specific reporting* (5-7 stories/day from the Borders newsroom), not merely daily delivery cadence
- Two-stage MVP framing: PROVISIONAL — depends on resolution of C-3, G-13, G-14, G-15, and the WTP triangulation question raised in destruction §6
- Channel set: unchanged (Phase 1 not yet authorised)

### Success Signals Downstream Should Return
- Interview evidence confirming felt-pain at Section 1 desired-state thresholds AND interview signal on form-of-product preference (newsletter vs paid daily vs paid section)
- NRS data confirming 25-35k HH or higher in segment AND placing Borders in DCT's revealed-preference band relative to Moray/NE Scotland
- Landing-page intent >5% at the *winning* configuration in the 3-cell test
- Governor confirmation on E-01 (separate-brand platform cost), E-02 (overhead), E-03 (brand architecture), Esc-3 (Phase 0 budget)

### Failure Signals Downstream Should Return Immediately
- Interview signal: <3/10 describe felt deficit (Section 1 kill triggered)
- Interview signal: residents overwhelmingly prefer free newsletter form (Section 1 CHALLENGE-extended kill triggered — paid-product hypothesis breaks even where problem holds)
- NRS data: segment <15k HH (Section 2 kill triggered)
- NRS data: Borders converges to <100k effective addressable population (Borders is below DCT's Moray-equivalent threshold; pivot to newsletter-inside-existing-brand becomes likely)
- Landing-page: free-newsletter cell dominates paid cells by >5x intent (newsletter-as-resolution branch confirmed; paid-product hypothesis weak)
- Governor response: E-01 "material build £200k+" AND E-02 "standalone overhead" — Section 3 base case dies
- Governor response: E-03 (A) separate Borders brand chosen — separate-brand path requires E-01 resolved favourably AND restored Phase 0 design

---

## 9. Governor Escalations (Pass 2)

### Carried from Pass 1 — AWAITING (no governor response recorded; do NOT re-escalate per error-handling rule)

#### Escalation E-01 (G-02) — Marginal cost of platform extension (separate-brand path)
- Decision Type: GROUND_TRUTH
- Blast Radius: HIGH
- Status: OPEN, **deadline 2026-05-08 (3 days), URGENT**
- CHALLENGE update: Now scoped specifically to the separate-brand pathway. Locale-within-existing-brand path is partially resolved by T1 evidence (multi-locale capability per pj-app-onboarding-4.PNG).
- See queue file 2026-04-24-strategist-escalations.md and 2026-05-05-strategist-escalations.md §"Escalations 1 and 2 — status update"

#### Escalation E-02 (G-03) — Central overhead allocation policy
- Decision Type: VALUES + GROUND_TRUTH
- Blast Radius: HIGH
- Status: OPEN, **deadline 2026-05-08 (3 days), URGENT**
- CHALLENGE update: Loses force entirely if E-03 resolves to (B) section in existing brand (no separate P&L). Otherwise unchanged.

#### Escalation Esc-3 — Phase 0 validation budget authorisation
- Decision Type: VALUES (resource allocation)
- Blast Radius: MEDIUM
- Status: OPEN — no deadline set; **now URGENT in effect** because G-01 + G-06 cannot execute without authorisation
- Updated cost envelope: c.£10-17k (was £8-15k; +£1-2k for G-06 expanded 3-cell landing-page test; +£2-4k if G-15 paid-trial cell is incorporated, taking total to c.£12-21k)
- Strategist's CHALLENGE pass effectively endorses Phase 0 as a strategy phase, increasing Esc-3's importance from "validation budget" to "Phase 0 budget" — the same money but explicit as a strategy phase commitment

#### Escalation Esc-4 — Decision-deadline confirmation
- Status: OPEN, no governor response. Continues to operate on system-proposed deadlines.

### NEW from Strategist this pass (carried into queue)

#### Escalation E-03 (G-16) — Brand architecture decision
- Decision Type: VALUES (long-run portfolio strategy + DCT identity question)
- Blast Radius: HIGH (cascades through Sec 3, 4, 5, 6, 7)
- Status: OPEN (raised today, 2026-05-05); **deadline ~2026-06-15** (before Phase 0 commences if Esc-3 approved on implied timeline)
- Options: (A) separate Borders brand; (B) section in existing P&J/Courier; (C) sequenced — Phase 0 inside existing brand, brand decision after data
- Strategist preference: (C) on optionality grounds
- Gap Definer assessment: (C) is feasible only with brand-neutral Phase 0 design (G-14) — which contradicts the cost-minimisation logic that argued for hosting inside existing brand. (C) without brand-neutral Phase 0 = de facto (B) without acknowledging it.
- See queue file 2026-05-05-strategist-escalations.md

### NEW from Gap Definer this pass

#### Escalation Esc-5 — Strategist clarification on C-3 resolution
- Decision Type: STRATEGIST_CLARIFICATION (NOT a governor escalation; this is a back-pass to Strategist)
- Blast Radius: MEDIUM — unblocks Phase 0 design work even before E-03 governor decision
- Decision Needed: Does the Section 5 required condition "Brand-architecture decision made before Phase 1" bind at Phase 0 launch, or only at Phase 1 launch? If the latter, Strategist should add a brand-neutral Phase 0 design spec to Section 6 / Section 7 that preserves all three E-03 options through to Phase 1.
- Why this is back to Strategist not governor: this is a methodology / register-quality clarification, not a values choice. Section 5 said "before Phase 1" but Section 7's Phase 0 functionally pre-commits the brand if hosted inside an existing brand. Strategist can resolve by either (i) confirming Section 5 condition is Phase 1 only and designing Phase 0 brand-neutrally, OR (ii) accepting that Phase 0 is a brand commitment and routing the brand decision through E-03 governor before Phase 0.
- Status: OPEN (NEW this pass)

---

## 10. Next Cycle Plan

**Top 3 actions for next pass (in execution order — by deadline urgency within tied priority)**

1. **G-04 — NRS / Ofcom / Project Gigabit data pull (URGENT, deadline 2026-05-15):** Independent of Esc-3 budget. Assign owner by 2026-05-08; output by 2026-05-15. Output additionally calibrates Borders against DCT's revealed-preference threshold band.
2. **G-01 — Borders resident interviews (extended script):** 10-15 problem-led interviews; CHALLENGE-extended Stage 5 includes 3-configuration probe. **Sequencing constraint:** must complete BEFORE Phase 0 newsletter launches (else solution-contaminates).
3. **G-06 — Pre-launch landing-page test (3-cell configuration):** Three landing pages (free newsletter / paid daily / paid section in existing brand); c.2,500-3,000 paid Facebook clicks split equally; intent rate per cell.

**Expected register changes if successful**
- PROBLEM promotes to SUPPORTED (T1 conversation) OR is BROKEN per kill condition OR pivots per CHALLENGE-extended kill (newsletter form is the resolution)
- SEGMENT promotes with refined size; G-04 specifically tests where Borders falls in DCT's threshold band
- VALUE_PROPOSITION clauses validated/rejected; **the 3-cell landing-page test directly informs E-03 with behavioural data**
- UNIT_ECONOMICS unchanged unless governor responses arrive
- C-3 may resolve via Esc-5 (Strategist clarification) before E-03 governor decision
- sell_ready re-evaluated; potentially flips if all three actions succeed AND escalations return non-killing answers

**Re-run trigger:** Re-run when ANY of:
- Any governor response arrives (G-02, G-03, E-03, Esc-3, Esc-4)
- Strategist responds to Esc-5 (C-3 resolution path)
- Any Action 1-3 produces evidence (interim signal)
- A kill signal observed in the field
- 2026-05-15 (G-04 deadline) — re-run on segment data to update Section 2 confidence
- 2026-06-30 (planned next CHALLENGE mode pass)
