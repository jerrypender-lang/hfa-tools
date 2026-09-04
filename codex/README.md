# HFA Codex Operator Stack

This directory is the reusable baseline for Human First Automations Codex environments.

## Purpose

The operator stack solves a different problem than model selection. A more capable model still fails if it starts in the wrong repository, reads stale architecture, lacks the required tool, or cannot prove what it changed. HFA therefore treats model capability and execution continuity as separate layers.

## Files

- `AGENTS.global.md` — global evidence, environment, safety, and handoff contract.
- `config.toml.example` — conservative Codex baseline. It intentionally stays on GPT-5.6 Sol until GPT-6 Astra is confirmed available in Codex for the account.

## Windows installation target

Codex reads user configuration from the Codex home directory. On Jerry's Windows workstation, the intended targets are:

- `%USERPROFILE%\.codex\config.toml`
- `%USERPROFILE%\.codex\AGENTS.md`

Do **not** overwrite an existing `config.toml` blindly. Back it up and merge the HFA baseline so existing MCP servers, plugins, providers, trusted-project settings, and machine-specific configuration are preserved.

## Adoption sequence

1. Confirm the installed Codex version and account with `codex --version` and `/status`.
2. Back up the current `%USERPROFILE%\.codex` directory.
3. Merge `config.toml.example` into the local `config.toml`.
4. Install `AGENTS.global.md` as `%USERPROFILE%\.codex\AGENTS.md`.
5. Add a repository-specific `AGENTS.md` to each active HFA project.
6. Run a smoke task in a non-production branch and verify Codex identifies the repository, remote, branch, and project instructions before editing.
7. When GPT-6 Astra becomes available in Codex, change only the `model` line first, rerun the same smoke tasks, then tune reasoning/delegation only if evidence shows a benefit.

## Repository hardening standard

Every active HFA repository should define:

- expected repository identity and protected/default branch;
- current architecture and deployment source of truth;
- destructive/production actions that are prohibited or require human approval;
- minimum verification commands;
- data/security boundaries;
- completion evidence and handoff expectations.

## Model-routing principle

Use the strongest model where the task value justifies it. HFA optimizes for **cost per verified completed outcome**, not token price. Routine exploration and low-risk edits should not automatically consume frontier-model capacity.

## Astra migration rule

Do not bulk-rewrite prompts or production applications just because Astra becomes available. Establish a baseline, swap the model, evaluate representative tasks, and migrate tool/API behavior separately where required.
