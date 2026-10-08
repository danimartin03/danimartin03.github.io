/* ==========================================================
   main.js — menú móvil, barra de progreso y detalles pequeños
   ========================================================== */
(function () {
  'use strict';

  var root = document.documentElement;
  var header = document.querySelector('.header');
  var toggle = document.querySelector('.header__toggle');
  var menu = document.getElementById('menu');

  /* ---------- Menú móvil ---------- */
  function closeMenu() {
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    // Al elegir una sección, el menú se cierra
    menu.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
    // Escape cierra el menú y devuelve el foco al botón
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && menu.classList.contains('is-open')) {
        closeMenu();
        toggle.focus();
      }
    });
  }

  /* ---------- Barra de progreso + borde de la cabecera ----------
     El scroll dispara muchos eventos: con requestAnimationFrame
     solo se calcula una vez por fotograma. */
  var ticking = false;

  function update() {
    var max = root.scrollHeight - window.innerHeight;
    var progress = max > 0 ? window.scrollY / max : 0;
    root.style.setProperty('--progress', progress.toFixed(4));
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }, { passive: true });
  window.addEventListener('resize', update);
  update();

  /* ---------- Año del pie ---------- */
  var year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
