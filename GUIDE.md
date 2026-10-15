# 📘 Argus User Guide

How to use Argus, with real examples. There are two ways to use it:

| | 🌐 **Argus Web** | 💻 **Argus in Claude Code** |
|---|---|---|
| Where | Your browser: [myriambs.github.io/argus-qa](https://myriambs.github.io/argus-qa/) | Your terminal, inside your project |
| Install | Nothing | Claude Code + this plugin |
| Cost | Free with a Gemini key (or your own Claude key) | Your Claude Code plan |
| What it can do | Analyze what you **paste**: stories, diffs, PR links, bug descriptions | Everything Web does, **plus** run your tests, drive a real browser, read your whole repo, write test code |
| Evidence level | 🧠 INFERRED (it can't run anything) | ✅ VERIFIED (it executes and proves) |
| Best for | Quick reviews, test design, anyone on the team, demos | Daily QA work on a real codebase |

**Contents**
- [Part 1: Argus Web](#part-1--argus-web-the-website)
  - [Getting started](#getting-started-2-minutes)
  - [The 5 specialists, with use cases and examples](#the-5-specialists)
  - [Tips and troubleshooting](#tips-and-troubleshooting)
- [Part 2: Argus in Claude Code](#part-2--argus-in-claude-code-the--commands)
  - [Install](#install)
  - [Every `/` command explained](#every--command-explained)
- [Part 3: Real-world workflows](#part-3--real-world-workflows)
- [Understanding the evidence labels](#understanding-the-evidence-labels)

---

# Part 1: Argus Web (the website)

## Getting started (2 minutes)

1. **Get a free Gemini key:** go to [aistudio.google.com/apikey](https://aistudio.google.com/apikey), sign in with Google, and click **Create API key**. Copy it.
   *(Or use a Claude key from [console.anthropic.com](https://console.anthropic.com/settings/keys), which is paid per use.)*
2. **Open** [myriambs.github.io/argus-qa](https://myriambs.github.io/argus-qa/).
3. In **1 · Connect an AI model**, choose **Google Gemini**, paste your key, and click **Connect**. You'll see `✓ Connected`.
   Tick **Remember key on this device** if you don't want to paste it again next time.
4. In **2 · Pick a specialist**, choose a tab, paste your material (or click **Load example**), and press the run button.
5. The report streams in on the right. Use **Copy**, **.md**, **.csv** or **.feature** to take it with you.

> 🔐 Your key is stored only in your browser and sent only to Google or Anthropic. There is no Argus server.
> ⚠️ On Gemini's **free** tier, Google may use your inputs to improve its products. Don't paste confidential company code there.

## The 5 specialists

### 📋 Test Plan (QA Architect)
**What it does:** reviews a requirement *before* anyone writes code. It finds ambiguity and missing acceptance criteria, scores risks, and writes a risk-based test plan.

**Use it when:**
- A new user story or ticket arrives in refinement or sprint planning
- You received a PRD or spec and need to say "this isn't testable yet" with good reasons
- You need a test plan document for a feature or a release

**Paste:** the user story, acceptance criteria, PRD section or ticket text.

**Example input**
```
As a registered user, I want to reset my password by email.
AC: 1. "Forgot password?" link on login  2. user receives a reset link
3. link expires after a while  4. new password must be strong  5. user is logged in after reset
```
**You get:**
- **Questions for the PO** (e.g. "*'after a while', how many minutes? Proposed default: 30 min, single use*"; "*What happens if the email isn't registered? Same message, to avoid account enumeration?*")
- A **risk map** where token reuse and enumeration score 🔴 high
- Scope, approach per test level, test data, and entry/exit criteria

💡 **Tip:** the "Requirement review" questions are often the most valuable part. Bring them to refinement.

---

### 🧪 Test Cases (Test Designer)
**What it does:** turns a requirement into a complete, de-duplicated set of test cases using formal techniques: equivalence partitioning, boundary values, decision tables, state transitions, pairwise testing and error guessing.

**Use it when:**
- You need test cases for a form, a feature, a business rule or an API
- You want to import cases into **TestRail / Xray / Zephyr** (tick **CSV export**)
- You want **BDD scenarios** for Cucumber/SpecFlow (tick **Gherkin**)
- You want to check that your own test cases didn't miss boundaries or negative cases

**Paste:** the rules of the feature. The more precise, the better.

**Example input**
```
Signup form: email (required, valid, unique) · password 8–64 chars, at least 1 letter + 1 number
· confirm must match · age 18+ · "accept terms" required · success → /onboarding + welcome email
```
**You get:**
- A table of conditions, and the technique used for each one (e.g. boundaries **7, 8, 9, 63, 64, 65** for the password)
- Test cases with ID, priority, steps, data, exact expected result and level (Unit/API/E2E)
- A traceability table and a coverage summary
- Download buttons: **.csv** (ready to import) and **.feature** (Gherkin)

---

### 🔍 Diff Review (Change Analyst)
**What it does:** answers *"What could this change break?"* It finds likely bugs with the exact line, spots tests that were weakened, and gives you a targeted checklist for this change only.

**Use it when:**
- Before you **approve or merge a PR**
- A developer says "small change, no need to test", and you want to check
- You're deciding what to regression-test after a change
- A release contains PRs you didn't follow

**Paste:** a unified diff, **or** paste a public GitHub PR / commit link and click **Fetch diff**. Fill in the *Intent / spec* box when you can (PR description, ticket, product rules). It makes the review much sharper.

**Example:** click **Load example**. It's a real change containing **6 hidden bugs** while the test suite stays green.
**You get:**
- The risk level and blast radius
- **Likely bugs** with `file:line` and the scenario that triggers them (e.g. "*`cart.js:25` the ownership check was removed, so any user can read any order*")
- **Test gaps**, including **weakened tests** (`.skip`, deleted assertions, a test renamed but no longer testing what its name says)
- A prioritized **checklist** (P1/P2/P3) and a regression watchlist

💡 **Tip:** private repos can't be fetched by link. Paste the diff instead (`git diff main...my-branch` or the "Files changed" view).

---

### 🐞 Bug Report (Bug Reporter)
**What it does:** turns a vague complaint into a developer-ready bug report: title, severity vs priority, minimal steps, expected vs actual, impact, and what still needs to be checked.

**Use it when:**
- A customer or support ticket says "it's broken"
- You found something during testing and want a clean report fast
- You need to decide **severity (S1–S4)** and **priority (P1–P4)** consistently
- You're writing in a hurry and want the report in Jira/GitHub format

**Paste:** what you saw, in your own words, plus any error message or log. Add the environment if you know it.

**Example input**
```
When I change the quantity after applying a coupon, the price goes back up but the coupon
badge is still showing. Every time. Chrome on Mac. Coupon SAVE10.
```
**You get:** a title like `[Cart] Coupon discount removed when quantity changes, but badge still shown`, S2/P1, numbered steps, expected (with its source) vs actual, impact, a workaround, and **what's still unknown** (other browsers, mobile…), honestly marked 👁 OBSERVED (user-reported).

---

### 🚦 Release Check (Release Gatekeeper)
**What it does:** gives an evidence-based **GO / GO WITH RISKS / NO-GO** recommendation with a confidence score, exit criteria, risks, an explicit **"Not tested"** list and a watch plan for after the release.

**Use it when:**
- At the go/no-go meeting, or before a deploy
- A manager asks "are we ready?" and you need a written, defensible answer
- You want to show *risk*, not just "tests passed"

**Paste:** the changelog or PR list, open bugs, and test or CI results (as-is).

**You get:** a verdict and confidence %, an exit-criteria table, risk by area, accepted risks and mitigations, ⛔ not tested, and what to monitor in the first 24h. The final decision line is left for a **human**.

---

## Tips and troubleshooting

| Problem | Fix |
|---|---|
| `Rate limit or quota reached` | Free Gemini has per-minute and per-day limits. Wait a minute, or pick a lighter model (e.g. *Flash-Lite*) in the Model list. |
| `The key was rejected` | Copy the key again and make sure nothing is missing at either end. |
| `Not found` when fetching a PR | Only **public** repos work. Check the link format: `github.com/owner/repo/pull/123`. |
| `GitHub rate limit reached` | GitHub allows 60 requests/hour without login. Wait, or paste the diff manually. |
| The report was cut off | The input or output was too long. Trim the diff to the files that matter. |
| I want better answers | Fill in the optional boxes (intent/spec, environment). Context makes the biggest difference. Claude Opus usually gives the deepest reports. |
| The key disappeared after closing the tab | Tick **Remember key on this device**. |

---

# Part 2: Argus in Claude Code (the `/` commands)

## Install
```bash
# Option A: plugin
claude plugin marketplace add Myriambs/argus-qa
claude plugin install argus-qa@argus-qa

# Option B: copy into ~/.claude (works in every project)
git clone https://github.com/Myriambs/argus-qa && cd argus-qa && ./install.sh

# Recommended: give Argus a real browser for /qa-explore and /qa-audit
claude mcp add playwright -- npx @playwright/mcp@latest
```
Then open your project and start Claude Code:
```bash
cd ~/my-project
claude
```
> If you installed it as a plugin, the commands may show with a prefix, like `/argus-qa:qa-diff`. Typing `/qa` and choosing from the list works either way.

## Every `/` command explained

### `/qa-init`: teach Argus your project (run once)
**What it does:** scans your repo to detect the stack, test frameworks, test commands, CI, API specs, roles and risky "hotspot" files. Asks you only what it can't detect (staging URL, test accounts, what must never be touched). Writes `.qa/context.md`, which every specialist reads first.
**When:** the first time you use Argus in a project, and again after big changes.
**Example:** `/qa-init staging is https://staging.myapp.com, test users are in env vars QA_USER / QA_PASS`

### `/qa`: the orchestrator (when in doubt, use this)
**What it does:** understands your request, picks the right specialists, runs them in parallel, double-checks the critical findings, and merges everything into one ranked report.
**When:** any QA question in plain language.
**Examples:**
```
/qa is PR 142 safe to merge?
/qa full QA of the new checkout flow in src/checkout, app runs on localhost:3000
/qa we got complaints that search is slow and sometimes shows other users' results
```

### `/qa-plan`: test plan + requirement review
**What it does:** same as the web Test Plan, but it can also read tickets (`gh issue view`), spec files and your code architecture to judge risk.
**Examples:** `/qa-plan #87` · `/qa-plan docs/specs/refunds.md` · `/qa-plan users can export their data as CSV`
**Output:** `.qa/reports/test-plan-<feature>.md`

### `/qa-cases`: test case design
**What it does:** formal test design, like the web version, saved into your project.
**Examples:** `/qa-cases the coupon rules in src/cart/coupons.ts --csv` · `/qa-cases POST /api/orders --gherkin`
**Output:** a table, plus `.qa/testcases/<feature>.csv` or a `.feature` file

### `/qa-diff`: what could this change break?
**What it does:** reads your branch or PR diff, finds callers across the **whole repo**, checks git history for fragile files, can run your existing tests, and confirms suspected bugs by executing small snippets (✅ VERIFIED).
**Examples:** `/qa-diff` (current branch + uncommitted changes) · `/qa-diff 142` (PR #142) · `/qa-diff main..release/2.4`
**Real result:** on the [seeded-bug benchmark](examples/seeded-bug-benchmark/) it found **6/6** planted bugs while the test suite stayed green.

### `/qa-explore`: hands-on exploratory testing in a real browser
**What it does:** opens your running app (needs Playwright MCP or Chrome tools), runs charter-based sessions, and attacks with boundaries, double-submits, back-button tricks, other roles, mobile viewports and nasty inputs. Captures **screenshots, console errors and failed network calls** as evidence.
**Examples:**
```
/qa-explore http://localhost:3000/signup "nasty inputs and double submits"
/qa-explore http://localhost:3000 the whole app
```
**Output:** findings with evidence in `.qa/sessions/` and `.qa/evidence/`

### `/qa-automate`: write tests that actually catch bugs
**What it does:** writes tests in **your existing framework and style** (Playwright, Jest/Vitest, pytest…). Then it proves each test **fails when the bug is present** (temporarily breaks the code, then restores it), and repeat-runs the tests to show they aren't flaky.
**Examples:** `/qa-automate tests for the P1 gaps from the last /qa-diff` · `/qa-automate regression test for BUG-112` · `/qa-automate API tests for src/routes/orders.ts`
**Output:** test files, plus three evidence lines: run ✅, mutation check ✅, stability ✅

### `/qa-bug`: developer-ready bug report
**What it does:** like the web version, but it can **reproduce** the bug first, search for duplicates in `.qa/bugs/` and GitHub issues, and file the issue (**only after you approve**).
**Examples:** `/qa-bug checkout total ignores coupon after quantity change` · `/qa-bug <paste a stack trace> --file`

### `/qa-audit`: non-functional audits
**What it does:** runs one or all of these specialists:
| Type | Checks |
|---|---|
| `a11y` | WCAG 2.2 AA: axe scan, keyboard-only walk, focus, contrast, labels, zoom/reflow |
| `api` | Contract, validation, auth, **BOLA** (reading others' data), idempotency, pagination |
| `security` | OWASP Top 10 smoke test: secrets in the repo, vulnerable dependencies, access control, headers. **Only on systems you're authorized to test** |
| `perf` | Lighthouse / Core Web Vitals, k6 load test (light load unless you approve more), N+1 queries |
| `all` | All four in parallel |

**Examples:** `/qa-audit a11y http://localhost:5173` · `/qa-audit all http://localhost:3000`

### `/qa-flaky`: fix flaky tests for real
**What it does:** reproduces the flake (repeat, parallel, shuffled, different timezone and CPU-starved runs), finds the **root cause** (timing, shared state, data collision, time, randomness, environment, or a real product race condition), fixes it **without retries or sleeps**, and proves it with something like `0/100 failures`.
**Examples:** `/qa-flaky checkout.spec.ts › applies coupon` · `/qa-flaky https://github.com/me/app/actions/runs/123`

### `/qa-release`: 🚦 go / no-go
**What it does:** runs the change analysis and the release gatekeeper together. It checks test suites, CI, open bugs, skipped or weakened tests, and dependency vulnerabilities, then gives **GO / GO WITH RISKS / NO-GO**, a confidence %, and what was not tested. It never deploys anything itself.
**Examples:** `/qa-release` (last tag → now) · `/qa-release v2.3.0..HEAD`

### Where Argus keeps its memory: the `.qa/` folder
```
.qa/
├── context.md     product knowledge (created by /qa-init, grows over time)
├── bugs/          bug reports
├── sessions/      exploratory session notes
├── reports/       test plans, audits, release reports
├── testcases/     CSV exports
└── evidence/      screenshots (keep this out of git)
```
Commit `.qa/` (except `evidence/`) so your whole team shares the QA memory.

---

# Part 3: Real-world workflows

### 🗓️ Sprint refinement
`📋 Test Plan` (web) or `/qa-plan #ticket` → bring the PO questions to the meeting → `/qa-cases` once the story is clear.

### 🔀 Every pull request
`/qa-diff 142` → fix or discuss the likely bugs → `/qa-automate tests for the P1 gaps` → merge with confidence.
*Without Claude Code:* paste the PR link in **🔍 Diff Review** on the website.

### 🧭 New feature on staging
`/qa-explore https://staging.myapp.com/new-feature` → `/qa-bug` for each finding → `/qa-automate regression tests for the bugs found`.

### 🔥 Customer escalation
`/qa-bug <the customer's message>` → Argus reproduces it and writes the report → `/qa-diff` on the suspected commit.

### 🚦 Release day
`/qa-audit all <staging url>` → `/qa-release` → humans make the final call using the report.

### 🧪 CI keeps failing randomly
`/qa-flaky <the test name>` → root cause + fix + `0/100` proof.

### 🎤 Showing Argus to your team
Open the website → **🔍 Diff Review → Load example → Review change**. A green test suite with 6 hidden bugs, found in under a minute.

---

## Understanding the evidence labels
| Label | Meaning | Example |
|---|---|---|
| ✅ **VERIFIED** | Argus executed something and saw the result (the output is cited) | `node -e …` → `subtotal -3600` |
| 👁 **OBSERVED** | Seen once, or reported by someone, but not reproduced | "the customer says it happens on Safari" |
| 🧠 **INFERRED** | Reasoned from code or documents, not executed | "line 25 no longer checks the owner" |
| ⛔ **NOT TESTED** | Out of scope or blocked, and always listed | "mobile app not checked" |

**Rule of thumb:** act on ✅ immediately. Verify 🧠 with the *Verify by* step Argus gives you. Never ignore ⛔. It's what you don't know yet.

---
*Questions or ideas? Open an issue on [GitHub](https://github.com/Myriambs/argus-qa/issues).*
