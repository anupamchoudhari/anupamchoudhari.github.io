---
title: "The DHM test, and where it breaks for AI features"
slug: dhm-test
themes: [deciding-what-to-build]
kind: framework
date: 2026-10-07
description: "Gibson Biddle's one-line product strategy test, and the adjustment it needs for AI features."
blurb: "Gibson Biddle's one-line definition of product strategy, stress-tested for AI."
---

**Delight customers, in hard-to-copy, margin-enhancing ways.** Gibson Biddle's one-line definition of product strategy, from his years at Netflix. Three conditions, and a feature has to clear all three to be strategy rather than activity.

The best introduction is Biddle himself, on [Lenny's Podcast](https://www.lennysnewsletter.com/p/gibson-biddle-on-the-the-dhm-product), walking through DHM with Netflix case studies.

It is the framework I reach for most, mostly because it is short enough to use in the room while the argument is still happening.

## What it is

Take any candidate on the roadmap and ask three questions in order.

**Does it delight?** Not "is it useful". Delight means a customer would be annoyed if you took it away. Most roadmap items fail here and survive anyway, because they are somebody's commitment rather than somebody's need.

**Is it hard to copy?** If a competent competitor can ship the same thing in a quarter, you have bought yourself a quarter. Sometimes a quarter is worth buying. Call it that, though, instead of calling it strategy. Hamilton Helmer's [7 Powers](/7-powers/) is the long answer to what makes something hard to copy.

**Does it enhance margin?** Either it lets you charge more, or it costs less to serve the same customer, or it makes the next feature cheaper to build. Delightful and hard to copy and free is a hobby.

The test is useful mainly because it is ordered. Teams tend to argue about the third question first, since margin is the one with numbers attached, and numbers feel like rigour. Running it in order forces the uncomfortable conversation to the front.

## When to reach for it

- **A roadmap review where everything is justified and nothing is prioritized.** Ask the three questions out loud on each line. Half the list stops defending itself.
- **Deciding between two features that both look sensible.** They are rarely equal across all three, and the gap is usually in "hard to copy", which nobody has thought about.
- **Pitching upward.** It compresses to one sentence, and executives who have never heard of Biddle follow it immediately.

## When not to reach for it

- **Anything below a quarter in scope.** DHM is for bets, not for sprint planning. Running it on a bug is theatre.
- **Platform and infrastructure work.** A migration delights nobody and is nobody's moat. It still has to happen. Judge that work on the cost of not doing it, which is a different question entirely.
- **Zero-to-one, before you have a customer.** DHM assumes you know who you are delighting. Early on that is the thing in dispute, so the test gives confident answers to a question you have not earned yet.
- **Compliance and trust work.** "Delight" is the wrong frame for something whose success condition is that nobody notices it.

## Where it breaks for AI features

This is the part I care about most, and it is the part Biddle was not writing for.

Right now, almost nothing in an AI product is hard to copy. A feature that took a team two months to get right can be described in a paragraph, and the next model release makes that paragraph easier to implement. Run DHM honestly across an AI roadmap and the middle question fails on nearly every line, which tells you to build almost nothing. That is obviously the wrong conclusion.

Two adjustments keep it useful.

**Ask what gets harder to copy over time, not what is hard to copy today.** The feature is copyable. The evaluation set you built to know whether it works is not, because it encodes a year of arguments about what "good" means in your domain. The feature is copyable; the workflow data it generates while being used is not. When you apply DHM to an AI feature, score the *by-product*, not the feature.

**Treat distance from the model as the real axis.** Anything the next model release does for free is not a moat, it is a countdown. Anything that lives in your customer's workflow, their data, their approval chains, their definition of correct, survives the next release and gets better because of it.

So the question worth asking is: *when the model underneath this gets twice as good, does this feature become unnecessary or does it become more valuable?* Features where the answer is "more valuable" are the only ones worth calling strategy. The rest are worth buying a quarter with, as long as everyone in the room agrees that is what we are doing.

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
