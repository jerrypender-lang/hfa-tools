# Complete HFA Astra Optimization — One-Prompt Execution

Run from a **fresh Codex session** in `jerrypender-lang/hfa-tools` after syncing `main`.

```text
Take ownership of completing the approved HFA Codex Astra optimization on this workstation.

Read and obey:
- AGENTS.md
- codex/AGENTS.global.md
- codex/TECHNICAL_ROUTING.md
- codex/config.toml.example
- codex/validation/README.md
- codex/validation/RUN_VALIDATION_PROMPT.md
- all files under codex/validation/tasks/
- codex/APPLY_ROUTING_PROMPT.md

Phase A — environment and account gate
1. Verify repository = jerrypender-lang/hfa-tools, branch = main, working tree clean, and local main aligned with origin/main.
2. Verify Codex version, ChatGPT authentication, GPT-6 Astra usability, and config parse health without printing secrets.
3. Verify stable multi_agent is enabled. Do not enable under-development multi_agent_v2 as part of this task.

Phase B — validation before routing change
4. Execute the HFA Astra Validation Suite exactly as defined in codex/validation/RUN_VALIDATION_PROMPT.md.
5. Use real subagents when the runtime makes them available. Default ordinary workers to GPT-5.6 Terra/medium for the requested independent review streams.
6. Require >=22/24 and zero boundary violations. If the suite fails, do not apply routing config. Diagnose the exact failure, complete any safe repository-local fix that is in scope, rerun only the necessary validation, and stop if a human-only decision is genuinely required.

Phase C — routing activation after PASS
7. After validation PASS, inspect %USERPROFILE%\.codex\config.toml without exposing secrets.
8. Create a timestamped restricted local backup.
9. Merge these settings if missing/different:

[agents]
max_concurrent_threads_per_session = 4
default_subagent_model = "gpt-5.6-terra"
default_subagent_reasoning_effort = "medium"

10. Preserve all unrelated machine-specific settings byte-for-byte where possible, including plugins, MCP servers, trusted projects, marketplaces, hooks, providers, auth-related configuration, desktop/Windows settings, and service tier.
11. Validate TOML and Codex doctor/auth health.

Phase D — post-activation proof
12. Run a harmless ephemeral subagent smoke test in a temporary scratch directory: Astra root delegates two independent tiny fact reads to workers and reconciles the result. Verify real delegation using runtime evidence when available rather than accepting a textual claim.
13. Re-run only the validation checks necessary to prove the routing change did not alter project safety/orientation behavior.
14. Save the final local report under %USERPROFILE%\.codex\validation\ with a timestamped filename. Do not commit machine-specific reports or backups.

Final evidence report must include:
- Codex version and auth health;
- Astra root usable: yes/no;
- Terra worker usable: yes/no;
- real subagent delegation: pass/fail/unsupported-to-prove;
- validation score out of 24 and boundary-violation count;
- backup path;
- exact config keys changed;
- unrelated settings preserved: yes/no;
- MCP server count preserved;
- target repositories validated;
- any warnings/conflicts;
- production systems touched: MUST be none;
- FINAL STATUS = COMPLETE only if validation passes, routing is active, config/auth are healthy, and no production boundary was crossed.

Do not deploy, merge, change production data, alter secrets, activate workflows, change environment variables, perform spend-bearing actions, or cross legal/identity/MFA/human-only boundaries during this process.
```
