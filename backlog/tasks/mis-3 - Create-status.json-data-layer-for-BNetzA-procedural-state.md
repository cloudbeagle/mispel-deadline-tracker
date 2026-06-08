---
id: MIS-3
title: Create status.json data layer for BNetzA procedural state
status: Needs Input
assignee:
  - '@sub-agent'
created_date: '2026-06-08 19:15'
updated_date: '2026-06-08 19:25'
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
**State:** Needs Input · **Stage:** AC#1-5 done; blocked on MIS-2 scaffold merge to verify AC#6 (`npm run build`)
**Next:** merge MIS-2 PR, then re-queue MIS-3; resuming agent runs `npm run build` to close AC#6.

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
## Needs Input
AC#6 (`npm run build`) cannot be verified — Next.js scaffold not on main branch.

### Trigger
Discovered dependency: `npm run build` requires `package.json` + Next.js (`next build`) from MIS-2's branch (`tasks/back-mis-2`), which has not yet merged to main. Creating a duplicate scaffold on this branch would cause merge conflicts.

### Context
ACs #1-5 are complete and committed (commit `90e532d` on `tasks/back-mis-3`):
- `public/status.json` populated with all required fields
- `lib/status.ts` defines `MiSpeLStatus` interface + `getStatus()` with ISO-date + type validation

MIS-2 (`tasks/back-mis-2`) scaffolded Next.js 15 + React 19 + Tailwind v4 + shadcn/ui. Its `build` script is `next build`. This branch (MIS-3) was cut from main before MIS-2 merged, so no `package.json` exists here.

### Options considered
1. **Escalate and wait** — cleanest; watcher re-queues after MIS-2 merges ✓
2. **Duplicate scaffold** — creates guaranteed merge conflict on `package.json`, `tsconfig.json`, `next.config.ts`
3. **Minimal tsc build** — satisfies AC#6 letter but not spirit (`next build` intent); still conflicts on merge

### Recommendation
Merge MIS-2 first. After merge, re-queue MIS-3; the resuming agent just needs to `npm install && npm run build` in the worktree to confirm AC#6.
<!-- SECTION:NOTES:END -->
