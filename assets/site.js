/* Shared motion layer — Making Health Make Sense. Progressive enhancement: the page is complete without it. */
(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Opening curtain (home only, once per visit) */
  var curtain = document.getElementById('curtain');
  if (curtain) {
    var seen = false;
    try { seen = sessionStorage.getItem('mhms-intro') === '1'; sessionStorage.setItem('mhms-intro', '1'); } catch (e) {}
    if (reduce || seen) { curtain.remove(); root.classList.add('opened'); }
    else {
      setTimeout(function () { curtain.classList.add('lift-off'); root.classList.add('opened'); }, 1500);
      setTimeout(function () { curtain.remove(); }, 2600);
    }
  } else { root.classList.add('opened'); }

  /* Auto-tag inner-page content so every page gets the same reveal rhythm */
  if (!document.body.hasAttribute('data-handbuilt')) {
    var sel = 'main section h1, main section h2, main section h3, main section p, main section img, main section figure, main section details, main section .lift, body > div > section h2, body > div > section p, body > div > section img, body > div > section a[class="card"], body > div > section details';
    document.querySelectorAll(sel).forEach(function (el, i) {
      if (!el.closest('header') && !el.hasAttribute('data-reveal') && !el.closest('[data-reveal]')) el.setAttribute('data-reveal', '');
    });
  }

  /* Scroll reveals */
  var items = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  } else { items.forEach(function (el) { el.classList.add('in'); }); }

  /* Count-up numbers */
  var counters = document.querySelectorAll('[data-count]');
  function runCount(el) {
    var end = parseFloat(el.getAttribute('data-count')), suffix = el.getAttribute('data-suffix') || '', start = null, dur = 1600;
    if (reduce) { el.textContent = end + suffix; return; }
    function step(t) { if (!start) start = t; var p = Math.min((t - start) / dur, 1); var v = Math.round(end * (1 - Math.pow(1 - p, 3))); el.textContent = v + suffix; if (p < 1) requestAnimationFrame(step); }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window) {
    var co = new IntersectionObserver(function (entries) { entries.forEach(function (en) { if (en.isIntersecting) { runCount(en.target); co.unobserve(en.target); } }); }, { threshold: 0.6 });
    counters.forEach(function (el) { co.observe(el); });
  }

  /* Header: solid once you scroll past the opening scene */
  var header = document.querySelector('[data-header]');
  function onScroll() { if (header) header.classList.toggle('scrolled', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* Mobile menu */
  var toggle = document.querySelector('[data-menu-toggle]');
  var menu = document.getElementById('site-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', open ? 'false' : 'true');
      menu.classList.toggle('open', !open);
      document.body.classList.toggle('menu-open', !open);
    });
    menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { toggle.setAttribute('aria-expanded', 'false'); menu.classList.remove('open'); document.body.classList.remove('menu-open'); }); });
  }

  /* Gentle parallax on offset photos (wide screens only) */
  var par = document.querySelectorAll('[data-speed]');
  if (par.length && !reduce) {
    var ticking = false;
    function apply() {
      var vh = window.innerHeight, wide = window.innerWidth > 900;
      par.forEach(function (el) {
        if (!wide) { el.style.transform = ''; return; }
        var r = el.getBoundingClientRect(), s = parseFloat(el.getAttribute('data-speed'));
        var off = (r.top + r.height / 2 - vh / 2) * s;
        el.style.transform = 'translate3d(0,' + off.toFixed(1) + 'px,0)';
      });
      ticking = false;
    }
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(apply); } }, { passive: true });
    window.addEventListener('resize', apply); apply();
  }

  /* Horizontal program rail arrows */
  document.querySelectorAll('[data-rail]').forEach(function (wrap) {
    var track = wrap.querySelector('[data-rail-track]');
    wrap.querySelectorAll('[data-rail-dir]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var card = track.querySelector('[data-rail-item]');
        var w = card ? card.getBoundingClientRect().width + 24 : 400;
        track.scrollBy({ left: w * parseInt(btn.getAttribute('data-rail-dir'), 10), behavior: reduce ? 'auto' : 'smooth' });
      });
    });
  });

  /* Tabs (Know your numbers) */
  document.querySelectorAll('[role="tablist"]').forEach(function (list) {
    var tabs = Array.prototype.slice.call(list.querySelectorAll('[role="tab"]'));
    function select(tab) {
      tabs.forEach(function (t) {
        var on = t === tab; t.setAttribute('aria-selected', on ? 'true' : 'false'); t.tabIndex = on ? 0 : -1;
        var panel = document.getElementById(t.getAttribute('aria-controls')); if (panel) panel.hidden = !on;
      });
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(t); });
      t.addEventListener('keydown', function (e) {
        var k = e.key, n = null;
        if (k === 'ArrowRight' || k === 'ArrowDown') n = tabs[(i + 1) % tabs.length];
        if (k === 'ArrowLeft' || k === 'ArrowUp') n = tabs[(i - 1 + tabs.length) % tabs.length];
        if (n) { e.preventDefault(); select(n); n.focus(); }
      });
    });
  });

  /* Forms are preview-only for now */
  document.querySelectorAll('form:not([data-own])').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var b = f.querySelector('button[type=submit]');
      if (b) { b.textContent = 'Preview only — this form isn’t connected yet'; b.disabled = true; }
    });
  });
})();
