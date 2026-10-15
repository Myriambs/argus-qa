---
name: qa-explore
description: "Run a charter-based exploratory testing session against the RUNNING app (URL, localhost, CLI or API) — the agent drives a real browser, attacks with heuristics, and returns reproducible findings with screenshots, console and network evidence."
argument-hint: "<url or area> [charter / focus, e.g. \"signup with nasty inputs\"]"
---

Delegate to the **`qa-explorer`** subagent (it may appear as `argus-qa:qa-explorer`).

1. **Target:** $ARGUMENTS. If no URL is given, get it from `.qa/context.md`. Failing that, detect the dev server command (don't start anything against production). If it's still unclear, ask.
2. **Browser check:** if no browser tool is available (Playwright MCP, Claude in Chrome), tell the user they can add one with
   `claude mcp add playwright -- npx @playwright/mcp@latest`.
   Meanwhile, the explorer can fall back to scripted Playwright runs.
3. **Charters:** if the user gave a broad area ("the whole app"), split it into 2–3 charters (e.g., money path, input attacks, roles/permissions) and run them as **parallel** explorer subagents with distinct charters. Run accessibility in parallel too, via `qa-accessibility-auditor`, when it's a UI.
4. **Merge** the findings, ranked by severity. Offer `/qa-bug` to turn ✅ findings into tracker-ready reports, and `/qa-automate` to lock in regression tests.
