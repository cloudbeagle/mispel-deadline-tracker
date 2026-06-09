---
id: MIS-8
title: Implement querystring state and embeddable countdown iframe
status: Done
assignee:
  - '@sub-agent'
created_date: '2026-06-08 19:16'
updated_date: '2026-06-09 00:04'
labels: []
dependencies:
  - MIS-5
  - MIS-6
references:
  - context/initial-prd.md#6
priority: medium
ordinal: 8000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
## Synopsis
**State:** Done · **Stage:** narrated
**Next:** Merge PR / human review pending.

Two distribution mechanics per PRD §6 now implemented: (1) Querystring state — decision tree and chooser inputs encoded in URL for shareable results; (2) Embeddable countdown — `/embed/countdown` route renders 400×120px iframe-friendly countdown widget for partner sites. Share buttons copy both shareable URL and iframe snippet.

See [doc-mis-8 - Querystring State and Embeddable Countdown](backlog/docs/doc-mis-8%20-%20Querystring%20State%20and%20Embeddable%20Countdown.md) for implementation details.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Decision tree state and chooser inputs read from URL querystring on page load and re-hydrate the form
- [x] #2 Changing inputs updates the URL querystring without page reload (history.replaceState)
- [x] #3 A 'Link teilen' button copies the current URL to clipboard
- [x] #4 `/embed/countdown` route renders a minimal countdown widget (days remaining + status label) with no navigation chrome
- [x] #5 Countdown embed is iframe-friendly: `X-Frame-Options` not set to DENY, layout works at 400x120px
- [x] #6 'Einbetten' button on the main page copies `<iframe src=".../embed/countdown" ...>` to clipboard
- [x] #7 All querystring params documented in a comment in the relevant component
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Refactor BinIchBetroffen: remove Next.js router deps, use window.history.replaceState; preserve chooser params when updating tree state; add param-docs comment.
2. Update AbgrenzungChooser: preserve decision-tree params when updating chooser state; add param-docs comment.
3. Create components/ShareBar.tsx: "Link teilen" copies current URL; "Einbetten" copies iframe snippet.
4. Update app/page.tsx: import and render ShareBar after countdown card.
5. Create app/embed/countdown/page.tsx: minimal 400x120px countdown widget, no chrome, client-side timer.
6. Update next.config.ts: add CSP frame-ancestors * header for /embed/* routes (iframe-friendly).
7. Commit and check off ACs.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
## Agent Recommendations
- Open PR against main; no follow-up tasks needed for this scope

## PR
https://github.com/cloudbeagle/mispel-deadline-tracker/pull/14
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Implemented both distribution mechanics from PRD §6.

**Querystring state (AC #1, #2, #7):**
- `BinIchBetroffen`: removed Next.js router dependency; now uses `window.history.replaceState` to update URL on every answer. Hydrates from `window.location.search` on mount. Preserves chooser params (`groesse`, `netzanteil`, `erloese`, `messtechnik`) when writing tree params.
- `AbgrenzungChooser`: updated URL-write logic to merge with existing params instead of replacing the whole querystring, so tree params survive chooser changes. Both components document their querystring params in a block comment.

**Share buttons (AC #3, #6):**
- New `components/ShareBar.tsx` client component with two buttons placed after the countdown card in `app/page.tsx`:
  - "Link teilen" — copies `window.location.href` (includes full form state)
  - "Einbetten" — copies a one-line `<iframe src="[origin]/embed/countdown" width="400" height="120" ...>` snippet

**Embeddable countdown (AC #4, #5):**
- New `app/embed/countdown/page.tsx`: client component, 400×120px inline-styled div, no navigation chrome, live countdown (60s interval), shows days remaining + deadline label, degrades gracefully after deadline.
- `next.config.ts` updated with `Content-Security-Policy: frame-ancestors *` for all `/embed/*` routes.

**Build:** `next build` passes cleanly, all 6 routes render as static.
<!-- SECTION:FINAL_SUMMARY:END -->
