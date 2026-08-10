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
