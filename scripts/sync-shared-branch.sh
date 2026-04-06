#!/usr/bin/env bash
set -euo pipefail

# Safely sync local changes with a shared remote branch.
# Usage:
#   ./scripts/sync-shared-branch.sh [branch]
# Default branch:
#   Maksym-component-developer

TARGET_BRANCH="${1:-Maksym-component-developer}"

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Error: this is not a git repository."
  exit 1
fi

CURRENT_BRANCH="$(git rev-parse --abbrev-ref HEAD)"
STASHED=0

if [[ -n "$(git status --porcelain)" ]]; then
  echo "Local changes detected. Stashing before sync..."
  git stash push -u -m "auto-stash before sync to ${TARGET_BRANCH}"
  STASHED=1
fi

echo "Fetching latest refs..."
git fetch origin --prune

if git show-ref --verify --quiet "refs/heads/${TARGET_BRANCH}"; then
  echo "Switching to local branch ${TARGET_BRANCH}..."
  git switch "${TARGET_BRANCH}"
else
  echo "Creating local tracking branch ${TARGET_BRANCH}..."
  git switch -c "${TARGET_BRANCH}" --track "origin/${TARGET_BRANCH}"
fi

echo "Rebasing on top of origin/${TARGET_BRANCH}..."
git pull --rebase origin "${TARGET_BRANCH}"

if [[ "${STASHED}" -eq 1 ]]; then
  echo "Re-applying stashed changes..."
  set +e
  git stash pop
  POP_EXIT=$?
  set -e

  if [[ ${POP_EXIT} -ne 0 ]]; then
    echo ""
    echo "stash pop produced conflicts. Resolve files, then run:"
    echo "  git add <resolved-files>"
    echo "  git commit"
    echo ""
    exit ${POP_EXIT}
  fi
fi

echo ""
echo "Sync complete on ${TARGET_BRANCH}."
echo "Started from branch: ${CURRENT_BRANCH}"