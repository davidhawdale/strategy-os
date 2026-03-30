# Hypothesis Register

Created: {YYYY-MM-DD}
Last Reviewed: {YYYY-MM-DD}
Business Mode: {VENTURE | BOOTSTRAP | HYBRID}
Build Method: {AUTONOMOUS | GOVERNOR_AUTHORED | MIXED}
Sell & Grow Ready: {yes | no} (requires all three hypotheses SUPPORTED)

---

## 1. Problem

**Claim:** {One-paragraph statement of the problem that exists independent of the solution}

**Confidence:** {unvalidated | researched | supported | broken}

**Possibility Space:**
- Considered: {list of candidate problems evaluated}
- Eliminated: {for each eliminated candidate: candidate -- reason -- evidence}
- Alternatives carried: {any alternative problem hypotheses still alive}

**Evidence:**
- [{TYPE}] [{T1|T2|T3}] {date} -- {source}: {detail}

**Research Sources:**
- [{T1|T2|T3}] {date accessed} -- {url or description}: {what it established}

**Assumptions:**
- [{K|B|O}] [{T1|T2|T3}] {claim} {[LOAD-BEARING] if applicable} {[BLAST:HIGH|MEDIUM|LOW]}
  {-> Falsification: {condition} if load-bearing}
  {-> Validation: {plan} if B and load-bearing}

**Kill Condition:** {Observable condition that means this problem is not worth solving}

**Last Updated:** {YYYY-MM-DD}
**Update Rationale:** {Why the confidence state last changed, if it changed}

---

## 2. Segment

**Claim:** {Who has this problem acutely -- observable characteristics, not demographics}

**Confidence:** {unvalidated | researched | supported | broken}

**Possibility Space:**
- Considered: {list of candidate segments evaluated}
- Eliminated: {for each: segment -- reason -- evidence}
- Alternatives carried: {alternative segment hypotheses still alive}

**Evidence:**
- [{TYPE}] [{T1|T2|T3}] {date} -- {source}: {detail}

**Research Sources:**
- [{T1|T2|T3}] {date accessed} -- {url or description}: {what it established}

**Assumptions:**
- [{K|B|O}] [{T1|T2|T3}] {claim} {[LOAD-BEARING]} {[BLAST:HIGH|MEDIUM|LOW]}
  {-> Falsification: {condition}}
  {-> Validation: {plan}}

**Kill Condition:** {Observable condition that means this is the wrong segment}

**Last Updated:** {YYYY-MM-DD}
**Update Rationale:** {Why the confidence state last changed, if it changed}

---

## 3. Unit Economics

**Claim:** {Revenue model, LTV:CAC ratio range, payback period range, gross margin trajectory}

**Confidence:** {unvalidated | researched | supported | broken}

**Possibility Space:**
- Considered: {list of revenue model alternatives evaluated}
- Eliminated: {for each: model -- reason -- evidence}
- Alternatives carried: {alternative economic models still alive}

**Cost Structure:**

| Category | Items | Monthly Cost (range) | Tier | Source |
|----------|-------|---------------------|------|--------|
| Fixed: Team | {roles x market rate} | {low -- high} | {T2/T3} | {source} |
| Fixed: Infrastructure | {servers, CI/CD, monitoring} | {low -- high} | {T2/T3} | {source} |
| Fixed: Software | {SaaS tools, licenses} | {low -- high} | {T2/T3} | {source} |
| Fixed: Operations | {legal, accounting, insurance} | {low -- high} | {T2/T3} | {source} |
| Variable: Hosting/Compute | {per-user cost, AI inference if applicable} | {low -- high} | {T2/T3} | {source} |
| Variable: Payment Processing | {rate + per-txn} | {low -- high} | {T1} | {source} |
| Variable: Support | {per-ticket cost} | {low -- high} | {T2/T3} | {source} |
| Variable: Onboarding | {per-customer cost} | {low -- high} | {T2/T3} | {source} |

**Derived:** Gross margin: {range}% | Burn rate: {range}/mo | Runway: {range} months

**Channel Strategy:**

| Channel | Segment Reach | CAC Estimate (range) | Investment Split | Tier | Source |
|---------|--------------|---------------------|-----------------|------|--------|
| {channel} | {how it reaches segment} | {low -- high} | {Phase 1% / Phase 2%} | {T2/T3} | {source} |

- Channel-economics coherence: {does channel mix CAC align with LTV:CAC requirement?}
- ACV-channel constraint: {from pricing -- which channels are viable at this ACV?}
- Sequencing rationale: {which channels first and why -- bootstrap vs scale phase}

**Mode Thresholds:**
| Metric | Required | Estimate (range) | Tier | Source |
|--------|----------|-------------------|------|--------|
| LTV:CAC minimum | {from mode} | {low -- high} | {T1/T2/T3} | {source} |
| Payback maximum | {from mode} | {low -- high} | {T1/T2/T3} | {source} |
| Gross margin target | 70-85% | {low -- high} | {T1/T2/T3} | {source} |

**Scenario Analysis:**
- Optimistic: {if assumptions resolve favorably -- LTV:CAC, payback, margin}
- Base: {if assumptions resolve as estimated}
- Pessimistic: {if CAC is 3x estimate, segment is 40% smaller}
- Kill: {at what point do the economics not work at all?}

**Evidence:**
- [{TYPE}] [{T1|T2|T3}] {date} -- {source}: {detail}

**Research Sources:**
- [{T1|T2|T3}] {date accessed} -- {url or description}: {what it established}

**Assumptions:**
- [{K|B|O}] [{T1|T2|T3}] {claim} {[LOAD-BEARING]} {[BLAST:HIGH|MEDIUM|LOW]}
  {-> Falsification: {condition}}
  {-> Validation: {plan}}

**Kill Condition:** {Observable condition that means these economics cannot work}

**Last Updated:** {YYYY-MM-DD}
**Update Rationale:** {Why the confidence state last changed, if it changed}

---

## 4. Solution Design

*This is not a hypothesis. It is a design artifact derived from and constrained
by the three hypotheses above. If any hypothesis changes, re-evaluate this section.*

**Growth Architecture:** {PLG | Network | Traditional | Hybrid}

**Architecture Rationale:**
- ACV: {from unit economics} -> {implication for growth model}
- Buyer type: {from segment} -> {user=buyer or committee}
- Time-to-value: {from solution nature} -> {fast or slow}
- Collaboration: {inherent or optional} -> {network effects or not}
- Selection: {which architecture and why}

**Positioning:**

Positioning statement: For {target from Segment hypothesis} who {problem from Problem hypothesis}, {product} is a {category} that {differentiator}. Unlike {alternative from competitive analysis}, it {unique capability from aha moment}.

- Category framing: {category name} {[GOVERNOR_DECISION] if category is ambiguous or contested}
- Category rationale: {why this category -- derived from competitive gaps and segment mental models}

**Feature Map:**

| Feature | Solves Problem | Job Dimension | Priority | Tier |
|---------|---------------|---------------|----------|------|
| {feature} | {which problem from hypothesis 1} | {F/E/S} | {MVP/POST/FUTURE} | {T1/T2/T3} |

**MVP Scope:**
- Included: {features with MVP priority}
- Aha moment: {the single experience that demonstrates value}
- Time-to-value target: {how fast to first value}
- Excluded:
  - {feature} -- {why excluded} -- {when to add}

**Growth Loops:**
- {loop name}: {mechanism} (requires: {what}) [{T1|T2|T3}]

**Constraints from Hypotheses:**
| From | Constraint | If Hypothesis Changes |
|------|-----------|----------------------|
| Problem | {what the problem demands of the solution} | {what to re-evaluate} |
| Segment | {what the segment demands} | {what to re-evaluate} |
| Unit Economics | {what the economics require of the cost structure} | {what to re-evaluate} |

**Adequacy Criteria:**
- {criterion 1: specific, measurable}
- {criterion 2}

**Last Updated:** {YYYY-MM-DD}

---

## Destruction Log

{Written after each BUILD or CHALLENGE pass. Records the adversarial findings.}

### Pre-Mortem
{12-month failure scenario. What killed the strategy? What was missed?}

### Red-Team Response
{Incumbent's 90-day response. What specific actions would they take? What does this change in the strategy?}

### Constraint Inversions
| Assumption Inverted | Consequence | Strategy Survives? |
|--------------------|-----------|--------------------|
| {e.g., CAC is 3x estimate} | {what happens} | {yes/no/with modification} |

### Evidence Concentration Risk
| Source | Hypotheses It Supports | Risk Level |
|--------|----------------------|------------|
| {source} | {which hypotheses} | {ok / concentrated} |
