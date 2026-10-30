// Tema claro/oscuro. Se carga sin "defer" en el <head> para aplicar el tema antes de pintar la página
// (así no hay parpadeo) y después conecta el botón de cambio.
(function () {
  const CLAVE = "portafolio:tema";
  const raiz = document.documentElement;

  // Lee la preferencia guardada. Por defecto es el tema oscuro (la identidad de la marca).
  function leerTema() {
    try { return localStorage.getItem(CLAVE) === "claro" ? "claro" : "oscuro"; }
    catch (e) { return "oscuro"; }
  }

  function guardarTema(tema) {
    try { localStorage.setItem(CLAVE, tema); } catch (e) { /* sin almacenamiento: el tema dura solo esta visita */ }
  }

  // Aplica el tema (atributo data-tema en <html>) y deja en el botón la acción que ofrece.
  function aplicar(tema) {
    raiz.dataset.tema = tema;
    const boton = document.getElementById("boton-tema");
    if (boton) boton.textContent = tema === "claro" ? "Modo oscuro" : "Modo claro";
  }

  aplicar(leerTema());

  document.addEventListener("DOMContentLoaded", () => {
    aplicar(raiz.dataset.tema);
    const boton = document.getElementById("boton-tema");
    if (!boton) return;
    boton.addEventListener("click", () => {
      const nuevo = raiz.dataset.tema === "claro" ? "oscuro" : "claro";
      guardarTema(nuevo);
      aplicar(nuevo);
    });
  });
})();
