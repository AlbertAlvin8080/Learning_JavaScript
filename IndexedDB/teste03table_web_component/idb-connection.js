"use strict";

// import { generate_id } from "./id-generator.js";

const request = indexedDB.open("beverage_db", 1);
let db = null;

request.onerror = (evt) => {
	console.log(evt.target.error);
};

request.onupgradeneeded = (evt) => {
	const db = evt.target.result;
	const store = db.createObjectStore("beverage_store", { keyPath: "id" });
};

request.onsuccess = (evt) => {
    db = evt.target.result;
    // const tx = db.transaction("beverage_store", "readwrite");
    // tx.oncomplete = () => db.close();
    // const store = tx.objectStore("beverage_store");
    // store.put({id: 1, name: "whiskey", year: "2016", alcoholic: true});
    // store.put({id: 2, name: "orange juice", year: "2016", alcoholic: false});
    // store.put({id: 3, name: "apple juice", year: "2016", alcoholic: true});
    // store.put({id: 4, name: "coffee", year: "2016", alcoholic: false});
}

function add(obj) {
    const tx = db.transaction("beverage_store", "readwrite");
    tx.oncomplete = () => db.close();
}