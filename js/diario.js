
export function inicializarDiario() {
  const btnGuardar = document.getElementById("btn-guardar-nota");
  const textoNota = document.getElementById("texto-nota");

  if (!btnGuardar || !textoNota) return;
  mostrarNotas();

  btnGuardar.addEventListener("click", () => {
    const contenido = textoNota.value.trim();
    if (contenido === "") return;

    const nuevaNota = {
      id: Date.now(),
      texto: contenido,
      fecha: new Date().toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit"
      })
    };

    guardarNotaEnStorage(nuevaNota);
    textoNota.value = ""; 
    mostrarNotas();
  });
}

function obtenerNotasStorage() {
  const notas = localStorage.getItem("diario_emocional_notas");
  return notas ? JSON.parse(notas) : [];
}

function guardarNotaEnStorage(nota) {
  const notas = obtenerNotasStorage();
  notas.unshift(nota); 
  localStorage.setItem("diario_emocional_notas", JSON.stringify(notas));
}

export function borrarNota(id) {
  let notas = obtenerNotasStorage();
  notas = notas.filter(nota => nota.id !== id);
  localStorage.setItem("diario_emocional_notas", JSON.stringify(notas));
  mostrarNotas();
}

function mostrarNotas() {
  const contenedorLista = document.getElementById("lista-notas");
  if (!contenedorLista) return;

  const notas = obtenerNotasStorage();

  if (notas.length === 0) {
    contenedorLista.innerHTML = `<p class="diario-vacio">Aún no guardaste ninguna nota. ¡Escribí la primera!</p>`;
    return;
  }

  contenedorLista.innerHTML = "";

  notas.forEach(nota => {
    const divNota = document.createElement("div");
    divNota.classList.add("tarjeta-nota");
    divNota.innerHTML = `
      <div class="nota-encabezado">
        <span class="nota-fecha">🕒 ${nota.fecha}</span>
        <button class="btn-borrar-nota" data-id="${nota.id}">🗑️</button>
      </div>
      <p class="nota-contenido">${nota.texto}</p>
    `;

    // Evento para borrar
    const btnBorrar = divNota.querySelector(".btn-borrar-nota");
    btnBorrar.addEventListener("click", () => {
      borrarNota(nota.id);
    });

    contenedorLista.appendChild(divNota);
  });
}