---
name: qa-audit
description: "Non-functional QA audits — accessibility (WCAG 2.2 AA), API contract/authz, security smoke test (authorized targets only) and performance (Lighthouse/k6). Pick one or run \"all\" in parallel."
argument-hint: "<a11y | api | security | perf | all> <target url / endpoints / scope>"
---

Audit request: **$ARGUMENTS**

| Type | Subagent (may be prefixed `argus-qa:`) |
|---|---|
| `a11y` | `qa-accessibility-auditor` |
| `api` | `qa-api-tester` |
| `security` | `qa-security-tester`. **First confirm that the user owns or is authorized to test the target**, and that it's not production. |
| `perf` | `qa-performance-tester`. Smoke load only, unless the user approves more. |
| `all` | All four **in parallel** (one message, several Agent calls), each with a self-contained brief |

Pass along the target and the relevant `.qa/context.md` facts (URLs, test accounts, budgets). Merge the results into one table ranked by severity, with each agent's verdict and its **⛔ Not tested** list. Save the merged report to `.qa/reports/audit-<type>-<date>.md`.
