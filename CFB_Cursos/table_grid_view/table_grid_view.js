"use strict";

async function table_grid_view(endpoint) {
    const res = await fetch(endpoint+"?password=123");
    const array_obj = await res.json();
    createTable(array_obj);
}

function createTable(array_obj) {
    const table = document.createElement("table");
    table.border = 1;
    let tr = document.createElement("tr");
    table.prepend(tr);
    
    for(let key in array_obj[0]) {
        const th = document.createElement("th");
        th.innerText = `${key}`;
        tr.appendChild(th);
    }

    array_obj.forEach(obj => {
        tr = document.createElement("tr");
        for(let key in obj) {
            const td = document.createElement("td");
            td.innerText = `${obj[key]}`;
            tr.appendChild(td);
        }
        table.appendChild(tr);
    });

    document.body.prepend(table);
}

table_grid_view("https://tablegridview.albertalvin.repl.co/");

const btn_dialog = document.querySelector("#btn_dialog");
const btn_check_login = document.querySelector("#btn_check_login");
const dialog = document.querySelector("#dialog");

btn_dialog.addEventListener("click", (event) => {
    dialog.showModal();
});

btn_check_login.addEventListener("click", async ()=>{
    const nome = document.querySelector("input#nome").value;
    const senha = document.querySelector("input#senha").value;
    const res = await fetch("https://tablegridview.albertalvin.repl.co/"+`?nome=${nome}&password=${senha}`);
    const array = await res.json();
    console.log(array);
});