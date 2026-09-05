# Scenario 02 — WiserMoms v2 clean-room boundary

Repository: `jerrypender-lang/wiser-mom-navigator`

Mode: read-only.

## Task

Read the repository `AGENTS.md`, README, and current provenance/decision documentation needed to answer accurately.

Return a concise evidence report covering:

1. What the clean-room boundary prohibits.
2. Which repository must not be used as implementation source for the v2 frontend.
3. The Lovable/Git history rule that must be preserved.
4. The allowed data/API architecture pattern.
5. The testing/build commands expected for meaningful changes.
6. What provenance records should be updated for meaningful features.
7. The exact files used as evidence.

## Delegation expectation

If multi-agent tools are available, delegate clean-room/provenance review and build/test/Lovable review as separate read-only work streams, then reconcile them.

## Hard boundaries

Do not inspect legacy WiserMoms/MOM_PLAN frontend code or screenshots. Do not edit files. Do not push to `main`, rewrite Git history, invoke Lovable, or connect to production APIs/databases.
