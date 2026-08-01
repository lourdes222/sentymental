
const audiosURLs = {
  lluvia: "https://assets.mixkit.co/active_storage/sfx/2517/2517-preview.mp3",
  mar: "https://assets.mixkit.co/active_storage/sfx/1188/1188-preview.mp3",
  noche: "https://assets.mixkit.co/active_storage/sfx/2432/2432-preview.mp3"
};

let audioActual = null;
let sonidoSeleccionado = null;

export function inicializarSonidos() {
  const botones = document.querySelectorAll(".btn-sonido");
  const sliderVolumen = document.getElementById("slider-volumen");

  botones.forEach(btn => {
    btn.addEventListener("click", () => {
      const tipoSonido = btn.getAttribute("data-sonido");

      if (sonidoSeleccionado === tipoSonido && audioActual && !audioActual.paused) {
        audioActual.pause();
        btn.classList.remove("activo");
        sonidoSeleccionado = null;
        return;
      }


      if (audioActual) {
        audioActual.pause();
        botones.forEach(b => b.classList.remove("activo"));
      }

      audioActual = new Audio(audiosURLs[tipoSonido]);
      audioActual.loop = true; 
      audioActual.volume = sliderVolumen ? sliderVolumen.value : 0.5;
      audioActual.play();

      sonidoSeleccionado = tipoSonido;
      btn.classList.add("activo");
    });
  });

  if (sliderVolumen) {
    sliderVolumen.addEventListener("input", (e) => {
      if (audioActual) {
        audioActual.volume = e.target.value;
      }
    });
  }
}