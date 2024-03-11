"use strict";

const iDB = window.indexedDB;

const request = iDB.open("library_db", 1);

request.onerror = (event) => {
    console.log("An error has occurred whilst opening library_db");
    console.log(event);
}

request.onupgradeneeded = () => {
    const db = request.result;
    const store = db.createObjectStore("book_store", {keyPath: "id"});
    store.createIndex("idx_name", ["name"], {unique: false});
    store.createIndex("idx_author", ["author"], {unique: false});
}

request.onsuccess = () => {
    const db = request.result;
    const transaction = db.transaction("book_store", "readwrite");
    transaction.oncomplete = () => {
        db.close();
    }

    const store = transaction.objectStore("book_store");
    const idx_name = store.index("idx_name");
    const idx_author = store.index("idx_author");

    store.put({id: "1", name: "Detestatio Sacrorum", author: "Escribar"});
    store.put({id: "2", name: "Summa Blasphemia", author: "Penitent"});
    store.put({id: "3", name: "Exemplaris Exconvnicationis", author: "High Wills"});
    store.put({id: "4", name: "Altas Gracias", author: "High Wills"});
    store.put({id: "5", name: "Clavada", author: "Escribar"});
    store.put({id: "6", name: "Requiem Aeternam", author: "Miracle"});

    fetch_by_name(idx_name);
    fetch_by_author(idx_author);
}

function fetch_by_author(idx) {
    const query = idx.getAll(["High Wills"]);
    query.onsuccess = ()=>{
        console.log("idx_author", query.result);
    }
}

function fetch_by_name(idx) {
    const query = idx.getAll(["Clavada"]);
    query.onsuccess = ()=>{
        console.log("idx_name", query.result);
    }
}