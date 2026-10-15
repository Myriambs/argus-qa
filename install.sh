#!/usr/bin/env bash
# Argus QA: install agents and skills for Claude Code.
#   ./install.sh            → user-level (~/.claude), available in every project
#   ./install.sh --project  → into ./.claude of the current directory (share with your team via git)
set -euo pipefail
SRC="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if [[ "${1:-}" == "--project" ]]; then DEST="$PWD/.claude"; else DEST="$HOME/.claude"; fi
mkdir -p "$DEST/agents" "$DEST/skills"
cp "$SRC"/agents/qa-*.md "$DEST/agents/"
for d in "$SRC"/skills/*/; do
  name="$(basename "$d")"
  rm -rf "$DEST/skills/$name"
  cp -r "$d" "$DEST/skills/$name"
done
echo "✅ Argus QA installed into $DEST"
echo "   $(ls "$SRC"/agents/qa-*.md | wc -l) agents, $(ls -d "$SRC"/skills/*/ | wc -l) commands"
echo "   Restart Claude Code, then try:  /qa-init   then   /qa <what to test>"
echo "   Recommended: claude mcp add playwright -- npx @playwright/mcp@latest"
