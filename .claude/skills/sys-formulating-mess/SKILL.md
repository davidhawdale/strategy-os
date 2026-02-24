---
name: sys-formulating-mess
description: >
  Formulates interacting problems as a whole rather than treating
  them independently. Prevents treatments that worsen the system.
  Use when orchestrator detects multiple simultaneous gaps or when
  a gap persists despite treatment.
allowed-tools: Read, Grep, Glob

serves: sys
affects: all
domain: governance
frequency: per-decision
---

# Mess Formulation

## Core Principle

Reality is a system of interacting problems — a mess.
Analyzing a mess into individual problems loses essential properties.
Treating problems independently can make the mess worse.

## Procedure

### 1. List All Active Gaps
Read information/gaps/. List every gap with magnitude and duration.

### 2. Map Interactions

For every pair:

| Gap A × Gap B | Interaction | Implication |
|---|---|---|
| Treating A improves B | Synergy | Treat A first |
| Treating A worsens B | Conflict | DO NOT treat independently |
| No effect | Independence | Can treat separately |
| Shared root cause | Symptom cluster | Treat root cause |

Focus on CONFLICTS and SYMPTOM CLUSTERS. These are the mess.

### 3. Identify Shared Root Structure

What system structure produces all these gaps simultaneously?

Examples:
- Revenue + engagement + usage declining → product-market fit shifted
- Skills degrading + threads stalling + state stale → outgrew capacity
- Awareness up + conversion down + churn up → attracting wrong audience

### 4. Formulate the Mess

Describe the system of problems as a WHOLE.
What would happen treating each independently?
What would happen changing the producing structure?

### 5. Recommend Treatment

**Dissolution** (preferred): Redesign the producing structure.
**Coordinated sequence**: Which gap treated FIRST improves others?
**Anti-recommendation**: Individual treatments that would worsen the mess.

## Output Format

```
## Mess Formulation
Active gaps: {list}
Root structure: {what produces these together}
Dissolution opportunity: {if exists}
Coordinated sequence: {if dissolution infeasible}
Anti-recommendation: {don't treat X independently because Y}
```
