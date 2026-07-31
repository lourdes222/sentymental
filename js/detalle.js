import { emociones } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Capturamos los parámetros de la URL
  const parametrosURL = new URLSearchParams(window.location.search);
  const emocionId = parametrosURL.get('id');

  // 2. Buscamos la emoción en nuestro listado de datos
  const emocionEncontrada = emociones.find(e => e.id === emocionId);

  const contenedor = document.getElementById('contenido-guia');

  if (!emocionEncontrada) {
    contenedor.innerHTML = `
      <div class="caja-guia">
        <h2>Emoción no encontrada 😕</h2>
        <p>No pudimos cargar la guía. Por favor volvé al inicio.</p>
      </div>
    `;
    return;
  }

  // 3. Renderizamos la guía completa
  const { nombre, emoji, color, guia } = emocionEncontrada;

  // Convertimos los arrays de la guía a listas <li>
  const listaCausas = guia.causas.map(item => `<li>${item}</li>`).join('');
  const listaIdentificacion = guia.identificacion.map(item => `<li>${item}</li>`).join('');
  const listaSoluciones = guia.soluciones.map(item => `<li>${item}</li>`).join('');

  contenedor.innerHTML = `
    <div class="caja-guia" style="border-top: 6px solid ${color};">
      <div class="guia-titulo">
        <span class="emoji-grande">${emoji}</span>
        <h1 style="color: ${color}">Guía para gestionar la ${nombre}</h1>
      </div>

      <section class="bloque-guia">
        <h3>❓ ¿Por qué te podés sentir así?</h3>
        <ul>${listaCausas}</ul>
      </section>

      <section class="bloque-guia">
        <h3>🔍 ¿Cómo identificarlo en el cuerpo y mente?</h3>
        <ul>${listaIdentificacion}</ul>
      </section>

      <section class="bloque-guia destacada" style="background-color: ${color}15;">
        <h3>🛠️ Pasos para solucionarlo y calmarte</h3>
        <ul class="lista-pasos">${listaSoluciones}</ul>
      </section>
    </div>
  `;
});