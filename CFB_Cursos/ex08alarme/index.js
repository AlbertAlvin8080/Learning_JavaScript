"use strict";

const relogio = document.querySelector('.relogio');

function formatarHora(date) {
    let horas = date.getHours();
    horas = horas > 9 ? horas : '0'+horas;
    let minutos = date.getMinutes();
    minutos = minutos < 10 ? '0'+minutos : minutos;
    let segundos = date.getSeconds();
    segundos = segundos < 10 ? '0'+segundos : segundos;
    return {horas, minutos, segundos};
}

function atualizarRelogio() {
    const date = new Date();
    const obj = formatarHora(date);
    relogio.innerText = `${obj.horas}:${obj.minutos}:${obj.segundos}`
}

const interval = setInterval(atualizarRelogio, 1000);

const tempo_alarme = document.querySelector('input[type="number"]#itempo');
const hora_alarme = document.getElementById('hora_alarme');
const btn_ativar = document.querySelector('#ativar');
const btn_desativar = document.querySelector('#desativar');
const audio = new Audio('./audio1.m4a');
audio.loop = -1;

btn_ativar.addEventListener('click', ()=>{
    const milisegundos = tempo_alarme.value*1000;
    const tempo_atual = Date.now();
    const date = new Date(milisegundos + tempo_atual);
    const obj = formatarHora(date);
    hora_alarme.innerText = `${obj.horas}:${obj.minutos}:${obj.segundos}`;

    setTimeout(()=>{
        audio.play();
    }, milisegundos);
});

btn_desativar.addEventListener('click', ()=>{
    audio.pause();
    hora_alarme.innerText = '';
});
