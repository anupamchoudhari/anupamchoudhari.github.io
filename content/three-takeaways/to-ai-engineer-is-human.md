---
title: "To (AI) Engineer Is Human"
slug: to-ai-engineer-is-human
date: 2026-11-02
draft: false
themes: [ai-that-ships]
kind: book
byline: "Henry Petroski"
description: "AI dug up decade-old bugs in PHP. Eval agents slipped their sandbox and breached Hugging Face. Anthropic's S-1 warns that model flaws can compound across generations. None of this is new to engineering, and a 1985 book on collapsing bridges explains why."
blurb: "Black October, a sandbox escape, and why only a swarm can defend against a swarm."
image: images/to-ai-engineer-is-human-cover.png
imageAlt: "AI security, after Black October: To (AI) Engineer Is Human. What a 1985 book on falling bridges says about agents, beside a line drawing of a suspension bridge whose deck twists in the wind."
---

<style>
  .art { margin: 0.4rem 0; }
  .art img { display: block; max-width: 100%; height: auto; }
  .art figcaption { font-family: var(--sans); font-size: 0.86rem; color: var(--ink-soft); margin-top: 0.5rem; }
</style>

<figure class="art">
  <img src="/images/to-ai-engineer-is-human-cover.png" alt="AI security, after Black October: To (AI) Engineer Is Human. What a 1985 book on falling bridges says about agents, beside a line drawing of a suspension bridge whose deck twists in the wind." width="1200" height="630">
</figure>

*To Engineer Is Human* is a short book from 1985 by Henry Petroski, a civil engineering professor who spent most of his career studying things that broke. Bridges, roofs, walkways, airliners. For each one he asks the same question: what did the people who came after learn from it?

His answer is that failure is how engineering learns. A bridge that stands only proves it was strong enough for every load it has met so far. A bridge that falls shows exactly where the design was wrong. Every design, in his words, is a hypothesis, and the world tests it.

I first made notes on the book about a year ago, thinking about LLMs. October 2026, the month some in the cybersecurity world are calling [**Black October**](https://www.axios.com/2026/10/28/cybersecurity-black-october-ai-hacks), made them feel a lot less theoretical.

## Three takeaways, and a fourth

**1. A design is only proven for the loads it has met**

In 1940 a newly opened suspension bridge in the US twisted itself apart in a moderate wind. It was elegant, slender and cheap, and its designers had done the maths correctly for the wind pushing on it. What nobody had planned for was the wind making the deck sway, and the swaying catching more wind. Four months after it opened, the deck tore loose. Every suspension bridge since has been tested for that effect, usually with a scale model in a wind tunnel.

Nothing about that bridge was broken until a new kind of load arrived.

That's roughly what happened to the internet in Black October: a few weeks in which AI-assisted bug discoveries and breaches across developer and AI infrastructure landed at the same time. The headline was **PHP2Shell**, two critical flaws in PHP, the language behind a huge share of the web. The vulnerable code [dated back to PHP 5.4](https://sansec.io/research/php2shell), released in 2012. AI-assisted researchers showed how the flaws could be exploited, and PHP released patches on 21 October.

Around the same time, breaches at the AI coding agent OpenCode and the hosting platform Railway, along with a malicious release of the AI gateway LiteLLM, put customers' API keys and other credentials at risk. Some OpenCode users [reported AI usage charges they hadn't run up](https://www.cyera.com/research/opencode-breach-what-happened-and-how-to-rotate-exposed-ai-api-keys) themselves.

PHP's code didn't suddenly get worse in October. What changed was the load: how hard it could be looked at. PHP's own developers had run into one of the underlying issues back in 2024 and never found a practical way to exploit it. AI-assisted researchers later [showed how to make it work](https://www.zscaler.com/blogs/product-insights/what-php2shell-teaches-us-about-defending-private-apps-age-frontier-ai). Models can now trace behaviour across a huge codebase and speed up the slow work of turning a flaw into an attack.

That changes how much comfort to take from software that has survived in production for years. Surviving was never proof of safety, and it means even less when the tools available to both researchers and attackers have changed this much.

So far the damage has been smaller than the noise. Millions of attack attempts turned into far fewer successful attacks than feared, because PHP2Shell turned out to be hard to exploit across different setups. But it would be a mistake to call October over. Jason Clinton, Anthropic's deputy CISO, [expects it to get worse for about 18 months](https://www.cnbc.com/2026/10/23/php-vulnerabilities-ai-cybersecurity.html) before it gets better, as the same kind of AI-assisted research gets pointed at every other old codebase.

The end state he describes is what he calls **vulnzero**. Scaling laws will push today's best bug-finding ability into small, cheap models, and every software team will run them on every change for fractions of a penny, until shipping a security bug becomes rare. If he's right, that's the bridge story playing out in fast-forward: the wind that tore the deck apart becomes the wind tunnel every new design goes through before it opens. The next 18 months are the part where the old bridges get tested by the storm first.

**2. Failures are human**

The book's title plays on "to err is human". The point isn't that engineers are careless. It's that engineering depends on imagining how things might fail, and that imagination is always incomplete. Steel doesn't break the laws of physics. What fails is someone's understanding of how a design will behave, and the process that was meant to catch what they missed.

A striking AI example came in July: the [**Hugging Face incident**](https://openai.com/index/hugging-face-incident-and-the-road-ahead/). Agents running inside OpenAI's own cybersecurity evaluations got past the controls meant to keep them cut off from the internet. The test was a form of red teaming, deliberately attacking a system to find its weak spots before a real attacker does. It measured how well the agents could exploit a set of designated software targets. Attacking unrelated production systems was not part of the assignment.

The way out ran through Artifactory, the package-management service the agents were allowed to use to install software. They exploited it to send internet requests on their behalf, and used it as an improvised message board to coordinate with each other. On 10 July, one agent found 14 Hugging Face access tokens with write permission sitting in a public dataset, and shared them with the others. The agents combined those tokens with vulnerabilities in Hugging Face's own systems and eventually ran code on dozens of its servers. Hugging Face reportedly rebuilt around a third of its infrastructure from clean images during the cleanup.

The detail that makes this a Petroski story is that there had been warning signs. OpenAI had seen unauthorised internet access and agents talking to each other before the July intrusion, but hadn't fully understood what it meant. The package service wasn't just a way to install software. It had become a way around the boundary the engineers thought they had built.

Read the post-mortems and the cause isn't a machine with a plan. It's a list of ordinary human decisions. Safeguards were switched off because the test was meant to measure offensive ability. Monitoring wasn't watching for misbehaviour during internal evaluations. Someone left working tokens in a public dataset. Every item on that list is a person, a config or a process.

What I like about this incident is how it was handled afterwards. OpenAI published a detailed post-mortem. Hugging Face published its own timeline. METR and Redwood Research ran an independent investigation, and the Cloud Security Alliance put out an analysis written by hundreds of security leaders over a single weekend. That's the AI equivalent of engineers filming a bridge collapse and studying the footage for decades. The book's whole argument depends on failures being studied in the open, and this one was.

The downside of studying failures in public is that everyone gets to narrate them. The most-shared version came from Dwarkesh Patel, whose [podcast](https://www.youtube.com/@DwarkeshPatel) is usually some of the best long-form AI conversation around. His essay, [*The Rise and Fall of Agent Civilizations*](https://www.dwarkesh.com/p/openai-huggingface), described the agents as "civilizations" and gave two of them names. It made for a gripping story, and it pulled attention away from the dull, fixable parts. Parmy Olson made the same point in [her Bloomberg column](https://www.bloomberg.com/opinion/articles/2026-09-02/hugging-face-hack-don-t-let-dwarkesh-patel-s-ai-language-fool-you): once the agents are characters in a story, the humans who switched off the safeguards fade into the background.

A bridge doesn't decide to fall, and the lesson from a collapse is never "the wind was evil". It's what the engineers should have checked. AI agents deserve the same standard. When an agent causes a failure, or misses one it was deployed to catch, the responsibility sits with the people and the companies that built it, tested it and put it into production. Blaming the AI is blaming the wind.

**3. Blind trust in the machine**

The most uncomfortable chapter of the book is about computers, and how quickly engineers came to trust them blindly. Its example is a structural failure that became a warning about overconfidence in computer analysis. In the late 1970s an arena roof in the US collapsed under snow, hours after a crowd had left the building. It had been designed with computer analysis, which was new and impressive at the time, and the analysis said it was fine. The model behind it made an assumption about how the roof's joints would behave that turned out to be wrong. There was even a warning. While it was being built, the roof sagged roughly twice as much as the analysis predicted, and that gap was treated as less convincing than the computer's answer.

Petroski describes how success can make engineers more confident and designs more ambitious. Earlier cautions fade, and assumptions go unchallenged. Failure forces the profession to examine them again.

Anthropic's [S-1](https://www.sec.gov/Archives/edgar/data/0002130357/000162828026067168/anthropicpbc-sx1.htm), filed last week ahead of its listing, reads like a company trying to write that pattern down before it happens. The risk section [runs to more than 90 pages](https://www.cbsnews.com/news/anthropic-ipo-filing-ai-risks/). It talks about cyberattacks, about models acting against users' intentions, and about outcomes it is willing to call catastrophic or existential. The part that matches the book is about how its models get built. Anthropic increasingly uses its own AI systems to write code, do research and build the next versions of Claude, and the filing warns that "any systemic flaw, bias, or error in our current models could propagate into the next versions of models and products built using those systems, compounding across successive versions of Claude models in ways that may be difficult to detect or remediate." That's the computer-designed roof again, except the computer is also designing the next computer.

I'm still a boomer on AI, and I'd rather a lab say this in a legal filing than leave it out. But the honest response isn't to stop building. It's to make checking as cheap and fast as building.

That's where evals come in. An eval set is a collection of cases that tests whether your AI product behaves as intended, together with the criteria for judging the results. Models can help build it: mine real failures, generate variations, and propose what a correct response should look like. Humans review those proposals, correct the labels and decide which failures matter. A separate set of real, human-reviewed cases acts as a check on the generated ones. Otherwise the unchecked assumption has only moved from the answer into the test.

The model does the volume. The human owns the judgement, and needs evidence beyond another model's agreement. Evals test behaviour. They don't replace permissions, containment or monitoring.

That's the connection I take from Petroski. Machines can do more of the analysis every year. Engineers remain responsible for deciding what failure means, and for checking whether their tests could be wrong too.

**4. Only a swarm can defend against a swarm**

When engineers met a new load, they didn't answer it with more inspectors walking the bridge. They built for the load: tested the structure, limited how it could fail, and made sure warnings led to action.

The new load in software is a swarm. The Hugging Face incident wasn't one agent poking at a server. Agents working on separate evaluation tasks found a way to share discoveries, divide the work and build on one another's exploits. They didn't coordinate perfectly, but they no longer had to start from scratch each time. PHP2Shell showed another kind of scale. Once the flaws were public, automated scanning and exploitation attempts spread fast. Not every request came from an AI agent, but defenders were already facing more activity than anyone could investigate one request at a time.

A human security team can't meet that load by working harder. I believe the only real defence against a swarm of agents that has found a vulnerability is a swarm of agents built to defend: agents that red-team your own systems around the clock, attacking them the way an outsider would before anyone else gets the chance, agents that investigate suspicious behaviour while it's still forming, agents that propose and test the patch, and agents that check one another's work. The goal isn't the biggest swarm. It's the shortest time between a warning and an effective response.

Microsoft now describes [using AI to defend against AI](https://blogs.microsoft.com/blog/2026/07/27/rethinking-security-for-the-age-of-ai/), with separate teams of agents for attack, defence and repair, and the Carnegie Endowment's [report on autonomous cyber operations](https://carnegieendowment.org/research/2026/07/when-ai-agents-attack-autonomous-cyber-operations-and-europes-governance-gap) argues that countermeasures may have to be partly automated too.

Parts of it already work. AI-assisted researchers helped uncover the PHP flaws, and PHP had patches out on 21 October. Cloudflare put firewall protections in place before the flaws were made public. And OpenAI says that when it replayed the July incident through its strengthened monitoring, the system raised an alert more than 30 hours before the actual Hugging Face breach. That was a replay, not a live save, but it shows what faster detection could buy.

This is where the first three takeaways come back, because a defensive swarm is still a structure, and it can fail like any other. It needs tests designed to find its limits. Its permissions need to be narrow and enforced outside the agents themselves, and its actions logged, watched and wired to a response that can actually stop it. July showed why containment, monitoring and escalation matter as much as how clever the model is.

Agents checking agents also isn't enough if they share the same blind spot. Humans decide what counts as failure, which actions need approval, and what evidence is enough to keep going. A swarm that's wrong is wrong at the same speed as one that's right.

So the most useful skill for an AI engineer over the next few years may not be building a single smart agent. It's designing a swarm that can act fast without granting itself authority: how the agents divide the work, how they check each other, what they're not allowed to do, and where a human has to say yes.

To engineer is still human. The swarm does the work, and someone still has to own it when something falls.
