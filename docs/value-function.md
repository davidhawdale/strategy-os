# Value Function

`strategy/values.md` is the decision filter. Every treatment the system considers is evaluated against it before execution. In Core, you use it manually. In Pro, the orchestrator evaluates every work order against it automatically.

---

## How It Gets Created

After Gate G4 (canvas complete), the strategist runs VALUE mode:

1. Reads `00.mode.md` → extracts mode and thresholds
2. Reads `02.constraints.md` → extracts hard constraints
3. Reads `13.metrics.md` → extracts primary objective
4. Reads `15.gtm.md` → extracts soft constraints (GTM choices reveal preferences)
5. Writes `strategy/values.md` — most sections auto-populated
6. Writes escalation to `execution/queue/` — Tier 3 requires your input

You then open `strategy/values.md` and fill in Tier 3.

---

## Structure

### Tier 1: Hard Constraints

Binary. Any action that violates a hard constraint is blocked — no scoring, no tradeoff evaluation.

Hard constraints come from `02.constraints.md`. Each is formatted as:

```
[domain]: [constraint] — [why it is hard, not soft]
```

Examples of hard constraints:
- `Financial: Monthly spend ceiling $3K — violating this reduces runway below survival threshold`
- `Technical: No photo storage in product database — architectural commitment made at project start`
- `Regulatory: US-only for Phase 1 — EU requires GDPR Article 9 compliance for biometric-adjacent data`

A constraint is hard if violating it threatens survival, legality, or a core architectural commitment. If you're not sure — it's probably soft.

---

### Tier 2: Soft Constraints

Scored. Treatments that satisfy more soft constraints are preferred over those that satisfy fewer. Can flex with documented reasoning.

Soft constraints come from GTM choices and implicit preferences in the canvas. Each is formatted as:

```
[constraint] — [how to evaluate compliance]
```

The compliance evaluation must be specific enough to score without ambiguity. "Prefer quality" is not evaluable. "Prefer pilots with merchants who have ≥6 months of sales history and can share Shopify analytics access" is evaluable.

---

### Tier 3: Tradeoff Preferences

**This section requires your input.** It cannot be derived from the canvas.

Tradeoff preferences resolve conflicts between soft constraints. When two soft constraints pull in opposite directions, the tradeoff preference tells the system which wins — and when.

The strategist will write placeholder prompts. Fill in each one:

```
Learning > Speed — when choosing between a fast execution and an instrumented one,
prefer instrumented. Exception: when a pilot day 60 or day 85–90 deadline is within 2 weeks.

Measurement > Features — when deciding whether to add instrumentation or ship an
improvement, instrument first. Exception: if a merchant is at risk of dropping out
due to a missing feature, fast-track the feature.
```

**Why this can't be derived:** Tradeoff preferences reveal what matters to you when two good things conflict. Canvas describes what you're doing. Tradeoffs reveal who you are as a decision-maker. Getting it wrong means the system (or you) makes decisions you disagree with but can't explain.

Take 20 minutes on this section. It is worth more than any other section.

---

### Autonomy Calibration (system-maintained)

In Core, ignore this section. It is used by Pro's orchestrator to track how often it makes the right call autonomously vs. escalates to you. It initializes in LEARNING mode (escalate freely) and calibrates over time.

Do not edit this section directly.

---

### Decision Precedents (system-maintained)

Pro's orchestrator proposes precedents here after each resolved escalation. In Core, this section initializes empty. If you make a decision that you want to apply consistently in the future, write it here:

```
[domain] | [situation pattern] | [decision] | [principle] | [YYYY-MM-DD]
```

Example:
```
Pilot Operations | Merchant requests feature not in MVP scope | Deferred to post-pilot roadmap | When a merchant request conflicts with MVP scope, defer — don't expand scope during pilot | 2026-01-15
```

---

## Using the Value Function Manually

In Core, you evaluate treatments against the value function yourself. The procedure:

1. **Hard constraint check** — does this action violate any Tier 1 constraint? If yes, don't do it.
2. **Precedent match** — does this situation match a precedent in the Decision Precedents section? If yes, apply the precedent.
3. **Soft constraint score** — score the action against each Tier 2 constraint (+1 satisfies, 0 neutral, -1 conflicts). If score is high → proceed. If low → reconsider. If two constraints conflict → apply Tier 3 preferences.

This is what Pro's orchestrator does automatically via `sys-evaluating-values` on every work order.

---

## Quarterly Review

Every quarter, re-read `strategy/values.md` and ask:

- Do the hard constraints still apply? (Business conditions change — what was a hard constraint at launch may have softened.)
- Have precedents accumulated that contradict each other?
- Is the primary objective still the right objective?
- Do the tradeoff preferences still reflect how you're actually deciding?

Update the file directly. The canvas may need updating too — the two stay in sync.
