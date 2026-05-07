# Hypothesis Register

Created: 2026-04-24
Last Reviewed: 2026-05-06 (Strategist CHALLENGE Pass 2 — incorporates fresh competitive intelligence: Newsquest Scotland 50k milestone + £8.99 All Access bundle; expanded GoFibre rollout; updated DCT subscription metrics)
Business Mode: ESTABLISHED (BOOTSTRAP-equivalent thresholds; self-funded extension by an established publisher)
Build Method: AUTONOMOUS
System Mode: CHALLENGE
Sell Ready: no (per Gap Definer Pass 2, 2026-05-05 — fails on HIGH-blast unresolved blocker AND new architecture contradiction C-3; new evidence from this CHALLENGE pass does not improve the Sell Ready predicate; Gap Definer Pass 3 must re-run)
Scale Ready: no (per Gap Definer Pass 2, 2026-05-05 — fails on multiple conditions; unchanged)
Register Version: 3
Previous Version: 2 (snapshotted at strategy/snapshots/2026-05-05/; full register text preserved at git commit 5ae0ab1 plus subsequent uncommitted state)

**CHALLENGE pass note (2026-05-06).** Fresh autonomous web research surfaced four pieces of new T1/T2 evidence material to the register: (1) Newsquest Scotland passed 50,000 digital subscribers in early Dec 2025 (51,153 in total) with the local-titles bucket — Glasgow Times, Greenock Telegraph, Border Telegraph, Dunfermline Press, East Lothian Courier — accounting for ~7,500 of those (avg ~1,500 per local title); (2) Newsquest Scotland's "All Access Scotland" bundle launched June 2025 at £8.99/month is now driving two-thirds of new subscriber sign-ups — this is a direct competitive-pricing match to the v1 Borders Web Pack price anchor; (3) DC Thomson regional news titles surpassed 50,000 digital subscribers (Jan 2026), subscription revenue £41.1m to March 2025; (4) GoFibre Project Gigabit Borders rollout has expanded beyond the 11k-premise figure cited in v1 — now 20,000 premises target, with new builds in Oxton, Coldingham, St Abbs, Jedburgh and Lauder announced Feb 2026. Material updates made to Sections 1, 2, 3, 4. Sections 5, 6, 7 receive minor amendments tracking the competitive update; the brand-architecture contradiction C-3 is unchanged. Two new escalations are NOT raised this pass — the new evidence sharpens existing escalations rather than adding new ones. Gap Definer must re-run before any state changes propagate to readiness gates. Previous CHALLENGE pass note (2026-05-05) preserved below.

**Prior CHALLENGE pass note (2026-05-05).** Sections 1–7 re-tested against `research/press-and-journal/pj-product-briefing-2026-05-05.md` (T1 — assembled from live website screenshots, App Store listing, live subscribe-page pricing). Material updates made to Sections 3 (pricing/bundle), 5 (platform extensibility), 6 (MVP scope), 7 (added Phase 0). Sections 1, 2, 4 saw assumption refinement and evidence additions but no confidence-state change. One new escalation written (E-03: Borders-as-brand vs Borders-as-topic-within-existing-brand) — this is a values/strategic decision that the new evidence makes legible but does not resolve. Gap Definer must re-run before any state changes propagate to readiness gates.

**Evidence concentration flag (2026-05-05).** The new T1 source (research/press-and-journal/pj-product-briefing-2026-05-05.md plus its referenced screenshots) is cited across all of Sections 1, 2, 3, 4, 5, 6, 7. This is structural — it is the *only* new evidence introduced in the CHALLENGE pass and it is the live-product reference for the entire reasoning chain. Concentration is therefore expected, not a quality flag. Mitigation: each citation specifies *which* element of the briefing supports the claim (newsletter pattern; tier prices; multi-locale capability; bundle absence; EE comparator), so destruction tests can target individual elements without invalidating the whole chain. This source is logically the same as "directly observing DCT's live product" — its concentration reflects the strength of having that observation, not a single-source-fragility risk. Gap Definer should still verify by triangulation against any DCT internal data the governor can supply (subscriber numbers by tier, Borders postcode traffic on the existing P&J/Courier sites, churn benchmarks).

**Framing note.** This register evaluates a market-extension decision, not a new venture. The "product" (a paywalled local news subscription, digital and print, anchored by a regional newsroom) already exists and is operating profitably in Aberdeen (Press & Journal) and Dundee (The Courier). The strategic question is whether the Scottish Borders market can sustain an analogous unit. "Customer" throughout = a Scottish Borders household paying a recurring subscription. "Buyer = user". Mode thresholds are applied as for BOOTSTRAP because the extension is expected to be self-funded from existing revenue and is being judged as a discrete P&L with a defined payback window.

---

## 1. Problem

**Claim:** Scottish Borders residents (c.117,000 across 11 towns and a dispersed rural hinterland) lack a daily-cadence, place-specific local news product. The two existing local titles are both weekly and operate on progressively thinned editorial models; national and broadcast alternatives cover the region only incidentally. The result is a gap in continuous, accountable local coverage at council, court, planning, and community level.

**Confidence:** RESEARCHED

**Pain Intensity:** moderate
**Frequency:** DAILY

**Why Now:**

- Enablers:
  - Project Gigabit fibre rollout (c.11,000 Borders premises in 2024-26 contract with GoFibre) materially reduces the digital-access friction that historically protected print-only models
  - DC Thomson has, since 2020, built and proven a digital-first subscription stack (Pugpig Bolt platform, community-vertical content model) that can be replicated at unit cost rather than rebuilt
  - Incumbent local titles in Borders have weakened editorially under consolidating owners; a credible challenger has more white space than at any point in the last decade
- Changes in last 36 months:
  - DC Thomson digital subs grew from <1,000 (2019) to >30,000 (Nov 2023); subscription revenue +2% YoY to £40.6m in FY24 while other lines fell -- subscription revenue is the only growing line
  - Newsquest reported 135,000 paid digital subs across 125 UK brands -- avg c.1,080 per title -- demonstrating a viable but small per-title floor
  - Southern Reporter paid print circulation declined to c.3,352 (2023) -- the legacy product is a degraded baseline, not a fortified incumbent
- Why not 5 years ago:
  - Pre-2020, neither broadband coverage nor DC Thomson's own subscription operating model was mature enough to make the extension economically routine. The cost of building the digital stack alone would have dominated the case.

**Workarounds:**

- BBC Scotland online (free, broad, low local granularity) -- fails on local detail (no school/club/court/council coverage)
- Border Telegraph and Southern Reporter (weekly print plus thin digital) -- fail on cadence and editorial depth
- Facebook community groups, town WhatsApps, parish newsletters -- fail on accountability, accuracy, and sustainability
- Edinburgh-anchored titles (The Scotsman, Edinburgh Evening News) -- fail on Borders specificity

**Desired State:**

- SUPPORTED means:
  - At least 5 of 5 interviewed Borders residents (across age cohorts) describe absence of daily local news as a felt deficit, not a theoretical one
  - At least 2 of the existing weekly titles' subscribers tested express willingness to pay £4.99-£5.99/mo for a daily-cadence DCT product
  - Borders council/court/planning beats are demonstrably underserved as measured by published-coverage counts vs nearby Aberdeen P&J coverage density
- BROKEN means:
  - Interviews reveal Borders residents are net-satisfied with the BBC + weekly + Facebook stack and do not describe absence as a felt deficit
  - Survey-equivalent willingness-to-pay below £3/mo for any new entrant, regardless of cadence

**Current State:**

- Met:
  - Structural conditions for the problem to exist are present (low coverage density, weekly cadence, declining incumbents)
- Partial:
  - Public signals of pain exist (circulation collapse) but are signals of the legacy product failing, not direct signals of demand for a new daily product
- Missing:
  - Direct conversation evidence with Borders residents
  - Survey or behavioural data on cadence preference
- Contradicted:
  - None at this stage

**Possibility Space:**

- Considered:
  - (P1) Borders residents lack daily-cadence local news [PRIMARY]
  - (P2) Borders residents lack civic accountability journalism (council/court/planning depth)
  - (P3) Borders residents lack a community/identity product (events, sport, obituaries, school news)
  - (P4) Borders advertisers lack a credible local-reach vehicle (problem owner = SMEs, not residents)
  - (P5) Borders residents lack national/regional news access (already solved by free national outlets)
  - (P6) Borders residents lack hyperlocal town-level news (Galashiels-only, Hawick-only) below the regional tier
- Alternatives carried:
  - (P2) Civic accountability framing -- carried because Newsquest's data shows court reports drive 21% of subscriber conversions; this is a strong adjacent framing of the same underlying need
  - (P3) Community/identity framing -- carried because DC Thomson's own community-vertical operating model (Local, Companionship, Genealogy, etc.) suggests this is how the product would be positioned in execution
- Eliminated:
  - (P5) -- Eliminated -- BBC, Sky, free national press already saturate this; no pain signal
  - (P4) -- Carried as adjacent revenue lever, not core problem -- DCT business model is reader-revenue first; advertiser pain is real but is an addressable revenue line, not the strategic problem to be solved
  - (P6) -- Eliminated as primary -- Town-level granularity below regional is sub-scale at Borders population; sub-areas contain 5-15k people each, below the floor for a subscription unit. Re-examine if regional fails.

**Evidence:**

- [WEB_RESEARCH] [T1] 2026-04-24 -- [Wikipedia — Southern Reporter](https://en.wikipedia.org/wiki/Southern_Reporter_(newspaper)): paid print circulation fell from c.12,500 (2013) to c.3,352 (2023), a 73% decline.
- [WEB_RESEARCH] [T1] 2026-04-24 -- [Press Gazette](https://pressgazette.co.uk/media_business/dc-thomson-revenue-2024/): DC Thomson subscription revenue +2% YoY to £40.6m FY24, the only growing revenue line.
- [WEB_RESEARCH] [T1] 2026-04-24 -- [WAN-IFRA](https://wan-ifra.org/2023/11/dc-thomson-new-focus-on-communities-brings-big-gains-in-paying-digital-subscribers/): DC Thomson grew digital subs from <1,000 (2019) to >30,000 (Nov 2023) across two regional patches (Aberdeen + Dundee).
- [WEB_RESEARCH] [T1] 2026-04-24 -- [Press Gazette](https://pressgazette.co.uk/paywalls/newsquest-hits-100000-digital-subscribers/): Newsquest 135,000 paid subs across 125 brands, ~1,080/brand average.
- [WEB_RESEARCH] [T2] 2026-04-24 -- [Press Gazette](https://pressgazette.co.uk/publishers/regional-newspapers/focus-on-local-not-trending-news-fuels-record-newsquest-digital-growth/): Newsquest reports 21% of subscriber conversions from court reports, 20% from sport.
- [COMPETITIVE_ANALYSIS] [T1] 2026-04-24 -- [Border Telegraph subscribe page](https://www.bordertelegraph.com/subscribe/): Border Telegraph (Newsquest, £4.99/mo) and Southern Reporter (Iconic Media) both operate at weekly cadence — no daily competitor in the Borders.
- [WEB_RESEARCH] [T2] 2026-04-24 -- [Scottish Borders Council](https://www.scotborders.gov.uk/strategies-plans-policies/research-data-scottish-borders-topic): 25-44 cohort declined 22.9% (2001-2021); 45-64 = 30.2% of population; 5th-highest % over 65 in Scotland.
- [OBSERVATION] [T1] 2026-05-05 -- research/press-and-journal/pj-product-briefing-2026-05-05.md: DCT operates free newsletters for Elgin, Inverness, and Oban (comparable density to Borders) but no separate paid subscription title — observed pattern is "newsletter inside regional title" for low-density areas.
- [WEB_RESEARCH] [T1] 2026-05-06 -- [Newsquest Scotland milestone — Border Telegraph](https://www.bordertelegraph.com/news/25665270.newsquest-scotland-hits-50-000-digital-subscriber-milestone/): Newsquest Scotland local-titles bucket (5 titles) totals c.7,500 subs, avg c.1,500/title — Border Telegraph is the direct Borders incumbent benchmark.
- [WEB_RESEARCH] [T1] 2026-05-06 -- [Newsquest Scotland milestone — Border Telegraph](https://www.bordertelegraph.com/news/25665270.newsquest-scotland-hits-50-000-digital-subscriber-milestone/): "All Access Scotland" bundle launched June 2025 at £8.99/month (Herald + National + Border Telegraph + sport + 4 other locals) — direct price-parity competitor to the modelled Borders Web Pack.
- [WEB_RESEARCH] [T1] 2026-05-06 -- [Press Gazette](https://pressgazette.co.uk/media_business/dc-thomson-reports-flat-revenue-but-growing-profit/): DCT regional news titles >50,000 digital subscribers (Jan 2026, from c.30,000 Nov 2023); subscription revenue £41.1m FY25 (+1% YoY).
- [WEB_RESEARCH] [T1] 2026-05-06 -- [Press Gazette](https://pressgazette.co.uk/publishers/dc-thomson-purpose-community-ella-dolphin/): DCT attributes subscriber growth to community-vertical operating model (Local, Companionship, Genealogy) — editorially, not algorithmically, organised around reader identity rather than news volume.

**Research Sources:**

- [T1] 2026-04-24 -- [Wikipedia — Southern Reporter](https://en.wikipedia.org/wiki/Southern_Reporter_(newspaper)) -- circulation history of Southern Reporter
- [T1] 2026-04-24 -- [DC Thomson revenue FY24 — Press Gazette](https://pressgazette.co.uk/media_business/dc-thomson-revenue-2024/) -- DCT FY24 financials
- [T1] 2026-04-24 -- [DC Thomson digital subscriber growth — WAN-IFRA](https://wan-ifra.org/2023/11/dc-thomson-new-focus-on-communities-brings-big-gains-in-paying-digital-subscribers/) -- DCT subscriber trajectory and operating model
- [T1] 2026-04-24 -- [Newsquest 100,000 digital subscribers — Press Gazette](https://pressgazette.co.uk/paywalls/newsquest-hits-100000-digital-subscribers/) -- Newsquest per-brand benchmark
- [T1] 2026-04-24 -- [Research data — Scottish Borders Council](https://www.scotborders.gov.uk/strategies-plans-policies/research-data-scottish-borders-topic) -- Borders demographics
- [T1] 2026-04-24 -- [Border Telegraph — subscribe page](https://www.bordertelegraph.com/subscribe/) -- competitor pricing
- [T1] 2026-04-24 -- [Newsquest local news growth — Press Gazette](https://pressgazette.co.uk/publishers/regional-newspapers/focus-on-local-not-trending-news-fuels-record-newsquest-digital-growth/) -- conversion-driving content categories
- [T1] 2026-05-05 -- research/press-and-journal/pj-product-briefing-2026-05-05.md -- P&J product structure (3-tier subscription, 17 free newsletters incl. 4 geographic, multi-locale follow on app, no print+digital bundle, EE city-only comparator at £14.99/mo) — assembled from live product screenshots and subscribe-page captures
- [T1] 2026-05-06 -- [Newsquest Scotland hits 50,000 digital subscriber milestone — Border Telegraph](https://www.bordertelegraph.com/news/25665270.newsquest-scotland-hits-50-000-digital-subscriber-milestone/) — Newsquest Scotland 51,153 subs; per-title local breakdown; All Access Scotland bundle £8.99/mo
- [T1] 2026-05-06 -- [DC Thomson reports flat revenue but growing profit — Press Gazette](https://pressgazette.co.uk/media_business/dc-thomson-reports-flat-revenue-but-growing-profit/) — DCT FY25 (year to March 2025) regional subs >50,000; subscription revenue £41.1m
- [T1] 2026-05-06 -- [How DC Thomson turned community + purpose into a winning publishing formula — Press Gazette](https://pressgazette.co.uk/publishers/dc-thomson-purpose-community-ella-dolphin/) — community-vertical operating model continued performance
- [T1] 2026-05-06 -- [GoFibre Begin Next Phase of UK Full Fibre Broadband Rollout in Scottish Borders — ISPreview UK](https://www.ispreview.co.uk/index.php/2026/02/gofibre-begin-next-phase-of-uk-full-fibre-broadband-rollout-in-scottish-borders.html) — Borders broadband rollout expanded to 20,000-premise target; Feb 2026 build started in Oxton, Coldingham, St Abbs, Jedburgh, Lauder
- [T1] 2026-05-06 -- [GoFibre announces next 2,000 premises in Scottish Borders — thinkbroadband](https://www.thinkbroadband.com/news/gofibre-announces-next-2000-premises-in-scottish-borders) — corroborating coverage of Borders fibre expansion

**Assumptions:**

- [B] [T2] Borders residents experience weekly-cadence as inadequate for local news consumption [LOAD-BEARING] [BLAST:HIGH]
  -> Falsification: Resident interviews (n>=10) show majority report weekly cadence as adequate
  -> Validation: Conduct 10-15 resident interviews across age cohorts and town/rural mix; behavioural analytics on existing free P&J/Courier traffic from Borders postcodes
  -> Status: OPEN
  -> CHALLENGE 2026-05-05: Modestly weakened. P&J's *observed* practice in similarly dispersed/low-density areas (Elgin, Inverness, Oban) is to serve them with weekly newsletters — i.e. DCT itself does not appear to operate a paid daily product for these geographies. This is consistent with two interpretations: (a) daily cadence demand is real but is satisfied by the regional-title editorial spine plus free local newsletters, not by separate paid local titles, OR (b) DCT has not yet tested daily paid in those geographies. Interview validation must now also probe whether residents perceive a free Borders newsletter (DCT brand, weekly) as adequate, vs requiring a paid daily product. The kill condition extends: if interviews reveal residents would settle for a free weekly newsletter under a known DCT brand, the *paid daily product* hypothesis breaks even though the underlying problem hypothesis may survive.
- [B] [T2] The 73% decline in Southern Reporter circulation reflects product-quality decline, not demand collapse for the category [LOAD-BEARING] [BLAST:HIGH]
  -> Falsification: Survey data shows under-60 cohort in Borders no longer wants any form of local news product
  -> Validation: Borders postcode traffic to free national/local sites; engagement signal on Borders-tagged content from existing DCT properties
  -> Status: OPEN
- [K] [T1] DC Thomson's existing subscription operating model is replicable at unit cost (it does not need to be rebuilt) [LOAD-BEARING] [BLAST:HIGH]
  -> Falsification: Internal review reveals platform/CMS/payments stack cannot extend to a third regional brand without material re-architecture
  -> Validation: Governor confirmation -- internal architecture review (this is a question DCT can answer directly)
  -> Status: OPEN -- ESCALATED TO GOVERNOR
- [O] [T2] Civic-accountability content (council, court, planning) is underserved in Borders relative to Aberdeen/Dundee [BLAST:MEDIUM]
  -> Falsification: Coverage audit of Border Telegraph and Southern Reporter shows comparable per-capita coverage of council/court/planning to Aberdeen/Dundee titles
  -> Validation: Coverage audit (publishable counts of council/court stories per month per capita) -- desk research, no governor input needed
  -> Status: OPEN

**Kill Condition:** Resident interviews (n>=10, mixed age and geography across the Borders) reveal that fewer than 3 in 10 describe the absence of daily-cadence local news as a felt deficit AND fewer than 2 in 10 indicate willingness to pay £4.99/mo for a daily DCT-quality product. If both thresholds are missed, the problem is not acute enough at this geographic scale to support a subscription extension.

**Kill Condition (extended 2026-05-05):** Additionally — if interview probing reveals that the *form* of resolution residents prefer is a free DCT-branded Borders newsletter (consistent with the Elgin / Inverness / Oban pattern) rather than a paid daily product, the paid-product hypothesis breaks even where the underlying problem holds. In that case the strategy shifts to "extend P&J or Courier coverage into Borders with a free Borders newsletter and possibly a Borders section/topic on the existing app", not "stand up a new paid Borders title". The problem hypothesis can survive that pivot; the unit-economics hypothesis cannot without re-derivation.

**Last Updated:** 2026-05-06
**Update Rationale:** 2026-05-06 CHALLENGE Pass 2 — Added four T1 evidence items from fresh competitive intelligence:
- Newsquest Scotland 51,153 subs (Dec 2025) with Border Telegraph in a 5-title 7,500-sub bucket
- Newsquest All Access Scotland £8.99 bundle driving two-thirds of new sign-ups
- DCT regionals >50,000 (Jan 2026) with revenue £41.1m
- GoFibre Borders rollout expanded to 20,000-premise target

The structural Problem claim (no daily-cadence local product in Borders) is unchanged, but the workaround landscape has *materially shifted* in the 6-12 months before this pass: Newsquest's All Access bundle is a stronger workaround than weekly print alone, at the same price point as the modelled Borders Web Pack. This neither falsifies the problem nor breaks the kill condition, but it raises the bar the paid Borders product must clear. Confidence state held at RESEARCHED. Ground-truth gap G-01 (resident interviews) still binds — the interviews must now also probe whether residents perceive Newsquest's bundle as adequate substitution.

**Prior Update (2026-05-05):** CHALLENGE pass — Added T1 evidence on DCT's observed newsletter-geography pattern (Elgin, Inverness, Oban). Refined load-bearing assumption on cadence and extended kill condition to distinguish "problem real but resolved by newsletter" from "problem real and requires paid daily product".

---

## 2. Segment

**Claim:** The primary segment is settled, civic-engaged Borders residents aged 50+ with broadband, who currently combine weekly local print, BBC Scotland online, and Facebook community groups to follow local civic, sport, and community life. They are observable as print buyers of Border Telegraph or Southern Reporter, members of named Borders Facebook community groups, or season-ticket holders at Borders rugby clubs. This segment is geographically dispersed across all 11 Borders market towns — a load-bearing characteristic that distinguishes it from the single-city patterns in Aberdeen and Dundee.

**Confidence:** RESEARCHED

**Trigger Event:** Cancellation of weekly print delivery; a council or planning decision affecting their town; a local controversy (court case, school closure, sports-club crisis); arrival of fibre broadband at the property; bereavement (obituary access); house purchase in the area (newcomer orientation)
**Budget Owner:** The household decision-maker (typically the same individual; ACV is small enough that consumption decisions are not formal budget decisions)
**Current Spend:** Border Telegraph or Southern Reporter print weekly (c.£1.50-£2 per issue, c.£75-£100/yr); some hold national subs (Times £200+/yr, Telegraph £150+/yr); typically one local + one national spend pattern observable in this demographic

**Observable Filters:**

- Residence in postcode districts TD1-TD15 (Borders) -- searchable via address-list rentals and postcode targeting
- Aged 50+ (the 45-64 cohort is over-indexed in Borders at 30.2% of population; over-65s are the 5th-highest in Scotland by council area)
- Active member of one of c.40 named Borders Facebook community groups (publicly observable membership counts)
- Print subscriber to Border Telegraph or Southern Reporter (acquirable as a list via incumbent publisher data, agent acquisition, or churn-targeting via direct mail)
- Holds rugby season ticket (Melrose, Gala, Hawick, Jed-Forest, Kelso, Selkirk, Peebles -- club membership lists)
- Common Riding participant or town association member
- Has fibre/superfast broadband (Project Gigabit expansion data identifies premise-level coverage)

**Access Paths:**

- Direct mail to TD1-TD15 postcodes (rural target, mature audience -- direct mail still a working channel for this demographic in this geography)
- Facebook ads targeted by postcode + age + interest (Borders rugby, Common Ridings, named towns)
- Print insert in Border Telegraph or Southern Reporter (ironic but viable -- legacy distribution, paid placement)
- Local radio (Radio Borders -- sole regional broadcaster, deeply embedded)
- Sponsorship of named Borders fixtures (rugby matches, Common Ridings, town events)
- Existing DC Thomson channel reuse: cross-promote from existing P&J/Courier products to any verified Borders email addresses already in the database (likely small but zero-cost)
- Event-based: bereavement notice channel (obituary submission as acquisition event)

**Desired State:**

- SUPPORTED means:
  - Conversation evidence (n>=10 interviews) that this profile describes recognisable, real residents -- not a composite that no one matches
  - Behavioural evidence: Facebook ads targeting these characteristics achieve <£15 CPL (cost per lead) for trial signup
  - At least 1 access path produces sustained acquisition at the CAC ceiling (see Unit Economics)
- BROKEN means:
  - Interviews reveal segment is too narrow (true segment is c.5,000 people, not the 25,000-40,000 modeled below)
  - Or segment is too broad (the psychographic does not predict subscription behaviour; CAC stays above £40)

**Current State:**

- Met:
  - Demographic profile matches public data (Borders is over-indexed on the target age cohort)
  - Observable filters are real and addressable
- Partial:
  - Multiple access paths identified but unit economics on each are still T2/T3
- Missing:
  - Conversation validation that the psychographic is real and concentrated, not diffuse
  - Behavioural validation of any one access path producing acquisition at target CAC
- Contradicted:
  - None

**Possibility Space:**

- Considered:
  - (S1) Settled civic-engaged 50+ Borders residents [PRIMARY]
  - (S2) Borders ex-pats / diaspora (people from Borders living elsewhere who want a connection home) -- observable via geneology services, Common Riding remote registration, Borders rugby diaspora groups
  - (S3) Newcomers to the Borders (recent house buyers, retirees relocating) -- observable via Land Registry recent transactions
  - (S4) Borders SMEs (advertisers, not subscribers -- different unit economics, served via ad sales)
  - (S5) Borders professional commuters (35-50, work in Edinburgh, live in northern Borders) -- observable via Edinburgh travel-to-work data
  - (S6) Borders rural-only (farms, hill communities, no town affiliation) -- observable via rural postcode density
  - (S7) Borders families with school-age children -- observable via primary/secondary catchment data
- Alternatives carried:
  - (S2) Borders diaspora -- carried as expansion segment. Critical because it removes the geographic constraint and may be a meaningful TAM uplift. Test in Phase 2 of GTM.
  - (S3) Newcomers -- carried as high-conversion segment. Trigger event (house move) is acute and well-known to drive subscription decisions in adjacent categories.
- Eliminated:
  - (S4) Eliminated as primary (carried as adjacent revenue) -- Different revenue model entirely (ad sales, not subscription); should be a parallel revenue line, not the segment that justifies the extension
  - (S5) Eliminated -- Commuters get news from Edinburgh sources; structural pull is to Edinburgh products, not a new Borders product. Pain insufficient.
  - (S6) Eliminated -- Pain present but segment too small (c.5-10k people across the rural-only cohort); cannot support a unit on its own
  - (S7) Eliminated as primary (carried as content vertical) -- The school-age-children parent has the pain but is least likely to pay for a new news subscription in a tight household budget. Better served as a content category within S1.

**Pain Scoring:**

| Segment | Frequency | Severity | Breadth | Alt. Inadequacy | Composite |
|---|---|---|---|---|---|
| 50+ civic-engaged Borders residents | 4 | 4 | 3 | 4 | 192 |
| General Borders residents (18–49) | 2 | 2 | 3 | 3 | 36 |

**Evidence:**

- [WEB_RESEARCH] [T1] 2026-04-24 -- [Scottish Borders Council](https://www.scotborders.gov.uk/strategies-plans-policies/research-data-scottish-borders-topic): 45-64 cohort = 30.2% (above Scottish average), 5th-highest % over 65 in Scotland.
- [WEB_RESEARCH] [T2] 2026-04-24 -- [Press Gazette](https://pressgazette.co.uk/publishers/regional-newspapers/focus-on-local-not-trending-news-fuels-record-newsquest-digital-growth/): Newsquest reports 21% of conversions from court reports, 20% from sport.
- [WEB_RESEARCH] [T2] 2026-04-24 -- Borders has 11 named market towns each with active community groups, rugby clubs, and Common Ridings -- the psychographic anchor (place-identity) is observably present and structured
- [COMPETITIVE_ANALYSIS] [T1] 2026-04-24 -- Border Telegraph and Southern Reporter exist and have surviving print readerships -- a paid-local-news segment exists; the question is its size and elasticity
- [WEB_RESEARCH] [T2] 2026-04-24 -- [GoFibre Win Project Gigabit Broadband Rollout Contract for Scottish Borders — ISPreview UK](https://www.ispreview.co.uk/index.php/2025/02/gofibre-win-project-gigabit-broadband-rollout-contract-for-scottish-borders.html): GoFibre awarded £26m contract for 11,000 premises in Borders and East Lothian — digital-access constraint being actively removed for the target geography.
- [OBSERVATION] [T1] 2026-05-05 -- research/press-and-journal/pj-product-briefing-2026-05-05.md: DCT's revealed-preference threshold for a standalone paid title sits above c.95k (Moray) and below c.260k (NE Scotland core); Borders (c.117k) falls inside that band.
- [OBSERVATION] [T1] 2026-05-05 -- research/press-and-journal/pj-product-briefing-2026-05-05.md: P&J app supports following multiple geographic topics simultaneously in one instance — per-locale content-stream infrastructure is built and operational.
- [WEB_RESEARCH] [T1] 2026-05-06 -- [Newsquest Scotland hits 50,000 digital subscriber milestone — Border Telegraph](https://www.bordertelegraph.com/news/25665270.newsquest-scotland-hits-50-000-digital-subscriber-milestone/): Local-titles bucket (5 titles) = c.7,500 subs avg c.1,500/title — Border Telegraph is the direct per-title floor benchmark; v1 month-24 target of 2,500-4,500 = 1.5-3x the incumbent's current paid base.
- [WEB_RESEARCH] [T1] 2026-05-06 -- [GoFibre Begin Next Phase of UK Full Fibre Broadband Rollout in Scottish Borders — ISPreview UK](https://www.ispreview.co.uk/index.php/2026/02/gofibre-begin-next-phase-of-uk-full-fibre-broadband-rollout-in-scottish-borders.html): Borders rollout expanded from 11,000 to 20,000-premise target, with active builds in Oxton, Coldingham, St Abbs, Jedburgh and Lauder (Feb 2026) — broadband-served-household filter loosening for the target segment.

**Research Sources:**

- [T1] 2026-04-24 -- [Research data — Scottish Borders Council](https://www.scotborders.gov.uk/strategies-plans-policies/research-data-scottish-borders-topic) -- demographic profile
- [T1] 2026-04-24 -- [Wikipedia — Southern Reporter](https://en.wikipedia.org/wiki/Southern_Reporter_(newspaper)) -- legacy local-news subscriber footprint
- [T1] 2026-04-24 -- [GoFibre Win Project Gigabit Broadband Rollout Contract for Scottish Borders — ISPreview UK](https://www.ispreview.co.uk/index.php/2025/02/gofibre-win-project-gigabit-broadband-rollout-contract-for-scottish-borders.html) -- digital-access trajectory; 11,000-premise initial GoFibre contract (Feb 2025)
- [T2] 2026-04-24 -- [Newsquest local news growth — Press Gazette](https://pressgazette.co.uk/publishers/regional-newspapers/focus-on-local-not-trending-news-fuels-record-newsquest-digital-growth/) -- content-category benchmarks for conversion
- [T1] 2026-05-05 -- research/press-and-journal/pj-product-briefing-2026-05-05.md (and onboarding screenshots) -- DCT geographic-coverage threshold calibration; multi-locale app capability
- [T1] 2026-05-06 -- [Newsquest Scotland hits 50,000 digital subscriber milestone — Border Telegraph](https://www.bordertelegraph.com/news/25665270.newsquest-scotland-hits-50-000-digital-subscriber-milestone/) — per-title ceiling benchmark for Borders incumbent
- [T1] 2026-05-06 -- [GoFibre Begin Next Phase of UK Full Fibre Broadband Rollout in Scottish Borders — ISPreview UK](https://www.ispreview.co.uk/index.php/2026/02/gofibre-begin-next-phase-of-uk-full-fibre-broadband-rollout-in-scottish-borders.html) — Borders broadband footprint expansion, refines T2 broadband-served-household assumption

**Assumptions:**

- [B] [T2] The c.117,000 population yields c.50,000-55,000 households (Scottish avg HH size c.2.15), of which c.25,000-35,000 fit the segment profile (50+ in broadband-served household with civic/community engagement) [LOAD-BEARING] [BLAST:HIGH]
  -> Falsification: ONS/NRS household and broadband data shows segment is materially smaller (e.g. c.10,000)
  -> Validation: Pull NRS Households and Dwellings 2024 data for Scottish Borders council area; cross-reference Project Gigabit coverage maps and Ofcom Connected Nations Borders data
  -> Status: OPEN
  -> CHALLENGE 2026-05-05: Status unchanged but external calibration added — Borders falls between Moray (c.95k, newsletter-only in DCT portfolio) and NE Scotland core (c.260k+, full paid title). DCT's revealed-preference threshold suggests c.117k is in the borderline band where the form (paid title vs newsletter inside an existing title) is genuinely uncertain. G-04 (NRS data pull) becomes more urgent: if the addressable household segment turns out closer to 15k than 30k, the strategy converges on the newsletter-inside-existing-title pattern observed in Moray/Inverness, not a standalone Borders title.
- [B] [T3] Within the segment, c.10-15% will be willing to pay for a daily DCT-quality product at £4.99-£5.99/mo if executed at parity quality with P&J/Courier [LOAD-BEARING] [BLAST:HIGH]
  -> Falsification: Conversion testing with simulated landing page produces signup intent below 5%
  -> Validation: Pre-launch landing-page test; small-scale paid acquisition test in Phase 1 of GTM
  -> Status: OPEN
- [O] [T2] Geographic dispersion (no single dominant town -- Galashiels c.15k is the largest) does NOT prevent acquisition because community identity is town-level, not regional, and channels can be town-targeted within a single regional product [BLAST:MEDIUM]
  -> Falsification: Acquisition tests show strong town-bias (e.g. Galashiels works, Hawick fails) suggesting the product needs town-level differentiation that breaks the unit economics
  -> Validation: Phase 1 acquisition tests must split by town and report per-town CAC
  -> Status: OPEN
- [B] [T3] Print remains a meaningful component of subscriber preference in this demographic and geography even where digital is available [BLAST:MEDIUM]
  -> Falsification: Trial signups overwhelmingly choose digital-only; print uptake <10%
  -> Validation: Bundle pricing test in Phase 1; observed digital/print/bundle mix
  -> Status: OPEN

**Kill Condition:** If conversation evidence (n>=10) reveals the segment as defined either does not exist as a coherent group (no shared psychographic predictive of subscription) OR is materially smaller than 15,000 households, the segment hypothesis breaks. Specifically: if fewer than 3/10 interviewees match the profile in self-description AND the household-with-broadband-and-50+ cohort is below 15,000 per NRS data, the segment is too narrow to support the unit economics.

**Last Updated:** 2026-05-06
**Update Rationale (2026-05-06 CHALLENGE Pass 2):** Added two T1 evidence items: (i) Newsquest Scotland local-titles bucket of c.7,500 subs across 5 titles, avg c.1,500/title, calibrating Border Telegraph's apparent paid-digital floor; (ii) GoFibre Borders rollout expanded to 20,000-premise target. Segment ceiling claim is now better-anchored: the 2,500-4,500 month-24 paying-sub target represents 1.5-3x the incumbent's apparent paid base (a meaningful but achievable lift, not a layup). Broadband-served-household constraint is loosening. Confidence state held at RESEARCHED. G-04 (NRS data pull) remains URGENT — additional dimension: NRS pull should now also estimate what % of TD1-TD15 50+ households Border Telegraph's c.1,500-or-less Borders share already represents, to size the *remaining* addressable headroom. Kill condition unchanged.

**Prior Update (2026-05-05):** CHALLENGE pass — added two T1 evidence items (DCT geographic-coverage threshold calibration; multi-locale app capability). Refined size-range assumption with cross-reference to DCT's observed minimum-viable-segment threshold (c.95k Moray = newsletter-only; c.260k NE = paid title; c.117k Borders = borderline).

---

## 3. Unit Economics

**Claim:** A Scottish Borders subscription extension can plausibly support LTV:CAC of c.4–7x and payback of c.5–9 months at scale, assuming c.2,500–4,500 subscribers within 24 months at a blended ARPU of £60–100/yr. The unit meets BOOTSTRAP thresholds in base and optimistic scenarios, with the T1-confirmed P&J Web Pack price of £8.99/mo providing the primary upward revision from v1. The critical dependency is holding marginal newsroom cost to c.£300–450k/yr and blended CAC below c.£25–35.

**Confidence:** RESEARCHED

**Revenue Model:**

- Type: SUBSCRIPTION (digital tiered; print sold separately, NOT bundled — corrected from v1 per T1 evidence)
- Pricing Unit: household
- Billing Motion: MIXED (monthly default; annual discount c.16-17% on P&J pattern; print delivery via separate annual prepay through DCT print shop)

**Price Hypothesis (CHALLENGE-revised 2026-05-05):** Adopting the T1-confirmed P&J tier structure as the primary anchor:

| Tier                               | Borders equivalent                                    |         Monthly |            Annual | Notes                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ---------------------------------- | ----------------------------------------------------- | --------------: | ----------------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Sport-equivalent (narrow vertical) | "Borders Rugby Pack" or similar narrow-vertical entry |          £4.99 |           £49.99 | Optional. Borders rugby is structurally important; a single-vertical entry tier may be a low-friction conversion point. T2 — analogous to P&J Sport Pack but vertical-fit unverified.                                                                                                                                                                                                                                                 |
| Main (web + app)                   | "Borders Web"                                         |   £6.99-£8.99 |   £69.99-£89.99 | T1-anchored on P&J Web Pack £8.99/mo / £89.99/yr. Borders may price modestly below P&J reflecting smaller market and challenger positioning, but the v1 floor of £4.99-£5.99 was set too low by analogy with the competitor (Border Telegraph at £4.99) rather than the reference product (P&J Web Pack at £8.99). The competitor floor and the reference ceiling are both anchors; the right Borders price likely sits between. |
| Web + ePaper                       | "Borders Web + ePaper"                                | £14.99-£21.99 | £144.99-£239.99 | T1-anchored. Lower bound = Evening Express price point (£14.99/mo for city-only ePaper-focused product); upper bound = P&J top tier (£21.99-£23.99, currently inconsistent on P&J site). The relevant Borders comparator is closer to EE than to P&J because Borders is a single-coverage region akin to Aberdeen city.                                                                                                             |

**Print:** Sold separately, not bundled. T1-corrected: P&J does NOT bundle print + digital; print is a separate annual purchase via the DCT print shop at indicative ~£610/yr. The v1 register's £8.99-£12.99/mo bundle assumption was wrong against the reference product. Borders should follow the same pattern unless an explicit case is made for bundling. This removes the bundle as a pricing lever and means the print-margin-drag analysis applies to a *separate* print P&L rather than to digital subscriber economics. Material correction.

**Pricing discrepancy note:** P&J's main subscribe page shows £23.99/mo for the top tier; an ePaper landing page shows £21.99/mo for what appears to be the same product (research/press-and-journal/pj-product-briefing-2026-05-05.md §"Pricing Discrepancies"). Two interpretations: a price rise in progress, or active A/B testing. Either way DCT is *managing* its top-tier price actively. T1 evidence that subscription economics are not stable inputs.

**Newsquest All Access Scotland competitive pricing update (2026-05-06):** Newsquest Scotland launched an "All Access Scotland" bundle in June 2025 at £8.99/month, which has driven two-thirds of new subscriber sign-ups since launch (per [Newsquest Scotland hits 50,000 digital subscriber milestone — Border Telegraph](https://www.bordertelegraph.com/news/25665270.newsquest-scotland-hits-50-000-digital-subscriber-milestone/)). This bundle includes The Herald, The National, Newsquest Scotland sport (Rangers Review/Celtic Way/Hearts Standard/Hibs Observer) and the local titles (incl. Border Telegraph). **A Scottish Borders household choosing between (a) the modelled Borders Web Pack at £7.99-£8.99/mo for daily Borders coverage only, or (b) the Newsquest All Access Scotland bundle at £8.99/mo for Borders + national + sport + 4 other locals, has a meaningful trade.** The pricing power assumed in the v1 Web Pack model rested on the implicit comparator being weekly-only Border Telegraph at £4.99 — that comparator is now obsolete. The relevant competitor benchmark is £8.99 for a multi-title bundle, not £4.99 for one weekly title. Implications: (i) the Borders Web Pack price ceiling is more constrained than the P&J Web Pack reference suggests, because Borders does not have the standalone-must-have Aberdeen-coverage moat P&J has, and (ii) the v1 differentiator ("daily" + "town-level granularity") must do more work to justify a price equal to a multi-title bundle, not less than weekly print. **No price reduction is recommended on the basis of this single data point** — but the pessimistic-case ARPU assumption (£62/yr) becomes more plausible than v1 estimated, and the optimistic-case ARPU (£85/yr blended) becomes harder to defend without explicit pricing-test evidence.

**Tier strategy implication:** Three tiers (vertical / web / web+ePaper) follows the P&J Good-Better-Best pattern. For a Borders launch, starting with two tiers (Web at c.£7.99/mo + Web+ePaper at c.£14.99/mo) reduces complexity; the Sport/Rugby Pack is a Phase 2 add once base economics confirmed.

**Cost Structure:**

| Category                                  | Items                                                                                                                                                                                                                                                                                                                                                                                                                                             |        Monthly Cost (range) | Tier            | Source                                                                                                                      |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------: | --------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Fixed: Team                               | 4-6 FTE editorial (1 editor, 2-3 reporters, 1 community/social, 1 production) at avg £35-45k loaded cost                                                                                                                                                                                                                                                                                                                                         |        £18,000 -- £30,000 | T2              | Press Gazette / NUJ regional minimum £27k; loaded cost adds c.30% for NI, pension, on-costs                                |
| Fixed: Infrastructure                     | Reuse existing DCT Pugpig Bolt platform; marginal hosting/CDN allocated to new title                                                                                                                                                                                                                                                                                                                                                              |            £500 -- £1,500 | T2              | Pugpig case study + standard CDN allocation; marginal because platform is reused                                            |
| Fixed: Software                           | Editorial CMS, social tools, analytics -- mostly reused; marginal SaaS allocation                                                                                                                                                                                                                                                                                                                                                                 |              £300 -- £800 | T2              | Standard SaaS bundle allocation                                                                                             |
| Fixed: Operations                         | Allocated central overhead (HR, finance, legal, brand) at 15-20% of direct opex                                                                                                                                                                                                                                                                                                                                                                   |          £3,000 -- £6,500 | T2              | Standard overhead allocation in established media                                                                           |
| Variable: Hosting/Compute                 | Per-subscriber CDN / app delivery                                                                                                                                                                                                                                                                                                                                                                                                                 |    £0.10 -- £0.30 per sub | T2              | Standard digital news per-sub cost                                                                                          |
| Variable: Payment Processing              | Stripe/equivalent at 1.5-2.9% + £0.20 per txn                                                                                                                                                                                                                                                                                                                                                                                                    | £0.10 -- £0.25 per sub/mo | T1              | Stripe published rates                                                                                                      |
| Variable: Print Production + Distribution | (CHALLENGE-revised 2026-05-05) Print is sold via a separate DCT print-shop SKU at ~£610/yr indicative —*not* bundled into digital subscription. Print P&L is therefore a separate analysis. The previous "blended digital+print" margin estimate was structurally wrong against the reference product. Carry print only as an optional adjacent revenue line for Borders at most, not as a margin component of the digital subscription unit. |         n/a in digital unit | T1 (correction) | research/press-and-journal/pj-product-briefing-2026-05-05.md — explicit statement "no print+digital bundle has been found" |
| Variable: Support                         | Customer service per ticket                                                                                                                                                                                                                                                                                                                                                                                                                       | £0.15 -- £0.40 per sub/mo | T2              | Industry benchmark for paid digital products                                                                                |
| Variable: Onboarding                      | Trial conversion / welcome flows -- mostly automated                                                                                                                                                                                                                                                                                                                                                                                              |    £0.05 -- £0.20 per sub | T2              | Standard automated onboarding                                                                                               |

**Derived (CHALLENGE-revised 2026-05-05):**

- Gross margin (digital subscription unit): c.70-85% [T2] — print no longer drags this number because print is a separate SKU per T1 reference product
- Gross margin (separate print P&L, if pursued at all): c.20-35% in dispersed rural geography on a £600-ish annual price [T3] — but this is now an *optional* adjacent product, not part of the unit
- Burn rate (Year 1, assuming sub-scale revenue): c.£26,000-£40,000/mo all-in (modestly lower than v1 because print fulfilment removed from the unit P&L)
- Path-to-contribution: contribution-positive at c.2,000-3,000 paying digital subscribers (revised down from 2,500-3,500 because (i) digital-only gross margin is structurally higher than blended, and (ii) Web Pack ARPU at c.£7.99-£8.99/mo lifts revenue per subscriber)

**Channel Strategy:**

| Channel                                                                 | Segment Reach                                                                                                                 | CAC Estimate (range) | Investment Split            | Tier | Source                                                                                                          |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | -------------------: | --------------------------- | ---- | --------------------------------------------------------------------------------------------------------------- |
| Direct mail to TD1-TD15 postcodes                                       | Reaches 50+ rural/town demographic where direct mail still works; targetable to print subscribers and lapsed-print households |         £18 -- £38 | Phase 1: 30% / Phase 2: 15% | T2   | UK direct mail benchmarks for over-50 rural; competitor lists addressable via list rental                       |
| Facebook ads (postcode + age + interest targeting)                      | Reaches 45-65 cohort with named Borders interests (rugby clubs, town pages, Common Ridings)                                   |         £15 -- £35 | Phase 1: 25% / Phase 2: 30% | T2   | Meta Ads benchmarks for UK regional news (£10-30 typical); targetable interests verified                       |
| Print insert in Border Telegraph / Southern Reporter                    | Reaches the exact segment that already pays for local news in this geography                                                  |         £12 -- £25 | Phase 1: 20% / Phase 2: 10% | T2   | Print insert CAC for category targeting in regional press; CAC may be lower if competitor cooperates (unlikely) |
| Local sponsorship (Borders rugby fixtures, Common Ridings, town events) | Brand-build channel; not direct-response; CAC attribution diffuse                                                             |         £25 -- £60 | Phase 1: 10% / Phase 2: 20% | T3   | Sponsorship CAC notoriously hard to attribute; included as brand-build line for sustained density               |
| SEO / content (Borders council, court, planning, rugby reporting)       | Compounding channel; reaches problem-aware searchers                                                                          |          £8 -- £22 | Phase 1: 10% / Phase 2: 20% | T2   | DCT existing SEO playbook from P&J/Courier; benchmarks from established regional SEO at 6-12 mo ramp            |
| Cross-promotion from existing DCT properties to Borders postcodes in DB | Reaches existing DCT-engaged readers in Borders                                                                               |          £3 -- £10 | Phase 1: 5% / Phase 2: 5%   | T2   | Existing audience reuse -- low marginal CAC, low volume ceiling                                                 |

- Channel-economics coherence (CHALLENGE-revised 2026-05-05): Blended CAC (Phase 1, weighted) c.£17-£32 unchanged. ARPU revised to c.£70-£100/yr (digital-only, taking the Web Pack as the primary tier; blended across two-tier mix of Web at £7.99-£8.99/mo and Web+ePaper at £14.99-£17.99/mo). Gross margin revised to c.70-85% (print removed from unit). LTV at 25% annual churn = c.£196-£340 (was c.£140-£250). LTV:CAC = c.6x-20x range; mid-case c.8-12x. PASSES BOOTSTRAP threshold (>5x) in base and optimistic, more comfortably than v1 estimated; still MARGINAL in pessimistic. Payback c.3-7 months: PASSES BOOTSTRAP threshold (<6 months) in optimistic and base-mid; FAILS modestly in pessimistic. **Net effect of CHALLENGE corrections: unit economics modestly improved at the digital level, primarily because (a) the price-anchor moves from £4.99-£5.99 (Border Telegraph competitor anchor) to £7.99-£8.99 (P&J Web Pack reference), and (b) print is removed from the digital margin calculation.** This does not resolve the fundamental Tier 3 gaps (WTP, conversion, churn — all still untested in Borders) but it widens the modelled margin of safety against pessimistic stress.
- ACV-channel constraint: ACV is c.£55-£130 -- this is firmly zero-touch / light-touch territory. Sales-assisted channels are eliminated. Direct mail viable because of demographic and geography (mature, rural, broadsheet-cultured); paid social viable because of named-interest density; SEO viable because of DCT existing capability.
- Sequencing rationale: Phase 1 prioritises direct response with attributable CAC (direct mail, Facebook, print insert, cross-promotion) to learn fast. SEO/content seeded but not relied upon (6-12 mo ramp). Sponsorship deferred to Phase 2 once acquisition baseline established. Phase 2 increases SEO and sponsorship investment as compounding/brand channels; reduces direct mail (saturation risk in a geography of c.50k households).

**Mode Thresholds (CHALLENGE-revised 2026-05-05):**

| Metric              | Required (BOOTSTRAP-equivalent for established self-funded extension) |                                                                   Estimate (range) | Tier | Source                                                                                                                           |
| ------------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------: | ---- | -------------------------------------------------------------------------------------------------------------------------------- |
| LTV:CAC minimum     | >5x                                                                   |                            6x -- 12x base; 3x -- 6x pessimistic (was 4.5x-8x base) | T2   | Calculation above; reflects ARPU lift from £55-£70 to £70-£100 and gross margin lift from blended-with-print to digital-only |
| Payback maximum     | <6 months                                                             | 3 -- 7 months base; 7 -- 12 months pessimistic (was 4-9 months / 8-14 pessimistic) | T2   | Calculation above                                                                                                                |
| Gross margin target | 70-85% (digital subscription unit)                                    |                                                                     70-85% digital | T2   | Cost structure above (print removed from unit)                                                                                   |

**Scenario Analysis (CHALLENGE-revised 2026-05-05):**

- **Optimistic:** 4,500 paying digital subs by month 24; ARPU £85/yr (mix-weighted across Web and Web+ePaper); CAC £18; gross margin 80%; churn 18% annual. Annual revenue c.£382k; contribution margin c.£305k after CAC; against fully-loaded cost base of c.£440k → still modestly loss-making but breakeven now within reach at c.5,500-6,000 paying subs in this scenario (was 6,000-7,500). Improvement: c.20-25% on subs-to-breakeven.
- **Base:** 3,000 paying digital subs by month 24; ARPU £75/yr; CAC £25; gross margin 75%; churn 25% annual. Annual revenue c.£225k; still loss-making at month 24 but credible path. Breakeven at c.6,500-7,500 paying subs c.month 30-42 (was c.7,500-9,000 at month 36-48). Improvement primarily comes from ARPU lift (price-anchor change from £58 to £75) and digital-only margin.
- **Pessimistic:** 1,500 paying digital subs by month 24; CAC £45; ARPU £62; churn 35% annual; gross margin 60% (digital-only but with elevated COGS allocation). Annual revenue c.£93k. Sustained loss at the unit; no credible path to breakeven within 5 years. Strategy still KILLED in this scenario — the v1 conclusion holds. The CHALLENGE-revised pessimistic is modestly better than v1's pessimistic (was £78k revenue) but the qualitative outcome is unchanged: the pessimistic case is unsurvivable.
- **Kill:** If after 18 months CAC blended exceeds £40 with sub-2,000 paying digital subs trend, unit economics cannot work at this geographic scale. Specifically: if CAC > £40 OR active digital subs at month 18 < 1,500 OR annual churn > 35%, kill the extension. Threshold values unchanged from v1 — the higher ARPU helps the upside scenarios more than it changes the downside floor.

**Desired State:**

- SUPPORTED means:
  - 6 months post-launch behavioural data (not estimates) confirms blended CAC <£30 across at least 2 channels
  - Trial-to-paid conversion >15% (in line with Newsquest regional benchmark)
  - Print/digital mix observed -- not just modelled
- BROKEN means:
  - 6-12 months post-launch CAC remains >£40 across all tested channels
  - Trial-to-paid conversion <8%
  - Annual churn observed >35% in cohort tracking

**Current State:**

- Met:
  - Cost structure has credible benchmarks (DCT internal cost data should refine these in governor review)
  - ARPU range supported by competitive prices and DCT existing pricing
- Partial:
  - CAC ranges are T2 benchmarks; per-channel reality unknown until tested
- Missing:
  - DCT internal cost data on actual marginal cost of a third regional title
  - Behavioural CAC and conversion data
- Contradicted:
  - Pessimistic scenario fails BOOTSTRAP thresholds -- this is a known finding to govern with, not a contradiction

**Possibility Space:**

- Considered:
  - (E1) Reader-revenue subscription, mixed digital/print [PRIMARY]
  - (E2) Pure digital subscription (no print)
  - (E3) Pure print revival (no digital paywall)
  - (E4) Free, ad-supported (no subscription)
  - (E5) Membership / community model (annual flat fee, not metered)
  - (E6) Non-profit / patronage model (e.g. The Mill in Manchester pattern)
- Alternatives carried:
  - (E2) Pure digital -- carried as fallback. If print distribution economics in the dispersed rural geography prove worse than modelled, drop to digital-only and accept smaller initial market.
  - (E5) Membership -- carried as upgrade path. After base subscription is proven, a higher-tier "Borders Friend" / membership product (events access, bylined patronage, premium events coverage) is a viable ARPU lever for the most engaged cohort.
- Eliminated:
  - (E3) Eliminated -- Demographic is digital-capable (broadband rolling out); print-only ignores the trajectory and concedes the future
  - (E4) Eliminated -- DCT entire strategic position is reader-revenue; ad-only contradicts the proven operating model and would compete with a market (regional advertising) that is structurally declining
  - (E6) Eliminated -- DCT is a commercial publisher; non-profit pivot would be a strategic identity change, not a market extension

**Evidence:**

- [WEB_RESEARCH] [T1] 2026-04-24 -- [How much UK digital news subscriptions cost — Press Gazette](https://pressgazette.co.uk/media-audience-and-business-data/digital-news-subscriptions-cost-2024/): P&J digital subscription c.£5.99/mo — superseded 2026-05-05 by T1-confirmed live tier (£4.99/£8.99/£23.99).
- [OBSERVATION] [T1] 2026-05-05 -- research/press-and-journal/pj-product-briefing-2026-05-05.md: P&J live tiers confirmed: Sport Pack £4.99/mo, Web Pack £8.99/mo (correct Borders price anchor), Web+ePaper £23.99/mo; annual saving c.16-17%.
- [OBSERVATION] [T1] 2026-05-05 -- research/press-and-journal/pj-product-briefing-2026-05-05.md: Evening Express (DCT, single-city) subscription £14.99/mo / £144.99/yr — single-coverage comparator calibrating the lower bound for a Borders ePaper-tier price.
- [OBSERVATION] [T1] 2026-05-05 -- research/press-and-journal/pj-product-briefing-2026-05-05.md: P&J does NOT bundle print with digital — print sold separately at indicative ~£610/yr; v1 digital+print bundle assumption does not match the reference product.
- [OBSERVATION] [T1] 2026-05-05 -- research/press-and-journal/pj-product-briefing-2026-05-05.md: Pricing discrepancy on live P&J site — main subscribe page quotes £23.99/mo vs £21.99/mo on ePaper landing page for the same apparent product.
- [COMPETITIVE_ANALYSIS] [T1] 2026-04-24 -- [Border Telegraph](https://www.bordertelegraph.com/subscribe/): subscription £4.99/mo, £52/yr — competitive pricing floor for this geography.
- [WEB_RESEARCH] [T1] 2026-04-24 -- [Average UK journalist salary — Press Gazette](https://pressgazette.co.uk/media-audience-and-business-data/average-journalists-salary-at-work-survey-nctj-ai-print-online/): NUJ minimum regional reporter £27k; Press Gazette survey average £32.7k — editorial cost basis.
- [WEB_RESEARCH] [T2] 2026-04-24 -- [WAN-IFRA](https://wan-ifra.org/2023/11/dc-thomson-new-focus-on-communities-brings-big-gains-in-paying-digital-subscribers/): DCT scaled from <1,000 to >30,000 subs across two regional patches (c.640k population) over 4 years.
- [WEB_RESEARCH] [T2] 2026-04-24 -- [Press Gazette](https://pressgazette.co.uk/paywalls/newsquest-hits-100000-digital-subscribers/): Newsquest 135,000 paid subs across 125 brands, avg c.1,080/brand.
- [COMPETITIVE_ANALYSIS] [T1] 2026-05-06 -- [Newsquest Scotland hits 50,000 digital subscriber milestone — Border Telegraph](https://www.bordertelegraph.com/news/25665270.newsquest-scotland-hits-50-000-digital-subscriber-milestone/): All Access Scotland bundle (June 2025, £8.99/mo) drives two-thirds of new sign-ups — direct price-anchor competitor matching Borders Web Pack price with materially more breadth (Herald + National + sport + 5 locals).
- [WEB_RESEARCH] [T1] 2026-05-06 -- [Newsquest Scotland hits 50,000 digital subscriber milestone — Border Telegraph](https://www.bordertelegraph.com/news/25665270.newsquest-scotland-hits-50-000-digital-subscriber-milestone/): Local-titles cluster c.7,500 subs / 5 titles = c.1,500 avg per title — direct per-title ceiling benchmark for Borders incumbent.
- [WEB_RESEARCH] [T1] 2026-05-06 -- [DC Thomson reports flat revenue but growing profit — Press Gazette](https://pressgazette.co.uk/media_business/dc-thomson-reports-flat-revenue-but-growing-profit/): DCT regionals >50,000 subs Jan 2026 (from c.30k Nov 2023); subscription revenue £41.1m FY25 (+1% YoY).
- [WEB_RESEARCH] [T2] 2026-05-06 -- [Biggest subscription news websites 2026 — Press Gazette](https://pressgazette.co.uk/paywalls/biggest-subscription-news-websites-2026/): Newsquest UK +32% YoY digital subs to 145,000 in 2025; ARPU down 9% in Q4 — volume growth bought by ARPU compression, cautionary for any pricing strategy relying on flat or rising ARPU.

**Research Sources:**

- [T1] 2026-04-24 -- [How much UK digital news subscriptions cost — Press Gazette](https://pressgazette.co.uk/media-audience-and-business-data/digital-news-subscriptions-cost-2024/) -- pricing benchmarks
- [T1] 2026-04-24 -- [Average UK journalist salary — Press Gazette](https://pressgazette.co.uk/media-audience-and-business-data/average-journalists-salary-at-work-survey-nctj-ai-print-online/) -- editorial cost basis
- [T1] 2026-04-24 -- [Stripe Pricing](https://stripe.com/pricing) -- variable cost; standard UK card rate 1.5% + £0.20
- [T2] 2026-04-24 -- [DC Thomson digital subscriber growth — WAN-IFRA](https://wan-ifra.org/2023/11/dc-thomson-new-focus-on-communities-brings-big-gains-in-paying-digital-subscribers/) -- subscription operating-model precedent
- [T2] 2026-04-24 -- [DC Thomson launches P&J and Courier on Pugpig Bolt — Pugpig](https://www.pugpig.com/2024/06/15/dc-thomson-launch-bolt/) -- platform reuse (zero marginal platform cost)
- [T1] 2026-05-06 -- [Newsquest Scotland hits 50,000 digital subscriber milestone — Border Telegraph](https://www.bordertelegraph.com/news/25665270.newsquest-scotland-hits-50-000-digital-subscriber-milestone/) — All Access Scotland £8.99 bundle and per-title local breakdown
- [T1] 2026-05-06 -- [DC Thomson reports flat revenue but growing profit — Press Gazette](https://pressgazette.co.uk/media_business/dc-thomson-reports-flat-revenue-but-growing-profit/) — DCT FY25 financials; >50k regional subs
- [T2] 2026-05-06 -- [Biggest subscription news websites 2026 — Press Gazette](https://pressgazette.co.uk/paywalls/biggest-subscription-news-websites-2026/) — UK regional digital subscription growth and ARPU trends

**Assumptions:**

- [K] [T1] DCT's existing Pugpig Bolt platform, payments stack, identity, and editorial CMS extend to a third regional brand at marginal cost (no rebuild) [LOAD-BEARING] [BLAST:HIGH]
  -> Falsification: Internal architecture review reveals platform extension requires £200k+ engineering build
  -> Validation: Governor / DCT internal CTO confirmation
  -> Status: OPEN -- ESCALATED TO GOVERNOR (Esc-1 in execution/queue)
  -> CHALLENGE 2026-05-05: PARTIALLY ADDRESSED for the "Borders-as-topic-within-existing-brand" pathway. T1 evidence (research/press-and-journal/pj-app-onboarding-4.PNG) shows the live P&J app supports following multiple geographic topics simultaneously (Aberdeen, Aberdeenshire, Highlands, Moray, Inverness, Argyll & Bute, Western Isles, Shetland, Orkney) within one app instance; pj-website-9-geos-coverage.png shows 10 geographic sections on the website. The infrastructure to add a "Borders" locale to an existing brand is observably operational. However, this does NOT resolve whether standing up a *separate brand* (own masthead, own subscription product) is marginal cost — that is a different architectural question (separate Pugpig instance? separate domain? separate identity tenancy?). The escalation reduces from BLIND to T2 for the topic-within-existing-brand path, and remains BLIND for the separate-brand path. Reclassification: assumption splits into two — see new assumption below.
- [K] [T2] (new 2026-05-05) Adding "Borders" as a follow-able topic / locale section within the existing P&J or Courier brand is marginal cost (no rebuild), based on observed multi-locale capability in the live app and website [LOAD-BEARING] [BLAST:MEDIUM — lower than the separate-brand version because it leans on observed capability]
  -> Falsification: Internal architecture review reveals Borders content cannot be added to existing brand without significant editorial-CMS or app re-architecture
  -> Validation: Governor / DCT internal CTO confirmation; could be cross-checked by inspecting whether a 10th geographic section can be created via existing CMS workflows
  -> Status: T2 — partial resolution of E-01 by observed capability
- [K] [T1] (re-stated 2026-05-05) Standing up a *separate* Borders brand with its own masthead, subscription, and product configuration is marginal cost — i.e. the Pugpig Bolt instance, payments stack, identity, and editorial CMS are sufficiently multi-tenant to extend to a new brand without rebuild [LOAD-BEARING] [BLAST:HIGH]
  -> Falsification: Internal review shows a new brand requires its own Pugpig deployment + identity tenancy + editorial CMS configuration totalling £200k+
  -> Validation: Governor / DCT internal CTO confirmation
  -> Status: OPEN — STILL ESCALATED TO GOVERNOR — multi-locale within an existing brand does NOT settle the separate-brand question
- [B] [T2] Marginal central-overhead allocation to a third title is c.15-20% of direct opex (not 100% standalone overhead) [LOAD-BEARING] [BLAST:HIGH]
  -> Falsification: DCT internal accounting allocates standalone overhead per title
  -> Validation: Governor / DCT CFO confirmation of allocation policy
  -> Status: OPEN -- ESCALATED TO GOVERNOR
- [B] [T3] Annual churn in this segment will sit at 18-30% (in line with regional digital news benchmarks) [LOAD-BEARING] [BLAST:HIGH]
  -> Falsification: Cohort data at month 12 shows churn >35%
  -> Validation: Cohort analysis from month 6 onwards; compare with internal DCT P&J/Courier churn benchmarks
  -> Status: OPEN
- [B] [T2] Print delivery in dispersed Borders geography costs 40-80p/copy and supports a print bundle for c.20-30% of subscribers; print is a margin drag but acquisition lever [BLAST:MEDIUM]
  -> Falsification: Print delivery quotes from carriers (Royal Mail, Menzies, local newsagent network) come in >£1.20/copy or no carrier will tender for the dispersed routes
  -> Validation: Carrier tender exercise; print mix modelled both with and without
  -> Status: OPEN
- [B] [T2] Direct mail and Facebook ads will produce CAC in the £15-£35 range for this segment in this geography [BLAST:MEDIUM]
  -> Falsification: Pilot tests produce CAC >£40 across both
  -> Validation: Phase 1 pilot in a single Borders town (e.g. Galashiels) with attributable CAC
  -> Status: OPEN
- [B] [T2] (new 2026-05-06) Borders Web Pack at £7.99-£8.99/mo can sustain ARPU above the Newsquest All Access Scotland bundle price (£8.99/mo for Herald + National + sport + 5 locals incl. Border Telegraph) on the strength of daily Borders-specific reporting alone [LOAD-BEARING] [BLAST:HIGH]
  -> Falsification: Landing-page or pilot test shows residents systematically prefer the Newsquest bundle at the same price; Borders-only Web Pack signup-intent <30% of bundle-equivalent-intent at price parity
  -> Validation: 3-cell landing-page test (already specified in G-06) extended to a 4th cell explicitly comparing the Borders Web Pack against a "Newsquest All Access" framing at the same price; resident interview probe on bundle vs single-title preference
  -> Status: OPEN — NEW; this assumption was implicit in v1 against a £4.99 weekly competitor and is now explicit and at higher risk against a £8.99 multi-title bundle. G-06 test design should be expanded to 4 cells.

**Kill Condition:** Unit economics break and the extension cannot proceed if any of the following hold after a 12-18 month launch test: (a) blended CAC exceeds £40 across all viable channels, (b) trial-to-paid conversion <8% across all tested funnels, (c) annual churn >35% in cohort tracking, (d) paying digital subscribers <1,500 at month 18 with channels at planned spend. Any one of these failures alone may not be terminal; any two together are. (CHALLENGE 2026-05-05: thresholds unchanged — the v1 kill condition was conservative against a £55-£70 ARPU; with the corrected £70-£100 ARPU the same thresholds remain valid as the lower bound for "cannot work" rather than "barely works".)

**Last Updated:** 2026-05-06
**Update Rationale (2026-05-06 CHALLENGE Pass 2):** Added competitive-pricing update for Newsquest All Access Scotland bundle (£8.99/mo, June 2025 launch, two-thirds of new sign-ups). Added new load-bearing assumption that Borders Web Pack can sustain ARPU at the same price as a multi-title bundle. Added evidence on DCT FY25 (>50k subs, £41.1m subscription revenue, +1% YoY) and Newsquest UK +32% volume / -9% ARPU trend (volume bought via ARPU compression — cautionary signal). **Net effect on the unit:** the 2026-05-05 ARPU lift (from £55-£70 to £70-£100) is modestly walked back. Optimistic-case ARPU at £85/yr is harder to defend than v1 estimated; pessimistic-case ARPU at £62/yr is more plausible. The base-case calculation is unchanged but the *distribution* shifts toward the pessimistic side. LTV:CAC base case held at c.6-12x; optimistic upper bound de-rated. Pessimistic case still kills. Confidence state held at RESEARCHED. No new governor escalation raised — this update reinforces the importance of E-03 (brand architecture: under config B, "section within existing brand", DCT can use the existing P&J subscription as the bundle answer to Newsquest's bundle, neutralising the £8.99 comparator threat).

**Prior Update (2026-05-05):** Material updates to pricing structure (3 tiers per T1 reference), removal of print+digital bundle (does not exist on reference product), upward revision of ARPU range (£55-£70 → £70-£100), gross margin lift (blended-with-print → digital-only at 70-85%), modest improvement of base-case payback and LTV:CAC. E-01 (platform marginal cost) splits into two assumptions — "Borders as topic within existing brand" partially addressed by app-onboarding evidence (T2); "separate Borders brand" remains escalated.

---

## 4. Value Proposition

**Claim:** For civic-engaged Borders residents who lack daily-cadence, locally-accountable news, the Scottish Borders edition is a daily local news subscription — digital and print — covering council, court, planning, schools, sport, and community life with named, locally-resident reporters at a depth and cadence no current alternative provides. Unlike the existing weekly titles it operates at daily cadence with sustained editorial investment; unlike BBC Scotland it provides granular, named-reporter coverage of specific towns and decisions; unlike Facebook it is accountable, accurate, and signed by name. The unique capability is DC Thomson's proven daily-newsroom operating model, replicated at unit cost rather than rebuilt from scratch.

**Confidence:** RESEARCHED

**Jobs Addressed:**

- Functional: Know what is happening in my town (council decisions, court outcomes, school news, sports results) within a day, accurately, with a name attached
- Emotional: Belonging to my place; the satisfaction of being well-informed about the community I'm part of; trust that someone is watching council, court, and planning on my behalf
- Social: Being the person in my circle who knows what is happening in the Borders; being the household that takes the local paper as a marker of civic membership


**Desired State:**

- SUPPORTED means:
  - Resident interviews validate at least 4 of the 6 clauses at recognisable, felt-pain level
  - Pre-launch landing-page test produces signup intent >5% at advertised pricing
- BROKEN means:
  - Resident interviews show clauses are not recognised (e.g. residents don't perceive incumbents as inadequate; or don't value daily cadence over weekly)
  - Pre-launch test produces signup intent <2%

**Current State:**

- Met:
  - Category and competitive clauses are factually established
- Partial:
  - Differentiator is a design choice DCT can deliver; whether it lands with the buyer is untested
- Missing:
  - All buyer-side validation (target match, problem-felt-acuteness, capability-perceived-as-unique)
- Contradicted:
  - None

**Evidence:**

- [WEB_RESEARCH] [T1] 2026-04-24 -- [Wikipedia — Southern Reporter](https://en.wikipedia.org/wiki/Southern_Reporter_(newspaper)): paid print circulation fell from c.12,500 (2013) to c.3,352 (2023), a 73% decline.
- [WEB_RESEARCH] [T1] 2026-04-24 -- [Press Gazette](https://pressgazette.co.uk/media_business/dc-thomson-revenue-2024/): DC Thomson subscription revenue +2% YoY to £40.6m FY24, the only growing revenue line.
- [WEB_RESEARCH] [T2] 2026-04-24 -- [Press Gazette](https://pressgazette.co.uk/publishers/regional-newspapers/focus-on-local-not-trending-news-fuels-record-newsquest-digital-growth/): Newsquest court reports = 21% of conversions, sport = 20%.
- [COMPETITIVE_ANALYSIS] [T1] 2026-04-24 -- No daily competitor in Borders; weekly competitors operate at thin editorial scale (typically 1-3 FTE per title under current owners).
- [OBSERVATION] [T1] 2026-05-05 -- research/press-and-journal/pj-product-briefing-2026-05-05.md: DCT's observed cadence in low-density areas is weekly newsletter (not daily product) — the VP "daily" differentiator only holds if the Borders product is daily Borders-specific reporting, not just daily newsletter delivery.
- [COMPETITIVE_ANALYSIS] [T1] 2026-05-06 -- [Newsquest Scotland hits 50,000 digital subscriber milestone — Border Telegraph](https://www.bordertelegraph.com/news/25665270.newsquest-scotland-hits-50-000-digital-subscriber-milestone/): All Access Scotland bundle (June 2025, £8.99/mo) is now a direct alternative at price parity — depth-not-breadth differentiator is now strictly load-bearing to justify equal price against a multi-title bundle.

**Assumptions:**

- [B] [T3] Borders residents value daily cadence over weekly cadence enough to pay 3-4x what they currently pay for weekly print [LOAD-BEARING] [BLAST:HIGH]
  -> Falsification: WTP testing shows residents are net-satisfied with weekly cadence
  -> Validation: Pre-launch landing-page test; resident interviews
  -> Status: OPEN
  -> CHALLENGE 2026-05-05: Validation method should now include a third leg — test whether residents prefer (a) free weekly Borders newsletter from a known DCT brand, (b) paid daily Borders product (working title Borders Journal), or (c) paid section/topic within an existing P&J/Courier subscription. The newsletter-as-entry-point evidence makes (a) a credible third alternative that the v1 register did not consider; if (a) or (c) wins, the paid-daily-product VP collapses but the underlying problem may still be addressable through a different DCT product configuration. Falsification thresholds extended accordingly.
- [B] [T2] DCT brand equity in Aberdeen/Dundee transfers to the Borders sufficiently to support the product launch (or, alternatively, a Borders-native sub-brand carries the proposition without DCT brand drag) [BLAST:MEDIUM]
  -> Falsification: Borders residents do not recognise DCT or P&J/Courier as editorially relevant to their geography
  -> Validation: Brand-awareness survey in Borders (small, fast)
  -> Status: OPEN
- [B] [T2] "Town-level granularity within a regional unit" is operationally deliverable without requiring per-town editorial overhead that breaks the cost model [BLAST:MEDIUM]
  -> Falsification: Editorial planning shows that adequate town-level coverage requires 10+ FTE, not 4-6
  -> Validation: Editorial design exercise -- staffing model with explicit per-town coverage commitments
  -> Status: OPEN
- [B] [T2] (new 2026-05-06) The "depth-not-breadth" differentiator is buyer-meaningful at price parity with a multi-title bundle [LOAD-BEARING] [BLAST:HIGH]
  -> Falsification: Landing-page test or interviews show residents prefer the Newsquest bundle (breadth) over Borders depth at price parity by >2:1
  -> Validation: 4-cell landing-page test (G-06 expansion) including Newsquest-bundle framing; resident interview probe
  -> Status: OPEN — promoted to load-bearing this pass because the bundle competitor at price parity is a new condition the v1 register did not contemplate

**Last Updated:** 2026-05-06
**Update Rationale (2026-05-06 CHALLENGE Pass 2):** Added Newsquest All Access Scotland as a new competitive alternative requiring an additional "vs alternative" clause. Promoted "depth-not-breadth" differentiator to a load-bearing T2 assumption (was implicit / not enumerated). The VP claim text itself is unchanged but its competitive context has shifted: at price parity with a national+local+sport bundle, the depth differentiator now does most of the work. G-06 landing-page test design is recommended to expand from 3 cells to 4 cells to incorporate the Newsquest-bundle comparator. Confidence state held at RESEARCHED.

**Prior Update (2026-05-05):** CHALLENGE pass — added T1 evidence on DCT's observed newsletter cadence in dispersed Scottish geographies (weekly, not daily). Refined the differentiator clause to require *daily Borders-specific reporting* (not just daily delivery cadence) to be meaningfully distinct from a newsletter pivot. Extended the WTP assumption to test three product configurations (free newsletter vs paid daily vs paid section in existing brand).

---

## 5. Growth Architecture (Proposed)

*Produced by Strategist. Non-binding until Gap Definer validates it.*

**Architecture:** TRADITIONAL (subscription with self-serve digital signup; no PLG viral loop; no network effects; established direct-response acquisition model)

**Hybrid Config (if applicable):**

- Primary motion: Direct-response paid acquisition (digital + direct mail) leading to self-serve subscription signup
- Secondary motion: Compounding earned/owned channels (SEO, sponsorship, brand) building density over 12-24 months
- Transition trigger: When SEO ranking on top 50 Borders queries reaches first page (estimated 9-15 months post-launch), shift mix from 70% paid to 50% paid / 50% earned

**Support State:** PROPOSED

**Rationale:**

- ACV implication: ACV £55-£130 -- firmly subscription / self-serve / light-touch territory; eliminates any sales-assisted motion
- Buyer type: Individual household decision-maker; user = buyer; no committee dynamic
- Time-to-value: Should be < 5 minutes from signup to first valuable read (digital). Print bundle TTV is delivery-dependent (1-3 days)
- Collaboration requirement: None (consumption product; no inherent sharing requirement)
- Selection reason: Subscription consumer media is structurally a TRADITIONAL motion. PLG would require viral mechanics absent in news; NETWORK would require multi-sided value absent here; MARKETPLACE inappropriate. The honest selection is direct-response subscription marketing in a defined geography. The interesting design question is sequencing of paid vs compounding channels, not architecture choice.

**Required Conditions:**

- Self-serve digital signup flow operational at parity with P&J/Courier (existing DCT capability -- replicable; partially confirmed 2026-05-05 — live P&J subscribe flow observable at pressandjournal.co.uk/subscribe/)
- Editorial output sufficient to support trial-to-paid conversion within 14-day trial (i.e. at least 5-7 substantive Borders-specific stories per day from launch)
- Identifiable Phase 1 channels that produce attributable CAC within 30 days of activation (direct mail, Facebook ads, print insert)
- Segment density per channel high enough to scale acquisition without channel saturation in <12 months (in c.50k household geography, channel saturation risk is real and load-bearing on the strategy)
- (CHALLENGE-added 2026-05-05) Brand-architecture decision made before Phase 1: is this a separate Borders brand (own masthead, own subscription product) or a Borders section/topic within an existing P&J or Courier subscription? The growth-architecture mechanics (signup flow, trial offer, cross-sell from existing audience) differ materially across these two configurations. See escalation E-03 in execution/queue.

**Assumptions:**

- [K] [T1] TRADITIONAL subscription motion is the right architecture for paid local news at this ACV [LOAD-BEARING] [BLAST:HIGH]
  -> Falsification: Genuinely no -- this is a category-structural fact, not a hypothesis. The architecture-mismatch risk is zero.
  -> Validation: Not required; architecture choice is overdetermined by ACV and category
  -> Status: RESOLVED_TRUE
- [B] [T2] Phase 1 paid channels can produce attributable acquisition within 30 days of activation [LOAD-BEARING] [BLAST:HIGH]
  -> Falsification: Pilot in a single town reveals no channel produces measurable signups in 30 days at the planned spend
  -> Validation: Phase 1 single-town pilot
  -> Status: OPEN
- [B] [T2] Channel saturation in the c.50k household geography is manageable for at least 24 months at planned acquisition pace [BLAST:MEDIUM]
  -> Falsification: Direct mail response degrades >50% by month 6 due to address-list exhaustion; Facebook frequency caps reached
  -> Validation: Cohort tracking by channel; CAC trend monitoring monthly
  -> Status: OPEN
- [O] [T2] (new 2026-05-05) The Pugpig Bolt platform supports adding a new geographic locale within an existing brand at marginal cost — observable from live P&J app's multi-locale follow capability across 9-10 geographic topics [BLAST:MEDIUM]
  -> Falsification: Internal CTO review reveals adding "Borders" as a 10th P&J locale requires significant editorial-CMS or app re-architecture
  -> Validation: Inspection of existing CMS workflow for adding a new locale; can be answered without governor input by examining how Argyll & Bute or Western Isles were added
  -> Status: T2 — partial resolution of E-01 (formerly all-or-nothing BLIND)

**Last Updated:** 2026-05-06
**Update Rationale (2026-05-06 CHALLENGE Pass 2):** No structural changes. Added a note that the brand-architecture decision (E-03) now has stronger evidential weight on the "section within existing brand" path: under config B, DCT can use the existing P&J subscription as a bundle answer to Newsquest's All Access Scotland bundle (matching breadth + adding Borders depth in one product), rather than positioning a standalone Borders title against a multi-title competitor at the same price. This sharpens the case for config B over config A on competitive grounds, but does not resolve the values question. Architecture choice (TRADITIONAL subscription) unchanged. Support state unchanged at PROPOSED.

**Prior Update (2026-05-05):** CHALLENGE pass — added required-condition on brand-architecture decision (separate brand vs section in existing brand). Added new T2 assumption on multi-locale capability per app-onboarding evidence.

---

## 6. Solution Design (Proposed)

*Produced by Strategist. Non-binding until Gap Definer validates it.*

**Support State:** PROPOSED

**Positioning Statement:**
For settled civic-engaged Scottish Borders residents who lack a daily-cadence, locally-accountable news product, *The Borders Journal* (working title) is a daily local news subscription -- digital and print -- that covers Borders council, court, planning, schools, rugby, and community life with named, locally-resident reporters. Unlike the Border Telegraph and Southern Reporter (weekly, distant ownership, thin newsrooms), it delivers daily reporting backed by DC Thomson's proven Scottish newsroom operating model. Unlike BBC Scotland, it goes town-deep, not region-broad. Unlike Facebook, it is accountable, accurate, and signed by name.

**Category Framing:** Daily local news subscription (regional press category)
**Category Rationale:** This is a known, well-understood category in the buyer's mind. The product does not need to invent a category; it needs to occupy a category position that no current product in the geography occupies (daily cadence, regional scope, paid subscription). DCT's existing P&J and Courier brands already define this category for buyers in adjacent geographies.

**Feature Map:**

| Feature                                                                                      | Solves Problem                                                                                 | Job Dimension          | Priority                                                                                     | Tier                                                                                                                                                                                                                                                                                  |
| -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Daily Borders council reporting (named reporter on local-government beat)                    | Civic-accountability gap in a region of c.117k people                                          | FUNCTIONAL + EMOTIONAL | MVP                                                                                          | T2                                                                                                                                                                                                                                                                                    |
| Daily Borders court reporting                                                                | Court coverage drives 21% of conversions in adjacent regional benchmarks; civic accountability | FUNCTIONAL             | MVP                                                                                          | T1                                                                                                                                                                                                                                                                                    |
| Daily Borders sport (rugby-anchored)                                                         | Sport coverage drives 20% of conversions; community identity in Borders is rugby-coded         | FUNCTIONAL + SOCIAL    | MVP                                                                                          | T1                                                                                                                                                                                                                                                                                    |
| Town-tagged content streams (Galashiels, Hawick, Peebles, Kelso, Jedburgh, Selkirk, Melrose) | Town-level place identity is the operative psychographic                                       | FUNCTIONAL + EMOTIONAL | MVP                                                                                          | T2                                                                                                                                                                                                                                                                                    |
| Obituary / tributes section                                                                  | Established conversion driver in DCT model; trigger event for older demographic                | EMOTIONAL + SOCIAL     | MVP                                                                                          | T1                                                                                                                                                                                                                                                                                    |
| E-paper / digital edition (Pugpig)                                                           | Older demographic comfort with newspaper-like reading interface                                | FUNCTIONAL             | MVP                                                                                          | T1                                                                                                                                                                                                                                                                                    |
| Print bundle (weekly digest in print + daily digital)                                        | Demographic preference for print object; gateway for less-digital subset                       | FUNCTIONAL + SOCIAL    | RECONSIDERED 2026-05-05 — DOWNGRADE TO POST_MVP / SEPARATE                                  | T1 (correction) — P&J reference product does NOT operate a print+digital bundle; print is sold separately via DCT print shop. The MVP feature should not assume bundling that the reference product does not do. Move print to a separate revenue line decision, not an MVP feature. |
| Daily morning newsletter                                                                     | Habit-forming consumption pattern; conversion + retention lever                                | FUNCTIONAL             | MVP (and PROMOTED 2026-05-05 to candidate Phase 0 standalone product — see MVP Scope below) | T1 — DCT operates 17 newsletters incl. 4 geographic newsletters across the P&J portfolio; pattern is observed and operational                                                                                                                                                        |
| Borders planning / development tracker (planning applications database with notifications)   | Differentiated civic tool no incumbent offers                                                  | FUNCTIONAL             | POST_MVP                                                                                     | T2                                                                                                                                                                                                                                                                                    |
| Premium "Borders Friend" tier (events, deeper longform, named patronage)                     | ARPU lever for most engaged cohort                                                             | EMOTIONAL + SOCIAL     | POST_MVP                                                                                     | T3                                                                                                                                                                                                                                                                                    |
| Borders schools coverage (per-catchment area)                                                | Family/parent segment served                                                                   | FUNCTIONAL             | POST_MVP                                                                                     | T2                                                                                                                                                                                                                                                                                    |
| Borders genealogy / heritage content (Common Ridings, town histories)                        | DCT existing community-vertical model + Borders diaspora segment expansion                     | EMOTIONAL + SOCIAL     | POST_MVP                                                                                     | T2                                                                                                                                                                                                                                                                                    |
| Borders business / SME ad inventory                                                          | Adjacent revenue line (not a subscriber feature; flagged for product roadmap separation)       | n/a                    | FUTURE                                                                                       | T2                                                                                                                                                                                                                                                                                    |
| Borders podcast (weekly news round-up + monthly long-form)                                   | Conversion lever; brand build                                                                  | FUNCTIONAL + EMOTIONAL | FUTURE                                                                                       | T2                                                                                                                                                                                                                                                                                    |

**MVP Scope (CHALLENGE-revised 2026-05-05 — two-stage MVP introduced):**

The CHALLENGE pass introduces a **Phase 0 / Newsletter MVP** that precedes the paid-product MVP, justified by T1 evidence that DCT's *observed* approach in dispersed/low-density Scottish geographies (Elgin, Inverness, Oban) is to start with a free local newsletter inside the regional title's editorial scope rather than launching a paid title directly. This is not a wholesale replacement of the paid-product MVP — it is a sequencing change that lowers risk and produces behavioural demand data before any paid-product launch.

**Stage 1 — Newsletter MVP (Phase 0):**

- Included:
  - Free Borders-branded weekly newsletter (1-2x/week) delivered via existing DCT email infrastructure
  - Editorial content sourced from a small team (1-2 FTE, possibly contractor-led) covering top Borders council / court / sport / community stories per week
  - Email capture via dedicated Borders landing page; account creation in DCT's existing identity system (zero rebuild)
  - Optional: a minimal "Borders" topic/section on the existing P&J or Courier website + app (leveraging the multi-locale capability observed in pj-app-onboarding-4.PNG)
- Aha moment: Reader signs up via landing page, receives first weekly newsletter within 7 days containing a Borders story they did not see elsewhere (named council decision, court report, club result), gets the same the following week.
- Time-to-value target: <7 days from signup to first newsletter; <2 minutes from landing page to email signup
- Goal: produce *behavioural* demand signal (signup volume, open rate, click-through, by town) at low cost to inform the Phase 1 paid-product decision. Specifically: ≥1,500 verified Borders email signups within 6 weeks at CAC <£8 indicates the paid product is viable; <500 signups indicates the segment may be smaller than modelled, triggering re-evaluation before paid commitment.
- Cost envelope: c.£8-15k (1-2 FTE for 8-12 weeks + landing page + ad spend on Facebook for capture) — compatible with the Phase 0 escalation E-3 already in flight
- This is a Phase 0 in GTM terms (Section 7) — feeds the GTM Plan revision below.

**Stage 2 — Paid Product MVP (the v1 plan):**

- Included:
  - Daily editorial output across council, court, sport (rugby-anchored), community, with named locally-resident reporters
  - Web subscription product on Pugpig Bolt (DCT existing platform); two tiers (Web at c.£7.99/mo and Web+ePaper at c.£14.99/mo) — revised from v1 single-tier
  - Daily morning email newsletter (now developed in Stage 1, ready to convert to subscriber-funnel)
  - Town-tagged content streams across the 11 main Borders towns
  - Obituary section
  - Trial offer (first month £1 or 14-day free trial -- match DCT existing Test funnel)
  - (REMOVED 2026-05-05) Optional print bundle — print is sold separately via DCT print shop, not bundled. If print is offered for Borders, it is a separate adjacent product line, not part of the digital subscription MVP.
- Aha moment: Reader signs up to paid trial, opens the morning newsletter, sees a story about a council/court/school/club matter in their named town, written by a named reporter, with detail and accuracy unavailable from BBC, Facebook, or the weekly competitors. Specifically: "Within 48 hours of signup, I read at least one story about my town that I would not have seen anywhere else."
- Time-to-value target: <24 hours (next-morning newsletter delivery); <5 minutes from signup to first read
- Excluded (unchanged from v1):
  - Hyperlocal town-only editions (e.g. Galashiels-only) -- sub-scale at town population (5-15k); add only if regional product proves and per-town engagement justifies edition split
  - Premium "Borders Friend" tier -- avoid pricing complexity; add at month 9-12
  - Full ad-supported model -- ad inventory is an adjacent revenue stream, not a subscriber feature
  - Borders podcast -- requires production capacity; add at month 12+ once editorial model is steady-state
  - Schools coverage as a vertical -- defer to month 6-9
- Excluded (CHALLENGE-added 2026-05-05):
  - Print + digital bundle — does not exist in the reference product (P&J); removed from MVP. If print is offered at all, it is a separate SKU, evaluated as an adjacent revenue line

**Growth Loops:**

- Editorial-quality compounding loop: Strong civic/court/sport reporting -> social shares + word-of-mouth -> SEO authority -> organic search acquisition -> more readers -> more reporting visibility (compounding over 12-24 months) (requires: sustained editorial output, Borders-specific SEO targeting) [T2]
- Bereavement / obituary loop: Funeral / family submits obituary notice -> wider family / community circle visits Borders Journal site -> conversion to subscription on emotional / event-driven trigger -> additional notices submitted by retained subscribers (requires: prominent obituary section, low-friction submission flow, well-priced trial) [T2]
- Civic-event loop: Council decision / planning controversy / court verdict in named town -> social-shared coverage -> postcode-targeted retargeting of engaged readers -> conversion of problem-aware readers (requires: rapid editorial response capability, ad retargeting infrastructure) [T2]

**Constraints from Hypotheses:**

| From              | Constraint                                                                                               | If Hypothesis Changes                                                                      |
| ----------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Problem           | Must be daily cadence; weekly does not solve the gap                                                     | If problem hypothesis breaks, weekly + premium-membership pivot becomes the design         |
| Segment           | Town-level granularity preserved within regional unit; design for 11 towns, not for one                  | If segment narrows (e.g. only Galashiels/central Borders viable), redesign as sub-regional |
| Unit Economics    | Editorial cost cap of c.£300-450k/yr (4-6 FTE); print component capped at c.30% of mix                  | If economics break, drop to digital-only and 3-4 FTE editorial unit; or kill               |
| Value Proposition | Differentiator must be deliverable -- daily cadence + town-level granularity + DCT-grade editorial scale | If VP breaks (residents don't value cadence), pivot to membership/community model          |

**Adequacy Criteria (CHALLENGE-revised 2026-05-05):**

- Newsletter MVP (Phase 0) produces ≥1,500 verified Borders email signups within 6 weeks at CAC <£8 — confirms behavioural demand sufficient to invest in Stage 2
- Newsletter MVP open rate >35% by week 4 (above the 25-30% UK news newsletter benchmark) — confirms editorial content is reaching readers, not just inboxes
- Stage 2 paid-product MVP delivers the aha moment within 24 hours of signup, measurable as a "first valuable read" event in product analytics
- Editorial output of at least 5-7 substantive Borders-specific stories per day, sustained, from Stage 2 launch
- Town-tagged content streams produce per-town engagement signal (page views, time on page) that allows per-town segmentation for retention work
- (REMOVED 2026-05-05) "Print bundle is operationally deliverable" — no longer an adequacy criterion because the bundle is no longer in MVP; print becomes a separate adjacent decision
- (ADDED 2026-05-06) Stage 2 paid product positioning explicitly contests the Newsquest All Access Scotland bundle (£8.99/mo, June 2025) on the depth-not-breadth axis — measurable as: in 4-cell landing-page test (G-06 expansion), the Borders Web Pack cell achieves intent rate ≥0.8x of the Newsquest-bundle-framing cell at price parity. Below 0.5x = competitive position is structurally weak and pricing or product must be revised before launch.

**Last Updated:** 2026-05-06
**Update Rationale (2026-05-06 CHALLENGE Pass 2):** No structural change to the two-stage MVP. Added an adequacy criterion: the Stage 2 paid product positioning must explicitly answer the Newsquest All Access Scotland bundle competitor at price parity (£8.99). The MVP differentiator features (daily Borders council/court/sport reporting + town-tagged streams + obituary) become the operational expression of the "depth-not-breadth" VP clause now elevated to load-bearing in Section 4. Support state unchanged at PROPOSED.

**Prior Update (2026-05-05):** CHALLENGE pass — material restructuring of MVP into two stages (Phase 0 Newsletter MVP + Stage 2 Paid Product MVP) justified by T1 evidence of DCT's observed newsletter-as-entry-point pattern in dispersed Scottish geographies. Print + digital bundle removed (does not exist in reference product). Pricing tier structure revised to two tiers per T1 evidence. Adequacy criteria extended to include Phase 0 thresholds.

---

## 7. GTM Plan (Proposed)

*Produced by Strategist. Non-binding until Gap Definer validates feasibility.*

**Support State:** PROPOSED

### GTM Architecture

- Pattern: Sales-Led variant adapted for self-serve consumer subscription -- specifically, founder-equivalent direct-response acquisition (DCT marketing team) with a phased move toward compounding earned/owned channels
- Rationale: ACV £55-£130 prohibits sales-assisted motion; the right pattern is direct-response paid acquisition + content/SEO + brand building, sequenced across phases. This is the proven DCT operating pattern in P&J/Courier, applied to a third geography.

### Channel Sequence

**Phase 0: Newsletter Validation (Months -3 to 0) — CHALLENGE-added 2026-05-05**

- Mechanism: Free Borders-branded weekly newsletter (1-2x/week) delivered via existing DCT email infrastructure. Email capture via dedicated Borders landing page; account creation in DCT identity system. Optional: a minimal Borders topic/section on the existing P&J or Courier app/website (leveraging multi-locale capability per pj-app-onboarding-4.PNG).
- Channels (Phase 0): Facebook ads to TD1-TD15 postcodes targeting capture-to-newsletter (60%); SEO/content on Borders council/court/sport queries seeded via existing P&J domain authority (20%); print insert in Border Telegraph or Southern Reporter offering "free Borders weekly newsletter" (20%).
- Total budget (Phase 0): c.£8-15k (per Esc-3 in execution/queue, already raised by Gap Definer 2026-04-24)
- Target KPIs:
  - Verified Borders email signups: ≥1,500 in 6 weeks; ≥3,000 in 12 weeks
  - Cost per signup: <£8 (significantly below the v1 paid-product CAC range because the offer is free)
  - Newsletter open rate: >35% by week 4
  - Click-through to Borders content: >12% per send
  - Per-town signup distribution: presence in ≥7 of 11 main Borders towns (i.e. not concentrated in Galashiels alone)
- Exit gate to Phase 1: ALL of (a) ≥1,500 signups by week 6, (b) cost per signup <£8, (c) open rate >35% sustained, (d) per-town distribution ≥7/11 towns
- Kill criteria: After 8 weeks, if signups <800 OR cost per signup >£12 OR open rate <25% OR concentration in ≤4 towns, the Borders segment may be too thin or too narrow for a standalone paid product. In that case the recommendation becomes either (i) extend Borders coverage as a free section/topic within an existing P&J/Courier subscription (low-cost incremental commitment), or (ii) halt the extension entirely. The decision is governor's; the strategy provides the data.
- Why this is now a separate Phase 0 rather than rolled into Phase 1: T1 evidence (research/press-and-journal/pj-product-briefing-2026-05-05.md) establishes that DCT's observed practice in similarly dispersed geographies (Elgin, Inverness, Oban) is a free local newsletter inside the regional title's editorial scope. Replicating this observed pattern as a Phase 0 (a) is consistent with DCT's own playbook rather than departing from it, (b) generates *behavioural* demand data before paid-product commitment, (c) costs c.£10k-£15k vs c.£60k-£120k for Phase 1, (d) produces an asset (Borders email list, newsletter brand) that is reusable in Phase 1 as a paid-conversion funnel even if Phase 1 launches as a separate product, and (e) tests the brand-architecture choice (separate Borders brand vs section within existing brand) in a low-risk way before committing to expensive infrastructure.

**Phase 1: Paid Validation (Months 0-9) — CHALLENGE-revised 2026-05-05 to inherit Phase 0 newsletter list**

- Channels: Conversion of Phase 0 newsletter list to paid trial (NEW — c.20%); Direct mail to TD1-TD15 (25%); Facebook ads postcode + interest targeted (20%); Print insert in Border Telegraph and/or Southern Reporter (15%); Sponsorship of named Borders fixtures (10%); SEO seeding (5%); Cross-promotion from existing DCT properties (5%)
- Total budget (Phase 1): c.£60,000-£120,000 (excludes editorial cost; this is acquisition spend only). The newsletter-list channel is essentially zero marginal acquisition cost (the cost was in Phase 0); it is the cheapest source of trial signups available.
- Target KPIs (CHALLENGE-revised 2026-05-05):
  - Signups (trial): 1,800-3,500 over Phase 1 (uplifted from v1's 1,500-3,000 due to Phase 0 newsletter base)
  - Newsletter-list-to-paid-trial conversion: >8% (this is a new metric — measures how well the free-to-paid pivot lands)
  - Trial-to-paid conversion: >12% across all channels (vs Newsquest regional benchmark, unchanged)
  - Blended CAC: <£28 (revised down from <£32 because newsletter-list channel pulls average down; still well within ceiling)
  - Per-channel attributable CAC measured for at least 4 of 7 channels
  - Paying subs at month 9: >900 (uplifted from v1's >800)
- Exit gate: ALL of (a) blended CAC <£32, (b) trial-to-paid >12%, (c) paying subs >900 at month 9, (d) at least 2 channels with attributable CAC <£25, (e) newsletter-list-to-paid conversion >8%
- Kill criteria: After 9 months, if blended CAC remains >£40 OR trial-to-paid <8% OR paying subs <500, halt and reassess. If after 6 months no channel produces attributable acquisition <£30, reduce spend by 50% and run editorial-quality + product diagnostic before continuing. Additionally (CHALLENGE-added): if newsletter-list-to-paid conversion is <3% the assumed bridge from free engagement to paid commitment is broken — re-examine the WTP assumption and the price tier rather than scaling channel spend.

**Phase 2: Traction (Months 9-24)**

- Channels: Direct mail (15%); Facebook ads (30%); Print insert (10%); Sponsorship/brand (20%); SEO/content (20%); Cross-promotion (5%)
- Budget split rebalanced toward compounding channels as SEO ramps
- Target KPIs:
  - Paying subs at month 24: 2,500-3,500 (base case); 4,500 (optimistic)
  - Annual churn observed: <30%
  - Net subs growth: >150/month sustained
  - Blended CAC: <£25 (lower because compounding channels diluting paid CAC)
  - Print/digital mix observed and stable
- Exit gate: ALL of (a) paying subs >2,500 at month 24, (b) blended CAC <£28, (c) annual churn <30%, (d) at least 1 compounding channel (SEO or brand) producing >20% of acquisitions
- Kill criteria: At month 18, if paying subs <1,500 OR CAC trending up MoM for 3 consecutive months OR churn >35%, present pivot/halt decision to governor. Specifically: pivot options are (i) drop to digital-only, (ii) drop to weekly cadence + membership, (iii) halt extension and run lessons-learned for other regional moves.

**Phase 3: Scale (Months 24-48)**

- Channels: Facebook (25%); SEO/content (30%); Sponsorship/brand (20%); Direct mail (10%); Premium-tier acquisition / events (10%); Cross-promotion + diaspora targeting (5%)
- Diaspora segment opened: target ex-Borders residents elsewhere in UK (and Borders ex-pats in Australia, Canada, NZ -- known significant Borders diaspora communities)
- Target KPIs:
  - Paying subs at month 48: 5,000-7,500
  - Contribution-positive at unit level
  - Annual churn <25%
  - Premium-tier ARPU lift: >15% of subscriber base on higher-tier
  - Net revenue retention >100%
- Kill criteria: If unit fails to reach contribution-positive by month 48, formal review of whether to sustain (with subsidisation rationale, e.g. brand value, civic value) or wind down.

### Messaging Framework (CHALLENGE-revised 2026-05-05 — pricing updated to T1-anchored Web Pack tier; Phase 0 newsletter messaging added)

- Headline (paid product, Stage 2): *Daily news for the Borders, written from the Borders.*
- Headline (Phase 0 newsletter, Stage 1): *The free Borders weekly — local news for your town.*
- Subhead (paid): Council, court, planning, rugby, schools and the people who shape your town -- reported by named local journalists, every day. The local paper the Borders has been missing.
- Subhead (newsletter): A weekly digest of Borders council, court, sport and community stories from the team behind Press & Journal and The Courier — free, in your inbox.
- Proof points (paid, 3 max — CHALLENGE-revised 2026-05-06):
  1. Daily reporting from a c.5-person Borders newsroom -- more local journalists in the Borders than any current title
  2. Built on the same operating model that grew Press & Journal and The Courier digital subscriptions past 50,000 in 2026 (revised 2026-05-06: was 30,000+ in four years; new T1 figure is the more current and stronger proof point — see [Press Gazette DCT FY25](https://pressgazette.co.uk/media_business/dc-thomson-reports-flat-revenue-but-growing-profit/))
  3. From £7.99/month (or £79.99/year), with a Web + ePaper option at £14.99/month. **Note (2026-05-06):** at this price point, the proof point cannot lean on price-as-value (Newsquest's All Access Scotland bundle is £8.99/mo for Herald + National + sport + 5 locals incl. Border Telegraph — see [Border Telegraph announcement](https://www.bordertelegraph.com/news/25665270.newsquest-scotland-hits-50-000-digital-subscriber-milestone/)). Messaging must lead with depth-of-Borders-coverage, not price. A specific worked alternative: "More Borders council reports, more Borders court reports, more Borders rugby every day than any other publication — the local depth no Scotland-wide bundle can match."
- Awareness-level CTAs:

| Awareness Level                      | Lead Message                                                | CTA (Phase 0 newsletter)      | CTA (Stage 2 paid)               |
| ------------------------------------ | ----------------------------------------------------------- | ----------------------------- | -------------------------------- |
| Unaware                              | "Who's covering the Borders?" -- problem-of-absence framing | "Get the free Borders weekly" | "See the latest from your town"  |
| Problem-aware                        | "Tired of Facebook rumours and BBC headlines?"              | "Get the free Borders weekly" | "Try free for 14 days"           |
| Solution-aware                       | "Daily Borders news, named reporters, real coverage"        | n/a                           | "Start trial -- £1 first month" |
| Product-aware (newsletter recipient) | "Join 1,500+ Borders readers — now in daily"               | n/a                           | "Upgrade to daily — £7.99/mo"  |
| Most aware                           | "Renew or upgrade to Borders Friend"                        | n/a                           | "Subscribe / Upgrade"            |

- Channel adaptations:
  - Direct mail: Long-copy approach for 50+ demographic; lead with civic-accountability framing (council/court); include print-bundle option prominently; mail-back response card alongside digital signup URL
  - Facebook: Town-named creative ("Galashiels parents", "Hawick rugby fans", "Peebles council watchers"); UGC-style video; lead with specific story examples
  - Print insert: Soft challenger framing -- emphasise daily cadence, not direct attack on incumbent; cover-mount trial offer
  - SEO: Optimise on Borders-specific civic queries (planning applications, council meetings, court reports, named-town news)
  - Sponsorship: Brand presence at Common Ridings, Borders rugby fixtures; ambient brand-building, no direct response expected

### Operational Constraints

| From                | Constraint                                                                                                                    | Blast Radius                                                                   |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Problem hypothesis  | Daily cadence is the differentiator -- editorial cannot drop below daily output without breaking the VP                       | HIGH -- if daily output proves uneconomic, the VP collapses                    |
| Segment hypothesis  | Town-level granularity must be preserved -- channel mix must support town-targeted acquisition                                | MEDIUM -- workable across multiple channels                                    |
| Segment hypothesis  | Mature, dispersed-rural demographic -- some channels (e.g. TikTok, Instagram Reels) eliminated; others (direct mail) elevated | MEDIUM                                                                         |
| Unit Economics      | Total Phase 1 acquisition spend cap c.£120k -- channel concentration, not breadth                                            | HIGH -- spreading thin across channels invalidates per-channel CAC measurement |
| Unit Economics      | CAC ceiling £35 blended -- channels with CAC trending above must be cut, not subsidised                                      | HIGH -- ignoring CAC drift breaks the model in 12-18 months                    |
| Growth Architecture | Compounding channels (SEO, brand) ramp 9-15 months -- Phase 1 cannot rely on them                                             | MEDIUM -- known constraint; addressed by sequencing                            |
| Value Proposition   | Editorial credibility cannot be compromised for acquisition speed -- the VP breaks if quality is sacrificed                   | HIGH -- the differentiator IS quality                                          |

### Diagnostic Findings (from Step 8 of stg-designing-gtm)

1. **Demand:** RESEARCHED at T2 -- structural signals support demand (legacy circulation, demographic profile, no daily competitor); resident-felt demand requires conversation validation. T3 gap flagged.
2. **Funnel conversion:** Plausible -- DCT operating model proven; messaging traceable to VP; awareness-level mapping coherent. Risk: messaging assumes residents are problem-aware -- they may need to be moved from unaware. Phase 1 should test problem-aware vs unaware messaging splits.
3. **Activation:** Plausible -- 24-hour aha moment achievable on existing DCT platform; print bundle TTV depends on delivery network.
4. **CAC sustainability:** PASSES in optimistic and base; FAILS in pessimistic. Margin of safety is thin. This is a real risk, not a comfortable bet.
5. **Survivability:** DCT can execute Phase 1 channels -- direct mail, Facebook, print insert, SEO are all in the existing capability set. No execution-capability gap.

### Constraints from Hypotheses

- From Problem: Daily cadence + civic-accountability content are non-negotiable for the *paid product* VP; the *newsletter* (Phase 0) does not require daily cadence and is consistent with weekly delivery — this widens the strategy's optionality without violating the underlying problem hypothesis
- From Segment: Channel mix must reach 50+ rural/town demographic (rules out short-form video; favours direct mail, Facebook, print insert, sponsorship). Newsletter capture-via-Facebook is a particularly cheap test of this targeting in Phase 0.
- From Unit Economics (CHALLENGE-revised): Total Phase 0 acquisition spend c.£8-15k; total Phase 1 acquisition spend capped c.£60-£120k; CAC ceiling £35 blended (Phase 1); CAC ceiling £8 per signup (Phase 0). Print is a separate adjacent product line, not a digital-subscription cost component (correction from v1).
- From Growth Architecture: Phase 0 = newsletter validation (NEW); Phase 1 = paid foundation; Phase 2 = compounding diversification; Phase 3 = brand + diaspora expansion. No PLG mechanics available to short-circuit this sequence, but Phase 0 functions as a *behavioural-data* validator before paid commitment.

**Last Updated:** 2026-05-06
**Update Rationale (2026-05-06 CHALLENGE Pass 2):** Proof point 2 updated to reference the more current >50,000 DCT regional subs figure (Jan 2026, [Press Gazette](https://pressgazette.co.uk/media_business/dc-thomson-reports-flat-revenue-but-growing-profit/)) rather than the 30,000+ Nov 2023 figure. Proof point 3 noted: at £7.99 vs Newsquest All Access £8.99 multi-title bundle, messaging cannot lean on price-as-value; must lead with depth-of-coverage. No structural changes to Phase 0/1/2/3 sequence or budget. Support state unchanged at PROPOSED. Gap Definer should re-validate the messaging update against the bundle competitor and consider whether G-06 expands to 4 cells.

**Prior Update (2026-05-05):** Added Phase 0 (Newsletter Validation, Months -3 to 0) justified by T1 evidence of DCT's observed newsletter-as-entry-point pattern in dispersed Scottish geographies. Phase 1 budget and KPIs revised to inherit Phase 0 newsletter list as a near-zero-marginal-cost acquisition channel. Pricing in messaging framework updated to T1-anchored Web Pack (£7.99/mo). Awareness-level CTAs split across Phase 0 (free newsletter) and Stage 2 (paid trial). Constraints table revised to remove print-bundle assumption and reflect Phase 0 budget.

---

## 8. Destruction Log

*Executed and owned by Gap Definer. Strategist does not write to this section.*

**Pass:** 2 (post Strategist CHALLENGE incorporating P&J product briefing T1 evidence, 2026-05-05)
**Full detail:** `strategy/gap-analysis.md` §6
**Pass 1 record retained at the bottom of this section for traceability.**

### Pre-Mortem (Pass 2 — 12-month failure scenario, two-stage MVP)

The dominant failure chain shifts under the two-stage MVP introduced in CHALLENGE.

1. **Month 0-2 (Phase 0 launch):** Borders newsletter signups exceed 1,500 in 6 weeks at £6 CPS; open rate 38%; per-town distribution 9 of 11 towns. Phase 0 exit gates appear comfortably met.
2. **Month 3-4 (the deceptive signal):** Phase 1 paid product greenlit. Editorial team scales to 4-5 FTE.
3. **Month 5-7 (cannibalisation reveal):** Newsletter-list-to-paid trial conversion lands at 4-6% — above the 3% kill criterion but well below the 8% target. Subscribers who signed up "because it was free" are the cohort that does not convert at price.
4. **Month 8-9 (Newsquest's deeper response):** With 6 months to prepare instead of 0-3, Newsquest drops Border Telegraph to £2.99 *plus* launches a free Border Telegraph weekly newsletter mirror to defend the captured-but-unconverted DCT readers. DCT trial-to-paid drops to 8-9%. Paying subs at month 9: 700-900 against the >900 floor.
5. **Month 10-12 (brand-architecture trap):** If Phase 0 was hosted inside an existing brand (Strategist's recommended (C)), the captured Borders newsletter list is attached to that brand's identity; a standalone Borders Journal launch loses or has to re-permission the list. Phase 0 asset is partially stranded by deferred brand decision.

**Dominant causal factors (NEW):**

- Free-to-paid bridge weakness (G-13/G-15): Phase 0 measures newsletter performance, not paid demand
- Path-dependency (G-14): deferred brand decision creates Phase 0 / Phase 1 asset friction
- Extended Newsquest response window: two-stage sequence gives Newsquest 6-9 months reaction time vs the 90-day window modelled in Pass 1

**What is missed in CHALLENGE-revised register:** Phase 0 exit gates measure engagement, not WTP. The single direct WTP metric (newsletter-to-paid conversion) only becomes available *after* Phase 1 commitment is sunk. Phase 0 produces high-confidence data on the wrong question.

### Red-Team (Pass 2 — Newsquest 90-day response, newsletter-first scenario)

- **Week 0-4:** Initially under-react. A free DCT newsletter is not an immediate competitive threat to a paid subscription. **This is the strongest argument for newsletter-first sequencing — but only true for the first 6-8 weeks.**
- **Week 4-12:** As Borders signups cross 1,000+, Newsquest recognises the play. Response window opens.
- **Month 3-4:** Newsquest launches its own free Border Telegraph weekly newsletter — defensive imitation. Marginal cost c.£10-20k. **DCT loses the newsletter format as a unique offering.**
- **Month 4-6:** Both newsletters compete for TD-postcode Facebook acquisition inventory. CPS rises £6 → £10-12; Phase 0 CAC ceiling breached.
- **Month 6-9 (DCT launches paid product):** Newsquest with 6 months prep executes deeper response: Border Telegraph at £2.99 + free Border Telegraph daily newsletter (defensive cadence match) + targeted retargeting of captured DCT newsletter audience.

**Strategy impact (NEW):** Newsletter-first sequence *invites* a longer Newsquest response window and gives Newsquest the asymmetric advantage of imitating the cheaper play before DCT can launch the more expensive play. Pass 1 identified Newsquest's price drop as the dominant response; Pass 2 identifies *Newsquest free newsletter mirror* as a new and arguably more damaging response, available only because the two-stage sequence creates the time-window.

### Constraint Inversions (Pass 2 summary)

8 assumptions inverted (updated from Pass 1's 8). Survivorship:

- **YES (1):** TRADITIONAL architecture is category-structural; no meaningful inversion.
- **WITH_MODIFICATION (5 — up from 3):** Web Pack ARPU (revise scenarios; ePaper upsell becomes ARPU lever); multi-locale platform (extend Phase 0 budget OR drop app/web integration); Phase 0 newsletter as paid-demand signal (must add paid-trial test cell — G-15); brand architecture deferrable (only with brand-neutral Phase 0 — G-14, contradicts cost-minimisation logic); editorial cost / two-stage recruitment lag (Phase 1 recruitment must commence at Phase 0 week 4 regardless of exit-gate uncertainty).
- **NO (2):** Borders converges to newsletter-only outcome (paid-product hypothesis collapses; minimum viable presence does not justify £20-30k Phase 0 + £60-120k Phase 1 spend); newsletter-list-to-paid 3-5% (Phase 1 misses paid-subs floor; KILL not formally triggered but base case fails).
- Pessimistic Sec 3 still kills (unchanged from Pass 1; carried).

The newsletter-list-to-paid conversion assumption (linchpin of the two-stage logic) is T3 — completely unvalidated. **This is the central uncertainty CHALLENGE introduced and did not resolve.**

### Evidence Concentration (Pass 2)

Three CONCENTRATED sources now (was 2):

- **WAN-IFRA Nov 2023** (carried) — Sec 1, 3, 4. Mitigation unchanged.
- **Press Gazette / Newsquest 21% court / 20% sport** (carried) — Sec 1, 2, 4, 6. Mitigation unchanged.
- **`research/press-and-journal/pj-product-briefing-2026-05-05.md` (NEW)** — cited across all 7 hypothesis/proposal sections. Strategist's framing ("logically equivalent to observing DCT's live product directly") is **accepted for the screenshot-level observations** but **rejected for the inferential leap from "DCT does newsletters in Moray" to "newsletters are a validated path to paid in Borders"**. The latter is an inference, not an observation, and it carries the entire two-stage MVP logic. Highest-priority concentration risk this pass. Required mitigation: triangulate via (a) DCT internal documentation on Moray/Inverness/Oban configuration rationale, (b) **DCT internal data on whether those newsletters have produced any paid follow-on** — the Phase 0 → Phase 1 conversion question is testable inside DCT's own portfolio history, (c) governor input on whether observed pattern is strategic intent or path-dependency.

### Pass 1 evidence-quality issue (flagged retroactively)

The v1 register included print production/distribution as a unit cost within the digital subscription model. T1 evidence in CHALLENGE pass establishes that the reference product (P&J) sells print separately. **Pass 1 destruction did not catch this error** — the constraint-inversion table did not interrogate the bundle assumption. Logged as a destruction-quality lesson: include a "does the model match the reference product" check when one exists, not only first-principles inversions.

### Kill Signal Audit (Pass 2 summary)

| Hypothesis / proposal                                          | Status                                                                                                                                                                       |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Problem                                                        | G-01 still binds; CHALLENGE extended kill condition (newsletter-as-resolution branch) untested                                                                               |
| Segment                                                        | Borders is in DCT revealed-preference borderline band (95k Moray ↔ 260k+ NE Scotland); G-04 now load-bearing on form-of-product, not just segment-size; deadline 2026-05-15 |
| Unit Economics                                                 | Cannot pre-launch audit                                                                                                                                                      |
| Value Proposition                                              | G-06 binds; landing-page test now extended to 3-cell configuration test                                                                                                      |
| Solution Design (Phase 0)                                      | Kill condition added in CHALLENGE — legible (signups <800 OR CPS >£12 OR open rate <25% OR ≤4 towns)                                                                      |
| Solution Design (Stage 2 paid MVP)                             | **STILL MISSING** — Section 6 inherits Sec 3 + Sec 7 kills but no design-level kill (carried from Pass 1)                                                             |
| GTM Phase 0                                                    | Newly added; OK                                                                                                                                                              |
| GTM Phase 1                                                    | Strengthened (newsletter-list-to-paid <3% added); OK                                                                                                                         |
| **Newsletter-cannibalisation kill**                      | **NEW: no threshold stated** despite Strategist explicitly flagging the failure mode                                                                                   |
| **Newsletter-as-Newsquest-bait kill** (red-team finding) | **NEW: not in register** — needs an "abandon Phase 0 if Newsquest mirrors within X weeks" decision rule                                                               |

Three kill conditions now missing or under-specified.

### Contradictions Detected (Pass 2)

- **C-1 (LOW, carried):** Sections 5, 6, 7 still lack Desired State / Current State blocks. Strategist did NOT address in CHALLENGE pass. Non-blocking.
- **C-2 (MEDIUM, carried):** Section 3 base vs pessimistic — routed via E-02. Non-blocking.
- **C-3 (MEDIUM, NEW):** Section 5 lists "Brand-architecture decision made before Phase 1" as required architecture condition. Section 7 has Phase 0 commencing months -3 to 0, BEFORE the brand decision. If Phase 0 hosts inside an existing brand, the brand decision is *de facto* made by Phase 0 execution; the architecture condition is therefore violated by the GTM plan. **Phase 0 launch BLOCKED until C-3 resolves** via either (i) E-03 governor decision or (ii) Strategist clarification (Esc-5) that Section 5 condition binds at Phase 1 not Phase 0 AND adds brand-neutral Phase 0 design.
- **C-4 (LOW, NEW):** Section 6 feature map still lists "Print bundle" as a downgraded-but-present feature; T1 correction removed bundle from the unit. Cosmetic; Strategist remove row in next pass. Non-blocking.

---

### Pass 1 Destruction Log (retained for traceability — 2026-04-24)

**Pre-mortem (Pass 1):** 12-month failure at month 9 — Phase 1 acquisition 600-800 paying subs, blended CAC £36-£42. Mechanism: direct mail saturates faster than modelled because 50+/broadband slice is c.18-22k HH not 25-35k; Facebook CAC drifts to £32-£38; Newsquest price drop blunts trial-to-paid to 9-10%; Phase 1 exit gate fails on 3 of 4 conditions; sunk cost £90-120k acquisition + 9 mo editorial. Dominant cause: Sec 2 segment-density and Sec 5 channel-saturation are not independent in a small geography but the model treats them as such.

**Red-team (Pass 1):** Newsquest 90-day response — drop Border Telegraph price to £2.99 (week 0-2); move 1-2 reporters and relabel digital edition "daily" (month 1-2); buy out direct-mail/print-insert inventory in TD1-TD15 with 6-mo exclusivity (month 2-3). Impact: Section 5 loses print-insert channel; Section 4 cadence differentiator blunted; Section 3 ARPU clause weakens.

**Constraint inversions (Pass 1):** 8 inverted. YES (1): TRADITIONAL architecture. WITH_MODIFICATION (3): Pugpig marginal-cost; Phase 1 channel attribution; editorial cost. NO (4): standalone overhead; segment 10-15k HH; WTP barely above weekly; 3-5% segment WTP at £4.99-£5.99.

**Evidence concentration (Pass 1):** Two CONCENTRATED — WAN-IFRA, Press Gazette/Newsquest. (Pass 2 added pj-product-briefing as third.)

**Kill signal audit (Pass 1):** Sec 6 kill condition flagged as missing (carried unresolved into Pass 2); G-04 NRS pull flagged as ignored signal.

---

## 9. Gap Ledger

*Executed and owned by Gap Definer. Strategist does not write to this section.*

**Pass:** 2 (post Strategist CHALLENGE, 2026-05-05)
**Full detail:** `strategy/gap-analysis.md` §3, §4
**Action queue:** `execution/queue/2026-05-05-gap-definer-actions.md`
**Pass 1 ledger summary retained at the bottom of this section for traceability.**

### Top-3 Active Gaps (Pass 2 — execution order by deadline urgency within tied priority)

| Rank | Gap ID | Target            | Dimension           | Final Priority | Action Type                                                                        | Status                                       | Δ from Pass 1                             |
| ---- | ------ | ----------------- | ------------------- | -------------: | ---------------------------------------------------------------------------------- | -------------------------------------------- | ------------------------------------------ |
| 1    | G-04   | SEGMENT           | SEGMENT_CLARITY     |             21 | RESEARCH (NRS / Ofcom / Project Gigabit pull)                                      | OPEN —**URGENT, deadline 2026-05-15** | Score 18 → 21 (TP rose; deadline 10 days) |
| 1=   | G-01   | PROBLEM           | PAIN_CLARITY        |             21 | INTERVIEW (extended script with newsletter-pivot probe)                            | OPEN — gated on Esc-3                       | Score unchanged; script extended           |
| 1=   | G-06   | VALUE_PROPOSITION | VALUE_PROP_VALIDITY |             21 | EXPERIMENT (3-cell landing-page test: free newsletter / paid daily / paid section) | OPEN — gated on Esc-3                       | Score unchanged; test design expanded      |

### Governor Escalations (tracked separately — cannot be progressed by system action)

| Gap ID          | Target                                                                              | Final Priority |                    Status | Awaiting                                                                       | Δ from Pass 1                                                                                        |
| --------------- | ----------------------------------------------------------------------------------- | -------------- | ------------------------: | ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| G-02            | UNIT_ECONOMICS (separate-brand platform cost)                                       | 21             |                 ESCALATED | Governor response by**2026-05-08 (3 days)**                              | Score 18 → 21; scope narrowed (locale-within-existing-brand path partially resolved by T1 evidence)  |
| G-03            | UNIT_ECONOMICS (overhead allocation)                                                | 21             |                 ESCALATED | Governor response by**2026-05-08 (3 days)**                              | Score 18 → 21                                                                                        |
| **G-16**  | GROWTH_ARCH / SOLUTION / GTM (brand architecture E-03)                              | 21             | **ESCALATED (NEW)** | Governor response by ~2026-06-15                                               | NEW from Strategist this pass                                                                         |
| Esc-3           | Phase 0 validation budget (£10-17k revised; or £12-21k with G-15 paid-trial cell) | —             |                      OPEN | Governor authorisation                                                         | Carried;**now URGENT in effect** (G-01 + G-06 cannot execute without it); cost envelope updated |
| Esc-4           | Decision-deadline confirmation                                                      | —             |                      OPEN | Governor confirmation                                                          | Carried                                                                                               |
| **Esc-5** | C-3 resolution path (back-pass to Strategist, NOT governor)                         | —             |      **OPEN (NEW)** | Strategist clarification: does Section 5 condition bind at Phase 0 or Phase 1? | NEW this pass                                                                                         |

### Deferred Gaps (re-evaluate next pass)

G-05 (behavioural CAC), G-07 (print quotes — importance reduced post-CHALLENGE because print is now an adjacent product), G-08 (churn), G-09 (per-town CAC), G-10 (coverage audit), G-11 (DCT brand transfer — importance contingent on E-03 outcome), G-12 (Sections 5-7 missing Desired States + Section 6 missing paid-MVP kill — Strategist did NOT address in CHALLENGE; carried), **G-13 (NEW: newsletter cannibalisation kill threshold), G-14 (NEW: Phase 0 brand path-dependency), G-15 (NEW: Phase 0 paid-trial test cell)**.

### Decision Rule Outcomes (Pass 2)

- **Priority Rule:** Three-way tie at Final Priority 21 across G-04, G-01, G-06. Effective execution order by deadline urgency: G-04 → G-01 → G-06.
- **Execution Rule:** 3 valid tasks (NRS pull, interviews, 3-cell landing-page test); rejected tasks include Phase 0 newsletter LAUNCH (NEW rejection — triggers C-3 + creates G-14 path-dependency + sequencing-contaminates G-01).
- **Evidence Promotion Rule:** All four hypotheses remain RESEARCHED. Confirmed Strategist did not improperly promote in CHALLENGE; T1 reference-product observations correctly held confidence (T1 about *the reference product* does not establish T1 about *the Borders unit*).
- **Kill Rule:** No hypothesis BROKEN this pass.
- **Deadline Rule:** No EXCEEDED deadline. Two URGENT (G-02, G-03 within 3 days). One at risk if not actioned (G-04 within 10 days).
- **Contradiction Rule:** **C-3 NEW (MEDIUM) — Phase 0 launch BLOCKED until resolved.** Resolution paths: E-03 governor decision OR Esc-5 Strategist clarification. C-1, C-2 carried; C-4 NEW (LOW, cosmetic).
- **Architecture Validity Rule:** Phase 1 launch BLOCKED (carried). **Phase 0 launch BLOCKED (NEW)** pending C-3 resolution.
- **Solution Contamination Rule:** No active contamination. **NEW sequencing constraint:** G-01 interviews must complete BEFORE Phase 0 newsletter launches.
- **Readiness Gate Rule:** sell_ready = false (worsened vs Pass 1 — fails on both HIGH-blast blocker AND architecture contradiction now). scale_ready = false.
- **Focus Rule:** 3 active gaps (within cap); 9 deferred (was 7); 6 escalations/clarifications tracked separately (was 4).

### Forbidden Actions (downstream — Pass 2 update)

- **Phase 0 Newsletter MVP launch — BLOCKED until C-3 resolves** (NEW)
- Phase 1 launch in any channel (carried)
- Editorial recruitment (carried)
- Public messaging / pre-announcement — strengthened by Pass 2 red-team finding (Newsquest's optimal counter to a free newsletter is a defensive mirror; leakage shortens DCT's solo window from 6+ weeks to <4)
- Hosting Phase 0 inside an existing P&J/Courier brand without explicit E-03 (B) or (C-with-host-confirmed) governor decision — would violate C-3
- Carrier negotiations — DEFERRED (G-07)
- Solution-led validation — FORBIDDEN

---

### Pass 1 Gap Ledger (retained for traceability — 2026-04-24)

Top 3 active gaps in Pass 1: G-01 (PROBLEM, score 21), G-06 (VALUE_PROPOSITION, score 21), G-04 (SEGMENT, score 18). Governor escalations: G-02 (platform cost), G-03 (overhead), Esc-3 (Phase 0 budget), Esc-4 (deadlines). Decision: CONDITIONAL_GO; sell_ready=false; scale_ready=false. Action queue at execution/queue/2026-04-24-gap-definer-actions.md.
