# HFA Tools — Agent Operating Contract

This repository is the shared control-plane repository for Human First Automations development standards and operator tooling.

Before doing work here, read [`codex/AGENTS.global.md`](codex/AGENTS.global.md). Treat it as the canonical HFA-wide Codex operating contract unless a target project has a stricter repository-level `AGENTS.md`.

## Repository rules

- Verify the repository and current branch before editing.
- Keep shared standards vendor- and project-aware; do not copy a project-specific production architecture into an HFA-wide rule.
- Do not store API keys, tokens, passwords, private keys, connection strings, client PII/PHI, or production exports here.
- Prefer branches and PRs for shared-control changes.
- Retire or clearly mark superseded standards instead of leaving multiple active instructions that contradict one another.
- Current target-project `AGENTS.md` files outrank historical HFA examples when operating inside those projects.
- Do not assume WiserMoms is frozen: use the current WiserMoms repository contract and active project direction.

## Completion evidence

For meaningful changes, report the branch, files changed, checks actually run, what remains local/manual, and any project whose current contract must also be updated.
