---
id: DRAFT-2
title: Integrate Plausible analytics and configure daily-social auto-post
status: Draft
assignee: []
created_date: '2026-06-08 19:17'
labels: []
dependencies:
  - MIS-2
references:
  - context/initial-prd.md#10
  - context/cleantech-credentials-handoff.md
priority: low
ordinal: 12000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Two distribution/measurement mechanics from PRD §10 DoD item 7. (1) Plausible analytics: DSGVO-friendly, no cookie banner, tracks page views + chooser completions. (2) Daily-social auto-post: automated daily post with 'X Tage bis MiSpeL' to seed the social account.

Needs grooming to specify: which social platform(s) for auto-post, what API/token is available, whether the post fires from a GitHub Action cron or a Vercel cron job, and whether Plausible is self-hosted or cloud (cloud.plausible.eu free tier requires a domain). The 'daily-social auto-post' scope is ambiguous — escalate if no social API credentials or platform decision exists.
<!-- SECTION:DESCRIPTION:END -->
