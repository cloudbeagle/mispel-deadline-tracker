---
id: MIS-2
title: Scaffold Next.js project and configure Vercel deployment
status: In Progress
assignee:
  - '@sub-agent'
created_date: '2026-06-08 19:15'
updated_date: '2026-06-08 19:18'
labels: []
dependencies: []
references:
  - context/initial-prd.md
  - context/cleantech-credentials-handoff.md
priority: high
ordinal: 2000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
## Synopsis
**State:** In Progress · **Stage:** build — scaffolding Next.js 15 + React 19 + Tailwind + shadcn/ui; making repo public; handling default branch; will escalate for Vercel auth
**Next:** none; agent running.

Bootstrap the public GitHub repo and development environment for the MiSpeL Deadline & Decision Tracker. Stack: Next.js 15 + React 19 + Tailwind CSS + shadcn/ui. Deploy target: Vercel free tier. Public repo under user's personal GitHub account. All subsequent MIS tasks depend on this scaffold.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Public GitHub repo created (personal account), default branch `main`
- [ ] #2 Next.js 15 + React 19 + Tailwind CSS + shadcn/ui installed; `npm run dev` starts clean
- [ ] #3 Vercel project linked to repo; `vercel --prod` deploys without error
- [ ] #4 ESLint + TypeScript strict mode enabled; `npm run build` exits 0
- [ ] #5 `.gitignore` covers `.env*`, `node_modules`, `.next`, `.vercel`
- [ ] #6 Root `/` renders a placeholder 'MiSpeL Deadline Tracker' heading
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
## Plan

1. Make GitHub repo public via `gh repo edit --visibility public`
2. Rename default branch master→main (gh + git)
3. Create Next.js 15 scaffold manually (package.json, tsconfig, next.config, postcss, app/, lib/, components.json)
4. Configure TypeScript strict mode + ESLint
5. Set up .gitignore (.env*, node_modules, .next, .vercel)
6. Root page with 'MiSpeL Deadline Tracker' placeholder heading
7. Run `npm install` + `npm run build` to verify AC #4
8. Commit all changes
9. Escalate for AC #3: no Vercel CLI auth available
<!-- SECTION:PLAN:END -->
