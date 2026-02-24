---
name: str-sizing-markets
description: Calculates TAM/SAM/SOM and assesses market timing. Use when sizing markets, estimating addressable opportunity, analyzing market timing, or validating opportunity scale.
allowed-tools: Read, Write, WebSearch
license: Complete terms in LICENSE.txt
serves: strategy
domain: strategy
affects: product
---

# Market Sizing

Calculate market opportunity with TAM/SAM/SOM and timing analysis.

## Reads

| Source | Purpose |
|--------|---------|
| `strategy/canvas/00.mode.md` | VENTURE/BOOTSTRAP mode affects TAM size requirements |
| `strategy/canvas/02.constraints.md` | Budget, team constraints for SOM calculation |
| `strategy/canvas/01.context.md` | Industry beliefs to validate (optional) |

## Writes

| Output | Content |
|--------|---------|
| `strategy/canvas/03.opportunity.md` | TAM/SAM/SOM calculations and market timing assessment |

## Prerequisites

Before sizing market:
- `strategy/canvas/00.mode.md` must exist (mode affects TAM requirements)

If missing:
```
"Market sizing requires business mode from 00.mode.md.

VENTURE mode needs TAM >$1B for institutional investors.
BOOTSTRAP mode can target smaller, profitable niches.

Run strategist first."
```

## Process

### Step 1: Load Context [S]

Read from canvas:
- **Mode** from 00.mode.md → determines size thresholds
- **Constraints** from 02.constraints.md → informs SOM calculation
- **Beliefs** from 01.context.md → hypotheses to validate

### Step 2: Calculate TAM (Total Addressable Market) [K]

Use BOTH methods, compare results:

**Top-Down Method:**
```
TAM = Industry size from reports × relevant segment %
```
- Source: Gartner, Forrester, IBISWorld, Statista
- Cite the report and year

**Bottom-Up Method:**
```
TAM = Total potential customers × Average revenue per customer
```
- Count: How many could possibly buy?
- Price: What would they pay annually?

**Validation:** If methods differ >50%, investigate why.

### Step 3: Calculate SAM (Serviceable Addressable Market) [R]

**Evaluation method:** Apply enumerated filter types (geographic/segment/technical/vertical) with typical reduction ranges.

Apply filters to TAM:

```
SAM = TAM × Geographic filter × Segment filter × Technical filter
```

| Filter Type | Example | Typical Reduction |
|-------------|---------|-------------------|
| Geographic | US only | 30-50% of global |
| Segment | SMB only | 20-40% of total |
| Technical | Cloud-ready | 50-80% of segment |
| Vertical | E-commerce | Varies |

Document each filter with rationale.

### Step 4: Calculate SOM (Serviceable Obtainable Market) [R]

**Evaluation method:** Lookup market share % from timeline/traction table, adjust by constraint factors.

Apply realistic capture based on constraints from 02.constraints.md:

```
SOM = SAM × Realistic market share %
```

| Timeline | New Entrant | With Traction | Established |
|----------|-------------|---------------|-------------|
| Year 1 | 0.5-1% | 1-3% | 3-5% |
| Year 3 | 2-5% | 5-10% | 10-15% |
| Year 5 | 5-10% | 10-20% | 15-25% |

**Constraint adjustments:**
- Limited budget → lower channel reach → lower SOM
- Small team → slower sales velocity → lower SOM
- Short runway → less time to penetrate → lower SOM

### Step 5: Assess Market Timing [K]

**Why Now? Framework:**

| Factor | Question | Signals |
|--------|----------|---------|
| Technology | What's newly possible? | Cost drops, capability jumps |
| Regulation | What's newly required/allowed? | New laws, compliance deadlines |
| Behavior | What habits changed? | Adoption curves, search trends |
| Economics | What's newly affordable? | Price/performance improvements |
| Competition | What gap exists? | Incumbent weakness, market void |

**Score each factor 1-5:**
```
Timing Score = Technology + Regulation + Behavior + Economics + Competition
```

| Score | Interpretation |
|-------|----------------|
| >20 | Strong timing — move fast |
| 15-20 | Good timing — proceed |
| 10-15 | Questionable — validate further |
| <10 | Poor timing — reconsider |

### Step 6: Validate Against Mode [R]

**Evaluation method:** Lookup mode-specific TAM/SOM thresholds, check compliance.

| Mode | TAM Requirement | SAM Requirement |
|------|-----------------|-----------------|
| VENTURE | >$1B | >$100M |
| BOOTSTRAP | Any (profitable niche OK) | >$10M |
| HYBRID | >$500M | >$50M |

If below threshold, flag:
```
"Market size concern for [MODE] mode:
- TAM: $[X] (requirement: $[Y])

Options:
1. Expand market definition
2. Adjacent market expansion
3. Reconsider mode (switch to BOOTSTRAP)"
```

### Step 7: Write Output [S]

Write to `strategy/canvas/03.opportunity.md` using output format below.

## Output Format

```markdown
# 03. Market Opportunity

## Market Size

| Level | Value | Method | Source |
|-------|-------|--------|--------|
| TAM | $[X]B | [Top-down/Bottom-up] | [Source, Year] |
| SAM | $[X]M | [Filters applied] | [Calculation] |
| SOM (3yr) | $[X]M | [Share %] × SAM | [Assumptions] |

## TAM Calculation

### Top-Down
- Industry: [Name]
- Total size: $[X] ([Source])
- Relevant segment: [X]% = $[X]

### Bottom-Up
- Potential customers: [N]
- Average deal size: $[X]/year
- TAM: [N] × $[X] = $[X]

### Reconciliation
[Explain any difference between methods]

## SAM Derivation

| Filter | Reduction | Remaining |
|--------|-----------|-----------|
| Starting TAM | - | $[X] |
| [Filter 1] | [X]% | $[X] |
| [Filter 2] | [X]% | $[X] |
| **SAM** | - | **$[X]** |

## SOM Assumptions

- Year 1 share: [X]% = $[X]
- Year 3 share: [X]% = $[X]
- Rationale: [Why these shares are achievable]

## Why Now

| Factor | Score | Evidence |
|--------|-------|----------|
| Technology | [1-5] | [What's newly possible] |
| Regulation | [1-5] | [What's changed] |
| Behavior | [1-5] | [What shifted] |
| Economics | [1-5] | [What's affordable] |
| Competition | [1-5] | [What gap exists] |
| **Total** | **[X]/25** | |

## Market Trends

### Tailwinds
- [Trend 1]: [Impact on opportunity]
- [Trend 2]: [Impact on opportunity]

### Headwinds
- [Trend 1]: [Mitigation strategy]
- [Trend 2]: [Mitigation strategy]

## Market Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| [Risk 1] | H/M/L | H/M/L | [Strategy] |
| [Risk 2] | H/M/L | H/M/L | [Strategy] |

## Mode Validation

**Mode:** [From 00.mode.md]
**TAM Requirement:** [Met/Not Met]
**Recommendation:** [Proceed/Expand/Reconsider]
```

## Quality Criteria

Before finalizing, verify:

- [ ] Both TAM methods calculated and reconciled
- [ ] All SAM filters documented with rationale
- [ ] SOM based on constraints, not aspirations
- [ ] Timing score completed with evidence
- [ ] Mode validation performed
- [ ] Sources cited with years

## Boundaries

- Does NOT validate customer demand (see str.r-scoring-problems)
- Does NOT guarantee market capture
- Does NOT predict competitor response
- Market size is estimate, not fact — cite sources
- SOM is constrained projection, not target
- Timing assessment is point-in-time, markets change
- Does NOT handle multi-market or platform economics