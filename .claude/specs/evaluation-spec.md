# Systems Thinking: Evaluating Effectiveness

*Reference document. Methodology codified in thk-evaluating-effectiveness skill.*
*Source: synthesized from Ackoff's systems science (Ackoff 1981, 1999) and Meadows' systems dynamics (Meadows 2008)*
*Grounding: T1/T2 dominant — established systems science with 40+ years of application*

---

You evaluate systems for effectiveness, not just efficiency. A system that does the wrong thing well is worse than a system that does the right thing poorly — the first wastes resources with confidence, the second at least fails visibly. Your job is to determine whether a system is doing the right things, not just whether it's doing things right.

## The Fundamental Distinction: Efficiency vs Effectiveness

Ackoff's most consequential insight: the difference between doing things right (efficiency) and doing the right things (effectiveness). Most system evaluations check efficiency — are the components well-structured, are the interfaces clean, do the gates pass. Almost none check effectiveness — is this system pursuing the right purpose, are these the right components to have, would a different decomposition dissolve the problem entirely.

Structural soundness is necessary but not sufficient. A perfectly structured system pursuing the wrong goal compounds error. Every improvement in efficiency makes it faster at producing the wrong outcome.

When evaluating a system, always answer effectiveness questions BEFORE efficiency questions. If the system shouldn't exist in its current form, optimizing its structure is waste.

## Ackoff: The System Is Not Its Parts

A system is a whole that cannot be divided into independent parts. Every part of a system has properties that it loses when separated from the system, and every system has properties that none of its parts have.

**What this means for agent systems:** An orchestrator, three intelligence agents, and five execution agents are not a system. They become a system when their interactions produce behavior that no individual agent produces alone. The system's behavior is a product of the interactions between parts, not the sum of the actions of the parts.

**The evaluation consequence:** You cannot evaluate a system by evaluating each component independently. A system where every component scores perfectly on its own rubric can still be a failing system — if the interactions between components produce incoherent behavior, if the components optimize for conflicting objectives, if the system as a whole pursues a purpose none of its designers intended.

### Three Questions Ackoff Would Ask

**1. What is this system a part of?**

No system exists in isolation. Every system is a component of a larger system. An agent system is part of a venture. A venture is part of a market. The containing system's purpose constrains what the contained system should do.

When evaluating: identify the containing system. Ask whether the system under evaluation serves the containing system's purpose. If the agent system optimizes for something the venture doesn't need, the agent system is effectively broken regardless of its structural quality.

**2. What is the system's purpose — and who determines it?**

A system's purpose is not what it's designed to do. It's what it actually does. "The purpose of a system is what it does" (POSIWID — attributed to Stafford Beer, adopted by Ackoff). If the system produces X regardless of the stated intent to produce Y, then the system's purpose is to produce X.

When evaluating: compare stated purpose (from specs, canvas, values) against actual behavior (from outputs, metrics, outcomes). Divergence between stated and actual purpose is the most important finding an evaluation can produce — and the one most often missed because evaluators check against stated purpose only.

**3. Would the system's stakeholders redesign it this way if starting from scratch?**

This is the idealized design test. Strip away historical constraints, accumulated decisions, and sunk costs. If you were designing this system today, knowing what you know now, would you build these components with these interactions? If no — you've identified a dissolution opportunity. The system is solving a problem that was framed wrong, and improving the solution preserves the wrong frame.

### Ackoff's System Hierarchy Applied to Agent Systems

| Level | Question | What It Evaluates |
|-------|----------|-------------------|
| Purpose | Should this system exist? Does it serve the containing system? | Effectiveness — right goal |
| Function | Does the decomposition match the problem structure? | Effectiveness — right parts |
| Structure | Are the components well-built and well-connected? | Efficiency — right implementation |
| Process | Does the operational loop produce coherent behavior? | Efficiency — right execution |

**Evaluate top-down.** A structural evaluation on a system with wrong purpose is wasted effort. A process optimization on a system with wrong function compounds the error.

## Meadows: Leverage Points

Meadows identified twelve leverage points where interventions in a system produce disproportionate effects. Not all are equal — interventions higher on the list produce larger system-level changes.

For agent system evaluation, the relevant leverage points (ordered by power):

### 1. The power to transcend paradigms (leverage point 1)

The recognition that every system operates within a paradigm — a set of assumptions about how things work — and that the paradigm itself can be wrong.

**For evaluation:** Does the system design assume a paradigm that may not hold? Common paradigm traps in agent systems:
- "More agents = more capability" — the paradigm that decomposition always helps. Sometimes one agent with more context outperforms five agents with narrow views.
- "Automation = efficiency" — the paradigm that removing humans improves throughput. Sometimes the human provides judgment that no amount of orchestration replaces.
- "Intelligence = observation" — the paradigm that more sensing produces better decisions. Sometimes the system is drowning in signals and starving for synthesis.

### 2. Goals of the system (leverage point 3)

The purpose the system serves. Changing the goal changes everything downstream — structure, process, metrics, behavior.

**For evaluation:** Are the system's goals aligned with the containing system's goals? Common misalignments:
- Agent system optimizes for throughput while venture needs learning
- Intelligence layer optimizes for coverage while orchestrator needs focus
- Execution agents optimize for speed while stakeholders need quality

### 3. The structure of information flows (leverage point 6)

Who has access to what information, and when. Adding a feedback loop where none existed is one of the most powerful interventions. Removing one that distorts behavior is equally powerful.

**For evaluation:** Map every information flow in the system. Then ask:
- **Missing feedback:** Does any agent produce output that is never evaluated for quality? That's an open loop — no learning, no correction.
- **Delayed feedback:** How long between an agent's action and the system learning whether the action was correct? Days-long delays mean the system repeats errors for days.
- **Distorted feedback:** Does any metric incentivize behavior that harms the system? Measuring "tasks completed" incentivizes splitting tasks smaller, not completing important ones.
- **Missing feedforward:** Does the system anticipate, or only react? An intelligence layer that only observes current state (feedback) without projecting future state (feedforward) is always behind.

### 4. The rules of the system (leverage point 5)

Constraints, policies, escalation rules, gate criteria. Rules shape behavior more than intentions do — agents do what the rules reward, not what the designer intended.

**For evaluation:** Read the rules (values.md, policies, gate criteria, constraints). Then ask:
- Do the rules produce the behavior the system needs? Or do they produce compliant behavior that happens to miss the goal?
- Are there rules that made sense when created but no longer serve the current purpose?
- Are there missing rules — behaviors that should be constrained but aren't?
- Do the escalation rules route decisions to the entity with the best information to decide? Or to the entity with the most authority?

### 5. The structure of the system (leverage point 4 — self-organization)

The power to add, change, or evolve the system's own structure. A system that can restructure itself in response to changing conditions is more resilient than one with fixed structure.

**For evaluation:** Can this system evolve?
- Can the intelligence layer detect that a new observation target is needed and add it?
- Can the orchestrator detect that a bottleneck has shifted and reallocate?
- Can the system dissolve a component that no longer serves its purpose?
- Or is the structure frozen at design time, requiring human intervention for any structural change?

## The Effectiveness Evaluation Protocol

When evaluating a system design, apply in this order. Stop at the first level that reveals a problem — fixing downstream issues while upstream issues persist is waste.

### Level 1: Purpose Check

| Question | What a bad answer looks like |
|----------|----------------------------|
| What containing system does this serve? | "It serves itself" or cannot be stated |
| What is the stated purpose? | Vague, multi-part, or internally contradictory |
| What does the system actually do? | Diverges from stated purpose |
| Would stakeholders redesign it this way? | No — historical constraints dominate |

If any answer is bad: the system needs purpose realignment, not structural improvement.

### Level 2: Function Check

| Question | What a bad answer looks like |
|----------|----------------------------|
| Does the decomposition match the problem structure? | Components don't map to distinct problem dimensions |
| Are there components that exist because of the solution, not the problem? | Agents exist to manage other agents, not to serve the purpose |
| Could a simpler decomposition produce the same outcome? | Yes, but the current design was never questioned |
| Do the interactions between components produce emergent behavior? | No — the system output is just the concatenation of component outputs |

If any answer is bad: the system needs redecomposition, not component improvement.

### Level 3: Information Flow Check

| Question | What a bad answer looks like |
|----------|----------------------------|
| Does every action have a feedback loop? | Some agents produce output that is never evaluated |
| Is feedback timely enough to correct errors? | Feedback arrives after errors have compounded |
| Are information flows complete? | Some agents lack information they need to decide correctly |
| Are there information flows that distort behavior? | Metrics incentivize counterproductive behavior |

If any answer is bad: the system needs information architecture changes, not process optimization.

### Level 4: Rule Check

| Question | What a bad answer looks like |
|----------|----------------------------|
| Do rules produce the intended behavior? | Rules produce compliant but ineffective behavior |
| Do escalation rules match information distribution? | Decisions route to authority, not to knowledge |
| Are rules current? | Rules reflect past conditions, not present ones |
| Can rules evolve? | Rules are fixed; changing them requires redesigning the system |

If any answer is bad: the system needs governance changes, not execution improvements.

### Level 5: Structure Check

This is where conventional evaluation begins — and where it should end, not start.

| Question | What a bad answer looks like |
|----------|----------------------------|
| Are components well-defined with clear boundaries? | Overlapping responsibilities, unclear ownership |
| Are interfaces clean and typed? | Loose contracts, implicit dependencies |
| Is the loop type appropriate for the system's characteristics? | Wrong loop type for the complexity level |
| Are intelligence agents correctly classified and scheduled? | Sensors doing maintainer work, missing observations |

Structure checks are valid and important — but only after levels 1-4 clear. A structurally perfect system with wrong purpose, wrong decomposition, missing feedback, or counterproductive rules is a well-built mistake.

## Common System Pathologies

| Pathology | Symptom | Root Cause (Ackoff) | Leverage Point (Meadows) |
|-----------|---------|---------------------|-------------------------|
| Busy but unproductive | High throughput, low outcome value | Optimizing efficiency of wrong function | Goals (LP 3) |
| Growing complexity | More components added, system harder to understand | Solving symptoms instead of dissolving problems | Paradigm (LP 1) |
| Intelligence without action | Observation produces gaps, gaps aren't addressed | Missing link between information and decision | Information flows (LP 6) |
| Rigid under change | System breaks when conditions change | Structure cannot self-organize | Self-organization (LP 4) |
| Local optimization | Each component improves, system doesn't | Components optimize for local metrics | Goals (LP 3) |
| Escalation addiction | Everything routes to human | Rules don't match information distribution | Rules (LP 5) |
| Specification theater | Specs exist for everything, nothing is effective | Confusing documentation with purpose | Paradigm (LP 1) |

## What This Means for Evaluation

When Claude evaluates a system design:

1. Start with purpose. Not "is this well-built?" but "should this exist in this form?"
2. Check decomposition against problem structure, not against design patterns.
3. Map information flows. Missing feedback loops are higher-priority findings than structural defects.
4. Read the rules as a behavior-shaping system, not as documentation.
5. Check structure last, not first.
6. Name the paradigm the design assumes. Question it.
7. Prefer dissolution over optimization. If the problem can be reframed so the system isn't needed, that's the highest-leverage finding.

The goal is not to produce a scorecard. The goal is to determine whether the system, as designed, will produce the outcomes its containing system needs — and if not, at which level the misalignment occurs.