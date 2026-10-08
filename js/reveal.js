/* ==========================================================
   reveal.js — animación en cascada al hacer scroll
   y resaltado del enlace activo de la cabecera

   Cascada:
   1. Los elementos que se animan llevan la clase .reveal
      (el CSS los deja transparentes y un poco más abajo).
   2. Un IntersectionObserver avisa cuando entran en pantalla.
   3. A cada uno se le da su turno en la variable CSS --i y la
      clase .is-in. El retraso escalonado lo hace el CSS con
      transition-delay: calc(var(--i) * 100ms).
   ========================================================== */
(function () {
  'use strict';

  var STEP = 100;       // ms entre un elemento y el siguiente (igual que en el CSS)
  var DURATION = 700;   // ms que dura la transición de cada elemento
  var items = document.querySelectorAll('.reveal');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Deja el elemento en su estado final y limpia lo que usó la animación.
     Al quitar .reveal recupera sus transiciones normales (p. ej. el hover). */
  function finish(el) {
    el.classList.remove('reveal', 'is-in');
    el.style.removeProperty('--i');
  }

  if (reduceMotion || !('IntersectionObserver' in window)) {
    // Sin animación: todo visible desde el principio
    items.forEach(finish);
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      // Los elementos que entran a la vez en pantalla forman una tanda:
      // el primero sale ya, el segundo 100 ms después, y así sucesivamente.
      var batch = entries.filter(function (entry) { return entry.isIntersecting; });
      batch.forEach(function (entry, index) {
        var el = entry.target;
        el.style.setProperty('--i', index);
        el.classList.add('is-in');
        revealObserver.unobserve(el);   // solo se anima la primera vez
        setTimeout(function () { finish(el); }, index * STEP + DURATION + 50);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });

    items.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- Enlace activo en la cabecera ---------- */
  var links = document.querySelectorAll('.nav__link[href^="#"]');
  if (links.length && 'IntersectionObserver' in window) {
    var byId = {};
    links.forEach(function (link) { byId[link.getAttribute('href').slice(1)] = link; });

    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (link) {
          link.classList.remove('is-active');
          link.removeAttribute('aria-current');
        });
        var active = byId[entry.target.id];
        if (active) {
          active.classList.add('is-active');
          active.setAttribute('aria-current', 'true');
        }
      });
      // La sección "activa" es la que cruza la franja central de la pantalla
    }, { rootMargin: '-45% 0px -50% 0px' });

    document.querySelectorAll('main section[id]').forEach(function (section) {
      navObserver.observe(section);
    });
  }
})();
