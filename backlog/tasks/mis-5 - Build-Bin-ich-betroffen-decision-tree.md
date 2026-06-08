---
id: MIS-5
title: Build "Bin ich betroffen?" decision tree
status: Done
assignee:
  - '@sub-agent'
created_date: '2026-06-08 19:15'
updated_date: '2026-06-08 22:11'
labels: []
dependencies:
  - MIS-2
references:
  - context/initial-prd.md#4
  - context/regulatory-fact-check.md#Claim3
modified_files:
  - components/BinIchBetroffen.tsx
  - app/page.tsx
priority: high
ordinal: 5000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
## Synopsis
**State:** Done · **Stage:** implementation complete / **Next:** none; narrator will document.

3–4 question decision tree that tells an operator whether MiSpeL applies to their asset. Outputs green / amber / red verdict with plain-language explanation. Per PRD §4 feature 2: questions cover Mixed-Use/Co-Location?, EEG-Anlage beteiligt?, Speicher oder Ladepunkt?. Verdict must cite the relevant legal basis (§19 Abs. 3b/3c EEG, §118 Abs. 6 EnWG). State must be encodable in querystring for sharing (feeds MIS-8).
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Decision tree renders at `/` below the hero (or as a distinct section)
- [x] #2 Exactly 3–4 questions covering: (1) Mixed-Use/Co-Location-Speicher?, (2) EEG-Anlage am selben Netzanschlusspunkt?, (3) Netz- oder Photovoltaik-Anteil beim Laden?, (4) Ladepunkt-Betreiber?
- [x] #3 Green verdict: 'Nicht betroffen — MiSpeL gilt nicht für Ihre Anlage' with legal basis cited
- [x] #4 Amber verdict: 'Möglicherweise betroffen — abhängig von Ihrer Messkonzept-Wahl' with explanation
- [x] #5 Red verdict: 'Betroffen — MiSpeL gilt; Abgrenzungs- oder Pauschaloption erforderlich' with next-step link to chooser
- [x] #6 Verdict includes inline source citation (§85d EEG 2023, BK6-25-038)
- [x] #7 Decision state serialisable to URL querystring (e.g. `?mixed=true&eeg=true&lp=false`) for MIS-8
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Create components/BinIchBetroffen.tsx — 'use client' component with 4 progressive questions, state machine (mixed/eeg/netz/lp), verdict computation, URL querystring sync via useSearchParams/useRouter, Suspense wrapper
2. Update app/page.tsx — import and render BinIchBetroffen below existing heading
3. Verify: npm run build exits 0 (TypeScript strict)
4. Commit on tasks/back-mis-5

Decision tree logic:
- Q1 No → Green (no mixed-use)
- Q1 Yes, Q2 No → Green (no EEG at NAP)
- Q1 Yes, Q2 Yes, Q3 Netz → Red (netz-dominant → definitely affected)
- Q1 Yes, Q2 Yes, Q3 PV, Q4 Lp Yes → Red (with Ladepunkt)
- Q1 Yes, Q2 Yes, Q3 PV, Q4 Lp No → Amber (möglicherweise betroffen)

Querystring: ?mixed=true&eeg=true&netz=false&lp=false (feeds MIS-8)
Citations: §19 Abs. 3b/3c EEG, §85d EEG 2023, BK6-25-038
<!-- SECTION:PLAN:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Added `components/BinIchBetroffen.tsx` — a 4-step progressive decision tree rendered on `/`.

**Decision logic:**
- Q1 (Mixed-Use?) No → Green
- Q2 (EEG at NAP?) No → Green
- Q3 (Netz/PV-Anteil) Netz-dominant → Red
- Q3 PV-dominant, Q4 (Ladepunkt?) Yes → Red
- Q3 PV-dominant, Q4 No → Amber

**Verdicts (exact text per AC):**
- Green: 'Nicht betroffen — MiSpeL gilt nicht für Ihre Anlage' + §19 Abs. 3b/3c EEG basis
- Amber: 'Möglicherweise betroffen — abhängig von Ihrer Messkonzept-Wahl' + Pauschaloption explanation
- Red: 'Betroffen — MiSpeL gilt; Abgrenzungs- oder Pauschaloption erforderlich' + link to #chooser

**Citations:** §19 Abs. 3b/3c EEG 2023 · §85d EEG 2023 · BK6-25-038 on every verdict.

**Querystring:** `?mixed=bool&eeg=bool&netz=bool&lp=bool` — synced via useSearchParams/useRouter, Suspense-wrapped for Next.js 15 compatibility. Feeds MIS-8.

**Changes:**
- `components/BinIchBetroffen.tsx` — new client component (~220 lines)
- `app/page.tsx` — updated to render BinIchBetroffen below heading

**Verification:** `npm run build` exits 0, TypeScript strict, 4 static pages compiled.
<!-- SECTION:FINAL_SUMMARY:END -->
