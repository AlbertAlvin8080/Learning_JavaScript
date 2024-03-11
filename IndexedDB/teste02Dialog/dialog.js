"use strict";

const dialog = document.querySelector("#dialog");
dialog.style = "max-width: 400px; text-align: justify; border: .5px solid black; border-radius: 5px;";
const btn_dialog = document.querySelector("#btn_dialog");
const close_dialog = document.querySelector("#close_dialog");

btn_dialog.addEventListener("click", ()=>{
    const request = indexedDB.open("library_db");
    request.onsuccess = ()=>{
        const db = request.result;
        const trans = db.transaction("book_store");
        trans.oncomplete = ()=>{
            db.close();
        }

        const store = trans.objectStore("book_store");
        const queryResult = store.index("idx_name").getAll(["Clavada"]);
        queryResult.onsuccess = () => {
            const result = queryResult.result;
            console.log({...result[0]});

            const p = document.createElement("p");
            p.innerText = JSON.stringify(result[0]);
            dialog.appendChild(p);
        };
    
    }
    dialog.showModal();
});


close_dialog.addEventListener("click", ()=>{
    dialog.close();
});