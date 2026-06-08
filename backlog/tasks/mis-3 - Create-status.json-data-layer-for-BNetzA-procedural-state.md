---
id: MIS-3
title: Create status.json data layer for BNetzA procedural state
status: Needs Input
assignee:
  - '@sub-agent'
created_date: '2026-06-08 19:15'
updated_date: '2026-06-08 19:31'
labels: []
dependencies:
  - MIS-2
references:
  - context/initial-prd.md#3
  - context/regulatory-fact-check.md#Claim3
priority: high
ordinal: 3000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
## Synopsis
**State:** Needs Input · **Stage:** PR feedback addressed; awaiting MIS-2 merge to verify AC#6
**Next:** (1) Re-review PR #3 — feedback addressed in commit `54dfabe`; (2) merge MIS-2; (3) re-queue MIS-3 for AC#6 (`npm run build`) verification.

Hand-maintained versioned data file that drives the live status banner, countdown, and OG card. This is the single authoritative data source for: current MiSpeL procedure phase, date of last BNetzA update, whether the Festlegung has been issued, and the statutory deadline. Follows PRD §3 "live data feed" spec. Pre-stage the "Festlegung erlassen am [date]" state so flipping it on launch day requires a one-line JSON edit.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 File `public/status.json` exists and is valid JSON
- [x] #2 `status.json` contains: `phase` (string), `last_bnetza_update` (ISO date), `festlegung_issued` (boolean), `festlegung_date` (ISO date or null), `statutory_deadline` (ISO date = '2026-06-30'), `source_url` (BNetzA Verfahrensseite URL)
- [x] #3 TypeScript type `MiSpeLStatus` defined in `lib/status.ts` matching the schema
- [x] #4 A `getStatus()` helper reads and validates `status.json` at build time; throws on schema mismatch
- [x] #5 Populated with current accurate values: `phase: 'Konsultation abgeschlossen'`, `last_bnetza_update: '2025-11-12'`, `festlegung_issued: false`
- [ ] #6 `npm run build` exits 0 with the file present
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Create `public/status.json` with all required fields (AC#1, #2, #5)
2. Create `lib/status.ts` with `MiSpeLStatus` type + `getStatus()` helper (AC#3, #4)
3. Commit on tasks/back-mis-3
4. Escalate: AC#6 (`npm run build`) requires Next.js scaffold from MIS-2 (not yet merged to main)
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
## PR Feedback Addressed (commit `54dfabe`)

Three findings from gzach review resolved:

1. **Missing-key error** — added `if (!('festlegung_date' in d))` check before null/type check; absent key now throws `'festlegung_date is required'` (was misleadingly `'must be ISO date or null'`)
2. **Long line** — split compound `festlegung_date` condition onto two lines
3. **Test file** — created `tests/status.test.ts` with 8 cases using `node:test` + `node:assert/strict` (no external deps): valid input, ISO date string, missing field, bad ISO date, absent key, null, explicit undefined, non-https URL, non-object root; also exported `validateStatus` for testability; run with `npx tsx --test tests/status.test.ts`

Reviewer also suggested wiring `getStatus()` into an SSG page — deferred to MIS-5/MIS-6 which will create actual pages; those pages will call `getStatus()` at build time naturally.

## Still Blocked: AC#6

`npm run build` still requires `package.json` from MIS-2. Branch `tasks/back-mis-2` not yet merged to main.

**Next agent:** after MIS-2 merges, rebase `tasks/back-mis-3` onto main (or merge main), then run `npm install && npm run build`. If exits 0, check AC#6 and set Done.

## PR
https://github.com/cloudbeagle/mispel-deadline-tracker/pull/3
<!-- SECTION:NOTES:END -->
