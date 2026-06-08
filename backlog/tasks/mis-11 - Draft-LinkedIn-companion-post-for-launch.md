---
id: MIS-11
title: Draft LinkedIn companion post for launch
status: Done
assignee:
  - '@sub-agent'
created_date: '2026-06-08 19:17'
updated_date: '2026-06-08 20:55'
labels: []
dependencies:
  - MIS-2
references:
  - context/initial-prd.md#6
  - context/cleantech-credentials-handoff.md
priority: low
ordinal: 13000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
**State:** Done · **Stage:** implementation complete / **Next:** none; narrator will document.

Companion LinkedIn post per PRD §6 and DoD item 3. Hook: deadline-bearing-down framing. Target audience: DE energy-law + storage LinkedIn crowd. Per cleantech-credentials-handoff.md project #2: 'MiSpeL in plain English — und ein kostenloser Deadline-Tracker.' Post should tag/cite the bne/EnBW/1KOMMA5° Stellungnahme authors. Output: a ready-to-publish post saved in the repo.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Post draft saved to `content/linkedin-launch-post.md` in the repo
- [x] #2 Opening hook references the 30.06.2026 deadline bearing down (not abstract; specific days remaining at time of writing)
- [x] #3 Body covers: what MiSpeL is in 2 sentences, Abgrenzung vs. Pauschale choice in 1 sentence, link to the tool
- [x] #4 Mentions at least 2 named Stellungnahme-author orgs (bne, EnBW, 1KOMMA5°) as 'they submitted formal comments'
- [x] #5 Ends with reach-out CTA: '30 Minuten kostenlose Beratung bis 30.06. — ping mich'
- [x] #6 Domain-honest framing: no 'Energierechts-Experte' claim; 'curious operator' framing
- [x] #7 Word count 150–250 words (DE LinkedIn sweet spot)
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Read PRD §6 + cleantech-credentials-handoff.md §Project-2 for framing + required elements
2. Draft DE LinkedIn post (150-250 words): hook=22 Tage until 30.06.2026, 2-sentence MiSpeL def, 1-sentence Abgrenzung/Pauschale, cite bne/EnBW/1KOMMA5°, CTA
3. Save post to content/linkedin-launch-post.md
4. Verify word count + all 7 ACs
5. Check all ACs via CLI, write final summary, set Done
<!-- SECTION:PLAN:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Added `content/linkedin-launch-post.md` — a 170-word DE LinkedIn post ready to publish at launch.

Post structure:
- Hook: "22 Tage bis zur MiSpeL-Frist" + 30.06.2026 + §85d EEG 2023 citation (AC2)
- 2-sentence MiSpeL definition citing Az. BK6-25-038 (AC3)
- 1-sentence Abgrenzung vs. Pauschale framing with §19 Abs. 3b/3c references (AC3)
- bne, EnBW, 1KOMMA5° cited as formal-comment submitters (AC4)
- Curious-operator framing; explicit "Kein Energierechts-Experte" (AC6)
- CTA: "30 Minuten kostenlose Beratung bis 30.06. — ping mich" (AC5)
- Word count ~170 (AC7)
- [Link] placeholder — update with live Vercel URL when MIS-2 deploys (AC1)

Publishing notes embedded as HTML comment: schedule mid-week DACH morning, tag orgs, cross-post to r/Photovoltaik + r/Speichertechnik.

Committed: 8a7f1b0 on tasks/back-mis-11.
<!-- SECTION:FINAL_SUMMARY:END -->
