---
id: MIS-5
title: Build "Bin ich betroffen?" decision tree
status: To Do
assignee: []
created_date: '2026-06-08 19:15'
labels: []
dependencies:
  - MIS-2
references:
  - context/initial-prd.md#4
  - context/regulatory-fact-check.md#Claim3
priority: high
ordinal: 5000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
3–4 question decision tree that tells an operator whether MiSpeL applies to their asset. Outputs green / amber / red verdict with plain-language explanation. Per PRD §4 feature 2: questions cover Mixed-Use/Co-Location?, EEG-Anlage beteiligt?, Speicher oder Ladepunkt?. Verdict must cite the relevant legal basis (§19 Abs. 3b/3c EEG, §118 Abs. 6 EnWG). State must be encodable in querystring for sharing (feeds MIS-8).
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Decision tree renders at `/` below the hero (or as a distinct section)
- [ ] #2 Exactly 3–4 questions covering: (1) Mixed-Use/Co-Location-Speicher?, (2) EEG-Anlage am selben Netzanschlusspunkt?, (3) Netz- oder Photovoltaik-Anteil beim Laden?, (4) Ladepunkt-Betreiber?
- [ ] #3 Green verdict: 'Nicht betroffen — MiSpeL gilt nicht für Ihre Anlage' with legal basis cited
- [ ] #4 Amber verdict: 'Möglicherweise betroffen — abhängig von Ihrer Messkonzept-Wahl' with explanation
- [ ] #5 Red verdict: 'Betroffen — MiSpeL gilt; Abgrenzungs- oder Pauschaloption erforderlich' with next-step link to chooser
- [ ] #6 Verdict includes inline source citation (§85d EEG 2023, BK6-25-038)
- [ ] #7 Decision state serialisable to URL querystring (e.g. `?mixed=true&eeg=true&lp=false`) for MIS-8
<!-- AC:END -->
