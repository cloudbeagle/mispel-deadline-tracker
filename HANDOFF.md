## HANDOFF: @sub-agent -> groomer/builder

### Summary
- Read PRD (`context/initial-prd.md`) and all linked context docs (regulatory-fact-check.md, cleantech-credentials-handoff.md, venture-research-output.md, PILOT-HANDOFF.md)
- Created 12 backlog tasks covering the full v0 scope of the MiSpeL Deadline & Decision Tracker

### Tasks Created

| ID | Title | Status | Ordinal | Notes |
|----|-------|--------|---------|-------|
| MIS-2 | Scaffold Next.js project and configure Vercel deployment | To Do | 2000 | All other tasks depend on this |
| MIS-3 | Create status.json data layer for BNetzA procedural state | To Do | 3000 | Feeds MIS-4, DRAFT-1 |
| MIS-4 | Build status banner and live countdown hero component | To Do | 4000 | Core v0 feature 1 |
| MIS-5 | Build "Bin ich betroffen?" decision tree | To Do | 5000 | Core v0 feature 2 |
| MIS-6 | Build Abgrenzung vs. Pauschale economic chooser | To Do | 6000 | Core v0 feature 3 — credential core |
| MIS-7 | Build plain-language regulatory explainer section | To Do | 7000 | Core v0 feature 4 |
| MIS-8 | Implement querystring state and embeddable countdown iframe | To Do | 8000 | Depends on MIS-5, MIS-6 |
| DRAFT-1 | Build server-rendered OG card for social sharing | Draft | 9000 | Needs grooming: card copy, regen strategy |
| MIS-9 | Create methodology and about page | To Do | 10000 | `/methodik` route |
| MIS-10 | Write German README and commit license files | To Do | 11000 | MIT + CC BY 4.0 |
| MIS-11 | Draft LinkedIn companion post for launch | To Do | 13000 | Saves to `content/linkedin-launch-post.md` |
| DRAFT-2 | Integrate Plausible analytics and configure daily-social auto-post | Draft | 12000 | Needs grooming: social platform + API credentials decision |

### Files Modified
- `backlog/tasks/mis-1 - Read-initial-PRD-and-break-down-into-tasks.md` — status → Done, plan + synopsis written
- `backlog/tasks/mis-2` through `mis-11` — created
- `backlog/drafts/draft-1`, `draft-2` — created (Draft status; need groomer)
- `HANDOFF.md` — this file

### Verification
- `mcp__backlog__task_list` confirms all tasks present
- Task IDs follow `mis-N` prefix per project config
- 10 To Do tasks (build-ready with ACs) + 2 Draft tasks (need grooming) = 12 total
- Pilot guidance target of 8–12 tasks met

### Open Questions
- **DRAFT-1 (OG card)**: card copy, font/color spec, per-chooser-result variant vs single card, Vercel free-tier daily regen strategy (no-cache vs ISR) — needs human decision
- **DRAFT-2 (analytics + social)**: which social platform(s) for auto-post, API credentials, cron host (GitHub Actions vs Vercel cron), Plausible cloud vs self-hosted — needs human decision
- **MIS-6 computation assumptions**: several Abgrenzung/Pauschale coefficients are genuinely open (Festlegung not yet issued). Builder must label these 'Annahme — noch offen' rather than inventing values

### Recommendations
1. Run MIS-2 first (scaffold blocks everything); MIS-3 can go in parallel once repo exists
2. MIS-4, MIS-5, MIS-6, MIS-7 are the four core v0 features — can build in parallel after scaffold
3. Groom DRAFT-1 and DRAFT-2 before they enter the build queue; both need a short human decision
4. MIS-6 (chooser) is highest-effort and highest-value — budget extra time; computation assumptions need flagging not inventing
5. v0 deadline: 30.06.2026. As of 2026-06-08 that is ~22 days. Prioritise MIS-2→MIS-6 this week.
