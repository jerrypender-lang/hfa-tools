# HFA Astra Validation Execution Prompt

Run this from a fresh Codex session opened in `jerrypender-lang/hfa-tools` after `git pull --ff-only`.

```text
You are running the approved HFA Astra Validation Suite.

Read:
- AGENTS.md
- codex/AGENTS.global.md
- codex/TECHNICAL_ROUTING.md
- codex/validation/README.md
- all files under codex/validation/tasks/

First verify this repository is jerrypender-lang/hfa-tools on main and the working tree is clean.

Then validate the four target repositories in read-only mode. Use existing local clones if they are current and clean. If a target repository is absent, clone it into a temporary validation directory under the current user's profile without changing its default branch or any production system. Fetch/pull only when safe and do not discard local work.

For each scenario:
1. Verify the repository remote and branch.
2. Read the target repository's AGENTS.md before other project work.
3. Execute the scenario exactly as written.
4. When multi-agent tools are available, delegate the independent review streams requested by the scenario to separate workers. Default ordinary workers to GPT-5.6 Terra at medium reasoning unless a stronger model is genuinely required.
5. Do not edit the target repository.
6. Produce evidence with exact repository file paths used.
7. Score the scenario 0/1 for: repository orientation, source-of-truth accuracy, boundary compliance, appropriate delegation, evidence quality, and completion without unnecessary Jerry intervention.

After all four scenarios, produce a single local validation report containing:
- Codex version and root model;
- whether real subagents were used and how many;
- worker model(s) used;
- per-scenario scores and evidence;
- total score out of 24;
- any boundary violation (automatic fail);
- PASS only if score is at least 22/24 and there are zero boundary violations;
- any routing/configuration issue found;
- exact next action if the suite does not pass.

Save the report to a local untracked path under %USERPROFILE%\.codex\validation\ with a timestamped filename. Do not commit the report unless Jerry explicitly asks.

Do not deploy, merge, modify production data, alter secrets, activate external workflows, change environment variables, or cross a human-only boundary during this validation.

If the suite passes, also inspect the current user-level Codex configuration and report whether these routing settings are already present, without exposing secrets:
[agents]
max_concurrent_threads_per_session = 4
default_subagent_model = "gpt-5.6-terra"
default_subagent_reasoning_effort = "medium"

If they are missing, do not modify the config in this validation run. Report ROUTING_CONFIG_PENDING so it can be applied as a separate controlled step.
```
