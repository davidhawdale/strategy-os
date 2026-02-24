---
name: str-structuring-costs
description: Documents cost structure, calculates burn rate, projects runway, and analyzes scaling economics. Produces 14.costs.md. Use when planning costs, calculating burn rate, projecting runway, or analyzing cost efficiency.
allowed-tools: Read, Write, Grep
license: Complete terms in LICENSE.txt
serves: strategy
domain: strategy
affects: revenue
---

# Cost Structuring

Document cost structure and calculate financial runway.

## Reads

| Source | Purpose |
|--------|---------|
| `strategy/canvas/09.solution.md` | Features to build and growth model (required) |
| `strategy/canvas/12.revenue.md` | Revenue expectations for margin calculation (optional) |
| `strategy/canvas/13.metrics.md` | Unit economics for consistency check (optional) |
| `strategy/canvas/02.constraints.md` | Budget constraints (optional) |

## Writes

| Output | Content |
|--------|---------|
| `strategy/canvas/14.costs.md` | Fixed costs, variable costs, burn rate, runway, scaling economics |

## Prerequisites

Before structuring costs:
- `strategy/canvas/09.solution.md` should exist (determines what to build)
- `strategy/canvas/02.constraints.md` should exist (budget reality)

If missing:
```
"Cost structure benefits from solution definition (09.solution.md).

Costs are driven by what you're building and how you're growing.

Proceeding with cost framework — will flag assumptions."
```

## Process

### Step 1: Load Context [S]

Read from canvas:
- **Solution scope** from 09.solution.md — Features to build
- **Growth model** from 09.solution.md — Growth infrastructure costs
- **Budget constraints** from 02.constraints.md — Available capital
- **Revenue projections** from 12.revenue.md (if exists)
- **Unit economics** from 13.metrics.md (if exists)

### Step 2: Categorize Fixed Costs [R]

**Evaluation method:** Classify costs into enumerated categories (People, Infrastructure, GTM/Ops, Overhead) and sum monthly totals.

Fixed costs don't change with customer volume:

**Team Costs:**
| Role | Salary Range | Allocation |
|------|--------------|------------|
| Engineering | $120K-$200K | Core product |
| Product | $100K-$180K | Roadmap, specs |
| Design | $80K-$150K | UX/UI |
| Marketing | $80K-$150K | Growth |
| Sales | $80K-$150K + commission | Revenue |
| Operations | $60K-$120K | Support, admin |
| Executive | $150K-$300K | Leadership |

**Infrastructure:**
| Category | Typical Range | Scaling |
|----------|---------------|---------|
| Cloud hosting | $500-$50K/mo | With users |
| Dev tools | $200-$2K/mo | With team |
| Security | $200-$1K/mo | With compliance |

**Software:**
| Category | Typical Range |
|----------|---------------|
| Productivity | $20-$50/user/mo |
| Dev tools | $50-$200/user/mo |
| Marketing tools | $200-$2K/mo |
| Sales tools | $100-$500/user/mo |
| Analytics | $100-$1K/mo |

**Operations:**
| Category | Typical Range |
|----------|---------------|
| Legal | $500-$5K/mo |
| Accounting | $500-$3K/mo |
| Insurance | $200-$1K/mo |
| Office/Remote | $0-$5K/mo |

### Step 3: Categorize Variable Costs (COGS) [R]

**Evaluation method:** Classify per-customer costs into enumerated categories (hosting, support, delivery) and calculate per-unit amounts.

Variable costs scale with revenue or customers:

**Direct COGS:**
| Cost | Unit | Typical Range |
|------|------|---------------|
| Hosting/compute | Per user/mo | $0.50-$10 |
| Payment processing | Per transaction | 2.9% + $0.30 |
| Support | Per ticket | $5-$25 |
| Onboarding | Per customer | $50-$500 |

**Growth Model Costs:**
| Model | Variable Costs |
|-------|----------------|
| Traditional | Commission (10-20%), travel |
| PLG | None significant |
| Network-Led | Referral payouts |

**Calculate Gross Margin:**
```
Gross Margin = (Revenue - COGS) / Revenue × 100%
```

**SaaS Benchmarks:**
- Healthy: >70%
- Acceptable: 60-70%
- Concerning: <60%

### Step 4: Add Growth Model Costs [R]

**Evaluation method:** Lookup model-specific required cost categories from enumerated lists (PLG: product infra, analytics; Network-Led: collaboration infra; Traditional: sales team).

Based on 09.solution.md growth model:

**PLG Additions:**
| Investment | Monthly Cost | Purpose |
|------------|--------------|---------|
| Analytics tools | $200-$2K | User tracking |
| A/B testing | $200-$1K | Optimization |
| Onboarding automation | $100-$500 | Activation |

**Network-Led Additions:**
| Investment | Monthly Cost | Purpose |
|------------|--------------|---------|
| Community platform | $200-$1K | Engagement |
| Referral program | Variable | Acquisition |
| Content creation | $1K-$10K | Growth content |

**Traditional Additions:**
| Investment | Monthly Cost | Purpose |
|------------|--------------|---------|
| Sales team | $10K-$50K | Pipeline |
| Marketing spend | $5K-$50K | Lead gen |
| Events | $2K-$20K | Relationship |

### Step 5: Calculate Burn Rate [R]

**Evaluation method:** Apply formula: Burn Rate = Fixed Costs + (Variable Costs × Current Customer Count) - Revenue.

**Monthly Burn:**
```
Burn = Fixed Costs + Variable Costs - Revenue
```

**Burn Categories:**
| Type | Calculation |
|------|-------------|
| Gross Burn | Total monthly spend |
| Net Burn | Spend - Revenue |
| Operational Burn | Non-growth spend |
| Growth Burn | S&M investment |

### Step 6: Calculate Runway [R]

**Evaluation method:** Apply formula: Runway (months) = Cash on Hand / Monthly Burn Rate.

**Current Runway:**
```
Runway (months) = Available Cash / Net Monthly Burn
```

**With Revenue Ramp:**
```
Adjusted Runway = Cash / (Burn - (Revenue × Growth Rate))
```

**Runway Health:**
| Runway | Status | Action |
|--------|--------|--------|
| >18 months | Healthy | Invest in growth |
| 12-18 months | Caution | Plan fundraise or profitability |
| 6-12 months | Warning | Cut costs or accelerate revenue |
| <6 months | Critical | Immediate action required |

### Step 7: Project Scaling Economics [K]

Model costs at different scales:

| Scale | Users | Revenue | Costs | Margin |
|-------|-------|---------|-------|--------|
| Current | X | $X | $X | X% |
| 10x | X | $X | $X | X% |
| 100x | X | $X | $X | X% |

**Identify scaling dynamics:**
- Which costs are truly fixed?
- Where are step-function increases?
- What's the path to profitability?

### Step 8: Calculate Break-Even [R]

**Evaluation method:** Apply formula: Break-Even Customers = Fixed Costs / (ARPU - Variable Cost per Customer).

**Simple Break-Even:**
```
Break-even Customers = Fixed Costs / (ARPU × Gross Margin)
```

**Time to Break-Even:**
```
Months = Customers Needed / Monthly Customer Growth
```

### Step 9: Write Output [S]

Write to `strategy/canvas/14.costs.md` using output format below.

## Output Format

```markdown
# 14. Cost Structure

## Summary

| Metric | Value |
|--------|-------|
| Monthly Fixed Costs | $[X] |
| Monthly Variable Costs | $[X] |
| Gross Margin | [X]% |
| Current Net Burn | $[X]/mo |
| Runway | [X] months |
| Break-even | [X] customers |

---

## Fixed Costs (Monthly)

### Team

| Role | Count | Cost | Allocation |
|------|-------|------|------------|
| [Role] | [N] | $[X] | [Focus area] |
| **Total Team** | | **$[X]** | |

### Infrastructure

| Item | Cost | Notes |
|------|------|-------|
| [Item] | $[X] | [Provider, tier] |
| **Total Infrastructure** | **$[X]** | |

### Software

| Tool | Cost | Purpose |
|------|------|---------|
| [Tool] | $[X] | [Why needed] |
| **Total Software** | **$[X]** | |

### Operations

| Category | Cost | Notes |
|----------|------|-------|
| [Category] | $[X] | [Details] |
| **Total Operations** | **$[X]** | |

### Total Fixed Costs: $[X]/month

---

## Variable Costs (COGS)

| Category | Unit Cost | Driver | At 100 Customers |
|----------|-----------|--------|------------------|
| Hosting | $[X]/user | Users | $[X] |
| Payment processing | [X]% | Revenue | $[X] |
| Support | $[X]/ticket | Tickets ([X]/customer) | $[X] |
| **Total COGS** | | | **$[X]** |

### Gross Margin Analysis

| Revenue | COGS | Gross Profit | Margin |
|---------|------|--------------|--------|
| $[X] | $[X] | $[X] | [X]% |

**Benchmark:** [Above/Below] 70% target

---

## Growth Model Costs

**Model:** [From 09.solution.md]

| Investment | Monthly Cost | Purpose | Priority |
|------------|--------------|---------|----------|
| [Item] | $[X] | [Growth mechanism] | [P0/P1] |

**Total Growth Investment:** $[X]/month

---

## Burn Analysis

### Current State

| Metric | Value |
|--------|-------|
| Gross Burn | $[X]/mo |
| Revenue | $[X]/mo |
| Net Burn | $[X]/mo |
| Cash Available | $[X] |
| Runway | [X] months |

### Burn Composition

| Category | Amount | % of Burn |
|----------|--------|-----------|
| Team | $[X] | [X]% |
| Infrastructure | $[X] | [X]% |
| Software | $[X] | [X]% |
| Growth | $[X] | [X]% |
| Operations | $[X] | [X]% |

---

## Scaling Economics

| Scale | Customers | MRR | Costs | Net Burn | Margin |
|-------|-----------|-----|-------|----------|--------|
| Now | [X] | $[X] | $[X] | $[X] | [X]% |
| 10x | [X] | $[X] | $[X] | $[X] | [X]% |
| 100x | [X] | $[X] | $[X] | $[X] | [X]% |

### Scaling Notes

- **Fixed costs scale:** [When/how]
- **Step functions:** [At what scale]
- **Efficiency gains:** [Where]

---

## Break-Even Analysis

| Metric | Value | Calculation |
|--------|-------|-------------|
| Fixed Costs | $[X]/mo | |
| Contribution Margin | $[X]/customer | ARPU × Gross Margin |
| Break-even Customers | [X] | Fixed / Contribution |
| Current Customer Growth | [X]/mo | |
| Time to Break-even | [X] months | |

---

## Cost Optimization Levers

| Lever | Current | Optimized | Savings |
|-------|---------|-----------|---------|
| [Lever 1] | $[X] | $[X] | $[X]/mo |
| [Lever 2] | $[X] | $[X] | $[X]/mo |

### Optimization Priority

1. [Highest impact lever] — [Implementation]
2. [Second lever] — [Implementation]

---

## Mode Alignment

**Mode:** [From 00.mode.md]

| Mode | Burn Tolerance | Runway Target | Growth Investment |
|------|----------------|---------------|-------------------|
| VENTURE | High | 18+ months | Aggressive |
| BOOTSTRAP | Low | Indefinite | Conservative |

**Current Alignment:** [Aligned/Misaligned] — [Notes]

---

## Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| [Cost risk 1] | [Impact] | [Mitigation] |
| [Cost risk 2] | [Impact] | [Mitigation] |
```

## Quality Criteria

Before finalizing, verify:

- [ ] All cost categories documented
- [ ] Gross margin calculated
- [ ] Burn rate calculated with both gross and net
- [ ] Runway calculated
- [ ] Break-even analysis complete
- [ ] Scaling economics projected
- [ ] Mode alignment assessed

## Cost Benchmarks by Stage

**Pre-Revenue:**
- Burn: $20K-$100K/mo
- Runway: 18+ months
- Focus: Product + first customers

**Early Revenue (<$10K MRR):**
- Burn: $30K-$150K/mo
- Runway: 12+ months
- Focus: Product-market fit

**Growth ($10K-$100K MRR):**
- Burn: $50K-$300K/mo
- Runway: 12+ months
- Focus: Scaling channels

## Boundaries

- Does NOT predict future costs with certainty
- Does NOT negotiate vendor pricing
- Does NOT design compensation structures
- Cost estimates are approximations — verify with actuals
- Runway depends on revenue assumptions
- Does NOT handle complex cap table or financing
- Requires solution scope from 09.solution.md for accuracy
- Break-even assumes linear growth — reality varies