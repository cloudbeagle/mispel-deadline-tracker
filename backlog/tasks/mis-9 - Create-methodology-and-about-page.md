---
id: MIS-9
title: Create methodology and about page
status: Done
assignee:
  - '@sub-agent'
created_date: '2026-06-08 19:16'
updated_date: '2026-06-08 22:22'
labels: []
dependencies:
  - MIS-2
references:
  - context/initial-prd.md#6
  - context/initial-prd.md#8
modified_files:
  - app/methodik/page.tsx
  - app/page.tsx
priority: medium
ordinal: 10000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
## Synopsis
**State:** Done · **Stage:** narrated
**Next:** Merge PR / human review pending.

Standalone `/methodik` page per PRD §6 viral design. Named author, all data sources, all computation assumptions, anti-promise section, and the free 30-min consultation reach-out hook. This is the trust layer that makes the credential credible to the Stellungnahme-author audience who will fact-check it.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Page exists at `/methodik` and is linked from the main page footer
- [x] #2 Named author block: 'kuratiert von Gaylord Zach — curious operator w/ deep product+eng background — keine Rechtsberatung' with LinkedIn link
- [x] #3 All primary sources listed: BNetzA Verfahrensseite BK6-25-038, §85d EEG 2023, §19 Abs. 3b/3c EEG, Konsultationsentwurf 18.09.2025, §118 Abs. 6 EnWG
- [x] #4 All Abgrenzung/Pauschale computation assumptions listed with values and 'Annahme' tag; open numbers flagged 'noch offen — Festlegung ausstehend'
- [x] #5 Anti-promise block: 'keine Rechtsberatung; kein offizielles BNetzA-Tool; Entscheidungshilfe in Größenordnung, finale Festlegung maßgeblich'
- [x] #6 Reach-out hook: 'MiSpeL ein Blackbox? 30-Min-Walkthrough, kostenlos bis 30.06.' with contact CTA
- [x] #7 Page has correct `<title>` and `<meta description>` for SEO
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Create app/methodik/page.tsx with metadata export (title + description) and all required sections\n2. Add footer with /methodik link to app/page.tsx\n3. Build: npm run build to verify no TS/ESLint errors\n4. Commit on tasks/back-mis-9\n5. Check off all ACs
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
## Agent Recommendations
- PR ready to merge on `tasks/back-mis-9`; orchestrator handles merge
- Once final Festlegung publishes: update the 2 open assumptions in `app/methodik/page.tsx` ASSUMPTIONS array

## PR
https://github.com/cloudbeagle/mispel-deadline-tracker/pull/11
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Added /methodik standalone page and footer link for the MiSpeL Deadline Tracker.

Changes:
- `app/methodik/page.tsx` — new static route at /methodik with Next.js `metadata` export (title + description for SEO); sections: author block with LinkedIn, anti-promise callout, 6 primary sources with descriptions, 6 Abgrenzung/Pauschale computation assumptions tagged Annahme / noch-offen, and 30-Min-Walkthrough reach-out CTA with mailto link
- `app/page.tsx` — footer added linking to /methodik plus author line with LinkedIn

Verification:
- `npm run build` exit 0; 5/5 static pages including /methodik (162 B)

Notes:
- 2 open assumptions (Pauschalabschlag + Graustrompauschale) are flagged 'noch offen — Festlegung ausstehend' per PRD §5 guidance; will populate once BNetzA publishes final Festlegung BK6-25-038
- LinkedIn URL `https://www.linkedin.com/in/gaylordzach/` matches pattern from MIS-10; verify before publishing
<!-- SECTION:FINAL_SUMMARY:END -->
