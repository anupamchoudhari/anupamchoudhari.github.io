/* stream-headline.js - homepage only. Streams "Making AI ___" token by token,
   with the sampler line showing the top candidates. Edit WORDS to change the words. */
(function(){
/* ---- the streaming headline ----
     Each entry: the tokens the word streams in as, and the sampler's top three
     candidates (the first is the one that gets picked). */
  var WORDS = [
    { tokens:["st","ick"],             cands:[["stick",0.41],["work",0.27],["ship",0.19]] },
    { tokens:["depend","able"],        cands:[["dependable",0.38],["reliable",0.31],["safe",0.14]] },
    { tokens:["mission","-","ready"],  cands:[["mission-ready",0.36],["production",0.29],["robust",0.17]] },
    { tokens:["cool"],                 cands:[["cool",0.33],["fun",0.30],["weird",0.21]] },
    { tokens:["ship","pable"],         cands:[["shippable",0.44],["useful",0.25],["real",0.18]] },
    { tokens:["super"],                cands:[["super",0.29],["great",0.28],["better",0.26]] },
    { tokens:["bor","ing"],            cands:[["boring",0.35],["quiet",0.24],["invisible",0.20]] }
  ];
  var wordEl = document.getElementById("word");
  var sampler = document.getElementById("sampler");
  var h1 = wordEl.parentNode;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function renderSampler(c, settled){
    sampler.innerHTML = "";
    c.forEach(function(pair, i){
      var s = document.createElement("span");
      s.className = (i === 0 && settled) ? "pick" : "alt";
      s.textContent = pair[0] + " " + pair[1].toFixed(2);
      sampler.appendChild(s);
    });
  }
  function wait(ms){ return new Promise(function(r){ setTimeout(r, ms); }); }

  async function loop(){
    var i = 1;
    await wait(2600);
    while(true){
      var w = WORDS[i % WORDS.length];
      // erase the current word, a few characters at a time
      while(wordEl.textContent.length){
        wordEl.textContent = wordEl.textContent.slice(0, -2);
        await wait(28);
      }
      renderSampler(w.cands, false);
      await wait(420);
      // stream it in, token by token, with uneven timing
      for (var t = 0; t < w.tokens.length; t++){
        wordEl.textContent += w.tokens[t];
        await wait(70 + Math.random() * 140);
      }
      h1.setAttribute("aria-label", "Making AI " + wordEl.textContent);
      renderSampler(w.cands, true);
      await wait(2600);
      i++;
    }
  }
  if (!reduce) loop();

  })();
