// "use strict";

const tacos_div = document.querySelector("div.tacos");

function renderTacos(data, id) {
    const div = document.createElement("div");
    div.classList.add("taco-photo");
    div.setAttribute("data-id", id);
	div.innerHTML = `
        <img src="imagens/queso-taco.png" alt="queso-taco">
        <div class="description">
            <h2>${data.nome}</h2>
            <p>U$ ${data.preço}</p>
            <button class="remove" data-id="${id}">Remove<i class="fa-solid fa-trash"></i></button>
        </div>
    `;
	tacos_div.append(div);

	const btn = div.querySelector(`button[data-id="${id}"]`);
	btn.addEventListener("click", (evt) => {
        const id = btn.getAttribute("data-id");
        db.collection("tipos-tacos")
        .doc(id)
        .delete();
	});
}

function removeTaco(id) {
	tacos_div.querySelector(`.taco-photo[data-id="${id}"]`).remove();
}

const dialog = document.querySelector("dialog");
const btn_add = document.querySelector("#add");
console.log(btn_add, dialog);
btn_add.addEventListener("click", (evt) => {
	dialog.showModal();
});

dialog.querySelector("#submit").addEventListener("click", (evt) => {
	evt.preventDefault();
	const form = dialog.querySelector("form");
	const taco = {
		nome: form.nome.value,
		preço: Number(form.preco.value),
	};
	dialog.close();
	db.collection("tipos-tacos").add(taco);
});
