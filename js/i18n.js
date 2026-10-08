/* ==========================================================
   i18n.js — selector de idioma (ES / CA / EN)

   Cómo funciona:
   - El castellano está escrito directamente en el HTML. Así la
     página se lee sin JavaScript y los buscadores ven el texto.
   - Cada texto traducible lleva data-i18n="clave".
     Los atributos (alt, aria-label, content) usan
     data-i18n-attr="atributo=clave,otro=clave".
   - Catalán e inglés se cargan con fetch desde i18n/ca.json y
     i18n/en.json solo cuando hacen falta.
   - Antes de traducir se guarda el texto original, para poder
     volver al castellano sin pedir nada al servidor.
   ========================================================== */
(function () {
  'use strict';

  var SUPPORTED = ['es', 'ca', 'en'];
  var root = document.documentElement;
  // Las páginas de proyecto están en /proyectos/ y declaran data-base="../"
  var base = root.getAttribute('data-base') || '';
  var dictionaries = { es: {} };
  var buttons = document.querySelectorAll('.lang__btn');

  /* Convierte "alt=clave,aria-label=clave" en [['alt','clave'], ...] */
  function parseAttrs(value) {
    return value.split(',').map(function (pair) {
      var parts = pair.split('=');
      return [parts[0].trim(), parts[1].trim()];
    });
  }

  /* Guarda los textos en castellano que ya están en el HTML */
  function collectSpanish() {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      dictionaries.es[el.getAttribute('data-i18n')] = el.innerHTML;
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      parseAttrs(el.getAttribute('data-i18n-attr')).forEach(function (pair) {
        dictionaries.es[pair[1]] = el.getAttribute(pair[0]);
      });
    });
  }

  function load(lang) {
    if (dictionaries[lang]) return Promise.resolve(dictionaries[lang]);
    return fetch(base + 'i18n/' + lang + '.json')
      .then(function (response) {
        if (!response.ok) throw new Error('No se pudo cargar ' + lang);
        return response.json();
      })
      .then(function (dictionary) {
        dictionaries[lang] = dictionary;
        return dictionary;
      });
  }

  function apply(lang, dictionary) {
    // Si falta una clave en la traducción, se queda el castellano
    function text(key) {
      return dictionary[key] !== undefined ? dictionary[key] : dictionaries.es[key];
    }
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      // innerHTML: los textos son míos (no vienen del usuario) y algunos llevan <strong>
      el.innerHTML = text(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      parseAttrs(el.getAttribute('data-i18n-attr')).forEach(function (pair) {
        el.setAttribute(pair[0], text(pair[1]));
      });
    });
    root.setAttribute('lang', lang);
    buttons.forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.getAttribute('data-lang') === lang));
    });
  }

  function setLanguage(lang, remember) {
    if (SUPPORTED.indexOf(lang) === -1) return;
    load(lang)
      .then(function (dictionary) {
        apply(lang, dictionary);
        if (remember) {
          try { localStorage.setItem('lang', lang); } catch (e) { /* no se recuerda, pero funciona */ }
        }
      })
      .catch(function (error) {
        // Sin red (o abriendo el archivo con doble clic): se queda el idioma actual
        console.warn(error.message);
      });
  }

  collectSpanish();

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      setLanguage(button.getAttribute('data-lang'), true);
    });
  });

  // Idioma guardado en una visita anterior
  var saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) { /* sin acceso: castellano */ }
  if (saved && saved !== 'es') setLanguage(saved, false);
})();
