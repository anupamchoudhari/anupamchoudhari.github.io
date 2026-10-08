---
title: "The DHM test, and where it breaks for AI features"
slug: dhm-test
themes: [deciding-what-to-build]
kind: framework
date: 2026-10-07
description: "A one-sentence test for whether a feature is strategy or just activity. It holds up almost everywhere, except on an AI roadmap, where nearly every line fails the same question."
blurb: "A one-sentence test for strategy, and the AI roadmap that fails it."
---

Gibson Biddle ran product at Netflix, and his definition of product strategy fits in one sentence: **delight customers, in hard-to-copy, margin-enhancing ways.** A feature has to do all three to count as strategy. Doing one or two makes it activity, which is still sometimes worth doing, as long as nobody mistakes it for the other thing.

Netflix's recommendations are the textbook case, and the one he uses himself. They delight, because people find something to watch instead of scrolling for twenty minutes. They are hard to copy, because they run on the viewing history of a very large number of members, which a new rival simply does not have. And they help margin, because a service that can steer people toward lesser-known titles gets more out of every title it pays for. The best walkthrough is his own, on [Lenny's Podcast](https://www.lennysnewsletter.com/p/gibson-biddle-on-the-the-dhm-product).

## Using it

Take a feature on the roadmap and ask three questions, in this order.

**Does it delight?** Useful is not enough. The bar is whether customers would complain if it disappeared. A surprising number of roadmap items fail here and get built anyway, usually because someone promised them to someone.

**Is it hard to copy?** If a competent competitor can ship the same thing in a quarter, it buys a quarter of advantage and nothing more. That can still be worth it. A checkout redesign that lifts conversion this year is a good investment even though everyone else will have one by next year. It is just not strategy, and planning as though it were leads to surprise when the advantage evaporates. For the long answer to what makes something genuinely hard to copy, see [7 Powers](/7-powers/).

**Does it help margin?** There are three ways in: customers pay more, each customer costs less to serve, or the next feature becomes cheaper to build. A feature that delights and can't be copied but costs a fortune to run is a hobby.

The order matters more than it looks. In most planning meetings margin gets discussed first, because it is the question with a spreadsheet attached. Asking about delight first means the harder conversation, whether anyone actually wants this, happens before the numbers make the decision feel settled.

## Where it helps, and where it doesn't

It earns its keep in a roadmap review where every item has a justification and nothing has a priority. Ask the three questions out loud, line by line, and the weak items tend to stop defending themselves. It also helps when choosing between two features that both look sensible: they rarely tie on all three, and the gap usually turns out to be in "hard to copy", which nobody had thought about. And because it is one sentence, it travels well in a pitch to people who have never heard of it.

It is the wrong tool in a few places:

- **Small work.** A bug fix or a sprint-sized improvement doesn't need a strategy test.
- **Platform and infrastructure.** A database migration delights nobody and is nobody's moat, and it still has to happen. The honest question there is what it costs *not* to do it.
- **Before there are customers.** The test assumes you know whom you are delighting. Early on, that is exactly what is unknown, so the answers come out confident and wrong.
- **Compliance and trust work**, where success means nobody notices anything.

## Where it breaks for AI features

Almost nothing in an AI product is hard to copy right now. Take a feature that summarises a customer's support tickets. It may have taken a team two months to get right, but it can be described in a paragraph, and the next model release makes that paragraph easier to build. Run DHM honestly across an AI roadmap and the middle question fails on nearly every line. Taken literally, that says build nothing, which can't be right.

Two adjustments keep the test useful.

**Score what the feature leaves behind, not the feature.** The summariser is copyable. What builds up while it runs is not. To know whether the summaries were any good, the team had to write test cases, argue about edge cases, and agree on what a good summary of an angry escalation looks like. That collection of examples, usually called an evaluation set, took months of judgement calls specific to this customer base, and a competitor starting today has none of it. The same goes for the usage data: which summaries agents edited, which they trusted, which they ignored.

**Ask how far the feature sits from the model.** Some features are thin layers over what the model already does: a chat window, a clever prompt, a summary. Each model release does more of that work for free, so the advantage shrinks on a schedule someone else controls. Other features live in the customer's own world: connections to their tools, their data, their approval steps, their definition of a correct answer. A better model makes those more valuable, because there is more it can do inside them.

That boils down to one question worth asking of every AI feature: *when the model underneath gets twice as good, does this become unnecessary, or more valuable?* The ones that become more valuable are strategy. The rest can still be worth building for the quarter they buy, as long as the plan says so.

<!-- DHM for AI features. Drop-in figure; colours and fonts come from the site's tokens.css. -->
<style>
  .dhm-fig { margin: 2rem 0; }
  .dhm-fig .scroll { overflow-x: auto; }
  .dhm-fig svg { display: block; width: 100%; min-width: 520px; height: auto; }
  .dhm-fig .box { fill: var(--paper); stroke: var(--ink-soft); stroke-width: 1.2; }
  .dhm-fig .faded { stroke: var(--rule); stroke-dasharray: 4 3; }
  .dhm-fig .key { fill: var(--paper); stroke: var(--link); stroke-width: 2; }
  .dhm-fig .wire { fill: none; stroke: var(--ink-soft); stroke-width: 1.4; }
  .dhm-fig .dashed { stroke-dasharray: 4 4; }
  .dhm-fig .wire-key { fill: none; stroke: var(--link); stroke-width: 1.8; }
  .dhm-fig .dot { fill: var(--paper); stroke: var(--ink-soft); stroke-width: 1.6; }
  .dhm-fig .dot-key { fill: var(--link); stroke: var(--link); stroke-width: 1.6; }
  .dhm-fig .t { font-family: var(--sans); font-size: 13px; fill: var(--ink); }
  .dhm-fig .muted { fill: var(--ink-soft); }
  .dhm-fig .t2 { font-family: var(--sans); font-size: 12px; fill: var(--ink); }
  .dhm-fig .m { font-family: var(--mono); font-size: 10px; fill: var(--ink-soft); }
  .dhm-fig .h { font-family: var(--mono); font-size: 11px; letter-spacing: .08em; fill: var(--ink); }
  .dhm-fig .lk { fill: var(--link); }
  .dhm-fig figcaption { font-family: var(--sans); font-size: .9rem; color: var(--ink-soft); margin-top: .75rem; max-width: var(--read, 38rem); }
</style>
<figure class="dhm-fig">
  <div class="scroll">
  <svg viewBox="0 0 640 376" role="img" aria-label="The DHM test asks whether a feature delights, is hard to copy, and enhances margin. For an AI feature, hard to copy is scored on what using the feature leaves behind, such as eval sets and workflow data, rather than the feature itself. Then features sit on a line of distance from the model: summaries, chat UI and prompt tricks become unnecessary as models improve; tool access, eval sets and workflow data become more valuable.">
    <defs>
      <marker id="dh-arrow-key" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="var(--link)"/></marker>
    </defs>
    <rect class="box" x="10" y="30" width="196" height="56" rx="6"/>
    <text class="t" x="108" y="54" text-anchor="middle">Delight</text>
    <text class="m" x="108" y="72" text-anchor="middle">would they miss it?</text>
    <rect class="key" x="218" y="30" width="196" height="56" rx="6"/>
    <text class="t" x="316" y="54" text-anchor="middle">Hard to copy</text>
    <text class="m" x="316" y="72" text-anchor="middle">can a rival ship it?</text>
    <rect class="box" x="426" y="30" width="196" height="56" rx="6"/>
    <text class="t" x="524" y="54" text-anchor="middle">Margin</text>
    <text class="m" x="524" y="72" text-anchor="middle">does it pay?</text>
    <text class="h" x="10" y="18" text-anchor="start">THE DHM TEST</text>
    <text class="h" x="10" y="122" text-anchor="start">FOR AN AI FEATURE, SCORE</text>
    <rect class="box faded" x="10" y="136" width="300" height="56" rx="6"/>
    <text class="t muted" x="160" y="160" text-anchor="middle">The feature itself</text>
    <text class="m" x="160" y="178" text-anchor="middle">copyable in a quarter</text>
    <rect class="key" x="330" y="136" width="300" height="56" rx="6"/>
    <text class="t" x="480" y="160" text-anchor="middle">What using it leaves behind</text>
    <text class="m" x="480" y="178" text-anchor="middle">eval sets · workflow data</text>
    <path class="wire-key" d="M314 86 V112 H480 V134" marker-end="url(#dh-arrow-key)"/>
    <text class="h" x="10" y="228" text-anchor="start">THEN ASK: WHEN THE MODEL GETS TWICE AS GOOD…</text>
    <line class="wire dashed" x1="30" y1="300" x2="320" y2="300"/>
    <line class="wire-key" x1="320" y1="300" x2="606" y2="300" marker-end="url(#dh-arrow-key)"/>
    <circle cx="70" cy="300" r="5" class="dot"/>
    <text class="t2" x="70" y="286" text-anchor="middle">Summaries</text>
    <circle cx="160" cy="300" r="5" class="dot"/>
    <text class="t2" x="160" y="272" text-anchor="middle">Chat UI</text>
    <circle cx="250" cy="300" r="5" class="dot"/>
    <text class="t2" x="250" y="286" text-anchor="middle">Prompt tricks</text>
    <circle cx="390" cy="300" r="5" class="dot-key"/>
    <text class="t2" x="390" y="272" text-anchor="middle">Tool access</text>
    <circle cx="480" cy="300" r="5" class="dot-key"/>
    <text class="t2" x="480" y="286" text-anchor="middle">Eval sets</text>
    <circle cx="570" cy="300" r="5" class="dot-key"/>
    <text class="t2" x="570" y="272" text-anchor="middle">Workflow data</text>
    <text class="m" x="30" y="324" text-anchor="start">…it becomes unnecessary</text>
    <text class="m" x="30" y="338" text-anchor="start">a countdown, worth a quarter at most</text>
    <text class="m lk" x="610" y="324" text-anchor="end">…it becomes more valuable</text>
    <text class="m lk" x="610" y="338" text-anchor="end">strategy: it compounds</text>
    <text class="m" x="320" y="364" text-anchor="middle">← close to the model · DISTANCE FROM THE MODEL · deep in the customer's workflow →</text>
  </svg>
  </div>
  <figcaption>Delight and margin work the same as always. Hard to copy moves: from the feature to what it leaves behind, and to which side of the line it sits on as the model improves.</figcaption>
</figure>
