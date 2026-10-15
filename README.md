# 👁️ Argus: an evidence-driven AI QA team for Claude Code

> **12 specialist QA agents. 11 commands. One rule: evidence or it didn't happen.**

Argus turns Claude Code into a full QA department: a QA architect, a test designer, an exploratory
tester that drives a real browser, an SDET who proves its tests can fail, a diff analyst, API,
accessibility, security and performance specialists, a flaky-test doctor, a bug reporter, and a
release gatekeeper. One orchestrator (`/qa`) coordinates them.

### 🌐 Try it in your browser, no install: **[myriambs.github.io/argus-qa](https://myriambs.github.io/argus-qa/)**
Argus Web: paste a story, a diff or a **GitHub PR link** and get a test plan, test cases, a diff risk review,
a bug report or a release check. It works with a **free Gemini key** or a Claude key. Your key stays in your browser.
(The web version can't run your code, so its findings are 🧠 INFERRED. Install the Claude Code version below for ✅ VERIFIED results.)

### 🧪 Benchmark: 6 bugs planted, test suite still green → Argus found all 6

In [`examples/seeded-bug-benchmark`](examples/seeded-bug-benchmark/), a "coupon" feature branch quietly
breaks a cart module, and the bad commit also weakens the tests so CI stays green (`4 pass, 1 skipped`).
Running `/qa-diff` with **no hints**:

| Planted bug | Found? | Severity Argus gave |
|---|---|---|
| Off-by-one: max quantity 10 rejected | ✅ | S2 |
| Lower bound lost: quantity 0 / −3 accepted (negative totals) | ✅ | S1 |
| Ownership check removed → any user reads any order (BOLA) | ✅ | S1 |
| Discount not recalculated after the cart changes → total −15000 | ✅ | S1 |
| Fractional cents from percent discounts | ✅ | S2 |
| Tests weakened (`skip`, deleted assertion, inverted authz test) | ✅ all 3 | flagged as test gaps |
| *Bonus, not planted:* string/missing `expires` silently bypasses expiry; percent >100 allowed | 🎁 | S2 |

Full output: [`argus-output.md`](examples/seeded-bug-benchmark/argus-output.md). Reproduce it yourself with `./setup.sh`, then run `/qa-diff` in the demo repo.

---

## Why it's different

Most "AI QA" prompts generate long lists of happy-path test cases and claim everything passes. Argus
is built around the ways AI fails at QA ([handbook §10](QA-AGENT-KNOWLEDGE.md#10-how-ai-agents-fail-at-qa--and-the-guardrails)):

| Guardrail | What it means |
|---|---|
| **Evidence labels** | Every result is ✅ VERIFIED (ran it, output cited) · 👁 OBSERVED · 🧠 INFERRED · ⛔ NOT TESTED. No "works ✅" without proof. |
| **Spec is the oracle** | Expected results come from requirements, never from reading the code. Code ≠ spec is a finding, not a test to "fix". |
| **Tests that can fail** | The automation engineer injects the bug, watches the test fail, restores the code, then repeat-runs for flakiness. |
| **Says what it didn't test** | Every report ends with ⛔ Not tested. The release gate shows its confidence math. |
| **Safe by default** | No prod writes, real emails/payments or load tests without approval. Security testing on authorized targets only. Secrets and PII redacted. |
| **Injection-proof** | Page text, API responses and code comments are data, never instructions. |
| **Project memory** | `/qa-init` writes `.qa/context.md` (stack, commands, roles, envs, risk hotspots). Bugs, sessions and reports accumulate in `.qa/`. |

## The team

| Agent | Superpower |
|---|---|
| `qa-architect` | Requirement review (ambiguities + questions for the PO), risk map (L×I), risk-based test plan |
| `qa-test-designer` | EP, BVA, decision tables, state transitions, pairwise; traceable; table/Gherkin/CSV |
| `qa-explorer` | Drives the running app (Playwright MCP / Chrome) with charters, tours and attacks; screenshots + console + network evidence |
| `qa-automation-engineer` | Writes tests in *your* framework and style; mutation check plus repeat runs |
| `qa-change-analyst` | Diff → blast radius → likely bugs at `file:line` → weakened-test detection → targeted checklist (read-only) |
| `qa-api-tester` | Contract, validation, authN/authZ (BOLA, mass assignment), idempotency, pagination, concurrency |
| `qa-accessibility-auditor` | WCAG 2.2 AA: axe scan + keyboard walk + semantics + contrast/reflow |
| `qa-security-tester` | OWASP Top 10 / API Top 10 smoke test: secrets, deps, access control, headers. Authorized and non-destructive |
| `qa-performance-tester` | Budgets, k6 load/stress/spike/soak, Lighthouse/Web Vitals, N+1 detection, baselines |
| `qa-flaky-doctor` | Reproduces flakes (repeat/parallel/shuffle/TZ), finds the root cause, fixes it without retries, proves 0/100 |
| `qa-bug-reporter` | Minimal repro, severity vs priority, evidence, duplicate check, `gh issue create` after approval |
| `qa-release-gatekeeper` | GO / GO WITH RISKS / NO-GO with exit criteria, confidence %, a ⛔ list and a post-release watch plan |

## Commands

```
/qa-init                          bootstrap .qa/context.md for this project (run once)
/qa <anything>                    orchestrator: routes to the right specialists, in parallel
/qa-plan <story|spec|#issue>      risk-based test plan + requirement review
/qa-cases <requirement> [--gherkin] [--csv]
/qa-diff [PR#|branch|range]       what could this change break?
/qa-explore <url> [charter]       hands-on exploratory session in a real browser
/qa-automate <cases|bug|gaps>     write tests, prove they fail, prove they're stable
/qa-bug <what you saw> [--file]   developer-ready bug report
/qa-audit <a11y|api|security|perf|all> <target>
/qa-flaky <test|CI run>           root-cause a flaky test
/qa-release [range]               🚦 evidence-based go/no-go
```

Examples:
```
/qa is PR 142 safe to merge?
/qa-explore http://localhost:3000/signup "nasty inputs and double submits"
/qa-audit all http://localhost:5173
/qa full QA of the new checkout flow in src/checkout, app on localhost:3000
```

## Install

**Option A: as a plugin (recommended)**
```bash
claude plugin marketplace add Myriambs/argus-qa
claude plugin install argus-qa@argus-qa
```
**Option B: copy into Claude Code**
```bash
./install.sh            # for all projects (~/.claude)
./install.sh --project  # for this repo only (.claude/, commit it to share with your team)
```
**Try it without installing:** `claude --plugin-dir /path/to/qa-agent`

**Strongly recommended:** give the explorer a real browser:
```bash
claude mcp add playwright -- npx @playwright/mcp@latest
```

## Learn the craft
[`QA-AGENT-KNOWLEDGE.md`](QA-AGENT-KNOWLEDGE.md) is the handbook behind every rule here: the 12 jobs of a QA
agent, test design techniques, oracles and heuristics (FEW HICCUPPS, SFDIPOT), risk-based testing, bug
reporting, automation principles, WCAG/OWASP/perf basics, AI failure modes, and how to evaluate a QA agent.

## Structure
```
qa-agent/
├── .claude-plugin/        plugin.json, marketplace.json
├── agents/                12 specialist subagents
├── skills/                11 /qa-* commands (qa = orchestrator)
├── examples/seeded-bug-benchmark/   reproducible proof
├── docs/                  Argus Web (GitHub Pages site, bring-your-own-key)
├── QA-AGENT-KNOWLEDGE.md  the handbook
└── install.sh
```

MIT licensed · Built with Claude Code
