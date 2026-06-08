---
id: MIS-12
title: Wire GitHub->Vercel auto-deploy so merges to main deploy automatically
status: Needs Input
assignee:
  - '@sub-agent'
created_date: '2026-06-08 23:07'
updated_date: '2026-06-08 23:09'
labels:
  - infra
  - vercel
  - deploy
dependencies: []
priority: high
ordinal: 14000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
**State:** Needs Input · **Stage:** operator credentials missing — Vercel project ID/org ID not in repo; dashboard access required / **Next:** operator must connect GitHub integration on vercel.com OR provide project credentials for GitHub Actions path.

Surfaced 2026-06-09: the live site served a 2h-stale scaffold-only build because Vercel was linked via CLI (one manual 'vercel --prod') with NO GitHub integration — merges to main never trigger a deploy. Nanny has been redeploying manually. Wire the Vercel project's Git integration (vercel.com -> Project -> Settings -> Git -> connect cloudbeagle/mispel-deadline-tracker) so every push to main auto-builds+deploys to production, and PRs get preview deploys. Needs operator dashboard action (like the original AC#3). Until wired, every merge requires a manual redeploy.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Vercel project Git integration connected to cloudbeagle/mispel-deadline-tracker; push to main auto-deploys to production without manual 'vercel --prod'
- [ ] #2 Pull requests get Vercel preview deployments (enables browser validation per the testing-agent gap)
- [ ] #3 A merge to main is verified to appear on https://mispel-deadline-tracker.vercel.app within minutes, no manual step
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
## Needs Input
Vercel project ID, org ID, and dashboard access are absent from the repo — cannot implement any deployment wiring without them.

### Trigger
Trigger #1 (Undefined reference): VERCEL_PROJECT_ID, VERCEL_ORG_ID, and VERCEL_TOKEN are not defined anywhere in the task, linked docs, or repo. Trigger #5 (Out-of-context runtime info): native Git integration requires operator login to vercel.com dashboard.

### Context
Investigated worktree at /Users/gzach/taskpilot-worktrees/mis-12:
- No `.vercel/` directory (project was deployed manually, config not committed or gitignored)
- No `.github/` directory (no existing GitHub Actions workflows)
- No `vercel.json` present
- Cannot determine Vercel project name, org, or project ID from any repo file

### Options Considered
**Option A — Native Vercel Git Integration (what the task describes)**
- Go to vercel.com → mispel-deadline-tracker project → Settings → Git → connect cloudbeagle/mispel-deadline-tracker
- Auto-deploys + PR previews enabled with zero code changes
- Requires: operator dashboard access to vercel.com
- Pro: simplest, no code to maintain, PR comments with preview URLs built-in
- Con: requires human action on vercel.com

**Option B — GitHub Actions workflow**
- Create `.github/workflows/deploy.yml` using `amondnet/vercel-action` or `vercel/actions`
- Triggers `vercel --prod` on push to main, preview deploys on PRs
- Requires: VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID added as GitHub Secrets
- Pro: all config in code, auditable
- Con: secrets still require operator setup; needs project ID/org ID (not in repo)

### Recommendation
Option A is simpler and zero-maintenance. Steps:
1. Log into vercel.com with the account that owns mispel-deadline-tracker
2. Open the project → Settings → Git
3. Click 'Connect Git Repository' → select cloudbeagle/mispel-deadline-tracker
4. Set Production Branch = main
5. Save → push any commit to main to verify AC#3

If Option B is preferred, provide VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID and this agent can create the workflow file and check off all ACs programmatically.
<!-- SECTION:NOTES:END -->
