---
name: crt-validating-uvp
description: Validates the UVP section of strategy/canvas.md against quality criteria. Checks UVP formula, specificity, and segment alignment. Use when reviewing value proposition, checking positioning, or auditing canvas.
allowed-tools: Read, Grep, Glob
serves: sys
affects: all
domain: critique
---

# UVP Validator

Validate 07.uvp.md content meets lean canvas quality standards.

## Reads

| Source | Purpose |
|--------|---------|
| `strategy/canvas.md` | UVP content to validate |
| `strategy/canvas.md` | Segment reference for alignment check |
| `strategy/canvas.md` | Problem reference for alignment check |
| `strategy/canvas.md` | Differentiation reference for alignment check |

## Writes

| Output | Content |
|--------|---------|
| None | Analysis only - generates validation report |

## Process

### Step 1: Load Content [S]

Read:
- `strategy/canvas.md`
- `strategy/canvas.md` (for segment validation)
- `strategy/canvas.md` (for problem validation)
- `strategy/canvas.md` (for differentiation validation)

### Step 2: Validate Structure [R]

**Evaluation method:** Checklist validation against required sections template.

Check required sections:

| Section | Required | Check |
|---------|----------|-------|
| UVP Statement | Yes | Single statement exists |
| Target Segment | Yes | Matches 04.segments |
| Core Problem | Yes | Matches 05.problem |
| Positioning Strategy | Yes | Compete/Differentiate/Subcategory/Create |
| Value Drivers | Yes | Dream outcome, likelihood, time, effort |
| Proof Points | Recommended | Evidence listed |

### Step 3: Validate UVP Statement [R]

**Evaluation method:** Parse UVP against For-Only-That formula components, score each quality dimension (0-3).

**Format Check (For-Only-That):**
```
For [target segment]       ← Must match 04.segments
Who [has problem]          ← Must match 05.problem  
[Product] is a [category]  ← Category clear
That [key benefit]         ← Outcome, not feature
Unlike [alternative]       ← From 06.competitive
We [differentiator]        ← Defensible claim
```

**Quality Checks:**
| Check | Criteria | Score |
|-------|----------|-------|
| Single sentence | No periods within (except abbreviations) | 0-3 |
| Length | Under 280 characters | 0-3 |
| Specificity | Named segment, not "everyone" | 0-3 |
| Benefit focus | Outcome, not feature | 0-3 |
| Defensible | Differentiator is sustainable | 0-3 |

### Step 4: Validate Segment Alignment [R]

**Evaluation method:** String matching and semantic comparison against 04.segments.md content.

Cross-reference with 04.segments.md:
- [ ] Segment name matches primary segment
- [ ] Segment characteristics consistent
- [ ] No invented segment

### Step 5: Validate Problem Alignment [R]

**Evaluation method:** String matching and semantic comparison against 05.problem.md content.

Cross-reference with 05.problem.md:
- [ ] Problem statement matches top problem
- [ ] Severity justifies solution
- [ ] No invented problem

### Step 6: Validate Differentiation [R]

**Evaluation method:** Cross-reference alternative mention against 06.competitive.md alternatives, check uniqueness.

Cross-reference with 06.competitive.md:
- [ ] "Unlike" references real alternative
- [ ] Differentiator addresses positioning gap
- [ ] Not claiming something competitors also claim

### Step 7: Validate Value Drivers [R]

**Evaluation method:** Checklist validation against value driver completeness criteria.

| Driver | Check |
|--------|-------|
| Dream Outcome | Specific, measurable, desirable |
| Likelihood | Evidence or mechanism explained |
| Time Reduction | Concrete comparison to current |
| Effort Reduction | Specific friction removed |

### Step 8: Score and Report [R]

**Evaluation method:** Sum dimension scores (0-3 each × 5 dimensions = 0-15 total) and map to verdict using threshold table.

## Output Format

```markdown
## UVP Validation Report

**File:** strategy/canvas.md
**Overall Score:** [X]/15

### UVP Statement Analysis

**Statement:**
> [Quoted UVP statement]

**Length:** [X] characters ([Pass/Fail] <280)

**Formula Compliance:**
| Component | Present | Quality | Issue |
|-----------|---------|---------|-------|
| Target segment | ✓/✗ | [0-3] | [Issue] |
| Problem | ✓/✗ | [0-3] | [Issue] |
| Category | ✓/✗ | [0-3] | [Issue] |
| Benefit | ✓/✗ | [0-3] | [Issue] |
| Alternative | ✓/✗ | [0-3] | [Issue] |
| Differentiator | ✓/✗ | [0-3] | [Issue] |

### Cross-File Consistency

| Check | Status | Finding |
|-------|--------|---------|
| Segment → 04.segments | ✓/✗ | [Match/Mismatch] |
| Problem → 05.problem | ✓/✗ | [Match/Mismatch] |
| Differentiator → 06.competitive | ✓/✗ | [Match/Mismatch] |

### Dimension Scores

| Criterion | Score (0-3) | Finding |
|-----------|-------------|---------|
| Structure Complete | [0-3] | [Finding] |
| Formula Compliance | [0-3] | [Finding] |
| Cross-file Consistency | [0-3] | [Finding] |
| Benefit Clarity | [0-3] | [Finding] |
| Defensibility | [0-3] | [Finding] |

### Critical Issues

**Must Fix:**
- [Issue]: [Specific problem]

### Recommendations

1. [Specific fix]
2. [Specific fix]

### Passing Criteria

- [ ] Single sentence under 280 characters
- [ ] All formula components present
- [ ] Segment matches 04.segments.md
- [ ] Problem matches 05.problem.md
- [ ] Differentiator is defensible

**Verdict:** [PASS / NEEDS WORK / FAIL]
```

## Common UVP Failures

| Failure | Example | Fix |
|---------|---------|-----|
| Too long | 400+ characters | Reduce to core value |
| Feature, not benefit | "...that has AI-powered automation" | "...that reduces processing time by 80%" |
| Vague segment | "For businesses" | "For high-volume e-commerce retailers" |
| Undifferentiated | "Unlike competitors" | "Unlike [specific competitor] which requires manual setup" |
| Multiple sentences | "We do X. And Y." | Combine into single statement |

## UVP Quality Examples

**Weak:**
> "For businesses who need better analytics, DataCo is a platform that provides insights unlike traditional tools because we use AI."

Issues: Vague segment, feature not benefit, generic competitor reference

**Strong:**
> "For B2B SaaS finance teams who spend 10+ hours monthly on revenue forecasting, RevPredict delivers 95%-accurate predictions in minutes unlike spreadsheet-based methods because our ML model learns from your historical patterns."

Strengths: Specific segment, quantified benefit, named alternative, defensible differentiator

## Edge Cases

| Situation | Recovery |
|-----------|----------|
| UVP section absent | Report: "07.uvp.md not populated — no UVP to validate"; list required elements; stop |
| UVP is multiple sentences | Score Formula Compliance as 0/3; flag: "UVP must be a single sentence — restructure before other validation" |
| Segment in UVP does not appear in 04.segments.md | Score Cross-file Consistency as 0/3 for segment check; flag: "UVP targets a segment not defined in canvas — either add to 04.segments or align UVP" |
| No competitor referenced in "Unlike" clause | Score Formula Compliance as 1/3 maximum; flag: "Missing competitive alternative — UVP lacks differentiation anchor" |
| UVP references features not in 09.solution.md | Flag the misalignment; note: "UVP promise not backed by solution scope — either add feature to solution or remove from UVP" |
| UVP passes formula check but is still generic | Note: "Formula compliant but low differentiation — differentiator may be defensible but not distinctive; review with real customer language" |

## Boundaries

- Does not modify files
- Does not evaluate market viability of positioning
- Does not assess creative quality
- Only validates against structural criteria
- Pass does not guarantee UVP will resonate