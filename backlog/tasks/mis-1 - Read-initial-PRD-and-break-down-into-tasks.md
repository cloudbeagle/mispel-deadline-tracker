---
id: MIS-1
title: Read initial PRD and break down into tasks
status: Done
assignee:
  - '@sub-agent'
created_date: '2026-06-08 18:31'
updated_date: '2026-06-08 19:19'
labels: []
dependencies: []
ordinal: 1000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
## Synopsis
**State:** Done · **Stage:** implementation complete
**Next:** none; narrator will document.

Rung 0 Project #2 — TIME-BOMBED (deadline 30.06.2026, ~22d as of 2026-06-08). Builder reframe: NOT a submission/XML generator (no Festlegung exists yet) but a live status + decision tracker. Hero = countdown + Abgrenzung-vs-Pauschal economic chooser. v0 of Rung-2 compliance-copilot thesis.
Read the full PRD from context/initial-prd.md and documents linked therein.
<!-- SECTION:DESCRIPTION:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Read context/initial-prd.md in full — done
2. Read context/regulatory-fact-check.md (Claim 3 — MiSpeL confirmed) — done
3. Read context/cleantech-credentials-handoff.md (Project #2 spec + tech stack) — done
4. Read context/venture-research-output.md (Q2 compliance-copilot thesis) — done
5. Read context/PILOT-HANDOFF.md (pilot operating model, 8–12 task guidance) — done
6. Create 12 backlog tasks spanning: scaffold → data layer → 4 core v0 features → distribution/infra concerns → content — done
7. Two tasks set Draft (DRAFT-1 OG card, DRAFT-2 analytics+social) — ambiguous scope requiring grooming
8. Write HANDOFF.md
9. Mark MIS-1 Done
<!-- SECTION:PLAN:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Read context/initial-prd.md and all linked context docs (regulatory-fact-check.md, cleantech-credentials-handoff.md, venture-research-output.md, PILOT-HANDOFF.md).

Created 12 backlog tasks covering the full v0 scope of the MiSpeL Deadline & Decision Tracker:

**Build-ready (To Do, 10 tasks):**
- MIS-2: Next.js 15 + Tailwind + shadcn/ui scaffold + Vercel config (all others depend on this)
- MIS-3: `status.json` data layer — versioned BNetzA procedural state
- MIS-4: Status banner + live countdown hero (PRD §4 feature 1)
- MIS-5: "Bin ich betroffen?" decision tree — green/amber/red verdict (PRD §4 feature 2)
- MIS-6: Abgrenzung vs. Pauschale economic chooser — the credential core (PRD §5)
- MIS-7: Plain-language regulatory explainer with source links (PRD §4 feature 4)
- MIS-8: Querystring state + embeddable countdown iframe (PRD §6)
- MIS-9: Methodology / about page at `/methodik` (PRD §6 + §8)
- MIS-10: German README + MIT + CC BY 4.0 license files (PRD §10 DoD)
- MIS-11: LinkedIn companion post draft (PRD §6 + DoD #3)

**Needs grooming (Draft, 2 tasks):**
- DRAFT-1: Server-rendered OG card — needs card copy spec + Vercel regen strategy decision
- DRAFT-2: Plausible analytics + daily-social auto-post — needs social platform + API credential decision

Commit: `464039f` on branch `tasks/back-mis-1`.
<!-- SECTION:FINAL_SUMMARY:END -->

<!-- SECTION:PLAN:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [ ] #1 Public GitHub repo (personal), README DE
- [ ] #2 Author block + free-30min-beratung reach-out hook
- [ ] #3 Companion LinkedIn post drafted (deadline-bearing-down hook)
- [ ] #4 Shipped before late June (deadline decay)
- [ ] #5 Live deploy (Vercel) + server-rendered OG card w/ live countdown + querystring state + embeddable countdown + methodology page
- [ ] #6 License committed (MIT + CC BY 4.0 data)
- [ ] #7 Plausible analytics + daily-social auto-post wired
<!-- DOD:END -->
