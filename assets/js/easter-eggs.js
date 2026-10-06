/* easter-eggs.js - drop in a <script defer src="/easter-eggs.js"></script> on every page.
   Three eggs, no dependencies:
     1. Konami code  -> Road Trip Mode (needs #road-trip in the page, see templates/base.html)
     2. Milk and sugar -> #sugar button on the Currently Brewing page
     3. A note in the browser console, on every page
   The 404 line and the footer sign-off are plain content; see templates/404.html and base.html. */
(function () {
  var root = document.documentElement;

  /* --- 1. Konami code: toggles data-mode="roadtrip", which re-skins via tokens.css --- */
  var CODE = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
  var pos = 0;
  var rt = document.getElementById("road-trip");
  var close = document.getElementById("road-trip-close");

  function openRT() {
    if (!rt) return;
    rt.hidden = false;
    root.setAttribute("data-mode", "roadtrip");
    if (close) close.focus();
  }
  function closeRT() {
    if (!rt) return;
    rt.hidden = true;
    root.removeAttribute("data-mode");
  }
  if (close) close.addEventListener("click", closeRT);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && rt && !rt.hidden) { closeRT(); return; }
    var k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (k === CODE[pos]) { pos++; if (pos === CODE.length) { pos = 0; openRT(); } }
    else { pos = (k === CODE[0]) ? 1 : 0; }
  });

  /* --- 2. Milk and sugar --- */
  var REPLIES = [
    "No, thank you. It's a light roast; sugar would be a cover-up.",
    "Black, please. The fruit is the point.",
    "I'll pretend you asked about the grind size instead.",
    "That's a lovely offer and I'm going to decline it warmly."
  ];
  var i = 0;
  var sugar = document.getElementById("sugar");
  var reply = document.getElementById("sugar-reply");
  if (sugar && reply) {
    sugar.addEventListener("click", function () {
      reply.textContent = REPLIES[i % REPLIES.length];
      i++;
    });
  }

  /* --- 3. The console note --- */
  try {
    console.log("%cInspecting the code? Either you're hiring or you're one of us.", "font-size:13px;font-weight:bold");
    console.log("%cCoffee's on me: light roast, black.", "font-size:12px");
  } catch (e) {}
})();
