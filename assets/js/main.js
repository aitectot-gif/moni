// MONI Interiors — navigation, consultation modal, WhatsApp enquiry and scroll effects
(function () {
  var WHATSAPP_NUMBER = '917339416967';

  // Mobile menu
  var menuBtn = document.getElementById('menuBtn');
  var navlinks = document.getElementById('navlinks');
  if (menuBtn && navlinks) {
    var setMenu = function (open) {
      navlinks.classList.toggle('open', open);
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      menuBtn.querySelector('use').setAttribute('href', open ? '#i-close' : '#i-menu');
    };
    menuBtn.addEventListener('click', function () {
      setMenu(!navlinks.classList.contains('open'));
    });
    navlinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
  }

  // Header shadow on scroll
  var nav = document.querySelector('.nav');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 10); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Consultation modal
  var modal = document.getElementById('leadModal');
  if (modal) {
    var lastFocus = null;
    var openModal = function (e) {
      if (e) e.preventDefault();
      lastFocus = document.activeElement;
      modal.classList.add('open');
      document.body.classList.add('no-scroll');
      var first = modal.querySelector('input');
      if (first) first.focus();
    };
    var closeModal = function () {
      modal.classList.remove('open');
      document.body.classList.remove('no-scroll');
      if (lastFocus) lastFocus.focus();
    };
    document.querySelectorAll('[data-open-modal]').forEach(function (btn) {
      btn.addEventListener('click', openModal);
    });
    document.getElementById('closeModal').addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });

    // Build a WhatsApp message from the form — nothing is sent to a server
    document.getElementById('leadForm').addEventListener('submit', function (e) {
      e.preventDefault();
      var f = new FormData(e.target);
      var lines = [
        'Hi MONI Interiors! I would like a free consultation.',
        'Name: ' + f.get('name'),
        'Phone: ' + f.get('phone'),
        'Location: ' + f.get('city'),
        'Service: ' + f.get('service'),
        'Details: ' + (f.get('message') || 'Not provided')
      ];
      window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(lines.join('\n')), '_blank', 'noopener');
      e.target.reset();
      closeModal();
    });
  }

  // Highlight the nav link for the section in view
  var links = navlinks ? navlinks.querySelectorAll('a[href^="#"]') : [];
  if ('IntersectionObserver' in window && links.length) {
    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) { a.classList.remove('active'); });
        var link = byId[entry.target.id];
        if (link) link.classList.add('active');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(byId).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) spy.observe(el);
    });
  }

  // Reveal on scroll
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
