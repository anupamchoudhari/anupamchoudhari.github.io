/* toc.js - the "On this page" nav: open as a rail on wide screens, a pill on narrow ones,
   and mark the section being read. */
(function () {
  var nav = document.querySelector(".toc");
  if (!nav) return;
  nav.classList.add("js");
  var box = nav.querySelector("details");
  var wide = window.matchMedia("(min-width: 75rem)");
  var sync = function () { box.open = wide.matches; };
  sync();
  wide.addEventListener("change", sync);

  var links = Array.prototype.slice.call(nav.querySelectorAll("a[href^='#']"));
  links.forEach(function (a) {
    a.addEventListener("click", function () { if (!wide.matches) box.open = false; });
  });

  var heads = links.map(function (a) { return document.getElementById(decodeURIComponent(a.hash.slice(1))); })
                   .filter(Boolean);
  var first = heads[0];
  var mark = function () {
    var y = window.scrollY + window.innerHeight * 0.25, current = null;
    heads.forEach(function (h) { if (h.offsetTop <= y) current = h; });
    nav.classList.toggle("on", !!first && window.scrollY + window.innerHeight * 0.5 > first.offsetTop);
    var here = null;
    links.forEach(function (a) {
      var match = current && a.hash === "#" + current.id;
      if (match) { here = a; a.setAttribute("aria-current", "true"); } else a.removeAttribute("aria-current");
    });
    Array.prototype.forEach.call(nav.querySelectorAll("li"), function (li) {
      li.classList.toggle("open", !!here && li.contains(here));
    });
  };
  var queued = false;
  window.addEventListener("scroll", function () {
    if (queued) return; queued = true;
    requestAnimationFrame(function () { queued = false; mark(); });
  }, { passive: true });
  mark();
})();
