---
name: stg-designing-solutions
description: Designs solution architecture, selects growth model, maps features to problems, and defines MVP scope. Use when constructing Solution Design section during BUILD phase 2.
serves: strategist
domain: solution-design
affects: solution-design-section
depends-on: none
produces: Solution Design section in register format
---

# Solution Design

Design solution architecture: select growth model, map features to problems, define MVP scope, design growth loops. Output is the Solution Design section of the register -- a derived design artifact constrained by all four hypotheses, not a hypothesis itself.

## Procedure

### Step 1: Load Hypothesis Context [S]

Read: problem, segment, VP, unit economics hypotheses.

Extract constraints each hypothesis places on the solution:
- **Problem** -> what must be solved (top problems by severity)
- **Segment** -> buyer type (user=buyer or committee), ACV range, time-to-value expectations
- **VP** -> what was promised (differentiator, unique capability)
- **Unit Economics** -> cost constraints (gross margin target, COGS limits)

Produce: hypothesis constraints table.

**Gate:** `constraints_extracted: bool` -- at least one constraint from each hypothesis documented.
- Pass: Step 2.
- Fail: If a hypothesis is missing, note the gap. Proceed with available constraints, flagging reduced confidence.

### Step 2: Select Growth Architecture [R]

Score buyer characteristics against decision matrix:

| Factor | PLG | Network | Traditional | Source |
|--------|-----|---------|-------------|--------|
| ACV | < $5K | < $5K | > $25K | Segment hypothesis |
| Buyer type | User = buyer | User = buyer | Committee | Segment hypothesis |
| Time-to-value | < 1 day | < 1 day | Weeks+ | Product nature |
| Collaboration | Optional | Inherent | Either | Product nature |
| Shareability | Medium | High | Low | Product nature |

For ACV between $5K-$25K: Hybrid. Document which factors pulled in which direction.

Selection is T1/T2 (derivable from segment characteristics).

Produce: growth architecture selection with rationale [T1/T2].

**Gate:** `architecture_selected: bool` -- selection justified by segment characteristics, not asserted.
- Pass: Step 3.
- Fail: If factors conflict (e.g., low ACV but committee buyer), flag the tension and select with documented reasoning.

### Step 3: Map Features to Problems [K-grounded]

**Grounded in:** problem hypothesis (top problems), VP hypothesis (jobs addressed).

For each top problem, identify features that solve it. For each feature, classify:

| Job Dimension | What It Means | Example |
|--------------|---------------|---------|
| Functional | What they need accomplished | "Generate reports in 2 minutes" |
| Emotional | How they want to feel | "Feel confident in data accuracy" |
| Social | How they want to be perceived | "Be seen as data-driven leader" |

Flag if all features are functional-only: "Technical founders design for the functional job and ignore emotional and social jobs."

Prioritize each feature:
- **MVP** -- minimum for aha moment
- **POST_MVP** -- important but not for first value
- **FUTURE** -- nice to have or expansion

Produce: feature map with job dimensions and priorities [T2].

**Gate:** `features_mapped: bool` -- every feature traces to a stated problem, at least one non-functional job dimension addressed, priorities assigned.
- Pass: Step 4.
- Fail: Features that do not trace to any stated problem must be removed or the problem must be added to the hypothesis. Every feature must trace.

### Step 4: Define MVP Scope [K-grounded]

**Grounded in:** feature map, growth architecture.

MVP = minimum set that delivers the aha moment.

**Aha moment definition:** the specific experience where the user says "this solves my problem." Must be concrete and experiential:
- Good: "Generate a complete design system from 3 inputs in 90 seconds"
- Bad: "See value in the product", "experience efficiency"

**Time-to-value target:**
- PLG: must be < 1 day from signup
- Network: must be < first interaction with other user
- Traditional: must be < first sales call follow-up

**Excluded features:** list each with why excluded and when to add.

**Mode overlay:**
- BOOTSTRAP -> smallest possible MVP for fastest revenue
- VENTURE -> MVP can be slightly larger if it enables growth loop

Produce: MVP scope with aha moment and time-to-value [T2 for scope, T3 for timing effectiveness].

**Gate:** `mvp_defined: bool` -- aha moment is specific and experiential, time-to-value target stated, excluded features have rationale.
- Pass: Step 5.
- Fail: If aha moment is vague, rewrite with specific experience, observable outcome, and timeframe. If MVP has >5 features, challenge: which single feature delivers the aha moment? Start there.

### Step 5: Design Growth Loops [K-grounded]

**Grounded in:** growth architecture, feature map, segment characteristics.

For selected architecture, define growth mechanisms:

| Architecture | Loop Pattern | Requires |
|-------------|-------------|----------|
| PLG | Product usage -> sharing -> new signups -> more usage | Shareable output, invite mechanism |
| Network | User joins -> invites others -> network value increases | Collaboration features, density threshold |
| Traditional | Sales close -> implementation success -> referral | Customer success process, case studies |

Each loop: mechanism, what it requires (features, scale), tier label.

Produce: growth loop definitions [T2].

**Gate:** `loops_designed: bool` -- at least 1 growth loop with mechanism, requirements, and tier label.
- Pass: Step 6.
- Fail: If no natural growth loop exists for the architecture, document: "Growth loop is weak -- customer acquisition will depend primarily on paid channels." This is a finding.

### Step 6: Write Solution Design Section [S]

Write complete Solution Design section in register format:

- **Growth Architecture:** {PLG | Network | Traditional | Hybrid} with rationale
- **Architecture Rationale:** ACV, buyer type, time-to-value, collaboration, selection reasoning
- **Feature Map:** table with feature, solves problem, job dimension, priority, tier
- **MVP Scope:** included features, aha moment, time-to-value target, excluded features with rationale
- **Growth Loops:** loop name, mechanism, requirements, tier
- **Constraints from Hypotheses:** table with constraint from each hypothesis and what to re-evaluate if hypothesis changes
- **Adequacy Criteria:** specific, measurable criteria for solution adequacy (not kill conditions -- this is a design artifact, not a hypothesis)
- **Last Updated:** date

Produce: complete Solution Design section.

**Gate:** `section_written: bool` -- all fields populated, constraints reference all four hypotheses.
- Pass: Done.
- Fail: Fix missing fields. Ensure constraints table references all four hypotheses.

## Quality Criteria

- Growth architecture selection justified by segment characteristics (not asserted)
- Every MVP feature traces to a problem in the Problem hypothesis
- At least one feature addresses emotional or social job (not all functional)
- Aha moment is specific and experiential (not a vague benefit)
- Constraints from all four hypotheses documented
- Excluded features have rationale and "when to add" guidance
- Growth loops are mechanistically described (not just named)

## Failure Modes

| Mode | Signal | Recovery |
|------|--------|----------|
| Feature completeness before launch | MVP contains >5 features or includes "platform" / "ecosystem" language | Flag technical founder pattern. Ask: which single feature delivers the aha moment? Start there. Everything else is POST_MVP until customer evidence demands it |
| Aha moment is vague | "Users see value", "teams get results", "experience efficiency" | Rewrite as specific experience with observable outcome and timeframe. "Complete X task in Y minutes that previously took Z hours" |
| Growth architecture mismatch | PLG selected but ACV >$25K, or Traditional selected but ACV <$2K | Architecture-ACV misalignment. Either the pricing is wrong or the architecture is wrong. Flag for resolution in economics hypothesis |
| Solution not constrained by hypotheses | Features that do not trace to any stated problem; growth loops that assume segment behaviors not in evidence | Every feature must trace to the Problem hypothesis. Every growth loop must be consistent with Segment characteristics. Remove untraced elements or add the tracing |

## Boundaries

**In scope:** Growth architecture selection, feature-to-problem mapping with JTBD dimensions, MVP scope definition with aha moment, growth loop design, hypothesis constraint documentation, adequacy criteria.

**Out of scope:** Pricing design (stg-designing-pricing), economics calculation (stg-calculating-economics), problem scoring (stg-scoring-problems), competitive analysis (stg-analyzing-competition).
