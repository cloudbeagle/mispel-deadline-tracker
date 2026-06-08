# MiSpeL Deadline & Decision Tracker — v0 Scope & Task Breakdown

## What is MiSpeL

MiSpeL (Mitteilungen über Speicherfähigkeit — Storage Capability Statements) is a German regulatory compliance tracker for energy storage operators. **Deadline:** 30 June 2026 (~22 days from task start).

**Mission:** Help operators determine if they're affected by new procedural requirements and calculate economic impact of compliance choices (Abgrenzung vs. Pauschal cost model).

**v0 Scope:** Live status tracker + decision tree + economic chooser. NOT a submission generator — just a countdown and decision tool.

## Why this project

Part of **Rung 2 compliance-copilot thesis** — testing whether structured regulatory deadline tracking + plain-language explainers + interactive decision trees reduce compliance friction for small operators. Time-bombed validation for market signal.

## v0 Feature Set

1. **Live countdown hero** (MIS-4) — BNetzA deadline + days remaining, server-rendered OG card
2. **"Bin ich betroffen?" decision tree** (MIS-5) — Green/amber/red verdict on whether operator is in scope
3. **Abgrenzung vs. Pauschale chooser** (MIS-6) — Interactive calculator comparing two cost models; the core credential
4. **Plain-language explainer** (MIS-7) — Regulatory text + source links in German
5. **Embeddable countdown** (MIS-8) — Querystring state + iframe for external embedding
6. **About/methodology page** (MIS-9) — Transparency on data sources and decision logic

## Task Breakdown (12 + 2 draft)

### Critical Path

**MIS-2: Next.js 15 scaffold** (BLOCKING)
- Blocks all others. Sets up repo structure, Tailwind, shadcn/ui, Vercel config.
- Highest priority — start here.

### Data & Core Features (can parallel after MIS-2)

**MIS-3: `status.json` data layer**
- Versioned BNetzA procedural state (deadline, status, procedural phase)
- Source of truth for countdown; facilitates data updates without code

**MIS-4: Status banner + countdown hero**
- Server-rendered component with OG card metadata
- Live countdown display

**MIS-5: Decision tree**
- Multi-step form: company size → affected yes/no → verdict with explanation
- Green/amber/red visual feedback

**MIS-6: Economic chooser (highest-effort, highest-value)**
- Interactive calculator for Abgrenzung vs. Pauschale compliance costs
- Computation assumptions must be flagged, not invented
- Budget extra time

**MIS-7: Regulatory explainer**
- Plain-language walkthrough of BNetzA requirements
- Source links to official docs

### Distribution & Infrastructure

**MIS-8: Querystring state + embeddable iframe**
- Persist form state via URL
- Allow decision tree to be embedded externally

**MIS-9: Methodology page** (`/methodik`)
- Data sources, decision logic, computation assumptions
- Transparency + credibility

**MIS-10: German README + licenses**
- README.de.md
- MIT + CC BY 4.0 (data) license files
- Vercel DoD checklist completion

**MIS-11: LinkedIn companion post**
- Deadline-bearing-down hook for launch
- Drives initial reach

### Deferred (needs grooming)

**DRAFT-1: Server-rendered OG card strategy**
- Card copy spec + Vercel img regenration approach
- Decision: static or dynamic OG image

**DRAFT-2: Analytics + daily social auto-post**
- Plausible setup (privacy-friendly analytics)
- Social platform choice + API credential model
- Requires external API decision

## Build Recommendations

1. **Week 1 (2026-06-08–06-14):** MIS-2 scaffold, then MIS-3 data layer
2. **Week 2 (2026-06-15–06-21):** Parallel build of MIS-4, MIS-5, MIS-6, MIS-7 (core features)
3. **Week 3 (2026-06-22–06-28):** MIS-8, MIS-9, MIS-10, MIS-11 + groom DRAFT-1/DRAFT-2
4. **Launch day 2026-06-30:** Live deploy, LinkedIn post, monitor feedback

**Critical note:** MIS-6 (chooser) is the hardest task and the core value prop. Schedule it early in week 2 and allocate buffer time.

## Context

Full requirements, regulatory fact-check, and tech stack guidance in:
- `context/initial-prd.md` — product requirements
- `context/regulatory-fact-check.md` — BNetzA procedural validation
- `context/cleantech-credentials-handoff.md` — Project #2 tech spec
- `context/venture-research-output.md` — Rung-2 compliance-copilot thesis
- `context/PILOT-HANDOFF.md` — pilot operating model + agent guidance

## Success Metrics

✔ All 12 tasks created and assigned  
✔ Build order + dependencies documented  
✔ MIS-6 scoped as core effort  
✔ DRAFT-1 & DRAFT-2 flagged for grooming  
✔ Commit: `464039f` on branch `tasks/back-mis-1`
