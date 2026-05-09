# Strategist Escalations

**From:** gap-definer
**Date:** 2026-05-09
**Pass:** 3
**Status:** All OPEN — awaiting governor response

---

# E-01 — Decision deadlines policy

**Type:** Governor escalation (VALUES)
**Issued:** 2026-05-09
**Issued by:** Gap Definer
**Blast radius:** MEDIUM
**Status:** OPEN

## Decision needed

What deadline does the governor set for G-01 / G-02 / G-03 fieldwork completion, and what is the governor's tolerance for indefinite RESEARCHED-state exploration?

## Why system cannot decide

Deadline-setting is a values trade-off (speed of validation vs cost/quality of primary research). No deadlines are defined in Register Version 3. Decision Rule 5 requires deadlines to prevent indefinite exploration but cannot autonomously set them.

## Options

| Option | Window | Trade-off |
|---|---|---|
| A: Aggressive | 6 weeks | Lower n, faster iteration; higher methodological-compromise risk. |
| B: Standard (recommended) | 12 weeks | n>=200 vendor-panel sample, depth interviews + AI trial + advertiser conversations in parallel. |
| C: Thorough | 16-20 weeks | Higher quality and formal analysis; risks competitor windows (red-team National World 90-day response). |

## System recommendation

**Option B (12 weeks).** Aligns with §1 Kill Condition n>=200 sample requirement; absorbs the red-team National World 90-day window without unduly compressing methodology.

## What is at stake

Without a deadline, the strategy can sit in RESEARCHED indefinitely. With too tight a deadline, fieldwork becomes solution-led shortcuts (Rule 8 violation downstream).

## Expected response

A bound deadline (date or weeks-from-budget-approval) for each of T-01, T-02, T-03 completion.

---

# E-02 — Fieldwork budget commitment

**Type:** Governor escalation (VALUES + GROUND_TRUTH)
**Issued:** 2026-05-09
**Issued by:** Gap Definer
**Blast radius:** HIGH
**Status:** OPEN

## Decision needed

Approve fieldwork budget for G-01 / G-02 / G-03. Indicative range £8-£20K covering n=200 telephone/online survey + 15-20 depth interviews + small Facebook CPL test + n=10 SME interviews + AI-trial inference cost.

## Why system cannot decide

Strategy cannot conduct primary research without governor-approved spend. The range depends on governor's recruitment-vendor preferences (panel vs founder-recruited).

## Options

| Option | Cost | Trade-off |
|---|---|---|
| A: Founder-led + DIY | ≈£3-£6K | Lowest cost; recruitment-bias risk; sample-skew risk on geographic/demographic targets. |
| B: Mixed (recommended) | ≈£8-£12K | Vendor panel for survey (n=200 integrity); founder-led for depth interviews and SME conversations (also serves Architecture condition 4). |
| C: Full-vendor | ≈£15-£20K | Highest sample integrity; longest lead time. |

## System recommendation

**Option B.** Survey integrity via vendor panel; qualitative depth via founder relationships, which also begins building Architecture condition 4 (founder-led local presence) without committing to deployment.

## What is at stake

Without fieldwork the strategy cannot exit RESEARCHED. Without sample integrity the evidence is contaminated and any SUPPORTED state derived from it is unsafe — sell_ready/scale_ready built on contaminated data is worse than no readiness signal.

## Expected response

Budget approval (or rejection) plus selection of recruitment-vendor option (A / B / C) so T-01, T-02, T-03 can be scoped concretely.

---

# E-03 — Reconcile §3 / §7 numerical contradiction (C-01)

**Type:** Strategist task (JUDGMENT — not Governor)
**Issued:** 2026-05-09
**Issued by:** Gap Definer
**Blast radius:** MEDIUM
**Status:** OPEN — assigned to Strategist for next BUILD pass
**Blocks:** GTM execution until resolved (Decision Rule 6)

## What needs reconciling

§3 Unit Economics was recalibrated 2026-05-09 to a 4-8K paid subs ceiling (6K base case) using the Press & Journal pro-rata.

§7 GTM "Constraints from Hypotheses" still states "8-15K paid subs by month 24." That number is from the pre-recalibration model and was not updated when §3 changed.

## Required action

In the next BUILD pass, the Strategist must:
1. Replace the §7 "8-15K paid subs by month 24" line with the recalibrated 4-8K range.
2. Adjust §7 Phase 2 KPI ("Paid subs: 2,500-5,000 by month 18") and Phase 3 KPI ("Paid subs: 6,000-9,000 by month 36") for internal consistency with the new ceiling — confirm or revise.
3. Propagate any consequent changes to Phase 2/3 channel mix and CAC targets if the lower ceiling materially affects channel economics.

## Why this is a Strategist task, not a Governor escalation

The contradiction is a content-update miss, not a values choice. Gap Definer cannot rewrite §1-§7 (per CLAUDE.md write-authority). Logged here for tracking and to confirm GTM execution stays blocked until the Strategist pass closes the gap.

## Re-classification on completion

C-01 marked RESOLVED. GTM execution unblocked. Architecture re-evaluation possible if Phase 1 KPIs also shift.
