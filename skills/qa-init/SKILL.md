---
name: qa-init
description: "Bootstrap Argus QA memory for the current project. Scans the repo to detect stack, test frameworks, test commands, CI, app start command/URLs, environments, roles and risky areas, then writes .qa/context.md — the product knowledge every Argus agent reads first. Run once per project; re-run to refresh."
argument-hint: "[optional notes, e.g. \"staging is https://staging.example.com, test user qa@example.com\"]"
---

# Argus · Project bootstrap

Build the QA memory for this project. Extra notes from the user: **$ARGUMENTS**

## Steps
1. **Detect** (read-only):
   - Stack and package managers: `package.json`, `pyproject.toml`/`requirements*.txt`, `go.mod`, `pom.xml`/`build.gradle`, `Gemfile`, `composer.json`, `Cargo.toml`
   - Test frameworks and configs: `playwright.config.*`, `cypress.config.*`, `jest/vitest.config.*`, `pytest.ini`/`conftest.py`, `karma`, JUnit and similar. Count the test files per type.
   - Test and run commands: scripts in `package.json`, `Makefile`, `justfile`, `docker-compose*.yml`, `Procfile`, the README
   - CI: `.github/workflows/*`, `.gitlab-ci.yml`, `Jenkinsfile`. Note which tests run on PRs.
   - API contracts: `openapi*.{yml,yaml,json}`, `swagger*`, `*.graphql`, route files
   - Auth and roles: grep for `role`, `permission`, `isAdmin`, auth middleware
   - Risk hotspots: `git log --since=6.months --name-only --pretty=format: | sort | uniq -c | sort -rn | head -15` (churn), plus files named payment, billing, auth, migration
   - Existing QA assets: `docs/`, test plans, `.github/ISSUE_TEMPLATE`
2. **Ask** the user only about what you couldn't detect and that matters: the staging/local URL, test accounts (**never store real passwords; reference env var names instead**), what must never be touched, and any known flaky areas.
3. **Write** `.qa/context.md` using this template, and create `.qa/{bugs,sessions,reports,evidence,testcases}/` with a `.gitkeep` in each:

```markdown
# QA Context: <project>
_Last updated: <date> by Argus /qa-init. Agents: append learnings, don't rewrite history._

## Product in one paragraph
## Users and roles
| Role | Can | Test account (env var) |
## Environments
| Env | URL | Safe for writes? | Notes |
## How to run
- Install: … · Start app: … · Unit: … · E2E: … · Lint/types: …
## Test landscape
| Level | Framework | Location | # files | Runs in CI? |
## Critical user journeys (money paths)
1. …
## Risk hotspots
| Area | Why risky | Evidence (churn, bugs, complexity) |
## Exit criteria (defaults, edit me)
## Never do
- No writes to production · no real emails/SMS/payments · …
## Known issues and flake patterns
## Glossary (domain terms)
```
4. **Suggest** adding `.qa/evidence/` to `.gitignore` (screenshots may contain data) and committing the rest so the whole team shares the QA memory.
5. **Summarize** in five lines or fewer: what was detected, what's missing, and the 3 best next Argus commands for this project.
