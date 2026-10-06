---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
slug: {{ .File.ContentBaseName }}
date: {{ .Date }}
draft: true
description: ""   # one line; shows on cards and lists
status: shipped   # shipped | parked | killed-with-dignity
themes: []        # ai-that-ships, deciding-what-to-build, skills-talent-work, leadership-from-books
artifacts: []     # optional: empathy-map, mindmap, swot, lean-canvas, the-bet
meta: ""          # e.g. "a weekend and two evenings"
cta: ""           # link text on the homepage card, e.g. "Read the journey, click the UI"
beats:
  - name: The itch
    text: ""
  - name: What I built
    text: ""
  - name: What happened
    text: ""
  - name: What I'd do differently
    text: ""
bet: ""           # optional: which Toolkit framework decided what to build first
---

<!-- Optional: empathy map, mindmap, SWOT, Lean Canvas, demo iframe. Delete if unused. -->
