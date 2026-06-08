---
type: handoff
scope: cleantech-credentials (Track C of post-trawa rebalance)
created: 2026-05-23
last_updated: 2026-05-31
status: launch-ready v3 — Gate A resolved (service-funds-product ladder); to be executed in a SEPARATE build repo + Claude session
launch_target: new dedicated build repo (not career2026). This file travels with it. See "Source material to bring" + "Strategic frame" below.
audience: build agent (general-purpose with code-execution) + Gaylord for review
gitignored: no (cleantech/credentials/ is committed; supplement reference docs in context/)
supplements:
  - context/datasets-energy-public.md
  - context/regional-grid-data-de.md
  - context/viral-energy-tools.md
  - context/nuclear-vs-renewables-corpus.md
  - context/homeassistant-energy-ecosystem.md
  - context/energy-domain.md
---

# Handoff — cleantech credentials (Track C) — v2

For a fresh Claude Code session tasked with building small public GitHub projects that establish the user's expert positioning in DACH cleantech. Each project is a single-purpose tool with regulatory or market grounding, anchored on real intel + real public data, designed to be shippable in 2-7 days and accompanied by a LinkedIn post + shareable OG card.

**v2 changes from v1 (2026-05-23):** Re-ranked 8 projects (added 3 new from Gaylord's brainstorm: regional dashboard, nuclear/gas mythbuster, HA plugin). Each brief now ships with concrete dataset URLs + demo flow + OG-card spec + viral hook. Underlying research moved to `context/` supplements (5 reference docs, ~3500 lines total) to keep this file scannable.

Output: code + READMEs in public GitHub repos, NOT in this monorepo. Each project gets its own repo.

---

## Strategic frame — Gate A verdict (2026-05-31): the service-funds-product ladder

Decision Gate A (`context/sequencing-2026-q2.md`) is **resolved**. Venture research (`cleantech/ventures/venture-research-output.md`) surfaced three solo-operator service/SaaS shapes, not a world-changing product. Reconciliation with the user's founder ambition (real venture, co-founders, investors, Founder-CEO identity) = **climb, don't jump:**

```
Rung 3  PRODUCT VENTURE   ← investable product, co-founders, capital, Founder-CEO brand
          ▲
Rung 2  SaaS              ← compliance copilot (venture #2), funded by Rung 1 cashflow
          ▲
Rung 1  SERVICE CASHFLOW  ← vendor-enablement (venture #1), €10-45k/mo, via S2T GmbH
          ▲
Rung 0  CREDENTIALS       ← THIS handoff. The projects below. Ship now.
```

You don't research your way to the investable product — you earn it from Rung 1/2 customer contact. The projects in this handoff are **Rung 0**.

**What the ladder changes for this handoff:**

1. **Projects are venture rungs first, app-gates second.** Each project keeps its dual purpose, but priority order is now: (a) v0 prototype of a venture thesis, (b) inbound / lead-magnet engine, (c) credential that *optionally* unlocks a gridX / 1KOMMA5° application. Job apps are fallback optionality — ship the project regardless; submit an application only if the safety-net is wanted. A skipped application does not waste the credential.

2. **Re-rank by venture-leverage + time-decay, not app-gating value.** `mispel-deadline-tracker` (#2) is simultaneously venture #2's 90-day validation lead-magnet AND time-bombed to the 30.06.2026 MiSpeL deadline (≈30 days out as of 2026-05-31). Peak relevance is now; decays hard after the deadline. Ship #1 first **only** as the 2-day pipeline-builder (stand up Vercel + OG-card + MaStR plumbing on the lowest-skill-bar project), then ship #2 immediately while the deadline is hot. Do not let #2 slip past late June.

3. **Service wedge sells under S2T Engineering GmbH / personal name.** The venture brand crystallizes at Rung 2-3, not now. README author block + reach-out hooks stay as specced — they ARE the Rung 1 lead-gen surface.

4. **Outputs feed back into `career2026`.** Each shipped project + its inbound feeds the CV (`cv/pivot.md`), branding (`branding/channels/linkedin/`), and any live interview process. The career repo holds a pointer note (`context/handoff.md`) expecting these updates. Report shipped projects + metrics back so that repo can be updated.

## Source material to bring into the build repo

This handoff was written inside the `career2026` repo and references files there by path. The build repo is **separate** — those paths will not resolve. Before building, either copy these into the build repo or keep a `career2026` checkout alongside and read across:

| Source (path in career2026) | Needed for |
|---|---|
| `applications/2026-05_trawa-head-of-product/research/regulatory-fact-check.md` | §19 / §118 / MiSpeL verified numbers — anchors #1, #2, #8 |
| `applications/2026-05_trawa-head-of-product/research/competitors.md` | 16 DACH vendors — positioning, anti-clone check |
| `applications/2026-05_trawa-head-of-product/webinar-2026-05-21/` (transcript + slides) | pricing / waterfall economics — #8 |
| `applications/2026-05_trawa-head-of-product/research/reddit-au-vs-de-storage.md` | spread-compression — #6 |
| `context/energy-domain.md` | domain digest — #1, #2 |
| `context/datasets-energy-public.md` + `context/regional-grid-data-de.md` | data catalog + pipeline — #3 |
| `context/viral-energy-tools.md` | OG-card / viral mechanics — all web tools |
| `context/nuclear-vs-renewables-corpus.md` | full data corpus — #4 |
| `context/homeassistant-energy-ecosystem.md` | HACS ecosystem + prior-art forks — #5 |
| `cleantech/ventures/venture-research-output.md` | which venture thesis each project prototypes (Rung 1/2 map) |

## Priority + timing (re-ranked per `sequencing-2026-q2.md`)

Re-ranking applies (viral-leverage × time-to-ship × gating-value):

- **Project #1 (`stromnev-19-calculator`)** still gates the **gridX** application (Tier 2, target Week 3). Lowest-skill-bar (2d) = momentum-builder.
- **Project #2 (`mispel-deadline-tracker`)** still gates the **1KOMMA5°** application (Tier 2, target Week 4-5). Time-bombed peak relevance until 30.06.2026.
- **Project #3 (`strompuls-de`) is new and is the highest viral-leverage gap in DACH** per the viral-tools research. Builds shared infrastructure (PLZ→VNB mapping, MaStR pipeline, SMARD plumbing) that later projects reuse. 5-7d build.
- **Project #4 (`energiewende-mythbuster`) is new and politically time-sensitive** — the Söder/Merz/Reiche nuclear+gas debate is live in May 2026. Reuses live-grid plumbing from #3.
- **Project #5 (`ha-bess-investment-case`) is new** — fork of `hif2k1/battery_sim` with historical SMARD replay + BDEW synthetic load profiles + LP dispatch + DACH regs. Distribution via HACS = long-tail audience.
- **Projects #6-#8** are Tier-3 unlocks (Spread-compression visualizer, VPP mini-sim, BESS amortisation sim) deferred to post-Week 6 master review.

Each project carries dual purpose: (a) credibility-signal that gates the next application, (b) v0 prototype of a Track B venture-thesis if the corresponding research-question validates.

## Why this handoff exists (v2 update)

The trawa rejection (2026-05-22) confirmed: **domain-credibility must be built before the application, not during.** Gaylord has dense cleantech intel (~6 weeks of focused study) but no public artefacts proving it.

**New v2 insight (from viral-tools research):** static reports won't generate inbound. The pattern that produces inbound + interview-invites + venture-thesis-validation is **interactive demos with server-rendered OG cards + open-data licence + named-author methodology page**. Solo developer references (Kate Morley's `grid.iamkate.com` = 21.9M visits/yr; gridstatus.io = $8M Series A) show the upper-bound for what one operator can ship.

**New v2 priority:** ship at least one tool with genuine viral mechanics (#3 Strompuls.de OR #4 Mythbuster), not just compliance/regulatory utilities. Compliance utilities give credibility for hire-track. Viral mechanics give inbound for venture-track.

## Cross-cutting design principles (apply to every project)

1. **Server-rendered OG card per URL.** Next.js `/api/og` route generates Twitter/LinkedIn card PNG with CURRENT data on share. Single most under-used leverage. See `context/viral-energy-tools.md §10`.
2. **Stable querystring state.** `/?zone=DE&date=today&scenario=fast` — every view reproducible by URL.
3. **Embeddable iframe.** "Copy embed" button outputs one-line `<iframe>`. Journalists drop into CMS in 30 seconds. OWID Grapher is the bar.
4. **CC BY 4.0 data licence.** Prominently displayed. Methodology page with named author + named sources.
5. **Mobile-first.** WCAG-AA. Loading < 1s on 3G. No splash screens, no cookie banner blocking the chart.
6. **Forecast vs actual split.** Where applicable. Makes users come back tomorrow.
7. **Postcode / Bundesland filter.** Users see *their* number. Personalisation × shareability = compounding.
8. **Named author block.** "Built by Gaylord Zach — gaylordzach@gmail.com + LinkedIn URL." Personality drives inbound.
9. **"What this is NOT" section.** Explicit anti-promise. Builds trust + protects against fact-check overreach.
10. **Open-source from day 1.** MIT or AGPL. Submit to `awesome-home-assistant` / openmod-initiative list / etc.

## Default tech stack (per viral-tools research)

```
Front:     Next.js 15 + React 19 + Tailwind + shadcn/ui
Charts:    Apache ECharts (skill already in trawa deck) — fallback Observable Plot for storytelling
Maps:      MapLibre GL + Protomaps PMTiles (no Mapbox bill)
Data:      Energy-Charts API + SMARD JSON + open-MaStR (Python pkg + Zenodo CSV)
Backend:   Python where needed (regulatory math, MaStR ingestion); Node/TS for web/OG
Hosting:   Vercel (free tier; OG-image route handler; Cloudflare alt for edge)
Domain:    .de TLD on memorable noun (e.g., strompuls.de, energiewende-fakten.de, bess-rechner.de)
i18n:      DE primary, EN secondary (energy Twitter is English-speaking)
Analytics: Plausible (DSGVO-friendly)
Newsletter: Buttondown or Beehiiv (daily/weekly chart as hero)
License:   MIT (code) + CC BY 4.0 (data) by default
```

Streamlit is fine fallback for tools without viral ambition (Project #1, #2, #5 v0). Switch to Next.js when OG-card matters.

## Top public data sources (full catalog in `context/datasets-energy-public.md`)

Cited by project briefs below:

- **Energy-Charts.info API** (Fraunhofer ISE) — `api.energy-charts.info` — no token, CC BY 4.0, fastest path to live DACH demo
- **SMARD JSON** — `smard.de/app/chart_data/...` — 15-min DA prices back to 2015, no token
- **MaStR via open-mastr** — every PV/wind/BESS in DE by PLZ; Python pkg + Zenodo CSV (DOI 14783581)
- **PVGIS REST** — `re.jrc.ec.europa.eu/api/v5_3/` — per-coordinate PV yield, no key
- **BDEW Standardlastprofile** — H0/G0–G6/L0–L2 + **2025: H25/P25/S25 (PV+storage households)** — required for any DE retail tariff sim
- **Corrently.io GreenIndex** — `api.corrently.io/v2.0/gsi/marketdata?zip=10115` — only free per-PLZ CO2 forecast for DE
- **aWATTar API** — `api.awattar.de/v1/marketdata` — free hourly DA prices, no key
- **Electricity Maps free tier** — single DE zone, 50 req/hr — polished branding
- **Open-Meteo** — 16-day forecast + ERA5 1940→ — free non-commercial
- **DWD CDC** — `opendata.dwd.de/climate_environment/CDC/` — ~400 stations + 1km raster
- **PLZ polygons** — `github.com/yetzt/postleitzahlen` — basemap for any DE energy demo

## Constraints (apply to every project)

1. **Small + shippable.** 2-7 days per project. If scope creeps, ship thinner v0 + iterate.
2. **Real-data-anchored.** Each project uses real public data (see catalog above). No synthetic-only demos.
3. **Public from day 1.** GitHub public repo. README with domain-context + anti-promise + author block.
4. **Honest about scope.** "What this is NOT" section in every README.
5. **Companion LinkedIn post + OG card per project.** Drafted, scheduled, published when project goes live.
6. **Domain-honesty.** README frames projects as "built by domain-curious operator with deep adjacent product+engineering experience", NOT "10-year energy veteran". Over-claiming damages credibility.
7. **DE-language READMEs for projects targeting DE Mittelstand** (#1, #2, #5). EN for broader audience (#3, #4, #6).

---

## Project specs

### Project #1 — `stromnev-19-calculator`

**Status:** queued, first build. **Gates gridX Tier-2 application.**

**Goal:** Help a Mittelstand industrial operator estimate their potential §19 Abs. 2 StromNEV "atypische Netznutzung" Netzentgeltrabatt. Input: load profile CSV + Mindestlastverschiebung-capability (kW). Output: estimated rabatt (% + €/year) + Antragstext snippet for filing with the network operator (VNB).

**Regulatory anchor:** §19 Abs. 2 Satz 1 StromNEV + BK4-13-739 (BNetzA decision on atypische Netznutzung methodology). Verified in `applications/2026-05_trawa-head-of-product/research/regulatory-fact-check.md`.

**Datasets (free, no auth):**
- SMARD JSON for DE-LU DA prices history (15-min back to 2015) — for context display
- BDEW Standardlastprofile (H0, G1–G6) — for users without their own load profile
- BNetzA BK4-13-739 PDF (Antragstext template extract)
- Hochlastzeitfenster (HLZF) per top-30 VNBs — manual scrape, store as static JSON. Aggregating these = byproduct contribution to community (gap flagged in regional-grid-data-de.md §7)
- Optional: open-MaStR for "show me PV/BESS in your PLZ that already file §19"

**Scope (v0, 2 days):**
- Streamlit single-page app
- Upload load-profile CSV (15-min interval, 1 year) OR pick BDEW profile + annual kWh
- Input field: customer's Mindestlastverschiebung capability (default 100 kW, legal min)
- Input: VNB selection (top-30 dropdown) → pull HLZF dates from static JSON
- Calculate:
  - Identify HLZF windows for the VNB
  - Compute customer's relative consumption during HLZF vs base hours
  - Estimate Atypizitäts-Faktor
  - Output rabatt-band (typical 20-80% per BK4-13-739; legal max 80% per §19 Abs. 2 Satz 5)
- Generate Antragstext snippet (German legal-style boilerplate) for VNB filing
- README in DE + EN

**Demo flow:**
1. User lands on `/` — header "§19 StromNEV Rabatt-Rechner" + 3-step tutorial
2. Step 1: Upload Lastgang (CSV preview shown) OR "Demo mit Standardprofil"
3. Step 2: Pick VNB from dropdown → HLZF dates auto-display
4. Step 3: Set Mindestlastverschiebung-kW slider
5. Output: rabatt-€/year + rabatt-% with confidence band; downloadable Antragstext PDF
6. CTA: "Brauchst Du den Rechner für ein konkretes Werk? Schreib mir."

**OG card:** "Wir sparen €X/Jahr durch §19 StromNEV. Berechne deinen Rabatt." + estimated savings number + author block.

**Anti-promise:** Not a substitute for VNB-Abstimmung or Steuerberater advice. Output is a *first estimate*; actual rabatt depends on VNB-specific negotiation.

**Build estimate:** 2 days. Lowest-skill-bar of the 8 projects.

**Companion LinkedIn post:** "Why we built a §19 StromNEV calculator in 200 lines of Python." Track: AI/tooling 30%. Anchor: built in <8h with Claude Code; sharing because Mittelstand operators ask this question and consultants charge €5-10k for first-pass answers.

**Reach-out hook in README:** "Built this in a weekend because every Mittelstand operator I talk to wants to know if §19 applies. Reach out if you'd like me to walk through your specific case."

**Cross-link to Track B:** v0 of Q2 (Regulatory-as-a-Service) thesis. If validated, becomes paid product.

---

### Project #2 — `mispel-deadline-tracker`

**Status:** queued. **Gates 1KOMMA5° Tier-2 application. Time-bombed — peak relevance until 30.06.2026.**

**Goal:** Streamlit app helping storage operators (BESS owners + aggregators) track MiSpeL (Mindestlast-Speicher-Lieferung) submission status against 30.06.2026 deadline. Includes plain-language explainer, submission checklist, countdown timer, document-template generators.

**Regulatory anchor:** BNetzA Beschlusskammer 6 procedure BK6-25-038 (MiSpeL-Verfahren). Verified in regulatory-fact-check.md. Konsultationsentwurf 18.09.2025, Stellungnahmen-Frist 24.10.2025 abgeschlossen, gesetzliche Frist für finale Festlegung **30.06.2026** per §85d EEG 2023; Inkrafttreten spätestens 01.07.2026.

**Datasets:**
- BNetzA BK6-25-038 PDF guidance documents + Excel templates
- §118 Abs. 6 EnWG text (gesetze-im-internet.de) — for cross-context
- PwC Stellungnahme (blogs.pwc.de "Festlegungsentwürfe MiSpeL")
- BBH-Blog + Taylor Wessing + gridX explainer pages — for plain-language source-text
- Optional: open-MaStR Stromspeicher table — show "MiSpeL applies to ~X BESS in DE"

**Scope (v0, 3 days):**
- Streamlit multi-page
- Page 1: plain-language explainer ("What is MiSpeL? Who must file? By when?")
- Page 2: interactive submission checklist (BESS site details, operator info, data-format requirements per BNetzA template)
- Page 3: deadline-countdown (live timer to 2026-06-30 23:59 MEZ) + "what happens if you miss" explainer
- Page 4: document-template generator — fill form → output prefilled BNetzA-submission XML/PDF template
- Parse BNetzA BK6-25-038 published guidance documents (PDF + Excel templates)
- README in DE (target audience: DE Mittelstand operators)

**Demo flow:**
1. Landing page hero: countdown clock to 2026-06-30
2. "Bin ich betroffen?" — 3-question quiz → green/yellow/red verdict
3. Checklist — tick boxes per requirement; progress bar
4. Template generator — fill form → download prefilled XML/PDF
5. CTA: "Brauchst Du eine 30-Min-Beratung? Free, bis 30.06.2026."

**OG card:** "X Tage bis MiSpeL-Frist. Bist Du bereit?" + countdown number + author block.

**Anti-promise:** Not official; final submissions go through BNetzA's own portal. Tool is a preparation aid.

**Build estimate:** 3 days. Document-parsing + template-generation = highest-effort.

**Companion LinkedIn post:** "MiSpeL in plain English — und ein kostenloser Deadline-Tracker." Track: bridge-arc 60% (regulatory-translation as user-facing skill). Anchor: 30.06.2026 deadline bearing down; many BESS-operators unaware.

**Reach-out hook:** "If MiSpeL is a black box for you, ping me — happy to walk through your filing in 30 minutes for free."

**Cross-link to Track B:** v0 of Q2 thesis. If positive inbound, becomes prototype for paid Regulatory-as-a-Service product.

---

### Project #3 — `strompuls-de` (regional power dashboard) — NEW

**Status:** queued. **Highest viral-leverage gap in DACH** per viral-tools research. Foundational infra (PLZ→VNB mapping, MaStR ingestion, SMARD plumbing) reusable for #5, #7, #8.

**Goal:** Postcode-input interactive regional power dashboard. User enters PLZ → sees local energy mix, network charges, prices, scenarios (add PV / add BESS / 2030 outlook), grid stress proxy, CO2 intensity. Closes with recommendations + links to credible research.

**Why this matters now:** No DACH equivalent to UK `carbonintensity.org.uk` (postcode CO2) or `grid.iamkate.com` (21.9M visits/yr solo build). DACH energy-data audience is starved for this object (viral-tools research §11). Smart-meter rollout ~10% Q1 2026 — most consumers want a *pre-rollout* glimpse of "what's happening on my local grid".

**Datasets (all free, no auth where flagged):**
- **open-MaStR (Zenodo CSV)** — all PV/wind/BESS/biomass per PLZ
- **PLZ polygons** — `github.com/yetzt/postleitzahlen` (GeoJSON)
- **PLZ centroids** — `github.com/WZBSocialScienceCenter/plz_geocoord` (CSV)
- **SMARD JSON** — national mix + DA prices
- **Energy-Charts API** — live + 4-TSO-zone generation
- **BDEW Strompreisanalyse** — Bundesland price decomposition (quarterly PDF)
- **Konzessionsabgaben (KAV Verordnung)** — derive from Gemeinde size class
- **PVGIS API** — per-coordinate PV yield (no key)
- **Open-Meteo** — local forecast (free non-commercial)
- **Corrently.io GreenIndex** — only free per-PLZ CO2 forecast for DE
- **Electricity Maps free tier** — DE zone CO2 live
- **VNBdigital.de** — scrape PLZ→VNB (rate-limit respect) OR derive from MaStR (~95% accurate by `(PLZ, Netzbetreiber)` mode)
- **HLZF aggregated JSON** — store result of Project #1 scrape
- **AEE Föderale Energiewende** — pre-aggregated Bundesland datasets

**Scope (v0, 5-7 days):**
- Next.js + Tailwind + ECharts + MapLibre
- Pipeline (regional-grid-data-de.md §4):
  1. PLZ input → geocode (centroid + polygon + Bundesland)
  2. PLZ → VNB mapping (MaStR-derived, fallback VNBdigital scrape)
  3. Netzentgelt for this VNB (top-30 scraped; rest → Strom-Report Bundesland-avg)
  4. Other price components (KA, Stromsteuer 2.05 ct/kWh, Umlagen, MwSt 19%, Beschaffung from BDEW avg or aWATTar live)
  5. Local energy mix (open-MaStR filtered by PLZ; capacity stack)
  6. Grid stress proxy (TSO redispatch quarterly; HLZF dates if VNB known)
  7. CO2 intensity (Corrently.io PLZ + Electricity Maps DE)
  8. Weather/irradiation (PVGIS + Open-Meteo)
  9. Scenarios ("add 10 kWp PV", "add 5 kWh BESS", "2030 outlook")
- Persistent CC0 byproduct: **public PLZ→VNB CSV** (highest-leverage free data contribution in DACH per regional-grid-data-de.md §7)
- README in DE + EN

**Demo flow:**
1. Hero: massive PLZ input field. Below: live DE national counter (renewable % right now, fed by Energy-Charts)
2. Submit PLZ → smooth transition to dashboard
3. Left panel: live numbers for THIS PLZ (CO2 g/kWh, current price, renewable %, your VNB)
4. Center: local map (PLZ polygon + MaStR assets pins)
5. Right panel: "Heute / Morgen / Diese Woche" forecast
6. Bottom: scenario sliders — "Was wenn 10 kWp PV?" / "Was wenn 5 kWh BESS?" / "2030"
7. Footer: methodology page link, embed-iframe button, "Compare PLZ" CTA

**OG card:** "Dein PLZ {X} jetzt: {Y} gCO2/kWh • {Z} % EE • {V} ct/kWh" + small map thumbnail of PLZ. Server-rendered with current data on share.

**Embed iframe:** `<iframe src="strompuls.de/embed/{PLZ}">` — journalists embed any PLZ result directly.

**Anti-promise:** Below Bundesland, generation data is **modelled not measured**. Per-VNB Netzentgelte for ~820 VNBs is Bundesland-average proxy (top-30 scraped, rest derived). Scenarios are illustrative, not investment-grade.

**Build estimate:** 5-7 days. Most complex of first 4 projects, but yields foundation infra reused by 3 later projects + a CC0 dataset byproduct.

**Companion LinkedIn post:** "Strompuls.de — dein lokales Stromnetz, in Echtzeit." Track: bridge-arc 60% + AI/tooling 30%. Anchor: "Why DE doesn't have a `carbonintensity.org.uk` equivalent — and what I built in a week with Claude Code." Cross-post to /r/Energiewende + Hacker News (Show HN) + Mastodon (mastodon.green) + Bluesky.

**Reach-out hook:** "If you're a Stadtwerk, Energieagentur, or local politician and want this for your municipality, ping me — happy to customize."

**Cross-link to other projects:**
- Builds PLZ→VNB mapping CSV → Project #5 (HA plugin) uses it for Netzentgelt-by-PLZ
- MaStR ingestion + SMARD plumbing → reused by #7, #8
- Energy-Charts + Electricity Maps plumbing → reused by #4

**Cross-link to Track B:** Tests whether viral mechanics actually convert to inbound. If 10k+ unique visits in first month + 50+ DMs → confirms thesis that public data + viral UX = lead-gen surface for cleantech vendors.

---

### Project #4 — `energiewende-mythbuster` (nuclear + gas claims vs primary-source data) — NEW

**Status:** queued. **Politically time-sensitive** — Söder/Merz/Reiche nuclear+gas debate is live May 2026. 6-month decay window.

**Goal:** Interactive web tool that overlays politician claims (Söder nuclear restart, Merz Atomausstieg, Reiche "Gas ohne Alternative") with primary-source data from Fraunhofer ISE, Lazard, IRENA, IPCC AR6, UNECE. Shareable per-claim cards + live grid comparisons + cost-overrun visualizations.

**Why this matters now:** The German political moment is hot. Söder repeatedly demands SMR Bayern. Merz called Atomausstieg "irreversibel" March 2026. Reiche pushes 10 GW pure gas. The viral-tools research §7 flagged "myth-busting tools" as an under-built category with steep viral curve when they land. The nuclear-corpus research has the entire data set ready (lifecycle CO2, LCOE, capacity factors, FR 2022 corrosion crash, EPR cost overruns).

**Datasets (all free):**
- **Electricity Maps free tier** — live FR vs DE CO2 (the killer comparison)
- **Energy-Charts API** — live + historical multi-country mix
- **ENTSO-E Transparency** — bidding-zone generation + flows (free token)
- **RTE France data portal** — French nuclear hourly (`analysesetdonnees.rte-france.com/en/generation/nuclear`)
- **PVGIS** — for "what €19B builds" PV calc
- **Renewables.ninja** — for wind capacity factors (NC license — non-commercial only)
- **Our World in Data CSVs** — battery cost decline, deaths/TWh, lifecycle CO2 (CC BY)
- **Ember Climate** — country-level transition data
- **Lazard LCOE+ June 2025 PDF** + **Fraunhofer ISE Stromgestehungskosten 2024 EN PDF** + **IPCC AR6 WGIII Ch 6 PDF** + **UNECE LCA 2022 PDF** — bundle for cite-transparency

Full corpus: `context/nuclear-vs-renewables-corpus.md` (~580 lines with every URL).

**Scope (v0, 3-5 days):**
- Next.js + Tailwind + ECharts + MapLibre
- Five hero visualisations (pick 3 for v0, defer 2):
  1. **Live FR vs DE CO2 intensity** — split-screen iframe of Electricity Maps zones, overlay text "Despite nuclear, France's grid carbon today: X. Despite renewable transition, Germany's: Y."
  2. **"What €19 B builds" calculator** — slider: pick technology. €19B (Flamanville incl. interest) buys 1 EPR @ 8.4 TWh/yr OR 38 GW solar @ 37 TWh/yr OR 25 GW onshore wind @ 57 TWh/yr
  3. **Cost-overrun bar chart** ordered by % over budget: Flamanville +318%, Vogtle +163%, Olkiluoto +267%, Hinkley +94%, Mochovce +93%, **Barakah +22% (counter-example, essential for credibility)**
  4. **France 2022 corrosion-crisis chart** — monthly CF dropped 75% → 35% Aug 2022 + Germany solar+wind smooth profile overlay
  5. **"Race against time"** — X-axis years from FID, Y-axis cumulative MWh delivered. Three runners: Flamanville 3, Hinkley C, "equivalent annual energy in solar+battery incremental"
- **Politician-quote card stack** — Tinder-style swipeable: front = quote (Söder/Merz/Reiche, with source URL); back = chart with primary citation + "verify" button to PDF
- 10 quote+counter cards from nuclear-corpus §7
- README in DE + EN

**Demo flow:**
1. Hero: live FR vs DE CO2 split-screen, big numbers
2. Below: "What €19 B builds?" interactive calc
3. Politician card stack (swipeable) — 10 claims, 10 charts
4. Cost-overrun bar chart with Barakah counter-example highlighted
5. Methodology page: full sources list, named author, anti-promise
6. CTA: "Share this card on social" — server-rendered OG per card

**OG cards:** One per politician quote. Card front: "[Politician name] says: 'X'". Back / OG image: chart with citation + URL. Server-rendered with current Electricity Maps data where applicable.

**Anti-promise:** Tool is a structured citation of primary sources, not investment advice. Pro-nuclear LCOE critique is valid that LCOE understates system-integration cost — both views presented. Barakah counter-example shown to avoid one-sided framing.

**Build estimate:** 3-5 days. Data already gathered in nuclear-corpus.md; build is mostly UX + OG-card plumbing.

**Companion LinkedIn post:** "What primary-source data actually says about nuclear vs renewables — interactive." Track: bridge-arc 60% + AI/tooling 30%. Anchor: "I got tired of media coverage that mixes up Söder's claims with reality, so I built a tool that lets anyone verify each claim against the IPCC/UNECE/Lazard PDFs in 30 seconds." Probable cross-post: HN, /r/Energiewende, /r/de, /r/europe, Carbon Brief contact, Auke Hoekstra contact.

**Reach-out hook:** "Want to embed any of these charts in your article? CC BY 4.0 + iframe + PDF citations. Drop me a note."

**Risks (specific to this project):**
- **Political polarisation.** Right-wing pile-ons possible. Mitigation: ranges not midpoints, Barakah counter-example essential, never use "Atomkraftgegner" framing — let primary sources speak.
- **Fact-check overreach.** Every number cited to live URL. Methodology page versioned. If a number changes (e.g., Lazard 2026 update), version-bump tool with changelog.
- **One-shot relevance.** Political news cycle moves on. Mitigation: build for events (next budget debate, Söder press cycles, EU election) + Substack/newsletter cadence so tool has ongoing reason to exist.

**Cross-link to Track B:** Tests viral mechanics × political timing × media-relations skill. If picked up by mainstream press (Carbon Brief, Clean Energy Wire, taz), positions Gaylord as "Energy-Regulator-Whisperer" beyond just the trawa-Track-B-Q4 partnership angle.

---

### Project #5 — `ha-bess-investment-case` (HomeAssistant plugin) — NEW

**Status:** queued. **Different audience (HACS / r/homeassistant)** so doesn't compete for attention with web demos. Long-tail compounding install base.

**Goal:** HACS-installable HomeAssistant custom integration that simulates the INVESTMENT CASE for buying a home BESS (Batteriespeicher) + dynamic tariff. Pre-purchase tool — works without owning the hardware. Replays historical SMARD prices against BDEW synthetic load profiles (or user smart-meter data) with optimal LP dispatch + DACH regulatory primitives. Outputs payback / IRR / NPV / LCOE / avoided CO2 entities.

**Why this matters now:** §41a EnWG makes dynamic tariffs **mandatory** for DE suppliers >100k customers since Jan 2025. Tibber DE, aWATTar, Octopus DE, rabot.charge, Stromee, 1KOMMA5° Dynamic, Voltego all exist. **No HACS integration today is DACH-regulation-aware + supports pre-purchase decision.** Smart-meter rollout ~10% Q1 2026 → 80%+ households cannot subscribe to dynamic tariffs yet → they need a *pre-purchase* tool more than an operational one. Full whitespace analysis in `context/homeassistant-energy-ecosystem.md`.

**Datasets (all free):**
- **SMARD JSON endpoints** — multi-year DA price history (BNetzA, no token)
- **BDEW Standardlastprofile** — H0 / G0 / **H25 (smart-meter household) / P25 (household with PV) / S25 (household with PV + storage)**. Latter three released 2025 — required for any post-2025 modelling
- Optional: **aWATTar API** — live forecast for forward simulation
- Optional: **Tibber API** (customer token) — pass-through
- Optional: PVGIS — for synthesized PV profile from kWp + location
- **PLZ→VNB → Netzentgelt-by-VNB** — leveraged from Project #3 CC0 byproduct
- **EEG feed-in tariff schedule** — static JSON (~8 ct/kWh <10 kWp 2026)
- **§14a EnWG Modul 3 time-variable Netzentgelte** — static JSON if/when published

**Prior art to fork/learn-from:**
- `hif2k1/battery_sim` — fork starting point (single direct competitor; rule-based, no historical replay, no CAPEX/IRR)
- `davidusb-geek/emhass` — copy LP formulation (PuLP) for optimal dispatch
- `RangeyRover/home-battery-control` — clone "LP solver inside HA custom integration" form factor
- `mampfes/ha_epex_spot` — pattern for SMARD data fetching
- `marq24/ha-evcc` — borrow tariff abstraction schema

Full survey: `context/homeassistant-energy-ecosystem.md`.

**Scope (v0 → v1 sequencing, ~5-7 days for v0, more for full v1):**

**v0 (2 days):** Fork `hif2k1/battery_sim`. Add CAPEX + financing fields. Add three new sensors:
- `sensor.bess_payback_years`
- `sensor.bess_npv_eur`
- `sensor.bess_irr_pct`

Ship as `bess_investment_case` on HACS (custom repository). Validate via install count + GitHub stars.

**v0.5 (1 week post-v0):** SMARD historical fetch + one-shot backtest action that replays last 365 days against current battery+tariff config. Output: `sensor.last_year_savings_eur` + notification with breakdown.

**v1 (3 weeks post-v0):** BDEW synthetic load profile mode (no smart meter required). LP dispatch (PuLP embedded) with `perfect-foresight` (oracle, honest upper-bound) + `dayahead` (realistic) modes. Tariff-comparison scenario sweep across {no battery, 5/10/15 kWh} × {fixed, Tibber DE, aWATTar DE, Octopus DE} × {with PV, without PV}.

**v1.5 (deferred):** DACH regulatory primitives (EEG, §14a Modul 3, MwSt, Netzentgelt-by-PLZ via Project #3 CSV). PDF export. Monte Carlo P10/P50/P90 sensitivity.

**Demo flow (v1):**
1. HACS install → integration appears in HA UI
2. Config wizard: pick load source (BDEW H0 + annual kWh / upload CSV / use existing sensor) + pick PV (none / kWp+location / existing sensor) + pick tariff (fixed € / Tibber / aWATTar / Octopus DE) + battery params (kWh, kW, €/kWh CAPEX, RTE, cycle life)
3. Click "Run backtest" → progress bar over last 365 days SMARD replay → 15s later, dashboard card pops up with payback / NPV / IRR / per-month savings curve
4. Compare button — add second scenario, side-by-side
5. Notification: "Your 10 kWh @ €5k pays back in 8.3 years with Tibber DE + 8 kWp PV. Without PV: 14.1 years."

**OG card:** N/A (HACS integration, not web tool). Equivalent leverage = HACS install-count + GitHub stars + DACH community shares.

**Anti-promise:** Synthetic load profiles (BDEW H0) are 20-year-old smoothed proxies — real heat-pump/EV households deviate. Always show Monte Carlo P10/P50/P90 ranges, not single point estimates. EEG feed-in and §14a Netzentgelte change annually — config requires manual refresh until upstream APIs stabilise.

**Build estimate:** v0 = 2 days. v0.5 = +3 days. v1 = +1 week. Full v1.5 = +1 month.

**Companion LinkedIn post (at v0.5 launch):** "Wie viel spart eine 10 kWh Batterie wirklich? Wir haben Home Assistant gefragt." Track: AI/tooling 30% (build process) + bridge-arc 60% (helping DE Mittelstand-Konsumer decide). Anchor: "Most DE households can't subscribe to dynamic tariffs yet because smart-meter rollout is 10%. This tool answers `should I install a battery?` without needing the meter first."

**Distribution channels (homeassistant-energy-ecosystem.md §10):**
- HACS custom repository → default repository submission once stable
- r/homeassistant (~600k members) — "Share your projects"
- Tibber Discord DE channel
- r/Photovoltaik (~140k DE-focused)
- EVCC Discord
- photovoltaik-forum.com
- heimnetz.de + smarthomeyourself.de + smartlivingpoint.de DE HA bloggers
- PR to emhass docs adding tool as "I don't own kit yet" recommendation

**Reach-out hook in README:** "Built this because I'm pivoting into DACH cleantech and wanted to scratch my own itch first. Reach out if you're at a vendor (trawa, Octopus DE, 1KOMMA5°, gridX) and want to white-label or co-brand."

**Cross-link to Track B:** v0 of Q5 (vendor-side service) thesis — if vendors reach out about white-labeling, becomes paid SaaS prototype. Also v0 of Q2 (compliance copilot) — embeds §14a Modul 3 logic which only Big-4 currently understand.

**Risks (homeassistant-energy-ecosystem.md §11):**
- `hif2k1/battery_sim` maintainer ships historical-replay first. Mitigation: contribute first → understand codebase → fork direction if needed
- Tibber/Octopus ship walled-garden equivalent. Mitigation: vendor-neutral open-source is the moat
- BDEW H0 accuracy questioned. Mitigation: ship H25/P25/S25 archetypes (released 2025) + Monte Carlo

---

### Project #6 — `spread-compression-visualizer`

**Status:** queued. **Highest storytelling-leverage.**

**Goal:** Interactive web visualizer showing AU NEM 2023-26 BESS spread-compression (real historical data) alongside projected DE 2027-29 spread evolution (modelled). User toggles: BESS MW capacity, trading-strategy (peak-shaving / arbitrage / multi-use stack), market scenario (AU-fast / AU-slow / DE-projection). Output: revenue-erosion curve over time + comparison to break-even.

**Source-anchor:** `applications/2026-05_trawa-head-of-product/research/reddit-au-vs-de-storage.md` + SMARD historical DE spot prices + AEMO public NEM data.

**Datasets:**
- **AEMO NEM** — 5-min dispatch prices/generation per DUID, FCAS, interconnector. Live + history to 1998. Dev portal `dev.aemo.com.au`. NEMWeb migration scheduled 18 May 2026. Aggregated by opennem.org.au + OpenElectricity
- **SMARD JSON** — DE 15-min DA back to 2015 (BNetzA, no token)
- **CSIRO GenCost 2024-25** — Australian renewables+storage cost projections
- **ENTSO-E Transparency** — for cross-zone comparison

**Scope (v0, 3 days):**
- Next.js + Vercel
- ECharts for charts (reuse skill from trawa deck)
- Pre-loaded AU NEM 2023-26 spread data (manual one-time scrape from AEMO public dashboards via opennem.org.au)
- Pre-loaded DE 2024-26 actual spot-spread baseline from SMARD
- Projection model: simple ARIMA + scenario-multipliers (no ML required; explainable math)
- Toggle UI: 3 sliders + 2 dropdowns
- README + about-page explaining model, limitations, "wenn DE in 2027 wie AU in 2023 aussieht, dann …" argument

**Demo flow:**
1. Hero: split-screen — AU spread 2023-26 + DE spread 2024-26
2. Slider: "Wenn DE 2027 wie AU 2023" → projects DE spread forward
3. BESS revenue overlay: pick MW capacity → see €/yr trajectory
4. Strategy toggle: peak-shaving vs arbitrage vs multi-use stack
5. Break-even line: capex@€500/kWh → 6yr / 8yr / 12yr scenarios

**OG card:** Split-screen mini-chart "AU 2023 vs DE 2024 spread" + author block.

**Anti-promise:** Not investment advice; projection is illustrative not predictive. Real BESS revenue depends on Regelreserve + Multi-Use stack which visualizer simplifies.

**Build estimate:** 3 days. Most time = data-prep + UI polish; model is simple.

**Companion LinkedIn post:** "What the Australian battery crash teaches DE storage investors — interactive." Track: bridge-arc 60%. Probable cross-post r/Energiewende, r/energy, LinkedIn Energy Storage Group.

**Reach-out hook:** "If you're investing €1-10M in a BESS and want a second-opinion stress-test on the spread assumption, ping me."

---

### Project #7 — `vpp-mini-sim`

**Status:** queued. **Highest wow-factor.** Defer to post-Week 6 master review unless Track B promotes.

**Goal:** Browser-based 24-hour VPP simulator. User configures synthetic small portfolio (1 MW BESS + 500 kWp PV + 100 EV-chargers + 200 heat-pumps). Simulator runs against real SMARD spot-price day. Output: €-bilanz + visualization of dispatch per asset per 15-min.

**Datasets:**
- **SMARD JSON** — historical spot prices, pick 30 representative days
- **BDEW Standardlastprofile** — H0 / G0–G6 / **H25/P25/S25 (2025 update)**
- **PVGIS** — synthesized PV profile
- **Open-Meteo** — weather forcing
- Public VPP literature: Next Kraftwerke whitepapers, gridX XENON case studies

**Scope (v0, 5 days):**
- Next.js + Vercel
- ECharts time-series + sankey for energy-flow
- Greedy dispatch (highest-priority asset first); LP/MILP out-of-scope v0
- Toggles: asset mix, market day (30 pre-loaded SMARD days), strategy (peak-shave / arbitrage / balanced)
- 24-hour replay animation
- README explaining model + simplifications

**OG card:** Sankey snapshot of best-case dispatch day + total €-bilanz.

**Anti-promise:** Not a production VPP scheduler; greedy dispatch under-performs real LP. Educational tool.

**Build estimate:** 5 days. Most complex of 8 projects.

**Companion LinkedIn post:** "VPP economics in your browser — built in 4 days with Claude Code." Track: AI/tooling 30% + bridge-arc 60%. Most shareable of the 8 projects.

**Reach-out hook:** "Want a real-data simulation of your asset mix? Send me your portfolio + I'll run it overnight."

**Cross-link to Track B:** v0 of Q3 (Multi-Vendor-Integration) thesis if integration-layer opportunity matures.

---

### Project #8 — `bess-amortisation-sim`

**Status:** queued. **Most substantive, longest build.** Synthesizes Projects #1+#2+#3+#6.

**Goal:** 5-year DCF model for BESS investment. Inputs: BESS MWh + MW + capex + operator-strategy (Spot-arbitrage only / Spot+Regelreserve / Spot+Regelreserve+§19+§118). Outputs: payback + IRR + sensitivity-table.

**Datasets:**
- Trawa webinar Slide 12 (waterfall economics) + Slide 13 (Jakob Gerhardt case real -23%)
- regulatory-fact-check.md (§19, §118, MiSpeL)
- Cleantechie public articles on BESS-vs-gas
- SMARD historical baseline
- Project #6 spread-compression scenarios
- Project #3 PLZ→VNB→Netzentgelt CSV

**Scope (v0, 5 days):**
- Next.js OR Streamlit (decide based on user-flow needs)
- Pre-loaded benchmark: trawa-quoted 3-6yr amortisation as default scenario anchor
- Sensitivity-table: spread-compression scenarios (AU-fast / AU-medium / AU-slow per #6) + Regelreserve-price decay + regulatory cliff (§118 cutoff 04.08.2029 + MiSpeL-deadline 30.06.2026)
- Per-input field tooltip with assumption + source

**OG card:** Sensitivity tornado + headline payback range.

**Anti-promise:** Not investment advice; DCF simplified (no debt-equity, no tax-shield, no inflation indexing).

**Build estimate:** 5 days.

**Companion LinkedIn post:** "Why some BESS pay back in 3 years and others in 8 — interactive sensitivity model." Track: bridge-arc 60%. Probable share into investor-facing LinkedIn networks.

**Reach-out hook:** "If you're modelling a BESS investment, this is the second-opinion tool. Drop me your assumptions + I'll walk through the model with you."

**Cross-link to Track B:** Combines with #1+#2+#3+#6 into product-bundle if Track B confirms BESS-investor-tooling market.

---

## Sequencing (re-ranked v2)

| # | Project | Build days | Why this order |
|---|---|---|---|
| 1 | `stromnev-19-calculator` | 2 | Fastest ship → momentum + gates gridX (Tier 2) |
| 2 | `mispel-deadline-tracker` | 3 | Gates 1KOMMA5° (Tier 2) + time-bombed 30.06.2026 |
| 3 | `strompuls-de` | 5-7 | Highest viral lever; builds reusable infra (PLZ→VNB, MaStR, SMARD) for #5/#7/#8 |
| 4 | `energiewende-mythbuster` | 3-5 | Political-timing peak (Söder/Merz/Reiche live); reuses live-grid plumbing from #3 |
| 5 | `ha-bess-investment-case` | 5-7 v0 + iterations | Different audience (HACS, r/homeassistant); long-tail compound; reuses BDEW + SMARD plumbing |
| 6 | `spread-compression-visualizer` | 3 | Reuses existing Reddit content + ECharts skill |
| 7 | `vpp-mini-sim` | 5 | Wow-factor; defer to post-Week 6 unless promoted |
| 8 | `bess-amortisation-sim` | 5 | Synthesizes #1+#2+#3+#6; ships as definitive Mittelstand BESS tool |

Total: ~36-40 build-days. Realistic calendar with companion-posts + iteration + interruptions: 8-12 weeks. **Extends beyond original 6-week sequencing.** Post-Week-6 master review (sequencing-2026-q2.md Gate E) determines continuation.

**Trigger conditions to re-sequence:**
- 1KOMMA5° interview booked before mispel ships → bump #2 ahead
- Track B Q2 strongly positive → ship #2 + #1 first, iterate to paid product
- Strompuls.de hits >10k visits in first week → bump #3 to v1 with paid scenarios before moving on
- Mythbuster picked up by mainstream press → defer #5 (HA plugin) to focus on press cycle
- HA plugin >500 HACS installs → invest in v1.5 DACH regs before #6-#8

## Launch plan (per project)

1. **Build** in feature branch, public from day-1
2. **Polish README** with: domain-context, what-this-is, what-this-is-NOT, install/run instructions, screenshots, author block + reach-out hook
3. **Generate OG card** for projects #3/#4/#6/#7/#8 (web tools). Test with X / LinkedIn / Mastodon / Bluesky card debuggers
4. **Add methodology page** with named author + named data sources + licence
5. **Internal review** before going live publicly. `/commit-check` equivalent for public repo
6. **Launch post on LinkedIn** (DE + EN if cross-posting to Xing). Schedule mid-week mid-morning DACH per `branding/channels/linkedin/strategy.md`
7. **Cross-post**: HN (Show HN, cleantech-flair), Reddit r/energy + r/Energiewende + r/de + r/PVAnlagen, Mastodon (mastodon.green), Bluesky, IndieHackers if AI-native angle. Substack if Gaylord maintains one
8. **Track outreach**: log inbound in `networking/contacts.private.md` (gitignored)
9. **Iterate** based on real feedback. If a feature is repeatedly requested, ship v0.1

## Cross-track dependencies

- **Feeds Track A:** Each shipped project is an interview talking-point. #1 must be shipped before gridX; #2 must be shipped before 1KOMMA5°
- **Feeds Track B:** #1+#2+#5+#8 prototype Q2 (Regulatory-as-a-Service); #3+#7 prototype Q3 (multi-vendor integration / VPP-tooling); #4 prototypes "Energy-Regulator-Whisperer" content brand (Track B Q4 partnership angle); #5 prototypes Q5 (vendor-side service white-label)
- **Feeds branding:** Each project = LinkedIn post + OG card = backlog for `branding/channels/linkedin/`. Doubles existing post pipeline

## What the agent should know about the user

- **AI-native operating mode is default.** Build with Claude Code + taskpilot pattern. Build-process itself is a credential — document in companion post
- **Domain-honesty non-negotiable.** Gaylord has studied DACH cleantech ~6 weeks. README frames as "built by domain-curious operator with deep adjacent product+engineering experience", NOT "10-year energy veteran"
- **German-native.** DE-language READMEs for #1, #2, #5 (target DE Mittelstand). EN for #3, #4, #6, #7, #8 (broader audience). Cross-post translated versions where audience-fit
- **S2T Engineering GmbH already incorporated** — if any project triggers paid-engagement inbound, contracted through this entity
- **Does NOT want to clone trawa.** Avoid "the trawa competitor for X" framing. Position as analytical tools, not platform plays
- **Has trawa webinar transcript + 25-slide deck digest + competitors.md (16 DACH vendors) + regulatory-fact-check.md** — all in `applications/2026-05_trawa-head-of-product/`. Reuse heavily for grounding

## What "next session pickup" looks like

If a new Claude Code session opens this file with intent to build (note: this runs in a **separate build repo**, not `career2026` — see "Strategic frame" + "Source material to bring" above):
0. Confirm the source material listed in "Source material to bring into the build repo" is available (copied in, or `career2026` checked out alongside). Without it, #1/#2/#8 lose their regulatory grounding.
1. Read this file in full
2. Read the relevant supplement under `context/`:
   - Building #1 or #2 → `context/energy-domain.md` + `applications/2026-05_trawa-head-of-product/research/regulatory-fact-check.md`
   - Building #3 → `context/regional-grid-data-de.md` + `context/datasets-energy-public.md`
   - Building #4 → `context/nuclear-vs-renewables-corpus.md` + `context/viral-energy-tools.md`
   - Building #5 → `context/homeassistant-energy-ecosystem.md`
   - Building #6 → `applications/2026-05_trawa-head-of-product/research/reddit-au-vs-de-storage.md`
3. Confirm with user which project to build (default: Project #1 `stromnev-19-calculator` if no other signal)
4. Create new GitHub repo under user's account (or S2T org if one exists)
5. Build per project spec above
6. Draft companion LinkedIn post in `branding/channels/linkedin/posts/` per `branding/strategy.md`
7. Internal review with user
8. Publish + cross-post + log inbound
9. Update this file with project's launch status + lessons for next build

## Definition of done (per project)

- Public GitHub repo with README in target-audience language + EN
- "What this is NOT" section in README
- Author block + reach-out hook
- Live deployment (Streamlit Community Cloud / Vercel / HACS depending on project)
- For web projects #3-#8: server-rendered OG card + stable querystring state + embed iframe + methodology page
- Companion LinkedIn post drafted in `branding/channels/linkedin/posts/`
- Cross-posts queued for HN + r/Energiewende + Mastodon/Bluesky
- Plausible / Umami analytics enabled
- License committed (MIT code + CC BY 4.0 data)
- This file updated with launch date + initial metrics

## Open questions to resolve before building

1. **Domain name strategy.** `strompuls.de` checked vs taken? Fallback options: `netzlive.de`, `gridpuls.de`, `energiewende-fakten.de`. Pre-register all relevant domains in week 1 before public launches.
2. **GitHub org.** Personal account or new "S2T Engineering" org? Org positions better for B2B inbound; personal is faster
3. **Bluesky + Mastodon handles.** Reserve `@gaylordzach.bsky.social` + `@gaylordzach@mastodon.green` Week 1
4. **Substack / Beehiiv newsletter.** Spin up "DACH Energy Brief" pre-Project-#3 launch? Gives owned distribution channel for compounding subscribers
5. **Press contacts list.** Carbon Brief, Clean Energy Wire (Florian Lichtschlag-Traut), taz (Bernward Janzing), Spiegel (Susanne Götze), Handelsblatt (Klaus Stratmann) — pre-warm before Project #4 mythbuster launch
6. **Track B Q4 partnership pitch timing.** Send trawa partnership-pitch (with regulatory-digest sample + #1+#2 demo links) before or after Project #4? Mythbuster could read as anti-establishment; trawa pitch should land before #4 to avoid awkward timing
