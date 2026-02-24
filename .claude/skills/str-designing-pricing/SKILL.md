---
name: str-designing-pricing
description: Provides value-based pricing methodology, tier design frameworks, and price anchoring techniques. Use when setting prices, designing pricing tiers, analyzing willingness to pay, or aligning pricing with growth models.
allowed-tools: Read, Grep
license: Complete terms in LICENSE.txt
serves: strategy
domain: strategy
affects: revenue
---

# Pricing Designing

Frameworks for value-based pricing, tier architecture, and growth model alignment.

## Reads

| Source | Purpose |
|--------|---------|
| `strategy/canvas/05.problem.md` | Problem cost quantification for value anchor (optional) |
| `strategy/canvas/09.solution.md` | Growth model for pricing alignment (optional) |
| `strategy/canvas/04.segments.md` | Segment willingness-to-pay validation (optional) |

## Writes

| Output | Content |
|--------|---------|
| `strategy/canvas/12.revenue.md` | Pricing strategy, tiers, and upgrade triggers |

## Value-Based Pricing

### Core Principle

Price based on **value delivered**, not cost incurred.

```
Price = Value Delivered × Capture Rate
```

- **Value Delivered:** Economic benefit to customer (cost saved, revenue gained)
- **Capture Rate:** 10-25% of value delivered (typical SaaS)

### Value Anchor Calculation

1. **Quantify the problem cost:**
   - Time wasted × hourly rate
   - Revenue lost × frequency
   - Direct costs incurred

2. **Calculate value delivered:**
   - Problem cost × % resolved by solution

3. **Set price ceiling:**
   - Value delivered × 20% = maximum justifiable price

**Example:**
```
Problem: Manual reporting takes 10 hours/week at $50/hr = $2,000/month
Solution: Automates 80% = $1,600/month value
Price ceiling: $1,600 × 20% = $320/month max
```

### Van Westendorp Price Sensitivity

Ask target customers:
1. At what price is this too cheap (quality concern)?
2. At what price is this a bargain?
3. At what price is this getting expensive?
4. At what price is this too expensive (won't buy)?

Plot responses to find:
- **Optimal Price Point:** Intersection of "too cheap" and "too expensive"
- **Acceptable Range:** Between "bargain" and "expensive"

---

## Tier Architecture

### Good-Better-Best Framework

| Tier | Purpose | Pricing | Features |
|------|---------|---------|----------|
| **Good** | Entry point, low friction | Free or $X | Core value only |
| **Better** | Main revenue driver | $2-3× Good | Most features, best value |
| **Best** | Price anchor, enterprise | $3-5× Better | Everything + premium |

**Design Principles:**
- 60-70% of customers should naturally land on "Better"
- "Best" makes "Better" look affordable
- "Good" captures leads and builds habit

### PLG Tier Design

| Element | Free | Paid | Enterprise |
|---------|------|------|------------|
| Users | 1 or limited | Unlimited or team | Unlimited |
| Features | Core only | Full product | Full + admin |
| Usage | Capped | Higher cap | Unlimited |
| Support | Self-serve | Email/chat | Dedicated |
| SLA | None | Standard | Custom |

**Critical:** Free tier must deliver real value but create natural upgrade pressure.

### Upgrade Triggers

| Trigger Type | Example | Conversion Rate |
|--------------|---------|-----------------|
| Usage limit | "You've hit 100 exports" | High |
| Feature gate | "Unlock analytics with Pro" | Medium |
| Team expansion | "Add team members with Pro" | High |
| Time limit | "Trial ends in 3 days" | Medium |
| Value milestone | "You've saved $500 this month" | High |

---

## Growth Model Alignment

### Pricing by Growth Model

| Growth Model | Pricing Requirements |
|--------------|---------------------|
| **Traditional** | Value-based, annual contracts preferred, custom enterprise |
| **PLG** | Must have free tier or trial, usage-based expansion, self-serve upgrade |
| **Network-Led** | Free tier essential, monetize at scale, team/org pricing |
| **Hybrid** | Segment-specific pricing, different paths per buyer type |

### PLG Pricing Rules

1. **Free must work:** Real value, not crippled product
2. **Upgrade must be obvious:** Clear trigger, clear value add
3. **Self-serve required:** No sales call to upgrade
4. **Usage-based preferred:** Aligns price with value
5. **Expansion built-in:** Seats, usage, features

### Network-Led Pricing Rules

1. **Free forever tier:** Network growth > short-term revenue
2. **Monetize at scale:** Premium features, team features
3. **Creator monetization:** Share revenue with power users
4. **Organization tier:** When networks become teams/companies

---

## Pricing Psychology

### Anchoring

Present highest price first to anchor perception:

```
Enterprise: $999/month  ← Anchor
Pro: $99/month          ← Looks reasonable
Starter: $29/month      ← Looks cheap
```

### Decoy Effect

Add option that makes target option look better:

```
Basic: $10/month - 100 users
Pro: $25/month - 500 users     ← Target
Plus: $24/month - 200 users    ← Decoy (makes Pro obvious choice)
```

### Charm Pricing

- $99 vs $100: Perceived as significantly cheaper
- $997 vs $1000: Still under psychological barrier
- Use .99 for consumer, .00 for enterprise (signals quality)

### Price Framing

| Frame | Example | Effect |
|-------|---------|--------|
| Daily | "$3/day" vs "$90/month" | Feels smaller |
| Per-user | "$10/user/month" | Scales with value |
| Savings | "Save $1,200/year" | Loss aversion |
| ROI | "10x return" | Value focus |

---

## Pricing Models

### Model Selection

| Model | Best For | Pros | Cons |
|-------|----------|------|------|
| **Flat subscription** | Simple products, predictable value | Predictable revenue | No expansion |
| **Per-seat** | Collaboration tools | Scales with teams | Seat consolidation |
| **Usage-based** | Variable consumption | Aligns with value | Unpredictable revenue |
| **Tiered** | Feature differentiation | Upgrade path | Complexity |
| **Freemium** | High volume, network effects | Acquisition | Conversion challenge |
| **Hybrid** | Complex products | Flexibility | Complexity |

### Usage-Based Pricing Design

1. **Choose the metric:** What correlates with value delivered?
   - API calls, storage, users, transactions, events

2. **Set the unit price:** Value per unit × capture rate

3. **Design tiers:** Volume discounts to encourage growth

4. **Add floor:** Minimum monthly to ensure revenue

**Example:**
```
$0.01 per API call
Volume discounts: 10K+ ($0.008), 100K+ ($0.005)
Minimum: $50/month
```

---

## Process

### Step 1: Calculate Value Anchor [K]

Quantify problem cost from 05.problem.md or customer research.

### Step 2: Choose Pricing Model [R]

**Evaluation method:** Map product characteristics (usage variability, collaboration level) to pricing model enumeration (Subscription/Usage/Freemium/Hybrid).

Based on product and growth model.

### Step 3: Design Tiers [K]

Good-Better-Best with clear upgrade path.

### Step 4: Apply Psychology [R]

**Evaluation method:** Apply enumerated psychological tactics (anchoring, framing, charm pricing) from Pricing Psychology section.

Anchoring, framing, charm pricing.

### Step 5: Align with Growth Model [R]

**Evaluation method:** Validate pricing against growth model requirements from Growth Model Alignment section.

Ensure pricing supports acquisition strategy.

### Step 6: Test [K]

Van Westendorp or actual conversion data.

## Output Format

```markdown
## Pricing Strategy

**Model:** [Subscription | Usage | Freemium | Hybrid]
**Growth Alignment:** [How pricing supports growth model]

## Value Anchor

| Calculation | Value |
|-------------|-------|
| Problem Cost | $[X]/month |
| Value Delivered | $[X]/month |
| Capture Rate | [10-25]% |
| Price Ceiling | $[X]/month |

## Price Tiers

| Tier | Price | Target Segment | Key Features |
|------|-------|----------------|--------------|
| Free/Starter | $[X] | [Who] | [What] |
| Pro/Team | $[X] | [Who] | [What] |
| Enterprise | $[X] | [Who] | [What] |

## Upgrade Triggers

| From | To | Trigger | Expected Rate |
|------|-----|---------|---------------|
| Free | Paid | [Trigger] | [X]% |

## Psychology Applied

- **Anchor:** [How used]
- **Framing:** [How presented]
```

---

## Edge Cases

| Condition | Handling |
|-----------|----------|
| Problem cost not quantifiable | Use Van Westendorp method, compare to competitor pricing, estimate from customer budget |
| No comparable pricing | Research adjacent markets, apply value-based calculation, start with pilot pricing + adjustment clause |
| Multiple customer segments with different WTP | Design segment-specific pricing or feature gates, validate with smallest viable segment first |
| Usage highly variable | Add usage-based component with floor/ceiling, provide predictability tools (usage alerts, caps) |
| Free tier cannibalizes paid | Tighten usage limits, add time-based gates, feature-gate high-value capabilities |
| Price resistance higher than expected | Verify value delivery, adjust messaging/framing, consider lower entry tier, validate ICP fit |
| Growth model unclear | Default to freemium for PLG signals, subscription for traditional, request 09.solution.md |
| Competitive pricing significantly lower | Verify differentiation, confirm value delivered justifies premium, consider different positioning |

---

## Boundaries

**In scope:**
- Value-based pricing methodology and calculations
- Pricing model selection (subscription, usage, freemium, hybrid)
- Tier architecture design (Good-Better-Best, PLG patterns)
- Upgrade trigger identification and conversion estimation
- Pricing psychology application (anchoring, framing, decoy)
- Growth model alignment verification
- Van Westendorp price sensitivity analysis
- Output to 12.revenue.md

**Out of scope:**
- Actual customer research execution (use rsh-* skills)
- Financial modeling beyond price ceiling calculation (use str.m-calculating-economics for LTV/CAC)
- Competitor pricing research (use str.r-analyzing-competition)
- Revenue forecasting or bookings projection
- Contract term design or billing implementation
- Discount/promotion strategy
- International pricing and currency localization
- Enterprise custom pricing negotiation
- Pricing experimentation execution (use mdl-running-experiments)
