# StrategistOS — Formatting Standards

## Citation Format

All internet sources cited anywhere in this system — in agent files, skill
outputs, register entries, queue files, or any other document — must use
markdown hyperlink format. Plain-text URLs are not permitted.

**Rule:** `[Name](URL)` — name first, URL in parentheses.

-   Correct: `[Press Gazette](https://pressgazette.co.uk/...)`
-   Wrong: `https://pressgazette.co.uk/...`
-   Wrong: `Press Gazette (https://pressgazette.co.uk/...)`

If you have searched for a source and have the URL, record it. If a URL is
not available, do not cite the source — find one that is linkable, or label
the claim as T2/T3.

------------------------------------------------------------------------

## Evidence Entry Format

All evidence entries in the hypothesis register must follow this format:

`[TYPE] [TIER] DATE -- [Name](URL): one-sentence finding.`

-   **TYPE** — one of: `CONVERSATION`, `OBSERVATION`, `DATA`, `FOUNDER_STATED`,
    `WEB_RESEARCH`, `COMPETITIVE_ANALYSIS`, `EXPERIMENT_RESULT`
-   **TIER** — `T1`, `T2`, or `T3`
-   **DATE** — `YYYY-MM-DD`
-   **Source** — `[Name](URL)` per the Citation Format above; for local files, the file path
-   **Finding** — one sentence maximum. Analysis belongs in Update Rationale, not here.

### Evidence Quality Scoring

The dashboard Evidence panel scores each hypothesis's evidence using weighted evidence tiers.
These are the canonical weights — update here and in `views/evidence-quality.ts` if they change.

| Tier | Weight | Rationale |
|------|--------|-----------|
| T1   | 1.0    | Direct / ground-truth evidence — full strength |
| T2   | 0.6    | Synthesised / research evidence — partial credit |
| T3   | 0.2    | Assertion / unvalidated — near-zero credit |

**Formula:** `qualityScore = (t1 × 1.0 + t2 × 0.6 + t3 × 0.2) / totalEvidence`

Score range: 0 (no evidence) to 1.0 (all T1).

------------------------------------------------------------------------

## Escalation ID Convention

All escalations use the format:

`E-NN`

where `NN` is a two-digit zero-padded sequential number (E-01, E-02, E-03, …).

-   Do NOT use `Esc-N` or any other prefix. `E-` is the only authorised form.
-   Numbers are assigned in creation order regardless of which agent raises the escalation.
-   Before raising a new escalation, check the current highest-numbered escalation in
    `## 9. Governor Escalations` of `gap-analysis.md` and increment by one.
-   Cross-references to gaps (e.g. `E-01 (G-02)`) are optional but must follow the base `E-NN` format.

------------------------------------------------------------------------

## Assumptions Format

Each assumption entry in the hypothesis register must specify:

1.  **Classification** — `Belief`, `Knowledge`, or `Observation`
2.  **Tier** — `T1`, `T2`, or `T3`
3.  **Claim** — one sentence stating what must be true
4.  **Load-bearing** — `Yes` or `No` (does the hypothesis collapse if this is wrong?)
5.  **Blast radius** — `High`, `Medium`, or `Low`
6.  **Falsification condition** — what observable evidence would prove this wrong
7.  **Validation method** — how this assumption will be tested
8.  **Status** — `OPEN`, `TESTING`, `RESOLVED_TRUE`, or `RESOLVED_FALSE`

### Assumption Risk Classification

The dashboard Risk Map classifies each assumption into a risk level using three properties
already required above: load-bearing status, blast radius, and evidence tier.
These rules are the canonical reference — update here and in `views/risk-map.ts` if they change.

| Risk Level | Conditions |
|------------|------------|
| critical   | Load-bearing AND blast radius HIGH AND tier T3 |
| high       | Load-bearing AND (blast radius HIGH OR tier T3) — not already critical |
| medium     | Load-bearing AND blast radius MEDIUM |
| low        | All other assumptions (non-load-bearing, or load-bearing with LOW blast) |

------------------------------------------------------------------------

## Possibility Space Format

All Possibility Space sections in the hypothesis register must follow this order:

1.  **Considered** — all options enumerated
2.  **Alternatives carried** — options retained but not selected, each with rationale
3.  **Eliminated** — options ruled out, each with rationale

Identify which option is primary. Order must be: Considered → Alternatives carried →
Eliminated. Do not list only the winner — the full possibility space must be visible.

------------------------------------------------------------------------

## Gap Record Field Values

All gap records written to the gap ledger must use these exact values.

**Target field** — maps the gap to a hypothesis section:

| Hypothesis section  | Target value        |
|---------------------|---------------------|
| Problem             | PROBLEM             |
| Segment             | SEGMENT             |
| Unit Economics      | UNIT_ECONOMICS      |
| Value Proposition   | VALUE_PROPOSITION   |
| Growth Architecture | GROWTH_ARCHITECTURE |
| Solution Design     | SOLUTION_DESIGN     |
| GTM Plan            | GTM_PLAN            |

A gap spanning multiple sections uses the primary section as target. Multi-section gaps
may add secondary targets separated by ` / ` (e.g. `"SOLUTION_DESIGN / GTM_PLAN"`).

**Status field** — one of the following values:

| Status      | When to use                                                       |
|-------------|-------------------------------------------------------------------|
| OPEN        | Gap is active and unresolved                                      |
| IN_PROGRESS | An action is currently underway                                   |
| RESOLVED    | Gap has been closed with evidence                                 |
| BLOCKED     | Cannot progress — dependency or constraint                        |
| DEFERRED    | Below the active focus cap (Focus Rule: max 3 active); re-evaluate next pass |
| ESCALATED   | Requires governor decision; waiting for response                  |

