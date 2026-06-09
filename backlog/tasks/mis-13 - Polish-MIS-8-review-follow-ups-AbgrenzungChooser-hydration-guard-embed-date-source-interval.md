---
id: MIS-13
title: >-
  Polish: MIS-8 review follow-ups (AbgrenzungChooser hydration guard, embed date
  source, interval)
status: Needs Input
assignee:
  - '@sub-agent'
created_date: '2026-06-09 16:49'
updated_date: '2026-06-09 22:03'
labels:
  - polish
  - mis-8-followup
dependencies:
  - MIS-8
priority: low
ordinal: 15000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
## Synopsis
**State:** Needs Input · **Stage:** blocked — MIS-8 not merged into main / **Next:** merge MIS-8 (PR#14) into main, then re-queue MIS-13.

Deferred non-blocking findings from PR#14 (MIS-8) review, after the red back-button regression was fixed + merged. Yellow: AbgrenzungChooser URL-sync effect fires with DEFAULTS before its hydration effect reads the URL (brief window where window.location.search has default chooser params) — add the same 'hydrated' guard BinIchBetroffen uses. Green: app/embed/countdown/page.tsx hardcodes '30.06.2026'/'01.07.2026' label strings that duplicate DEADLINE_UTC in lib/deadline.ts — derive from DEADLINE_UTC or comment-link. Minor: embed countdown uses a 60s setInterval for a days-only display — 1h interval is equivalent with 60x less overhead.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 AbgrenzungChooser has a 'hydrated' flag guarding its URL-sync effect (no default-write race), matching BinIchBetroffen
- [ ] #2 Embed countdown label dates derive from DEADLINE_UTC (lib/deadline.ts) — single source of truth, no duplicated literals
- [ ] #3 Embed countdown interval is 1h (not 60s) for the days-only display
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
## Needs Input
MIS-8 (PR#14) not merged into main — all three ACs depend on files that only exist on `tasks/back-mis-8`.

### Trigger
Mandatory trigger: **Discovered dependency** — MIS-13's worktree is based on `main` (HEAD `245b2da`). All three ACs require code from `tasks/back-mis-8` that is not in main: `lib/deadline.ts` (AC#2), `app/embed/countdown/page.tsx` (AC#2, AC#3), and the URL-sync changes to `components/AbgrenzungChooser.tsx` (AC#1). Cannot cherry-pick or check out `tasks/back-mis-8`.

### Context
Explored the worktree — `lib/deadline.ts`, `app/embed/countdown/page.tsx`, and the updated `AbgrenzungChooser.tsx` with URL-sync are absent from main. They exist only on `tasks/back-mis-8`. MIS-8 has all ACs checked and a PR (#14) open at https://github.com/cloudbeagle/mispel-deadline-tracker/pull/14. The branch has a 'Address PR review findings' commit that fixed the red finding (BinIchBetroffen setState side-effect). The branch is local-only (not pushed to origin/tasks/back-mis-8).

### Options considered
1. Escalate and wait for MIS-8 to merge — correct per protocol.
2. Apply MIS-8 code from the local branch to MIS-13's worktree — violates the 'do not cherry-pick' rule.
3. Rebase tasks/back-mis-13 on tasks/back-mis-8 — not within agent scope.

### Recommendation
Merge PR#14 (MIS-8) into main first, then re-queue MIS-13. All three changes are tiny and straightforward once the base code is present.
<!-- SECTION:NOTES:END -->
