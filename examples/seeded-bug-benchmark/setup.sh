#!/usr/bin/env bash
# Recreates the seeded-bug demo repo: main = correct code, feature/coupons = 6 planted bugs, tests still green.
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"; DEST="${1:-./demo-shop}"
rm -rf "$DEST"; mkdir -p "$DEST"; cd "$DEST"
git init -q -b main; git config user.email demo@example.com; git config user.name demo
cp "$HERE"/before/* .; git add -A; git commit -qm "Initial cart module"
git checkout -qb feature/coupons; cp "$HERE"/after/* .; git add -A; git commit -qm "Add coupons and refactor quantity validation"
echo "✅ Demo repo at $DEST (branch feature/coupons). Run: cd $DEST && npm test   (green!)  then: claude → /qa-diff"
