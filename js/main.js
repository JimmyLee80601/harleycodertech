/* Harley Coder Tech — main.js
   Minimal: active-link highlight + year stamp. */

(function () {
  // highlight current page nav link
  var page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === page) {
      a.classList.add('active');
    }
  });

  // stamp footer year
  var year = new Date().getFullYear();
  document.querySelectorAll('footer').forEach(function (f) {
    if (!f.querySelector('.year')) {
      var sp = document.createElement('span');
      sp.className = 'year';
      sp.textContent = ' © ' + year;
      f.insertBefore(sp, f.firstChild);
    }
  });
})();

  // booking form popup: any [data-book-open] button opens it
  (function () {
    var modal = document.getElementById('bookModal');
    if (!modal) return;
    function openBook() { modal.hidden = false; var f = modal.querySelector('input[name="name"]'); if (f) f.focus(); }
    function closeBook() { modal.hidden = true; }
    document.querySelectorAll('[data-book-open]').forEach(function (b) { b.addEventListener('click', openBook); });
    document.querySelectorAll('[data-book-close]').forEach(function (b) { b.addEventListener('click', closeBook); });
    modal.addEventListener('click', function (e) { if (e.target === modal) closeBook(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeBook(); });
    // submit is a plain POST to FormSubmit: no mailto, no email app needed.
    // Loud validation: the browser's built-in required-field block is
    // silent on some phones, so check here and show the missing fields
    // in the form itself instead of just not sending.
    var form = document.getElementById('bookForm');
    if (form) {
      form.addEventListener('submit', function (e) {
        var err = document.getElementById('bookFormError');
        var missing = [];
        ['name', 'device', 'problem'].forEach(function (n) {
          var f = form.querySelector('[name="' + n + '"]');
          if (!f) return;
          if (!f.value.trim()) { missing.push(n); f.classList.add('field-error'); }
          else { f.classList.remove('field-error'); }
        });
        if (missing.length) {
          e.preventDefault();
          if (err) {
            err.hidden = false;
            err.textContent = 'Please fill in: ' + missing.join(', ') + ' — all three are needed before this sends.';
          }
          var first = form.querySelector('[name="' + missing[0] + '"]');
          if (first) first.focus();
        } else if (err) {
          err.hidden = true;
        }
      });
      form.querySelectorAll('input, textarea, select').forEach(function (f) {
        f.addEventListener('input', function () { f.classList.remove('field-error'); });
      });
    }
  })();
