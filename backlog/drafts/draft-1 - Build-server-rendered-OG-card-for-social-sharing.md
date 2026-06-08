---
id: DRAFT-1
title: Build server-rendered OG card for social sharing
status: Draft
assignee: []
created_date: '2026-06-08 19:16'
labels: []
dependencies:
  - MIS-3
  - MIS-4
references:
  - context/initial-prd.md#6
  - context/cleantech-credentials-handoff.md
priority: medium
ordinal: 9000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Server-rendered Open Graph card per PRD §6 viral mechanics. The `/api/og` Next.js route generates a Twitter/LinkedIn card PNG with CURRENT countdown data and procedural status on every share. Card must regenerate daily so the days-remaining number is always live. Per cleantech-credentials-handoff.md §cross-cutting principle 1: 'Server-rendered OG card per URL. Single most under-used leverage.'

Needs grooming to specify: exact card copy, font/color spec, whether a per-chooser-result card variant is required (PRD §6 mentions 'one screenshot must tell the whole story'), and how daily regeneration is achieved on Vercel free tier (revalidate vs. no-cache).
<!-- SECTION:DESCRIPTION:END -->
