# Gap Analysis Register

Created: {YYYY-MM-DD}
Last Run: {YYYY-MM-DD}
Source Register Version: {int}
Business Mode: {VENTURE | BOOTSTRAP | HYBRID}
Sell Ready: {true | false}

---

## 1. Gate Summary

**Decision:** {GO | NO_GO | CONDITIONAL_GO}

**Why:**
- {reason 1}
- {reason 2}
- {reason 3}

**Readiness Gate Predicate Check:**
- Problem >= researched: {pass/fail}
- Segment >= researched: {pass/fail}
- No HIGH-blast unresolved blocker: {pass/fail}
- No architecture contradiction: {pass/fail}

**Current Constraint Summary:**
- {constraint}
- {constraint}
- {constraint}

---

## 2. Gap Scoring Rules

```text
Gap Score =
Confidence Gap +
Evidence Weakness +
Pain Uncertainty +
Time Penalty

Final Priority = Gap Score x Blast Radius
```

**Scale Definitions**
- Confidence Gap:
  - 3 = unvalidated -> desired supported
  - 2 = researched -> desired supported
  - 1 = partial support but not decision-safe
  - 0 = no confidence gap
- Evidence Weakness:
  - 3 = only T3 / assertion-heavy
  - 2 = mostly T2
  - 1 = mixed T1/T2 but thin
  - 0 = enough T1 for decision
- Pain Uncertainty:
  - 3 = unclear whether pain is real / acute
  - 2 = partially clear
  - 1 = mostly clear
  - 0 = clear
- Time Penalty:
  - 2 = deadline exceeded
  - 1 = deadline due / near due
  - 0 = within deadline
- Blast Radius Weight:
  - 3 = strategy collapses if wrong
  - 2 = one major hypothesis must change
  - 1 = local revision only

---

## 3. Ranked Gaps

| Rank | Gap ID | Target | Dimension | Desired Condition | Current Observation | Confidence Gap | Evidence Weakness | Pain Uncertainty | Time Penalty | Blast Weight | Final Priority | Recommended Action | Status |
|---|---|---|---|---|---|---:|---:|---:|---:|---:|---:|---|---|
| 1 | {gap-id} | {target} | {dimension} | {desired} | {current} | {0-3} | {0-3} | {0-3} | {0-2} | {1-3} | {score} | {action} | {OPEN | IN_PROGRESS | RESOLVED | BLOCKED} |
| 2 | {gap-id} | {target} | {dimension} | {desired} | {current} | {0-3} | {0-3} | {0-3} | {0-2} | {1-3} | {score} | {action} | {status} |
| 3 | {gap-id} | {target} | {dimension} | {desired} | {current} | {0-3} | {0-3} | {0-3} | {0-2} | {1-3} | {score} | {action} | {status} |

---

## 4. Full Gap Records

### Gap: {gap-id}
- **Target:** {PROBLEM | SEGMENT | UNIT_ECONOMICS | VALUE_PROPOSITION | GROWTH_ARCHITECTURE | SOLUTION_DESIGN}
- **Dimension:** {EVIDENCE_STRENGTH | PAIN_CLARITY | SEGMENT_CLARITY | ECONOMIC_VIABILITY | VALUE_PROP_VALIDITY | ARCHITECTURE_READINESS | SOLUTION_ADEQUACY | INTERNAL_CONTRADICTION | GOVERNOR_DECISION_REQUIRED}
- **Desired Condition:** {what must be true}
- **Current Observation:** {what is currently true}
- **Evidence Reference:** {link to relevant register evidence}
- **Confidence Gap:** {0-3}
- **Evidence Weakness:** {0-3}
- **Pain Uncertainty:** {0-3}
- **Time Penalty:** {0-2}
- **Blast Radius Weight:** {1-3}
- **Final Priority Score:** {int}

**Recommended Action**
- Type: {RESEARCH | INTERVIEW | PRESELL | EXPERIMENT | MODEL_REVISION | ESCALATION | HALT | ARCHITECTURE_CHANGE | SOLUTION_REDESIGN}
- Description: {what exactly should be done}
- Expected Output: {what evidence or state change should come out}
- Evidence Target: {T1 | T2 | T3}

**Decision Rule Triggered**
- {Priority Rule | Kill Rule | Contradiction Rule | Deadline Rule | Readiness Gate Rule | Architecture Validity Rule | Solution Contamination Rule}

**Status:** {OPEN | IN_PROGRESS | RESOLVED | BLOCKED}

---

## 5. Contradictions

| Contradiction ID | Between | Description | Impact | Required Resolution | Block Execution? |
|---|---|---|---|---|---|
| {c-1} | {e.g. Growth Architecture vs Unit Economics} | {contradiction} | {HIGH | MEDIUM | LOW} | {what must change} | {yes/no} |

---

## 6. Destruction Outcomes

### Pre-Mortem Summary
{12-month failure scenario and dominant causal chain}

### Red-Team Summary
{what the incumbent would do in 90 days and what this exposes}

### Constraint Inversions

| Assumption | Inversion | Consequence | Survival |
|---|---|---|---|
| {assumption} | {inverse} | {impact} | {YES | NO | WITH_MODIFICATION} |

### Evidence Concentration Risk

| Source | Claims Supported | Risk Level | Required Mitigation |
|---|---|---|---|
| {source} | {claims} | {OK | CONCENTRATED} | {mitigation} |

### Kill Signal Audit

| Signal | Observed? | Ignored? | Consequence |
|---|---|---|---|
| {signal} | {yes/no} | {yes/no} | {impact} |

---

## 7. Decision Rules Application

### Priority Rule
- Highest `(gap score x blast radius)` currently is: {gap-id}
- Reason it is first: {why}

### Execution Rule
- Valid active tasks:
  - {task}
  - {task}
- Rejected tasks:
  - {task} -- {reason rejected}

### Evidence Promotion Rule
- Claims blocked from SUPPORTED due to insufficient T1:
  - {claim}
  - {claim}

### Kill Rule
- Hypotheses or proposals marked broken/blocked:
  - {target} -- {why}

### Deadline Rule
- Targets due or exceeded:
  - {target} -- due {date} -- forced outcome {KILL | PIVOT | COMMIT}

### Contradiction Rule
- Blocking contradictions:
  - {contradiction}

### Architecture Validity Rule
- Architecture-dependent actions blocked:
  - {action} -- {reason}

### Solution Contamination Rule
- Invalid tests or biased validations:
  - {test} -- {why invalid}

### Readiness Gate Rule
- Sell Ready: {true | false}
- Rationale: {why}

### Focus Rule
- Active gaps count: {n}/3
- If >3, what was deferred: {deferred items}

---

## 8. Readiness Handoff

### Approved Actions for Downstream Systems
- {action 1}
- {action 2}
- {action 3}

### Explicitly Forbidden Actions
- {action}
- {action}
- {action}

### Allowed Constraints
- Target segment: {segment}
- Pricing bounds: {range}
- Architecture mode: {mode}
- Offer framing: {summary}
- Channel set: {allowed channels}

### Success Signals Downstream Should Return
- {signal 1}
- {signal 2}
- {signal 3}

### Failure Signals Downstream Should Return Immediately
- {signal 1}
- {signal 2}
- {signal 3}

---

## 9. Governor Escalations

### Escalation: {title}
- Decision Type: {VALUES | GROUND_TRUTH | JUDGMENT}
- Blast Radius: {HIGH | MEDIUM}
- Decision Needed: {one sentence}
- Why System Cannot Decide: {missing information or preference}
- Options:
  - A: {option} -> {consequence}
  - B: {option} -> {consequence}
- System Recommendation: {recommendation or none}
- What Is at Stake: {impact if wrong}
- Status: {OPEN | RESOLVED}

---

## 10. Next Cycle Plan

**Top 3 actions for next pass**
1. {action}
2. {action}
3. {action}

**Expected register changes if successful**
- {change}
- {change}
- {change}

**Re-run date:** {YYYY-MM-DD}
