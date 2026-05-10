# Gap Analysis Register

Created: 2026-05-10
Last Run: 2026-05-10
Source Register Version: 1
Business Mode: HYBRID
Sell Ready: false
Scale Ready: false

---

## 1. Gate Summary

**Decision:** NO_GO (for any spend beyond fieldwork)

**Why:**
- Every load-bearing assumption supporting Problem, Segment, and Unit Economics is T2 or T3. No T1 ground-truth from Borders residents or SMEs exists. Strategy is structurally inferred, not validated.
- Three HIGH-blast assumptions (resident pain, segment WTP at scale, SME advertising appetite) are unvalidated and would each individually break the base case.
- Three governor escalations (E-01, E-02, E-03) are OPEN and load-bearing. Without resolution of at least E-01 (fieldwork mandate) and E-03 (portfolio tolerance), the kill thresholds in Unit Economics are not calibrated.
- sell_ready can be CONDITIONALLY true on Rule 9 (Problem & Segment both RESEARCHED, no contradiction) but the cost of being wrong on the unvalidated T3 assumptions is HIGH-blast, so the system holds sell_ready = false pending fieldwork.

**Readiness Gate Predicate Check (sell_ready):**
- Problem >= researched: pass (RESEARCHED)
- Segment >= researched: pass (RESEARCHED)
- No HIGH-blast unresolved blocker: fail (E-01 open; three T3 HIGH-blast assumptions outstanding)
- No architecture contradiction: pass (no contradiction detected between sections; one tension flagged in §5)

Result: **sell_ready = false** (one HIGH-blast unresolved blocker).

**Readiness Gate Predicate Check (scale_ready):**
- Problem = SUPPORTED: fail (RESEARCHED)
- Segment = SUPPORTED: fail (RESEARCHED)
- Unit Economics = SUPPORTED: fail (RESEARCHED)
- Value Proposition >= RESEARCHED: pass (RESEARCHED)
- sell_ready = true: fail

Result: **scale_ready = false**.

**Current Constraint Summary:**
- No T1 resident or SME evidence anywhere in the register.
- Internal DCT cost data unavailable — Unit Economics base case relies on a T2 shared-services assumption.
- Portfolio tolerance for sub-scale title undefined — kill thresholds not anchored to a values decision.

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

Scales as defined in CLAUDE.md / gap-computing-ledger skill (Confidence 0-3, Evidence 0-3, Pain 0-3, Time 0-2, Blast 1-3).

---

## 3. Ranked Gaps

| Rank | Gap ID | Target | Dimension | Desired Condition | Current Observation | Conf | Evid | Pain | Time | Blast | Priority | Recommended Action | Status |
|---|---|---|---|---|---|---:|---:|---:|---:|---:|---:|---|---|
| 1 | G-01 | PROBLEM | PAIN_CLARITY | Borders residents confirm daily-cadence pain as a top-5 information frustration (T1) | Pain inferred from national news-desert data; zero Borders T1 evidence | 2 | 2 | 3 | 0 | 3 | 21 | INTERVIEW: 20+ residents across 4+ towns | ESCALATED (E-01) |
| 2 | G-02 | UNIT_ECONOMICS | ECONOMIC_VIABILITY | SME advertiser willingness to commit £150K–£400K/yr validated (T1) | No Borders SME contacted; £150K–£400K is T2 modelling from UK ad benchmarks | 2 | 2 | 3 | 0 | 3 | 21 | INTERVIEW: 10+ Borders SMEs on advertising commitment | ESCALATED (E-01) |
| 3 | G-03 | SEGMENT | SEGMENT_CLARITY | 10–20% conversion of ~30–45K addressable households is reachable; segment proxies (BT/SR readership, Borders FB groups) correlate with target behaviours | Segment defined from public demographics; proxy validity untested; WTP unknown | 2 | 2 | 2 | 0 | 3 | 18 | RESEARCH + survey via Borders FB groups; stratify by town | ESCALATED (E-01) |
| 4 | G-04 | UNIT_ECONOMICS | ECONOMIC_VIABILITY | DCT shared-services marginal cost confirmed sufficient to support sub-15K-subscriber title | T2 assertion; no internal DCT data | 2 | 2 | 1 | 0 | 3 | 15 | ESCALATION: request DCT finance data (E-02) | DEFERRED |
| 5 | G-05 | UNIT_ECONOMICS | GOVERNOR_DECISION_REQUIRED | Portfolio tolerance for 6–8K-sub title defined; UE kill thresholds anchored | Undefined; kill thresholds drafted without portfolio frame | 2 | 3 | 0 | 0 | 3 | 15 | ESCALATION: governor values decision (E-03) | DEFERRED |
| 6 | G-06 | VALUE_PROPOSITION | VALUE_PROP_VALIDITY | 5/6 VP clauses tested with Borders residents (currently 1/6 tested) | Concept untested; only "vs Alternative" clause is T1 | 2 | 2 | 2 | 0 | 2 | 12 | EXPERIMENT: concept-card preference test in fieldwork (folded into E-01) | DEFERRED |
| 7 | G-07 | SOLUTION_DESIGN | SOLUTION_ADEQUACY | Aha-moment (72hr planning story) tested with Borders residents | Untested; depends on staffed newsroom not yet present | 2 | 3 | 2 | 0 | 2 | 14 | EXPERIMENT (post-fieldwork) | DEFERRED |
| 8 | G-08 | GTM_PLAN | GTM_FEASIBILITY | Phase 1 CAC (<£40) validated against Borders Meta and DCT cross-promo data | T2 benchmark; not Borders-specific | 2 | 2 | 1 | 0 | 2 | 10 | RESEARCH: pull DCT cross-promo conversion data (folded into E-02) | DEFERRED |

Top-3 active (per Focus Rule): G-01, G-02, G-03. All three are addressable by the same fieldwork programme escalated in E-01 — they reduce together as one coherent action set.

Ties broken: G-01 and G-02 both score 21 (Blast=3). G-01 ranks first by alphabetical (PAIN_CLARITY < ECONOMIC_VIABILITY by gap dimension — but tie-break per CLAUDE.md is by blast (equal), then confidence gap (equal), then alphabetical by target: PROBLEM < UNIT_ECONOMICS).

---

## 4. Full Gap Records

### Gap: G-01
- **Target:** PROBLEM
- **Dimension:** PAIN_CLARITY
- **Desired Condition:** ≥30% of 20+ Borders residents across 4+ towns name "lack of daily local news" as a top-5 information frustration (T1).
- **Current Observation:** Pain inferred from UK news-desert research and weekly-cadence competitor structure. No Borders resident has been interviewed.
- **Evidence Reference:** hypotheses.md §1 Assumption 1 (T3, LOAD-BEARING, BLAST:HIGH).
- **Confidence Gap:** 2 (researched → supported)
- **Evidence Weakness:** 2 (mostly T2 with some T1 structural data, none Borders-specific)
- **Pain Uncertainty:** 3 (unclear whether felt as acute weekly pain)
- **Time Penalty:** 0
- **Blast Radius Weight:** 3
- **Final Priority Score:** 21

**Recommended Action**
- Type: INTERVIEW
- Description: Structured interviews with 20+ Borders residents stratified across at least 4 towns (Hawick, Galashiels, Peebles, Kelso/Jedburgh minimum). Problem-first protocol (do not present solution).
- Expected Output: T1 evidence on pain intensity, frequency, current workarounds, and willingness-to-pay framing.
- Evidence Target: T1

**Decision Rule Triggered:** Priority Rule, Readiness Gate Rule.

**Status:** ESCALATED (covered by E-01).

---

### Gap: G-02
- **Target:** UNIT_ECONOMICS
- **Dimension:** ECONOMIC_VIABILITY
- **Desired Condition:** ≥20% of 10+ Borders SMEs interviewed express willingness to commit a recurring advertising budget consistent with £150K–£400K/yr aggregate.
- **Current Observation:** Aggregate figure derived from UK local-ad benchmarks (Promo Media, CommunityAd). No Borders SME contacted.
- **Evidence Reference:** hypotheses.md §4 Assumption 2 (T3, LOAD-BEARING, BLAST:HIGH).
- **Confidence Gap:** 2
- **Evidence Weakness:** 2
- **Pain Uncertainty:** 3 (advertiser pain with current channels unknown)
- **Time Penalty:** 0
- **Blast Radius Weight:** 3
- **Final Priority Score:** 21

**Recommended Action**
- Type: INTERVIEW
- Description: 10+ SME interviews across hospitality, retail, professional services, agriculture, property — across 3+ towns. Test current ad spend, channel mix, satisfaction, recurring-budget appetite, and whether reader/advertiser dual-role assumption holds.
- Expected Output: T1 evidence on advertiser appetite and revenue-side base case.
- Evidence Target: T1

**Decision Rule Triggered:** Priority Rule, Readiness Gate Rule.

**Status:** ESCALATED (covered by E-01).

---

### Gap: G-03
- **Target:** SEGMENT
- **Dimension:** SEGMENT_CLARITY
- **Desired Condition:** Proxies (BT/SR readership, Borders Facebook groups, TD/EH postcodes) correlate with the proposed engaged-resident behaviours, and ≥10% survey conversion intent is observable.
- **Current Observation:** Segment definition is observable in principle but unmeasured; ~30–45K household estimate is T2 inference.
- **Evidence Reference:** hypotheses.md §2 Assumptions 1 and 2 (BLAST:MEDIUM and BLAST:HIGH).
- **Confidence Gap:** 2
- **Evidence Weakness:** 2
- **Pain Uncertainty:** 2
- **Time Penalty:** 0
- **Blast Radius Weight:** 3
- **Final Priority Score:** 18

**Recommended Action**
- Type: RESEARCH
- Description: Deploy an online survey via Borders Facebook groups and partner channels. Stratify by town and age band. Measure: current news consumption, willingness to pay, preferred format (digital/print/hybrid), trust of named brands including DCT/P&J.
- Expected Output: T1 segment validation and WTP distribution.
- Evidence Target: T1

**Decision Rule Triggered:** Priority Rule, Readiness Gate Rule.

**Status:** ESCALATED (covered by E-01).

---

### Gap: G-04
- **Target:** UNIT_ECONOMICS
- **Dimension:** ECONOMIC_VIABILITY
- **Desired Condition:** DCT internal cost data confirms shared-services marginal cost supports a sub-15K-subscriber title without disproportionate central overhead.
- **Current Observation:** T2 assertion. Internal data not available.
- **Confidence Gap:** 2 | **Evidence Weakness:** 2 | **Pain Uncertainty:** 1 | **Time Penalty:** 0 | **Blast Radius Weight:** 3 | **Final Priority Score:** 15

**Recommended Action**
- Type: ESCALATION
- Description: E-02 — request data from DCT finance, ad ops, and subscription teams.
- Expected Output: T1 internal cost model.
- Evidence Target: T1

**Decision Rule Triggered:** Priority Rule (deferred under Focus Rule).
**Status:** DEFERRED (covered by E-02).

---

### Gap: G-05
- **Target:** UNIT_ECONOMICS
- **Dimension:** GOVERNOR_DECISION_REQUIRED
- **Desired Condition:** Portfolio tolerance for a sub-scale title is explicitly stated, anchoring UE kill thresholds.
- **Current Observation:** Drafted kill thresholds (sub-2,500 paying at month 18) assume a tolerance that has not been ratified.
- **Confidence Gap:** 2 | **Evidence Weakness:** 3 | **Pain Uncertainty:** 0 | **Time Penalty:** 0 | **Blast Radius Weight:** 3 | **Final Priority Score:** 15

**Recommended Action**
- Type: ESCALATION
- Description: E-03 — governor values decision.
- Expected Output: explicit kill-threshold calibration.
- Evidence Target: n/a (values).

**Status:** DEFERRED (covered by E-03).

---

### Gap: G-06, G-07, G-08
Deferred under Focus Rule. G-06 (VP clause testing) and G-07 (aha-moment test) are downstream of fieldwork outcomes and should be folded into the E-01 fieldwork protocol rather than treated as independent tasks. G-08 (CAC/CPM validation) is folded into the E-02 internal data request.

---

## 5. Contradictions

| Contradiction ID | Between | Description | Impact | Required Resolution | Block Execution? |
|---|---|---|---|---|---|
| C-01 | Segment vs Solution Design + GTM | Segment evidence (Scottish Gov digital inclusion) says 23% of Scots 60–74 and 62% of 75+ are not internet users. Solution Design defers Saturday print to POST_MVP. GTM Phase 1 channels are 80%+ digital. The MVP is therefore digitally-gated against a meaningful slice of the 60+ subset of the engaged-40+ segment. | MEDIUM | Either (a) explicitly scope Phase 1 segment to "engaged 40–64", or (b) bring Saturday print or a print-introduction channel forward into MVP, or (c) accept the constraint and document the expected segment-reach loss. | No (does not block fieldwork; will block pilot launch if unresolved). |

No other contradictions detected. The Growth Architecture's required conditions (DCT cross-promo permission, paywall mechanism, ad sales function, journalist recruitment) are all PROPOSED — not yet contradicted by evidence but unverified. Architecture Validity Rule (§7) flags this as a soft block on architecture-dependent execution.

---

## 6. Destruction Outcomes

### Pre-Mortem Summary

**12-month failure scenario (month-by-month causal chain):**

Months 0–4: Fieldwork is deferred or short-cut to "light-touch survey" (E-01 Option B) under cost pressure. The two HIGH-blast T3 assumptions (resident pain acute enough to pay, SME advertiser appetite at £150K+) are not stress-tested with real Borders interviews.

Months 4–8: Pilot launches in 1–2 towns on the back of structural inference. Cross-promotion to DCT existing subscribers produces decent free-tier signups (because cross-promo always converts the easy fringe), masking the underlying segment economics. Free-to-paid conversion sits at 1–2% instead of 3–6% because the modal Borders resident over 50 reads the weekly Border Telegraph and Facebook and does not feel daily urgency.

Months 8–12: Paid subscribers stuck at 600–900 (vs 1,500 target). Advertiser revenue stuck at £40–80K (vs £200K target) because SMEs who advertise in the weekly Border Telegraph are satisfied at £100–500/week rates and the daily product does not move the needle for them. Blended CAC rises through £60 because the fringe was already harvested. The Phase 1 kill criteria (<500 paying at month 9, CAC >£80) are both approached but not breached, putting the title in "promising but underperforming" purgatory.

Month 12 outcome: Strategy did not fail catastrophically. It failed by producing a small, undecidable result that exhausts political tolerance inside DCT (E-03 unresolved) without producing a clear signal. The dominant causal factor is **proceeding to pilot without resolving the three T3 HIGH-blast assumptions first** — every downstream metric was contaminated by the inability to separate execution quality from underlying demand.

**What was missed in the register:** The register identifies the assumptions correctly. What it underweights is the **scenario where pilot results are ambiguous** rather than clearly pass/fail. The kill conditions are tuned for clear failure; they are not tuned for slow, ambiguous bleed.

### Red-Team Summary

**Incumbent: Newsquest (owner of Border Telegraph).**

90-day response to a publicly visible DCT entry into the Borders daily space:

1. **Days 0–30:** Newsquest accelerates the Border Telegraph paywall and digital push. They have already hit a 50,000-digital-subscriber milestone across Newsquest Scotland; Borders is a small but defensible slice and they will not concede it cheaply. Likely move: aggressive £1-for-3-months trial across Border Telegraph digital, pushed via Facebook in Borders catchment.
2. **Days 30–60:** Newsquest moves the Border Telegraph to a Wednesday + Saturday cadence (twice-weekly) rather than weekly. This is cheap (they already have the newsroom) and directly attacks the "daily vs weekly" differentiator by shrinking the gap to "daily vs semi-weekly". The unique-capability claim ("editorial speed plus town-level specificity at a scale no current competitor offers") loses force.
3. **Days 60–90:** Newsquest signs exclusive content/distribution partnerships with the council, agricultural shows, or sports clubs — locking out the new entrant from local-trust signals.

**Impact on strategy:**
- VP "daily cadence vs weekly" weakens directly. Re-frame may be required toward "daily plus town-level depth plus DCT standard" — the cadence alone is no longer the unique capability.
- Unit Economics CAC assumptions degrade as Newsquest bids up Borders Meta ad inventory.
- GTM Phase 1 kill criteria need revision to account for incumbent counterpunch — current criteria assume incumbent passivity.

**Trace:** Affects §3 VP claim, §4 CAC assumptions, §7 GTM kill criteria.

### Constraint Inversions

| Assumption | Inversion | Consequence | Survival |
|---|---|---|---|
| §1.A1 — Residents feel daily-cadence absence as weekly pain (T3 HIGH) | They do not; weekly + Facebook is "good enough" for >70% | Problem hypothesis BROKEN; daily-product framing fails; pivot to VP2 (newsletter, depth-led) or P2 (depth-not-cadence) | NO |
| §1.A2 — Town identity is compatible with regional masthead (T2 HIGH) | Towns reject "Borders" framing; demand town-specific products | VP1 invalidated; fragments to VP4; Unit Economics likely unviable per-town | NO |
| §2.A2 — Segment size ~30–45K with 10–20% reachable conversion (T3 HIGH) | True engaged-40+ count is closer to 15–20K, with 5% reachable conversion = 750–1,000 paying | UE base case collapses; only UE2 (digital-only newsletter) survives | WITH_MODIFICATION |
| §2.A4 — SMEs are dual-role reader + advertiser (T2 HIGH) | Disjoint sets; advertiser sales motion is fully independent of subscriber funnel | GTM Phase 1 needs separate sales hire from Day 1; CAC for advertisers different; UE base case advertising revenue at risk | WITH_MODIFICATION |
| §4.A1 — 10–20% conversion at ~£9/mo achievable in 24–36mo (T3 HIGH) | Conversion peaks at 4–6% | Base case collapses to pessimistic scenario; loss-making at -£90K/yr | NO unless costs reduced (UE2) |
| §4.A2 — SME advertising £150K–£400K/yr (T3 HIGH) | Achievable £50–100K/yr only | UE optimistic and base cases both fail | WITH_MODIFICATION (digital-only fallback) |
| §4.A3 — DCT shared services materially reduce marginal cost (T2 HIGH) | Central overhead allocated at parity with P&J — no scale benefit at sub-15K subs | UE1 hybrid model collapses to UE2 newsletter model | WITH_MODIFICATION |
| §5/§6 — DCT cross-promotion is permitted and prioritised | Internal allocation prioritises P&J/Courier; Borders gets <10% of cross-promo impressions | Phase 1 CAC rises 20–40%; key low-cost channel removed | WITH_MODIFICATION |

Inversion summary: of 8 inverted assumptions, **2 are strategy-killing** (resident pain, town vs regional framing) and **6 require modification** (most commonly: pivot from UE1 hybrid to UE2 newsletter, or de-scope the segment). The strategy is concentrated on these eight; only one (cadence-as-structural-civic-lag, §1 Assumption 3) is T1 and survives inversion.

### Evidence Concentration Risk

| Source | Claims Supported | Risk Level | Required Mitigation |
|---|---|---|---|
| [Press Gazette](https://pressgazette.co.uk/) (multiple articles) | Problem (closures, regional decline), Segment (DCT digital subs), Unit Economics (subscriber economics, ad decline), VP (DCT revenue) | CONCENTRATED | Triangulate with non-Press-Gazette industry data (Ofcom, IBISWorld supplements, Reuters Institute Digital News Report). |
| [Poynter — Mill Media](https://www.poynter.org/business-work/2025/manchester-mill-joshi-herrmann-newsletters-local-news/) | Problem (demand exists where supplied), Segment (older skew), Unit Economics (£7/mo viability), VP (alternative VP2 model) | CONCENTRATED | This single article is the analog evidence base. Replace with primary Mill Media revenue disclosures or alternative analogs (Tortoise, Sheffield Tribune separately, Liverpool Post separately, US Substack-local). |
| [DC Thomson properties](https://www.dcthomson.co.uk/brands/the-press-journal/) | VP (model template), Unit Economics (P&J ARPU/conversion), Growth Architecture (cross-promo), GTM (positioning) | CONCENTRATED — and internal to the operating parent | Cross-check P&J performance with independent ABC and Press Gazette circulation/sub data, not just DCT corporate marketing. |
| [Scottish Borders Council research](https://www.scotborders.gov.uk/council-2/research-data/2) | Segment (population, digital inclusion) | OK (T1 official source, narrowly used) | None required. |
| Borders resident voices | **ZERO claims supported** — the most important source for resident-pain, segment-WTP, VP-resonance, and solution-adequacy claims | CONCENTRATED-BY-ABSENCE | E-01 fieldwork. This is the structural fix for the entire register. |

### Kill Signal Audit

| Signal | Observed? | Ignored? | Consequence |
|---|---|---|---|
| §1 Kill: <30% of 20+ residents naming daily-news absence as top-5 frustration | Not observed (no fieldwork done) | n/a — no data to ignore | Cannot audit until fieldwork runs. The absence of any T1 resident voice is itself a signal that the kill condition is unobservable, which is a register-quality issue. |
| §1 Kill: dominant unmet need is town-only with rejection of regional | Not observed | n/a | Same as above. |
| §2 Kill: <5,000 Borders adults match observable proxies | Partially observable from public data; estimate ~30–45K households remains T2 | No | Within tolerance — but verification deferred to fieldwork. |
| §2 Kill: <10% segment willingness to pay any monthly sub | Not observed | n/a | Cannot audit. |
| §3 Kill: <25% prefer daily Borders-wide vs weekly + Facebook | Not observed | n/a | Cannot audit. |
| §4 Kill: modelled or actual LTV:CAC <2x AND ad rev <£150K — both — at end of Phase 1 | Not observable pre-pilot | n/a | Pilot-stage signal. |
| §7 Phase 1 Kill: <500 paying at month 9, CAC >£80 at month 9 | Not observable pre-pilot | n/a | Pilot-stage signal. |
| **Hidden signal (red-team): incumbent counter-move** | Not currently observed; the register does not model this as a kill condition. | YES (implicitly) | If Newsquest tightens Border Telegraph cadence to semi-weekly during pilot, the VP claim of "daily vs weekly" weakens. No kill condition in §3 VP captures incumbent response. This is a register gap. |

**Ignored-signal finding:** The register's kill conditions are all internally-referenced (do residents/SMEs/advertisers behave as predicted?). None capture incumbent action. Recommend adding an "incumbent response kill condition" to §3 VP and §7 GTM in a future Strategist pass — but this is a quality observation, not a current blocker.

---

## 7. Decision Rules Application

### Rule 1 — Priority Rule
- Highest `(gap score x blast radius)` currently is: **G-01 (PROBLEM / PAIN_CLARITY) — score 21.**
- Tied at 21: G-02 (SME advertiser). Tie broken alphabetically by target (PROBLEM < UNIT_ECONOMICS). Both G-01 and G-02 are addressed by the same fieldwork programme (E-01) and are issued together as paired tasks.
- Reason it is first: highest priority score AND it is the load-bearing claim on which Problem confidence rests AND its falsification cascades fastest (if resident pain is not real, every other section requires re-framing).

### Rule 2 — Execution Rule
- Valid active tasks (reduce a top-3 gap AND produce T1 or T2 evidence):
  - **T-01 Borders resident fieldwork** (reduces G-01 and G-03, produces T1).
  - **T-02 Borders SME advertiser fieldwork** (reduces G-02, produces T1).
  - **T-03 DCT internal data request** (reduces G-04 — note G-04 is rank 4, NOT top-3; but it is a dependency of UE viability that the governor must initiate; reclassified below as escalation execution, not gap-reduction execution).
- Rejected tasks: none currently active. (Prior queue tasks T-01/T-02/T-03 from a prior cycle were deleted per git status — recreated under new IDs below.)

### Rule 3 — Evidence Promotion Rule
- No hypothesis is currently marked SUPPORTED. No reclassification needed downward.
- No hypothesis is eligible for promotion to SUPPORTED in this pass — none has T1 ground-truth from Borders.

### Rule 4 — Kill Rule
- No kill condition met. No strong contradictory T1 evidence observed.
- No hypothesis marked BROKEN.

### Rule 5 — Deadline Rule
- No explicit decision deadlines have been set in the register. Recommend: governor sets a deadline of **2026-07-31** for fieldwork completion (12 weeks from this pass) to prevent indefinite exploration. Flagged for governor action, not autonomously imposed.

### Rule 6 — Contradiction Rule
- C-01 (segment digital inclusion vs digital-only MVP): MEDIUM impact. Does not block fieldwork. Will block pilot launch if not resolved. Flagged to Strategist for next CHALLENGE pass.

### Rule 7 — Architecture Validity Rule
- Growth Architecture (§6) required conditions are all PROPOSED, none verified:
  1. DCT cross-promotion permission — UNVERIFIED. Folds into E-02.
  2. Paywall mechanism — likely OK (existing DCT capability) but unconfirmed for Borders title.
  3. Human ad sales function — staffing not committed.
  4. Editorial team recruitment — open hypothesis, no recruitment pipeline tested.
- Action: architecture-dependent execution (pilot launch, channel commits, hiring) is **BLOCKED** until conditions verified. Fieldwork is not architecture-dependent and is unblocked.

### Rule 8 — Solution Contamination Rule
- All currently proposed tests (E-01 fieldwork) are problem-first by mandate. None present DCT branding or product concept before establishing problem.
- One risk to flag: the VP concept-card test (G-06, folded into E-01) must be sequenced AFTER the problem and segment interviews complete in each session — not before — to avoid contaminating the pain-clarity signal. Add to fieldwork protocol.

### Rule 9 — Readiness Gate Rule
- **sell_ready = false.** (Three of four conditions pass; "no HIGH-blast unresolved blocker" fails on E-01 + three T3 HIGH-blast assumptions.)
- **scale_ready = false.** (Four of five conditions fail.)

### Rule 10 — Focus Rule
- Active gaps: G-01, G-02, G-03 (3/3 — at cap).
- Deferred: G-04, G-05, G-06, G-07, G-08. Deferral rationale per gap recorded in §3 and §4.

---

## 8. Readiness Handoff

### Approved Actions for Downstream Systems
- **None for RevenueOS / StyleOS / EngineeringOS.** Strategy is not sell_ready. No execution authority is granted.
- Governor-side fieldwork is the only authorised forward action.

### Explicitly Forbidden Actions
- No pilot launch in any Borders town.
- No marketing spend on Meta / direct mail / paid search.
- No hiring of journalists or commercial staff for the Borders title.
- No public positioning or product-name commitment.
- No advertiser commercial outreach beyond research interviews.

### Allowed Constraints (for fieldwork design only)
- Target segment for research: engaged Borders residents 40+ in TD1–TD15 and EH44–EH46; plus SME owners across hospitality, retail, professional services, agriculture, property.
- Pricing bounds for WTP probing: £6–£15/month (covers Mill £7, P&J £10–15, and floor below which UE collapses).
- Architecture mode (provisional): HYBRID (digital + Saturday print, sales-assisted advertising).
- Offer framing for fieldwork: do **not** lead with product concept; problem-first protocol.
- Channels for research deployment: Borders Facebook groups, direct intercept in market towns, partner channels (council, BSC, BCofC, Live Borders), email via Border Telegraph/Southern Reporter if available.

### Success Signals Downstream (Fieldwork) Should Return
- ≥30% of resident respondents naming daily-news absence in top-5 information frustrations.
- ≥10% of survey respondents stating willingness to pay ≥£6/month for a daily Borders product.
- ≥20% of SMEs interviewed expressing willingness to commit a recurring advertising budget.
- ≥60% of respondents recognising "DC Thomson" or "Press and Journal" brand.

### Failure Signals Downstream Should Return Immediately
- Dominant unmet need expressed as town-only with explicit rejection of regional product → triggers Problem kill condition.
- <10% segment willingness to pay anything → triggers Segment kill condition.
- <15% of SMEs interested → triggers Unit Economics advertising-side collapse.
- Strong Newsquest counter-move signal (Border Telegraph announces cadence change) → triggers VP re-evaluation.

---

## 9. Governor Escalations

### Escalation: E-01 — Borders fieldwork mandate (resident + SME)
- Decision Type: JUDGMENT + values + resource allocation
- Blast Radius: HIGH
- Decision Needed: Authorise and fund ground-truth fieldwork (residents + SMEs) before any pilot spend is committed.
- Why System Cannot Decide: Cannot generate T1 evidence autonomously; values + budget decision belongs to governor.
- Options:
  - A: Full fieldwork (~£15K–£40K + 8–12 weeks) → resolves G-01, G-02, G-03 in one programme. **Recommended.**
  - B: Light-touch survey only (~£5K, 4 weeks) → resolves G-03 partially; G-01/G-02 remain T3.
  - C: Skip fieldwork; pilot directly → defers risk by collapsing it into execution; high capital exposure.
- System Recommendation: A.
- What Is at Stake: Three HIGH-blast T3 assumptions remain unvalidated. Without A, no advance to sell_ready is possible.
- Status: OPEN.

### Escalation: E-02 — DCT shared-services cost allocation and cross-promo data
- Decision Type: JUDGMENT (internal-data ask)
- Blast Radius: HIGH
- Decision Needed: Obtain DCT internal data on shared-service marginal cost, cross-promo CPM/conversion, and any P&J Borders-area subscriber baseline.
- Why System Cannot Decide: Data lives inside DCT and is unavailable externally.
- Options:
  - A: Request from DCT finance, ad ops, subs teams. **Recommended.**
  - B: Proceed with industry proxies; flag for CHALLENGE mode update later.
- System Recommendation: A.
- What Is at Stake: If shared services do not scale to sub-15K, UE1 hybrid collapses to UE2 newsletter — different solution shape.
- Status: OPEN.

### Escalation: E-03 — DCT portfolio tolerance for sub-scale title
- Decision Type: VALUES
- Blast Radius: HIGH
- Decision Needed: Confirm DCT's tolerance for a title whose realistic ceiling may be 6–8K paying subscribers.
- Why System Cannot Decide: Portfolio strategy is a governor / DCT leadership values decision.
- Options:
  - A: Accept small-but-contribution-positive as success → current kill thresholds hold.
  - B: Require P&J-scale ambitions (15K+) → register changes needed (segment broader than Borders; VP changes; UE re-cast).
  - C: Treat as defensive/civic-purpose play → different success criteria altogether.
- System Recommendation: none (governor-only).
- What Is at Stake: Calibration of every kill threshold in §4 and §7.
- Status: OPEN.

---

## 10. Next Cycle Plan

**Top 3 actions for next pass**
1. Run governor-mandated Borders resident fieldwork per E-01 (T-01).
2. Run governor-mandated Borders SME advertiser fieldwork per E-01 (T-02).
3. Initiate DCT internal data request per E-02 (T-03).

**Expected register changes if successful**
- Problem confidence moves RESEARCHED → SUPPORTED (or BROKEN if kill condition met).
- Segment confidence moves RESEARCHED → SUPPORTED (or scope-revised).
- Unit Economics advertising-side assumption (§4.A2) moves T3 → T1.
- Unit Economics shared-services assumption (§4.A3) moves T2 → T1.
- VP clause table — at least 3 of 6 clauses move from untested to tested.

**Re-run date:** 2026-07-31 (or sooner on receipt of governor responses to E-01/E-02/E-03).
