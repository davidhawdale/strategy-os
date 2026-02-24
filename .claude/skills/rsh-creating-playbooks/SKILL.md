---
name: rsh-creating-playbooks
description: Generates actionable playbooks from extracted insights. Use when transforming source insights into step-by-step operational guides.
allowed-tools: Read, Write
serves: all
affects: product
domain: research
frequency: on-demand
---

# Playbook Creation

Transform extracted insights into actionable, operational playbooks.

## Type Signature

```
CreatePlaybook : [Insights] × Domain × Audience → Playbook

Where:
  Insights : knowledge/research/sources/{source}/insights.md (one or more)
  Domain   : Topic area (e.g., "network effects", "pricing")
  Audience : founder | operator | executive | technical
  Playbook : Principles × Framework × Steps × Checklist × Warnings
```

## Reads

| Source | Purpose |
|--------|---------|
| `knowledge/research/sources/{source}/insights.md` | One or more insight files to synthesize |
| User brief | Domain, audience, specific focus area |

## Writes

| Output | Path |
|--------|------|
| Playbook | `knowledge/library/playbooks/{domain}.md` |

## Boundaries

**In scope:**
- Generating actionable playbooks from extracted insights
- Consolidating multiple insight sources into unified frameworks
- Creating phased step-by-step guides with principles, steps, checklists, warnings
- Sequencing tactics into logical execution order

**Out of scope:**
- Extracting insights from raw sources (use rsh-extracting-insights)
- Cross-domain synthesis across unrelated playbooks
- Original strategy creation (playbooks synthesize existing insights only)
- Custom formatting beyond markdown (this creates markdown playbooks)

## Process

### Stage 1: Insight Aggregation [S]

Collect and categorize all insights from source file(s).

```yaml
aggregation:
  sources: [{source_name, insight_count}]
  total_insights: N
  frameworks_found: [list]
  principles_found: [list]
  tactics_found: [list]
  warnings_found: [list]
```

If total insights <3: warn "Low insight count — playbook may be thin." Proceed.

### Stage 2: Framework Selection [K]

Choose the primary framework that organizes the playbook.

**In scope:** Selecting the framework that best organizes the aggregated insights into an actionable structure.

**Quality criteria:**
- Comprehensiveness: covers the most insights
- Actionability: leads to clear, ordered steps
- Memorability: easy to recall without notes

**Process:** Compare each candidate framework against all three criteria. Select the highest-scoring option. Document rationale and why alternatives were excluded.

```yaml
framework_selection:
  primary_framework: "{name}"
  rationale: "Why this framework organizes the playbook"
  secondary_frameworks: [integrated as subsections]
  excluded: [{framework, reason}]
```

**Uncertainty:** When no framework clearly dominates, organize around principles instead. Note "framework-free playbook" in output.

### Stage 3: Principle Extraction [K]

Extract 3-7 core principles from aggregated insights.

**In scope:** Selecting principles that are specific enough to guide action, general enough to apply broadly, and backed by evidence from source insights.

**Per principle:**

```yaml
principle:
  id: P{N}
  name: "Short memorable name"
  statement: "One sentence principle"
  evidence: "From {source}: {quote}"
  application: "How to apply this"
  common_mistake: "What people get wrong"
```

**Quality criteria:**
- Evidence-backed (not opinion) — mark "experience-based" if no source quote
- Actionable — reader can do something different after reading

### Stage 4: Step Sequencing [K]

Convert tactics into ordered execution phases.

**In scope:** Determining the optimal sequence of actions, organized into phases with clear goals and outputs.

**Sequencing considerations:**
1. Dependencies — what must complete before what
2. Risk reduction — validate assumptions before committing resources
3. Value delivery — show progress early to maintain momentum
4. Natural progression — one output feeds the next input

**Per phase:**

```yaml
phase:
  name: "Phase name"
  goal: "What this phase achieves"
  steps:
    - step: N
      action: "Specific action"
      why: "Why this matters"
      how: "How to do it (substeps)"
      output: "What you produce"
      signals: "How you know it's working"
```

**Uncertainty:** When sequence is ambiguous (two steps could go either way), note both orderings and the trade-off. Default to risk-reduction ordering.

### Stage 5: Warning Integration [S]

Place warnings from aggregated insights at their corresponding decision points in the step sequence.

```yaml
warnings:
  - at_step: N
    warning: "Common mistake at this stage"
    consequence: "What happens if ignored"
    prevention: "How to avoid"
```

General warnings (not tied to specific steps) go in a dedicated section.

### Stage 6: Checklist Creation [S]

Synthesize steps into actionable checklists: pre-start prerequisites, per-phase completion items, quality gates between phases, and a completion checklist.

## Output Structure

```markdown
# {Domain} Playbook

**Sources:** {List of source authors}
**Last Updated:** {YYYY-MM-DD}
**Audience:** {founder | operator | executive}

---

## Overview

{2-3 paragraphs: what this covers, why it matters, who it's for}

---

## Core Principles

### P1: {Name}
**Principle:** {Statement}
**Why:** {Why this matters}
**Evidence:** "{Quote}" — {Author}
**Application:** {How to apply}
**Common Mistake:** {What people get wrong}

---

## The Framework

{Framework name and visual representation}

```
[Stage 1] → [Stage 2] → [Stage 3] → [Outcome]
```

{Stage descriptions with goals, activities, outputs}

---

## Step-by-Step Execution

### Phase 1: {Name}

**Goal:** {What this achieves}
**Duration:** {Typical timeframe}

#### Step 1: {Action}
**What:** {Specific action}
**Why:** {Rationale}
**How:** {Substeps}
**Output:** {Deliverable}
**Signals:** {Success indicators}

> **Warning:** {If applicable}

---

## Warnings & Anti-Patterns

### W1: {Name}
**The Mistake:** {What people do wrong}
**Why It Happens:** {Root cause}
**Consequence:** {What goes wrong}
**Instead:** {What to do}

---

## Checklists

{Pre-start, per-phase, quality gates, completion}

---

## Quick Reference

### Top 3 Things
1. **{Thing}** — {Why}
2. **{Thing}** — {Why}
3. **{Thing}** — {Why}

### Decision Framework
```
IF {condition} → {action A}
ELSE IF {condition} → {action B}
ELSE → {action C}
```

---

## Sources

| Author | Source | Key Contribution |
|--------|--------|------------------|
```

## Quality Checklist

```
[ ] 3-7 core principles defined with evidence
[ ] Primary framework selected with rationale
[ ] Steps sequenced with dependencies respected
[ ] Each step has what/why/how/output
[ ] Warnings placed at decision points
[ ] Checklists are actionable (not vague)
[ ] Sources properly attributed
[ ] Tags added
[ ] Output written to knowledge/library/playbooks/
```

## Error Handling

| Situation | Action |
|-----------|--------|
| Insights file not found | Return error: "Run rsh-extracting-insights first on source" |
| <3 insights in source | Warn "thin playbook", proceed with available content |
| No frameworks in insights | Create principle-based playbook, note "framework-free" |
| Conflicting insights across sources | Document both perspectives, note conflict for user |
| Audience not specified | Default to "founder", note in output |
| Domain too broad | Suggest narrowing scope, or create multi-section playbook |