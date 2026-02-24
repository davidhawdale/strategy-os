---
name: rsh-extracting-insights
description: Processes expert sources (videos, podcasts, articles, books) into structured insights. Use when ingesting new knowledge sources for extraction and analysis.
allowed-tools: Read, Write, WebSearch, WebFetch
serves: information
affects: all
domain: research
frequency: on-demand
---

# Source Insight Extraction

Transform raw expert content into structured, actionable insights.

## Type Signature

```
ExtractInsights : RawSource × SourceType × Context → StructuredInsights

Where:
  RawSource         : URL | File | Transcript
  SourceType        : video | podcast | article | book | talk
  Context           : Domain × Purpose
  StructuredInsights: Metadata × Insights × Patterns × ActionItems
```

## Reads

| Source | Purpose |
|--------|---------|
| Source URL, file, or transcript | Raw content to process |
| User brief | Domain focus, extraction priorities |

## Writes

| Output | Path |
|--------|------|
| Raw reference | `knowledge/research/sources/{source-slug}/raw.md` |
| Extracted insights | `knowledge/research/sources/{source-slug}/insights.md` |

## Boundaries

**In scope:**
- Processing expert content (videos, podcasts, articles, books, talks)
- Extracting structured insights with supporting evidence
- Identifying frameworks, principles, tactics from sources
- Tagging insights by category

**Out of scope:**
- Creating playbooks from insights (use rsh-creating-playbooks)
- Cross-source synthesis across multiple insight files
- Original research or opinion generation (extraction only)
- Audio/video transcription (requires transcript input or accessible URL)

## Process

### Stage 1: Source Ingestion [S]

Capture source content and metadata.

**For video/podcast:**
1. Extract transcript (fetch URL or read file)
2. Identify speaker(s) and structure (interview, talk, panel)
3. Note timestamps for key sections
4. Capture metadata (date, duration, platform)

**For article/book:**
1. Extract full text
2. Identify structure (chapters, sections, headings)
3. Note key definitions and named frameworks
4. Capture metadata (publication date, author bio)

**Output:** `knowledge/research/sources/{source-slug}/raw.md` with full content + metadata.

### Stage 2: Insight Extraction [K]

Extract insights from source content.

**In scope:** Frameworks (mental models, decision structures), principles (universal rules), tactics (specific actions), warnings (anti-patterns), metrics (benchmarks, thresholds), quotes (memorable statements worth preserving).

**Extraction priorities:**
1. Frameworks — highest value, rarest
2. Principles — durable, transferable
3. Tactics — immediately actionable
4. Warnings — prevent costly mistakes
5. Metrics — ground decisions in numbers
6. Quotes — preserve author voice

**Per insight:**

```yaml
insight:
  id: I{N}
  title: "Short descriptive title"
  category: framework | principle | tactic | warning | metric | quote
  content: "2-3 sentence insight"
  evidence: "Supporting quote or data from source"
  actionable: true | false
  confidence: high | medium | low
  related_to: [other insight IDs]
```

**Quality criteria:**
- Every insight has evidence (direct quote or data point)
- Confidence reflects source quality and claim strength
- Preserve author's voice — don't paraphrase into generic language
- Mark low-confidence insights explicitly

**Uncertainty:** When source is ambiguous or contradictory, extract both positions and mark confidence as low. Note the tension — don't resolve it.

### Stage 3: Pattern Identification [K]

Identify within-source patterns.

**In scope:** Recurring themes, named frameworks, contrarian positions, internal tensions.

**Quality criteria:**
- Themes must appear ≥2 times in source to count as recurring
- Contrarian views must be stated against a named conventional position
- Tensions are unresolved contradictions — not errors

**Output:**

```yaml
patterns:
  recurring_themes: ["theme → brief evidence"]
  key_frameworks: ["name → description"]
  contrarian_views: ["claim vs conventional wisdom"]
  tensions: ["position A vs position B — unresolved"]
```

### Stage 4: Actionability Mapping [K]

For each actionable insight, determine application context.

**In scope:** Mapping insights to concrete actions with prerequisites and boundaries.

**Per actionable insight:**

```yaml
actionability:
  insight_id: I{N}
  immediate_action: "What can be done today"
  requires: ["prerequisite 1", "prerequisite 2"]
  applies_to: ["context where this applies"]
  does_not_apply: ["context where this fails"]
```

**Uncertainty:** If application context is unclear from the source, mark as "context-dependent" and list the open questions rather than guessing.

## Output Structure

### raw.md

```markdown
# {Source Title}

**Author:** {Name}
**Type:** {video | podcast | article | book}
**Date:** {YYYY-MM-DD}
**URL:** {if applicable}
**Duration/Length:** {if applicable}

## Summary
{1-2 paragraph overview}

## Content
{Full text or key excerpts with timestamps}
```

### insights.md

```markdown
# Insights: {Source Title}

**Source:** {Author} — {Source Type}
**Domain:** {Topic domain}
**Processed:** {YYYY-MM-DD}
**Insight Count:** {N}

---

## Frameworks

### {Framework Name}
**Insight:** {Description}
**Application:** {How to use it}
**Evidence:** "{Quote from source}"

---

## Principles

### I{N}: {Title}
**Category:** principle | **Confidence:** {high|medium|low}
**Insight:** {2-3 sentences}
**Evidence:** "{Quote}"
**Action:** {If actionable, what to do}

---

## Tactics

### I{N}: {Title}
**Category:** tactic
**Insight:** {Description}
**Steps:** {Numbered steps}
**Evidence:** "{Quote}"

---

## Warnings

### I{N}: {Title}
**Category:** warning
**What to avoid:** {Description}
**Consequence:** {What goes wrong}
**Instead:** {What to do}

---

## Metrics

| Metric | Value | Context |
|--------|-------|---------|
| {name} | {value} | {when this applies} |

---

## Patterns

**Recurring Themes:** {list}
**Contrarian Views:** {list}
**Tensions:** {list}

---

## Tags

`{tag1}` `{tag2}` `{tag3}`
```

## Quality Checklist

```
[ ] Source metadata complete (author, date, type, URL)
[ ] ≥5 insights extracted (fewer acceptable for short sources — note why)
[ ] Every insight has evidence (quote or data point)
[ ] Frameworks identified and named
[ ] Actionable items have concrete steps
[ ] Patterns section completed
[ ] Tags added
[ ] Output written to knowledge/research/sources/{slug}/
```

## Error Handling

| Situation | Action |
|-----------|--------|
| Source URL inaccessible | Return error with URL, suggest manual transcript upload |
| Transcript <500 words | Mark as "partial extraction", proceed with available content |
| No clear frameworks detected | Extract principles and tactics only, note "no frameworks found" |
| Multiple speakers (panel) | Attribute insights to specific speakers where possible |
| Low-quality auto-generated transcript | Note quality warning, focus on clearly legible segments |
| Duplicate source already in knowledge base | Warn user, offer to update existing or skip |