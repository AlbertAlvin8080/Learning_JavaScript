"use strict";

const span_temperatura = document.querySelector("#tem");
const span_pressao = document.querySelector("#pre");
const span_nivel = document.querySelector("#niv");

const endpoint = "https://chartjs01.albertalvin.repl.co/";

const dados = {
	temperatura: null,
	pressao: null,
	nivel: null,
	get dados() {
		return [this.temperatura, this.pressao, this.nivel];
	},
	set dados(valor) {
		this.temperatura = valor.temperatura;
		this.pressao = valor.pressao;
		this.nivel = valor.nivel;
        changeData(this);
	},
};

function changeData({temperatura, pressao, nivel}) {
    span_temperatura.innerText = temperatura;
    span_pressao.innerText = pressao;
    span_nivel.innerText = nivel; 
}

async function buscarDados(endpoint) {
	const res = await fetch(endpoint, { method: "GET" });
	const obj = await res.json();
	dados.dados = obj;
}

setInterval(() => buscarDados(endpoint), 1000);
