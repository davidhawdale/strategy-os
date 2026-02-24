# Quickstart

LeanOS Core validates your business idea by building a 16-section canvas. It produces three outputs: the canvas, the value function, and a set of goals. These become the input to LeanOS Pro if you choose to continue.

---

## Prerequisites

- [Claude Code CLI](https://code.claude.com) installed
- An Anthropic API key

---

## Step 1: Clone Core

```bash
git clone https://github.com/leanos/core my-venture
cd my-venture
```

---

## Step 2: Prepare your context

Before running anything, write down what you know. Open a text file and fill in:

- **What you're building** — one paragraph, plain language
- **Who it's for** — your best guess at the customer
- **Why now** — what changed that makes this possible or urgent
- **What you know for certain** — facts, not beliefs
- **What you believe but haven't proven** — the hypotheses you're acting on
- **Constraints** — budget, timeline, team, technical, regulatory

This is your KBOS (Known facts, Beliefs, Observations, Strategic intent). The strategist will ask for it in Phase 0.

---

## Step 3: Run the strategist

```bash
claude --agent strategist
```

The strategist runs four phases:

| Phase | What Happens | Your Role |
|-------|-------------|-----------|
| Setup (G0) | Establishes mode, context, constraints | Choose BOOTSTRAP / VENTURE / HYBRID. Provide KBOS. |
| Discovery (G1) | Sizes market, defines segments, scores problems, maps competition | Review and confirm segment gate passes |
| Definition (G2) | Drafts UVP, solution, revenue model, economics | **Required stop**: confirm UVP and unfair advantage before proceeding |
| Launch (G3) | Extracts assumptions, selects channels, plans GTM | Review output; address any consistency failures |

At each K-open gate, the strategist writes an escalation to `execution/queue/` and stops. Read the escalation, respond by editing the file or re-running with your answer. The strategist picks up where it left off.

**Canvas complete** when all 16 section files exist and pass Gate G4.

---

## Step 4: Run the researcher (optional but recommended)

If the strategist needs market data it doesn't have — TAM size, competitive positioning, customer segment validation — run the researcher first and provide its output as context.

```bash
claude --agent researcher
```

Tell it what you need: "Research the US fashion e-commerce SMB market, segment by GMV ($500K–$2M/yr), find competitive tools."

Output lands in `execution/active/{thread}/output/`. Point the strategist to these files in your next invocation.

---

## Step 5: Run the planner

After the canvas is complete, the planner translates canvas targets into active goals.

```bash
claude --agent planner
```

Output lands in `strategy/goals/active/`. These are your executable goals — each one is measurable, time-bounded, and traces to a canvas section.

---

## Step 6: Complete the value function

When strategist runs VALUE mode (automatically after canvas completion), it writes `strategy/values.md`. Most of it is derived from the canvas. One section — tradeoff preferences — requires your input.

Open `strategy/values.md` → find `Tier 3: Tradeoff Preferences` → fill in each prompt line.

This is not optional. The value function is the decision filter for every subsequent action — in Core and in Pro.

See `docs/value-function.md` for what each preference means and how to think about them.

---

## What You Have When Done

```
strategy/
├── canvas/        16 sections — your validated strategy
├── values.md      Your decision filter
└── goals/active/  Your executable goals
```

Hand this to LeanOS Pro, a developer, an investor, or use it to self-direct the next build cycle.
