---
name: str-selecting-channels
description: Selects customer acquisition channels based on segment characteristics, ACV, and CAC targets. Calculates channel economics and designs channel mix. Produces 11.channels.md. Use when selecting channels, planning acquisition strategy, or calculating channel CAC.
allowed-tools: Read, Grep, Glob
license: Complete terms in LICENSE.txt
serves: reach
domain: growth
affects: market
---

# Channel Selecting

Select and prioritize customer acquisition channels with economics.

## Reads

| Source | Purpose |
|--------|---------|
| `strategy/canvas/04.segments.md` | Segment characteristics and congregation points |
| `strategy/canvas/12.revenue.md` | ACV for channel alignment |
| `strategy/canvas/13.metrics.md` | Target CAC and unit economics constraints |

## Writes

| Output | Content |
|--------|---------|
| `strategy/canvas/11.channels.md` | Channel strategy, economics, and mix |

## Process

### Step 1: Extract Requirements [S]

From Canvas:
- **Segment:** Who are they? Where do they congregate?
- **ACV:** What's the annual contract value?
- **Target CAC:** What can we afford? (LTV ÷ 3 minimum)

### Step 2: Filter Channels by ACV [R]

**Evaluation method:** Lookup ACV range against channel viability table to filter compatible channels.

See [knowledge/growth/channel-catalog.md](../../../knowledge/growth/channel-catalog.md) for complete channel catalog.

| ACV Range | Viable Channels |
|-----------|-----------------|
| <$1K | Content, SEO, viral, community, PLG |
| $1K-$10K | Content, paid social, partnerships, inside sales |
| $10K-$50K | Inside sales, events, partnerships, outbound |
| $50K-$100K | Field sales, events, channel partners |
| >$100K | Field sales, strategic partnerships, account-based |

### Step 3: Match Channels to Segment [R]

**Evaluation method:** Match segment type against high-fit channel lookup table.

For each viable channel, assess segment fit:

| Segment Type | High-Fit Channels |
|--------------|-------------------|
| Developers | Content, community, open source, developer relations |
| SMB | Paid social, content marketing, PLG, partnerships |
| Mid-market | Inside sales, events, content, outbound |
| Enterprise | Field sales, events, analyst relations, account-based |
| Consumers | Paid social, influencer, viral, SEO |

### Step 4: Calculate Channel Economics [R]

**Evaluation method:** Apply CAC formula (spend + overhead / customers) using benchmark estimates.

For each candidate channel, calculate:

**CAC Formula:**
```
Channel CAC = (Channel Spend + Allocated Overhead) ÷ Customers Acquired
```

**Blended CAC:**
```
Blended CAC = Σ(Channel CAC × Channel %) 
```

Use benchmarks from [knowledge/growth/channel-catalog.md](../../../knowledge/growth/channel-catalog.md) for initial estimates.

### Step 5: Assess Volume Capacity [R]

**Evaluation method:** Lookup typical capacity ranges by channel type from benchmark table.

Each channel has volume limits. See [knowledge/growth/channel-catalog.md](../../../knowledge/growth/channel-catalog.md) for capacity estimates.

| Channel | Typical Monthly Capacity |
|---------|-------------------------|
| Content/SEO | 100-10,000 leads (compound) |
| Paid Search | 50-5,000 leads (immediate) |
| Outbound | 10-100 meetings |
| Events | 20-200 leads per event |
| Partnerships | Variable |

### Step 6: Design Channel Mix [K]

Allocate across channels considering:
- **Primary:** Highest volume, acceptable CAC
- **Secondary:** Lower volume, diversification
- **Experimental:** Test new channels

**Mode adjustment:**
- VENTURE: Prioritize scale over efficiency
- BOOTSTRAP: Prioritize efficiency over scale

### Step 7: Format Output [S]

```markdown
# 11. Channels

Customer acquisition strategy and channel economics.

## Channel Economics Summary

| Metric | Target | Projected |
|--------|--------|-----------|
| Blended CAC | $[target] | $[calculated] |
| LTV:CAC | [target]:1 | [calculated]:1 |
| Payback | [target] mo | [calculated] mo |

## Primary Channel: [Name]

**Why:** [Segment fit, volume, economics]

| Metric | Value |
|--------|-------|
| Est. CAC | $X |
| Monthly Capacity | X leads |
| Time to Results | X months |

**Tactics:**
- [Specific tactic 1]
- [Specific tactic 2]

**Success Metrics:**
- [KPI 1]
- [KPI 2]

## Secondary Channel: [Name]

**Why:** [Rationale]

| Metric | Value |
|--------|-------|
| Est. CAC | $X |
| Monthly Capacity | X leads |

## Experimental: [Name]

**Hypothesis:** [What we're testing]
**Budget:** [Allocation]
**Success Criteria:** [When to scale]

## Channel Mix

| Channel | Allocation | Est. CAC | Est. Volume |
|---------|------------|----------|-------------|
| [Primary] | X% | $X | X/mo |
| [Secondary] | X% | $X | X/mo |
| [Experimental] | X% | $X | X/mo |
| **Blended** | 100% | $[X] | [X]/mo |

## Risks

| Risk | Mitigation |
|------|------------|
| [Channel saturation] | [Diversify to...] |
| [CAC increase] | [Efficiency plays] |

## 90-Day Channel Plan

| Month | Focus | Target |
|-------|-------|--------|
| 1 | [Primary setup] | [Metric] |
| 2 | [Optimization] | [Metric] |
| 3 | [Scale/add secondary] | [Metric] |
```

---

## Channel-ACV Alignment Rules

Critical constraint. See [knowledge/growth/channel-catalog.md](../../../knowledge/growth/channel-catalog.md) for full matrix.

| ACV | Max Viable CAC | Channel Constraint |
|-----|----------------|-------------------|
| $500 | ~$150 | Must be near-zero touch |
| $2K | ~$600 | Light touch only |
| $10K | ~$3K | Inside sales viable |
| $50K | ~$15K | Field sales viable |
| $100K+ | ~$30K+ | Full enterprise sales |

**Rule:** CAC should be <30% of first-year ACV for sustainable economics.

**Violation signals:**
- High-touch sales for low ACV → economics don't work
- Zero-touch for high ACV → leaving money on table

---

## Quality Checks

Before finalizing:

- [ ] Primary channel aligns with ACV
- [ ] Segment is reachable via selected channels
- [ ] Blended CAC meets target (LTV ÷ 3)
- [ ] Volume capacity supports growth goals
- [ ] At least one channel has <6 month ramp
- [ ] Risks identified with mitigations

## Boundaries

- Does NOT execute channel campaigns
- Does NOT guarantee CAC estimates (benchmarks, not predictions)
- Does NOT validate channel-market fit (requires testing)
- CAC estimates are industry benchmarks, not guarantees
- Channel capacity estimates assume standard execution
- Does NOT handle channel creative or messaging
- Requires unit economics from 13.metrics.md for validation