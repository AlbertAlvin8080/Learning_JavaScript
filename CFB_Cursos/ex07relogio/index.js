"use strict";

const relogio = document.querySelector('div.relogio');

function atualizarRelogio() {
    const date = new Date();
    let horas = date.getHours();
    let minutos = date.getMinutes();
    let segundos = date.getSeconds();
    segundos = segundos < 10 ? "0"+segundos : segundos;

    relogio.innerText = `${horas}:${minutos}:${segundos}`
}

const intervalo = setInterval(atualizarRelogio, 1000);
// clearInterval(intervalo)
console.log(intervalo);