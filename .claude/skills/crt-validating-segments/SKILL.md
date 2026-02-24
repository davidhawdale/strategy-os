---
name: crt-validating-segments
description: Validates the Segments section of strategy/canvas.md against quality criteria. Checks observable filters, pain evidence, and prioritization. Use when reviewing segments, checking ICP quality, or auditing canvas.
allowed-tools: Read, Grep, Glob
serves: sys
affects: all
domain: critique
---

# Segment Validator

Validate 04.segments.md content meets lean canvas quality standards.

## Reads

| Source | Purpose |
|--------|---------|
| `strategy/canvas.md` | Segment definition to validate |
| `strategy/canvas.md` | Market size ceiling for segment sizing validation |

## Writes

| Output | Content |
|--------|---------|
| None | Analysis only - generates validation report |

## Process

### Step 1: Load Content [S]

Read `strategy/canvas.md` and `strategy/canvas.md` for context.

### Step 2: Validate Structure [R]

**Evaluation method:** Check for required sections against structural template.

Check required sections present:

| Section | Required | Check |
|---------|----------|-------|
| Primary Segment | Yes | Header exists |
| Observable Filters | Yes | 2+ filters listed |
| Segment Profile | Yes | Size, budget, pain, WTP |
| Secondary Segment | No | If present, same structure |
| Prioritization | Yes | Table with rationale |

### Step 3: Validate Observable Filters [R]

**Evaluation method:** Score each filter using searchability criteria (0-3 scale based on enumerated examples).

For each filter listed:

**Valid (Searchable):**
- Company size: "50-200 employees" ✓
- Industry: "E-commerce, NAICS 454110" ✓
- Technology: "Uses Shopify Plus" ✓
- Geography: "US-based" ✓
- Behavior: "Monthly GMV >$100K" ✓

**Invalid (Psychographic):**
- "Innovative companies" ✗
- "Growth-minded" ✗
- "Customer-centric" ✗
- "Forward-thinking" ✗

Score each filter:
- 3: Specific, searchable, with data source
- 2: Searchable but vague
- 1: Borderline searchable
- 0: Psychographic (not searchable)

### Step 4: Validate Pain Evidence [R]

**Evaluation method:** Lookup table matching pain score to required evidence type, then score evidence quality (0-3).

For pain intensity scores, check evidence:

| Score | Required Evidence |
|-------|-------------------|
| 5 | Job postings, active RFPs, recent funding in space |
| 4 | Industry reports, competitor traction |
| 3 | Conference mentions, survey data |
| 2 | Anecdotal, forum discussions |
| 1 | Assumption only |

Score evidence quality:
- 3: Strong evidence cited with source
- 2: Evidence cited, source unclear
- 1: Evidence claimed, not specific
- 0: No evidence, just score

### Step 5: Validate Segment Sizing [R]

**Evaluation method:** Checklist validation against specificity, sourcing, and ceiling constraints.

Check size estimates:
- [ ] Number is specific (not "large" or "many")
- [ ] Source cited
- [ ] Within SAM from 03.opportunity.md
- [ ] Calculation shown or referenced

### Step 6: Validate Prioritization [R]

**Evaluation method:** Checklist validation against scoring formula and rationale completeness.

Check prioritization logic:
- [ ] Scoring criteria stated (Pain × WTP × Access)
- [ ] Primary segment has highest score
- [ ] Rationale explains "why primary first"
- [ ] Secondary has clear expansion logic

### Step 7: Score and Report [R]

**Evaluation method:** Sum dimension scores (0-3 each × 5 dimensions = 0-15 total) and map to verdict using threshold table.

## Output Format

```markdown
## Segment Validation Report

**File:** strategy/canvas.md
**Overall Score:** [X]/15

### Dimension Scores

| Criterion | Score (0-3) | Finding |
|-----------|-------------|---------|
| Structure Complete | [0-3] | [Specific finding] |
| Filters Observable | [0-3] | [Specific finding] |
| Pain Evidence | [0-3] | [Specific finding] |
| Sizing Quality | [0-3] | [Specific finding] |
| Prioritization Logic | [0-3] | [Specific finding] |

### Critical Issues

**Must Fix:**
- [Issue 1]: [Specific problem and location]
- [Issue 2]: [Specific problem and location]

### Warnings

**Should Fix:**
- [Issue]: [Problem and recommendation]

### Recommendations

1. [Specific fix with example]
2. [Specific fix with example]

### Passing Criteria

- [ ] At least 2 observable filters per segment
- [ ] All filters are searchable (score ≥2)
- [ ] Pain scores have evidence (score ≥2)
- [ ] Sizes are specific numbers with sources
- [ ] Prioritization has explicit rationale

**Verdict:** [PASS / NEEDS WORK / FAIL]
```

## Quality Criteria

| Score | Meaning |
|-------|---------|
| 3 | Exceeds requirements with evidence |
| 2 | Meets requirements |
| 1 | Partial compliance |
| 0 | Missing or failing |

**Scoring Guide:**
- 13-15: Production ready
- 10-12: Minor fixes needed
- 7-9: Significant revision required
- 0-6: Rewrite recommended

## Common Issues

| Issue | Example | Fix |
|-------|---------|-----|
| Psychographic filter | "Innovative companies" | "Companies with R&D job postings" |
| No pain evidence | "Pain: 4" | "Pain: 4 — 47 job postings for role" |
| Vague sizing | "Large market" | "~3,200 companies matching filters" |
| No prioritization rationale | "Both are important" | "Primary: highest pain (5) + proven WTP" |

## Edge Cases

| Situation | Recovery |
|-----------|----------|
| Segments section absent | Report: "04.segments.md not populated — no segments to validate"; list required elements; stop |
| Only one segment defined with no secondary | Score Prioritization Logic as 2/3 maximum; note: "Single segment — prioritization not testable; acceptable for early stage" |
| All filters are psychographic (score 0/3 each) | Flag as critical: "No observable filters — segment cannot be found or targeted"; recommend rewrite before ICP development |
| Pain score is high (5) but evidence is absent | Score Pain Evidence as 0/3 for that segment; flag: "High pain asserted without evidence — highest-risk assumption in canvas" |
| Segment size contradicts SAM from 03.opportunity.md | Flag the inconsistency with specific numbers; do not resolve it — surface it for the founder to reconcile |
| Segment defined by company name examples only | Note: "Named examples provided but not an observable filter definition — convert to observable filter criteria" |

## Boundaries

- Does not modify files
- Does not evaluate business viability
- Does not validate segment existence in market
- Only validates against structural criteria
- Pass does not guarantee segment accuracy