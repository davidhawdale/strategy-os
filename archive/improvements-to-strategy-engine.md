# Improvements to Strategy Engine

## Assumption–Gap–Escalation Traceability

The strategy engine currently computes assumptions, gaps, and escalations as three independent views with no explicit link between them. An assumption marked as unvalidated (load-bearing, T3, high blast radius) will raise that hypothesis's gap priority score and may trigger an escalation in the execution queue — but the dashboard has no way to show the governor *why* a specific gap ranks high or why an escalation was raised. To fix this, the Gap Definer would need to write an `assumptionRef` field into each `GapRecord` and `QueueWorkItem` it creates, pointing back to the assumption claim or ID that caused it. With that reference in the data, the Assumptions page could display "→ Gap G-03" badges next to unvalidated assumptions, and the Gap Ledger and Escalations panel could show "↑ Assumption: X" as the root cause — giving the governor a direct line of sight from unvalidated belief to operational consequence.

---

## Extension Mode

### What it is

Extension mode applies when the work extends an existing product, brand, or business rather than building from scratch. It is distinct from Bootstrap and Venture because the governor is not entering a market cold — they have existing customers, revenue, infrastructure, and distribution. The strategic question is not "can this work?" but "does this fit, and what does it change?"

### System implications

The current system assumes BUILD equals greenfield. Extension mode breaks several of those assumptions in useful ways. Existing customer data is T1 ground truth, not a T3 hypothesis — segment and problem hypotheses may reach RESEARCHED or SUPPORTED from day one without interviews. The red-team incumbent in the destruction protocol may be the governor's own current product. GTM starts from existing channels and relationships rather than estimating CAC from scratch. The single-player assumption failure mode (designing for yourself) applies differently — the governor IS a legitimate proxy customer in many extension cases, and that is valid, not a bias.

### What the system needs to handle it

To treat Extension mode properly, the strategist would need to: (1) accept existing customer evidence as T1 input at the start of BUILD rather than requiring it to be gathered; (2) adjust the single-player assumption check to distinguish "I am the only customer" from "I am a representative customer with evidence"; (3) prompt the governor for existing revenue, churn, and usage data as inputs to unit economics rather than deriving everything from benchmarks; (4) modify the red-team prompt to name the governor's own current product as a potential incumbent response. The onboarding captures Extension mode as a flag — the system changes needed to act on it are deferred as future work.

---
