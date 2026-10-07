---
title: "Context Passport"
slug: context-passport
stage: concept
themes: [ai-that-ships]
date: 2026-10-07
description: "Your context, owned by you, handed to each AI tool in slices."
blurb: "Your context, owned by you, handed to each AI tool in slices."
demo: /context-passport/demo/
---

## The itch

Every AI tool meets you as a stranger. The planner knows how you think about roadmaps, the editor knows your conventions, the drafting tool knows you hate the word "leverage", and none of them talk to each other. Vendors are fixing this by remembering you inside their own walls. The better shape is a passport: one document you own, stamped by the tools that have read it, handed over in slices. It keeps itself current as you work, so there's no queue at the passport office to renew it.

## How it works

<!-- Context Passport: how it works. Drop-in figure; colours and fonts come from the site's tokens.css. -->
<style>
  .cp-flow { margin: 2rem 0; }
  .cp-flow .scroll { overflow-x: auto; }
  .cp-flow svg { display: block; width: 100%; min-width: 560px; height: auto; color: var(--ink); }
  .cp-flow .box { fill: var(--paper); stroke: var(--ink-soft); stroke-width: 1.2; }
  .cp-flow .key { fill: var(--paper); stroke: var(--link); stroke-width: 2; }
  .cp-flow .page { fill: var(--paper); stroke: var(--rule); stroke-width: 1.2; }
  .cp-flow .sealed { stroke: var(--ink-soft); stroke-dasharray: 4 3; }
  .cp-flow .wire { fill: none; stroke: var(--ink-soft); stroke-width: 1.3; }
  .cp-flow .wire-key { fill: none; stroke: var(--link); stroke-width: 1.6; }
  .cp-flow .block { stroke: var(--ink-soft); stroke-width: 1.3; stroke-dasharray: 3 3; }
  .cp-flow .bar { stroke: var(--ink-soft); stroke-width: 2; }
  .cp-flow .hair { stroke: var(--rule); stroke-width: 1; }
  .cp-flow .t { font-family: var(--sans); font-size: 13px; fill: var(--ink); }
  .cp-flow .t2 { font-family: var(--sans); font-size: 12px; fill: var(--ink); }
  .cp-flow .t2b { font-family: var(--sans); font-size: 13px; font-weight: 700; fill: var(--ink); }
  .cp-flow .m { font-family: var(--mono); font-size: 10px; fill: var(--ink-soft); }
  .cp-flow .mode { font-style: italic; }
  .cp-flow .h { font-family: var(--mono); font-size: 11px; letter-spacing: .08em; fill: var(--ink); }
  .cp-flow .num { fill: var(--link); font-weight: 500; }
  .cp-flow .lk { fill: var(--link); }
  .cp-flow figcaption { font-family: var(--sans); font-size: .9rem; color: var(--ink-soft); margin-top: .75rem; max-width: var(--read, 38rem); }
</style>
<figure class="cp-flow">
  <div class="scroll">
  <svg viewBox="0 0 680 676" role="img" aria-label="Context Passport in four steps. Collect: context arrives from AI chats and Cursor by push, from Notion, Google Docs and Gmail by a daily pull, and from hand-written notes by photo upload. Filter: a small model drops anything not worth keeping, matches the rest against the store, and sends only changes and private items to you for review. Keep: facts live on five pages, each with its source and date. Hand over: scope rules decide which pages each agent gets over MCP; the Private page never leaves.">
    <defs>
      <marker id="cp-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--ink-soft)"/></marker>
      <marker id="cp-arrow-key" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--link)"/></marker>
    </defs>
    <text class="h" x="16" y="24"><tspan class="num">1</tspan>  COLLECT</text>
    <text class="m" x="102.0" y="24" text-anchor="start">where your context already lives</text>
    <rect class="box" x="10" y="40" width="128" height="50" rx="6"/>
    <text class="t" x="74.0" y="61" text-anchor="middle">AI chats</text>
    <text class="m" x="74.0" y="78" text-anchor="middle">Claude, ChatGPT</text>
    <line class="wire" x1="74.0" y1="90" x2="74.0" y2="124"/>
    <text class="m mode" x="79.0" y="108" text-anchor="start">push</text>
    <rect class="box" x="143" y="40" width="128" height="50" rx="6"/>
    <text class="t" x="207.0" y="61" text-anchor="middle">Coding agent</text>
    <text class="m" x="207.0" y="78" text-anchor="middle">Cursor</text>
    <line class="wire" x1="207.0" y1="90" x2="207.0" y2="124"/>
    <text class="m mode" x="212.0" y="108" text-anchor="start">push</text>
    <rect class="box" x="276" y="40" width="128" height="50" rx="6"/>
    <text class="t" x="340.0" y="61" text-anchor="middle">Docs and notes</text>
    <text class="m" x="340.0" y="78" text-anchor="middle">Notion, Google Docs</text>
    <line class="wire" x1="340.0" y1="90" x2="340.0" y2="124"/>
    <text class="m mode" x="345.0" y="108" text-anchor="start">pull, daily</text>
    <rect class="box" x="409" y="40" width="128" height="50" rx="6"/>
    <text class="t" x="473.0" y="61" text-anchor="middle">Email</text>
    <text class="m" x="473.0" y="78" text-anchor="middle">Gmail</text>
    <line class="wire" x1="473.0" y1="90" x2="473.0" y2="124"/>
    <text class="m mode" x="478.0" y="108" text-anchor="start">pull, daily</text>
    <rect class="box" x="542" y="40" width="128" height="50" rx="6"/>
    <text class="t" x="606.0" y="61" text-anchor="middle">Hand-written</text>
    <text class="m" x="606.0" y="78" text-anchor="middle">photo or screenshot</text>
    <line class="wire" x1="606.0" y1="90" x2="606.0" y2="124"/>
    <text class="m mode" x="611.0" y="108" text-anchor="start">upload</text>
    <line class="wire" x1="74.0" y1="124" x2="606.0" y2="124"/>
    <text class="h" x="16" y="152"><tspan class="num">2</tspan>  FILTER</text>
    <path class="wire" d="M108 124 V164" marker-end="url(#cp-arrow)"/>
    <rect class="box" x="20" y="166" width="176" height="58" rx="6"/>
    <text class="t" x="108.0" y="190" text-anchor="middle">Worth keeping?</text>
    <text class="m" x="108.0" y="209" text-anchor="middle">a small model decides</text>
    <line class="block" x1="108" y1="224" x2="108" y2="250"/><line class="bar" x1="98" y1="250" x2="118" y2="250"/>
    <text class="m" x="123" y="246" text-anchor="start">no: dropped</text>
    <path class="wire" d="M196 195 H250" marker-end="url(#cp-arrow)"/>
    <text class="m" x="224.0" y="188" text-anchor="middle">yes</text>
    <rect class="box" x="252" y="166" width="176" height="58" rx="6"/>
    <text class="t" x="340.0" y="190" text-anchor="middle">Already known?</text>
    <text class="m" x="340.0" y="209" text-anchor="middle">matched against the store</text>
    <text class="m" x="258" y="242" text-anchor="start">new: add it</text>
    <text class="m" x="258" y="256" text-anchor="start">same: refresh its date</text>
    <path class="wire" d="M428 195 H482" marker-end="url(#cp-arrow)"/>
    <text class="m" x="456.0" y="188" text-anchor="middle">changed</text>
    <rect class="box" x="484" y="166" width="176" height="58" rx="6"/>
    <text class="t" x="572.0" y="190" text-anchor="middle">You review</text>
    <text class="m" x="572.0" y="209" text-anchor="middle">changes and private bits</text>
    <path class="wire" d="M410 224 V316" marker-end="url(#cp-arrow)"/>
    <path class="wire" d="M572.0 224 V316" marker-end="url(#cp-arrow)"/>
    <text class="m" x="578.0" y="246" text-anchor="start">approved</text>
    <text class="h" x="16" y="296"><tspan class="num">3</tspan>  KEEP</text>
    <path class="box" d="M20 328 a320.0 10 0 0 1 640 0 V420 a320.0 10 0 0 1 -640 0 Z"/>
    <path class="wire" d="M20 328 a320.0 10 0 0 0 640 0"/>
    <text class="t2b" x="36" y="356" text-anchor="start">The passport</text>
    <text class="m" x="140" y="356" text-anchor="start">yours, local-first: one page per topic</text>
    <rect class="page" x="29" y="368" width="118" height="30" rx="6"/>
    <text class="t2" x="88.0" y="388" text-anchor="middle">Who I am</text>
    <rect class="page" x="155" y="368" width="118" height="30" rx="6"/>
    <text class="t2" x="214.0" y="388" text-anchor="middle">How I work</text>
    <rect class="page" x="281" y="368" width="118" height="30" rx="6"/>
    <text class="t2" x="340.0" y="388" text-anchor="middle">What I'm building</text>
    <rect class="page" x="407" y="368" width="118" height="30" rx="6"/>
    <text class="t2" x="466.0" y="388" text-anchor="middle">Preferences</text>
    <rect class="page sealed" x="533" y="368" width="118" height="30" rx="6"/>
    <text class="t2" x="592.0" y="388" text-anchor="middle">Private</text>
    <text class="m" x="36" y="408" text-anchor="start">each fact keeps its source and the date it was last confirmed</text>
    <text class="h" x="16" y="480"><tspan class="num">4</tspan>  HAND OVER</text>
    <line class="block" x1="592.0" y1="432" x2="592.0" y2="464"/><line class="bar" x1="582.0" y1="464" x2="602.0" y2="464"/>
    <text class="m" x="578.0" y="460" text-anchor="end">Private never leaves</text>
    <rect class="box" x="20" y="496" width="180" height="50" rx="6"/>
    <text class="t" x="110" y="517" text-anchor="middle">Scope rules</text>
    <text class="m" x="110" y="534" text-anchor="middle">who may read which page</text>
    <path class="wire" d="M200 521 H243" marker-end="url(#cp-arrow)"/>
    <path class="wire" d="M340 432 V494" marker-end="url(#cp-arrow)"/>
    <rect class="key" x="245" y="496" width="190" height="50" rx="6"/>
    <text class="t" x="340" y="517" text-anchor="middle">Handover</text>
    <text class="m lk" x="340" y="534" text-anchor="middle">over MCP, on request</text>
    <text class="m" x="452" y="517" text-anchor="start">Agents that ask, and</text>
    <text class="m" x="452" y="531" text-anchor="start">the pages each one gets</text>
    <line class="wire-key" x1="340" y1="546" x2="340" y2="558"/><line class="wire-key" x1="92.5" y1="558" x2="587.5" y2="558"/>
    <path class="wire-key" d="M92.5 558 V576" marker-end="url(#cp-arrow-key)"/>
    <rect class="box" x="15" y="578" width="155" height="86" rx="6"/>
    <text class="t" x="27" y="599" text-anchor="start">Coding agent</text>
    <text class="m" x="27" y="615" text-anchor="start">Cursor</text>
    <line class="hair" x1="27" y1="625" x2="158" y2="625"/>
    <text class="t2" x="27" y="641" text-anchor="start">How I work</text>
    <text class="t2" x="27" y="656" text-anchor="start">What I'm building</text>
    <path class="wire-key" d="M257.5 558 V576" marker-end="url(#cp-arrow-key)"/>
    <rect class="box" x="180" y="578" width="155" height="86" rx="6"/>
    <text class="t" x="192" y="599" text-anchor="start">Research agent</text>
    <text class="m" x="192" y="615" text-anchor="start">Perplexity</text>
    <line class="hair" x1="192" y1="625" x2="323" y2="625"/>
    <text class="t2" x="192" y="641" text-anchor="start">Who I am</text>
    <text class="t2" x="192" y="656" text-anchor="start">What I'm building</text>
    <path class="wire-key" d="M422.5 558 V576" marker-end="url(#cp-arrow-key)"/>
    <rect class="box" x="345" y="578" width="155" height="86" rx="6"/>
    <text class="t" x="357" y="599" text-anchor="start">Recruiter agent</text>
    <text class="m" x="357" y="615" text-anchor="start">a hiring bot</text>
    <line class="hair" x1="357" y1="625" x2="488" y2="625"/>
    <text class="t2" x="357" y="641" text-anchor="start">Who I am</text>
    <text class="t2" x="357" y="656" text-anchor="start">How I work</text>
    <path class="wire-key" d="M587.5 558 V576" marker-end="url(#cp-arrow-key)"/>
    <rect class="box" x="510" y="578" width="155" height="86" rx="6"/>
    <text class="t" x="522" y="599" text-anchor="start">Chat assistant</text>
    <text class="m" x="522" y="615" text-anchor="start">Claude, ChatGPT</text>
    <line class="hair" x1="522" y1="625" x2="653" y2="625"/>
    <text class="t2" x="522" y="641" text-anchor="start">Everything except</text>
    <text class="t2" x="522" y="656" text-anchor="start">Private</text>
  </svg>
  </div>
  <figcaption>Context comes in from wherever it already lives, gets filtered before it is kept, and goes out one slice per agent. AI chats sit at both ends: they create context and they use it.</figcaption>
</figure>

## Design decisions

### The store

| Option | Good at | Weak at |
|---|---|---|
| **Markdown files in git** | Readable, portable, every change has a history | Search beyond keywords |
| **SQLite** (full-text plus a vector extension) | One local file, fast search by keyword and by meaning | Not something you'd open and read |
| **Vector database** | Similarity search at scale | Overkill for one person; facts become opaque chunks |
| **Graph** | Relationships between people, projects and facts | Heavy to model and keep tidy |

**The pick:** Markdown is the source of truth, one file per page. SQLite is an index rebuilt from those files, so it can be thrown away and regenerated any time. Retrieval checks scope first and similarity second, so a page an agent isn't allowed never reaches the search at all.

### Intake

| Decision | The call | Priority |
|---|---|---|
| **Auth** | OAuth per source, read-only scopes, tokens kept on the device | Must |
| **Push or pull** | Agents push at the end of a session over MCP; docs and email get pulled | Must |
| **How often to pull** | Once a day in a batch | Must |
| **Worth keeping?** | A small model separates lasting facts from passing chatter, and raw text is dropped once checked | Must |
| **Already recorded?** | Match by meaning against the page. Same fact refreshes its date; a changed fact goes to review, with the old version kept | Must |
| **Webhooks instead of polling** | Gmail push and Notion webhooks, so changes arrive within minutes | Should |
| **Hand-written notes** | A photo or screenshot goes through a vision model, then the same filter | Should |
| **Auto-accept** | Skip review above a confidence threshold, so the queue stays short | Should |
| **Contradictions across sources** | Flag when two sources disagree about the same fact | Could |
| **Real-time capture** | Every message, as it happens | Won't |
| **Keeping raw documents** | Only extracted facts are stored, never the email or doc itself | Won't |
| **Writing back to sources** | The passport reads from your tools; it never edits them | Won't |

## Under the hood

- **MCP as the handover.** The passport runs as an MCP server, so any tool that speaks the protocol asks for context instead of being pasted into.
- **A small model for intake.** Filtering and matching are cheap, narrow jobs, which makes them a good test of how far a small, fast model goes before a frontier one is needed.

## Where it goes

The personal version is a concept. The bigger version of the same idea is being built for the enterprise: an organisation's AI context, scattered across tools and teams, brought together into one shared knowledge layer.
