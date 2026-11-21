// Site-wide scripts: email links, the light/dark theme toggle, and the
// Plain English / Technical switch on the homepage.

// Assemble email addresses at runtime so they aren't in the HTML for scrapers.
// Links show the address only where the placeholder text spells it out.
(function () {
  document.querySelectorAll('[data-u][data-d]').forEach(function (a) {
    var addr = a.getAttribute('data-u') + '@' + a.getAttribute('data-d');
    a.href = 'mailto:' + addr;
    if (a.textContent.indexOf('[at]') !== -1) a.textContent = addr;
  });
})();

// Theme toggle. The initial theme is set by a small script in <head> so the page
// never flashes the wrong colors; this just wires up the button.
(function () {
  var btn = document.getElementById('theme-toggle');
  if (!btn) return;
  var root = document.documentElement;

  function sync() {
    var dark = root.getAttribute('data-theme') === 'dark';
    btn.setAttribute('aria-pressed', String(dark));
    btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    btn.title = dark ? 'Switch to light mode' : 'Switch to dark mode';
  }

  btn.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) { /* storage blocked */ }
    sync();
  });
  sync();
})();

// Plain English / Technical switch: the same career, written for two audiences.
(function () {
  var buttons = document.querySelectorAll('[data-view-set]');
  if (!buttons.length) return;

  function show(view) {
    document.body.setAttribute('data-view', view);
    buttons.forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-view-set') === view));
    });
    document.querySelectorAll('.view-' + view).forEach(function (el) {
      el.classList.remove('view-swap');
      void el.offsetWidth; // restart the fade
      el.classList.add('view-swap');
    });
  }

  buttons.forEach(function (b) {
    b.addEventListener('click', function () { show(b.getAttribute('data-view-set')); });
  });
})();
