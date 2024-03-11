"use strict";

const carro_obj = { nome: null, portas: null, blindagem: null, municao: null };
const btn_adicionar = document.querySelector("button#btn_adicionar");

const nome = document.querySelector("#inome");
const portas = document.querySelector("#iportas");
const blindagem = document.querySelector("#iblindagem");
const municao = document.querySelector("#imunicao");
const div_carros = document.querySelector(".carros");

const radio_normal = document.querySelector("input[type='radio']#tipo-normal");
radio_normal.addEventListener('click', () => {
    blindagem.setAttribute('disabled', '');
    municao.setAttribute('disabled', '');
});

const radio_militar = document.querySelector("input[type='radio']#tipo-militar");
radio_militar.addEventListener('click', () => {
    blindagem.removeAttribute('disabled');
    municao.removeAttribute('disabled');
});

function captalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function checarTipo() {
    const tipo = document.querySelector("input[type='radio']:checked");
    if (tipo != null)
        return tipo.id;

    throw new Error("O tipo do input:radio está nulo");
}

function adicionarCarro(carro) {
    const div = document.createElement('div');
    div.setAttribute('class', "carro");
    for (let propriedade in carro) {
        const p = document.createElement('p');
        p.innerText = `${captalize(propriedade)}: ${carro[propriedade]}`;
        div.appendChild(p);
    }

    const btn_remove = document.createElement("button");
    btn_remove.setAttribute("type", "button");
    btn_remove.innerText = "Remover";
    btn_remove.addEventListener('click', (event) => {
        event.target.parentNode.remove();
    });

    div.appendChild(btn_remove);
    div_carros.appendChild(div);
}

btn_adicionar.addEventListener("click", () => {
    carro_obj.nome = nome.value;
    carro_obj.portas = portas.value;

    if (checarTipo() == "tipo-militar") {
        carro_obj.blindagem = blindagem.value;
        carro_obj.municao = municao.value;
    } else {
        carro_obj.blindagem = null;
        carro_obj.municao = null;
    }

    adicionarCarro(carro_obj);
});
