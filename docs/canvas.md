# Canvas Reference

The canvas is 16 sections organized in four phases. Each section is a living document — evidence-based, not aspirational. Every claim must trace to research output or founder-stated fact.

All files live in `strategy/canvas/`.

---

## Phase 0: Setup

Establishes the operating mode and constraints before any market analysis begins. Human-input sections — not derived from research.

### 00. Mode (`00.mode.md`)

**What it captures:** BOOTSTRAP / VENTURE / HYBRID and the financial thresholds that follow from that choice.

| Mode | TAM Requirement | LTV:CAC Min | Payback Max |
|------|----------------|-------------|-------------|
| VENTURE | >$1B | 2:1 (early OK) | 24 mo |
| BOOTSTRAP | Any (SOM focus) | 3:1 (now) | 12 mo |
| HYBRID | >$100M | 3:1 (target) | 18 mo |

**Why it comes first:** Mode sets the thresholds against which every other section is evaluated. A BOOTSTRAP canvas optimizes for SOM and immediate profitability. A VENTURE canvas optimizes for TAM and growth rate. Same market, different strategy.

**K-open gate:** Mode is a founder decision. The strategist will not infer it. It presents options and waits.

---

### 01. Context (`01.context.md`)

**What it captures:** KBOS — Known facts, Beliefs, Observations, Strategic intent — plus a plain-language venture description.

- **K**: What you know for certain (observable, not disputed)
- **B**: What you believe but haven't proven (hypotheses you're acting on)
- **O**: What you've seen — in the market, with customers, in your own usage
- **S**: The north star direction (not a goal, but the orientation)

**Why it matters:** Canvas sections are evidence-based. The Context section is the one place where beliefs and observations are explicitly labeled as such. This prevents belief from masquerading as fact in later sections.

---

### 02. Constraints (`02.constraints.md`)

**What it captures:** Financial, timeline, team, technical, and regulatory hard limits.

These become Tier 1 Hard Constraints in `strategy/values.md`. Any canvas section or execution treatment that violates a constraint is blocked — not scored, not negotiated. Blocked.

Write constraints precisely. "Limited budget" is not a constraint. "Available capital: $40K, monthly burn ceiling: $3K" is a constraint.

---

## Phase 1: Discovery

Populates with evidence. Researcher output typically feeds these sections.

### 03. Opportunity (`03.opportunity.md`)

**What it captures:** TAM / SAM / SOM with sources and methodology. Market timing rationale — what changed that makes this addressable now.

BOOTSTRAP shortcut: SOM focus. TAM can be brief. Prioritize sections 04 and 05 instead.

---

### 04. Segments (`04.segments.md`)

**What it captures:** Distinct customer segments with observable characteristics, behavior patterns, and size estimates. Not demographic proxies — behavioral definitions.

**Gate G1 runs here.** `crt-validating-segments` scores this section. A segment must have:
- Observable entry criteria (not "small business owners")
- Distinct problem pattern that differs from adjacent segments
- Reachability estimate (how you find them)
- Size estimate with source

Failure at G1 means the segment definitions are too vague to act on. The strategist flags failing items and does not advance to Definition until resolved.

---

### 05. Problem (`05.problem.md`)

**What it captures:** Problem severity score, frequency score, willingness to pay signal, and current workaround behavior. One primary problem per segment.

The workaround behavior is the most important signal. What are they doing today instead of your solution? That behavior tells you the real alternative you're competing with.

---

### 06. Competitive (`06.competitive.md`)

**What it captures:** Competitive map, positioning gaps, and moat analysis. Not a feature comparison table — a positioning map that shows where white space exists.

---

## Phase 2: Definition

Derives the strategy from the evidence. Human K-open gate after step 1.

### 07. UVP (`07.uvp.md`)

**What it captures:** Value proposition for the primary segment. One sentence that a prospect can read and immediately know whether this is for them.

**K-open gate:** After the strategist drafts the UVP, it stops and presents the draft to the human: "Does this capture your differentiation? What do you know about your unfair advantage that isn't in the research?" Proceeds only after response.

---

### 08. Unfair Advantage (`08.unfair.md`)

**What it captures:** Why you specifically can execute this better than anyone else. Not features — the structural advantage (distribution, proprietary data, network position, regulatory moat, founder expertise).

Drafted with UVP. Same K-open gate. Human must confirm or correct before Definition continues.

---

### 09. Solution (`09.solution.md`)

**What it captures:** MVP feature set, growth architecture (PLG / Network / Sales), and the minimum scope required to deliver the core value proposition.

**Gate G2 includes this section.** `crt-validating-solution` checks that the solution addresses the problem in section 05, that the growth model matches the segment in 04, and that the scope is minimal (not a wishlist).

---

### 12. Revenue (`12.revenue.md`)

**What it captures:** Pricing model, tier structure, and rationale. Not price points (those require founder decision) — the model type and how value scales with price.

---

### 13. Metrics (`13.metrics.md`)

**What it captures:** Primary success metric for this phase, leading indicators, and unit economics (LTV, CAC, payback period).

**Gate G2 includes this section.** `crt-validating-economics` checks that LTV:CAC meets the mode threshold and that payback period fits within the mode maximum.

The primary metric becomes the `primary objective` in `strategy/values.md`.

---

### 14. Costs (`14.costs.md`)

**What it captures:** Cost structure, monthly burn, runway projection.

---

## Phase 3: Launch

Extracts the executable plan from the completed strategy.

### 10. Assumptions (`10.assumptions.md`)

**What it captures:** Every implicit assumption in the canvas, ranked by risk (impact × uncertainty). The highest-risk assumptions are the first things to test.

---

### 11. Channels (`11.channels.md`)

**What it captures:** Customer acquisition channels aligned to ACV.

| ACV | Viable Channels |
|-----|----------------|
| <$1K | PLG, content, viral |
| $1K–$10K | Content, paid, inside sales |
| $10K–$50K | Inside sales, outbound |
| $50K+ | Field sales, ABM |

---

### 15. GTM (`15.gtm.md`)

**What it captures:** Go-to-market motion. Sequenced activation plan — who you talk to first, in what order, through what channels, with what message.

**Gate G4 runs after this section.** All 16 files must exist. Cross-file consistency check:
- Segment in 04 matches UVP target in 07
- Problem in 05 has a matching solution in 09
- Growth model in 09 aligns with channels in 11
- CAC estimate in 11 fits within economics in 13

G4 pass → canvas is complete. Strategist runs VALUE mode to derive `strategy/values.md`.

---

## Reading the Canvas

The canvas is not a presentation deck. It is a working document. Expect sections to be dense, precise, and short. A good canvas section is three paragraphs of specifics, not one page of narrative.

The index file (`strategy/canvas/index.md`) maps dependencies between sections. If you update one section, the index tells you which downstream sections need review.
