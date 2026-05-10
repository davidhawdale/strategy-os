# Gap Analysis Register

Created: 2026-05-09
Last Run: 2026-05-09 (Pass 3 gap-computing-ledger + gap-running-destruction + gap-enforcing-decisions)
Source Register Version: 3 (post CHALLENGE Pass 3, 2026-05-08)
Business Mode: BOOTSTRAP
Sell Ready: false
Scale Ready: false

---

## 1. Gate Summary

**Decision:** NO_GO (for downstream execution this cycle)

**Why:**
- Problem and Segment are RESEARCHED (T2 inference from Aberdeen/Moray analogue), not SUPPORTED. No Borders-resident T1 evidence exists.
- Ten HIGH-blast load-bearing assumptions are OPEN across §1, §2, §3 (A1, A2, A4, A5, S1, S2, U1, U3, U4, U6).
- One internal contradiction between §3 (Unit Economics: 4-8K paid subs base) and §7 (GTM: "8-15K paid subs by month 24" still in Constraints from Hypotheses) — §7 was not updated when §3 was recalibrated. Blocks GTM execution.
- Architecture state = BLOCKED: 4 of 5 required conditions unmet (daily cadence not running, town-loyalty unaddressed in product, founder-led local presence not initiated, AI stack not operational).

**Readiness Gate Predicate Check:**
- Problem >= researched: pass
- Segment >= researched: pass
- No HIGH-blast unresolved blocker: **fail** (10 HIGH-blast assumptions OPEN)
- No architecture contradiction: **fail** (C-01 §3/§7 numerical mismatch)

**sell_ready = false.** **scale_ready = false.**

**Current Constraint Summary:**
- No Borders primary research conducted; pain reality is inferred only.
- Unit economics base case is marginal (-£15K to +£30K contribution at 6K subs); two key inputs (U3 AI cost leverage, U4 advertiser appetite) unmeasured.
- Evidence concentrated on five sources (P&J/DCT, Press Gazette, Ofcom, founder observation, ABC) — single-point-of-failure risk across multiple hypotheses.
- National World owns three of the four indirect competitors; defensive bundling response not modelled in §4.

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
- Confidence Gap: 3 unvalidated→supported / 2 researched→supported / 1 partial / 0 none.
- Evidence Weakness: 3 T3 only / 2 mostly T2 / 1 mixed thin / 0 enough T1.
- Pain Uncertainty: 3 unclear / 2 partial / 1 mostly clear / 0 clear.
- Time Penalty: 2 exceeded / 1 due / 0 within.
- Blast Radius Weight: 3 strategy collapses / 2 one hypothesis must change / 1 local revision.

---

## 3. Ranked Gaps

| Rank | Gap ID | Target | Dimension | Desired Condition | Current Observation | Conf Gap | Ev Weak | Pain Unc | Time | Blast | Final | Recommended Action | Status |
|---|---|---|---|---|---|---:|---:|---:|---:|---:|---:|---|---|
| 1 | G-01 | PROBLEM | PAIN_CLARITY | A1, A2 supported by Borders T1 ground truth | A1, A2 T3 OPEN; pain inferred from analogue | 2 | 2 | 3 | 0 | 3 | 21 | INTERVIEW + RESEARCH | OPEN |
| 2 | G-02 | SEGMENT | SEGMENT_CLARITY | S1, S2 supported by T1; addressable size validated | S1, S2 T3 OPEN; cross-Borders identity untested | 2 | 2 | 2 | 0 | 3 | 18 | RESEARCH + INTERVIEW | OPEN |
| 3 | G-03 | UNIT_ECONOMICS | ECONOMIC_VIABILITY | LTV:CAC > 3:1, payback < 18mo, U3 + U4 ground-truthed | T2/T3 inputs; base case marginal; U3, U4 unmeasured | 2 | 2 | 2 | 0 | 3 | 18 | EXPERIMENT + INTERVIEW | OPEN |

Tie between G-02 and G-03 broken alphabetically by target.

---

## 4. Full Gap Records

### Gap: G-01
- **Target:** PROBLEM
- **Dimension:** PAIN_CLARITY
- **Desired Condition:** A1 (pain real) and A2 (behaviour-change intent) supported by Borders T1 ground truth (n>=200 mixed-methods survey + 15+ interviews per §1 Kill Condition).
- **Current Observation:** A1, A2 T3 OPEN. Severity scored 2-3 with T3 evidence. Macro Press & Journal viability is T1 but not local. The 2026-05-08 correction restored Moray (~100k pop, 8,834 daily print circ per [ABC](https://www.abc.org.uk/product/9327)) as the operational analog for Borders (~117k pop) and reversed prior weakening of assumption B.
- **Evidence Reference:** §1 Assumptions A1, A2; §1 FOUNDER_STATED T3; §1 Kill Condition.
- **Confidence Gap:** 2  **Evidence Weakness:** 2  **Pain Uncertainty:** 3  **Time Penalty:** 0  **Blast:** 3  **Final:** 21

**Recommended Action**
- Type: INTERVIEW (primary) + RESEARCH (supplementary)
- Description: Borders resident survey n>=200 stratified by TD postcode and EH43-EH46, plus 15+ depth interviews. Test (a) cadence/depth dissatisfaction with current weekly stack, (b) workarounds in use, (c) brand-architecture preference (the corrected G-01 probe per 2026-05-08), (d) behaviour-change intent at plausible price points. Methodology problem-led; no solution presented before pain established.
- Expected Output: T1 evidence promoting A1, A2 toward SUPPORTED, or kill thresholds hit (<30% dissatisfaction or <10% intent → BROKEN).
- Evidence Target: T1

**Decision Rule Triggered:** Priority Rule
**Status:** OPEN

---

### Gap: G-02
- **Target:** SEGMENT
- **Dimension:** SEGMENT_CLARITY
- **Desired Condition:** S1 (30-50K addressable real) and S2 (cross-Borders identity holds) supported by T1 with town-stratified data; access path validated.
- **Current Observation:** S1, S2 T3 OPEN. Demographics from [Scottish Borders Council](https://www.scotborders.gov.uk/) are T1 macro; pain by segment T2. No town-loyalty measurement.
- **Evidence Reference:** §2 Assumptions S1, S2, S3; §2 Pain Scoring; §2 Kill Condition.
- **Confidence Gap:** 2  **Evidence Weakness:** 2  **Pain Uncertainty:** 2  **Time Penalty:** 0  **Blast:** 3  **Final:** 18

**Recommended Action**
- Type: RESEARCH + INTERVIEW
- Description: Bundle into G-01 fieldwork; stratify n>=200 sample by town (Hawick, Galashiels, Peebles, Kelso, Jedburgh, Selkirk, Eyemouth, Duns) and length-of-residence; include forced-choice cross-Borders-vs-town-only question. Run a parallel postcode-targeted Facebook signup test (TD + EH43-EH46) to ground-truth S3 channel reachability.
- Expected Output: T1 evidence on addressable size by town, cross-Borders identity validity, channel CPL by postcode.
- Evidence Target: T1

**Decision Rule Triggered:** Priority Rule
**Status:** OPEN

---

### Gap: G-03
- **Target:** UNIT_ECONOMICS
- **Dimension:** ECONOMIC_VIABILITY
- **Desired Condition:** LTV:CAC > 3:1, payback < 18mo validated under realistic assumptions; U1, U3, U4 supported with T1/T2 ground-truth.
- **Current Observation:** All inputs T2/T3. Base case (6K subs, £55 ARPU) yields contribution -£15K to +£30K. Recalibrated this pass from 10K to 6K base after [Press & Journal ABC H2 2025](https://www.abc.org.uk/product/9327) (18,382 print) + [Press Gazette: DC Thomson digital subscribers](https://pressgazette.co.uk/news/dc-thomson-digital-subscribers/) data.
- **Evidence Reference:** §3 Assumptions U1, U3, U4, U6; §3 Scenario Analysis; §3 Recalibration note.
- **Confidence Gap:** 2  **Evidence Weakness:** 2  **Pain Uncertainty:** 2  **Time Penalty:** 0  **Blast:** 3  **Final:** 18

**Recommended Action**
- Type: EXPERIMENT + INTERVIEW
- Description: (a) AI-assisted production trial: 20-30 Borders-relevant stories using LLM stack + editorial workflow; measure per-story cost (engineer + editor + inference) vs traditional baseline; target 30-50% reduction (U3). (b) n>=10 Borders SME advertiser conversations on appetite/spend/willingness; ground-truth U4 £8-£25/reader/yr range.
- Expected Output: T1 (advertiser conversations) + T2 (production trial cost data) bounding U3, U4 with measured ranges.
- Evidence Target: T1 for U4; T2 for U3

**Decision Rule Triggered:** Priority Rule
**Status:** OPEN

---

### Deferred Gaps (Focus Rule — max 3 active)

| Gap ID | Target | Dimension | Score | Reason |
|---|---|---|---:|---|
| G-04 | VALUE_PROPOSITION | VALUE_PROP_VALIDITY | 12 | Downstream of Problem; testing VP first would be solution-contaminated. |
| G-05 | GROWTH_ARCHITECTURE | ARCHITECTURE_READINESS | 10 | Architecture conditions BLOCKED (Rule 7); cannot evaluate until Problem/Segment ground-truthed. |
| G-06 | SOLUTION_DESIGN | SOLUTION_ADEQUACY | 10 | Adequacy depends on validated problem and segment. |
| G-07 | GTM_PLAN | GTM_FEASIBILITY | 10 | BLOCKED by §3/§7 contradiction (C-01). |

---

## 5. Contradictions

| Contradiction ID | Between | Description | Impact | Required Resolution | Block Execution? |
|---|---|---|---|---|---|
| C-01 | §3 Unit Economics vs §7 GTM Plan | §3 recalibrated 2026-05-09 to 4-8K paid subs ceiling, 6K base. §7 "Constraints from Hypotheses" still states "8-15K paid subs by month 24." Numerical mismatch. | HIGH | Strategist reconciles §7 with §3 ranges in next BUILD pass (E-03). | YES — blocks GTM execution. |
| C-02 | §4 V3 (RESOLVED_TRUE "no direct daily competitor") vs Red-team finding | V3 is true today, but red-team identifies plausible 90-day defensive bundling response from National World (owner of three of four indirect competitors). V3 is contingent, not durable. | MEDIUM | Add monitoring assumption V5: "National World does not bundle three Borders weeklies into daily digital product within 12 months." Watch [Press Gazette](https://pressgazette.co.uk/) and National World announcements. | NO — surfaces a watch-item. |

---

## 6. Destruction Outcomes

### Pre-Mortem Summary

**Failure scenario (12 months out):** The strategy failed because **A4 (P&J transferability) and A5 (cross-Borders identity) failed simultaneously, and the pro-rata base case was structurally optimistic.**

Causal chain (4 links):
1. **Trigger:** G-02 fieldwork reveals town-loyalty rejection of cross-Borders product (>40% prefer town-only) — A5 falsified.
2. **Effect 1:** Forced pivot to per-town editions or a town-first launch. Editorial team of 3-5 FTE cannot sustain three separate town editions daily; cost rises 1.4-1.8× without revenue rising proportionally.
3. **Effect 2:** Phase 1 GTM Exit Gate misses (signups <2,500; or signup CAC >£15 because targeting fragments across towns rather than addressing a single region). Without channel exit confirmed, Phase 2 paid scaling cannot deploy.
4. **Outcome:** Sub count plateaus at 1,500-2,500 by month 18 — below the U1 kill threshold of 3,000. Contribution remains negative. Kill condition met.

**What was missed/underweighted:**
- Asymmetry between P&J's catchment (Aberdeen city + 4-5× Borders population, single dominant centre) and Borders (no urban centre, five named towns each <15K pop). Pro-rata assumes population-equivalent economics; this ignores network/centre effects.
- Interaction between V2 (AI invisible to readers) and U6 (3-5 FTE + AI sustains daily quality): a high-profile AI-generated error in Phase 1 forces editor backfill, breaking U3.
- National World's incentive and capability to defensively bundle (see red-team).

---

### Red-Team Summary

**Incumbent:** [National World](https://nationalworld.com/) — publisher of [The Southern Reporter](https://www.thesouthernreporter.co.uk/), [Border Telegraph](https://www.bordertelegraph.com/), and [Hawick News](https://www.hawick-news.co.uk/) (3 of 4 indirect Borders competitors).

**90-day response (most likely):** Defensive bundling. Combine the three weeklies into a single £2.99/mo digital "Borders Daily Bundle" e-edition using existing CMS infrastructure. Marginal cost near zero (content already produced). Accelerate cross-publishing across the three mastheads to give the appearance of daily cadence (3 weeklies × 2 days each ≈ daily content surface).

**Strategy impact:**
- Invalidates V3 ("no direct daily competitor") within 90 days of detected entry.
- Compresses pricing floor: their £2.99 vs our £4 is 25% below; if matched, blended ARPU falls toward the £30-£40 pessimistic range, kicking U1 toward kill.
- Blocks the "daily cadence at weekly cost" differentiator (Solution Design positioning) — they reposition existing weekly journalism as daily.
- Channel block: list-buy / partnership with the three weeklies (channel #2 in §3) becomes unavailable.

**Secondary incumbent:** [DC Thomson](https://www.dcthomson.co.uk/). Lower probability — historically watch-and-wait — but if our test results become public via primary research, an acquisition of National World's Borders portfolio is plausibly cheaper for them than building, given they operate Press & Journal next door.

---

### Constraint Inversions

| Assumption | Inversion | Consequence | Survival |
|---|---|---|---|
| A1 (cadence-gap pain real, HIGH) | <15% of Borders adults express cadence dissatisfaction | Problem hypothesis fails; entire strategy collapses | NO |
| A2 (behaviour-change intent, HIGH) | <5% paid-conversion intent at any plausible price | Even if A1 holds, no monetisable demand | NO |
| A4 (P&J transferability, HIGH) | P&J economics not transferable to Borders pro-rata | Base case overstates ceiling 1.5-2×; UE negative even at "optimistic" subs | WITH_MODIFICATION (pivot to membership-only or B2B/civic; smaller scale) |
| A5 (cross-Borders single product, HIGH) | Town-loyalty rejection >40% | Forces per-town editions; 1.4-1.8× cost without revenue lift | WITH_MODIFICATION (per-town launch sequence; Hawick or Galashiels first) |
| S1 (addressable 30-50K real, HIGH) | Addressable <15K | U1 ceiling falls below kill threshold; UE collapses | NO |
| S2 (cross-Borders identity, HIGH) | = A5 inversion | See A5 | WITH_MODIFICATION |
| S4 (smartphone >85%, MEDIUM) | Rural Borders smartphone <70% | App-only delivery insufficient; print companion mandatory; cost rises | WITH_MODIFICATION (print-first not digital-first) |
| U1 (4-8K subs achievable, HIGH) | <3K subs at month 18 | Kill condition met directly | NO |
| U3 (AI cuts per-story cost 30-50%, HIGH) | AI adds cost without quality | Cost base 1.5-2× plan; UE collapses; V2 fails | NO |
| U4 (ad revenue £8-£25/reader/yr, HIGH) | Advertiser appetite £2-£5/reader/yr | Sub-ARPU must rise to compensate; pricing floor breaks against National World £2.99 bundle | WITH_MODIFICATION (membership tier becomes primary revenue) |
| U6 (3-5 FTE + AI sustains daily, HIGH) | Quality drops; churn spikes | V2 trust hypothesis fails; sub count erodes | NO |
| V1 (resonance >30%, HIGH) | <25% find VP claim resonant | Repositioning required; messaging cycle restarts | WITH_MODIFICATION |
| V2 (AI invisible to readers, HIGH) | Disclosure damages trust | Reduce visible AI role; cost rises (negates U3) | WITH_MODIFICATION |
| V3 (no direct daily competitor, HIGH) | National World launches bundle in 90d | Differentiator collapses; pricing floor compressed | WITH_MODIFICATION (compete on quality not cadence; raise editorial bar) |

**Survival summary:** 7 of 14 inversions kill outright (NO). 7 require modification. None leave the strategy unaffected. Consistent with RESEARCHED-not-SUPPORTED state — high theoretical attack surface, no T1 to absorb inversions.

---

### Evidence Concentration Risk

| Source | Claims Supported | Risk Level | Required Mitigation |
|---|---|---|---|
| [Press & Journal](https://www.pressandjournal.co.uk/) + [DC Thomson](https://www.dcthomson.co.uk/) (incl. [ABC](https://www.abc.org.uk/product/9327), [Press Gazette DCT](https://pressgazette.co.uk/news/dc-thomson-digital-subscribers/)) | §1 Problem (analogue viability), §3 UE (pro-rata base), §4 VP (positioning gap) | CONCENTRATED | Triangulate against a non-DCT regional analog (e.g. Newsquest's Bournemouth Echo or Reach plc regional dailies). Moray is itself part of P&J's catchment, not independent. |
| [Press Gazette](https://pressgazette.co.uk/) (multiple) | §1 Problem (regional decline), §3 UE (RPM, journalist counts), §4 VP (competitive context) | CONCENTRATED | Add primary trade source (WAN-IFRA, ABC industry data direct) for cross-check. |
| [Ofcom News Consumption](https://www.ofcom.org.uk/tv-radio-and-on-demand/information-for-industry/research-and-data/news-consumption) | §1 (cadence mismatch), §2 (35+ skew), §3 (digital shift) | CONCENTRATED | Add Reuters Institute Digital News Report. |
| Founder/Governor observation | §1 (no daily Borders product), §2 (FB-group activity signal) | CONCENTRATED (single-source T2 supporting load-bearing claims) | Replace with T1: systematic masthead audit + observable FB engagement metrics for named groups. |
| [ABC certified circulation H2 2025](https://www.abc.org.uk/product/9327) | §1 (P&J ceiling), §3 (pro-rata calibration) | CONCENTRATED (only T1 quantitative anchor for entire pro-rata) | Pull additional ABC certificates: Aberdeen Evening Express, Dundee Courier, comparable Newsquest regionals. |

**Register-level finding:** Replacing analogue-based reasoning with Borders T1 evidence (G-01, G-02) is the only durable mitigation.

---

### Kill Signal Audit

| Signal | Observed? | Ignored? | Consequence |
|---|---|---|---|
| §1 Kill: <30% dissatisfaction or <10% intent in n>=200 survey | NO (survey not run) | N/A | Cannot audit; gap is the absence of the test (G-01). |
| §2 Kill: <25% adults 35+ in TD/EH-Borders meet primary filters; OR >40% prefer town-only | NO (research not run) | N/A | Cannot audit (G-02). |
| §3 Kill: LTV:CAC <2:1 base after 12mo live; OR <3K paid at month 18; OR contribution negative at month 18 | NO (no live data; pre-launch) | N/A | Forward-looking; pre-launch proxy via G-03 advertiser fieldwork. |
| §4 Kill: <25% select VP over status-quo in n>=100 messaging test; OR direct competitor launches comparable daily within 6mo | NO test run; **PARTIALLY observed for competitor sub-condition** — red-team identifies plausible National World defensive bundle. Not yet observed in market. | NO | Watch-item; add monitoring assumption V5 (C-02). |
| Withdrawn 2026-05-05 paid-vs-free probe | YES (was acted on) | YES — was acted on prematurely from misread of DCT newsletter model | Already corrected on 2026-05-08. System self-corrected; one cycle of analysis absorbed. |

**Audit finding:** No active kill condition is met. Every kill condition requires evidence not yet collected. The 2026-05-05/08 episode demonstrates the system's susceptibility to misreading analogues; the corrected G-01 brand-architecture probe is methodologically tighter.

**Vague kill condition flag:** §3 Kill cannot be audited pre-launch. This is structurally fine but means UE has no pre-launch kill — proxy via G-03 advertiser fieldwork (if U4 lands £2-£5 not £8-£25, UE is on path to fail).

---

### Contradiction Findings (for gap-enforcing-decisions)

1. **C-01 §3 vs §7 numerical mismatch.** Blocks GTM execution.
2. **C-02 V3 contingency.** Add monitoring assumption; do not block.

---

## 7. Decision Rules Application

### Rule 1: Priority Rule
- Highest `(gap score x blast radius)` is **G-01 PROBLEM (score 21).**
- Reason: A1 and A2 underwrite every downstream hypothesis. Without Borders T1, the entire register is analogue-derived.
- Execution queue alignment: queue is empty pre-pass; the three tasks issued this pass (T-01 → G-01, T-02 → G-02, T-03 → G-03) all align with top-3 gaps.

### Rule 2: Execution Rule
- **Valid tasks (issued):**
  - T-01: Borders fieldwork — survey + interviews → reduces G-01 → produces T1. Valid.
  - T-02: Town-stratified analysis + FB CPL test → reduces G-02 → produces T1. Valid.
  - T-03: AI production trial + advertiser interviews → reduces G-03 → produces T1+T2. Valid.
- **Rejected tasks:** none in queue this pass.
- **Implicit reject:** any messaging/VP test before G-01 fieldwork — would be solution-led (Rule 8 violation).

### Rule 3: Evidence Promotion Rule
- No hypothesis is currently SUPPORTED. All four (Problem, Segment, UE, VP) are RESEARCHED.
- Evidence ceiling check:
  - Problem: T1 macro + T2 inferred + T3 founder. Ceiling = RESEARCHED. Current = RESEARCHED. **No reclassification.**
  - Segment: T1 macro + T2 inferred. Ceiling = RESEARCHED. Current = RESEARCHED. **No reclassification.**
  - Unit Economics: T2/T3 inputs. Ceiling = RESEARCHED. Current = RESEARCHED. **No reclassification.**
  - Value Proposition: T1 competitive + T2 inferred. Ceiling = RESEARCHED. Current = RESEARCHED. **No reclassification.**
- Result: register is currently honest about its own confidence. No promotion violation.

### Rule 4: Kill Rule
- No kill condition met (per kill signal audit).
- No strong contradictory T1 evidence in destruction log — red-team finding is anticipatory, not observed.
- **No hypothesis marked BROKEN.**

### Rule 5: Deadline Rule
- **No deadlines defined in Register Version 3.** This is itself a finding.
- No EXCEEDED deadlines, but absence of deadlines violates the spirit of the rule (no indefinite exploration). **Escalated to governor (E-01).**

### Rule 6: Contradiction Rule
- **C-01** (§3 UE vs §7 GTM): blocks GTM execution. Strategist required to reconcile in next BUILD pass.
- **C-02** (V3 vs red-team): does not block; surfaced as watch-item / new monitoring assumption (V5).

### Rule 7: Architecture Validity Rule
Required conditions for §5 Hybrid (content + community-led):
1. Free tier / metered access: design choice — **MET** conceptually (no production yet).
2. Daily publishing cadence from day 1: **UNMET** (no production stack).
3. Town-loyalty addressable (per-town editions or strong tagging): **UNMET** (S2 untested; depends on G-02).
4. Founder-led local presence Phase 1: **UNMET** (no fieldwork or community presence initiated).
5. AI-assisted production stack operational: **UNMET** (U3 untested; depends on G-03 trial).

4 of 5 unmet → **Growth Architecture support state = BLOCKED.** All architecture-dependent execution (channel deployment, paid acquisition, content production planning) is blocked until conditions 2, 3, 5 are addressed (4 follows from G-01/G-02).

### Rule 8: Solution Contamination Rule
- Withdrawn paid-vs-free probe (2026-05-05) was correctly retired on 2026-05-08; was approaching solution-led framing.
- Current G-01 brand-architecture preference probe is **problem-led** (asks about preferred news structure before proposing a product). **Pass.**
- §7 messaging copy ("The Borders, every day.") must NOT be used in G-01 fieldwork — those test VP resonance, not problem reality. Flagged: any test using §7 messaging before G-01 results is invalidated.

### Rule 9: Readiness Gate Rule

**sell_ready evaluation:**
- Problem >= RESEARCHED: **pass**
- Segment >= RESEARCHED: **pass**
- No HIGH-blast unresolved blocker: **fail** (10 HIGH-blast OPEN: A1, A2, A4, A5, S1, S2, U1, U3, U4, U6)
- No architecture contradiction: **fail** (C-01; architecture conditions 4-of-5 unmet)

**sell_ready = false.**

**scale_ready evaluation:**
- Problem = SUPPORTED: **fail** (RESEARCHED)
- Segment = SUPPORTED: **fail** (RESEARCHED)
- Unit Economics = SUPPORTED: **fail** (RESEARCHED)
- Value Proposition >= RESEARCHED: **pass**
- sell_ready = true: **fail**

**scale_ready = false.**

### Rule 10: Focus Rule
- Active gaps: 3 (G-01, G-02, G-03). **Pass (3/3).**
- Deferred: G-04, G-05, G-06, G-07.

---

## 8. Readiness Handoff

### Approved Actions for Downstream Systems
- **None.** sell_ready = false; downstream execution (RevenueOS, StyleOS, EngineeringOS) blocked.
- Strategy-side fieldwork (T-01, T-02, T-03) is approved within StrategistOS only.

### Explicitly Forbidden Actions
- Any paid acquisition spend before G-01 evidence in.
- Any production-stack build (CMS, app, AI pipeline) beyond a contained U3 trial under T-03.
- Any messaging or VP test using §7 framework copy before G-01 results — would be solution-contaminated (Rule 8).
- Any commitment to a Borders-wide editorial structure before S2 ground-tested.
- Any pricing test publicly before G-01/G-03 in.
- Any GTM execution while C-01 unresolved.

### Allowed Constraints (for fieldwork only)
- Target segment (research filter): Borders adults 35+, TD + EH43-EH46 postcodes, length-of-residence >5 years, smartphone-fluent.
- Pricing bounds: research probes only; no commercial commitment.
- Architecture mode: BLOCKED — do not deploy.
- Offer framing: research-only; problem-first.
- Channel set: research and field-interview channels only (postcode mail, Facebook ads for signup/CPL test, in-person interviews, telephone survey).

### Success Signals Downstream Should Return
- N/A — downstream not yet engaged.

### Failure Signals (from fieldwork) Strategy Should Treat as Kills
- G-01: <30% dissatisfaction or <10% behaviour-change intent → Problem BROKEN.
- G-02: >40% prefer town-only over cross-Borders product → Segment requires PIVOT to per-town launch.
- G-02: addressable size <15K adults meeting filters → Segment BROKEN.
- G-03 (U3): AI does not reduce per-story cost ≥30% in trial → Unit Economics BROKEN.
- G-03 (U4): advertiser willingness <£5/reader/yr in n>=10 conversations → Unit Economics requires PIVOT to membership-primary.

---

## 9. Governor Escalations

### Escalation: E-01 — Decision deadlines policy
- **Decision Type:** VALUES
- **Blast Radius:** MEDIUM
- **Decision Needed:** What deadline does the governor set for G-01/G-02/G-03 fieldwork completion, and what is the governor's tolerance for indefinite RESEARCHED-state exploration?
- **Why System Cannot Decide:** Deadline-setting is a values trade-off (speed of validation vs cost/quality of primary research). No deadlines are defined in the register. Rule 5 requires deadlines to prevent indefinite exploration but cannot autonomously set them.
- **Options:**
  - A: Aggressive — 6 weeks to G-01/G-02 close. Lower n, faster iteration, higher risk of methodological compromise.
  - B: Standard — 12 weeks. Allows n>=200 properly recruited sample, depth interviews, AI trial, advertiser conversations in parallel.
  - C: Thorough — 16-20 weeks. Higher quality; risks shipping past competitor windows.
- **System Recommendation:** B (12 weeks). Aligns n>=200 sampling with §1 Kill Condition; runs G-03 in parallel; protects against red-team National World 90-day window.
- **What Is at Stake:** Without a deadline, strategy can sit in RESEARCHED indefinitely; with too tight a deadline, fieldwork becomes solution-led shortcuts.
- **Status:** OPEN

### Escalation: E-02 — Fieldwork budget commitment
- **Decision Type:** VALUES (resource allocation) + GROUND_TRUTH (cannot proceed without funding)
- **Blast Radius:** HIGH
- **Decision Needed:** Will the governor approve fieldwork budget for G-01/G-02/G-03? Indicative range: £8-£20K (n=200 telephone/online survey + 15-20 depth interviews + small Facebook CPL test + n=10 SME interviews + AI trial inference cost).
- **Why System Cannot Decide:** Strategy cannot conduct primary research without governor-approved spend. Range depends on governor's recruitment-vendor preferences.
- **Options:**
  - A: Founder-led recruitment + DIY survey tooling (≈£3-£6K). Lowest cost; risks recruitment bias and sample skew.
  - B: Mixed — vendor panel for survey n=200, founder-led for depth interviews and SME conversations (≈£8-£12K). Balanced.
  - C: Full-vendor (≈£15-£20K). Highest sample integrity; longest lead time.
- **System Recommendation:** B. Survey integrity via vendor panel; qualitative depth via founder relationships (also serves Architecture condition 4).
- **What Is at Stake:** Without fieldwork, strategy cannot exit RESEARCHED. Without sample integrity, evidence is contaminated and decisions made on it are unsafe.
- **Status:** OPEN

### Escalation: E-03 — Reconcile §3/§7 numerical contradiction
- **Decision Type:** JUDGMENT (assigned to Strategist, not Governor)
- **Blast Radius:** MEDIUM
- **Decision Needed:** Update §7 GTM "Constraints from Hypotheses" to reflect §3's recalibrated 4-8K paid subs ceiling. Adjust Phase 2/3 sub targets accordingly.
- **Why Logged Here:** Strategist owns §1-§7. Gap Definer cannot rewrite Strategist content. Logged for tracking; assigned to Strategist for next BUILD pass.
- **Status:** OPEN — assigned to Strategist.

---

## 10. Next Cycle Plan

**Top 3 actions for next pass (issued to execution/queue/):**
1. **T-01** (G-01): Borders resident survey (n>=200) + 15-20 depth interviews testing pain reality, behaviour-change intent, brand-architecture preference.
2. **T-02** (G-02): Town-stratified analysis of T-01 sample + parallel postcode-targeted Facebook CPL signup test.
3. **T-03** (G-03): AI-assisted production trial (20-30 stories) + n>=10 Borders SME advertiser interviews.

**Expected register changes if fieldwork is successful:**
- §1 Problem: A1, A2 promoted toward SUPPORTED; or BROKEN if kill thresholds hit.
- §2 Segment: S1, S2, S3 ground-truthed; cross-Borders identity confirmed or PIVOT to per-town.
- §3 Unit Economics: U3 (AI cost) and U4 (ad revenue) bounded; base case re-recalibrated.
- §4 V3 monitoring assumption added (V5 watch-item: National World bundle).
- §7 GTM: Strategist reconciles §7 with §3 (resolves C-01).

**Re-run date:** 2026-08-09 (allows ~13 weeks for vendor-panel recruitment, fieldwork, analysis under E-01 Option B). Earlier interim re-run if fieldwork surfaces a kill signal.
