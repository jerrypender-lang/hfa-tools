# HFA Technical Agent Routing Standard

Last updated: 2026-09-05

This document defines how HFA routes technical work across GPT-6 Astra, GPT-5.6 Terra, GPT-5.6 Luna, human decision-makers, and connected tools. It complements `codex/AGENTS.global.md`; project-level `AGENTS.md` files remain authoritative for project-specific architecture and production rules.

## Operating model

HFA uses a commander/worker pattern rather than one model for every task.

- **Astra = technical commander.** Use for architecture, ambiguous multi-step work, cross-repository reasoning, difficult debugging, high-risk changes, security-sensitive reviews, release decisions, and integration of multiple worker results.
- **Terra = default technical worker.** Use for repository exploration, code tracing, ordinary implementation chunks, test triage, documentation analysis, data-contract review, and bounded refactors.
- **Luna = mechanical worker.** Use for low-risk search, inventory, formatting, repetitive edits, simple transforms, and batch classification where mistakes are easy to detect and reverse.
- **Jerry = HITL decision owner.** Reserve Jerry for consequential business decisions, spend, legal attestations/signatures, credential disclosure/rotation, destructive production data changes, and production activation when no standing approval exists.

## HFA business-to-technical ownership

The business operating layer and technical execution layer are separate:

| Work | Business owner | Technical owner | Default model |
|---|---|---|---|
| Cross-project prioritization | Maxine / COO | CTO agent | Astra |
| Architecture and release design | CTO agent | Astra root session | Astra |
| Security boundary review | CSO | Astra reviewer | Astra |
| Financial/compliance logic | CFO | deterministic code + technical reviewer | Astra for review, Terra for bounded implementation |
| Repository exploration | CTO | Tier-3 explorer | Terra |
| Ordinary implementation | CTO | Tier-3 implementation worker | Terra |
| Mechanical cleanup/inventory | CTO | Tier-3 mechanical worker | Luna |
| Test triage / failure isolation | CTO / QA | Tier-3 QA worker | Terra |
| Final integration and evidence | CTO | Astra root session | Astra |
| Irreversible human-only action | Jerry | none delegated | Human |

## Delegation rules

The Astra root agent should delegate when two or more work streams are genuinely independent and parallel work will reduce elapsed time or improve review quality.

Good delegation targets:

- separate repository areas;
- independent failure investigations;
- documentation review versus implementation review;
- test failure classification;
- security review separate from feature implementation;
- source/evidence validation separate from presentation work.

Do **not** parallelize:

- two agents writing the same file or tightly coupled code path;
- production deployment steps;
- credential handling;
- destructive database work;
- final merge/release authority;
- decisions whose answer changes the architecture for every worker.

The root agent remains responsible for reconciling worker output, resolving conflicts, running final verification, and producing the evidence report.

## Concurrency standard

Start with a maximum of **4 concurrent subagent threads per session** for HFA work. This is enough to gain parallelism without turning every task into a swarm or burning allowance on redundant analysis.

Raise above 4 only when the task clearly has more than four independent work streams and the expected time savings justify the additional usage.

## Reasoning-effort routing

| Task | Model | Effort |
|---|---|---|
| Architecture, production incident, security, multi-repo synthesis | Astra | high |
| Difficult independent investigation | Terra | high |
| Normal implementation / repo exploration / QA | Terra | medium |
| Mechanical inventory / low-risk repetitive task | Luna | low or medium |
| Final high-risk review before merge/release | Astra | high |

Do not use maximum reasoning by default. Escalate reasoning only when the binding problem requires it.

## Tool routing

Use the smallest relevant tool set.

- **GitHub**: source, branches, PRs, CI, release evidence.
- **n8n**: workflow inspection and automation work only when the task actually concerns n8n.
- **Supabase/Postgres**: schema/query work only for systems that currently use it; never infer Supabase production architecture from an old skill or handoff.
- **Vercel/Lovable/AWS**: use only for the project and environment named in the task, under that repository's production rules.
- **ClickUp**: execution status and assigned work.
- **Airtable**: structured operational data.
- **Notion**: durable knowledge/context.

Do not load every MCP or connected tool into every task. Irrelevant tools increase context noise and blast radius.

## Verification routing

Use risk-proportional verification:

1. Run the narrowest meaningful check for the changed surface.
2. Complete repository-required checks.
3. Broaden or repeat testing only if the change, failures, or unresolved risk justify it.
4. Do not create redundant tests for reversible low-impact changes that merely mirror the implementation.
5. High-risk work gets a separate review pass before merge or release.

## Cost rule

HFA optimizes **cost per verified completed outcome**, not price per token.

Astra should not perform work that Terra or Luna can complete reliably. Terra and Luna should not make architecture or production-risk decisions merely because they are cheaper.

For new recurring workflows, collect at least these metrics before changing the routing standard:

- first-pass verified completion rate;
- retries per task;
- Jerry interventions per task;
- elapsed time to verified completion;
- CI failures caused by agent changes;
- model/credit usage where available.

## Standing decision boundary

If a task is reversible, repository-local, within an approved requirement, and the current `AGENTS.md` permits it, the technical system should bias toward action and complete the work without repeatedly stopping Jerry.

If a task crosses a human-only boundary, stop that specific action, complete all independent safe work, and present Jerry with one concrete decision rather than a list of broad questions.
