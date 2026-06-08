---
id: MIS-7
title: Build plain-language regulatory explainer section
status: Done
assignee:
  - '@sub-agent'
created_date: '2026-06-08 19:16'
updated_date: '2026-06-08 22:19'
labels: []
dependencies:
  - MIS-2
references:
  - context/initial-prd.md#4
  - context/regulatory-fact-check.md
priority: medium
ordinal: 7000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
**State:** Done · **Stage:** implementation complete / **Next:** none; narrator will document.

German-language explainer section covering: what MiSpeL is, who is affected, the two options (Abgrenzungsoption and Pauschaloption) and what each demands metering-wise, and the key source links. Per PRD §4 feature 4. Every factual claim links to its primary source (BNetzA Verfahrensseite, §85d EEG, Konsultationsentwurf). Invite-correction CTA at the bottom per PRD §8 credential guardrail.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Section covers: Was ist MiSpeL?, Wer ist betroffen?, Abgrenzungsoption (§19 Abs. 3b EEG) plain-language summary, Pauschaloption (§19 Abs. 3c EEG) plain-language summary
- [x] #2 Abgrenzungsoption description includes: viertelstündliche Messung, formelbasierte Zuordnung Grün-/Graustrom, Messkosten-implication
- [x] #3 Pauschaloption description includes: vereinfachter Pauschalansatz, minimale Messanforderung, pauschaler Förder-/Anrechnungsschnitt
- [x] #4 Every claim hyperlinks to primary source: BNetzA Verfahrensseite BK6-25-038, §85d EEG 2023, Konsultationsentwurf 18.09.2025
- [x] #5 Invite-correction CTA: 'Wo vereinfache ich zu stark? Was fehlt? Sag mir, was Deine Praxis anders sieht.' with contact link
- [x] #6 'Was dieses Tool NICHT ist' anti-promise block: keine Rechtsberatung, kein offizielles BNetzA-Tool, Entscheidungshilfe in Größenordnung
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Create components/RegulatoryExplainer.tsx — standalone React component (no deps on MIS-2 scaffold being merged; just a new file)
2. Sections: Was ist MiSpeL? → Wer ist betroffen? → Abgrenzungsoption → Pauschaloption → Was dieses Tool NICHT ist → Invite-correction CTA
3. Sources to hyperlink:
   - BNetzA Verfahrensseite BK6-25-038: https://www.bundesnetzagentur.de/DE/Fachthemen/ElektrizitaetundGas/ErneuerbareEnergien/EEG_Aufsicht/MiSpeL/start.html
   - §85d EEG 2023: https://www.gesetze-im-internet.de/eeg_2023/__85d.html
   - §19 Abs. 3b/3c EEG: https://www.gesetze-im-internet.de/eeg_2023/__19.html
   - Konsultationsentwurf 18.09.2025: link via BNetzA Verfahrensseite
4. Contact link: mailto:gaylord.zach@s2tberlin.com per session user email
5. Style: follow MIS-4 component patterns (rounded-lg border bg-card px-6 py-5, Tailwind, TSX)
6. Commit on branch tasks/back-mis-7
7. Check all ACs, write final summary, set Done
<!-- SECTION:PLAN:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Created `components/RegulatoryExplainer.tsx` — a standalone React/Tailwind component with six content sections in German.

**Sections delivered:**
- Was ist MiSpeL? — definition, BNetzA Az. BK6-25-038, §85d EEG 2023 deadline, and Konsultationsentwurf context
- Wer ist betroffen? — Co-Location BESS+PV operators, Ladepunktbetreiber, clear exclusion case
- Abgrenzungsoption (§19 Abs. 3b EEG) — viertelstündliche Messung, formelbasierte Grün-/Graustrom-Zuordnung, Messkosten-Implication
- Pauschaloption (§19 Abs. 3c EEG) — vereinfachter Pauschalansatz, minimale Messanforderung, pauschaler Förder-/Anrechnungsschnitt
- Was dieses Tool NICHT ist — keine Rechtsberatung, kein BNetzA-Tool, Entscheidungshilfe in Größenordnung (orange callout box)
- Praxisfeedback-CTA — exact invite-correction text + mailto contact link (blue callout box)

**Source hyperlinks wired to all factual claims:**
- BNetzA Verfahrensseite BK6-25-038 (start.html + artikel.html for Konsultationsentwurf)
- §85d EEG 2023 (gesetze-im-internet.de)
- §19 Abs. 3b/3c EEG (gesetze-im-internet.de)

**Style:** Follows MIS-4 component patterns (rounded-lg border bg-card, Tailwind, TSX). Ready to import into app/page.tsx alongside existing MIS-4 components.

**Commit:** 9311ab5 on branch tasks/back-mis-7
<!-- SECTION:FINAL_SUMMARY:END -->
