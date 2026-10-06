# Drafts for pages that are already live

About and Currently Brewing are live pages (they hold the site's navigation), so their drafts can't sit in
`content/` with `draft: true` the way posts do. They wait here instead.

To publish one, fill its `[fill: ...]` and `[check: ...]` markers, then paste the body into:

- `drafts/about.md` → `content/about.md` (keep that file's front matter)
- `drafts/currently-brewing.md` → the body of `content/currently-brewing/_index.md`; the roaster
  entries go into `data/roasters.yaml`, which the page renders as a table
