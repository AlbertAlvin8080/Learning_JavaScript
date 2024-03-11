"use strict";

import { insertRegistro, renderRegistros } from "./controler.js";

// const div_registros = document.querySelector('#registros');
const btn_cadastrar = document.querySelector('#cadastrar');

btn_cadastrar.addEventListener('click', ()=>{
    const novoRegistro = {
        nome: document.querySelector('#nome').value,
        telefone: document.querySelector('#telefone').value,
        email: document.querySelector('#email').value
    }
    insertRegistro(novoRegistro);
});

insertRegistro({
    nome: 'Jorge',
    telefone: '555-900',
    email: 'jorge@hotmail.com',
});

insertRegistro({
    nome: 'Lucas Luco',
    telefone: '4002-8922',
    email: 'socorro@outlook.com',
});

insertRegistro({
    nome: '3',
    telefone: '3',
    email: '3',
});

renderRegistros();