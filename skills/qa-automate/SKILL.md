---
name: qa-automate
description: "Write automated tests (unit / API / E2E) in the project's existing framework and style, run them, prove each one fails when the bug is present (mutation sanity check), and prove they're stable with repeat runs."
argument-hint: "<what to automate: test cases, a bug, a file/module, or \"gaps from last /qa-diff\">"
---

Delegate to the **`qa-automation-engineer`** subagent (it may appear as `argus-qa:qa-automation-engineer`).

Brief it with:
- **Scope:** $ARGUMENTS. Resolve references: "last diff" means the newest Argus change report in this conversation; a bug ID means `.qa/bugs/<id>*`; test-case IDs mean `.qa/testcases/*`.
- The test commands and conventions from `.qa/context.md`.
- **Non-negotiables:** follow the existing conventions, no product-code changes, mutation check plus repeat runs, real runner output in the report.

When it returns, show the tests added, the three evidence lines (run / mutation / stability), and any product bugs discovered along the way.
