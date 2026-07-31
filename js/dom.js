export function renderizarEmociones(listaEmociones, contenedorId) {
  const contenedor = document.getElementById(contenedorId);
  if (!contenedor) return;

  contenedor.innerHTML = "";

  listaEmociones.forEach((emocion) => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta-emocion");
    tarjeta.style.borderLeftColor = emocion.color;

    tarjeta.innerHTML = `
      <div class="emocion-encabezado">
        <span class="emoji">${emocion.emoji}</span>
        <h3 style="color: ${emocion.color}">${emocion.nombre}</h3>
      </div>
      <p class="emocion-descripcion">${emocion.descripcion}</p>
      
      <!-- BOTÓN PARA IR A LA GUÍA -->
      <a href="detalle.html?id=${emocion.id}" class="btn-manejar">
        ¿Cómo manejarla? ➔
      </a>
    `;

    contenedor.appendChild(tarjeta);
  });
}

export function actualizarFraseEnDOM(frase, elementoId) {
  const elemento = document.getElementById(elementoId);
  if (!elemento) return;

  elemento.style.opacity = "0";
  setTimeout(() => {
    elemento.textContent = frase;
    elemento.style.opacity = "1";
  }, 300);
}