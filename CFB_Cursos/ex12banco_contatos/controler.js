"use strict";

import { set_registros } from "./model.js";

function contatoJaExiste({ id }) {
    for (const contato of set_registros) {
        if (contato.id === id) return true;
    }
    return false;
}

function insertRegistro(novoContato) {
    novoContato['id'] = Symbol.for(novoContato['nome']);
    if (contatoJaExiste(novoContato)) return;
    set_registros.add(novoContato);
    renderRegistros();
}

function renderRegistros() {
    const div_registros = document.querySelector('#registros');
    div_registros.innerHTML = '';
    set_registros.forEach((contato) => {
        const innerElements = createInnerElements(contato);

        const novaDiv = document.createElement('div');
        novaDiv.classList.add('registro');
        novaDiv.append(...innerElements);

        div_registros.appendChild(novaDiv);
    });
}

function createInnerElements(contato) {
    const p_nome = document.createElement('p');
    const p_tel = document.createElement('p');
    const p_email = document.createElement('p');

    p_nome.innerText = contato['nome'];
    p_tel.innerText = contato['telefone'];
    p_email.innerText = contato['email'];

    const rm_button = document.createElement('button');
    rm_button.classList.add('remove');
    rm_button.innerText = 'x'
    rm_button.addEventListener('click', (event)=>{
        const div = event.target.parentNode;
        for(const contato of set_registros) {
            if(contato.id === Symbol.for(div.firstChild.innerText)) {
                set_registros.delete(contato);
                break;
            }
        }
        div.remove();
        console.log(set_registros);
    })

    return [p_nome, p_tel, p_email, rm_button];
}

export { insertRegistro, renderRegistros };