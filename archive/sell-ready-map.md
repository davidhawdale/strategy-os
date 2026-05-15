# Sell Ready Map

## Gate Predicate

`sell_ready = true` requires all four conditions to pass:

```
SELL READY = true
│
├── Problem ≥ RESEARCHED
├── Segment ≥ RESEARCHED
├── No HIGH-blast unresolved blocker
└── No architecture contradiction
```

---

## How Confidence Reaches RESEARCHED

```
Hypothesis
  └── Assumptions (e.g. A1: pain real, A2: behaviour-change intent)
        └── Evidence against each assumption
              ├── T3 only        → UNVALIDATED (ceiling)
              ├── T1 or T2       → RESEARCHED allowed
              └── T1 ground truth → SUPPORTED allowed
                    (requires actual resident/SME interviews)
```

---

## How HIGH-Blast Blockers Are Cleared

```
Assumption
  ├── Blast radius = HIGH (judgment: strategy collapses if wrong)
  ├── Status = OPEN (no evidence yet)
  └── → blocks sell_ready until either:
        ├── Evidence resolves it (RESOLVED_TRUE / RESOLVED_FALSE)
        └── Gap Definer confirms it is not an active blocker on a gap
```

---

## How Architecture Contradiction Is Cleared

```
C-01 (current): §3 Unit Economics says 4–8K subs ceiling
                §7 GTM still says "8–15K by month 24"
  └── blocks until §7 is updated to match §3 recalibration
```

---

## Current State

| Condition | Status | Note |
|---|---|---|
| Problem ≥ RESEARCHED | ✓ PASS | T2 from P&J/Moray analogue |
| Segment ≥ RESEARCHED | ✓ PASS | T2 from demographics + analogue |
| No HIGH-blast blocker | ✗ FAIL | 10 HIGH-blast assumptions OPEN |
| No architecture contradiction | ✗ FAIL | C-01: §3/§7 numerical mismatch |

---

## Minimum Path to Sell Ready

```
1. Fix C-01    → update §7 GTM sub ceiling from 8–15K to 4–8K
               → Gap Definer re-runs → C-01 closes

2. Resolve E-01 → authorise Borders fieldwork (resident + SME interviews)
               → T1 evidence on A1, A2, S1, S2
               → assumptions resolve → HIGH-blast blocker count drops
               → Gap Definer re-runs → predicate passes

3. All four conditions pass → sell_ready = true
```

The two failing conditions are independent. The contradiction fix (step 1) is a
document edit and can be done immediately. The blocker clearance (step 2) requires
fieldwork and depends on E-01 being authorised.
