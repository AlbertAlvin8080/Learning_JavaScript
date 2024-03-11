"use strict";

const n1 = document.querySelector("#n1");
const n2 = document.querySelector("#n2");
const n3 = document.querySelector("#n3");

function makeRequest(endpoint) {
	fetch(endpoint, { method: "get" })
		.then((res) => res.json())
		.then((res) => {
			n1.innerText = `n1: ${res.n1}`;
			n2.innerText = `n2: ${res.n2}`;
			n3.innerText = `n3: ${res.n3}`;
		})
		.catch((err) => console.log(err));
}

makeRequest("https://treinandofetchjs--albertalvin.repl.co/");

const teste = { palavra: "oi2" };

function gravarDados(endpoint) {
	fetch(endpoint, {
		method: "POST",
		body: JSON.stringify(teste),
		headers: { "Content-Type": "application/json" },
	})
		.then((res) => res.json())
		.then((res) => console.log(res));
}

gravarDados("https://treinandofetchjs--albertalvin.repl.co/");
