#!/usr/bin/env bash
# taskpilot guard hook — blocks dangerous commands in agent worktrees.
# PreToolUse hook for Claude Code: exit 2 = block, exit 0 = allow.
# Receives Claude Code tool-use JSON on stdin.

GUARD_LOG="${TASKPILOT_GUARD_LOG:-${HOME}/.local/share/taskpilot/guard.log}"
mkdir -p "$(dirname "$GUARD_LOG")" 2>/dev/null || true

if ! command -v jq >/dev/null 2>&1; then
  printf '[%s] WARNING: jq not found — guard-hook disabled for this call\n' \
    "$(date -u +"%Y-%m-%dT%H:%M:%SZ")" >> "$GUARD_LOG" 2>/dev/null || true
  exit 0
fi

INPUT=$(cat)
CMD=$(printf '%s' "$INPUT" | jq -r '(.tool_input.command // .command) // ""' 2>/dev/null || echo "")
[ -z "$CMD" ] && exit 0

_block() {
  local reason="$1"
  printf '[%s] BLOCKED: %s | cmd: %s\n' \
    "$(date -u +"%Y-%m-%dT%H:%M:%SZ")" "$reason" "$CMD" >> "$GUARD_LOG" 2>/dev/null || true
  printf 'taskpilot-guard: BLOCKED — %s\n' "$reason" >&2
  exit 2
}

# Block sudo (only as a command, not as a string argument)
printf '%s' "$CMD" | grep -qE '(^|[;&|`]|\|\||&&)[[:space:]]*sudo[[:space:]]' \
  && _block "sudo not allowed in agent worktrees"

# Block git push --force / -f
printf '%s' "$CMD" | grep -qE 'git[[:space:]]+push[[:space:]].*(--force|-f)([[:space:]]|$)' \
  && _block "git push --force not allowed"

# Block git push --force-with-lease
printf '%s' "$CMD" | grep -qE 'git[[:space:]]+push[[:space:]].*--force-with-lease' \
  && _block "git push --force-with-lease not allowed"

# Block git reset --hard on shared branches
if printf '%s' "$CMD" | grep -qE 'git[[:space:]]+reset[[:space:]]+--hard'; then
  _branch=$(git branch --show-current 2>/dev/null || echo "")
  printf '%s' "$_branch" | grep -qE '^(main|master|develop)$' \
    && _block "git reset --hard not allowed on shared branch '$_branch'"
fi

# Block rm -rf/-Rf/-fR/--recursive targeting absolute paths outside the project root
if printf '%s' "$CMD" | grep -qE '\brm\b.*(-[a-zA-Z]*[rR]|--recursive)'; then
  _root=$(git rev-parse --show-toplevel 2>/dev/null || echo "$PWD")
  while IFS= read -r _p; do
    [ -z "$_p" ] && continue
    _exp="${_p/#\~/$HOME}"
    case "$_exp" in
      "$_root"|"$_root"/*) ;;
      /*) _block "rm -rf outside worktree: $_p" ;;
    esac
  done < <(printf '%s\n' "$CMD" \
    | awk '{for(i=1;i<=NF;i++) if(substr($i,1,1)=="/" || substr($i,1,1)=="~") print $i}')
fi

exit 0
