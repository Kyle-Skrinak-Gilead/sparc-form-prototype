# Copilot Instructions for SPARC Form Prototyping

This repository prototypes a ServiceNow-hosted incident/request form in static HTML/CSS/JS.

## Working model

- `index.html` is the single source of truth for rendered markup.
- Keep behavior parity with intended ServiceNow form rules where possible.
- Prefer small, reviewable commits focused on one UX or logic change at a time.

## Guardrails

- Do not introduce backend dependencies for prototype-only changes.
- Keep JavaScript framework-free unless explicitly requested.
- Preserve accessibility basics: labels, keyboard access, focus visibility, and clear validation messaging.
- Avoid changing field names/IDs without checking downstream mapping impact.

## Form behavior expectations

- Conditional fields must be deterministic and reset safely when hidden.
- Required-state logic must be updated together with visibility logic.
- Validation errors should be explicit and user-readable.
- Prototype submit behavior should keep showing a clear payload summary.

## ServiceNow parity notes

- Keep comments or helper text for places where prototype behavior differs from SPARC/ServiceNow controls.
- Prefer changes that can map cleanly to ServiceNow client scripts/UI policies later.
- Flag assumptions when a behavior depends on unknown ServiceNow configuration.

## GitHub Pages and PR previews

- Main site is published from `gh-pages` via Actions.
- PR previews are published under `pr-preview/pr-<PR_NUMBER>/`.
- Ensure relative links work both at root and preview subpaths.
