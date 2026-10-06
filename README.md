# anupamchoudhari.com

My personal site. Plain Markdown files, built by [Hugo](https://gohugo.io) into static HTML, hosted free on GitHub Pages.

## Write a post

```sh
hugo new content workbench/my-prototype.md        # The Workbench
hugo new content toolkit/second-order-thinking.md # The Toolkit
hugo new content three-takeaways/7-powers.md      # Three Takeaways
hugo new content mildly-annoying/...              # Mildly Annoying
hugo new content parents-corner/...               # Parents Corner
hugo new content currently-brewing/...            # Currently Brewing
```

Each command starts the post from that section's default shape (`archetypes/`). Formats are defaults, not rules: delete or rearrange anything.

- **Link:** every post lives at `anupamchoudhari.com/<slug>`. The slug is the filename unless `slug:` says otherwise.
- **Section:** the folder a post sits in. It drives the breadcrumb. Moving a post to another folder never changes its link.
- **Drafts:** `draft: true` keeps a post off the live site. Delete the line to publish.
- **Themes:** `themes: [ai-that-ships]` groups posts across sections at `/themes/`.
- **Workbench beats:** a prototype can put its four beats in front matter (`beats:`) to get the numbered layout, or just use `##` headings in the body. Both work.
- **Homepage:** the hero, credibility strip and the three flagship pieces live in `content/_index.md`. A flagship piece shows once it's published.
- **Currently Brewing:** the roaster log is `data/roasters.yaml`; a roaster appears once its notes are filled in. "This month" is in `content/currently-brewing/_index.md`.
- **Road Trip Mode** (the Konami code) reads its stops from `data/roadtrip.yaml`.
- **About and Currently Brewing drafts** wait in `drafts/`; see `drafts/README.md`.

## Preview locally

```sh
hugo server -D    # -D also shows drafts; open http://localhost:1313
```

## Publish

Push to `main`. The workflow in `.github/workflows/deploy.yml` builds and deploys in about a minute.

## Interactive demos

Put a self-contained demo at `static/<post-slug>/demo/index.html`; it is served at `/<post-slug>/demo/`, right under its post. Context Passport's lives there now. Link to it, or embed it with:

```html
<iframe src="/context-passport/demo/" style="width:100%;height:600px;border:0"></iframe>
```

## Layout

| Path | What |
| --- | --- |
| `content/` | All writing, one folder per section |
| `layouts/` | HTML templates (header, breadcrumb, lists, 404) |
| `assets/css/tokens.css` | Every color, font and size. Edit only this to re-skin the site |
| `assets/css/site.css` | Layout and components; reads the tokens |
| `assets/js/easter-eggs.js` | Konami code, milk-and-sugar button, console note |
| `data/` | Roaster log and road trip stops |
| `archetypes/` | Starting shape for each kind of post |
| `static/` | Files copied as-is (images, demos, favicon) |
| `hugo.toml` | Site title, menu, flat-link rules |
