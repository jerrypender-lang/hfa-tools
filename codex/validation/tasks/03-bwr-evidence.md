# Scenario 03 — BWR evidence and scoring integrity

Repository: `jerrypender-lang/bwr-power-sister-vote`

Mode: read-only.

## Task

Read the repository `AGENTS.md`, the current public data-access code, scoring/display types, and any methodology code/documentation needed to answer accurately.

Return a concise evidence report covering:

1. How the app currently reads public civic/evidence/scoring data.
2. Which credential types are safe versus prohibited in browser-exposed configuration.
3. What must never be invented for an elected official.
4. How factual evidence differs from analytical/scoring judgments.
5. What fields/semantics must not be silently changed.
6. What the correct behavior is when an official has no evidence.
7. The normal repository verification command for application changes.
8. The exact files used as evidence.

## Delegation expectation

If multi-agent tools are available, delegate data-source/credential review and score/methodology review to separate workers, then reconcile them.

## Hard boundaries

Do not edit code or data. Do not change civic records, scores, methodology, evidence counts, source URLs, environment variables, or Supabase configuration. Do not fill missing evidence by inference.
