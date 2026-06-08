---
id: MIS-8
title: Implement querystring state and embeddable countdown iframe
status: To Do
assignee: []
created_date: '2026-06-08 19:16'
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
Two distribution mechanics per PRD §6. (1) Querystring state: encode decision tree + chooser inputs in the URL so any result is shareable as a link. (2) Embeddable countdown: a `/embed/countdown` route that renders an iframe-friendly countdown widget for Kanzlei/blog embedding. "Copy embed" button outputs a one-line `<iframe>` snippet.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Decision tree state and chooser inputs read from URL querystring on page load and re-hydrate the form
- [ ] #2 Changing inputs updates the URL querystring without page reload (history.replaceState)
- [ ] #3 A 'Link teilen' button copies the current URL to clipboard
- [ ] #4 `/embed/countdown` route renders a minimal countdown widget (days remaining + status label) with no navigation chrome
- [ ] #5 Countdown embed is iframe-friendly: `X-Frame-Options` not set to DENY, layout works at 400x120px
- [ ] #6 'Einbetten' button on the main page copies `<iframe src=".../embed/countdown" ...>` to clipboard
- [ ] #7 All querystring params documented in a comment in the relevant component
<!-- AC:END -->
