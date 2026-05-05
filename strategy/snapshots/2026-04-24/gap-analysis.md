# Gap Analysis Register

Created: 2026-04-24
Last Run: 2026-04-24
Source Register Version: 1
Business Mode: ESTABLISHED (BOOTSTRAP-equivalent thresholds)
Sell Ready: false
Scale Ready: false

---

## 1. Gate Summary

**Decision:** CONDITIONAL_GO

**Why:**
- The register is structurally sound and the strategy is plausible in base/optimistic, but the pessimistic scenario kills the unit and the margin of safety is thin.
- Three HIGH-blast assumptions (problem felt-pain, value-prop cadence WTP, segment size) are unvalidated at T1 ground-truth level. No execution should commit until at least the segment-size NRS pull and a 10-15 person Borders resident interview round are complete.
- Two HIGH-blast governor escalations (platform marginal cost, overhead allocation) are open. Section 3 cost structure cannot be accepted until both are resolved. Architecture-dependent execution is blocked on Escalation 1.

**Readiness Gate Predicate Check:**
- Problem >= researched: pass (RESEARCHED)
- Segment >= researched: pass (RESEARCHED)
- No HIGH-blast unresolved blocker: **fail** (2 governor escalations + 3 unvalidated HIGH-blast assumptions)
- No architecture contradiction: pass

**Current Constraint Summary:**
- Architecture-dependent execution (Phase 1 launch) BLOCKED pending Escalation 1 resolution and segment-size NRS pull
- Section 3 unit-economics cannot be promoted toward SUPPORTED until both governor escalations resolved
- Pessimistic scenario in Section 3 is uncomfortably close to base case once channel saturation and segment density are honestly modelled (see Pre-Mortem)
- Two evidence sources (WAN-IFRA DCT trajectory; Press Gazette/Newsquest conversion data) are CONCENTRATED — single source carries multiple load-bearing claims

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

## 3. Ranked Gaps

| Rank | Gap ID | Target | Dimension | Desired Condition | Current Observation | CG | EW | PU | TP | BW | Final | Recommended Action | Status |
|---|---|---|---|---|---|---:|---:|---:|---:|---:|---:|---|---|
| 1 | G-01 | PROBLEM | PAIN_CLARITY | n>=10 Borders residents describe absence of daily local news as a felt deficit; n>=2 weekly-title subscribers WTP £4.99-£5.99/mo for daily DCT product | No conversation evidence yet; structural signals only | 2 | 2 | 3 | 0 | 3 | **21** | INTERVIEW: 10-15 Borders residents across age cohorts and 4-5 towns, problem-led script | OPEN |
| 2 | G-06 | VALUE_PROPOSITION | VALUE_PROP_VALIDITY | n>=4 of 6 VP clauses validated as recognisable in interviews; pre-launch landing page achieves >5% intent at advertised pricing | All buyer-side clauses untested; landing page does not exist | 2 | 3 | 2 | 0 | 3 | **21** | EXPERIMENT: Pre-launch landing-page test (paid traffic to a Borders-Journal mock landing page) measuring intent at £4.99 and £2.99 price points | OPEN |
| 3 | G-04 | SEGMENT | SEGMENT_CLARITY | NRS data confirms 25-35k Borders households fit 50+/broadband profile; interviews validate psychographic | Demographic profile derived from council research; psychographic untested; NRS pull not done | 2 | 2 | 2 | 0 | 3 | **18** | RESEARCH: Pull NRS Households 2024 + Ofcom Connected Nations Borders broadband data; cross-reference Project Gigabit coverage; size segment precisely | OPEN |
| — | G-02 | UNIT_ECONOMICS | GOVERNOR_DECISION_REQUIRED | DCT confirms platform marginal-cost extension; no rebuild required | Open in escalation queue 2026-04-24; assumption tagged ESCALATED in register | 3 | 2 | 0 | 1 | 3 | 18 | ESCALATION: Awaiting governor (already in queue) | ESCALATED |
| — | G-03 | UNIT_ECONOMICS | GOVERNOR_DECISION_REQUIRED | DCT confirms overhead allocation policy (marginal vs standalone) | Open in escalation queue 2026-04-24; assumption tagged ESCALATED in register | 3 | 2 | 0 | 1 | 3 | 18 | ESCALATION: Awaiting governor (already in queue) | ESCALATED |
| 4 | G-05 | UNIT_ECONOMICS | ECONOMIC_VIABILITY | Behavioural CAC <£30 across >=2 channels; trial-to-paid >15% | Modelled only; no launch | 2 | 2 | 1 | 0 | 3 | 15 | EXPERIMENT (deferred to Phase 1) | DEFERRED |
| 5 | G-08 | UNIT_ECONOMICS | ECONOMIC_VIABILITY | Annual churn observed 18-30% in cohort tracking | T3 assumption; no data | 2 | 3 | 1 | 0 | 2 | 12 | EXPERIMENT (deferred — requires post-launch cohort data) | DEFERRED |
| 6 | G-07 | UNIT_ECONOMICS | ECONOMIC_VIABILITY | Print delivery quotes confirm 40-80p/copy with carrier coverage of dispersed Borders routes | Modelled from industry benchmarks | 1 | 2 | 1 | 0 | 2 | 8 | RESEARCH: Carrier tender (Royal Mail, Menzies, local newsagent network) for Borders print delivery | DEFERRED |
| 7 | G-09 | SEGMENT | SEGMENT_CLARITY | Per-town acquisition CAC measured; town-bias quantified | Model assumes evenly distributable | 1 | 2 | 1 | 0 | 2 | 8 | EXPERIMENT (deferred to Phase 1 single-town pilot) | DEFERRED |
| 8 | G-11 | VALUE_PROPOSITION | VALUE_PROP_VALIDITY | Borders brand-awareness survey shows DCT/P&J/Courier recognition is sufficient OR sub-brand strategy validated | Untested | 1 | 2 | 1 | 0 | 2 | 8 | RESEARCH (small fast survey) — DEFERRED to next cycle | DEFERRED |
| 9 | G-10 | PROBLEM | EVIDENCE_STRENGTH | Coverage audit of Border Telegraph + Southern Reporter vs P&J council/court/planning per-capita coverage | Asserted; no audit | 1 | 2 | 1 | 0 | 1 | 4 | RESEARCH (desk audit) — DEFERRED | DEFERRED |
| 10 | G-12 | GROWTH_ARCH / SOLUTION / GTM | EVIDENCE_STRENGTH | Sections 5-7 have explicit Desired State blocks (currently absent) | Sections 5-7 contain Required Conditions / Adequacy Criteria but no Desired State / Current State pair as required by methodology | 1 | 2 | 0 | 0 | 1 | 3 | Flag to Strategist: add Desired State / Current State blocks to Sections 5-7 in next BUILD pass | DEFERRED |

---

## 4. Full Gap Records

### Gap: G-01

- **Target:** PROBLEM
- **Dimension:** PAIN_CLARITY
- **Desired Condition:** At least 5 of 5 interviewed Borders residents (across age cohorts) describe absence of daily local news as a felt deficit; at least 2 of weekly-title subscribers tested express WTP £4.99-£5.99/mo for a daily-cadence DCT product
- **Current Observation:** Structural pain signals (73% Southern Reporter circulation collapse; no daily competitor; demographic concentration in 50+) all present, but no resident conversation evidence; pain is theoretical rather than felt-confirmed
- **Evidence Reference:** Section 1 evidence list — all entries are T1/T2 desk research; Section 1 assumption "Borders residents experience weekly-cadence as inadequate" tagged LOAD-BEARING T2 BLAST:HIGH
- **Confidence Gap:** 2 (researched → desired supported)
- **Evidence Weakness:** 2 (mostly T2 for the felt-pain clause; T1 for structural conditions)
- **Pain Uncertainty:** 3 (unclear whether pain is felt or theoretical at resident level)
- **Time Penalty:** 0
- **Blast Radius Weight:** 3 (if problem hypothesis breaks, the entire extension breaks)
- **Final Priority Score:** 21

**Recommended Action**
- Type: INTERVIEW
- Description: Conduct 10-15 structured Borders resident interviews. Sampling: across at least 4 of 11 main towns (incl. one rural-only postcode); across age cohorts (40-50, 51-65, 66+); mix of current Border Telegraph/Southern Reporter subscribers, lapsed subscribers, never-subscribers. Script must be problem-led: establish current local-news consumption and felt gaps BEFORE introducing the DCT product, pricing, or cadence claim.
- Expected Output: Verbatim evidence on (a) felt-pain frequency and intensity; (b) current substitute behaviour; (c) self-reported WTP elasticity at £4.99 vs £2.99 vs free
- Evidence Target: T1 (CONVERSATION ground truth)

**Decision Rule Triggered:** Priority Rule, Readiness Gate Rule

**Status:** OPEN

---

### Gap: G-06

- **Target:** VALUE_PROPOSITION
- **Dimension:** VALUE_PROP_VALIDITY
- **Desired Condition:** Resident interviews validate at least 4 of 6 VP clauses at recognisable, felt-pain level; pre-launch landing page produces signup intent >5% at advertised pricing
- **Current Observation:** Category and competitive clauses (3 of 6) are factually established at T1; target / problem / unique-capability clauses (3 of 6) are untested at buyer level; no landing page exists
- **Evidence Reference:** Section 4 Clause Validation table — 3 clauses "tested" (T1/T2 desk), 3 clauses "untested"; Assumption "Borders residents value daily over weekly enough to pay 3-4x" tagged LOAD-BEARING T3 BLAST:HIGH
- **Confidence Gap:** 2
- **Evidence Weakness:** 3 (the load-bearing assumption sits at T3 — assertion-heavy)
- **Pain Uncertainty:** 2
- **Time Penalty:** 0
- **Blast Radius Weight:** 3
- **Final Priority Score:** 21

**Recommended Action**
- Type: EXPERIMENT (paired with INTERVIEW)
- Description: Build a pre-launch landing page for "Borders Journal" with the proposition, 3 sample stories, and pricing. Drive c.2,000 paid clicks via Facebook to TD postcodes split between two price points (£4.99/mo vs £2.99/mo first-year). Measure email-capture / "notify me at launch" intent. Pair with the same interviews from G-01 — incorporate VP clause recognition probes after the problem-led section.
- Expected Output: Quantitative intent rate per price point; clause-level recognition signal from interview tail
- Evidence Target: T1 (behavioural for intent rate; conversation for clause recognition)

**Decision Rule Triggered:** Priority Rule, Solution Contamination Rule (script must be problem-led)

**Status:** OPEN

---

### Gap: G-04

- **Target:** SEGMENT
- **Dimension:** SEGMENT_CLARITY
- **Desired Condition:** NRS data confirms 25-35k Borders households fit the 50+/broadband profile; interview evidence shows the psychographic is recognisable
- **Current Observation:** Population and age-cohort data from Scottish Borders Council research; household figure derived from Scottish-average HH size; broadband coverage from Project Gigabit programme but not cross-tabulated; psychographic untested
- **Evidence Reference:** Section 2 assumption "c.117k pop yields c.50-55k HH, c.25-35k fit segment profile" tagged LOAD-BEARING T2 BLAST:HIGH
- **Confidence Gap:** 2
- **Evidence Weakness:** 2
- **Pain Uncertainty:** 2 (segment-shape uncertainty rather than pain uncertainty per se)
- **Time Penalty:** 0
- **Blast Radius Weight:** 3 (segment size below 15k HH triggers Section 2 kill condition)
- **Final Priority Score:** 18

**Recommended Action**
- Type: RESEARCH
- Description: Pull NRS Households and Dwellings 2024 dataset for Scottish Borders council area. Cross-reference Ofcom Connected Nations 2025 Borders data for fixed-broadband coverage by output area. Cross-reference Project Gigabit programme coverage map for current rollout status. Compute the 50+/broadband-served household population precisely. Compare against the 25-35k assumption and the 15k floor.
- Expected Output: Single-page segment-size tabulation with NRS / Ofcom / Project Gigabit triangulation; pass/fail vs Section 2 kill condition
- Evidence Target: T1 (official statistical data)

**Decision Rule Triggered:** Priority Rule, Kill Rule (audit), Architecture Validity Rule (segment density is required condition)

**Status:** OPEN

---

### Gap: G-02 (Tracked as Governor Escalation)

- **Target:** UNIT_ECONOMICS
- **Dimension:** GOVERNOR_DECISION_REQUIRED
- **Desired Condition:** DCT internal CTO confirms Pugpig Bolt platform extends to a third regional brand at marginal cost
- **Current Observation:** Awaiting governor response; assumption tagged ESCALATED in register
- **Evidence Reference:** Section 3 assumption [K] T1 LOAD-BEARING BLAST:HIGH; queue file 2026-04-24-strategist-escalations.md
- **Recommended Action:** ESCALATION (already in queue) — request response by 2026-05-08
- **Status:** ESCALATED

### Gap: G-03 (Tracked as Governor Escalation)

- **Target:** UNIT_ECONOMICS
- **Dimension:** GOVERNOR_DECISION_REQUIRED
- **Desired Condition:** DCT CFO confirms overhead allocation policy (marginal vs standalone) for the Borders extension
- **Current Observation:** Awaiting governor response
- **Evidence Reference:** Section 3 assumption [B] T2 LOAD-BEARING BLAST:HIGH; queue file 2026-04-24-strategist-escalations.md
- **Recommended Action:** ESCALATION (already in queue) — request response by 2026-05-08
- **Status:** ESCALATED

---

## 5. Contradictions

| Contradiction ID | Between | Description | Impact | Required Resolution | Block Execution? |
|---|---|---|---|---|---|
| C-1 | Methodology vs Sections 5-7 | Sections 5 (Growth Architecture), 6 (Solution Design), 7 (GTM Plan) lack explicit Desired State / Current State blocks. Skill expected per-section pairs. | LOW | Strategist to add Desired State blocks in next BUILD or CHALLENGE pass | No |
| C-2 | Section 3 base case vs pessimistic scenario | Base assumes marginal overhead allocation (15-20%); pessimistic implicitly assumes higher cost base. The escalation acknowledges this — surface as governor decision G-03 | MEDIUM | Resolved by Escalation 2 governor response | No (already escalated) |

No blocking contradictions detected.

---

## 6. Destruction Outcomes

### Pre-Mortem Summary

12-month failure scenario: At month 9, Phase 1 acquisition completes with 600-800 paying subscribers (just below the 800 floor) and blended CAC of £36-£42 (above the £35 ceiling). The failure chain:

1. Direct mail to TD1-TD15 saturates faster than modelled because the c.50k household figure overstates the addressable cohort — the 50+/broadband-served slice is c.18-22k, not 25-35k. Mail drops 2-3 fall to <0.4% response.
2. To compensate, Facebook spend is increased; CAC drifts to £32-£38 due to frequency caps and audience overlap inside the small geography.
3. Newsquest responds (see Red-Team) by dropping Border Telegraph price to £2.99 across TD postcodes, blunting trial-to-paid conversion to 9-10% (vs 12% planned).
4. Phase 1 exit gate fails on three of four conditions; governor faces a pivot/halt decision at month 9 with sunk cost c.£90-120k acquisition spend + 9 months editorial cost.

**Dominant causal factor:** segment-density and channel-saturation are not independent variables in a small geography but the model treats them as such. The pessimistic scenario in Section 3 already shows the kill outcome; the destruction reading is that pessimistic is closer to base than the register implies.

**What is missed in current register:** the interaction effect between Section 2 (segment size) and Section 5 (channel saturation). When segment is 30% smaller than modelled, channels saturate earlier AND CAC rises — the two failures compound rather than add.

### Red-Team Summary

Newsquest (Border Telegraph) 90-day response to a credible DCT entry into Borders:

- **Week 0-2:** Drop Border Telegraph subscription price from £4.99 to £2.99/mo for 12 months for new TD-postcode signups. Newsquest pricing playbook is responsive when challenged.
- **Month 1-2:** Move 1-2 reporters temporarily onto Border Telegraph from other Newsquest titles; relabel digital edition "daily" (cadence change of perception, not necessarily substance).
- **Month 2-3:** Buy out direct-mail and print-insert inventory in TD1-TD15 with 6-month exclusivity contracts where possible — denying DCT the 20% Phase 1 print-insert channel.

**Strategy impact:** Section 5 Phase 1 channel mix loses the print-insert channel (20% of spend must reallocate to already-pressured Facebook). Section 4 cadence differentiator partially blunted in buyers' minds. Section 3 ARPU clause weakens — perceived market price moves to £2.99, making the £4.99 anchor less defensible without strong product differentiation. **Net: Phase 1 CAC ceiling becomes harder to hold; trial-to-paid conversion under price-comparison pressure drops 2-4 percentage points.**

### Constraint Inversions

| Assumption | Inversion | Consequence | Survival |
|---|---|---|---|
| Pugpig Bolt extends at marginal cost (Sec 3 LOAD-BEARING T1) | Platform requires £200k+ build | Payback shifts 4-9mo → 14-22mo even in base | WITH_MODIFICATION (only if treated as strategic capex outside unit P&L) |
| Marginal central-overhead allocation 15-20% (Sec 3 LOAD-BEARING T2) | Standalone allocation 30-40% of opex | Annual fixed cost £440k → £550-650k; breakeven shifts to 9-11k subs | NO — base scenario does not breakeven within 5 years against 50k HH ceiling |
| 25-35k HH fit segment profile (Sec 2 LOAD-BEARING T2) | Segment is 10-15k HH | Channel saturation 18-24mo earlier; CAC ceiling breached by mo 9-12; cannot reach 6k+ subs | NO — segment too small; would force pivot to digital-only + adjacent geographies |
| Borders residents pay 3-4x weekly for daily (Sec 4 LOAD-BEARING T3) | WTP barely above weekly (£2.50-£3.50/mo) | ARPU drops £58 → c.£35-40; LTV halves; LTV:CAC <3x | NO — VP collapses; pivot to weekly+membership hybrid required |
| 10-15% segment WTP at £4.99-£5.99 (Sec 2 LOAD-BEARING T3) | 3-5% segment WTP at this price | Reachable paying subs ceiling 1.5-2.5k in 24-30k segment; pessimistic = outcome | NO — fails Sec 3 kill condition (subs <1,500 at mo 18) |
| TRADITIONAL architecture overdetermined (Sec 5 RESOLVED_TRUE) | (Cannot meaningfully invert — category-structural) | n/a | YES |
| Phase 1 channels attributable in 30 days (Sec 5 LOAD-BEARING T2) | No channel produces measurable signups in 30 days | Phase 1 learning loop breaks; spend continues blind | WITH_MODIFICATION — survives only if Phase 0 validation gate inserted |
| Editorial cost £300-450k/yr for 4-6 FTE (Sec 3 T2) | £450-600k due to remote-geography wage premium | Fixed cost +30%; payback +6-9mo | WITH_MODIFICATION — survives base/optimistic; pessimistic worsens |

### Evidence Concentration Risk

| Source | Claims Supported | Risk Level | Required Mitigation |
|---|---|---|---|
| WAN-IFRA Nov 2023 (DCT subs trajectory) | Sec 1 (problem framing), Sec 3 (path-to-scale precedent), Sec 4 (operating-model differentiator) | **CONCENTRATED** | Triangulate with DCT internal data on subscriber composition, retention by cohort, CAC by channel in Aberdeen/Dundee — governor-accessible |
| Press Gazette / Newsquest 21% court / 20% sport | Sec 1 (P2 alternative), Sec 2 (segment validation), Sec 4 (VP centring), Sec 6 (feature priority) | **CONCENTRATED** | Cross-check with at least one alternative regional benchmark (Reach plc, JPI Media) OR DCT's own P&J/Courier conversion-by-content data |
| Southern Reporter circulation 12,500→3,352 | Sec 1, 2, 4 | OK (single hard public number, triangulated by structural facts) | None required |
| Scottish Borders Council demographics | Sec 1, 2 | OK (official source) | None required |
| Project Gigabit Borders rollout | Sec 1, 2, 5 | OK (public infrastructure data) | None required |
| Press Gazette DCT FY24 financials | Sec 1, 3, 4 | OK (reported financial fact) | None required |
| Border Telegraph subscribe page | Sec 2, 3, 4 | OK (direct competitor observation) | None required |

### Kill Signal Audit

| Signal | Observed? | Ignored? | Consequence |
|---|---|---|---|
| Problem kill: <3/10 felt-deficit AND <2/10 WTP £4.99/mo | No (no interviews yet) | n/a | Top gap G-01 |
| Segment kill: <3/10 match profile AND <15k HH per NRS | NRS data not pulled — partial signal not yet sought | **YES (mild)** | NRS pull is desk research and is not gated on field interviews — should be done immediately (G-04 action) |
| Unit Economics kill: CAC>£40 OR conversion<8% OR churn>35% OR subs<1,500 mo18 | No (no launch) | n/a | Cannot pre-audit |
| VP kill: clauses not recognised OR landing page <2% intent | No (no test) | n/a | G-06 |
| Solution Design kill condition | **Missing from register** | **YES** | Section 6 has Adequacy Criteria but no observable kill threshold; flag back to Strategist as register-quality gap |
| GTM kill: Phase 1 exit-gate failure on 2+ of 4 metrics | No (no launch) | n/a | Cannot pre-audit |

**Two ignored / missing signals flagged:** (1) NRS data pull is doable now and not waiting on field work — added as immediate action under G-04. (2) Solution Design kill condition is missing from the register — flag to Strategist.

---

## 7. Decision Rules Application

### Priority Rule
- Highest (gap score x blast radius): **G-01** at Final Priority 21 (tie with G-06; G-01 wins on alphabetical tie-break per skill rules).
- Reason: Problem felt-pain validation is the input that gates promotion of every other hypothesis; without it, no downstream proposal can be promoted.

### Execution Rule
- Valid active tasks:
  - 10-15 Borders resident interviews (G-01, G-06) — T1 conversation
  - Pre-launch landing page test (G-06, G-04 secondary) — T1 behavioural
  - NRS / Ofcom / Project Gigabit data pull (G-04) — T1 data
- Rejected tasks:
  - Carrier tender for print delivery — G-07 is deferred; not top-3
  - Coverage audit Border Telegraph vs P&J — G-10 deferred
  - Phase 1 launch (any channel activation) — premature; gated on validation evidence + Escalation 1 resolution

### Evidence Promotion Rule
- All hypotheses currently RESEARCHED. None can promote to SUPPORTED until T1 ground-truth (conversation/data) evidence is gathered. No reclassification this pass.
- Specifically blocked from SUPPORTED:
  - PROBLEM (no resident conversation evidence)
  - SEGMENT (no NRS data, no psychographic validation)
  - UNIT_ECONOMICS (no behavioural CAC/conversion; 2 governor escalations open)
  - VALUE_PROPOSITION (no buyer-clause validation)

### Kill Rule
- No hypothesis or proposal marked BROKEN this pass.
- Pessimistic scenario in Section 3 reaches the kill threshold but is modelled, not observed — not a kill signal.

### Deadline Rule
- No formal decision deadlines were set in the register.
- Recommended: governor escalation responses (G-02, G-03) due by **2026-05-08** (14 days). Validation evidence (G-01, G-04, G-06) due by **2026-06-23** (60 days). These are added as proposed deadlines for governor approval.

### Contradiction Rule
- No blocking contradictions.
- C-1 (missing Sec 5-7 Desired States) flagged to Strategist; non-blocking.
- C-2 (overhead allocation) routed via Escalation 2.

### Architecture Validity Rule
- Architecture-dependent execution **BLOCKED** pending:
  - Escalation 1 (platform marginal cost) resolution
  - G-04 segment-size NRS pull (segment density is a stated required condition for the architecture)
- Specifically: any Phase 1 launch action (direct mail, Facebook ads, print insert) is blocked until both above are resolved.

### Solution Contamination Rule
- No tests in flight; no contamination observed.
- **Required for Phase 0 interview script:** problem-led structure mandatory. Establish current consumption and felt-pain BEFORE introducing DCT product, brand, or pricing. If a solution-led script appears in execution, invalidate.

### Readiness Gate Rule
- **sell_ready = false**
  - Problem >= RESEARCHED: pass
  - Segment >= RESEARCHED: pass
  - No HIGH-blast unresolved blocker: **fail** (G-02, G-03 escalations open; G-01, G-04, G-06 unvalidated HIGH-blast assumptions)
  - No architecture contradiction: pass
- **scale_ready = false**
  - Problem = SUPPORTED: fail
  - Segment = SUPPORTED: fail
  - Unit Economics = SUPPORTED: fail
  - Value Proposition >= RESEARCHED: pass
  - sell_ready = true: fail

### Focus Rule
- Active gaps count: **3** (G-01, G-06, G-04)
- Governor escalations tracked separately (G-02, G-03) — they cannot be progressed by system action and so do not consume an active execution slot
- Deferred: G-05, G-07, G-08, G-09, G-10, G-11, G-12 (will be re-evaluated next pass once active gaps resolve)

---

## 8. Readiness Handoff

### Approved Actions for Downstream Systems
- **None** for revenue/build execution (RevenueOS, EngineeringOS) — sell_ready is false
- Approved for validation work (Strategist or research operator):
  - Conduct G-01 interviews (problem-led, n=10-15, sampled per spec)
  - Build G-06 landing-page test (two price points, paid traffic, intent capture)
  - Pull G-04 NRS / Ofcom / Project Gigabit data and produce segment-size tabulation
  - Hold for governor responses on G-02, G-03

### Explicitly Forbidden Actions
- Phase 1 launch in any channel (direct mail, Facebook ads, print insert) — blocked per Architecture Validity Rule
- Editorial recruitment for the Borders newsroom — premature; gated on validation outcome and governor decision
- Public messaging or pre-announcement (Press Gazette, trade press, Borders local outreach) — destroys the validation environment by signalling to Newsquest before evidence is gathered, accelerating the red-team response chain
- Carrier negotiations for print delivery — deferred (G-07); do not commit until validation suggests print is in scope
- Any solution-led validation test (showing the product before establishing the problem) — invalid by Solution Contamination Rule

### Allowed Constraints (carried forward subject to validation)
- Target segment: Settled, civic-engaged Borders residents 50+ in broadband-served households across TD1-TD15 (per Section 2 — provisional pending NRS confirmation and interview validation)
- Pricing bounds: £4.99-£5.99/mo digital; £8.99-£12.99/mo bundle (per Section 3 — provisional pending WTP validation and red-team price-pressure assessment)
- Architecture mode: TRADITIONAL subscription with self-serve digital signup (per Section 5 — only category-structural element confirmed)
- Offer framing: Daily local news, named locally-resident reporters, council/court/sport/community emphasis (per Section 4 — provisional pending clause validation)
- Channel set (provisional Phase 1, pending validation): direct mail, Facebook ads, print insert, sponsorship, SEO, cross-promotion. Phase 1 not yet authorised.

### Success Signals Downstream Should Return
- Interview evidence confirming felt-pain at the levels stated in Section 1 desired state
- NRS data confirming 25-35k HH or higher in segment
- Landing-page intent >5% at £4.99 price point
- Governor confirmation of platform marginal cost AND marginal overhead allocation

### Failure Signals Downstream Should Return Immediately
- Interview signal that fewer than 3/10 describe felt deficit (Section 1 kill condition triggered)
- NRS data showing segment <15k HH (Section 2 kill condition triggered)
- Landing-page intent <2% at any price point (Section 4 kill condition triggered)
- Governor response that platform extension requires £200k+ build OR overhead allocation is standalone (Section 3 base case must be revised; potential unit-collapse)

---

## 9. Governor Escalations

### Escalation: Marginal cost of platform extension (G-02)
- Decision Type: GROUND_TRUTH
- Blast Radius: HIGH
- Decision Needed: Confirm whether DCT's existing Pugpig Bolt platform, payments stack, identity, and editorial CMS extend to a third regional brand at marginal cost (no rebuild).
- Why System Cannot Decide: Internal DCT engineering knowledge — only governor can answer.
- Options:
  - A: Marginal — Section 3 cost structure holds; proceed to validation gate
  - B: Material (£200k+ one-off build) — Section 3 needs revision; payback shifts to 14-22mo even in base; may require strategic-capex framing outside unit P&L
- System Recommendation: Need answer before Phase 1 architecture-dependent execution can be unblocked.
- What Is at Stake: If the answer is "material" and unit P&L still must absorb the cost, the unit becomes very hard to defend and the BOOTSTRAP-equivalent thresholds fail in base.
- Status: OPEN (originated 2026-04-24 in queue file 2026-04-24-strategist-escalations.md)
- Requested response by: **2026-05-08**

### Escalation: Central overhead allocation policy (G-03)
- Decision Type: VALUES + GROUND_TRUTH (VALUES because allocation policy is a finance-political choice; GROUND_TRUTH because only DCT CFO can state current policy)
- Blast Radius: HIGH
- Decision Needed: Confirm what overhead allocation policy the Borders extension will be judged against (marginal vs standalone vs hybrid).
- Why System Cannot Decide: DCT internal accounting policy — only governor (or CFO via governor) can answer.
- Options:
  - A: Marginal (15-20% of direct opex) — Section 3 holds
  - B: Standalone (full per-title overhead, c.30-40%) — Section 3 cost base rises c.£100-200k/yr; breakeven shifts to 9-11k paying subs; pessimistic becomes base; unit very hard to defend
  - C: Hybrid (e.g. 3-yr ramp from marginal to standalone) — Section 3 needs scenario revision and Phase 2/3 traction targets must lift
- System Recommendation: A or C if defensible internally; B materially weakens the case and would benefit from explicit governor sign-off as a values choice before further work proceeds.
- What Is at Stake: Under B, even base scenario does not breakeven within 5 years against the 50k household ceiling — strategy may be non-viable as a self-funded extension.
- Status: OPEN (originated 2026-04-24)
- Requested response by: **2026-05-08**

### Escalation: Validation budget authorisation (NEW — Gap Definer)
- Decision Type: VALUES (resource allocation)
- Blast Radius: MEDIUM
- Decision Needed: Authorise a Phase 0 validation budget (estimate £8-15k) covering: (a) 10-15 paid resident interviews (recruiter + incentives + analyst time); (b) landing page build + c.£2-3k Facebook test traffic; (c) analyst time for NRS / Ofcom data pull and segment-size tabulation.
- Why System Cannot Decide: Resource commitment is a governor call; system can specify the work but not authorise spend.
- Options:
  - A: Authorise full Phase 0 (£8-15k) — completes G-01, G-04, G-06 in 6-8 weeks; produces evidence for sell_ready re-evaluation
  - B: Authorise partial (NRS pull + interviews only, c.£5-8k) — defers landing page; G-06 remains unresolved; longer to sell_ready
  - C: Defer — system remains in CONDITIONAL_GO; no path to sell_ready
- System Recommendation: A — the cost is small relative to the c.£60-120k Phase 1 spend that would otherwise be committed without validation, and the failure modes identified in Pre-Mortem and Constraint Inversion make pre-launch evidence high-value.
- What Is at Stake: Without Phase 0, Phase 1 commits c.£60-120k acquisition spend + 9 months editorial cost without resolving the three top-priority HIGH-blast gaps. The pre-mortem shows the dominant failure path runs through these exact gaps.
- Status: OPEN (NEW — Gap Definer this pass)

### Escalation: Decision deadline for register evidence (NEW — Gap Definer)
- Decision Type: JUDGMENT (timeline pressure)
- Blast Radius: LOW (procedural)
- Decision Needed: Confirm working deadlines: governor escalations (G-02, G-03) by 2026-05-08; validation evidence (G-01, G-04, G-06) by 2026-06-23; CHALLENGE-mode re-run of register by 2026-06-30.
- Why System Cannot Decide: Strategy timing is a governor preference.
- Options:
  - A: Accept proposed deadlines
  - B: Accelerate (compresses validation quality)
  - C: Slow (risks Newsquest detection if any preparatory action leaks)
- System Recommendation: A.
- Status: OPEN (NEW — Gap Definer this pass)

---

## 10. Next Cycle Plan

**Top 3 actions for next pass**
1. **G-01 — Borders resident interviews:** 10-15 problem-led interviews across age cohorts and 4+ towns; deliverable is interview-evidence summary mapped to Section 1 desired-state thresholds and kill condition.
2. **G-06 — Pre-launch landing-page test:** Build mock landing page; drive c.2,000 paid clicks at two price points; capture intent + clause-recognition signal (paired with G-01 interview tail).
3. **G-04 — NRS / Ofcom / Project Gigabit data pull:** Compute precise segment size; pass/fail vs Section 2 kill condition.

**Expected register changes if successful**
- PROBLEM promotes to SUPPORTED (T1 conversation evidence) OR is marked BROKEN per kill condition
- SEGMENT promotes to RESEARCHED+ with refined size; potential SUPPORTED if interview-validated
- VALUE_PROPOSITION clauses move from "untested" to "tested" or "rejected" per landing-page evidence
- UNIT_ECONOMICS remains RESEARCHED pending governor escalation responses; if Escalation 1 returns "marginal" and Escalation 2 returns "marginal/hybrid", base case is reaffirmed
- sell_ready re-evaluated; potentially flips to true if all top-3 gaps resolved AND both governor escalations return non-killing answers

**Re-run date:** 2026-06-30 (CHALLENGE mode — assumes Phase 0 validation evidence is in hand and governor escalations have been resolved)
