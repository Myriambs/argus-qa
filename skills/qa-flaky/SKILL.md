---
name: qa-flaky
description: "Diagnose and fix flaky / intermittent / CI-only test failures at the root cause — reproduce with repeat, parallel, shuffled and timezone runs, classify the cause, fix it without retries or sleeps, and prove 0 failures after."
argument-hint: "<test name / file / CI run URL / failure message>"
---

Delegate to the **`qa-flaky-doctor`** subagent (it may appear as `argus-qa:qa-flaky-doctor`) with: **$ARGUMENTS**, the test commands from `.qa/context.md`, and any CI log excerpt the user shared.

Report back: the root cause, the before/after failure rates, the fix, and whether it's actually a **product bug** (if so, offer `/qa-bug`).
