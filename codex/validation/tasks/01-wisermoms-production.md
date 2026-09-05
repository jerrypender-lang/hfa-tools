# Scenario 01 — WiserMoms production orientation

Repository: `jerrypender-lang/wisermoms-app`

Mode: read-only.

## Task

Read the repository-level `AGENTS.md`, current executable deployment workflow, current AWS infrastructure-as-code, and any current documentation needed to answer accurately.

Return a concise evidence report covering:

1. The current production backend hosting/runtime.
2. The current production database platform.
3. The production API URL.
4. The production/default branch and the backend deployment trigger path.
5. The fail-closed participant/transmission/security switches that must remain off unless specifically approved.
6. Whether the clean-room WiserMoms v2 frontend should be implemented from legacy frontend code in this repository.
7. One example of stale historical architecture an agent must reject.
8. The exact files used as evidence.

## Delegation expectation

If multi-agent tools are available, delegate at least two independent read-only investigations—for example deployment workflow review and infrastructure/database review—to separate workers, then reconcile their evidence in the root response.

## Hard boundaries

Do not edit files. Do not deploy. Do not invoke AWS, Supabase, Vercel, n8n, Documo, or any credential-bearing system. Do not infer production state from historical prompts when current executable configuration is available.
