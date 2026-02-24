---
name: crt-validating-economics
description: Validates unit economics coherence and pricing viability. Use when reviewing business model, CAC/LTV ratios, motion-economics fit, or cost structure sustainability.
license: Complete terms in LICENSE.txt
serves: strategy
domain: product
affects: revenue
---

# Critique Business Model


## Reads

| Source | Purpose |
|--------|---------|
| `strategy/canvas/*.md` | Business model components (mode, pricing, metrics, costs, GTM) |
| User brief/conversation | Specific aspects to evaluate |

## Writes

| Output | Content |
|--------|---------|
| Inline critique | Viability assessment with unit economics evaluation, mode alignment, and sustainability analysis |

## Critique Scope

Reviews coherence across:
- 12.revenue.md (pricing, revenue model)
- 13.metrics.md (unit economics, KPIs)
- 14.costs.md (cost structure)
- 15.gtm.md (motion economics)

## Financial Coherence Checks

### Check 1: Price-Value Alignment

```yaml
check: price_value_alignment
inputs:
  - 07.uvp: Value proposition
  - 12.revenue: Pricing
  
criteria:
  - Price ≤ 20-30% of value delivered
  - Value can be quantified
  - Customer can perceive value
  
red_flags:
  - Price with no value anchor
  - Value vague ("save time")
  - Price > perceived value
```

### Check 2: Unit Economics Viability

```yaml
check: unit_economics_viable
inputs:
  - 13.metrics: CAC, LTV, payback
  - 00.mode: Business mode
  
criteria:
  venture:
    ltv_cac: ">2:1 acceptable, >3:1 target"
    payback: "<24 months"
    
  bootstrap:
    ltv_cac: ">4:1 required"
    payback: "<12 months"
    profitable: "From day 1"
    
red_flags:
  - LTV:CAC <2:1
  - Payback >24 months
  - Math errors in calculations
  - Unrealistic assumptions
```

### Check 3: Motion-Economics Fit

```yaml
check: motion_economics_fit
inputs:
  - 15.gtm: Motion type
  - 12.revenue: ACV
  - 13.metrics: CAC
  
criteria:
  plg:
    acv: "<$5K"
    cac: "<$500"
    
  sales_assisted:
    acv: "$5K-$50K"
    cac: "$500-$5K"
    
  slg:
    acv: ">$25K"
    cac: "$5K-$25K"
    
red_flags:
  - PLG with high-touch sales costs
  - SLG with low ACV
  - CAC exceeds reasonable for motion
```

### Check 4: Cost Structure Sustainability

```yaml
check: cost_sustainability
inputs:
  - 14.costs: Cost breakdown
  - 12.revenue: Revenue
  - 00.mode: Mode
  
criteria:
  gross_margin: ">70% for SaaS"
  burn_multiple: "<2x (burn/revenue)"
  runway: ">18 months"
  
red_flags:
  - Gross margin <60%
  - No path to profitability
  - COGS scale with revenue 1:1
```

### Check 5: Growth Model Coherence

```yaml
check: growth_model
inputs:
  - 13.metrics: NRR, retention
  - 15.gtm: Growth loops
  
criteria:
  nrr: ">100% (growing base)"
  churn: "<5% monthly"
  expansion: "Path defined"
  
red_flags:
  - NRR <90% (shrinking base)
  - No expansion mechanism
  - High churn ignored
```

## Math Validation

### Unit Economics Recalculation

```python
# Verify stated metrics match inputs

# LTV calculation
arpu = monthly_price
gross_margin = 1 - cogs_percent
lifetime = 1 / monthly_churn
ltv = arpu * gross_margin * lifetime

# CAC calculation
cac = monthly_sm_spend / new_customers

# Ratios
ltv_cac = ltv / cac
payback = cac / (arpu * gross_margin)

# Flag mismatches >10%
```

### Sanity Checks

| Check | Formula | Reasonable Range |
|-------|---------|------------------|
| Gross margin | (Revenue - COGS) / Revenue | 70-90% for SaaS |
| S&M as % revenue | S&M / Revenue | 20-50% |
| R&D as % revenue | R&D / Revenue | 15-25% |
| G&A as % revenue | G&A / Revenue | 10-15% |
| Burn multiple | Net Burn / Net New ARR | <2x |

## Mode-Specific Critique

### VENTURE Mode

| Aspect | Acceptable | Red Flag |
|--------|------------|----------|
| LTV:CAC | >2:1 | <2:1 |
| Payback | <24 months | >24 months |
| Gross margin | >60% | <50% |
| Growth | >100% YoY | <50% YoY |
| Profitability | Negative OK | Unclear path |

### BOOTSTRAP Mode

| Aspect | Required | Red Flag |
|--------|----------|----------|
| LTV:CAC | >4:1 | <3:1 |
| Payback | <12 months | >12 months |
| Gross margin | >70% | <60% |
| Profitability | Near-term | No path |
| Cash flow | Positive soon | Negative indefinitely |

## Process

### Step 1: Gather Inputs [S]

```
Read:
- 12.revenue.md → pricing, model, tiers
- 13.metrics.md → CAC, LTV, retention
- 14.costs.md → cost structure, burn
- 15.gtm.md → motion type
- 00.mode.md → mode constraints
```

### Step 2: Run Checks [R]

```
For each coherence check:
1. Extract relevant values
2. Apply criteria
3. Flag issues
4. Score 1-5
```

### Step 3: Validate Math [R]

```
1. Recalculate unit economics
2. Compare to stated values
3. Flag discrepancies >10%
4. Note missing calculations
```

### Step 4: Assess Coherence [K-grounded]

**Grounded in:** Steps 1–3 outputs (canvas section values, check results, math validation). Assess: (1) Does pricing from 12.revenue match the motion's CAC expectations from Check 3? (2) Does CAC from 13.metrics align with channel costs implied by 11.channels? (3) Do cost margins from 14.costs support the gross margin used in the LTV calculation? (4) Does the growth model in 15.gtm produce the NRR and expansion implied in 13.metrics? Do not assert coherence or incoherence without citing specific values from the canvas sections. If a section is missing, note: "Coherence check [X] cannot complete — [section] not populated."

## Edge Cases

| Situation | Recovery |
|-----------|----------|
| Canvas sections missing (e.g., no 14.costs.md) | Run checks on available sections; skip checks requiring missing sections; note: "Check [N] skipped — [section] not populated" |
| Unit economics not yet calculated (early-stage canvas) | Note: "Unit economics absent — cannot validate viability"; flag as critical gap; do not fabricate estimates |
| Mode not declared (no 00.mode.md) | Apply BOOTSTRAP thresholds as conservative default; flag: "Mode not declared — BOOTSTRAP thresholds applied; verify mode" |
| Math is consistent but assumptions are unrealistic (e.g., 0% churn) | Flag the assumption explicitly: "Calculation is internally consistent but assumes [X] — flag as high risk if assumption does not hold" |
| Numbers contradict across sections (e.g., 12.revenue ARPU ≠ 13.metrics ARPU) | Flag all cross-file mismatches in Check consistency; do not pick one value as correct — surface the conflict |
| Bootstrap business with venture-level LTV:CAC (looks great) | Note: unusual result; verify inputs; if correct, call out as positive outlier |

## Boundaries

### In Scope
- Evaluating unit economics viability (CAC, LTV, payback)
- Validating pricing-value alignment
- Checking motion-economics fit
- Assessing cost structure sustainability
- Analyzing growth model coherence
- Mode compliance verification
- Math validation and recalculation

### Out of Scope
- Creating or modifying business model → Use `canvas` skill
- Market research or data collection → Requires external research
- Financial projections beyond unit economics
- Competitive pricing analysis → Requires market data
- Implementation of changes → Analysis only

## Output Template

```markdown
## Business Model Critique

### Overall Viability: {Viable | At Risk | Not Viable}

### Unit Economics Review
| Metric | Stated | Calculated | Status |
|--------|--------|------------|--------|
| CAC | ${X} | ${Y} | ✅/❌ |
| LTV | ${X} | ${Y} | ✅/❌ |
| LTV:CAC | {X}:1 | {Y}:1 | ✅/❌ |
| Payback | {X} mo | {Y} mo | ✅/❌ |

### Coherence Checks
| Check | Status | Issue |
|-------|--------|-------|
| Price-Value | ✅/❌ | {if issue} |
| Unit Economics | ✅/❌ | {if issue} |
| Motion-Economics | ✅/❌ | {if issue} |
| Cost Sustainability | ✅/❌ | {if issue} |
| Growth Model | ✅/❌ | {if issue} |

### Mode Compliance ({mode})
| Requirement | Status |
|-------------|--------|
| {requirement} | ✅/❌ |

### Critical Issues
1. {Most serious issue}
2. {Second issue}
3. {Third issue}

### Recommendations
| Priority | Issue | Fix |
|----------|-------|-----|
| P0 | {issue} | {action} |
| P1 | {issue} | {action} |

### Sensitivity Analysis
If {assumption} is wrong:
- Impact on LTV: {X}%
- Impact on viability: {assessment}
```

## Warning Patterns

| Pattern | Risk Level | Typical Cause |
|---------|------------|---------------|
| LTV:CAC <2 | Critical | Pricing or CAC issue |
| Payback >24mo | High | Cash flow problem |
| Gross margin <60% | High | COGS issue |
| No expansion | Medium | Missing growth lever |
| NRR <90% | Critical | Product or fit issue |
| Motion mismatch | High | Wrong GTM for ACV |

## Quick Validation Checklist

- [ ] LTV:CAC >3:1 (or justified path)
- [ ] Payback <18 months
- [ ] Gross margin >70%
- [ ] Motion matches ACV
- [ ] CAC matches channel economics
- [ ] Expansion mechanism exists
- [ ] Churn <5% monthly
- [ ] Path to profitability clear
- [ ] Math checks out
- [ ] Mode requirements met
