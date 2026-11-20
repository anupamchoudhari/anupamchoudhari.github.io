/* engage.js - the bar at the end of each post: claps, share, subscribe, and (for the
   owner only) a view count. Talks to the Worker in /worker via data-api on .engage.
   Owner mode: open any page once with #owner=<OWNER_TOKEN>; it is remembered in this
   browser, your own visits stop counting as views, and posts show their view count. */
(function () {
  var box = document.querySelector(".engage");
  if (!box) return;
  var api = box.getAttribute("data-api");
  var slug = box.getAttribute("data-slug");

  function store(k, v) {
    try { if (v === undefined) return localStorage.getItem(k); if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) { return null; }
  }

  /* ---------- share ---------- */
  var copyBtn = box.querySelector(".share-copy");
  var nativeBtn = box.querySelector(".share-native");
  var url = copyBtn.getAttribute("data-url");
  var title = document.title.split(" · ")[0];
  // Native share sheet on phones and tablets; desktops keep the plain links.
  if (navigator.share && window.matchMedia("(pointer:coarse)").matches) {
    nativeBtn.hidden = false;
    nativeBtn.addEventListener("click", function () {
      navigator.share({ title: title, url: url }).catch(function () {});
    });
  }
  copyBtn.addEventListener("click", function () {
    var done = function () { copyBtn.textContent = "Copied"; setTimeout(function () { copyBtn.textContent = "Copy link"; }, 1600); };
    if (navigator.clipboard) navigator.clipboard.writeText(url).then(done, function () { prompt("Copy this link:", url); });
    else { prompt("Copy this link:", url); }
  });

  if (!api) return;

  /* ---------- owner mode ---------- */
  var m = location.hash.match(/^#owner=([\w-]+)$/);
  if (m) { store("owner", m[1]); history.replaceState(null, "", location.pathname + location.search); }
  if (location.hash === "#owner=off") store("owner", null);
  var owner = store("owner");
  var auth = owner ? { authorization: "Bearer " + owner } : {};

  function post(path, body) {
    return fetch(api + path, {
      method: "POST",
      headers: Object.assign({ "content-type": "application/json" }, auth),
      body: JSON.stringify(body),
      keepalive: true
    }).then(function (r) { return r.json().then(function (j) { if (!r.ok) throw j; return j; }); });
  }

  post("/view", { slug: slug }).catch(function () {});
  if (owner) {
    fetch(api + "/stats?slug=" + slug, { headers: auth }).then(function (r) { return r.ok ? r.json() : null; }).then(function (s) {
      if (!s) return;
      var v = document.createElement("span");
      v.className = "views muted";
      v.title = "Only you can see this";
      v.textContent = s.views.toLocaleString() + (s.views === 1 ? " view" : " views");
      box.querySelector(".engage-row").appendChild(v);
    }).catch(function () {});
  }

  /* ---------- claps ---------- */
  var reader = store("reader");
  if (!reader) {
    reader = (crypto.randomUUID ? crypto.randomUUID() : String(Math.random()).slice(2) + Date.now().toString(36));
    store("reader", reader);
  }
  var wrap = box.querySelector(".clap");
  var btn = box.querySelector(".clap-btn");
  var nEl = box.querySelector(".clap-n");
  var burst = box.querySelector(".clap-burst");
  var note = box.querySelector(".clap-note");
  var total = 0, mine = 0, max = 50, pending = 0, timer = null, hold = null, holdDelay = null;

  function render() {
    nEl.textContent = (total + pending).toLocaleString();
    btn.classList.toggle("clapped", mine + pending > 0);
    var left = max - mine - pending;
    btn.disabled = left <= 0;
    note.textContent = left <= 0 ? "That's the max. Thank you!" : (mine + pending > 0 ? "+" + (mine + pending) + " from you" : "");
  }

  fetch(api + "/claps?slug=" + encodeURIComponent(slug) + "&reader=" + encodeURIComponent(reader))
    .then(function (r) { return r.json(); })
    .then(function (d) { total = d.claps; mine = d.mine; max = d.max; wrap.hidden = false; render(); })
    .catch(function () {});

  function flush() {
    timer = null;
    if (!pending) return;
    var n = pending;
    post("/clap", { slug: slug, reader: reader, n: n }).then(function (d) {
      pending -= n; total = d.claps; mine = d.mine; render();
    }, function () { pending -= n; render(); });
  }

  function clap() {
    if (mine + pending >= max) return;
    pending++;
    render();
    burst.textContent = "+" + (mine + pending);
    burst.classList.remove("go"); void burst.offsetWidth; burst.classList.add("go");
    clearTimeout(timer);
    timer = setTimeout(flush, 900);
  }
  function stopHold() { clearTimeout(holdDelay); clearInterval(hold); hold = holdDelay = null; }

  // Tap to clap once; press and hold to keep clapping, like Medium.
  btn.addEventListener("pointerdown", function (e) {
    if (e.button !== 0) return;
    clap();
    holdDelay = setTimeout(function () { hold = setInterval(clap, 140); }, 450);
  });
  ["pointerup", "pointerleave", "pointercancel"].forEach(function (t) { btn.addEventListener(t, stopHold); });
  btn.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); clap(); } });
  btn.addEventListener("contextmenu", function (e) { e.preventDefault(); });
  window.addEventListener("pagehide", flush);

  /* ---------- subscribe ---------- */
  var form = box.querySelector(".subscribe");
  if (form) {
    form.hidden = false;
    var msg = form.querySelector(".subscribe-msg");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var b = form.querySelector("button");
      b.disabled = true;
      msg.textContent = "";
      post("/subscribe", { email: form.email.value, website: form.website.value }).then(function () {
        form.querySelector(".subscribe-row").hidden = true;
        msg.textContent = "Almost done. Check your inbox for a confirmation link.";
      }, function (err) {
        b.disabled = false;
        msg.textContent = (err && err.error) || "Something went wrong. Try again in a bit.";
      });
    });
  }
})();
