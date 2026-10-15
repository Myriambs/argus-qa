---
name: qa-cases
description: "Generate complete, traceable test cases for a requirement, story, UI or API using formal techniques (EP, BVA, decision tables, state transitions, pairwise, error guessing). Supports table, Gherkin and CSV (TestRail/Xray/Zephyr) output."
argument-hint: "<requirement / story / path / screen> [--gherkin] [--csv]"
---

Delegate to the **`qa-test-designer`** subagent (it may appear as `argus-qa:qa-test-designer`).

Brief it with:
- **Input:** $ARGUMENTS (read any referenced files, tickets or existing test plans in `.qa/reports/`)
- **Format:** the table by default. If `--gherkin` is present, also produce a `.feature` file. If `--csv` is present, write `.qa/testcases/<slug>.csv`.
- The facts from `.qa/context.md` about roles, data and environments.

Show the user the coverage summary, the P1 cases, and any 🧠 assumed expectations that need confirmation. Offer `/qa-automate` for the automatable P1 cases.
