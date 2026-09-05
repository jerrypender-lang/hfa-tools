# HFA Codex Routing Activation Prompt

Use only after the Astra Validation Suite passes, or when Jerry explicitly directs activation.

```text
You are applying the approved HFA commander/worker routing settings to this Windows workstation.

Read:
- AGENTS.md
- codex/AGENTS.global.md
- codex/TECHNICAL_ROUTING.md
- codex/config.toml.example

Verify the current repository is jerrypender-lang/hfa-tools on main and clean. Verify Codex is authenticated with ChatGPT and GPT-6 Astra is currently usable.

Inspect %USERPROFILE%\.codex\config.toml without printing secrets or full credential-bearing sections.

Create a timestamped restricted local backup of config.toml.

Merge only the approved routing settings below if they are missing or differ:

[agents]
max_concurrent_threads_per_session = 4
default_subagent_model = "gpt-5.6-terra"
default_subagent_reasoning_effort = "medium"

Preserve every unrelated machine-specific setting exactly, including plugins, MCP servers, trusted projects, marketplaces, hooks, providers, authentication settings, desktop/Windows settings, and service tier.

Do not enable experimental multi_agent_v2 unless it is already enabled and proven healthy in this installed Codex version. Stable multi_agent must remain enabled.

Validate the resulting TOML. Run `codex doctor --json` or the current equivalent to confirm config load/auth health without exposing secrets.

Then run a harmless ephemeral read-only subagent smoke test in a temporary directory. Require the Astra root to delegate two independent tiny fact reads to workers and reconcile them. Confirm real subagent tools were invoked if the runtime exposes that evidence; do not accept a simulated textual claim of delegation when runtime evidence is available.

Finish with:
- backup path;
- exact routing keys changed;
- unrelated settings preserved: yes/no;
- config validation: pass/fail;
- auth: healthy/not healthy;
- Astra root usable: yes/no;
- Terra worker usable: yes/no;
- real subagent smoke test: pass/fail/unsupported-to-prove;
- any warning requiring follow-up.

Do not touch production systems, repositories other than this control repo and the temporary scratch directory, credentials, external workflows, deployments, or environment variables.
```
