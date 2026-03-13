# SPARC Incident Submission Form — Prototype

Static HTML/CSS/JS prototype for iterating on the SPARC incident submission form (ServiceNow-hosted).

## Purpose

Use this repo to prototype UI/UX changes to the form outside of ServiceNow, then apply approved changes to the live instance.

## Viewing the prototype

**Live preview:** https://kyle-skrinak-gilead.github.io/sparc-form-prototype/

Open `index.html` in a browser locally, or push changes to `main` and GitHub Pages will reflect them automatically.

## Structure

```
index.html        # Main form page
assets/
  css/            # Stylesheets
  js/             # Scripts
.github/
  workflows/      # Pages deploy + PR previews
  copilot-instructions.md
```

## Workflow

1. Make changes locally
2. Commit and push to `main`
3. GitHub Actions syncs `main` content to `gh-pages`
4. GitHub Pages serves the latest deployed content

## Pull request previews

Each PR publishes to:

`https://kyle-skrinak-gilead.github.io/sparc-form-prototype/pr-preview/pr-<PR_NUMBER>/`

The workflow comments this URL directly on the PR and removes it when the PR closes.
