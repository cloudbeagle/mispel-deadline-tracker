# Pilot Handoff — taskpilot on `mispel-deadline-tracker`

> **What this is.** The operating model + pilot brief for running taskpilot on a **real,
> non-taskpilot project** under nanny supervision.
> This template ships with taskpilot. At pilot install it is copied into the target repo as
> `context/PILOT-HANDOVER.d`. From then on it is
> the target project's live nanny handoff — rewritten at each shift end, exactly like taskpilot's
> own `product-planning/nanny-handoff.md`.
>
> **Why this pilot exists.** taskpilot has matured entirely by building *itself* (100% dogfood).
> The one thing that has never been tested: does the groom/build/narrate loop work on a backlog it
> **did not write about itself**? This pilot answers that binary question — *portability of the loop
> to real work* — and produces a first-hand report fast. It is **not** the unsupervised-autonomy
> gate (that is the follow-on run). Here a nanny still supervises; we are measuring whether the loop
> *holds on real work*, not whether it runs 24h untouched.

---

## 0. Pre-flight — do NOT start the pilot until all true

- [ ] Target repo (this) is a clean git repo with a remote, on its default branch, working tree clean.
- [ ] `pull.rebase=true` set in the target (`git -C <TARGET_REPO_PATH> config pull.rebase true`).
- [ ] A **curated** pilot backlog exists (see §3). Do not point the watcher at an unbounded backlog.

---

## 1. Pilot parameters (fill at install)

| Field | Value                                                             |
|---|-------------------------------------------------------------------|
| Target project | `Mispel deadline tracker`                                         |
| Task prefix | `<TASK_PREFIX>` (e.g. `sail`, `byc`)                              |
| North-star doc(s) | `<NORTH_STAR_FILE>` (e.g. `PRODUCT.md`)                           |
| Default branch | `<DEFAULT_BRANCH>`                                                |
| Pilot window | `<PILOT_START>` → `<PILOT_END>` (target: 24h elapsed, supervised) |
| Curated backlog size | `<N>` tasks (recommend 8–12)                                      |
| Operator | `<OPERATOR>`                                                      |

---

## 2. Install checklist (one-time, at pilot start)

### 2.0 Host prerequisites (fresh machine — skip if taskpilot already runs here)

Present + authenticated for the user the watcher runs as:

```bash
node --version && npm --version          # node ≥18 (for backlog.md)
npm install -g backlog.md                # provides BOTH the `backlog` CLI and its MCP server
backlog --version && backlog mcp --help  # confirm the `mcp` subcommand exists
claude --version                         # Claude Code CLI (agents are headless claude sessions)
gh --version && gh auth status           # `gh auth login` if needed
gh auth setup-git                        # agents push over https without prompts
tmux -V                                  # launch/status; Linux: `apt install inotify-tools` for event-based watch
# Install taskpilot (stable/dev split):
git clone <taskpilot-repo-url> ~/projects/taskpilot && cd ~/projects/taskpilot && ./release.sh
mkdir -p ~/.local/bin && ln -sf ~/.local/share/taskpilot-stable/bin/cli.sh ~/.local/bin/taskpilot
# Global budget guardrails (BEFORE first run):
mkdir -p ~/.config/taskpilot && printf 'max_wall_time_seconds: 3600\nmax_concurrent_agents: 2\nmax_sessions_per_day: 50\n' > ~/.config/taskpilot/config.yml
```

### 2.1 Per-pilot install

Run from a stable taskpilot install (`~/.local/bin/taskpilot`). The target is a *consumer* of
taskpilot — there is **no stable/dev split, no `release.sh`, no auto-release, no `tp-*` self-hosting**
here. The watcher only grooms/builds/narrates the target's own backlog.

1. **Backlog.** Ensure `<TARGET_REPO_PATH>/backlog/` exists with `backlog/config.yml`. For a fresh
   repo: `git init && git branch -M <DEFAULT_BRANCH>`, create the GitHub remote, then `backlog init`.
   In `backlog/config.yml` set `task_prefix: "<TASK_PREFIX>"`, `auto_commit: false`, and — **critical** —
   `statuses: ["To Do", "In Progress", "Needs Input", "Done"]` (the watcher routes on these exact four;
   if `Needs Input` is missing, escalations silently break). Avoid em-dashes/non-ASCII in task titles.
2. **Per-project config.** `cd <TARGET_REPO_PATH> && taskpilot init` → creates `.taskpilot.yml`.
   Set in it:
   - `north_star: <NORTH_STAR_FILE>` — so agents stay coherent with the target's goals (success
     criterion #3). **This is the portability test's whole point — get it right.**
   - `auto_release: false` — the target is not self-hosting; nothing to promote.
   - leave `auto_commit_master` unset/false; budgets (`max_wall_time_seconds`, `max_budget_usd`)
     per the target's task sizes.
3. **Register.** `taskpilot register <TARGET_REPO_PATH>` → adds it to
   `~/.config/taskpilot/projects.yml`. **Pilot isolation:** for option *c*, register the target
   **only** (temporarily unregister taskpilot itself, or run a second watcher scoped to the target)
   so the pilot signal is not confounded by taskpilot's own tp-* traffic. Record which choice you made.
4. **Hooks.** Confirm the block-no-verify / dangerous-command hooks are present in the target's
   `.claude/settings.local.json` (taskpilot merges `templates/hooks.json` on init). Safety hooks are
   mandatory before letting agents merge.
5. **Curate the backlog** (§3), then **seed this handoff + a journal**:
   - this file → `<TARGET_REPO_PATH>/product-planning/nanny-handoff.md` (placeholders filled)
   - create empty `<TARGET_REPO_PATH>/product-planning/nanny-journal.md`
6. **Doctor + start.** `taskpilot doctor` green → `taskpilot watch --auto --daemon` →
   `taskpilot watch --status` confirms pid + the target in scope.

---

## 3. Curating the pilot backlog (the test is only as good as this)

The pilot measures whether agents can take *real* tasks Draft→Done. Curate `<N>` tasks (8–12) that:

- are **genuine product work** on `<TARGET_PROJECT_NAME>`, not meta/tooling tasks;
- span the loop: some need grooming (no ACs → exercises groom), some are build-ready, at least one
  is deliberately ambiguous (exercises the **Needs Input** escalation path);
- are **independent** where possible (avoid a dependency chain that serialises the whole pilot);
- have at least one task with an **executable acceptance check** (command + expected output), so
  "Done" can be verified against a fact, not a claim;
- are small enough to finish inside the budget (a 24h window with `max_concurrent` 2 realistically
  lands a handful, not dozens — quality of signal over volume).

Mark them `Draft` or `To Do` so the watcher pulls them. Do **not** pre-write ACs for the groom-test
tasks — the point is to see the groomer do it.

---

## 4. Operating model — nanny duties for the pilot

Same spine as taskpilot's nanny (`product-planning/nanny-handoff.md` in the taskpilot repo), minus
all self-hosting machinery. Per shift:

1. **Start:** read this handoff; `taskpilot doctor`; confirm watcher up (`--auto`); arm a log monitor
   for spawns / failures / caps / escalations.
2. **Triage every non-routine event:** mitigate live (kill/revert/reconcile). For a taskpilot *tool*
   defect surfaced by the pilot → file a `tp-*` task back in the **taskpilot** repo (this is gold —
   real-world gaps). For a *target* task problem → fix it as a `<TASK_PREFIX>-*` task in the target.
   **Never a silent manual fix** — every intervention is a journal line.
3. **Review + merge PRs** in the target; resolve conflicts (no auto-merge assumed). PR review stays
   with the human (north-star non-goal). Verify "Done" against the executable check where one exists.
4. **Journal** every manual intervention in the target's `nanny-journal.md`:
   `timestamp | actor (nanny/human/human->nanny) | what | why | task filed`. This is the supervision
   signal the KPIs read.
5. **End:** rewrite §6 "Operational state" + §7 "Next shift", ensure journal current, watcher in a
   documented state.

**Ask the operator before anything irreversible** (force-push, branch deletion, mass status changes).
`git pull --rebase` always; never trust the first `mergeable` read — poll.

---

## 5. What to measure — pilot KPIs

Record continuously; summarise at pilot end. These map to the refined Health/Maturity model in the
taskpilot handoff.

| KPI | Definition | Source |
|---|---|---|
| **Autonomy ratio** | % of pilot tasks Draft→merged with **zero** `human`/`human->nanny` journal touch | target `nanny-journal.md` |
| **First-pass build→PR yield** | % builds that create_pr + merge with no hand-salvage | target audit log + journal |
| **Tasks delivered** | pilot tasks reaching merged PR inside the window | target backlog + PRs |
| **Escalation correctness** | of Needs-Input escalations, % that were genuine ambiguity vs tool failure | journal |
| **Coherence** | did merged work stay aligned with `<NORTH_STAR_FILE>`? (operator/review grade per task) | PR review |
| **Median time-between-interventions** | median gap between consecutive journal entries | journal |
| **Tool defects found** | count of `tp-*` filed back to taskpilot from pilot incidents | taskpilot backlog |

The headline answer the pilot must produce: **did the groom/build/narrate loop carry real
`<TARGET_PROJECT_NAME>` tasks Draft→Done while staying coherent with `<NORTH_STAR_FILE>`?** Yes/No,
with the autonomy ratio and the tool-defect list as evidence.

---

## 6. Operational state (rewritten at each shift end)

- **Watcher:** <pid / status / scope>
- **Pilot clock:** <elapsed of 24h>
- **Backlog:** <n tasks: Draft/To Do/In Progress/Needs Input/Done>
- **PRs:** <open / merged this shift>
- **Open incidents:** <…> · **tp-* filed back to taskpilot:** <…>
- **Config:** <wall-time / max_concurrent / budgets>

## 7. Next shift starts here

0. <highest-leverage item — usually an open escalation or a stuck PR>
1. Confirm liveness (watcher pid, scope), reconcile drift since last shift.
2. Work the Needs-Input queue first (escalations are the supervision signal).
3. Keep the journal actor-tagged and current — the KPIs are computed from it.

---

## 8. Pilot end — report back to taskpilot

When the window closes (or the abort criteria below trip):

1. **Summarise** into a short report and copy it into the **taskpilot** repo under
   `product-planning/reports/pilot-<TARGET_PROJECT_NAME>-<DATE>.md`: the headline Yes/No, the KPI
   table from §5, the list of `tp-*` defects the pilot surfaced, and 3–5 qualitative findings
   (where the loop held, where it broke, where coherence drifted).
2. **File the tool defects** as groomed `tp-*` tasks in taskpilot (they likely become the next
   iteration's backlog — this is the pilot's main yield).
3. **Update** taskpilot's maturity review: external-delivery count moves off zero; recompute the
   Maturity score with real data.
4. **Tear down or keep:** unregister the target (or keep it running if the operator wants continued
   delivery). Either way, restore taskpilot's own watcher scope if it was narrowed for isolation.

**Abort criteria (end early, still a valid result):** create_pr strands recur (TP-104 regression),
agents repeatedly merge work that contradicts `<NORTH_STAR_FILE>`, or a safety hook is bypassed.
An early abort with a clear cause is a *successful* pilot — it found the blocker before a real
unsupervised run would have.

---

## 9. Differences from taskpilot self-hosting (do not copy these over)

- **No stable/dev split, no `release.sh`, no `auto_release`, no watcher self-reload-on-release** —
  the target is not taskpilot; there is nothing to promote. (Self-reload only matters for a project
  whose own releases change the running watcher.)
- **No `tp-*` tasks in the target** — target tasks use `<TASK_PREFIX>-*`. `tp-*` defects are filed
  *back to the taskpilot repo*.
- **PR review stays human** — same as the north star; the pilot does not add an auto-merge pipeline.

---

## 10. Nanny power tools + gotchas (carried from taskpilot self-hosting, 2026-06-08)

**Power tools** — prefer over manual git surgery:
- `taskpilot board --alerts` — stuck-task warnings (orphan, no-pr, conflict, forgotten-escalation).
- `taskpilot resolve-conflicts <ID>` — rebase a task branch + resolve conflicts.
- `taskpilot review-prs` — review open PRs and post the `taskpilot-review` verdict.
- `taskpilot kill <TASK-ID>` — kill a wedged/looping agent tree + clean its pid files.
- `taskpilot log <TASK-ID>` — task audit trail (run_started → agent_finished → pr_created/pr_failed);
  the primary forensics tool for a strand.

**Gotchas:**
- **Rebase, never merge, on pull** (`pull.rebase=true`). The watcher and you are two writers on the
  default branch.
- **MCP#558.** The backlog MCP server writes task-file updates to the **main repo**, not the worktree;
  taskpilot moves them onto the feature branch and commits them, leaving the main repo dirty until
  reconciled. Don't panic at a dirty main-repo task file mid-flight.
- **Worktrees** live under `~/taskpilot-worktrees/<task-id>/`. Done+clean → auto-removed (branch kept
  for the PR); Needs Input / non-zero exit → preserved. `taskpilot cleanup --yes` sweeps orphans.
- **Transient API errors.** A build agent can die mid-run with `API Error: socket connection closed`
  (exit 1) — not a taskpilot bug. The task is left `In Progress`; reset it to `To Do` to retry. If a
  partial branch causes a continue-mode respawn loop: set the task `Needs Input` to halt routing,
  `taskpilot kill <ID>`, remove the worktree + empty branch, then retry fresh.
- **Strands should be rare** (TP-104 reconcile recovers most; grep the log for `PENDING-PR:`). If a
  build goes Done with a local branch but no remote/PR, salvage: `git push origin tasks/back-<prefix>-<n>`
  + `gh pr create`. **Recurring strands = abort criterion** (TP-104 regression).
- **Cosmetic alerts.** Legacy `no-pr` / `create-pr-failed` alerts for old branchless Done tasks are
  suppressed at scan-time via `no-pr-suppressed-<id>` markers, but `board --alerts` recomputes live and
  may still display them — display-only, not a real strand.
