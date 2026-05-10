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
