// Assemble the footer email address at runtime so it isn't in the HTML for scrapers.
(function () {
  var a = document.getElementById('contact-email');
  if (!a) return;
  var addr = a.getAttribute('data-u') + '@' + a.getAttribute('data-d');
  a.href = 'mailto:' + addr;
  a.textContent = addr;
})();
