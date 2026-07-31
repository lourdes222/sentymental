import {emociones, frasesMotivadoras} from './data.js';
import { renderizarEmociones, actualizarFraseEnDOM } from './dom.js';

let intervaloFrase=null;

function obtenerFraseAleatoria(){
    const indice= Math.floor(Math.random()*frasesMotivadoras.length);
    return frasesMotivadoras[indice];
}

function cambiarFrase(){
    const nuevaFrase= obtenerFraseAleatoria();
    actualizarFraseEnDOM(nuevaFrase, 'texto-frase');
}

function iniciarTemporizador(){
    if(intervaloFrase){
        clearInterval(intervaloFrase);
    }
    intervaloFrase= setInterval(cambiarFrase, 60000);
}
document.addEventListener('DOMContentLoaded', ()=>{
    renderizarEmociones(emociones, 'contenedor-emociones');
    cambiarFrase();
    iniciarTemporizador();
    const botonImpulso= document.getElementById('btn-frase');
    if(botonImpulso){
        botonImpulso.addEventListener('click', ()=>{
            cambiarFrase();
            iniciarTemporizador();
        });
    }
});