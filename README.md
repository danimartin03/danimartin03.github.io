# Portfolio de Dani Martín

Web personal de Daniel Martín Pérez: una página principal y una página por proyecto.
Hecha con HTML, CSS y JavaScript sin frameworks ni proceso de compilación, lista para GitHub Pages.

## Estructura

```
index.html            Página principal (portada, proyectos, experiencia, sobre mí, tecnologías, contacto)
proyectos/            Una página por proyecto
css/
  base.css            Variables de color y tipografía, reset, foco
  layout.css          Cabecera, secciones, portada, pie
  components.css      Botones, tarjetas, línea de tiempo, tecnologías, página de proyecto
  animations.css      Cascada al hacer scroll, entrada de la portada, movimiento reducido
js/
  theme.js            Botón de tema claro/oscuro (se recuerda en localStorage)
  i18n.js             Selector de idioma ES / CA / EN
  reveal.js           Animación en cascada (IntersectionObserver) y enlace activo del menú
  main.js             Menú móvil y barra de progreso de scroll
i18n/
  ca.json, en.json    Traducciones. El castellano está en el propio HTML
assets/
  img/                Foto, capturas e ilustraciones
  icons/sprite.svg    Iconos
  cv/                 CV en PDF (ver "Pendiente")
```

## Verla en local

Las traducciones se cargan con `fetch`, así que hace falta un servidor (con doble clic sobre
`index.html` la web funciona, pero solo en castellano):

```bash
python -m http.server 5500
```

Después abre `http://localhost:5500`.

## Cambiar textos

1. Edita el texto en castellano en el HTML.
2. Busca su clave (`data-i18n="..."`) y cambia la misma clave en `i18n/ca.json` e `i18n/en.json`.

Si una clave falta en una traducción, se muestra el texto en castellano.

## Cómo funciona la cascada

Cada elemento animado lleva la clase `.reveal`. `reveal.js` los observa con `IntersectionObserver`;
cuando varios entran en pantalla a la vez, les da un turno (`--i`) y el CSS aplica
`transition-delay: calc(var(--i) * 100ms)`. Solo se animan `opacity` y `transform`.
Con `prefers-reduced-motion` activado no hay movimiento y todo se ve desde el principio.

## Pendiente

- **CV**: `assets/cv/CV_Daniel_Martin_Perez.pdf` está excluido de Git (`.gitignore`) porque el PDF
  actual lleva teléfono y fecha de nacimiento. Hay que subir una versión sin esos datos, o quitar
  la línea del `.gitignore` si se decide publicarlo tal cual.
- Los comentarios `TODO:` de `proyectos/tiendas-shopify.html` y `proyectos/domotica.html`.
