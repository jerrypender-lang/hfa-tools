# HFA Cursor + Codex Setup

Use this as the workstation checklist for configuring Cursor to run Codex efficiently across HFA projects.

## 1. Cursor approvals and execution

In Cursor Settings -> Agents -> Approvals & Execution:

- Use Auto-review rather than blanket unrestricted execution.
- Allow safe shell/project-local actions to run automatically when classified low risk.
- Keep Guardrails enabled.
- Keep Auto-fix Errors enabled for normal coding loops.
- Avoid a global "run everything without review" mode for HFA work.

Target behavior: edits, searches, lint, type-check, tests, and builds should flow without unnecessary prompts; production/destructive actions should stop for review.

## 2. Model routing

Do not make one model the permanent default for every task.

Recommended routing:

- Fast/mechanical work: a fast low-cost Cursor model or equivalent.
- Normal implementation/debugging: a strong general coding model.
- Architecture/security/high-risk debugging: strongest reasoning model available.

The operating principle is latency/cost proportional to task risk, not maximum reasoning on every keystroke.

## 3. Rules

Use modern Cursor Project Rules under `.cursor/rules/` plus repo-root `AGENTS.md`.

Do not add new `.cursorrules` files; treat that legacy mechanism as deprecated.

`AGENTS.md` is the cross-agent contract. Cursor-specific rules should be short overlays, not duplicate manuals.

## 4. Indexing

In Cursor Settings -> Indexing & Docs:

- Confirm the active HFA repo is fully indexed.
- Keep dependency/build/cache/generated artifacts out of the index.
- Do not exclude source, tests, architecture docs, or operating rules that agents need.

Recommended ignore candidates when present:

- `node_modules/`
- `.next/`
- `dist/`
- `build/`
- `coverage/`
- cache/log directories
- large generated exports
- temporary upload/download directories

Treat ignore files as context/index hygiene, not as a security sandbox.

## 5. MCP/tool policy

Do not connect every HFA service to every coding session by default.

### Default/near-default

- GitHub: repository, PR, issue, and CI context.
- Browser/test tooling when UI verification is part of the task.

### Enable when task-specific

- Vercel: preview/deployment/log work.
- Supabase: schema/log/read-only diagnosis by default.
- n8n: workflow inspection/automation tasks.
- Airtable, ClickUp, Notion: operational context and requested updates.

### Keep gated

- database writes/migrations
- workflow activation/deletion
- production deployments/rollbacks
- environment variables/secrets
- billing/spend
- DNS/domains
- destructive Git actions

The objective is fewer irrelevant tools, lower context noise, and a smaller blast radius.

## 6. Codex global config

Start from `config/codex/config.toml.example`.

Desired baseline:

- `approval_policy = "on-request"`
- `sandbox_mode = "workspace-write"`
- `approvals_reviewer = "auto_review"`
- workspace network access off by default
- no repository-wide hard-pinned model

Use OS keyring/OAuth/environment-based secret handling rather than committed secrets.

## 7. Autonomous verification loop

For every coding task, Cursor/Codex should:

1. diagnose,
2. edit,
3. run the narrowest relevant check,
4. fix failures caused by the edit,
5. run broader lint/type-check/build where appropriate,
6. inspect final diff,
7. report evidence.

A coding agent should not call a task complete solely because a file changed.

## 8. HFA safety boundary

WiserMoms is beta-ready/frozen. Do not use this HFA-wide optimization effort to alter WiserMoms code, docs, configuration, database, branches, PRs, deployments, or MCP setup unless Jerry explicitly reopens it.

## 9. Recommended local confirmation test

After applying the settings, open a non-WiserMoms HFA repo and ask Cursor/Codex to make a harmless change on a temporary branch, then verify that it can:

- search the repo without prompts,
- edit project files,
- run a local test/lint/build loop,
- repair a deliberately small local failure,
- show the final diff,
- stop and ask before a simulated production/destructive action.

That test proves both autonomy and the safety boundary.
