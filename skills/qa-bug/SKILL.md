---
name: qa-bug
description: "Turn an observation, error message, log, screenshot or customer complaint into a reproducible, developer-ready bug report (minimal steps, severity/priority, evidence, duplicate check). Optionally files it to GitHub after approval."
argument-hint: "<what you saw> [--file to create a GitHub issue after review]"
---

Delegate to the **`qa-bug-reporter`** subagent (it may appear as `argus-qa:qa-bug-reporter`).

Input: **$ARGUMENTS**. Include any image or log the user attached in this conversation, described or quoted in the brief, since the subagent can't see this chat.

Show the user the finished report. If `--file` was given or the user asks to file it, show the exact title and body, **wait for explicit approval**, and then run `gh issue create --title … --body-file …` (add the `bug` label if it exists).
