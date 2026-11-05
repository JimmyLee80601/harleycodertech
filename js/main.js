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
          return;
        }
        if (err) err.hidden = true;
        // AJAX submit: a plain POST to FormSubmit lands the customer on
        // FormSubmit's own error page (e.g. Cloudflare 522) if their host
        // is down, and the booking is lost. Stay on the page instead, and
        // offer a direct-email fallback if the relay fails or times out.
        e.preventDefault();
        var btn = form.querySelector('button[type="submit"]');
        var origText = btn ? btn.textContent : '';
        if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
        var data = {};
        ['name', 'device', 'problem', 'contact', 'problem_type', 'reply_pref'].forEach(function (n) {
          var f = form.querySelector('[name="' + n + '"]');
          if (f && f.value.trim()) data[n] = f.value.trim();
        });
        data._subject = 'HarleyCoderTech repair booking';
        data._template = 'table';
        data._captcha = 'false';
        var text = 'Repair booking\nName: ' + (data.name || '') + '\nDevice: ' + (data.device || '') + '\nProblem: ' + (data.problem || '') + (data.contact ? '\nContact: ' + data.contact : '');
        function showFallback(msg) {
          if (err) { err.hidden = false; err.textContent = msg; }
          var fb = document.getElementById('bookMailtoFallback');
          if (!fb) {
            fb = document.createElement('a');
            fb.id = 'bookMailtoFallback'; fb.className = 'btn';
            fb.textContent = 'Send via email instead';
            form.appendChild(fb);
          }
          fb.href = 'mailto:georgiaboy77535@gmail.com?subject=' + encodeURIComponent('Repair booking: ' + (data.device || '')) + '&body=' + encodeURIComponent(text);
          if (btn) { btn.disabled = false; btn.textContent = origText; }
        }
        var ctl = new AbortController();
        setTimeout(function () { ctl.abort(); }, 20000);
        fetch('https://formsubmit.co/ajax/georgiaboy77535@gmail.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(data),
          signal: ctl.signal
        }).then(function (r) { return r.json(); }).then(function (res) {
          if (res && (res.success === true || res.success === 'true')) {
            window.location.href = 'thanks.html';
          } else {
            showFallback('FormSubmit did not deliver this yet — it usually means the form still needs its one-time activation email clicked, or their server is down. Your booking was NOT sent by this button. Use the email button below instead, and it will go straight to the shop.');
          }
        }).catch(function () {
          showFallback('FormSubmit timed out just now (their server, Error 522 style — not your form). Your booking was NOT sent. Use the email button below instead, and it will go straight to the shop.');
        });
      });
      form.querySelectorAll('input, textarea, select').forEach(function (f) {
        f.addEventListener('input', function () { f.classList.remove('field-error'); });
      });
    }
  })();
