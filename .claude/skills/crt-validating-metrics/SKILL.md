---
name: crt-validating-metrics
description: Validates the Metrics section of strategy/canvas.md against quality criteria. Checks unit economics calculations, benchmark comparisons, and growth metric alignment. Use when reviewing metrics, validating economics, or auditing canvas.
allowed-tools: Read, Grep, Glob
serves: sys
affects: all
domain: critique
---

# Metrics Validator

Validate 13.metrics.md content meets lean canvas quality standards.

## Reads

| Source | Purpose |
|--------|---------|
| `strategy/canvas.md` | Metrics, pricing, growth model, and mode sections to validate |

## Writes

| Output | Content |
|--------|---------|
| None | Analysis only - generates validation report |

## Process

### Step 1: Load Content [S]

Read:
- `strategy/canvas.md`
- `strategy/canvas.md` (for ARPU validation)
- `strategy/canvas.md` (for growth model metrics)
- `strategy/canvas.md` (for mode-appropriate thresholds)

### Step 2: Validate Structure [R]

**Evaluation method:** Checklist validation against required sections template.

Check required sections:

| Section | Required | Check |
|---------|----------|-------|
| Unit Economics | Yes | LTV, CAC, LTV:CAC, Payback |
| Growth Metrics | Yes | Model-specific metrics |
| Funnel Metrics | Recommended | AARRR framework |
| Health Assessment | Recommended | Benchmark comparison |

### Step 3: Validate Core Calculations [R]

**Evaluation method:** Apply formulas to stated inputs, compare calculated vs stated values, flag discrepancies.

**LTV Calculation:**
```
LTV = ARPU × Gross Margin × (1 / Monthly Churn Rate)
```

Check:
- [ ] ARPU matches 12.revenue.md pricing
- [ ] Gross margin is reasonable (SaaS: 70-85%)
- [ ] Churn rate has basis (industry benchmark or assumption)
- [ ] Calculation shown or referenced

**CAC Calculation:**
```
CAC = (Sales + Marketing Spend) / New Customers
```

Check:
- [ ] Includes all acquisition costs
- [ ] Customer count is new, not total
- [ ] Time period consistent
- [ ] Calculation shown

**LTV:CAC Ratio:**
- [ ] Calculated correctly
- [ ] Compared to benchmark (>3:1)
- [ ] Mode-appropriate assessment

**Payback Period:**
```
Payback = CAC / (ARPU × Gross Margin)
```

- [ ] Calculated correctly
- [ ] Compared to benchmark (<18 months)
- [ ] Reasonable for business model

### Step 4: Validate Against Benchmarks [R]

**Evaluation method:** Lookup benchmark thresholds from table, classify metrics as healthy/warning/critical.

| Metric | Healthy | Warning | Critical |
|--------|---------|---------|----------|
| LTV:CAC | >3:1 | 2-3:1 | <2:1 |
| Payback | <12 mo | 12-18 mo | >18 mo |
| Gross Margin | >70% | 50-70% | <50% |
| Monthly Churn | <5% | 5-10% | >10% |

For each metric:
- [ ] Benchmark stated
- [ ] Status indicator (✅/⚠️/❌)
- [ ] Explanation if below benchmark

### Step 5: Validate Growth Model Alignment [R]

**Evaluation method:** Lookup model-specific required metrics from enumerated lists, check presence and definition.

Cross-reference with 09.solution.md growth model:

**PLG Model Required:**
| Metric | Present | Defined |
|--------|---------|---------|
| Signup → Activation | ✓/✗ | ✓/✗ |
| Free → Paid | ✓/✗ | ✓/✗ |
| PQL Rate | ✓/✗ | ✓/✗ |
| Expansion Revenue | ✓/✗ | ✓/✗ |

**Network-Led Required:**
| Metric | Present | Defined |
|--------|---------|---------|
| K-factor | ✓/✗ | ✓/✗ |
| Viral Cycle Time | ✓/✗ | ✓/✗ |
| Network Density | ✓/✗ | ✓/✗ |

**Traditional Required:**
| Metric | Present | Defined |
|--------|---------|---------|
| MQL → SQL | ✓/✗ | ✓/✗ |
| SQL → Opportunity | ✓/✗ | ✓/✗ |
| Win Rate | ✓/✗ | ✓/✗ |
| Sales Cycle | ✓/✗ | ✓/✗ |

### Step 6: Validate Mode Alignment [R]

**Evaluation method:** Lookup mode-specific thresholds from table, check compliance.

Cross-reference with 00.mode.md:

| Mode | LTV:CAC Min | Payback Max | Notes |
|------|-------------|-------------|-------|
| VENTURE | 2:1 (early) | 24 mo | Can optimize later |
| BOOTSTRAP | 3:1 (now) | 12 mo | Must be efficient |
| HYBRID | 3:1 (target) | 18 mo | Path to efficiency |

### Step 7: Check Consistency [R]

**Evaluation method:** Cross-file value comparison, flag mismatches.

**ARPU Consistency:**
- 13.metrics ARPU = 12.revenue pricing

**CAC Consistency:**
- 13.metrics CAC ≈ 11.channels CAC (if exists)

**Margin Consistency:**
- 13.metrics margin ≈ 14.costs margin (if exists)

### Step 8: Score and Report [R]

**Evaluation method:** Sum dimension scores (0-3 each × 5 dimensions = 0-15 total) and map to verdict using threshold table.

## Output Format

```markdown
## Metrics Validation Report

**File:** strategy/canvas.md
**Overall Score:** [X]/15

### Core Metrics Check

| Metric | Value | Calculation | Status |
|--------|-------|-------------|--------|
| ARPU | $[X] | [Shown/Missing] | ✓/✗ |
| LTV | $[X] | [Formula check] | ✓/✗ |
| CAC | $[X] | [Formula check] | ✓/✗ |
| LTV:CAC | [X]:1 | [Formula check] | ✓/✗ |
| Payback | [X] mo | [Formula check] | ✓/✗ |
| Gross Margin | [X]% | [Formula check] | ✓/✗ |

### Benchmark Assessment

| Metric | Value | Benchmark | Status |
|--------|-------|-----------|--------|
| LTV:CAC | [X]:1 | >3:1 | ✅/⚠️/❌ |
| Payback | [X] mo | <18 mo | ✅/⚠️/❌ |
| Gross Margin | [X]% | >70% | ✅/⚠️/❌ |
| Churn | [X]% | <5% | ✅/⚠️/❌ |

### Growth Model Alignment

**Model:** [From 09.solution.md]

| Required Metric | Present | Defined |
|-----------------|---------|---------|
| [Metric 1] | ✓/✗ | ✓/✗ |
| [Metric 2] | ✓/✗ | ✓/✗ |

### Cross-File Consistency

| Check | Status | Finding |
|-------|--------|---------|
| ARPU ↔ 12.revenue | ✓/✗ | [Match/Mismatch: $X vs $Y] |
| CAC ↔ 11.channels | ✓/✗ | [Match/Mismatch] |
| Margin ↔ 14.costs | ✓/✗ | [Match/Mismatch] |

### Dimension Scores

| Criterion | Score (0-3) | Finding |
|-----------|-------------|---------|
| Core Metrics Present | [0-3] | [Finding] |
| Calculations Correct | [0-3] | [Finding] |
| Benchmarks Applied | [0-3] | [Finding] |
| Growth Metrics Aligned | [0-3] | [Finding] |
| Cross-file Consistent | [0-3] | [Finding] |

### Critical Issues

**Economics Concerns:**
- [Issue]: [Impact and recommendation]

### Recommendations

1. [Specific fix]
2. [Specific fix]

### Passing Criteria

- [ ] LTV, CAC, LTV:CAC, Payback all present
- [ ] Calculations shown or referenced
- [ ] Benchmarks stated with status
- [ ] Growth model metrics included
- [ ] LTV:CAC ≥ 2:1 (or explained)

**Verdict:** [PASS / NEEDS WORK / FAIL]
```

## Calculation Verification

**LTV Sanity Check:**
```
If ARPU = $100/mo, Margin = 80%, Churn = 5%
LTV = $100 × 0.80 × (1/0.05) = $1,600

If file shows LTV = $5,000 → Calculation error
```

**LTV:CAC Sanity Check:**
```
If LTV = $1,600, CAC = $800
LTV:CAC = 2:1

If file shows 5:1 → Verify inputs
```

## Common Issues

| Issue | Example | Fix |
|-------|---------|-----|
| Missing calculation | "LTV: $5,000" | Show ARPU × Margin × (1/Churn) |
| ARPU mismatch | ARPU $200 but pricing shows $99 | Align with 12.revenue |
| No growth metrics | Only unit economics | Add model-specific metrics |
| No benchmarks | Just numbers, no comparison | Add industry benchmarks |
| Aspirational numbers | LTV:CAC 10:1 at seed | Flag as target vs current |

## Edge Cases

| Situation | Recovery |
|-----------|----------|
| Metrics section absent | Report: "13.metrics.md not populated — no metrics to validate"; list what the section requires; stop |
| ARPU not stated anywhere | Note: "ARPU unknown — LTV and payback calculations cannot be verified"; score Core Metrics Present as 0/3 |
| Unit economics present but calculations not shown | Score Calculations Correct as 1/3 maximum; note: "Numbers stated without formula — cannot verify accuracy" |
| Metrics for wrong growth model (e.g., PLG metrics on traditional SLG) | Flag model-metric mismatch; do not score Growth Metrics as failing — flag as misalignment to resolve in 09.solution.md first |
| All metrics aspirational / future-state (labeled "target") | Flag explicitly: "All metrics are targets, not current actuals — validation is of the target model, not current performance"; note the distinction |
| LTV:CAC ratio appears miscalculated | Show recalculation with inputs; note discrepancy; score Calculations Correct as 0/3; do not correct the canvas — report the error |

## Boundaries

- Does not modify files
- Does not validate business assumptions
- Does not guarantee financial accuracy
- Only validates structural completeness and consistency
- Pass does not ensure business viability