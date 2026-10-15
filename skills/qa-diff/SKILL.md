---
name: qa-diff
description: "Diff-aware QA for the current changes, a branch, a commit range or a PR — maps blast radius, finds likely bugs and regressions, audits whether tests cover (or were weakened by) the change, and outputs a targeted test checklist. Use before opening or merging a PR."
argument-hint: "[PR number | branch | commit range]  (default: current branch + uncommitted changes)"
---

Delegate to the **`qa-change-analyst`** subagent (it may appear as `argus-qa:qa-change-analyst`).

Target: **$ARGUMENTS**. If this is empty, use the current branch vs its merge base plus uncommitted changes. If it's a number, treat it as a PR (`gh pr diff`).

When it returns, present: the risk level, the likely bugs (with `file:line`), the test gaps, and the targeted checklist. Then offer two follow-ups:
1. `/qa-automate` to write tests for the top gaps (the automation engineer will prove they fail without the fix)
2. `/qa-explore` on the affected screens, if the app can run locally
