# HFA Agent Operating Standard

This repository is the canonical shared operating standard for Codex, Cursor Agent, and other coding agents used across Human First Automations (HFA) projects.

## Mission

Produce the smallest correct change, preserve client and production safety, verify the affected surface, and report evidence before declaring completion.

## Operating principles

1. Diagnose before designing. Identify the binding constraint or failure before editing.
2. Prefer the smallest reversible change that solves the actual problem.
3. Use autonomous edit -> verify -> fix loops for safe workspace-local work.
4. Require human approval for destructive, production, billing, credential, or irreversible actions.
5. Never expose secrets, client PII/PHI, API keys, tokens, credentials, private documents, or production exports in commits, logs, screenshots, fixtures, or responses.
6. Never deploy, merge, mutate production data, change billing, rotate secrets, or modify live infrastructure as a side effect of a coding task.
7. Do not add dependencies, frameworks, abstractions, or services unless the task clearly benefits from them.
8. Treat repository code and current runtime behavior as source of truth when old notes conflict.

## HFA-specific boundaries

- WiserMoms is beta-ready/frozen. Do not modify any WiserMoms repository, app code, docs, config, database, deployment, branch, PR, or MCP setup unless Jerry explicitly reopens that work.
- HFA operational systems may include Supabase, n8n, Vercel, Airtable, ClickUp, Notion, GitHub, and other connected tools. Use least privilege and task-specific access.
- Production database writes, workflow activations, environment-variable changes, spend-bearing actions, domain/DNS changes, and destructive Git operations require explicit human intent.
- Never store secrets in AGENTS.md, Cursor rules, Codex config examples, memory files, or committed MCP configuration.

## Working method

1. Read the task and define success in one sentence.
2. Inspect only the smallest relevant set of files and tools.
3. Check existing patterns before introducing anything new.
4. Make a surgical diff.
5. Run the narrowest relevant verification first.
6. Fix failures caused by the change before reporting completion.
7. Review the final diff for accidental secrets, unrelated edits, debug code, generated artifacts, and unsafe infrastructure changes.
8. Report files changed, behavior changed, verification run/results, anything unverified, and any remaining manual/production step.

## Tool policy

### Tier 1 — default coding tools

Use freely for normal development when available:

- repository/file search
- Git status/diff/log/read-only history
- local shell inside the project sandbox
- lint, type-check, unit tests, contract tests, build
- browser/UI verification against local or preview environments

### Tier 2 — task-specific connected tools

Enable/use only when the task requires them:

- GitHub: PRs, issues, CI, repository context
- Vercel: deployment inspection, logs, preview verification; production changes require explicit intent
- Supabase: schema/log/read-only inspection by default; writes/migrations require explicit intent
- n8n: workflow inspection by default; activation/deletion/credential changes require explicit intent
- Airtable / ClickUp / Notion: operational context or updates only when relevant to the task

### Tier 3 — gated actions

Always require human approval or explicit user intent:

- production data writes or deletes
- database migrations/schema changes
- live workflow activation/deactivation/deletion
- secrets or environment-variable changes
- billing/spend changes
- DNS/domain changes
- production deployment or rollback
- destructive Git operations, force push, branch deletion
- emailing, publishing, submitting forms, or external communications on behalf of HFA/client unless explicitly requested

## Model routing

Do not hard-pin one model for every task.

- Fast model: search, renames, formatting, mechanical edits, small tests.
- General coding model: normal multi-file implementation and debugging.
- Deep reasoning model: architecture, security, data boundaries, difficult production incidents, migrations, and high-risk reviews.

Use the cheapest/fastest model that can safely complete the task. Escalate only when complexity or risk warrants it.

## Verification standard

A task is not complete because code was written. It is complete when the affected surface has evidence.

Preferred order:

1. targeted unit/contract check
2. type-check/lint
3. build
4. browser or integration verification when relevant
5. CI/preview confirmation for release-sensitive changes

Do not run live-data smoke tests merely to prove code works.

## Completion report

Every completed coding task should state:

1. files changed,
2. behavior changed,
3. verification commands and results,
4. anything not verified,
5. manual, deploy, data, or approval step still required.
