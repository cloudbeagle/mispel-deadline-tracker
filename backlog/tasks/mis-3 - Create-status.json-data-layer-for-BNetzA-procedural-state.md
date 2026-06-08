---
id: MIS-3
title: Create status.json data layer for BNetzA procedural state
status: To Do
assignee: []
created_date: '2026-06-08 19:15'
labels: []
dependencies: []
references:
  - context/initial-prd.md#3
  - context/regulatory-fact-check.md#Claim3
priority: high
ordinal: 3000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Hand-maintained versioned data file that drives the live status banner, countdown, and OG card. This is the single authoritative data source for: current MiSpeL procedure phase, date of last BNetzA update, whether the Festlegung has been issued, and the statutory deadline. Follows PRD §3 "live data feed" spec. Pre-stage the "Festlegung erlassen am [date]" state so flipping it on launch day requires a one-line JSON edit.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 File `public/status.json` exists and is valid JSON
- [ ] #2 `status.json` contains: `phase` (string), `last_bnetza_update` (ISO date), `festlegung_issued` (boolean), `festlegung_date` (ISO date or null), `statutory_deadline` (ISO date = '2026-06-30'), `source_url` (BNetzA Verfahrensseite URL)
- [ ] #3 TypeScript type `MiSpeLStatus` defined in `lib/status.ts` matching the schema
- [ ] #4 A `getStatus()` helper reads and validates `status.json` at build time; throws on schema mismatch
- [ ] #5 Populated with current accurate values: `phase: 'Konsultation abgeschlossen'`, `last_bnetza_update: '2025-11-12'`, `festlegung_issued: false`
- [ ] #6 `npm run build` exits 0 with the file present
<!-- AC:END -->
