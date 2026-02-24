---
name: str-extracting-assumptions
description: Extracts implicit assumptions from Canvas sections and prioritizes by risk. Produces 10.assumptions.md with categorized, risk-ranked hypotheses. Use when identifying what to validate, extracting assumptions, or preparing for validation phase.
allowed-tools: Read, Grep, Glob
license: Complete terms in LICENSE.txt
serves: strategy
domain: strategy
affects: product
---

# Assumption Extracting

Extract and prioritize implicit assumptions from Canvas for validation planning.

## Reads

| Source | Purpose |
|--------|---------|
| `strategy/canvas/00.mode.md` | Scaling and funding assumptions |
| `strategy/canvas/01-09.md` | All discovery, definition sections for implicit assumptions |
| `strategy/canvas/11-14.md` | GTM, pricing, metrics, cost assumptions |

## Writes

| Output | Content |
|--------|---------|
| `strategy/canvas/10.assumptions.md` | Risk-prioritized assumptions for validation |

## Process

### Step 1: Scan Each Section [S]

Read each canvas file. For each section, identify assumptions using the taxonomy in [references/taxonomy.md](references/taxonomy.md).

| Section | Look For |
|---------|----------|
| 00.mode | Scaling assumptions, funding assumptions |
| 03.opportunity | Market size assumptions, timing assumptions |
| 04.segments | Reachability, segment size, behavior assumptions |
| 05.problem | Severity assumptions, frequency assumptions |
| 06.competitive | Differentiation assumptions, switching assumptions |
| 07.uvp | Value resonance assumptions |
| 08.unfair | Defensibility assumptions |
| 09.solution | Feature-value assumptions, adoption assumptions |
| 12.revenue | Willingness-to-pay, pricing tier assumptions |
| 13.metrics | CAC, conversion, retention assumptions |
| 14.costs | Cost structure assumptions |

### Step 2: Categorize [R]

**Evaluation method:** Classify each assumption against taxonomy (Market/Customer/Problem/Value/Pricing/Channel/Operational) using enumerated patterns.

Assign each assumption to a category:

| Category | Examples |
|----------|----------|
| **Market** | Size, growth, timing, trends |
| **Customer** | Behavior, reachability, segment validity |
| **Problem** | Severity, frequency, urgency |
| **Value** | Resonance, differentiation, switching motivation |
| **Pricing** | WTP, tier fit, value-price alignment |
| **Channel** | Reachability, CAC, conversion |
| **Operational** | Cost structure, scaling, execution |

### Step 3: Assess Risk [R]

**Evaluation method:** Score impact (1-5) and uncertainty (1-5) using lookup tables, calculate risk = impact × uncertainty.

For each assumption, score:

**Impact (1-5):** If wrong, how bad?
| Score | Impact |
|-------|--------|
| 5 | Business fails |
| 4 | Major pivot required |
| 3 | Significant rework |
| 2 | Minor adjustment |
| 1 | Negligible |

**Uncertainty (1-5):** How confident are we?
| Score | Uncertainty |
|-------|-------------|
| 5 | Pure guess |
| 4 | Weak signal |
| 3 | Some evidence |
| 2 | Good evidence |
| 1 | Validated |

**Risk Score:** Impact × Uncertainty (max 25)

### Step 4: Prioritize [R]

**Evaluation method:** Sort by risk score, apply priority thresholds (P0: 20-25, P1: 12-19, P2: 6-11, P3: 1-5).

| Priority | Risk Score | Meaning |
|----------|------------|---------|
| P0 Critical | 20-25 | Must validate before launch |
| P1 High | 12-19 | Should validate before scale |
| P2 Medium | 6-11 | Validate when possible |
| P3 Low | 1-5 | Monitor only |

### Step 5: Format Output [S]

```markdown
# 10. Assumptions

Hypotheses requiring validation before launch.

## Summary

| Priority | Count | Status |
|----------|-------|--------|
| P0 Critical | X | Y validated |
| P1 High | X | Y validated |
| P2 Medium | X | Y validated |

## Critical Assumptions (P0)

### A001: [Assumption statement]

**Category:** [Market/Customer/Problem/Value/Pricing/Channel]
**Source:** [Canvas section where identified]
**Risk:** Impact [X] × Uncertainty [X] = [Score]

**If wrong:** [Consequence]
**Evidence needed:** [What would validate/invalidate]
**Status:** 🔴 Unvalidated | 🟡 In progress | 🟢 Validated | ❌ Invalidated

---

### A002: [Next assumption]
...

## High Priority (P1)

### A010: [Assumption]
...

## Medium Priority (P2)

### A020: [Assumption]
...

## Validation Queue

| ID | Assumption | Priority | Status | Next Step |
|----|------------|----------|--------|-----------|
| A001 | [Short] | P0 | 🔴 | [Action] |
```

---

## Assumption Patterns

Common assumptions by section. See [references/taxonomy.md](references/taxonomy.md) for complete patterns.

**Segment assumptions (04):**
- "We can identify [segment] using [criteria]"
- "[Segment] is large enough to support business"
- "[Segment] is reachable via [channels]"

**Problem assumptions (05):**
- "[Problem] is painful enough to pay for solution"
- "[Problem] occurs frequently enough"
- "Current alternatives are inadequate"

**Value assumptions (07):**
- "[UVP] resonates with [segment]"
- "[Benefit] matters more than [competitor benefit]"
- "Customers understand our differentiation"

**Pricing assumptions (12):**
- "[Segment] will pay $[price] for [value]"
- "[Tier] captures [X]% of market"
- "Free tier converts at [X]%"

---

## Quality Checks

Before finalizing, verify:

- [ ] Every P0 has clear "if wrong" consequence
- [ ] Every assumption has single testable statement
- [ ] No duplicate assumptions across categories
- [ ] Source section cited for each
- [ ] Evidence needed is specific and measurable

## Boundaries

- Does NOT validate assumptions (extracts and prioritizes only)
- Does NOT design validation experiments
- Does NOT assess business viability
- Assumptions are hypotheses, not facts
- Risk scores are estimates based on available information
- Does NOT replace customer discovery
- P0 critical does not mean "will fail" — means "must test"