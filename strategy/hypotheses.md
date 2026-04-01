# Hypothesis Register

Created: {YYYY-MM-DD}
Last Reviewed: {YYYY-MM-DD}
Business Mode: {VENTURE | BOOTSTRAP | HYBRID}
Build Method: {AUTONOMOUS | GOVERNOR_AUTHORED | MIXED}
System Mode: {BUILD | CHALLENGE | REVIEW}
Sell Ready: {yes | no}
Scale Ready: {yes | no}
Register Version: {int}

---

## 1. Problem

**Claim:** {One-paragraph statement of the problem that exists independent of the solution}

**Confidence:** {unvalidated | researched | supported | broken}

**Pain Intensity:** {low | moderate | acute | existential}  
**Frequency:** {daily | weekly | monthly | rare}

**Why Now:**
- Enablers: {list of changes making this newly viable/urgent}
- Changes in last 36 months: {list}
- Why not 5 years ago: {explanation}

**Workarounds:**
- {what users do today}
- {where it fails}

**Desired State:**
- SUPPORTED means:
  - {condition 1}
  - {condition 2}
  - {condition 3}
- BROKEN means:
  - {condition X}
  - {condition Y}

**Current State:**
- Met:
  - {condition status}
- Partial:
  - {condition status}
- Missing:
  - {condition status}
- Contradicted:
  - {condition status}

**Possibility Space:**
- Considered: {list of candidate problems evaluated}
- Eliminated:
  - {candidate} -- {reason} -- {evidence}
- Alternatives carried:
  - {alternative still alive}

**Evidence:**
- [{TYPE}] [{T1|T2|T3}] {date} -- {source}: {detail}
- [{TYPE}] [{T1|T2|T3}] {date} -- {source}: {detail}

**Research Sources:**
- [{T1|T2|T3}] {date accessed} -- {url or description}: {what it established}
- [{T1|T2|T3}] {date accessed} -- {url or description}: {what it established}

**Assumptions:**
- [{K|B|O}] [{T1|T2|T3}] {claim} {[LOAD-BEARING] if applicable} {[BLAST:HIGH|MEDIUM|LOW]}
  -> Falsification: {condition}
  -> Validation: {plan}
  -> Status: {OPEN | TESTING | RESOLVED_TRUE | RESOLVED_FALSE | ESCALATED}

**Kill Condition:** {Observable condition that means this problem is not worth solving}

**Last Updated:** {YYYY-MM-DD}  
**Update Rationale:** {Why the confidence state last changed, if it changed}

---

## 2. Segment

**Claim:** {Who has this problem acutely -- observable characteristics, not demographics}

**Confidence:** {unvalidated | researched | supported | broken}

**Trigger Event:** {what causes them to actively seek a solution}  
**Budget Owner:** {who can actually pay}  
**Current Spend:** {what they already pay to solve this}

**Observable Characteristics:**
- {role / company type / workflow trait}
- {tooling / behavior / industry / constraint}
- {searchable or externally visible signal}

**Access Paths:**
- {where they can be reached}
- {channel or community}
- {sales motion implication}

**Desired State:**
- SUPPORTED means:
  - {condition 1}
  - {condition 2}
  - {condition 3}
- BROKEN means:
  - {condition X}
  - {condition Y}

**Current State:**
- Met:
  - {condition status}
- Partial:
  - {condition status}
- Missing:
  - {condition status}
- Contradicted:
  - {condition status}

**Possibility Space:**
- Considered: {list of candidate segments evaluated}
- Eliminated:
  - {segment} -- {reason} -- {evidence}
- Alternatives carried:
  - {alternative still alive}

**Evidence:**
- [{TYPE}] [{T1|T2|T3}] {date} -- {source}: {detail}
- [{TYPE}] [{T1|T2|T3}] {date} -- {source}: {detail}

**Research Sources:**
- [{T1|T2|T3}] {date accessed} -- {url or description}: {what it established}
- [{T1|T2|T3}] {date accessed} -- {url or description}: {what it established}

**Assumptions:**
- [{K|B|O}] [{T1|T2|T3}] {claim} {[LOAD-BEARING] if applicable} {[BLAST:HIGH|MEDIUM|LOW]}
  -> Falsification: {condition}
  -> Validation: {plan}
  -> Status: {OPEN | TESTING | RESOLVED_TRUE | RESOLVED_FALSE | ESCALATED}

**Kill Condition:** {Observable condition that means this is the wrong segment}

**Last Updated:** {YYYY-MM-DD}  
**Update Rationale:** {Why the confidence state last changed, if it changed}

---

## 3. Unit Economics

**Claim:** {Revenue model, LTV:CAC ratio range, payback period range, gross margin trajectory}

**Confidence:** {unvalidated | researched | supported | broken}

**Revenue Model:**
- Type: {SUBSCRIPTION | USAGE_BASED | TRANSACTIONAL | SERVICES | HYBRID_REVENUE}
- Pricing Unit: {seat | workspace | API call | project | % transaction | etc.}
- Billing Motion: {MONTHLY | ANNUAL | PER_USE | ONE_TIME | MIXED}

**Price Hypothesis:** {low} -- {high} {currency} [{T1|T2|T3}]

**Cost Structure:**

| Category | Items | Monthly Cost (range) | Tier | Source |
|---|---|---:|---|---|
| Fixed: Team | {roles x market rate} | {low -- high} | {T1/T2/T3} | {source} |
| Fixed: Infrastructure | {servers, CI/CD, monitoring} | {low -- high} | {T1/T2/T3} | {source} |
| Fixed: Software | {SaaS tools, licenses} | {low -- high} | {T1/T2/T3} | {source} |
| Fixed: Operations | {legal, accounting, insurance} | {low -- high} | {T1/T2/T3} | {source} |
| Variable: Hosting/Compute | {per-user cost, AI inference if applicable} | {low -- high} | {T1/T2/T3} | {source} |
| Variable: Payment Processing | {rate + per-txn} | {low -- high} | {T1/T2/T3} | {source} |
| Variable: Support | {per-ticket cost} | {low -- high} | {T1/T2/T3} | {source} |
| Variable: Onboarding | {per-customer cost} | {low -- high} | {T1/T2/T3} | {source} |

**Derived:**
- Gross margin: {range}%
- Burn rate: {range}/mo
- Runway: {range} months

**Channel Strategy:**

| Channel | Segment Reach | CAC Estimate (range) | Investment Split | Tier | Source |
|---|---|---:|---|---|---|
| {channel} | {how it reaches segment} | {low -- high} | {Phase 1% / Phase 2%} | {T1/T2/T3} | {source} |

- Channel-economics coherence: {does channel mix CAC align with LTV:CAC requirement?}
- ACV-channel constraint: {which channels are viable at this ACV?}
- Sequencing rationale: {which channels first and why}

**Mode Thresholds:**

| Metric | Required | Estimate (range) | Tier | Source |
|---|---|---:|---|---|
| LTV:CAC minimum | {from mode} | {low -- high} | {T1/T2/T3} | {source} |
| Payback maximum | {from mode} | {low -- high} | {T1/T2/T3} | {source} |
| Gross margin target | 70-85% | {low -- high} | {T1/T2/T3} | {source} |

**Scenario Analysis:**
- Optimistic: {if assumptions resolve favorably}
- Base: {if assumptions resolve as estimated}
- Pessimistic: {if CAC is 3x estimate, segment is 40% smaller}
- Kill: {at what point do the economics not work at all?}

**Desired State:**
- SUPPORTED means:
  - {condition 1}
  - {condition 2}
  - {condition 3}
- BROKEN means:
  - {condition X}
  - {condition Y}

**Current State:**
- Met:
  - {condition status}
- Partial:
  - {condition status}
- Missing:
  - {condition status}
- Contradicted:
  - {condition status}

**Possibility Space:**
- Considered: {list of revenue model alternatives evaluated}
- Eliminated:
  - {model} -- {reason} -- {evidence}
- Alternatives carried:
  - {alternative still alive}

**Evidence:**
- [{TYPE}] [{T1|T2|T3}] {date} -- {source}: {detail}
- [{TYPE}] [{T1|T2|T3}] {date} -- {source}: {detail}

**Research Sources:**
- [{T1|T2|T3}] {date accessed} -- {url or description}: {what it established}
- [{T1|T2|T3}] {date accessed} -- {url or description}: {what it established}

**Assumptions:**
- [{K|B|O}] [{T1|T2|T3}] {claim} {[LOAD-BEARING] if applicable} {[BLAST:HIGH|MEDIUM|LOW]}
  -> Falsification: {condition}
  -> Validation: {plan}
  -> Status: {OPEN | TESTING | RESOLVED_TRUE | RESOLVED_FALSE | ESCALATED}

**Kill Condition:** {Observable condition that means these economics cannot work}

**Last Updated:** {YYYY-MM-DD}  
**Update Rationale:** {Why the confidence state last changed, if it changed}

---

## 4. Value Proposition

**Claim:** {For [target] who [problem], [product] is a [category] that [differentiator]. Unlike [alternative], it [unique capability].}

**Confidence:** {unvalidated | researched | supported | broken}

**Jobs Addressed:**
- Functional: {what they need accomplished}
- Emotional: {how they want to feel}
- Social: {how they want to be perceived}

**Clause Validation:**

| Clause | Status | Tier | Evidence |
|---|---|---|---|
| Target customer: {who} | {tested/untested/contradicted} | {T1/T2/T3} | {evidence or none} |
| Problem: {what} | {tested/untested/contradicted} | {T1/T2/T3} | {evidence or none} |
| Category: {what} | {tested/untested/contradicted} | {T1/T2/T3} | {evidence or none} |
| Differentiator: {what} | {tested/untested/contradicted} | {T1/T2/T3} | {evidence or none} |
| vs Alternative: {what} | {tested/untested/contradicted} | {T1/T2/T3} | {evidence or none} |
| Unique capability: {what} | {tested/untested/contradicted} | {T1/T2/T3} | {evidence or none} |

**Desired State:**
- SUPPORTED means:
  - {condition 1}
  - {condition 2}
- BROKEN means:
  - {condition X}
  - {condition Y}

**Current State:**
- Met:
  - {condition status}
- Partial:
  - {condition status}
- Missing:
  - {condition status}
- Contradicted:
  - {condition status}

**Evidence:**
- [{TYPE}] [{T1|T2|T3}] {date} -- {source}: {detail}
- [{TYPE}] [{T1|T2|T3}] {date} -- {source}: {detail}

**Assumptions:**
- [{K|B|O}] [{T1|T2|T3}] {claim} {[LOAD-BEARING] if applicable} {[BLAST:HIGH|MEDIUM|LOW]}
  -> Falsification: {condition}
  -> Validation: {plan}
  -> Status: {OPEN | TESTING | RESOLVED_TRUE | RESOLVED_FALSE | ESCALATED}

**Last Updated:** {YYYY-MM-DD}  
**Update Rationale:** {Why the confidence state last changed, if it changed}

---

## 5. Growth Architecture (Proposed)

*Produced by Strategist. Non-binding until Gap Definer validates it.*

**Architecture:** {PLG | NETWORK | SALES_LED | MARKETPLACE | HYBRID}

**Hybrid Config (if applicable):**
- Primary motion: {architecture}
- Secondary motion: {architecture}
- Transition trigger: {condition}

**Support State:** {PROPOSED | VALIDATED | BLOCKED}

**Rationale:**
- ACV implication: {from unit economics}
- Buyer type: {from segment}
- Time-to-value: {fast/slow}
- Collaboration requirement: {inherent/optional}
- Selection reason: {why this architecture}

**Required Conditions:**
- {condition}
- {condition}
- {condition}

**Assumptions:**
- [{K|B|O}] [{T1|T2|T3}] {claim} {[LOAD-BEARING] if applicable} {[BLAST:HIGH|MEDIUM|LOW]}
  -> Falsification: {condition}
  -> Validation: {plan}
  -> Status: {OPEN | TESTING | RESOLVED_TRUE | RESOLVED_FALSE | ESCALATED}

**Last Updated:** {YYYY-MM-DD}

---

## 6. Solution Design (Proposed)

*Produced by Strategist. Non-binding until Gap Definer validates it.*

**Support State:** {PROPOSED | VALIDATED | BLOCKED}

**Positioning Statement:**  
For {segment} who {problem}, {product} is a {category} that {differentiator}. Unlike {alternative}, it {unique capability}.

**Category Framing:** {category name}  
**Category Rationale:** {why this category}

**Feature Map:**

| Feature | Solves Problem | Job Dimension | Priority | Tier |
|---|---|---|---|---|
| {feature} | {problem link} | {FUNCTIONAL | EMOTIONAL | SOCIAL} | {MVP | POST_MVP | FUTURE} | {T1/T2/T3} |

**MVP Scope:**
- Included:
  - {feature}
  - {feature}
- Aha moment: {specific experience that demonstrates value}
- Time-to-value target: {time}
- Excluded:
  - {feature} -- {why excluded} -- {when to add}

**Growth Loops:**
- {loop name}: {mechanism} (requires: {what}) [{T1|T2|T3}]
- {loop name}: {mechanism} (requires: {what}) [{T1|T2|T3}]

**Constraints from Hypotheses:**

| From | Constraint | If Hypothesis Changes |
|---|---|---|
| Problem | {constraint} | {re-evaluate what} |
| Segment | {constraint} | {re-evaluate what} |
| Unit Economics | {constraint} | {re-evaluate what} |
| Value Proposition | {constraint} | {re-evaluate what} |

**Adequacy Criteria:**
- {criterion 1}
- {criterion 2}
- {criterion 3}

**Last Updated:** {YYYY-MM-DD}

---

## 7. GTM Plan (Proposed)

*Produced by Strategist. Non-binding until Gap Definer validates feasibility.*

**Support State:** {PROPOSED | VALIDATED | BLOCKED}

**Channel Sequence:**

| Phase | Channels | Gate Condition | Target KPIs | Duration Estimate | Tier |
|---|---|---|---|---|---|
| {phase name} | {channels} | {what must be true to enter} | CAC: {range}, Conv: {range}, Activation: {range} | {estimate} | {T1/T2/T3} |

**Messaging Framework:**
- Primary message: {derived from Value Proposition}
- Supporting messages:
  - {message}
  - {message}
- Derived from VP: {yes/no}
- Tier: {T1/T2/T3}

**Operational Constraints:**

| From | Constraint | If Hypothesis Changes |
|---|---|---|
| Problem | {constraint} | {re-evaluate what} |
| Segment | {constraint} | {re-evaluate what} |
| Unit Economics | {constraint} | {re-evaluate what} |
| Value Proposition | {constraint} | {re-evaluate what} |

**Success Criteria:**
- {criterion}
- {criterion}

**Kill Criteria:**
- {criterion}
- {criterion}

**Last Updated:** {YYYY-MM-DD}

---

## 8. Destruction Log

*Executed and owned by Gap Definer.*

### Pre-Mortem
{12-month failure scenario. What killed the strategy? What was missed?}

### Red-Team Response
{Incumbent's 90-day response. What specific actions would they take? What changes in strategy?}

### Constraint Inversions

| Assumption Inverted | Consequence | Strategy Survives? |
|---|---|---|
| {e.g. CAC is 3x estimate} | {impact} | {yes / no / with modification} |

### Evidence Concentration Risk

| Source | Hypotheses It Supports | Risk Level |
|---|---|---|
| {source} | {targets} | {ok / concentrated} |

### Kill Signal Audit

| Signal | Ignored? | Consequence If Ignored |
|---|---|---|
| {signal} | {yes/no} | {consequence} |

**Last Run:** {YYYY-MM-DD}

---

## 9. Gap Ledger

*Executed and owned by Gap Definer.*

**Sell Ready:** {true | false}  
**Last Run:** {YYYY-MM-DD}

### Ranked Gaps

| Rank | Target | Dimension | Desired Condition | Current Observation | Priority Score | Recommended Action | Status |
|---|---|---|---|---|---:|---|---|
| 1 | {PROBLEM | SEGMENT | UNIT_ECONOMICS | VALUE_PROPOSITION | GROWTH_ARCHITECTURE | SOLUTION_DESIGN} | {dimension} | {desired} | {current} | {score} | {action} | {OPEN | IN_PROGRESS | RESOLVED | BLOCKED} |
| 2 | {target} | {dimension} | {desired} | {current} | {score} | {action} | {status} |
| 3 | {target} | {dimension} | {desired} | {current} | {score} | {action} | {status} |

### Open Gap Records
- **Gap ID:** {id}
  - Target: {target}
  - Dimension: {dimension}
  - Desired Condition: {condition}
  - Current Observation: {observation}
  - Confidence Gap: {0-3}
  - Evidence Weakness: {0-3}
  - Pain Uncertainty: {0-3}
  - Time Penalty: {0-2}
  - Blast Radius Weight: {1-3}
  - Final Priority Score: {int}
  - Recommended Action:
    - Type: {RESEARCH | INTERVIEW | PRESELL | EXPERIMENT | MODEL_REVISION | ESCALATION | HALT | ARCHITECTURE_CHANGE | SOLUTION_REDESIGN}
    - Description: {what to do}
    - Expected Output: {what this should produce}
    - Evidence Target: {T1 | T2 | T3}
  - Status: {OPEN | IN_PROGRESS | RESOLVED | BLOCKED}

### Active Blockers
- {target}: {reason} [{HIGH | MEDIUM | LOW}]

### Decision Deadlines
- {target} -- due {YYYY-MM-DD} -- iteration {n}/{max} -- {OPEN | DUE | EXCEEDED | RESOLVED}
