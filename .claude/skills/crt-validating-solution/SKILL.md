---
name: crt-validating-solution
description: Validates the Solution section of strategy/canvas.md against quality criteria. Checks growth model selection, problem-feature mapping, and MVP scope. Use when reviewing solution design, checking feature prioritization, or auditing canvas.
allowed-tools: Read, Grep, Glob
serves: sys
affects: all
domain: critique
---

# Solution Validator

Validate 09.solution.md content meets lean canvas quality standards.

## Reads

| Source | Purpose |
|--------|---------|
| `strategy/canvas.md` | Solution content to validate |
| `strategy/canvas.md` | Problem mapping validation |
| `strategy/canvas.md` | Value delivery alignment check |
| `strategy/canvas.md` | Buyer characteristics for growth model validation |

## Writes

| Output | Content |
|--------|---------|
| None | Analysis only - generates validation report |

## Process

### Step 1: Load Content [S]

Read:
- `strategy/canvas.md`
- `strategy/canvas.md` (for problem-feature validation)
- `strategy/canvas.md` (for value delivery check)
- `strategy/canvas.md` (for growth model validation)

### Step 2: Validate Structure [R]

**Evaluation method:** Checklist validation against required sections template.

Check required sections:

| Section | Required | Check |
|---------|----------|-------|
| Growth Architecture | Yes | Model declared |
| Selection Rationale | Yes | Factors documented |
| Growth Features | Yes | Model-specific features |
| Growth Loops | Yes | Loop mechanics defined |
| Problem-Solution Mapping | Yes | Features → Problems |
| MVP Feature Set | Yes | P0/P1/P2 prioritization |
| NOT in MVP | Yes | Explicit exclusions |
| Success Criteria | Recommended | Measurable milestones |

### Step 3: Validate Growth Model Selection [R]

**Evaluation method:** Check model declaration against enumerated list, validate selection factors against model-factor alignment lookup table.

**Model Declaration:**
- [ ] Model is one of: Traditional, PLG, Network-Led, Hybrid
- [ ] Model is clearly stated (not ambiguous)

**Selection Rationale:**
Check that decision factors are documented:

| Factor | Required | Check |
|--------|----------|-------|
| ACV | Yes | Dollar amount stated |
| Buyer Type | Yes | User vs Committee |
| Time-to-Value | Yes | Duration stated |
| Collaboration | Yes | Inherent/Optional/None |
| Shareability | Yes | Level stated |

**Model-Factor Alignment:**
| Factor | Traditional | PLG | Network-Led |
|--------|-------------|-----|-------------|
| ACV | >$25K | <$5K | <$5K |
| Buyer | Committee | User = Buyer | User = Buyer |
| TTV | Weeks+ | <1 day | <1 day |
| Collaboration | Optional | Optional | **Inherent** |
| Shareability | Low | Medium | **High** |

Flag misalignment between stated factors and selected model.

### Step 4: Validate Growth Features [R]

**Evaluation method:** Lookup model-specific required features from enumerated lists, check presence in solution.

Based on declared model, check required features:

**PLG Required:**
| Feature | Purpose | Present |
|---------|---------|---------|
| Self-serve signup | Acquisition | ✓/✗ |
| Onboarding flow | Activation | ✓/✗ |
| Usage limits/triggers | Conversion | ✓/✗ |
| Analytics/PQL | Sales assist | ✓/✗ |

**Network-Led Required:**
| Feature | Purpose | Present |
|---------|---------|---------|
| Invite mechanics | Viral loop | ✓/✗ |
| Collaboration core | Value driver | ✓/✗ |
| Public sharing | Content loop | ✓/✗ |
| Team expansion | Revenue | ✓/✗ |

**Traditional:**
| Feature | Purpose | Present |
|---------|---------|---------|
| Demo environment | Sales enablement | ✓/✗ |
| Trial/pilot mode | Evaluation | ✓/✗ |

### Step 5: Validate Problem-Solution Mapping [R]

**Evaluation method:** Build coverage matrix by cross-referencing features against problems, check for orphans and gaps.

Cross-reference with 05.problem.md:

For each problem in 05.problem:
- [ ] At least one feature addresses it
- [ ] Feature is in MVP scope (P0 or P1)

For each P0 feature:
- [ ] Traces to a specific problem
- [ ] Not orphaned (growth-only features excepted)

**Coverage Matrix:**
| Problem | Feature | Priority | Coverage |
|---------|---------|----------|----------|
| P1 | [Feature] | P0/P1 | Full/Partial |
| P2 | [Feature] | P0/P1 | Full/Partial |
| P3 | [Feature] | P0/P1/P2 | Full/Partial |

### Step 6: Validate MVP Scope [R]

**Evaluation method:** Apply scope discipline checklist and feature count thresholds.

**P0 Scope Check:**
- [ ] P0 features can deliver core UVP
- [ ] P0 includes essential growth features for model
- [ ] P0 is minimal (not feature-bloated)

**Scope Discipline:**
| Check | Pass Criteria |
|-------|---------------|
| P0 count | 3-7 features typical |
| All P0 justified | Each has "why essential" |
| NOT in MVP populated | At least 2-3 exclusions |
| Exclusions have triggers | "Add when X" defined |

### Step 7: Validate Growth Loops [R]

**Evaluation method:** Checklist validation against loop completeness criteria (name, type, mechanism, metrics).

For declared model, check loops:

| Check | Criteria |
|-------|----------|
| Loop named | Has descriptive name |
| Type stated | Acquisition/Retention/Expansion/Viral |
| Mechanism clear | Step-by-step flow |
| Metrics linked | KPIs for loop health |

### Step 8: Validate UVP Delivery [R]

**Evaluation method:** Cross-reference core features against UVP promised benefits and differentiators.

Cross-reference with 07.uvp.md:

- [ ] Core features deliver the promised benefit
- [ ] Time/effort reduction claims are supported
- [ ] Differentiator is reflected in features

### Step 9: Score and Report [R]

**Evaluation method:** Sum dimension scores (0-3 each × 6 dimensions = 0-18 total) and map to verdict using threshold table.

## Output Format

```markdown
## Solution Validation Report

**File:** strategy/canvas.md
**Overall Score:** [X]/18

### Growth Model Check

**Declared Model:** [PLG/Network-Led/Traditional/Hybrid]

**Selection Factors:**
| Factor | Value | Points To | Aligned |
|--------|-------|-----------|---------|
| ACV | $[X] | [Model] | ✓/✗ |
| Buyer | [Type] | [Model] | ✓/✗ |
| TTV | [Duration] | [Model] | ✓/✗ |
| Collaboration | [Level] | [Model] | ✓/✗ |
| Shareability | [Level] | [Model] | ✓/✗ |

**Model-Factor Alignment:** [Aligned / Misaligned]

### Growth Features Check

| Required Feature | Present | Priority |
|------------------|---------|----------|
| [Feature 1] | ✓/✗ | P0/P1/Missing |
| [Feature 2] | ✓/✗ | P0/P1/Missing |

**Model Requirements Met:** ✓/✗

### Problem-Solution Mapping

| Problem (from 05) | Feature | Priority | Coverage |
|-------------------|---------|----------|----------|
| P1: [Name] | [Feature] | P0/P1 | Full/Partial/None |
| P2: [Name] | [Feature] | P0/P1 | Full/Partial/None |
| P3: [Name] | [Feature] | P0/P1/P2 | Full/Partial/None |

**Problems Covered:** [X/3]
**Orphan Features:** [List any P0 features without problem mapping]

### MVP Scope Check

| Check | Status | Finding |
|-------|--------|---------|
| P0 feature count | [N] | [Appropriate/Too many/Too few] |
| P0 justifications | ✓/✗ | [All justified / Missing for X] |
| NOT in MVP populated | ✓/✗ | [N exclusions listed] |
| Exclusion triggers | ✓/✗ | [All have triggers / Missing] |

### Growth Loops Check

| Loop | Type | Mechanism | Complete |
|------|------|-----------|----------|
| [Name] | [Type] | ✓/✗ | ✓/✗ |

### Dimension Scores

| Criterion | Score (0-3) | Finding |
|-----------|-------------|---------|
| Structure Complete | [0-3] | [Finding] |
| Model Selection Valid | [0-3] | [Finding] |
| Growth Features Present | [0-3] | [Finding] |
| Problem Mapping Complete | [0-3] | [Finding] |
| MVP Scope Disciplined | [0-3] | [Finding] |
| Growth Loops Defined | [0-3] | [Finding] |

### Critical Issues

**Model Issues:**
- [Issue]: [Impact]

**Mapping Issues:**
- [Issue]: [Impact]

### Recommendations

1. [Specific fix]
2. [Specific fix]

### Passing Criteria

- [ ] Growth model explicitly declared
- [ ] Selection factors documented
- [ ] Model-specific features present
- [ ] All problems have features
- [ ] P0 is minimal and justified
- [ ] NOT in MVP has entries

**Verdict:** [PASS / NEEDS WORK / FAIL]
```

## Common Issues

| Issue | Example | Fix |
|-------|---------|-----|
| No growth model | Features listed, no model | Add Growth Architecture section |
| Model-factor mismatch | PLG declared but ACV $50K | Review model selection |
| Missing growth features | PLG but no free tier | Add required features |
| Problem coverage gap | P2 has no feature | Add feature or explain |
| Bloated P0 | 15 P0 features | Demote non-essential to P1 |
| Empty NOT in MVP | No exclusions | Document what's deferred |

## Model-Feature Quick Reference

**PLG Minimum:**
- Free signup
- Self-serve onboarding
- Usage trigger for upgrade

**Network-Led Minimum:**
- Invite system
- Collaboration core
- Shareable output

**Traditional Minimum:**
- Demo capability
- Trial/pilot option

## Edge Cases

| Situation | Recovery |
|-----------|----------|
| Solution section absent | Report: "09.solution.md not populated — no solution to validate"; list required elements; stop |
| Growth model not declared | Score Model Selection Valid as 0/3; do not infer model from features — flag as critical gap |
| All features listed as P0 | Score MVP Scope Disciplined as 0/3; flag: "P0 bloat — feature prioritization has not been applied" |
| NOT in MVP section empty | Score MVP Scope Disciplined as 1/3 maximum; flag: "Scope discipline requires explicit exclusions" |
| Problem-solution mapping gap: problem has no feature | Flag each uncovered problem; do not invent features to cover it — surface the gap |
| Hybrid growth model declared | Validate primary model's required features as P0 and secondary model's features as P1; note: "Hybrid increases execution complexity — confirm resource capacity" |

## Boundaries

- Does not modify files
- Does not evaluate technical feasibility
- Does not assess feature quality
- Only validates structural completeness and consistency
- Pass does not guarantee solution-market fit