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
    var form = document.getElementById('bookForm');
    if (form) form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.name.value.trim(), device = form.device.value.trim(), problem = form.problem.value.trim(), contact = form.contact.value.trim();
      var text = 'Repair booking\nName: ' + name + '\nDevice: ' + device + '\nProblem: ' + problem + (contact ? '\nContact: ' + contact : '');
      var note = document.getElementById('bookNote'), copy = document.getElementById('bookCopy');
      if (note) note.hidden = false;
      if (copy) { copy.hidden = false; copy.value = text; }
      window.location.href = 'mailto:georgiaboy77535@gmail.com?subject=' + encodeURIComponent('Repair booking: ' + device) + '&body=' + encodeURIComponent(text);
    });
  })();
