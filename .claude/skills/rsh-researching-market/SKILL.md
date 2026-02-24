---
name: rsh-researching-market
description: Conducts market research calibrated to business mode. Bootstrap mode analyzes spend flows, budget holders, arbitrage, and immediate revenue. Venture mode analyzes TAM, growth, defensibility, and 10x potential. Use when analyzing markets, evaluating viability, or researching opportunities.
allowed-tools: Read, Write, WebSearch, WebFetch
serves: information
affects: market
domain: research
frequency: on-demand
---

# Market Research

Market analysis calibrated to business model. Mode determines the research lens — bootstrap optimizes for cash flow, venture optimizes for scale.

## Type Signature

```
ResearchMarket : Brief × Mode → MarketAnalysis

Where:
  Brief          : Industry × Product × Questions
  Mode           : BOOTSTRAP | VENTURE (from canvas or user)
  MarketAnalysis : Findings × Verdict × Recommendations
```

## Reads

| Source | Purpose |
|--------|---------|
| User brief | Industry, product, specific research questions |
| Mode (user-specified or from `strategy/canvas/00.mode.md`) | Research lens selection |

## Writes

| Output | Path |
|--------|------|
| Market analysis | `knowledge/research/market/{mode}-analysis-{YYYY-MM-DD}.md` |

## Boundaries

**In scope:**
- Market research through bootstrap lens (spend, budget holders, arbitrage, revenue)
- Market research through venture lens (TAM, growth, defensibility, scalability)
- Competitive landscape analysis
- Pricing and positioning research
- Verdict with reasoning (viable/not viable)

**Out of scope:**
- Processing expert sources into insights (use rsh-extracting-insights)
- Creating playbooks (use rsh-creating-playbooks)
- Product development or technical feasibility
- Financial modeling beyond market sizing (use startup-financial-modeling)
- Long-term strategic planning

## Process

### Stage 1: Mode + Scope [S]

Determine mode and research scope.

**Mode source priority:**
1. User explicitly states mode in request
2. Read from `strategy/canvas/00.mode.md` if exists
3. Ask user: "Bootstrap (profit first) or venture (scale first)?"

**Scope:** From user brief, identify which focus areas (Stage 2) are relevant. Not every research request needs all focus areas — match scope to the question.

### Stage 2: Research Execution [K]

Execute focus areas relevant to user's question. Each focus area has a specific goal and output structure.

**In scope:** Using web search, public filings, industry data, job postings, pricing pages, and comparable analysis to gather evidence. All claims must cite sources.

**Uncertainty:** When data is unavailable, use proxy methods (e.g., team size from LinkedIn → estimated spend; comparable company pricing → market range). Mark proxies explicitly.

---

#### BOOTSTRAP Focus Areas

Use when mode = BOOTSTRAP. Goal: answer "can this make money THIS QUARTER?"

**B1: Current Spend Mapping [K]**

Who pays for this today and how much?

- Find companies with this problem
- Research current solution costs (vendors, internal labor, workarounds)
- Map cost centers and budget line items
- Sources: 10-K filings, industry salary surveys, pricing pages, job postings (team size = spend)

Output per customer segment:
```yaml
target_customer: [ICP]
current_solutions:
  - solution: [name]
    cost: $X/[unit]
    provider: [vendor]
    pain_points: [why they'd switch]
total_spend_per_customer: $X/year
estimated_addressable: X customers × $Y = $Z total
sources: [URLs]
```

**B2: Budget Holder Identification [K]**

Who can say "yes" and how fast?

- Title, department, seniority
- Approval authority threshold
- Procurement process by deal size
- Outreach channels and effectiveness

Output:
```yaml
budget_holder:
  title: [role]
  approval_authority: $X without committee
  budget_cycle: [monthly | quarterly | annual]
procurement_by_size:
  - threshold: <$X → credit card, immediate
  - threshold: $X-Y → manager approval, 1-2 weeks
  - threshold: >$Y → RFP, 2-6 months
```

**B3: Arbitrage Opportunities [K]**

Where are the margin gaps?

Arbitrage types: service→SaaS, generalist→specialist, geographic, channel (direct→product-led), tech stack (legacy→modern).

Output per opportunity:
```yaml
opportunity: [description]
customer_pays: $X
our_delivery_cost: $Y
our_price: $Z ([savings]% less than current)
our_margin: [%]
arbitrage_source: [what enables the margin]
risk: [what could eliminate it]
```

**B4: Immediate Revenue Projection [K]**

Realistic revenue THIS QUARTER — not 5-year projections.

- Accessible customers via current channels
- Conservative conversion estimates (cite comparables)
- Revenue per customer × timeline to close

Output:
```yaml
prospects: [reachable via our channels]
conversion_rate: [%] (conservative, based on [comparable])
expected_customers_q1: [N]
revenue_per_customer: $X/month
q1_revenue: $[amount]
path_to_breakeven: [N] customers at $[X]/month vs $[Y]/month costs
confidence: HIGH | MEDIUM | LOW
assumptions: [list]
```

---

#### VENTURE Focus Areas

Use when mode = VENTURE. Goal: answer "can this return 10x?"

**V1: Market Sizing [K]**

Calculate TAM/SAM/SOM using ≥2 methodologies.

Methodologies:
- **Top-down:** Industry reports, analyst estimates → drill to segment
- **Bottom-up:** Customer count × average deal size × penetration rate
- **Value theory:** Economic value created × % captured

Output:
```yaml
tam: $X billion
sam: $Y billion (serviceable addressable)
som: $Z million (serviceable obtainable, year 1-2)
methodology_1: [name] → $X (calculation steps)
methodology_2: [name] → $Y (calculation steps)
delta: [if methodologies diverge >2x, explain why]
sources: [URLs]
confidence: HIGH | MEDIUM | LOW
```

**V2: Growth & Timing [K]**

Is the market expanding fast enough for venture returns?

- Historical CAGR (last 5 years)
- Projected CAGR (next 5 years)
- Growth drivers (technology shifts, regulation, demographics)
- Market maturity stage (emerging / growth / mature / declining)

Target: >20% CAGR for venture viability.

**V3: Competitive Landscape [K]**

Who's here, what's the opening?

- Incumbent leaders (revenue, share, positioning)
- Funded challengers (funding, growth rate, differentiation)
- Market structure (fragmented / consolidated / emerging)
- Gaps: underserved segments, pricing white space, tech debt in incumbents

Sources: Crunchbase, PitchBook, G2, company websites, news.

**V4: Defensibility [K]**

What moat is buildable?

Moat types: network effects, switching costs, economies of scale, brand, proprietary tech, regulatory, data accumulation.

Output:
```yaml
available_moats: [list applicable]
primary_strategy:
  type: [moat type]
  approach: [how to build]
  time_to_establish: [estimate]
incumbent_moat_strength: weak | medium | strong
sustainability: high | medium | low
```

**V5: Scalability & 10x Path [K]**

Can this reach $100M+ ARR and return 10x?

- Unit economics trajectory (CAC/LTV at current vs at scale)
- Technical and operational scalability
- Path to $100M ARR (segments, expansion, pricing)
- Comparable exits for valuation reference

---

### Stage 3: Source Discovery [S]

For each focus area, execute web searches.

**Search approach:**
- Start broad (1-2 word queries), narrow based on results
- Prioritize: SEC filings > industry reports > company blogs > news > forums
- Minimum 3 sources per claim before stating as finding
- Use `web_fetch` for full page content when snippets are insufficient

**Source quality hierarchy:**
1. SEC filings, government data (highest reliability)
2. Industry reports (Gartner, Forrester, IDC)
3. Company financials and investor presentations
4. Reputable news and analysis
5. Industry forums and job postings (useful for signals, not for claims)

### Stage 4: Synthesis [K]

Synthesize findings into verdict.

**In scope:** Determining viability based on evidence gathered. Every finding must cite sources. Verdict must have clear reasoning.

**Verdict framework:**

Bootstrap:
```
PROFITABLE WITHIN 3 MONTHS: YES | NO | CONDITIONAL
Reasoning: [evidence-based]
Key condition: [if CONDITIONAL, what must be true]
```

Venture:
```
VENTURE-VIABLE: YES | NO | CONDITIONAL
Reasoning: [evidence-based]
Key condition: [if CONDITIONAL, what must be true]
```

**Quality gate:** If any focus area has <2 sources, mark that finding as "low confidence" and note the gap.

## Output Structure

```markdown
# Market Analysis: {Product/Market}

**Mode:** {BOOTSTRAP | VENTURE}
**Date:** {YYYY-MM-DD}
**Verdict:** {VIABLE | NOT VIABLE | CONDITIONAL}
**Confidence:** {HIGH | MEDIUM | LOW}

---

## Executive Summary

{3-5 sentences: verdict, key evidence, primary recommendation}

---

## Findings

{Focus area sections — only those executed, not all}

---

## Recommendations

{What to do based on findings — specific, prioritized}

---

## Risks & Limitations

{What could invalidate these conclusions}
{Which findings are low-confidence and why}

---

## Sources

{All sources cited with URLs}
```

## Quality Checklist

```
[ ] Mode determined and stated
[ ] Relevant focus areas executed (not all — matched to question)
[ ] All claims cite sources (no unsubstantiated assertions)
[ ] ≥3 sources per major finding
[ ] Proxy methods marked explicitly
[ ] Clear verdict with reasoning
[ ] Assumptions listed
[ ] Risks acknowledged
[ ] Output written to knowledge/research/market/
```

## Error Handling

| Situation | Action |
|-----------|--------|
| Mode not determinable | Ask user, explain trade-off |
| No existing spend found (bootstrap) | Expand to adjacent solutions, note "new category risk" |
| TAM <$1B (venture) | Flag as risk, consider niche or bootstrap pivot |
| Growth <20% CAGR (venture) | Note as risk, investigate if emerging |
| Cannot reach profitability (bootstrap) | Report honestly, suggest venture mode or pivot |
| Conflicting data across sources | Document both, lower confidence, present trade-off |
| Insufficient sources for a focus area | Mark finding as low-confidence, note gap |

## Viability Signals (Quick Reference)

**Bootstrap GO:** Clear budget holder, existing spend >$5k/mo on manual process, credit card procurement, >80% gross margin, <2 week sales cycle.

**Bootstrap NO-GO:** 6-month RFP, no existing budget line, <15% gross margin, requires 6+ months to build, unclear buyer.

**Venture GO:** TAM $10B+, >30% CAGR, network effects available, path to $100M ARR, market inflection point.

**Venture NO-GO:** TAM <$500M, <5% CAGR, commoditized/no moat, linear scaling, entrenched incumbents with no opening.