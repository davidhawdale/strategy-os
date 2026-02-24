---
name: str-calculating-economics
description: Calculates unit economics including LTV, CAC, payback period, and SaaS metrics. Use when validating business model viability, calculating customer lifetime value, analyzing acquisition costs, or assessing financial health.
allowed-tools: Read, Grep
license: Complete terms in LICENSE.txt
serves: strategy
domain: strategy
affects: revenue
---

# Economics Calculating

Calculate and validate SaaS unit economics for business model assessment.

## Reads

| Source | Purpose |
|--------|---------|
| `strategy/canvas/09.solution.md` | Growth model for model-specific metrics (required) |
| `strategy/canvas/12.revenue.md` | Pricing and ARPU for LTV calculation (required) |
| `strategy/canvas/11.channels.md` | Channel costs for CAC calculation (optional) |

## Writes

| Output | Content |
|--------|---------|
| `strategy/canvas/13.metrics.md` | Unit economics, growth metrics, funnel metrics, health assessment |

## Prerequisites

Before calculating economics:
- `strategy/canvas/12.revenue.md` must exist with pricing tiers
- `strategy/canvas/09.solution.md` should exist with growth model

If missing:
```
"Unit economics require pricing data from 12.revenue.md.
Run strategist with 'pricing' first."
```

## Process

### Step 1: Gather Inputs [S]

Read from canvas files:

| Input | Source | Default if Missing |
|-------|--------|-------------------|
| ARPU | 12.revenue.md | Ask user |
| Gross Margin | 12.revenue.md or estimate | 80% for SaaS |
| Churn Rate | User input or benchmark | 5% monthly |
| S&M Spend | 14.costs.md or estimate | Ask user |
| New Customers | User input | Ask user |
| Growth Model | 09.solution.md | Traditional |

### Step 2: Calculate Core Metrics [R]

**Evaluation method:** Apply formulas (LTV = ARPU × Margin / Churn, CAC = S&M / New Customers, etc.) to inputs.

**LTV (Lifetime Value):**
```
LTV = ARPU × Gross Margin × (1 / Monthly Churn Rate)
```

**CAC (Customer Acquisition Cost):**
```
CAC = (Sales Costs + Marketing Costs) / New Customers Acquired
```

**LTV:CAC Ratio:**
```
LTV:CAC = LTV / CAC
```

**Payback Period:**
```
Payback = CAC / (ARPU × Gross Margin)
```

### Step 3: Validate Against Benchmarks [R]

**Evaluation method:** Compare calculated metrics against benchmark thresholds (LTV:CAC >3:1, Payback <18mo, etc.).

| Metric | Healthy | Warning | Critical |
|--------|---------|---------|----------|
| LTV:CAC | >3:1 | 2-3:1 | <2:1 |
| Payback | <12 mo | 12-18 mo | >18 mo |
| Gross Margin | >70% | 50-70% | <50% |
| Monthly Churn | <5% | 5-10% | >10% |

### Step 4: Add Growth Model Metrics [R]

**Evaluation method:** Lookup model-specific required metrics from enumerated lists (PLG/Network-Led/Traditional).

Based on growth model from 09.solution.md:

**PLG Metrics:**
- Signup → Activation rate
- Free → Paid conversion
- PQL rate
- Expansion revenue %

**Network-Led Metrics:**
- K-factor (invites × conversion)
- Viral cycle time
- Network density

**Traditional Metrics:**
- MQL → SQL rate
- SQL → Opportunity rate
- Win rate
- Sales cycle length

### Step 5: Calculate Advanced Metrics [R]

**Evaluation method:** Apply formulas for cohort retention, NDR, Magic Number, etc.

**Magic Number:**
```
Magic Number = Net New ARR (Quarter) / S&M Spend (Previous Quarter)
```

**Quick Ratio:**
```
Quick Ratio = (New MRR + Expansion MRR) / (Churned MRR + Contraction MRR)
```

**NRR (Net Revenue Retention):**
```
NRR = (Starting MRR - Contraction - Churn + Expansion) / Starting MRR × 100%
```

### Step 6: Write Output [S]

Write to `strategy/canvas/13.metrics.md` using output format below.

## Output Format

```markdown
# 13. Metrics

## Unit Economics

| Metric | Value | Formula | Benchmark | Status |
|--------|-------|---------|-----------|--------|
| ARPU | $[X]/mo | Revenue / Customers | - | - |
| Gross Margin | [X]% | (Revenue - COGS) / Revenue | >70% | ✅/⚠️/❌ |
| LTV | $[X] | ARPU × Margin × (1/Churn) | - | - |
| CAC | $[X] | S&M / New Customers | - | - |
| LTV:CAC | [X]:1 | LTV / CAC | >3:1 | ✅/⚠️/❌ |
| Payback | [X] mo | CAC / (ARPU × Margin) | <18 mo | ✅/⚠️/❌ |

## Growth Metrics ([Model])

| Metric | Current | Target | Benchmark |
|--------|---------|--------|-----------|
| [Model-specific 1] | [X] | [X] | [Industry] |
| [Model-specific 2] | [X] | [X] | [Industry] |

## Funnel Metrics

| Stage | Metric | Current | Target |
|-------|--------|---------|--------|
| Acquisition | [Metric] | [X] | [X] |
| Activation | [Metric] | [X] | [X] |
| Retention | [Metric] | [X] | [X] |
| Revenue | [Metric] | [X] | [X] |
| Referral | [Metric] | [X] | [X] |

## Health Assessment

**Overall:** [Healthy | Needs Work | Critical]

**Strengths:**
- [What's working]

**Issues:**
- [Metric]: [Value] vs [Target] — Impact: [High/Med/Low]

**Recommendations:**
1. [Prioritized action]
2. [Prioritized action]
```

## Quality Criteria

Before finalizing, verify:

- [ ] All core metrics calculated (LTV, CAC, LTV:CAC, Payback)
- [ ] Benchmarks applied with status indicators
- [ ] Growth model metrics included
- [ ] Health assessment provided
- [ ] Recommendations actionable

## Benchmarks by Stage

### Seed Stage
| Metric | Target |
|--------|--------|
| LTV:CAC | >3:1 (can be estimated) |
| Payback | <18 months |
| MRR Growth | 15-20% MoM |

### Series A
| Metric | Target |
|--------|--------|
| LTV:CAC | >3:1 (measured) |
| Payback | <12 months |
| NRR | >100% |

### Series B+
| Metric | Target |
|--------|--------|
| LTV:CAC | >4:1 |
| Magic Number | >0.75 |
| Rule of 40 | >40% |

## Boundaries

- Does NOT predict future performance
- Does NOT validate market assumptions
- Does NOT calculate costs (see 14.costs.md)
- Assumes inputs are accurate — garbage in, garbage out
- Requires pricing data before execution
- Uses benchmarks as guidelines, not rules