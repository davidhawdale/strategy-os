# Hypothesis Register

Created: 2026-03-15
Last Reviewed: 2026-03-28
Business Mode: BOOTSTRAP
Build Method: AUTONOMOUS
Sell & Grow Ready: no

---

## 1. Problem

**Claim:** B2B SaaS companies with 10-80 employees waste 15-30% of engineering capacity on internal tooling (admin dashboards, reporting scripts, workflow automations, data pipelines) that is undifferentiated but critical to operations. This tooling is built ad hoc, poorly maintained, and creates ongoing tech debt that compounds as the company scales. The problem intensifies at the 30-60 employee inflection point when manual processes break but dedicated platform engineering is premature.

**Confidence:** researched

**Possibility Space:**
- Considered: Internal tooling burden across all company sizes, developer experience/DX broadly, data pipeline management, admin dashboard fatigue, workflow automation gap
- Eliminated: Developer experience broadly -- too diffuse, no single buyer. Data pipelines specifically -- dominated by established players (Fivetran, dbt). Workflow automation -- Zapier/n8n/Make cover the non-technical user; the problem is the technical-but-undifferentiated gap.
- Alternatives carried: The problem may be more acute in specific verticals (fintech, healthtech) where compliance tooling compounds the burden. Carrying as sub-hypothesis.

**Evidence:**
- [WEB_RESEARCH] [T1] 2026-03-16 -- Retool 2025 State of Internal Tools: 42% of engineering orgs report >20% time on internal tooling. N=2,800 respondents.
- [WEB_RESEARCH] [T1] 2026-03-17 -- StackOverflow Developer Survey 2025: "Building internal tools" ranked #3 time sink behind meetings and code review.
- [WEB_RESEARCH] [T2] 2026-03-18 -- Analysis of 140 YC S24/W25 companies: 68% built custom admin panels within 6 months of launch.
- [COMPETITIVE_ANALYSIS] [T1] 2026-03-20 -- Retool ($3.2B valuation), Airplane.dev (acquired), Superblocks ($37M raised), Internal.io ($20M raised) -- validated market with significant VC investment.

**Research Sources:**
- [T1] 2026-03-16 -- retool.com/blog/state-of-internal-tools-2025: Established that internal tooling consumes >20% of eng time in 42% of orgs
- [T1] 2026-03-17 -- survey.stackoverflow.co/2025: Established internal tools as top-3 developer time sink
- [T2] 2026-03-18 -- YC company analysis via crunchbase + product pages: Established prevalence of custom admin tooling in early-stage
- [T1] 2026-03-20 -- Competitive landscape mapping: Established market validation through funding

**Assumptions:**
- [B] [T2] The 10-80 employee range is where this problem peaks -- too big for spreadsheets, too small for a platform team [LOAD-BEARING] [BLAST:HIGH]
  -> Falsification: If companies <10 or >80 show equal or greater pain intensity
  -> Validation: Survey 20+ CTOs across size ranges, compare pain scores
- [B] [T2] Ad-hoc internal tooling creates compounding tech debt, not just one-time cost [LOAD-BEARING] [BLAST:MEDIUM]
  -> Falsification: If maintenance cost of internal tools is flat, not growing
  -> Validation: Interview ops/eng leads about maintenance trajectory of oldest internal tools
- [K] [T1] The competitive landscape (Retool et al.) validates the problem exists [BLAST:LOW]

**Kill Condition:** If >60% of target segment CTOs say internal tooling takes <10% of eng time and is not a priority concern.

**Last Updated:** 2026-03-28
**Update Rationale:** Added YC company analysis and competitive evidence. Upgraded from unvalidated to researched.

---

## 2. Segment

**Claim:** Series A/B B2B SaaS companies with 15-60 engineers, shipping product weekly+, using modern stack (TypeScript/Python, cloud-native, CI/CD in place), where the CTO or VP Engineering is the buyer and the senior engineers are the users. They have outgrown Retool/low-code but cannot justify a dedicated platform engineering team. Observable signals: hiring for "senior full-stack" or "staff engineer" roles, active GitHub repos with internal-tool directories, Slack communities for engineering leaders, content consumption on eng management topics.

**Confidence:** researched

**Possibility Space:**
- Considered: All B2B SaaS companies, developer agencies, enterprise IT departments, Series A startups specifically, B2B companies with compliance requirements (fintech/healthtech)
- Eliminated: Developer agencies -- project-based, no recurring internal tooling need. Enterprise IT -- different buyer (CIO), longer sales cycle, existing vendor relationships. Pre-seed/seed startups -- too early, internal tooling not yet a problem.
- Alternatives carried: Fintech/healthtech sub-segment may have 2-3x pain intensity due to compliance tooling requirements. Carrying as enrichment hypothesis.

**Evidence:**
- [WEB_RESEARCH] [T1] 2026-03-18 -- LinkedIn job postings analysis: 340+ Series A/B SaaS companies actively hiring senior engineers, 45% mention internal tooling in job descriptions
- [WEB_RESEARCH] [T2] 2026-03-19 -- CTO Craft community survey: "Internal tools" mentioned as top-5 eng leadership concern by 38% of respondents (N=420)
- [COMPETITIVE_ANALYSIS] [T2] 2026-03-20 -- Retool customer page analysis: Majority of featured customers are 20-200 employee B2B companies

**Research Sources:**
- [T1] 2026-03-18 -- LinkedIn Sales Navigator filtered search: Established segment size and hiring patterns
- [T2] 2026-03-19 -- ctocraftcon.com community data: Established problem salience among engineering leaders
- [T2] 2026-03-20 -- retool.com/customers: Established competitor's actual customer profile

**Assumptions:**
- [B] [T2] CTO/VP Eng is the economic buyer and has budget authority for tooling under $2K/mo without procurement [LOAD-BEARING] [BLAST:HIGH]
  -> Falsification: If purchasing requires procurement/legal review at most target companies
  -> Validation: Ask in discovery calls: "Who approves tooling purchases under $2K/mo?"
- [B] [T3] Engineers who have outgrown Retool want code-first, not more low-code [LOAD-BEARING] [BLAST:HIGH]
  -> Falsification: If target segment engineers prefer visual builders over code-first approaches
  -> Validation: A/B test positioning (code-first vs visual) in outreach, measure response rates
- [O] [T2] This segment is reachable through engineering community channels (Dev.to, Hacker News, engineering blogs, CTO Slack groups) [BLAST:MEDIUM]
  -> Falsification: If these channels produce <1% engagement rate after 3 months of content

**Kill Condition:** If the segment is smaller than 2,000 addressable companies in English-speaking markets, or if buyer authority requires enterprise procurement at >50% of target companies.

**Last Updated:** 2026-03-28
**Update Rationale:** Added LinkedIn analysis and CTO community data. Narrowed from "10-80 employees" to "15-60 engineers" based on evidence.

---

## 3. Unit Economics

**Claim:** Subscription model at $800-1,500/mo per team (5-15 engineers), targeting 4:1 LTV:CAC with 6-month payback, 85%+ gross margin. Bootstrap mode requires profitable unit economics from first cohort -- no subsidized acquisition.

**Confidence:** researched

**Possibility Space:**
- Considered: Per-seat SaaS ($50-150/seat/mo), team-based SaaS ($500-2000/mo), usage-based (per deployment/per tool built), open-core (free framework + paid cloud features), consulting + product hybrid
- Eliminated: Per-seat -- misaligns incentives (penalizes adoption). Usage-based -- unpredictable for buyer budgeting, complicates sales. Consulting hybrid -- doesn't scale, distracts from product.
- Alternatives carried: Open-core model (free CLI/framework, paid dashboard/collaboration/SSO) as potential future evolution from team subscription.

**Mode Thresholds:**
| Metric | Required (Bootstrap) | Estimate (range) | Tier | Source |
|--------|----------|-------------------|------|--------|
| LTV:CAC minimum | > 3:1 | 4:1 -- 7:1 | T2/T3 | Analogous SaaS benchmarks + channel cost estimates |
| Payback maximum | < 8 months | 4 -- 7 months | T2/T3 | Price / estimated CAC |
| Gross margin target | > 75% | 85% -- 90% | T2 | Code-generation product, minimal infrastructure cost |

**Scenario Analysis:**
- Optimistic: ACV $14,400, CAC $2,400 (content-led, 6:1 LTV:CAC), 3-month payback, 90% gross margin. 100 customers = $1.44M ARR.
- Base: ACV $12,000, CAC $3,600 (mixed content + outbound, 4:1 LTV:CAC), 5-month payback, 85% gross margin. 100 customers = $1.2M ARR.
- Pessimistic: ACV $9,600, CAC $4,800 (outbound-heavy, requires demos, 2.5:1 LTV:CAC), 8-month payback, 82% gross margin. Cash-flow negative until month 14.
- Kill: If CAC exceeds $6,000 (requires paid channels + sales calls for every deal) and ACV stays below $10,000. Economics broken -- would need to move upmarket or find lower-cost channel.

**Evidence:**
- [WEB_RESEARCH] [T1] 2026-03-23 -- Public SaaS benchmark data (OpenView Partners, KeyBanc): Median dev tools CAC $3,200 at Series A. Median dev tools gross margin 82%.
- [COMPETITIVE_ANALYSIS] [T2] 2026-03-23 -- Retool pricing: $10/user/mo free, $50/user/mo business. Team of 10 = $500/mo. Forgekit at $1,000/mo is 2x but includes code ownership.
- [FOUNDER_STATED] [T3] 2026-03-24 -- Channel cost estimates: Content-led acquisition $800-1,500 per customer (founder time + content production). Outbound $2,000-4,000 per customer.

**Research Sources:**
- [T1] 2026-03-23 -- openviewpartners.com/saas-benchmarks: Established dev tools CAC benchmarks
- [T2] 2026-03-23 -- retool.com/pricing: Established competitive price point
- [T3] 2026-03-24 -- Internal channel cost modeling: Estimated acquisition costs by channel

**Assumptions:**
- [B] [T3] Content-led acquisition can deliver 40%+ of pipeline at <$1,500 CAC [LOAD-BEARING] [BLAST:HIGH]
  -> Falsification: If content produces <20% of qualified pipeline after 6 months
  -> Validation: Track content-attributed pipeline from month 1
- [B] [T3] Target segment will pay $800-1,500/mo for internal tooling framework [LOAD-BEARING] [BLAST:HIGH]
  -> Falsification: If >50% of prospects say pricing is "too expensive" in discovery
  -> Validation: Price sensitivity testing in first 20 sales conversations
- [B] [T2] Gross margin >80% is achievable because the product generates code (no hosted infrastructure per customer) [BLAST:MEDIUM]
  -> Falsification: If support/onboarding costs exceed 15% of revenue

**Kill Condition:** If fully-loaded CAC (including founder sales time at $200/hr imputed) exceeds $6,000 AND ACV cannot exceed $12,000. Bootstrap mode cannot survive this combination.

**Last Updated:** 2026-03-28
**Update Rationale:** Added benchmark data and competitive pricing analysis. Scenario analysis complete.

---

## 4. Solution Design

*This is not a hypothesis. It is a design artifact derived from and constrained
by the three hypotheses above. If any hypothesis changes, re-evaluate this section.*

**Growth Architecture:** PLG + Content

**Architecture Rationale:**
- ACV: $10,000-15,000 -> Supports self-serve with optional sales assist
- Buyer type: CTO/VP Eng -> Technical buyer, can evaluate independently
- Time-to-value: Fast (generate first admin panel in <1 hour) -> PLG viable
- Collaboration: Engineering team uses together -> Natural seat expansion
- Selection: PLG with content flywheel. Engineers discover through technical content (blog posts, tutorials, open-source examples), try the CLI, build something real, convince team to adopt.

**Positioning:**

Positioning statement: For engineering leaders at scaling B2B SaaS companies who waste senior engineer time on undifferentiated internal tooling, Forgekit is a code-first internal tooling framework that ships production admin panels, workflows, and dashboards in hours instead of weeks. Unlike Retool (visual builder, vendor lock-in, limited extensibility) and unlike building from scratch (weeks of work, ongoing maintenance debt), it generates maintainable TypeScript code that lives in your repo.

- Category framing: code-first internal tooling framework [GOVERNOR_DECISION] -- category does not yet exist; positioning hypothesis
- Category rationale: Derived from competitive gap -- Retool is "low-code visual builder", building from scratch is "custom development." Code-first framework occupies the space between: developer-native but dramatically faster than custom.

**Feature Map:**

| Feature | Solves Problem | Job Dimension | Priority | Tier |
|---------|---------------|---------------|----------|------|
| CLI scaffold generator | Time-to-first-tool = minutes | F | MVP | T3 |
| CRUD admin panel templates | Most common internal tool type | F | MVP | T2 |
| Approval workflow engine | Second most common internal tool | F | MVP | T3 |
| Dashboard/reporting templates | Third most common | F | MVP | T3 |
| Auth + RBAC built-in | Security requirement for internal tools | F | MVP | T2 |
| Component library (extends existing UI lib) | Code ownership, extensibility | F/E | MVP | T3 |
| Deployment recipes (Vercel, Docker, K8s) | Fits existing CI/CD | F | MVP | T2 |
| Team collaboration features | Multi-engineer coordination | S | POST | T3 |
| Audit logging | Compliance requirement for some segments | F | POST | T2 |
| SSO/SAML | Enterprise expansion | F | FUTURE | T1 |

**MVP Scope:**
- Included: CLI scaffold, CRUD admin templates, approval workflows, dashboard templates, auth/RBAC, component library, deployment recipes
- Aha moment: Run `forgekit init`, answer 3 questions about your data model, get a working admin panel with auth deployed to your staging environment in under 30 minutes
- Time-to-value target: < 30 minutes to deployed internal tool
- Excluded:
  - Team collaboration -- need single-player to work first -- add when 10+ teams using daily
  - Audit logging -- not blocking for initial segment -- add when fintech/healthtech sub-segment validated
  - SSO/SAML -- enterprise feature, premature -- add when ACV justifies enterprise motion

**Growth Loops:**
- Content -> Trial: Technical blog posts/tutorials -> CLI download -> first project -> team adoption [T3]
- Open-source -> Adoption: Example repos and templates on GitHub -> community contributions -> ecosystem growth [T3]
- Tool -> Template: Each customer's internal tools become anonymized template candidates -> more templates -> faster adoption for next customer [T3]

**Constraints from Hypotheses:**
| From | Constraint | If Hypothesis Changes |
|------|-----------|----------------------|
| Problem | Must save >50% of time vs building from scratch | Re-evaluate if time savings claim is not validated |
| Segment | Must work with TypeScript + modern stack, no enterprise-only features in MVP | Re-evaluate stack support if segment shifts |
| Unit Economics | Must be self-serve for <$1,500/mo deals (no sales calls for base tier) | Re-evaluate PLG if CAC requires sales-assisted motion |

**Adequacy Criteria:**
- 3 paying teams within 90 days of launch
- >70% of trial users complete the "aha moment" (deployed tool in <30 min)
- NPS >40 from first 10 paying teams
- Content produces >30% of qualified pipeline within 6 months

**Last Updated:** 2026-03-28

---

## Destruction Log

### Pre-Mortem
It is March 2027. Forgekit failed. What happened:

The "code-first" positioning attracted developers who wanted to build from scratch anyway -- tire-kickers, not buyers. The 15-60 engineer segment turned out to have wildly different internal tooling needs depending on their product domain, making templates too generic to be useful. Retool shipped a "code export" feature that neutralized the lock-in differentiator. Content-led acquisition worked for awareness but not conversion -- readers loved the blog posts but didn't convert to paid because the free CLI was "good enough." The team subscription model created friction at the 5-engineer boundary, causing teams of 3-4 to churn after the trial. CAC landed at $5,500 (outbound-heavy because content didn't convert), making bootstrap economics unviable.

### Red-Team Response
You are Retool. A startup launched "Forgekit" targeting your customers with a code-first, no-lock-in pitch. Your 90-day response:

1. Ship "Export to Code" feature (even if limited) to neutralize the lock-in narrative. Announce loudly.
2. Launch "Retool for Startups" -- free tier for <20 employees -- to capture the segment before they outgrow and switch.
3. Publish comparison content targeting "Retool vs code-first" searches, emphasizing speed and ecosystem size.
4. Retool has 50K+ customers and $3.2B valuation. Forgekit has zero. Leverage trust and social proof.

What this changes: The lock-in narrative has a shelf life. If Retool ships code export, the positioning must pivot from "escape lock-in" to "built for engineers who think in code, not drag-and-drop." The identity-based positioning is more durable than the feature-based positioning.

### Constraint Inversions
| Assumption Inverted | Consequence | Strategy Survives? |
|--------------------|-------------|-------------------|
| CAC is 3x estimate ($10,800) | Bootstrap economics fail. Must raise funding or find radically cheaper channel. | No -- kill at this level |
| Segment is 40% smaller (1,200 companies) | TAM = $14.4M. Viable for bootstrap but no room for error on conversion rates. | Yes, with modification -- must nail conversion |
| Time-to-value is 5x longer (2.5 hours) | PLG breaks. Cannot self-serve. Need sales-assisted demo motion. | Yes, with modification -- shift to sales-led, raise ACV |
| Code ownership is not a differentiator | Positioning collapses to "faster Retool" -- commodity position, no moat. | No -- requires fundamental repositioning |

### Evidence Concentration Risk
| Source | Hypotheses It Supports | Risk Level |
|--------|----------------------|------------|
| Retool State of Internal Tools survey | Problem, Segment | concentrated |
| HN/Reddit complaints about Retool | Positioning (lock-in differentiator) | concentrated |
| Internal prototype benchmark | Positioning (speed claim), Solution Design | concentrated |
| LinkedIn job posting analysis | Segment | ok |
| SaaS benchmark data | Unit Economics | ok |
