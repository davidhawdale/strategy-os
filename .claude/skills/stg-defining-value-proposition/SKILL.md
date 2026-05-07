---
name: stg-defining-value-proposition
description: Composes the Value Proposition hypothesis by assembling the claim from upstream hypothesis outputs and writing Jobs Addressed. Use after Problem, Segment, and Unit Economics hypotheses are complete.
serves: strategist
domain: value-proposition
affects: value-proposition-hypothesis
depends-on: stg-scoring-problems, stg-segmenting-customers, stg-calculating-economics
produces: value proposition hypothesis in register format
---

# Value Proposition Definition

Compose the VP hypothesis from upstream outputs. Do not originate new claims — every clause traces to Problem, Segment, Unit Economics, or competitive analysis.

## Procedure

### Step 1: Load Upstream Outputs [S]

Read: Problem hypothesis (claim, kill condition), Segment hypothesis (claim, observable filters), Unit Economics hypothesis (claim, channel strategy), competitive analysis if available.

**Gate:** `inputs_loaded: bool` — at least Problem and Segment hypotheses exist and are not UNVALIDATED.
- Pass: Step 2.
- Fail: Report which upstream hypotheses are missing. Do not compose a VP against UNVALIDATED inputs.

### Step 2: Compose the Claim [S]

Use this structure:

> For [segment], [product] is a [category] that [key differentiator]. Unlike [alternative A], [contrast A]; unlike [alternative B], [contrast B]. The unique capability is [what only this product can do].

Rules:
- Segment and problem clauses: pull from upstream hypothesis claims — do not paraphrase
- Differentiators must be specific and falsifiable: "daily cadence vs weekly" not "better"
- Name alternatives specifically — do not say "unlike competitors"
- Unique capability: one thing, not a list

Produce: VP claim in 3 sentences.

**Gate:** `claim_composed: bool` — every clause traces to an upstream hypothesis or competitive analysis; differentiators are specific and falsifiable.
- Pass: Step 3.
- Fail: Trace each clause. If untraceable, add it to the appropriate upstream hypothesis first.

### Step 3: Write Jobs Addressed [S]

Three job types, one sentence each:

- **Functional:** What task does the customer accomplish? (Specific enough to be falsifiable)
- **Emotional:** How does the customer feel having used it? (One feeling)
- **Social:** How does using it change how the customer is seen in their community, or how they see themselves?

**Gate:** `jobs_written: bool` — one sentence per job type; functional job is specific and falsifiable.
- Pass: Step 4.
- Fail: Rewrite vague jobs as specific outcomes.

### Step 4: Write Standard Fields [S]

- **Evidence:** Tier-labeled items supporting the VP claim. Sources cited as [Name](URL).
- **Assumptions:** List what must be true. For each: classify as Belief / Knowledge / Observation, assign evidence tier, state the claim, mark load-bearing status, assign blast radius (High / Medium / Low), and provide a falsification condition, validation method, and current status.
- **Kill Condition:** Specific and observable — e.g., "Resident interviews show <3/5 recognise the daily cadence gap as a felt pain."
- **Desired State / Current State:** Conditions confirming the VP is validated; current fulfilment status of each.

**Gate:** `hypothesis_written: bool` — all fields populated; kill condition references observable thresholds.
- Pass: Done.
- Fail: Fix missing fields.

## Quality Criteria

- Every claim clause traces to an upstream hypothesis or named competitor
- Jobs Addressed are specific — functional job is falsifiable
- Kill condition is specific and observable
- No new market claims originated in this skill

## Failure Modes

| Mode | Signal | Recovery |
|---|---|---|
| VP originates new claims | Claim contains assertions not in upstream hypotheses or competitive analysis | Trace each clause. If untraceable, add to the appropriate upstream hypothesis first |
| Vague differentiator | Uses "better", "more", "higher quality" without specific mechanism | Replace with observable contrast: "daily vs weekly", "named reporter vs wire copy" |

## Boundaries

**In scope:** VP claim composition from upstream outputs, Jobs Addressed, standard hypothesis fields.

**Out of scope:** Problem scoring (stg-scoring-problems), segment definition (stg-segmenting-customers), pricing (stg-designing-pricing), solution design (stg-designing-solutions).
