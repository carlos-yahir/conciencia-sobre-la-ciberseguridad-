
// Navegación activa y botón para volver al inicio.
// La página funciona sin JavaScript; este archivo solo mejora la experiencia.

const linksMenu = [...document.querySelectorAll('.main-nav a[href^="#"]')];

const secciones = linksMenu
  .map(enlace => document.getElementById(enlace.hash.slice(1)))
  .filter(Boolean);

const botonArriba = document.querySelector('.back-to-top');

// Mostrar u ocultar el botón para volver arriba
function actualizarBoton() {
  botonArriba.classList.toggle('visible', window.scrollY > 460);
}

window.addEventListener('scroll', actualizarBoton, { passive: true });
actualizarBoton();

// Regresar al inicio cuando el usuario haga clic
botonArriba.addEventListener('click', () => {
  const reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  window.scrollTo({
    top: 0,
    behavior: reducirMovimiento ? 'instant' : 'smooth'
  });
});

// Resaltar la sección que se está visualizando
if ('IntersectionObserver' in window) {
  const observador = new IntersectionObserver(entradas => {
    const visibles = entradas.filter(entrada => entrada.isIntersecting);

    if (!visibles.length) return;

    visibles.sort((a, b) =>
      a.boundingClientRect.top - b.boundingClientRect.top
    );

    const actual = visibles[0].target.id;

    linksMenu.forEach(enlace => {
      const activa = enlace.hash === `#${actual}`;

      enlace.classList.toggle('is-active', activa);

      if (activa) {
        enlace.setAttribute('aria-current', 'location');
      } else {
        enlace.removeAttribute('aria-current');
      }
    });
  }, {
    rootMargin: '-20% 0px -55% 0px',
    threshold: 0
  });

  secciones.forEach(seccion => observador.observe(seccion));
}
