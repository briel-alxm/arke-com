/* ── ARKE | Partner — shared scripts (FAQ + mobile nav) ── */
(function () {
  /* FAQ accordion */
  var items = document.querySelectorAll('.faq-item');
  items.forEach(function (item) {
    var btn = item.querySelector('.faq-q');
    var panel = item.querySelector('.faq-a');
    if (!btn || !panel) return;
    btn.addEventListener('click', function () {
      var open = item.getAttribute('aria-expanded') === 'true';
      // Close others within the same group (keeps the page calm).
      // We only close siblings inside the same parent — multiple FAQ groups can coexist.
      var siblings = item.parentNode.querySelectorAll(':scope > .faq-item');
      siblings.forEach(function (other) {
        if (other !== item) {
          other.setAttribute('aria-expanded', 'false');
          var ob = other.querySelector('.faq-q');
          var op = other.querySelector('.faq-a');
          if (ob) ob.setAttribute('aria-expanded', 'false');
          if (op) op.style.maxHeight = null;
        }
      });
      if (open) {
        item.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-expanded', 'false');
        panel.style.maxHeight = null;
      } else {
        item.setAttribute('aria-expanded', 'true');
        btn.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  /* Mobile nav toggle */
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
})();
