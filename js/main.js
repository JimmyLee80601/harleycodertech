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
  })();
