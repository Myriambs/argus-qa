---
name: qa-plan
description: "Create a risk-based test plan for a feature, story, PRD, ticket or release — including a requirement review (ambiguities, missing acceptance criteria, questions for the PO) and a risk map that decides where testing effort goes."
argument-hint: "<feature description, ticket text, path to spec, or issue/PR number>"
---

Delegate to the **`qa-architect`** subagent (it may appear as `argus-qa:qa-architect`).

Brief it with:
- **Input:** $ARGUMENTS. If this is a file path, issue number (`gh issue view`) or URL, tell the agent to read it. If it's empty, ask the user what to plan for.
- The relevant facts from `.qa/context.md` (if it exists).
- **Deliverable:** its standard Test Plan format, saved to `.qa/reports/test-plan-<slug>.md`.

When it returns, show the user: the summary, the **requirement-review questions** (they're the highest-value output, so put them first), and the top 5 risks. Then offer `/qa-cases` to turn the plan into test cases.
