# Build Register from Strategy Seed

Read `strategy/problem.md` and invoke the strategist agent in BUILD mode to construct a
full hypothesis register.

## `problem.md` Format (canonical)

```
# Strategy Seed

Date: YYYY-MM-DD
Mode: BOOTSTRAP | VENTURE | EXTENSION

## Problem or Opportunity
{governor's problem text}

## Goals
{governor's goals text}

## Capabilities and Resources
{governor's capabilities text}

## Other Constraints
{governor's constraints text, or "None"}
```

This format is the contract between the onboarding UI (writer) and this skill (reader).
If the format changes here, update `App.tsx` `handleGenerate` to match.

---

## Procedure

1. Read `strategy/problem.md` using the format above.
2. Pass the contents to the strategist agent with the instruction: **BUILD**.
3. The strategist runs its full BUILD sequence and writes `strategy/hypotheses.md`.

## Boundaries

**In scope:** Reading the seed and handing off to the strategist.

**Out of scope:** Constructing hypotheses, conducting research, writing register sections.
All of that is the strategist's responsibility.
