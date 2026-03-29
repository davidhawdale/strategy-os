# Sell & Grow — System Architecture

## The Chain

```
                    ┌─────────────────────────────────────────────────────────┐
                    │                                                         │
                    │              BEHAVIORAL SCIENCE                         │
                    │              (reasoning substrate)                      │
                    │                                                         │
                    │  Invoked within every step:                             │
                    │  • Anchoring, framing, status quo bias                  │
                    │  • SDT, temporal discounting, habit formation           │
                    │  • Loss aversion, reactance, commitment                 │
                    │  • Cognitive fluency, information gap                   │
                    │  • Serial position, peak-end rule                       │
                    │  • Receptivity context, social proof calibration        │
                    │                                                         │
                    └────────┬────────┬────────┬────────┬────────┬────────────┘
                             │        │        │        │        │
                    ─ ─ ─ ─ ─│─ ─ ─ ─ │─ ─ ─ ─ │─ ─ ─ ─ │─ ─ ─ ─│─ ─ ─ ─ ─ ─
                             ▼        ▼        ▼        ▼        ▼

┌──────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   ┌───────────────────┐                                                      │
│   │ BUSINESS STRATEGY │ ◄── Entry point                                      │
│   │ Problem, customer,│     Cadence: on evidence (when hypothesis breaks)    │
│   │ value prop, model │                                                      │
│   └────────┬──────────┘                                                      │
│            │                                                                 │
│            │  Produces: validated problem, target segment,                   │
│            │  value proposition hypothesis, unit economics                   │
│            ▼                                                                 │
│   ┌──────────────────────┐                                                   │
│   │ STRATEGIC POSITIONING│     Cadence: annually                             │
│   │ Category, competitive│                                                   │
│   │ alternatives, framing│                                                   │
│   └────────┬─────────────┘                                                   │
│            │                                                                 │
│            │  Produces: category strategy, competitive frame,                │
│            │  multi-product coherence, positioning statement                 │
│            ▼                                                                 │
│   ┌──────────────────────┐                           ┌──────────────┐        │
│   │ REVENUE ARCHITECTURE │     Cadence: quarterly    │              │        │
│   │ PLG system + founder │                           │   FEEDBACK   │        │
│   │ authority positioning│                           │    LOOPS     │        │
│   └────────┬─────────────┘                           │              │        │
│            │                                         │              │        │
│            │  Produces: activation design, signal    │              │        │
│            │  taxonomy, pricing, demo formats        │              │        │
│            ▼                                         │              │        │
│   ┌──────────────────────┐                           │              │        │
│   │ NEGOTIATION          │     Cadence: per-deal     │              │        │
│   │ Pricing, scope,      │─────────────────────────► │ Outcomes     │        │
│   │ terms, partnerships  │  case studies, proof      │ become proof │        │
│   └────────┬─────────────┘                           │ + content    │        │
│            │                                         │      │       │        │
│            │  Produces: boundary statements,         │      │       │        │
│            │  deal structures, partnership terms     │      │       │        │
│            ▼                                         │      ▼       │        │
│   ┌──────────────────────┐                           │              │        │
│   │ CONTENT DISTRIBUTION │     Cadence: weekly       │              │        │
│   │ Extract, repurpose,  │◄───────────────────────── │              │        │
│   │ compound             │                           │              │        │
│   └────────┬─────────────┘                           │              │        │
│            │          ▲                              │              │        │
│            │          │  New validated channels      │              │        │
│            ▼          │                              │              │        │
│   ┌──────────────────────┐                           │              │        │
│   │ CHANNEL INTELLIGENCE │     Cadence: quarterly    │              │        │
│   │ Discover, evaluate,  │──────────────────────────►│ Refines      │        │
│   │ validate, portfolio  │  channel feedback         │ customer     │        │
│   └──────────────────────┘                           │ definition   │        │
│                                                      │      │       │        │
│                                                      │      │       │        │
│            ┌─────────────────────────────────────────┘      │       │        │
│            │                                                │       │        │
│            │  ┌─────────────────────────────────────────────┘       │        │
│            │  │                                                     │        │
│            ▼  ▼                                                     │        │
│   Back to POSITIONING (annually) and STRATEGY (on evidence)         │        │
│                                                                     │        │
|─────────────────────────────────────────────────────────────────────┘        │
|                                                                              │
|  Also feeds: Content Distribution ──► Revenue Architecture                   │
|               (content drives PLG acquisition)                               │
|                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

## Flow Summary

### Sequential (initial pass, top-down)

```
Strategy ──► Positioning ──► Revenue Architecture ──► Negotiation ──► Content Distribution ──► Channel Intelligence
```

Each step consumes the output of the one above:

| Step | Consumes | Produces |
|---|---|---|
| Business Strategy | Market evidence, customer conversations | Validated problem, target segment, value prop, unit economics |
| Strategic Positioning | Strategy outputs | Category, competitive frame, multi-product coherence |
| Revenue Architecture | Positioning outputs | PLG design, signal taxonomy, pricing, demo formats |
| Negotiation | Value anchors from Positioning + pricing from Revenue | Boundary statements, deal structures, partnership terms |
| Content Distribution | Demo formats from Revenue + positioning topics | Weekly content, compounding assets (SEO, email list) |
| Channel Intelligence | Target customer from Positioning + content performance | Validated channels, emerging channel alerts, portfolio health |

### Feedback Loops (continuous, after initial pass)

| Loop | From → To | What Flows | Cadence |
|---|---|---|---|
| Channel → Positioning | Channel Intelligence → Strategic Positioning | Customer gathers somewhere unexpected → refines customer definition | Quarterly signal, annual positioning update |
| Channel → Content | Channel Intelligence → Content Distribution | New validated channels added to active distribution set | Quarterly |
| Content → Revenue | Content Distribution → Revenue Architecture | Content drives PLG acquisition, closes the loop | Weekly content, quarterly review |
| Negotiation → Content | Negotiation → Content Distribution | Consulting outcomes become case studies and build logs | Per-deal |
| Channel → Strategy | Channel Intelligence → Business Strategy | Market signals contradict core hypothesis → strategy update | On evidence |

### Behavioral Science Substrate (invoked within, not between)

| Step | Principles Invoked |
|---|---|
| Business Strategy | Confirmation bias (founders seeking validation not falsification), sunk cost (continuing failed hypotheses because of build investment) |
| Strategic Positioning | Anchoring (first frame market encounters), framing effects (same product positioned differently → different decisions), status quo bias (why prospects stick with alternatives) |
| Revenue Architecture | Self-determination theory (autonomy/competence/relatedness in product), temporal discounting (time-to-value), dopamine prediction error (over-delivery), loss aversion (trial expiration), overjustification (don't gamify intrinsic motivation) |
| Negotiation | Anchoring (first number sets frame), loss aversion (walking away vs. bad deal), reactance (pressure triggers resistance), commitment/consistency (small → large commitments) |
| Content Distribution | Cognitive fluency (easy to process = more trusted), information gap (headlines that create curiosity), serial position (strongest items first and last), peak-end (opening and closing carry weight) |
| Channel Intelligence | Receptivity context (audience mindset per channel), social proof calibration (different proof formats per channel type), lifecycle psychology (early adopter vs. mainstream behavior) |

### Cadence Summary

| Component | Review Cycle | Trigger for Out-of-Cycle Update |
|---|---|---|
| Business Strategy | On evidence | Core hypothesis falsified by customer data |
| Strategic Positioning | Annually | Category shift, new competitor changes frame |
| Revenue Architecture | Quarterly | Activation rate drops, pricing feedback pattern |
| Negotiation | Per-deal | N/A — applied in real time |
| Content Distribution | Weekly | N/A — continuous execution |
| Channel Intelligence | Quarterly | Emerging channel detected (platform launch, migration) |
| Behavioral Science | Never reviewed — always invoked | N/A — reasoning substrate, not a step |

## Cross-Stack Integration

The Sell & Grow chain connects to the Build & Ship stack:

```
BUILD & SHIP                          SELL & GROW
─────────────                         ───────────
Computed Web Design ◄──────────────── Revenue Architecture
  (layout math for                     (PLG activation design
   landing pages)                       informs page structure)

Web Copywriting ◄──────────────────── Strategic Positioning
  (page-level copy)                    (positioning determines
                                        messaging)

Text Compression ◄──────────────────── Content Distribution
  (output filter)                      (every piece compressed
                                        before distribution)

Text Compression ◄──────────────────── Negotiation
  (output filter)                      (outreach, proposals,
                                        follow-ups compressed)
```

The Build & Ship stack produces the artifacts. The Sell & Grow chain determines what to build, how to position it, and how to get it in front of the right people. Text Compression sits across both as the universal output filter.