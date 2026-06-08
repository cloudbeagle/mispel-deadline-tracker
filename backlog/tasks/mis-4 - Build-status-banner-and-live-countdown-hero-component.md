---
id: MIS-4
title: Build status banner and live countdown hero component
status: To Do
assignee: []
created_date: '2026-06-08 19:15'
labels: []
dependencies:
  - MIS-3
references:
  - context/initial-prd.md#4
priority: high
ordinal: 4000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
The hero section of the app: a live countdown to 2026-06-30 23:59 MEZ plus a dated procedural status banner driven by `status.json`. This is the one-screenshot story per PRD §4: "Stand: Festlegung noch nicht erlassen · X Tage bis 30.06.2026 (gesetzliche Frist §85d EEG)". Must handle post-deadline state gracefully (banner flips to "MiSpeL ist da" mode when `festlegung_issued: true`).
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Countdown displays days (and optionally hours/minutes) to 2026-06-30 23:59 MEZ, updating client-side
- [ ] #2 Status banner shows current `phase` + `last_bnetza_update` from `status.json`
- [ ] #3 Banner text: 'Stand: [phase] · Letzte BNetzA-Aktualisierung: [date] · Quelle: BNetzA Verfahrensseite [link]'
- [ ] #4 When `festlegung_issued: true`, banner switches to 'Festlegung erlassen am [date]' variant
- [ ] #5 After 2026-06-30, countdown shows '0 Tage — Frist abgelaufen; Festlegung in Kraft ab 01.07.2026'
- [ ] #6 'Was passiert am 01.07.2026?' inline explainer section rendered below the countdown
- [ ] #7 Component is server-renderable (deadline date is static; client hydrates timer only)
<!-- AC:END -->
