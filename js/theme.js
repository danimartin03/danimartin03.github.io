/* ==========================================================
   theme.js — cambio entre tema oscuro y claro
   El tema inicial lo aplica un script en el <head> (antes de
   pintar, para que no haya parpadeo). Aquí solo va el botón.
   ========================================================== */
(function () {
  'use strict';

  var root = document.documentElement;
  var button = document.querySelector('.theme-toggle');
  var themeColor = document.querySelector('meta[name="theme-color"]');
  if (!button) return;

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    button.setAttribute('aria-pressed', String(theme === 'light'));
    if (themeColor) themeColor.setAttribute('content', theme === 'light' ? '#EAF2F7' : '#072B43');
  }

  apply(root.getAttribute('data-theme') === 'light' ? 'light' : 'dark');

  button.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    apply(next);
    try {
      localStorage.setItem('theme', next);
    } catch (e) {
      /* Navegación privada o almacenamiento bloqueado: el tema
         cambia igual, solo que no se recuerda en la próxima visita. */
    }
  });
})();
