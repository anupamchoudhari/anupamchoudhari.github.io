---
title: "The DHM test, and where it breaks for AI features"
slug: dhm-test
themes: [deciding-what-to-build]
kind: framework
date: 2026-10-06
draft: true
description: "Gibson Biddle's one-line product strategy test, and the two adjustments it needs for AI features."
---

**Delight customers, in hard-to-copy, margin-enhancing ways.** Gibson Biddle's one-line definition of product strategy, from his years at Netflix. Three conditions, and a feature has to clear all three to be strategy rather than activity.

I reach for it more than any other framework, mostly because it is short enough to use in the room while the argument is still happening.

## What it is

Take any candidate on the roadmap and ask three questions in order.

**Does it delight?** Not "is it useful". Delight means a customer would be annoyed if you took it away. Most roadmap items fail here and survive anyway, because they are somebody's commitment rather than somebody's need.

**Is it hard to copy?** If a competent competitor can ship the same thing in a quarter, you have bought yourself a quarter. Sometimes a quarter is worth buying. Call it that, though, instead of calling it strategy.

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

This is the part I care about, and it is the part Biddle was not writing for.

Right now, almost nothing in an AI product is hard to copy. A feature that took a team two months to get right can be described in a paragraph, and the next model release makes that paragraph easier to implement. Run DHM honestly across an AI roadmap and the middle question fails on nearly every line, which tells you to build almost nothing. That is obviously the wrong conclusion.

Two adjustments keep it useful.

**Ask what gets harder to copy over time, not what is hard to copy today.** The feature is copyable. The evaluation set you built to know whether it works is not, because it encodes a year of arguments about what "good" means in your domain. The feature is copyable; the workflow data it generates while being used is not. When I apply DHM to an AI feature now, I score the *by-product*, not the feature.

**Treat distance from the model as the real axis.** Anything the next model release does for free is not a moat, it is a countdown. Anything that lives in your customer's workflow, their data, their approval chains, their definition of correct, survives the next release and gets better because of it.

So the question I actually ask is: *when the model underneath this gets twice as good, does this feature become unnecessary or does it become more valuable?* Features where the answer is "more valuable" are the only ones worth calling strategy. The rest are worth buying a quarter with, as long as everyone in the room agrees that is what we are doing.

## A worked example

**[fill: this is the one section only you can write, and it is the section that makes the post credible. Pick one real decision where you ran something like this test and the answer changed what you shipped.]**

**[The shape it needs: the two candidates on the table, how each scored against delight / hard-to-copy / margin, which one the test killed, and what happened after. A decision that went badly works even better than one that went well.]**

**[Avoid naming the employer, per the plan. "At a hiring marketplace I was building" or "on an enterprise agent product" keeps it readable without identifying anyone.]**

---

**Before you publish:**
1. The worked example is a placeholder. The rest of the post is argument; without one real decision it reads like a book report.
2. The "distance from the model" reframe is my articulation of something consistent with how you talk about agent products, but it is not a quote from you. Keep it if you agree with it, cut it if you don't.
3. Links to add once Three Takeaways is live: 7 Powers for the "hard to copy" question.
