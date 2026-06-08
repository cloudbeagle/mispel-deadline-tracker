---
id: MIS-4
title: Build status banner and live countdown hero component
status: Done
assignee:
  - '@sub-agent'
created_date: '2026-06-08 19:15'
updated_date: '2026-06-08 22:04'
labels: []
dependencies:
  - MIS-3
references:
  - context/initial-prd.md#4
modified_files:
  - app/page.tsx
  - components/StatusBanner.tsx
  - components/CountdownHero.tsx
  - components/WhatHappensExplainer.tsx
priority: high
ordinal: 4000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
## Synopsis
**State:** Done · **Stage:** implementation complete / **Next:** none; narrator will document.

The hero section of the app: a live countdown to 2026-06-30 23:59 MEZ plus a dated procedural status banner driven by `status.json`. This is the one-screenshot story per PRD §4: "Stand: Festlegung noch nicht erlassen · X Tage bis 30.06.2026 (gesetzliche Frist §85d EEG)". Must handle post-deadline state gracefully (banner flips to "MiSpeL ist da" mode when `festlegung_issued: true`).
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Countdown displays days (and optionally hours/minutes) to 2026-06-30 23:59 MEZ, updating client-side
- [x] #2 Status banner shows current `phase` + `last_bnetza_update` from `status.json`
- [x] #3 Banner text: 'Stand: [phase] · Letzte BNetzA-Aktualisierung: [date] · Quelle: BNetzA Verfahrensseite [link]'
- [x] #4 When `festlegung_issued: true`, banner switches to 'Festlegung erlassen am [date]' variant
- [x] #5 After 2026-06-30, countdown shows '0 Tage — Frist abgelaufen; Festlegung in Kraft ab 01.07.2026'
- [x] #6 'Was passiert am 01.07.2026?' inline explainer section rendered below the countdown
- [x] #7 Component is server-renderable (deadline date is static; client hydrates timer only)
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Create `components/StatusBanner.tsx` — server component; props: `status: MiSpeLStatus`; renders AC#2/3 banner or AC#4 festlegung variant
2. Create `components/CountdownHero.tsx` — 'use client'; receives `initialDays: number` and `deadlinePassed: boolean` as props from server; after hydration starts live setInterval; handles AC#1/5
3. Create `components/WhatHappensExplainer.tsx` — server component; static DE text for AC#6
4. Update `app/page.tsx` — server component; calls `getStatus()`; computes initial countdown values; renders all three components; deadline = 2026-06-30 21:59 UTC (CEST = UTC+2)
5. Run `npm run build` to verify AC#7 (server-renderable)
<!-- SECTION:PLAN:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Built three components and wired them into app/page.tsx to deliver the MIS-4 hero section.

**Components:**
- `components/StatusBanner.tsx` — server component; reads `MiSpeLStatus` prop; amber variant: "Stand: [phase] · Letzte BNetzA-Aktualisierung: [date] · Quelle: BNetzA Verfahrensseite [link]"; green variant when `festlegung_issued=true`: "Festlegung erlassen am [date]"
- `components/CountdownHero.tsx` — `'use client'`; receives `initialDays` + `deadlinePassed` from server for SSR; after hydration starts 30s `setInterval`; shows days + hours + minutes; post-deadline: "0 Tage — Frist abgelaufen; Festlegung in Kraft ab 01.07.2026"
- `components/WhatHappensExplainer.tsx` — server component; static DE explainer section (§85d EEG, Abgrenzungsoption vs Pauschaloption)

**app/page.tsx:** server component; calls `getStatus()` at build time; computes `initialDays` from `DEADLINE_UTC = 2026-06-30T21:59:00Z` (CEST=UTC+2); renders all three components.

**Verification:**
- `npm run build` exits 0; `/` prerendered as static content; 4/4 static pages generated
- All 7 ACs satisfied: countdown with hours/minutes (AC#1), banner from status.json (AC#2/3), festlegung variant (AC#4), post-deadline text (AC#5), explainer section (AC#6), server-renderable with client hydration (AC#7)
<!-- SECTION:FINAL_SUMMARY:END -->
