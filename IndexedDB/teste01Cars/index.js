"use strict";

const indexedDB = window.indexedDB;

const request = indexedDB.open("cars_db", 1);

request.onerror = (event) => {
	console.error("An error has occurred whilst opening cars_db");
	console.error(event);
};

request.onupgradeneeded = () => {
	const db = request.result;
	const store = db.createObjectStore("cars", { keyPath: "id" });
	store.createIndex("idx_color", ["color"], { unique: false });
	store.createIndex("idx_color_and_make", ["color", "make"], { unique: false });
};

request.onsuccess = () => {
	const db = request.result;
	const transaction = db.transaction("cars", "readwrite");
	transaction.oncomplete = () => db.close();

	const store = transaction.objectStore("cars");
	const idx_color = store.index("idx_color");
	const idx_color_make = store.index("idx_color_and_make");

	store.put({ id: 1, color: "Red", make: "Honda" });
	store.put({ id: 2, color: "Blue", make: "BMW" });
	store.put({ id: 3, color: "Silver", make: "Honda" });
	store.put({ id: 4, color: "Red", make: "Nissan" });
	store.put({ id: 5, color: "Silver", make: "Velvet" });

	const id_query = store.get(2);
	const color_query = idx_color.getAll(["Red"]);
	const color_make_query = idx_color_make.get(["Blue", "BMW"]);

	id_query.onsuccess = () => console.log("id_query", id_query.result);

	color_query.onsuccess = () => console.log("color_query", color_query.result);

	color_make_query.onsuccess = () => console.log("color_make_query", color_make_query.result);

};
