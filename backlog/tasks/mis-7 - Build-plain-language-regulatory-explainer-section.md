---
id: MIS-7
title: Build plain-language regulatory explainer section
status: Done
assignee:
  - '@sub-agent'
created_date: '2026-06-08 19:16'
updated_date: '2026-06-08 22:28'
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
**State:** Done · **Stage:** PR review fixes merged

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

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
## PR
https://github.com/cloudbeagle/mispel-deadline-tracker/pull/10 (pre-existing)
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Created `components/RegulatoryExplainer.tsx` — standalone React/Tailwind component with six German-language content sections.

**Sections delivered:**
- Was ist MiSpeL? — definition, BNetzA Az. BK6-25-038, §85d EEG 2023 deadline, Konsultationsentwurf context
- Wer ist betroffen? — Co-Location BESS+PV operators, Ladepunktbetreiber, clear exclusion case
- Abgrenzungsoption (§19 Abs. 3b EEG) — viertelstündliche Messung, formelbasierte Grün-/Graustrom-Zuordnung, Messkosten-Implication
- Pauschaloption (§19 Abs. 3c EEG) — vereinfachter Pauschalansatz, minimale Messanforderung, pauschaler Förder-/Anrechnungsschnitt
- Was dieses Tool NICHT ist — keine Rechtsberatung, kein BNetzA-Tool, Entscheidungshilfe in Größenordnung (orange callout)
- Praxisfeedback-CTA — exact invite-correction text + contact link (blue callout)

**PR review fixes (commit 47a6ca3):**
- Added `import type { ReactNode } from 'react'` — fixed TSC error (React namespace not in scope without explicit import)
- CONTACT_EMAIL now reads `NEXT_PUBLIC_CONTACT_EMAIL` env var with fallback; no hardcoded address in component
- Removed HANDOFF.md from git tracking; added root .gitignore so agent artifacts stay out of repo

**Source hyperlinks:** BNetzA Verfahrensseite BK6-25-038, §85d EEG 2023, §19 Abs. 3b/3c EEG (gesetze-im-internet.de)

**Merge note:** Add `<RegulatoryExplainer />` to `app/page.tsx` below `<WhatHappensExplainer />` when MIS-4 branch merges.
<!-- SECTION:FINAL_SUMMARY:END -->

## Agent Recommendations
- When merging with MIS-4 branch, add `<RegulatoryExplainer />` to `app/page.tsx` below the `<WhatHappensExplainer />` section.
- The `WhatHappensExplainer` from MIS-4 overlaps somewhat with this component (both cover the two options); consider whether to keep both or consolidate. `RegulatoryExplainer` is more detailed and should take precedence.

## PR
https://github.com/cloudbeagle/mispel-deadline-tracker/pull/10

## External Feedback
_PR #10_

**gzach** (review[COMMENTED], 2026-06-08T22:25:43Z):
> <!-- taskpilot-review -->
> 
> ## Review: MIS-7 — RegulatoryExplainer
> 
> ### Findings
> 
> **`components/RegulatoryExplainer.tsx:8`** 🔴 bug: `React.ReactNode` used without importing React. Next.js `react-jsx` transform handles JSX automatically but does not put `React` in scope as a namespace — `React.ReactNode` is a type error and TSC will reject the file. Fix: add `import React from 'react'` at top, or change the annotation to `import type { ReactNode } from 'react'` and use `ReactNode` directly.
> 
> **`components/RegulatoryExplainer.tsx:6`** 🟡 style: `CONTACT_EMAIL` hardcodes a personal address in source. Should be an env var (`NEXT_PUBLIC_CONTACT_EMAIL`) or a project-level config constant so it can change without touching the component.
> 
> **`HANDOFF.md`** 🟡 style: agent working artifact committed to repo root. This file has no value to end users or future contributors; it should be excluded (`.gitignore`) or dropped from the PR.
> 
> **`product-planning/reports/progress-2026-24.md` (journal lines)** 🔵 nit: journal entries are hard-truncated mid-word. Cosmetic — no functional impact.
> 
> ---
> 
> **Summary:** One blocking TSC error (`React.ReactNode` without import). Fix before merge.
> 
> taskpilot-review: CHANGES
<!-- SECTION:NOTES:END -->
