# Gap Definer Action Queue

**From:** gap-definer
**Date:** 2026-05-09
**Pass:** 3 (post CHALLENGE Pass 3 — governor correction on DCT newsletter model)
**Sell Ready:** false
**Scale Ready:** false
**Decision:** NO_GO
**Supersedes:** (no prior queue — clean slate from 2026-05-09)

---

## Top 3 Actions (Validation Sequence — Phase 0)

Ranked by Final Priority. All three are HIGH-blast (blast=3). G-01 is the critical path — G-02 Track A runs from T-01 sample data; G-03 runs in parallel.

---

# T-01 — Borders Resident Fieldwork (Problem)

**Issued:** 2026-05-09
**Issued by:** Gap Definer
**Reduces gap:** G-01 (PROBLEM, PAIN_CLARITY, priority 21)
**Action type:** INTERVIEW + RESEARCH
**Evidence target:** T1
**Status:** OPEN — pending governor decision on E-01 (deadline) and E-02 (budget)

## Objective

Produce T1 ground-truth evidence on whether assumptions A1 (cadence-gap pain real) and A2 (behaviour-change intent for daily local product) hold for Borders adults.

## Method

1. **Survey (n>=200)** stratified by:
   - Postcode: TD1-TD15 + EH43-EH46.
   - Town affiliation: Hawick, Galashiels, Peebles, Kelso, Jedburgh, Selkirk, Eyemouth, Duns, other.
   - Length-of-residence band: <5 / 5-15 / >15 years.
   - Age band: 35-54 / 55-64 / 65+.
2. **Depth interviews (n>=15)** with respondents recruited from the survey, mixed across towns and length-of-residence.

## Probes (problem-led; do NOT use §7 messaging copy)

A. **Cadence/depth dissatisfaction.** "How do you currently find out what is happening in your town this week? When did you last feel a piece of local news arrived too late to be useful? What did you do instead?"

B. **Workarounds.** Open enumeration of current sources (weeklies, BBC, FB groups, word of mouth) and self-rated satisfaction with each.

C. **Brand-architecture preference (the corrected G-01 probe per 2026-05-08 — replaces withdrawn paid-vs-free probe).** Forced-choice between (i) one cross-Borders daily product, (ii) per-town editions under one brand, (iii) town-only product, (iv) status quo / no daily product needed.

D. **Behaviour-change intent.** Likelihood-to-use scale across plausible price points (free with ads, £3/mo, £6/mo, weekly print companion £180/yr). Note: pricing is a research probe, not a commercial commitment.

## Kill thresholds (per §1 Kill Condition)

- <30% of survey respondents express dissatisfaction with current local news cadence/depth → mark Problem BROKEN.
- <10% express purchase intent for a daily local product at any plausible price → mark Problem BROKEN.

## Methodology guardrails

- Problem-first: do NOT present a solution or product concept before pain probes are complete.
- Recruitment must be vendor-panel-based for survey integrity (E-02 Option B recommended); founder-led for depth interviews acceptable.
- Pre-register the analysis plan before fieldwork starts.
- Do NOT use §7 messaging headlines ("The Borders, every day.") in the survey; that would test VP resonance, not problem reality, and would be solution-contaminated (Rule 8).

## Expected output

- Quantified A1 dissatisfaction rate.
- Quantified A2 behaviour-change-intent rate by price point.
- Quantified A5 cross-Borders vs town-loyalty preference (also feeds T-02 / G-02).
- Qualitative texture of workarounds and dissatisfaction language.

## Pre-conditions before this task can start

- E-01 resolved (deadline set).
- E-02 resolved (budget approved; recruitment vendor selected).

## Re-classification on completion

- Pass thresholds: A1, A2 promoted; Problem moves toward SUPPORTED.
- Fail thresholds: Problem marked BROKEN; strategy escalates to governor for pivot/halt decision.

---

# T-02 — Segment Stratification + Channel CPL Test

**Issued:** 2026-05-09
**Issued by:** Gap Definer
**Reduces gap:** G-02 (SEGMENT, SEGMENT_CLARITY, priority 18)
**Action type:** RESEARCH + INTERVIEW
**Evidence target:** T1
**Status:** OPEN — pending governor decision on E-01 / E-02

## Objective

Produce T1 ground-truth evidence on:
- S1: 30-50K addressable adult readership is real, not aspirational.
- S2: Borders towns share a regional identity sufficient for one product to serve them all.
- S3: 35+ digitally-fluent locals can be reached via Facebook ad targeting and existing weekly subscriber lists.

## Method

### Track A — Segment stratification (bundled with T-01)

Analyse the T-01 n>=200 sample by:
1. Town × age × length-of-residence cross-tabs.
2. Filter-pass rate: % of TD/EH-Borders adults 35+ meeting all three primary filters (length-of-residence >5y + existing local-news consumption + smartphone ownership).
3. Forced-choice from T-01 probe C: cross-Borders daily / per-town editions / town-only / status quo.
4. Pain score by town (any town with pain <2 average → segment-fragmentation signal).

### Track B — Postcode-targeted Facebook signup CPL test

Run a small-budget paid Facebook campaign (£500-£1,500, ~2-4 weeks):
- Geofenced to TD1-TD15 + EH43-EH46.
- Audience: Facebook interest = local news / Borders towns / Scottish news; age 35+.
- Creative: town-specific neutral problem framing ("News from [Town] — sign up to be told when it launches"). NO product description. NO pricing. NO §7 messaging copy.
- Measure: CPL by town; town-level interest distribution; whether signups skew to one town disproportionately.

## Kill thresholds (per §2 Kill Condition)

- <25% of adults 35+ in TD/EH-Borders meet all three primary filters → segment ceiling below 22-29K (rather than 30-50K) → Segment requires reframing or BROKEN.
- >40% prefer town-only product → cross-Borders identity rejected → Segment requires PIVOT to per-town launch sequence (Hawick or Galashiels first).

## Methodology guardrails

- Track B creative must NOT promise a daily product or quote a price. Test channel reach, not VP resonance.
- Track B audience must NOT use lookalikes from any prior solution-focused signup list.

## Expected output

- Stratified S1 ceiling estimate by town.
- Quantified S2 cross-Borders identity preference.
- CPL by postcode and by town for S3.
- Channel-mix recommendation for any future Phase 1 GTM.

## Pre-conditions

- T-01 fielding underway (Track A is analysis of the T-01 sample).
- E-01 / E-02 resolved.

## Re-classification on completion

- Cross-Borders preference >60%, filter-pass >25%, CPL <£10: S1, S2, S3 promoted toward SUPPORTED.
- Town-only preference >40%: Segment PIVOT to per-town launch; §2 reframed by Strategist.
- Filter-pass <25%: Segment BROKEN (addressable too small for U1 base case).

---

# T-03 — AI Production Trial + Borders SME Advertiser Interviews

**Issued:** 2026-05-09
**Issued by:** Gap Definer
**Reduces gap:** G-03 (UNIT_ECONOMICS, ECONOMIC_VIABILITY, priority 18)
**Action type:** EXPERIMENT + INTERVIEW
**Evidence target:** T1 (advertiser interviews) + T2 (production trial cost data)
**Status:** OPEN — pending governor decision on E-01 / E-02

## Objective

Produce evidence to ground-truth two of the highest-blast Unit Economics assumptions:
- U3: AI-assisted production reduces per-story cost by 30-50% vs traditional newsroom.
- U4: Local advertiser appetite generates £8-£25 per reader/year.

## Track A — AI-assisted production trial

### Method

1. Define a representative story mix (20-30 stories total) reflecting the §6 Solution Design feature map: court reporting, council coverage, community events, town-tagged news.
2. Produce the same mix twice:
   - **Arm 1 (AI-assisted):** LLM stack drafts from primary sources (council minutes, court lists, press releases); editor reviews, fact-checks, and rewrites for byline.
   - **Arm 2 (traditional baseline):** journalist drafts from same primary sources; editor reviews.
3. Measure per-story:
   - Total human time (drafting + editing + fact-check) in minutes.
   - Inference cost (£) for Arm 1.
   - Quality score by independent editor (rubric: accuracy, locality, readability, byline-defensibility).

### Threshold

- U3 holds if Arm 1 per-story cost is 30-50% lower than Arm 2 AT EQUAL OR HIGHER quality.
- U3 falsified if Arm 1 cost reduction <20%, OR quality score significantly lower, OR fact-error rate higher.

### Methodology guardrails

- Editor scoring blinded to arm where possible.
- Sources of stories must overlap (same primary-source set processed by both arms).
- Inference budget capped (£50-£150 total) — this is a cost-realism trial, not a quality showcase.

## Track B — Borders SME advertiser interviews

### Method

Conduct n>=10 structured interviews with Borders SMEs across at least 4 towns and at least 3 sectors (e.g. retail, hospitality, professional services, property, automotive).

### Probes

- Current advertising spend by channel (print weekly, Facebook, Google, radio, leaflets) and £/year.
- Stated willingness to pay for guaranteed local audience by reader count tier (e.g. "would you pay £X/month to reach Y verified Borders readers").
- Pricing-anchor question: present industry CPM ranges; ask where they would price a Borders daily product.
- Constraints: minimum-buy size, ad format preference, attribution expectations.

### Threshold

- U4 holds if median willingness-to-pay implies £8-£25/reader/yr at plausible reader counts (3K-8K).
- U4 falsified if median implies <£5/reader/yr → Unit Economics requires PIVOT to membership-primary revenue model.

### Methodology guardrails

- Problem-led: ask about current advertising frustrations BEFORE pitching the proposed product.
- No commitment-seeking: this is research, not pre-sales.

## Expected output

- Measured per-story cost and quality for U3, with recommendation: U3 holds / falsified / requires re-design.
- Advertiser willingness-to-pay range for U4, with recommendation: U4 holds / falsified / pivot.
- Updated §3 base case with measured ranges replacing inferred ones.

## Pre-conditions

- E-01 / E-02 resolved.
- AI stack scoped (LLM API + minimal editorial workflow). T-03 inference budget capped under £150.

## Re-classification on completion

- U3 + U4 both hold: §3 inputs promoted from T2/T3 to RESEARCHED with measured bands; base case tightened.
- U3 fails: §3 cost structure must be re-modelled without AI leverage; UE likely BROKEN at current scale.
- U4 fails: §3 revenue model pivots to membership-primary; pricing recalibrated; full reframe required.

---

## Deferred Actions (Focus Rule — max 3 active)

G-04 (VALUE_PROPOSITION), G-05 (GROWTH_ARCHITECTURE), G-06 (SOLUTION_DESIGN), G-07 (GTM_PLAN) deferred. All depend on G-01/G-02/G-03 outputs. Re-evaluate after T-01/T-02/T-03 complete.
