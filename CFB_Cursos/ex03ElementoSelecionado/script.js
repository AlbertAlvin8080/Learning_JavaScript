"use strict"

const recipiente2 = document.getElementById('recipiente2');
let posicao = [...recipiente2.children].length;
const btn_adicionar_antes = document.querySelector('#add_antes');
const btn_adicionar_depois = document.querySelector('#add_depois');
const btn_remover = document.getElementById('rm');
const btn_selecionado = document.getElementById('sl');
const inputText = document.querySelector("input[type='text']#inomeCurso"); // precisei usar o ; antes de uma IIFE

function desmarcarSelecionados() {
    const selecionados = [...document.getElementsByClassName('selecionado')];
    selecionados.forEach((itemSelecionado)=>{
        itemSelecionado.classList.remove('selecionado')
    });
}

(function() {
    const itens = [...document.getElementsByClassName('item')];
    itens.forEach((item)=>{
        item.addEventListener('click', (event)=>{
            desmarcarSelecionados();
            event.target.classList.toggle('selecionado');
        });
    });
})();

function criarDiv(texto) {
    ++posicao;
    const novaDiv = document.createElement('div');
    novaDiv.classList.add('item');
    novaDiv.innerText = texto;
    novaDiv.addEventListener('click', (event)=>{
        desmarcarSelecionados();
        event.target.classList.toggle('selecionado');
    });
    return novaDiv;
}

function encontrarSelecionado() {
    return document.querySelector(".selecionado")
}

btn_adicionar_antes.addEventListener('click', ()=>{
    const texto = inputText.value
    if(texto === '') return;
    const novaCelula = criarDiv(texto)

    const selecionado = encontrarSelecionado()

    if(selecionado != null) {
        recipiente2.insertBefore(novaCelula, selecionado)
    } else {
        recipiente2.appendChild(novaCelula)
    }
})

btn_adicionar_depois.addEventListener('click', ()=>{
    const texto = inputText.value
    if(texto === '') return;
    const novaCelula = criarDiv(texto)

    const selecionado = encontrarSelecionado()

    if(selecionado != null) {
        recipiente2.insertBefore(novaCelula, selecionado.nextSibling)
    } else {
        recipiente2.appendChild(novaCelula)
    }
})

btn_remover.addEventListener('click', ()=>{
    const selecionado = encontrarSelecionado()
    if(selecionado == null) {
        alert('Selecione um curso')
        return;
    }
    selecionado.remove()
})

btn_selecionado.addEventListener('click', ()=>{
    const selecionado = encontrarSelecionado()
    if(selecionado != null) {
        alert(`Você selecionou "${selecionado.innerText}"`)
    }
})