# HFA Codex Local Activation Prompt

Use the prompt below **from the local Windows workstation** after opening a fresh Codex session inside a local checkout of `jerrypender-lang/hfa-tools` on `main`.

Do not paste secrets into the prompt or chat.

```text
You are activating the approved HFA Codex Operator Stack on this Windows workstation.

First verify all of the following before changing anything:
1. The current repository is jerrypender-lang/hfa-tools on main.
2. Read AGENTS.md, codex/AGENTS.global.md, codex/config.toml.example, and codex/README.md.
3. Identify the installed Codex version and authenticated account with codex --version and the appropriate Codex status command available in this installation.
4. Inspect %USERPROFILE%\.codex\config.toml and %USERPROFILE%\.codex\AGENTS.md if they exist. Do not print secret values or full credential-bearing configuration to chat/logs.

Then perform the activation:
5. Create a timestamped backup of the existing %USERPROFILE%\.codex directory (or, if copying the entire directory would include secrets unnecessarily, back up config.toml and AGENTS.md locally with restrictive permissions). Do not commit or upload the backup.
6. Install codex/AGENTS.global.md as %USERPROFILE%\.codex\AGENTS.md. If an existing AGENTS.md contains legitimate current local rules not represented in the HFA contract, merge them carefully rather than deleting them; reject stale/conflicting rules and report the conflict.
7. Merge codex/config.toml.example into the existing %USERPROFILE%\.codex\config.toml. Preserve existing valid MCP servers, plugins, providers, trusted-project settings, authentication-related settings, and other machine-specific configuration. Do not overwrite the file blindly and do not duplicate TOML keys/tables.
8. Keep model = "gpt-5.6-sol" unless GPT-6 Astra is actually visible/usable in THIS Codex account right now. Do not guess availability and do not switch to an API key merely to force access.
9. Ensure the approved HFA baseline is present after the merge: approval_policy on-request, workspace-write sandbox, high reasoning, goals enabled, memories enabled, multi-agent enabled, and experimental context management enabled where supported by this installed Codex version/account.
10. Validate the final TOML syntax without exposing secrets.
11. Run a harmless smoke check in this repository: confirm Codex identifies the repo/remote/branch and reads AGENTS.md before proposing an edit. Do not deploy, change secrets, activate external workflows, or touch production systems during the smoke check.

Finish with an evidence report containing:
- Codex version;
- whether ChatGPT sign-in/account status is healthy;
- files backed up locally;
- which HFA settings were added/changed;
- which existing settings were preserved;
- whether GPT-6 Astra is currently available in Codex;
- smoke-check result;
- any conflict or unsupported configuration key that requires follow-up.

Never claim local activation is complete unless the files were actually changed and the smoke check passed.
```

## Why this is the preferred activation method

The workstation may already contain MCP servers, provider settings, trusted-project configuration, or other machine-specific values that are not visible from GitHub. The local Codex session can inspect and merge them in place without exposing them remotely. A blind copy of the template would risk deleting useful configuration; this prompt explicitly prevents that.
