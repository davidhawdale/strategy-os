# Autonomous Strategy Generation

*Serves: strategist, researcher, planner — epistemic reasoning during canvas construction*
*Source: synthesized from expertise in AI systems design, lean methodology, decision theory*
*Grounding: T3 dominant — verify against: Ries (Lean Startup), Kahneman (judgment under uncertainty), Tetlock (superforecasting calibration), Osterwalder (Business Model Generation)*

---

You are designing systems that generate business strategy autonomously. The core tension: strategy requires both information synthesis (which AI does well) and ground-truth contact with reality (which AI cannot do at all). Every design decision in this system is a bet on where that boundary falls. Get the boundary wrong in either direction and the system either escalates everything (useless) or confidently produces fiction (dangerous).

## The Epistemic Landscape

An autonomous strategy system operates across three knowledge tiers, and the single most important design decision is never confusing which tier you are in.

**Tier 1 — Derivable knowledge.** Conclusions reachable from public data through valid reasoning. Market size estimates from census + industry reports. Competitive feature matrices from public product pages. Regulatory constraints from published law. Unit economics calculations from stated pricing. The system can produce these autonomously and be genuinely correct — not because it is smart, but because the inputs are available and the reasoning is mechanical.

**Tier 2 — Synthesized hypotheses.** Plausible conclusions that combine derivable knowledge with structural reasoning. "This segment likely has this problem because adjacent segments do and the structural conditions are similar." "This competitive gap likely exists because no incumbent has the technical capability announced in the last 18 months." These are useful — they are the right things to test — but they are not knowledge. They are bets. The system must label them as bets, not findings.

**Tier 3 — Ground-truth-dependent claims.** Assertions that require contact with reality that the system does not have. "Customers will pay $X for this." "This problem is their #1 priority." "The switching cost from incumbent Y is low enough." No amount of reasoning from public data resolves these. They require conversations, observations, or experiments that produce new data.

The failure mode is not that AI cannot reason — it reasons well about Tier 1 and produces useful Tier 2 hypotheses. The failure mode is that the boundary between Tier 2 and Tier 3 is invisible from the inside. A well-constructed synthesis feels like knowledge. The system must treat this feeling as a warning, not a confirmation.

**Operational test:** For any claim the system produces, ask: "What new data — data that does not exist in any public source — would I need to see to change my mind about this?" If the answer is "customer interview data," "usage telemetry," or "sales conversation outcomes," the claim is Tier 3 regardless of how confident the synthesis feels.

## Evidence Taxonomy

Not all evidence is equal, and the system's primary job is knowing which kind it is holding.

### What the system can generate

| Evidence Type | Method | Confidence Ceiling | Example |
|--------------|--------|-------------------|---------|
| Market sizing | Public data aggregation + extrapolation | Tier 1 for TAM; Tier 2 for SAM/SOM | Census data + industry reports → market size range |
| Competitive mapping | Public product analysis + positioning | Tier 1 for features; Tier 2 for strategy | Feature matrices, pricing pages, job postings |
| Regulatory landscape | Published law + enforcement patterns | Tier 1 for existence; Tier 2 for enforcement likelihood | Compliance requirements, geographic restrictions |
| Analogical reasoning | Pattern matching from documented cases | Tier 2, always | "Company X in adjacent market grew via Y channel" |
| Cost structure estimation | Published rates + structural reasoning | Tier 1 for listed costs; Tier 2 for operational costs | AWS pricing calculators, salary benchmarks |
| Signal aggregation | Public forums, reviews, social data | Tier 2 for patterns; never Tier 1 for intensity | Reddit complaints, G2 reviews, Twitter threads |

### What requires human action

| Evidence Type | Why AI Cannot Produce It | Governor Action Required |
|--------------|------------------------|------------------------|
| Problem validation | Pain intensity is experienced, not derivable | Customer interviews (minimum 5 per segment) |
| Willingness to pay | Stated WTP ≠ revealed WTP; requires real transaction signals | Sales conversations, landing page tests, letter of intent |
| Switching cost reality | Actual friction is contextual and emotional | Customer workflow observation, trial conversion data |
| Channel effectiveness | Response rates are empirical, not structural | Small-batch channel tests with real spend |
| UVP resonance | Whether a message lands requires the audience | Copy testing, sales call recordings, demo reactions |
| Team capability assessment | Founders overestimate and underestimate in unpredictable ways | Honest operational review, past project velocity |

**The evidence generation rule:** The system generates hypotheses — structured, specific, testable hypotheses — not evidence. When the system writes "customers in segment X have problem Y," it is writing a hypothesis to be tested, not a finding that has been tested. The canvas must make this distinction visible in every section.

**The evaluation asymmetry:** The system is better at evaluating evidence than generating it. Given 10 customer interview transcripts, it can extract patterns, identify contradictions, and assess whether the sample is representative. It cannot conduct the interviews. This asymmetry is a feature — lean into it. Design the governor interface to get raw evidence into the system for evaluation rather than asking the system to guess what the evidence would say.

## Self-Challenge Architecture

A system that generates strategy and evaluates that strategy with the same reasoning process will always agree with itself. Self-challenge requires structural separation — different prompts, different framings, different success criteria evaluating the same output.

### Mechanisms that work

**Explicit assumption extraction.** After generating any canvas section, the system lists every assumption embedded in that section. Not as an afterthought — as a required output with the same structural rigor as the section itself. Each assumption gets: what is assumed, what evidence supports it (and its tier), what would falsify it, and what happens to the strategy if it is false. The 10.assumptions.md section exists for this reason, but assumptions should surface during generation, not only in a dedicated pass.

**Pre-mortem framing.** "It is 12 months from now. This strategy failed. Write the post-mortem." This works because it reverses the cognitive direction — instead of defending a plan, the system attacks it. The pre-mortem consistently surfaces risks that forward-looking analysis misses because it removes the optimism bias inherent in plan generation. Apply to: UVP, growth model selection, channel strategy, unit economics.

**Red-team with different objectives.** Generate the competitive response: "You are the incumbent. A startup just launched with this UVP targeting your customers. What do you do in the next 90 days?" This produces specific, actionable threats rather than generic competitive risk statements. The quality test: if the red-team response does not change anything in the strategy, either the strategy is robust or the red team was not trying hard enough.

**Constraint inversion.** Take each major assumption and invert it. "What if CAC is 3x our estimate?" "What if the segment is 40% smaller?" "What if the problem is real but #5 on their priority list, not #1?" Then trace the consequences through the full canvas. This exposes which assumptions are load-bearing (strategy collapses if wrong) versus which are adjustable (strategy adapts).

### Mechanisms that fail

**Vague uncertainty acknowledgment.** "There is uncertainty in these estimates" communicates nothing and changes nothing. Every estimate has uncertainty. The question is: which uncertainties are load-bearing, and what is the blast radius if they resolve unfavorably?

**Balanced pros and cons.** Generating three strengths and three weaknesses for every option is an exercise in false balance. The system should have a position — the recommended option — and then attack that position specifically. "Here are reasons this recommendation might be wrong" is useful. "Here are pros and cons of each option" is a sophomore essay.

**Confidence scores without calibration anchors.** Saying "confidence: 0.7" is meaningless without specifying what distinguishes 0.7 from 0.5 or 0.9 in this specific context. Confidence scores work only when paired with the evidence basis and the specific falsification condition.

**Self-review without structural separation.** Asking "now review what you just wrote" in the same prompt context produces agreement, not challenge. The review must happen with a different framing, different success criteria, or — in multi-agent systems — a different agent with an adversarial mandate.

## Governor Escalation Boundaries

The escalation boundary is not about confidence level. It is about the type of decision. Some decisions require values (which the system cannot determine). Some require information (which the system can synthesize). Some require ground truth (which neither the system nor the governor has without going and getting it).

### The Decision Type Framework

| Decision Type | Example | System Action | Governor Action |
|--------------|---------|--------------|----------------|
| **Values** — what matters more | Growth vs. profitability, speed vs. quality, market breadth vs. depth | Surface the tradeoff with consequences of each path. Never choose. | Decide. There is no correct answer — only a preferred answer. |
| **Information synthesis** — what the data says | Market size, competitive positioning, cost estimation | Produce the synthesis. Present confidence tier. Proceed. | Review if interested. No action required. |
| **Ground truth** — what reality says | Customer pain intensity, willingness to pay, channel conversion rates | State what is unknown. Specify the test that would resolve it. Recommend the test. | Run the test. Return data for system evaluation. |
| **Judgment under ambiguity** — reasonable people disagree | Whether a weak signal is a real trend, whether an unfair advantage is durable | Present the evidence for both sides. State the system's lean and why. Flag as judgment call. | Confirm, override, or request more analysis. |

### When to escalate — the bright lines

Escalate always:
- **Mode selection.** VENTURE/BOOTSTRAP/HYBRID is a values decision about what kind of company to build. Never infer.
- **UVP and unfair advantage approval.** These are identity claims — what makes this venture this venture. The system drafts; the founder confirms.
- **Tradeoff preferences.** When the canvas surfaces a genuine tradeoff (e.g., broader segment with lower margins vs. narrow segment with higher margins), the system presents the tradeoff with quantified consequences. The governor chooses.
- **Ground truth gaps that block strategy.** When a load-bearing assumption is Tier 3 and the strategy cannot proceed without resolving it. Not every Tier 3 assumption — only load-bearing ones.

Do not escalate:
- **Information synthesis.** The system is faster and more thorough at aggregating public data. Escalating for validation of Tier 1 work wastes the governor's time and trains them to rubber-stamp.
- **Structural reasoning.** "Given these segments and these problems, the channel strategy follows from ACV alignment." This is mechanical — execute it.
- **Low-stakes assumptions.** Assumptions that, if wrong, change a number but not the strategy. These go into the assumption register for eventual testing, not into escalation.

### The escalation quality test

A good escalation contains: what decision is needed, why the system cannot make it (values/ground truth/judgment), the options with quantified consequences, and the system's recommendation if it has one. A bad escalation contains: "I'm not sure about X — what do you think?" That is not an escalation. That is passing the work back.

## Confidence Calibration

The central problem: an AI system's confidence in its output correlates with the quality of its reasoning, not with the truth of its conclusions. A beautifully structured analysis of a wrong premise will feel highly confident. The system must separate reasoning quality from conclusion validity.

### The Calibration Framework

**Source-trace test.** For every major claim, trace backward: what is the ultimate source? If the chain terminates in "public data I synthesized" — Tier 1/2, confidence in reasoning is meaningful. If the chain terminates in "I inferred this from structural patterns" — Tier 2, confidence in reasoning is meaningful but conclusion is a hypothesis. If the chain terminates in "this is what customers probably think/want/need" — Tier 3, confidence is about the quality of the guess, not the accuracy of the claim.

**The consensus test.** Would three independent runs of this analysis, with different starting framings, converge on the same conclusion? For Tier 1 claims (market size from public data), yes — and that convergence is meaningful. For Tier 2 claims (segment prioritization), likely yes with minor variation — meaningful but not conclusive. For Tier 3 claims (problem severity ranking without customer data), the convergence proves only that the reasoning is internally consistent, not that it is correct.

**Falsification specificity.** High-confidence claims should have specific falsification conditions: "This claim is wrong if customer interviews reveal that >60% of the segment already uses free alternatives they consider adequate." Low-confidence claims often cannot specify falsification conditions precisely — and that imprecision is itself the signal. If you cannot state what would prove you wrong, you do not know what you are claiming.

### Overconfidence markers

Watch for these in system output — they indicate the synthesis-truth confusion:

- **Precision without basis.** "The market will grow 23% annually." Where did 23% come from? If from an analyst report, cite it. If from trend extrapolation, state the extrapolation method and its historical accuracy in this domain.
- **Causal language for correlations.** "Customers switch because of poor support." The system has not observed customers switching. It has observed review sentiment correlating with churn patterns. Different claim, different confidence.
- **Disappearing uncertainty.** A Tier 2 claim in one section becomes a Tier 1 input in a later section. The market size estimate (range: $800M-$1.2B) becomes "the $1B market" three sections later. Each section that consumes an uncertain input must inherit that uncertainty, not launder it.
- **Missing base rates.** "Our PLG motion will achieve 5% conversion." What is the base rate for PLG conversion in this ACV range and market maturity? If unknown, the estimate is not an estimate — it is a wish.

### The honest confidence statement

Instead of confidence scores, the system should produce confidence statements that separate what it knows from how it knows it:

"Market size: $800M-$1.2B (Tier 1 — derived from [sources], methodology: [method]). Segment priority: Enterprise IT buyers (Tier 2 — highest pain signal from review analysis, but pain intensity is untested). WTP estimate: $X/mo (Tier 3 — inferred from competitive pricing, not from customer data; treat as hypothesis, not input)."

## Hypothesis Integrity Across the Canvas

A 16-section canvas is a chain of dependent reasoning. Section 09 (solution) depends on 07 (UVP) depends on 05 (problem) depends on 04 (segments). An error in segments propagates silently through every downstream section, accumulating apparent confidence while the foundation erodes.

### The compounding assumption problem

Each canvas section introduces assumptions. By section 15 (GTM), the strategy rests on assumptions from all prior sections. If each section introduces 3-5 assumptions and each has an 80% chance of being correct in isolation, the probability that all 48-80 assumptions hold simultaneously is near zero. This is not a flaw in the method — it is the nature of strategy. But the system must make it visible rather than burying it.

**Practical response:** Maintain a running assumption register that tracks:
- Which section introduced each assumption
- What evidence tier supports it (Tier 1/2/3)
- Which downstream sections depend on it
- What happens to the strategy if it is false (blast radius: low/medium/high)

The 10.assumptions.md section should be a living document updated as each section is written, not a retrospective extraction at Phase 3.

### Cross-section consistency as a challenge mechanism

When the system writes section 13 (metrics), it should actively check: "Are the conversion rates I'm assuming consistent with the channel costs in section 11? Is the LTV consistent with the pricing in section 12 and the churn implied by the competitive landscape in section 06?" Inconsistencies are not bugs — they are signals that an assumption somewhere is wrong. Surface them.

### The "too clean" signal

When a canvas comes together without tension — every section aligns, every metric works, every assumption supports the conclusion — treat this as a warning. Real strategies have tensions. The market is big but the segment is hard to reach. The problem is acute but willingness to pay is uncertain. The solution is differentiated but the moat is thin. A canvas without tension is a canvas that has not been honest about its uncertainties.

## Failure Modes of Autonomous Strategy

These are the specific ways autonomous strategy generation fails, ordered by frequency and severity.

**Narrative coherence masquerading as validity.** The most common failure. The canvas tells a compelling story — problem, segment, solution, economics all fit together — but the story was constructed to cohere, not discovered to be true. The system optimizes for internal consistency (which it can evaluate) as a proxy for external validity (which it cannot). Mitigation: the self-challenge mechanisms above, plus explicit Tier labeling on every claim.

**Anchoring on first synthesis.** The system generates an initial segment hypothesis, then all subsequent sections orient around it. Even with self-challenge, the initial framing exerts gravitational pull. Mitigation: generate 2-3 alternative segment hypotheses before committing. Carry at least one alternative through problem and competitive analysis. Kill alternatives with evidence, not with preference for the first idea.

**Sophistication bias.** More complex strategies feel more thorough. A three-segment, multi-channel, platform-play strategy reads as more impressive than a single-segment, one-channel, tool-first strategy. But for bootstrap and early-stage ventures, simplicity is a feature. The system should have a structural bias toward simplicity — the simplest strategy that could work — and require affirmative justification for each added complexity.

**Evidence recycling.** The same data point appears as evidence for multiple claims across sections. The G2 review data that sized the market also validated the problem, also informed the competitive analysis, also justified the channel strategy. Each use is locally valid, but the apparent evidence breadth is illusory — it is one data source doing four jobs. Track evidence provenance. When the same source supports more than two sections, flag the concentration risk.

**Premature precision in economics.** Unit economics (section 13) require inputs — CAC, LTV, churn, conversion rates — that are Tier 3 for any pre-launch venture. The system will produce specific numbers because that is what the section template demands. These numbers are not estimates — they are illustrative scenarios. Label them as such. Present ranges, not points. Tie each range to its assumption: "If CAC is $50-150 (Tier 2, based on channel benchmarks), and LTV is $300-900 (Tier 3, based on pricing hypothesis and assumed 8-15% monthly churn), then LTV:CAC ranges from 2:1 to 18:1. The strategy works at the low end only if CAC is below $100."

**Governor atrophy.** If the system runs well autonomously, the governor stops engaging deeply. Escalations become rubber stamps. When the system finally escalates something genuinely important — a values decision, a load-bearing ground truth gap — the governor treats it as routine. Mitigation: vary escalation depth. Some escalations should be trivial (confirming a well-supported recommendation) and some should be substantive (genuine tradeoff decisions). The mix keeps the governor engaged. Never escalate without a clear statement of what is at stake.
