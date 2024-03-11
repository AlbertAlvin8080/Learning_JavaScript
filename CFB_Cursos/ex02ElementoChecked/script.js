"use strict"

const recipiente2 = document.getElementById('recipiente2');
let posicao = [...recipiente2.children].length
const btn_adicionar_antes = document.querySelector('#add_antes')
const btn_adicionar_depois = document.querySelector('#add_depois')
const btn_remover = document.getElementById('rm')
const btn_selecionado = document.getElementById('sl')

function criarCelula(texto) {
    ++posicao
    const novoLabel = document.createElement('label')
    novoLabel.setAttribute('for', 'ic' + posicao)
    novoLabel.setAttribute('class', 'item')
    novoLabel.textContent = texto

    const novoRadio = document.createElement('input')
    novoRadio.type = 'radio'
    novoRadio.name = 'cursos'
    novoRadio.id = 'ic' + posicao

    const novaCelula = document.createElement('div')
    novaCelula.classList.add('celula')
    novaCelula.appendChild(novoLabel)
    novaCelula.appendChild(novoRadio)
    return novaCelula
}

function findCheckedRadio() {
    return document.querySelector(".celula > input[type='radio'][name='cursos']:checked")
}

btn_adicionar_antes.addEventListener('click', ()=>{
    const texto = document.querySelector("input[type='text']#inomeCurso").value
    if(texto === '') return;
    const novaCelula = criarCelula(texto)

    const checkedRadio = findCheckedRadio()

    if(checkedRadio != null) {
        recipiente2.insertBefore(novaCelula, checkedRadio.parentNode)
    } else {
        recipiente2.appendChild(novaCelula)
    }
})

btn_adicionar_depois.addEventListener('click', ()=>{
    const texto = document.querySelector("input[type='text']#inomeCurso").value
    if(texto === '') return;
    const novaCelula = criarCelula(texto)

    const checkedRadio = findCheckedRadio()

    if(checkedRadio != null) {
        recipiente2.insertBefore(novaCelula, checkedRadio.parentNode.nextSibling)
    } else {
        recipiente2.appendChild(novaCelula)
    }
})

btn_remover.addEventListener('click', ()=>{
    const checkedRadio = findCheckedRadio()
    if(checkedRadio == null) {
        alert('Selecione um curso')
        return;
    }
    const celulaPai = checkedRadio.parentNode
    celulaPai.remove()
})

btn_selecionado.addEventListener('click', ()=>{
    const checkedRadio = findCheckedRadio()
    if(checkedRadio != null) {
        alert(`Você selecionou "${checkedRadio.parentNode.firstElementChild.innerText}"`)
    }
})