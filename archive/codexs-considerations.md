# Codexs Considerations

This note captures Codex's current view of the StrategistOS application so it
can be worked through separately from the live doctrine.

## Overall View

The system is pointed in a strong direction. Its core strength is that it is
not trying to be "an AI that writes strategy"; it is trying to be a strategy
validation machine.

The best parts are:

- Strategist constructs candidate truth.
- Gap Definer attacks, scores, blocks, and decides.
- Governor supplies judgment and ground truth.
- The dashboard acts as an operational cockpit over the markdown artifacts.

This is healthier than many agent systems because it assumes the model will
over-cohere narratives unless forced to expose uncertainty.

## Recommended Canonical Ownership

To reduce duplication and drift, each concept should have one canonical home:

- `CLAUDE.md`: doctrine, system purpose, authority model.
- `STANDARDS.md`: contracts, citation rules, evidence formats, enum values,
  escalation IDs, assumptions format.
- `.claude/agents/*`: role procedures.
- `.claude/skills/*`: specialist procedures.
- `README.md`: human-facing product overview.
- `AGENTS.md`: Codex adapter only.

The same ideas currently appear in several places:

- system purpose
- two-agent model
- evidence tiers
- readiness gates
- file structure
- artifact ownership
- no execution before readiness

That is understandable at this stage, but it will create drift as the system
grows.

## Agent Thoughts

The agents are broadly doing the right thing.

The Strategist is good at constructing candidate truth and carries useful
self-awareness around:

- technical founder failure modes
- overconfidence
- evidence recycling
- premature precision
- narrative coherence masquerading as truth

The Gap Definer is especially strong. Deterministic gap scoring, destruction
protocol, readiness gates, and the focus cap make it feel like a real
decision layer rather than a second writer.

Suggested improvements:

- Remove `gap-enforcing-decisions` from the Strategist's skill list. Strategist
  can understand decision rules, but enforcement belongs to Gap Definer.
- Give Strategist a clearer handoff package format after `BUILD` or
  `CHALLENGE`.
- Put Gap Definer's allowed edits in one canonical place: it may reclassify
  states and own sections 8-9, but should not rewrite Strategist-owned
  reasoning except through explicit reclassification or contradiction notes.
- Add a "do not continue research forever" rule for Strategist, similar to
  Gap Definer's deadline rule.

## Skill Thoughts

The skills are mostly doing the right thing. They are procedural, gated, and
output-oriented, which is the right shape.

The main risk is that some skills are becoming miniature agents rather than
skills. This is most visible in:

- `stg-designing-solutions`
- `stg-designing-channels`
- `stg-calculating-economics`

That may be acceptable, but their boundaries should stay crisp.

Suggested improvements:

- Add a short "Inputs / Outputs / Do Not Decide" block at the top of every
  skill.
- Make every skill produce a named output block that maps directly into the
  register.
- Avoid repeating tier definitions, confidence rules, or citation rules inside
  skills; point to `STANDARDS.md`.
- State dependency chains once, either in frontmatter or a standard header.
- Split research skills from composition skills. Research gathers evidence;
  composition assembles register sections from evidence.

## High-Priority Cleanup Ideas

1. Fix the phrase in `CLAUDE.md`: "No SUPPORTED without T3" should become
   something like "No SUPPORTED without qualifying ground-truth T1 evidence."
   The current wording contradicts the rest of the system.

2. Normalize the product name. The repo uses both `StrategistOS` and
   `StrategyOS`. Pick one, or explicitly define the distinction.

3. Create canonical templates for:
   - `strategy/problem.md`
   - `strategy/hypotheses.md`
   - `strategy/gap-analysis.md`
   - queue actions
   - escalations

4. Add contract tests for dashboard parsing and views. The dashboard is
   effectively enforcing the written operating system, so changes to
   `STANDARDS.md` that affect structure should be backed by parser/view tests.

5. Introduce a lightweight schema document, even if markdown remains the
   source of truth. For example: `docs/register-schema.md` or
   `templates/register.schema.md`.

## Product Principle

The application is strongest when it behaves like a compiler for strategic
uncertainty:

1. Inputs go in.
2. Hypotheses are constructed.
3. Assumptions are typed.
4. Gaps are scored.
5. Contradictions are surfaced.
6. Readiness is either blocked or granted.

The product's magic is not the generated strategy. It is the disciplined
refusal to believe the strategy too early.

## Thing To Guard Against

Guard against ritual completeness: beautiful registers that feel rigorous
because every section is filled.

The Gap Definer already fights this. Keep strengthening that side. The system
should reward uncertainty being exposed, not paperwork being completed.
