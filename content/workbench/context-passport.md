---
title: "Context Passport"
slug: context-passport
status: parked
themes: [ai-that-ships]
artifacts: [empathy-map, lean-canvas]
date: 2026-10-06
draft: true
description: "A personal knowledge base that travels between AI tools, so I stop re-introducing myself to software every morning."
cta: "Read the journey, click the UI"
demo: /context-passport/demo/
---

**A personal knowledge base that travels between AI tools, so I stop re-introducing myself to software every morning.**

[Try the prototype](/context-passport/demo/)

## The itch

I use four or five AI tools in a normal week, and every one of them meets me as a stranger.

The assistant I plan with knows how I think about roadmaps. The one in my editor knows which conventions I argue about. The one I draft in knows I hate the word "leverage". None of them know what the others know, so I spend the first three turns of every conversation re-explaining myself, badly, from memory. The context that makes the tool useful lives in my head and gets retyped, slightly differently, forever.

The vendors are solving this by remembering me inside their own walls. That is the wrong shape. My context is mine. It should sit somewhere I control, and tools should ask for the parts they need, the way a border officer looks at a passport instead of taking your whole filing cabinet.

So: a passport. One document I own, stamped by the tools that have seen it, handed over in slices.

## The empathy map

Before building anything I wrote down what this actually feels like, because the problem is emotional before it is technical.

| | |
|---|---|
| **Says** | "Just read my earlier chat." "You already know this." |
| **Does** | Keeps a scratch file of prompt preamble. Pastes the same three paragraphs into new chats. Abandons a tool rather than teach it again. |
| **Thinks** | "I am doing the tool's filing for it." "If I switch tools next year, all of this evaporates." |
| **Feels** | Mildly insulted, every single morning. |

The last row is the one that mattered. Nobody churns because of missing memory. They churn because teaching a machine twice feels like being unseen.

## The bet

From the Toolkit, this one came down to **hard-to-copy** rather than delight. Every assistant will have good memory within a year, so remembering me is not defensible for anyone except me. What is defensible is portability: a context store that is mine, outlives any single vendor, and gets more valuable the more tools it is stamped by.

That framed the first build as a curation problem, not a storage problem. Writing facts down is easy. Deciding which facts a given tool is allowed to see, and keeping them from rotting, is the whole product.

## What I built

A single-page prototype of the passport itself. No backend, no real tool integrations, mock data throughout, built in **[check: a weekend / two evenings — your call]**.

Three things work end to end:

1. **The passport.** Facts grouped into pages (who I am, how I work, what I am building, what I like), each with the tool that contributed it and when it was last confirmed.
2. **Intake.** Connect a tool and it proposes candidate facts it thinks it learned about you. You accept, edit, or reject each one. Nothing enters the passport unreviewed, which is the opposite of how assistant memory works today.
3. **Scoped handover.** Choose an audience, and the passport assembles only the pages that audience gets, as a context block you can paste into a system prompt. The coding tool gets conventions and nothing about coffee. A recruiter-facing agent gets the professional pages and never sees the personal ones.

Stale facts age visibly. Anything unconfirmed for a while gets marked for review, because a knowledge base nobody prunes becomes a liability about a year in.

**[check: stack — the prototype in the link is plain HTML/CSS/JS with no dependencies. If what you actually built was on something else (a local MCP server, a vector store, SQLite, Obsidian as the backing file), say so here instead; this is the part a technical reader will ask about first.]**

## What happened

Honest version: the interesting failure was not technical.

**Curation is the product, and curation is work.** Reviewing proposed facts is pleasant for about fifteen minutes. The moment the queue has forty items, it feels like email. Any real version needs to accept things by default and let you revoke, not the other way around, which is uncomfortable because it is exactly the trust model I was reacting against.

**Facts are the wrong unit.** "Prefers light roast" is a fact. "Thinks a roadmap should carry its abandoned bets" is a position, with history and caveats, and it does not survive being flattened into a bullet. The passport handles the first kind well and the second kind badly, which happens to be the kind that makes me useful.

**Scoping is the bit that felt genuinely good.** Watching the assembled context block shrink as I switched audience was the first moment this felt like a product rather than a text file with ambitions.

**[check: anything you measured, even roughly — how many facts it ended up holding, how many tools you wired, whether you kept using it after the build. One real number here does more than everything above it.]**

## What I'd do differently

- **Start from the handover, not the store.** The paste-into-a-system-prompt block is the only part anyone benefits from on day one. I built the filing cabinet first because filing cabinets are satisfying to build.
- **Make the tools write to it, not me.** Intake by review queue puts the labour on the human. The right version is a file the tools read on connect and append to on exit, with the human as editor rather than clerk.
- **Positions deserve a different page.** Short facts in one format, considered views in another, with room for "I used to think X".
- **Decide about sync early.** One local file is honest and does not travel. Anything that travels needs a sync story, and the sync story is where projects like this die.

Parked rather than killed: the standards work here (MCP-style tool access, portable memory formats) is moving fast enough that the right version of this might be six months of waiting and a weekend of building, rather than the reverse.

---

**Before you publish, this post needs from you:**
1. The real stack and build time (two `[check:]` blocks above).
2. Whether "Parked" is the right verdict, or whether you are still using it.
3. One real number in *What happened*.
4. The Lean Canvas is referenced in the front matter but not in the post; either drop it from `artifacts:` or add the canvas as a short block after *The bet*.
5. ~~Demo link~~ done: the prototype is served at /context-passport/demo/.
