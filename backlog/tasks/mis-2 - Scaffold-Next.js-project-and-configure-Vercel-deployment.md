---
id: MIS-2
title: Scaffold Next.js project and configure Vercel deployment
status: Needs Input
assignee:
  - '@sub-agent'
created_date: '2026-06-08 19:15'
updated_date: '2026-06-08 19:23'
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
**State:** Needs Input · **Stage:** blocked on Vercel auth — AC #3 requires `vercel login` before deployment can be verified
**Next:** Run `vercel login` in the worktree (or set VERCEL_TOKEN), then `vercel link` + `vercel --prod` to satisfy AC #3.

Bootstrap the public GitHub repo and development environment for the MiSpeL Deadline & Decision Tracker. Stack: Next.js 15 + React 19 + Tailwind CSS + shadcn/ui. Deploy target: Vercel free tier. Public repo under user's personal GitHub account. All subsequent MIS tasks depend on this scaffold.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Public GitHub repo created (personal account), default branch `main`
- [x] #2 Next.js 15 + React 19 + Tailwind CSS + shadcn/ui installed; `npm run dev` starts clean
- [ ] #3 Vercel project linked to repo; `vercel --prod` deploys without error
- [x] #4 ESLint + TypeScript strict mode enabled; `npm run build` exits 0
- [x] #5 `.gitignore` covers `.env*`, `node_modules`, `.next`, `.vercel`
- [x] #6 Root `/` renders a placeholder 'MiSpeL Deadline Tracker' heading
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

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
## Needs Input
Vercel CLI not installed and no auth available — cannot run `vercel --prod` to satisfy AC #3.

### Trigger
Mandatory escalation trigger #5: out-of-context runtime info — need Vercel account credentials not exposed in task or repo. No `VERCEL_TOKEN` env var, no `~/.vercel/` auth file found.

### Context
All other ACs are complete and committed on branch `tasks/back-mis-2`:
- AC #1: repo cloudbeagle/mispel-deadline-tracker is public, default branch renamed master→main ✓
- AC #2: Next.js 15.5.19 + React 19 + Tailwind v4 + shadcn/ui scaffolded ✓
- AC #4: TypeScript strict + ESLint enabled; `npm run build` exits 0 ✓
- AC #5: .gitignore covers .env*, node_modules/, .next/, .vercel ✓
- AC #6: Root / renders 'MiSpeL Deadline Tracker' heading ✓

The commit is at `045fb35` on branch `tasks/back-mis-2`.

### Options considered
1. **Human runs `vercel login` + `vercel link` + `vercel --prod`** — the cleanest path. Vercel CLI is installable via `npm install -g vercel`.
2. **Set VERCEL_TOKEN env var** — allows non-interactive auth if user has a Vercel access token (Project Settings → Tokens on vercel.com).
3. **Skip AC #3** — accept the PR without Vercel connected; wire Vercel via GitHub integration in the dashboard (no CLI needed). This changes the verification method but achieves the same deploy-on-push outcome.

### Recommendation
Option 1 or Option 3. Option 3 (GitHub→Vercel dashboard integration) is the recommended Vercel free-tier pattern and avoids needing Vercel CLI at all. Human steps: (a) go to vercel.com → New Project → Import from GitHub → select cloudbeagle/mispel-deadline-tracker; (b) deploy; (c) mark AC #3 done. No local CLI needed.

## Agent Recommendations
**Recommended path (Option 3 — no CLI needed):**
1. Go to https://vercel.com → New Project
2. Import from GitHub → select `cloudbeagle/mispel-deadline-tracker`
3. Deploy (Vercel auto-detects Next.js, no config needed)
4. Confirm deploy succeeds
5. Mark AC #3 done, set task status → Done
**Alternative path (Option 1 — CLI):**
```bash
npm install -g vercel
cd /Users/gzach/taskpilot-worktrees/mis-2
vercel login
vercel link  # link to existing project or create new
vercel --prod
```
After Vercel is connected, mark AC #3 done and close the task.

## PR
https://github.com/cloudbeagle/mispel-deadline-tracker/pull/2
<!-- SECTION:NOTES:END -->
