# QWEN.md - Contexto del Proyecto: Vlog - El Arte de la Comunicación

## Descripción del Directorio

**Vlog: El Arte de la Comunicación** es un sitio web estático académico construido con HTML, CSS y JavaScript puros. Funciona como un vlog/portafolio digital que documenta las lecciones aprendidas en un curso de comunicación del programa **ADSO** (Análisis y Desarrollo de Software). El sitio es authored por dos estudiantes — **Gabriel Mesa** y **Erick Camargo** — y muestra sus reflexiones, asignaciones en PDF y perfiles profesionales.

## Archivos Clave

| Archivo / Directorio | Descripción |
|---|---|
| `index.html` | Página principal con introducción a los temas de comunicación, reflexiones del curso y perfiles de los integrantes |
| `gabriel.html` | Perfil personal de Gabriel Mesa: descripción, reflexiones del reto, evidencias PDF, aprendizajes y proyección futura |
| `erick.html` | Perfil personal de Erick Camargo (misma estructura) |
| `style.css` | Hoja de estilos global con variables CSS, diseño responsivo y menú hamburguesa para móviles |
| `script.js` | JavaScript mínimo para el toggle del menú móvil (abrir/cerrar/overlay) |
| `pdfs_de_gabriel/` | Asignaciones PDF de Gabriel (función referencial, sapa caramelo, microexpresiones, tipos de comunicación) |
| `pdfs_de_erick/` | Asignaciones PDF de Erick (mismos temas) |
| `gabriel.jpg`, `erick.jpeg` | Fotos de perfil de cada integrante |

## Stack Tecnológico

| Componente | Tecnología |
|-----------|-----------|
| Marcado | HTML5 |
| Estilos | CSS3 (variables personalizadas, Flexbox, Grid, media queries responsivas) |
| Interactividad | JavaScript vanilla |
| Íconos | Font Awesome 6.5.0 (CDN) |
| Fuentes | Inter + Poppins (Google Fonts CDN) |

## Arquitectura y Diseño

- **Estructura:** Tres páginas HTML (`index.html`, `gabriel.html`, `erick.html`) que comparten una misma hoja de estilos y archivo de script.
- **Layout:** Sistema de grid basado en tarjetas usando CSS Grid con `auto-fit` / `minmax` para columnas responsivas.
- **Navegación:** Header fijo (sticky) con menú hamburguesa responsivo en pantallas ≤ 780px.
- **Tema:** Diseño limpio, moderno y profesional con paleta de colores azul/pizarra y fondos con degradados.

## Uso

Este es un **sitio web estático** — no requiere paso de compilación, servidor ni dependencias. Para visualizarlo:

1. **Abrir directamente en el navegador:**
   ```bash
   xdg-open index.html        # Linux
   start index.html           # Windows
   open index.html            # macOS
   ```

2. **O servir con un servidor HTTP simple:**
   ```bash
   # Python 3
   python -m http.server 8000
   # Luego visitar http://localhost:8000
   ```

3. **O usar cualquier servidor de archivos estáticos** (ej. `npx serve`, Live Server en VS Code, etc.)

## Convenciones de Desarrollo

- **Sin frameworks** — HTML/CSS/JS puros.
- **Variables CSS** en `:root` para tematización (colores, sombras, radios).
- **Responsivo mobile-first** con breakpoint en 780px.
- **HTML semántico** usando `<section>`, `<article>`, `<main>`, `<header>`, `<nav>`.
- **Íconos de Font Awesome** insertados inline vía etiquetas `<i>` para consistencia visual.

## Temas de Contenido Cubiertos

El sitio documenta tareas sobre:

1. **Funciones del Lenguaje** — Referencial, emotiva, apelativa, etc.
2. **Tipos de Comunicación** — Verbal, no verbal, escrita, digital.
3. **Comunicación Asertiva** — Diálogo respetuoso y claro.
4. **Lenguaje Verbal y No Verbal** — Conexión entre palabras y lenguaje corporal.
5. **Microexpresiones** — Lectura de emociones genuinas en situaciones reales.

## Notas

- Los enlaces a PDF en las páginas de perfil usan rutas absolutas que comienzan con `/pdfs_de_*/`. Si se aloja en un subdirectorio o en GitHub Pages, estas rutas pueden necesitar ajustarse a rutas relativas (ej. `pdfs_de_erick/funciones del Lenguaje.pdf`).
- El sitio está en **español** (`lang="es"`).
- No se usan herramientas de compilación, gestores de paquetes ni frameworks de pruebas.
