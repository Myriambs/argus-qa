---
name: qa-release
description: "Evidence-based release readiness gate — GO / GO WITH RISKS / NO-GO with confidence score, exit criteria, change-risk by area, open defects, an explicit \"not tested\" list and a post-release watch plan. The human makes the final call."
argument-hint: "[version / tag / commit range]  (default: last tag..HEAD)"
---

1. In parallel, start:
   - **`qa-change-analyst`** on the release range (**$ARGUMENTS**, or the last tag..HEAD)
   - **`qa-release-gatekeeper`** with the same range (it runs the suites and gathers bugs, CI and audits)
   (Either may be prefixed `argus-qa:`.)
2. When both return, give the gatekeeper's draft the change analyst's findings. Either send them to it (SendMessage, if available) or merge them yourself: any 🔴 likely-bug in a high-risk area without ✅ evidence lowers confidence and must appear under risks.
3. Present the **🚦 Release Readiness** report and save it to `.qa/reports/release-<version>.md`. End with the human decision line. **Never** deploy, merge or tag yourself.
