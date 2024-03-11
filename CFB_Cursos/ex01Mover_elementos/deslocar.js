"use strict"

const recipiente1 = document.getElementById('recipiente1');
const recipiente2 = document.getElementById('recipiente2');
const btn_deslocar = document.querySelector('button#deslocador');
const btn_desfazer = document.querySelector('button#desfazedor');

function selectItem(event) {
    const item = event.target;
    item.classList.toggle('selecionado');
}

const allElements = [...document.querySelectorAll('.item')]
allElements.map((element)=>{
    element.addEventListener('click', selectItem)
})

function deslocar() {
    const itens = document.querySelectorAll('#recipiente1 > div.selecionado');
    recipiente2.append(...itens);
    [...itens].map((item)=>item.classList.toggle('selecionado'));
}

btn_deslocar.addEventListener('click', deslocar);

function desfazer() {
    const itens = document.querySelectorAll('#recipiente2 > div.selecionado');
    recipiente1.append(...itens);
    [...itens].map((item)=>item.classList.toggle('selecionado'));
}

btn_desfazer.addEventListener('click', desfazer)