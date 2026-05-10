# Build Register from Strategy Seed

Read `strategy/problem.md` and invoke the strategist agent in BUILD mode to construct a
full hypothesis register.

## `problem.md` Format (canonical)

```
# Strategy Seed

Date: YYYY-MM-DD
Mode: BOOTSTRAP | VENTURE | EXTENSION

## Future State
{what future the governor wants to explore making true}

## Current Reality
{what is true now that makes this worth investigating}

## Strategic Bet
{the initial belief, product, market, model, expansion, or positioning move being tested}

## Validation Standard
{what would make this a good bet or a bad bet}
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
