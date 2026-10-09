# Portfolio de Dani Martín

Web personal de Daniel Martín Pérez: una página principal y una página por proyecto.

**Web:** https://danimartin03.github.io

## Cómo está hecha

- HTML, CSS y JavaScript sin frameworks ni proceso de compilación.
- En tres idiomas: castellano, catalán e inglés.
- Tema claro y oscuro, y diseño pensado primero para móvil.
- Publicada con GitHub Pages.

## Estructura

```
index.html            Página principal (portada, proyectos, experiencia, sobre mí, tecnologías, contacto)
proyectos/            Una página por proyecto
css/
  base.css            Variables de color y tipografía, reset, foco
  layout.css          Cabecera, secciones, portada, pie
  components.css      Botones, tarjetas, línea de tiempo, tecnologías, página de proyecto
  animations.css      Animaciones al hacer scroll y entrada de la portada
js/
  theme.js            Botón de tema claro/oscuro
  i18n.js             Selector de idioma ES / CA / EN
  reveal.js           Animaciones al hacer scroll y enlace activo del menú
  main.js             Menú móvil y barra de progreso de scroll
i18n/
  ca.json, en.json    Traducciones. El castellano está en el propio HTML
assets/
  img/                Foto, capturas e ilustraciones
  icons/sprite.svg    Iconos
  cv/                 CV en PDF
```
