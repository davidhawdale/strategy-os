---
name: str-planning-gtm
description: Plans go-to-market motion aligned with growth model and channels. Defines launch sequence and milestones. Produces 15.gtm.md. Use when planning GTM strategy, defining launch sequence, or selecting sales motion.
allowed-tools: Read, Grep, Glob
license: Complete terms in LICENSE.txt
serves: strategy
domain: strategy
affects: market
---

# GTM Planning

Define go-to-market motion aligned with growth architecture.

## Reads

| Source | Purpose |
|--------|---------|
| `strategy/canvas/09.solution.md` | Growth model (PLG/Network/Traditional) determines motion type |
| `strategy/canvas/11.channels.md` | Channel strategy for GTM alignment |
| `strategy/canvas/12.revenue.md` | ACV and pricing for motion-ACV validation |

## Writes

| Output | Content |
|--------|---------|
| `strategy/canvas/15.gtm.md` | GTM motion type, launch sequence, and milestones |

## Process

### Step 1: Load Growth Model [S]

Read `09.solution.md` for growth model. This is the primary input.

| Growth Model | Default Motion |
|--------------|----------------|
| PLG | Self-serve |
| Network-Led | Referral-first |
| Traditional | Sales-led |
| Hybrid | Sales-assisted PLG |

If growth model missing: "Growth model not defined in 09.solution.md. Run strategist first."

### Step 2: Validate Motion-ACV Alignment [R]

**Evaluation method:** Lookup ACV against compatible motions table, flag mismatches.

See [knowledge/strategy/gtm-motions.md](../../../knowledge/strategy/gtm-motions.md) for alignment rules.

| ACV | Compatible Motions |
|-----|-------------------|
| <$2K | Self-serve only |
| $2K-$10K | Self-serve, sales-assisted |
| $10K-$50K | Sales-assisted, inside sales |
| $50K+ | Inside sales, field sales |

Flag mismatch:
```
"Motion-ACV conflict:
- Growth model: PLG → Self-serve
- ACV: $50K → Needs sales

Recommend: Sales-assisted PLG (PLG acquisition, sales expansion)"
```

### Step 3: Define Motion Type [R]

**Evaluation method:** Select motion type from enumerated options based on growth model + ACV combination.

Based on growth model and ACV, select motion type:

| Motion | Description | When |
|--------|-------------|------|
| **Self-serve** | User signs up, activates, pays | PLG, <$5K ACV |
| **Sales-assisted** | Self-serve + sales expansion | PLG, $5K-$25K |
| **Inside sales** | Demo-led, remote close | Traditional, $10K-$100K |
| **Field sales** | In-person, relationship | Traditional, >$50K |
| **Community-led** | Community → product → paid | Network, <$10K |
| **Partner-led** | Sell through partners | Any, partner strategy |

### Step 4: Design Launch Sequence [K]

See [knowledge/strategy/gtm-motions.md](../../../knowledge/strategy/gtm-motions.md) for phase templates.

**Standard phases:**
1. **Alpha:** Internal / friendly users
2. **Beta:** Limited external, feedback loop
3. **Soft Launch:** Open signup, limited marketing
4. **GA:** Full launch, marketing activated

**Phase criteria:**
| Phase | Entry Criteria | Exit Criteria |
|-------|----------------|---------------|
| Alpha | MVP functional | Core flow works |
| Beta | Core flow stable | Activation rate >X% |
| Soft Launch | Activation proven | Conversion rate >X% |
| GA | Unit economics work | Scale channels |

### Step 5: Set Milestones [K]

For each phase, define:
- Duration target
- Success metrics
- Go/no-go criteria

### Step 6: Format Output [S]

```markdown
# 15. Go-to-Market

Market entry motion and launch strategy.

## Motion Summary

| Attribute | Value |
|-----------|-------|
| Growth Model | [PLG / Network / Traditional] |
| Motion Type | [Self-serve / Sales-assisted / etc.] |
| Primary Channel | [from 11.channels] |
| Target ACV | $[from 12.revenue] |

## Motion Rationale

**Why [motion type]:**
- Growth model fit: [explanation]
- ACV alignment: [explanation]
- Segment fit: [explanation]

## Launch Sequence

### Phase 1: Alpha
**Duration:** [X weeks]
**Goal:** [Specific goal]

| Criteria | Target |
|----------|--------|
| Users | [X] |
| [KPI] | [Target] |

**Exit criteria:** [What must be true]

### Phase 2: Beta
**Duration:** [X weeks]
**Goal:** [Specific goal]

| Criteria | Target |
|----------|--------|
| Users | [X] |
| Activation | [X%] |

**Exit criteria:** [What must be true]

### Phase 3: Soft Launch
**Duration:** [X weeks]
**Goal:** [Specific goal]

| Criteria | Target |
|----------|--------|
| Users | [X] |
| Conversion | [X%] |

**Exit criteria:** [What must be true]

### Phase 4: GA
**Goal:** Scale acquisition

| Criteria | Target |
|----------|--------|
| MRR | $[X] |
| Growth | [X%] MoM |

## Motion Mechanics

### Acquisition
[How customers find us - from channels]

### Activation
[How customers realize value]

### Conversion
[How customers become paying]

### Expansion
[How revenue grows within accounts]

## Sales Model (if applicable)

| Role | Focus | Volume |
|------|-------|--------|
| [SDR/AE/etc.] | [Focus area] | [Capacity] |

## Key Risks

| Risk | Mitigation |
|------|------------|
| [Risk 1] | [Mitigation] |
| [Risk 2] | [Mitigation] |

## 90-Day Priorities

| Month | Focus | Success Metric |
|-------|-------|----------------|
| 1 | [Focus] | [Metric] |
| 2 | [Focus] | [Metric] |
| 3 | [Focus] | [Metric] |
```

---

## Motion Selection Logic

```
If growth_model == PLG:
    If ACV < $5K:
        motion = self-serve
    Elif ACV < $25K:
        motion = sales-assisted
    Else:
        motion = sales-assisted + expansion AE

If growth_model == Network:
    If ACV < $5K:
        motion = community-led
    Else:
        motion = community + inside sales

If growth_model == Traditional:
    If ACV < $25K:
        motion = inside sales
    Elif ACV < $100K:
        motion = inside + field
    Else:
        motion = field sales
```

---

## Quality Checks

Before finalizing:

- [ ] Motion matches growth model from 09.solution
- [ ] Motion aligns with ACV from 12.revenue
- [ ] Launch phases have measurable exit criteria
- [ ] Primary channel from 11.channels integrated
- [ ] 90-day priorities are specific and achievable
- [ ] Sales model (if any) matches motion

## Boundaries

- Does NOT execute go-to-market campaigns
- Does NOT guarantee launch success
- Does NOT replace sales/marketing expertise
- Motion selection is starting point, not permanent
- Launch phases are frameworks, adjust based on reality
- Does NOT handle product launch communications
- Requires growth model from 09.solution.md before execution
- Phase exit criteria are targets, not guarantees
