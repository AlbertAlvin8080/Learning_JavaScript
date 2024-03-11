"use strict";

const css = `
    <style>
        :host { display: block;}
        table th { width: 70px; padding: 5px; }
        table td { text-align: center; padding: 5px; }
        form { margin-top: 30px; width: 400px; }
        form div { margin: 5px 0; }
        button { width:80px; margin-right: 5px; }
        input[type="text"], input[type="number"] { display: block; }
        #div-btn { margin-top: 20px; }
        .entry:hover { background-color: lightgrey; }
        .selected { background-color: lightblue; }
    </style>

    <table border="1">
        <thead>
            <tr></tr>
        </thead>
        <tbody></tbody>
    </table>

    <form>
        <fieldset>
            <div id="div-btn">
                <button id="insert" type="button">Insert</button>
                <button id="delete" type="button">Delete</button>
                <button id="update" type="button">Update</button>
            </div>
        </fieldset>
    </form>
`;

class IndexedTable extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.shadowRoot.innerHTML = css;
        this.keys = [];
		this.open();
	}

	open() {
		const request = indexedDB.open(this.dbName);
		request.onsuccess = (evt) => {
			this.db = evt.target.result;
			this.createHeader();
		};
	}

	createHeader() {
		const tx = this.db.transaction(this.storeName, "readonly");
		const store = tx.objectStore(this.storeName);
		const req = store.getAll();

		req.onsuccess = (evt) => {
			const obj = evt.target.result[0];
			const tr = this.shadowRoot.querySelector("thead > tr");

			for (let key in obj) {
				tr.innerHTML += `<th>${key}</th>`;
			}

			this.populate(store);
            this.createForm(store);
		};
	}

	populate(store) {
		const dataReq = store.getAll();
		dataReq.onsuccess = (evt) => {
			const array = evt.target.result;
			const tbody = this.shadowRoot.querySelector("table > tbody");
            tbody.innerHTML = "";

			for (let obj of array) {
				const tr = document.createElement("tr");
				tr.addEventListener("click", (evt) => {
                    const selected = this.shadowRoot.querySelector(".selected");
                    if(selected && selected !== evt.target.closest(".entry")) 
                        selected.classList.remove("selected");
                    tr.classList.toggle("selected");
                });

				tr.classList.add("entry");
                tr.setAttribute("data-key", Number(obj[this.keyPath]));
				tbody.appendChild(tr);

				for (let key in obj) {
					tr.innerHTML += `<td>${obj[key]}</td>`;
				}
			}
		};
	}

    createForm(store) {
        const reqAll = store.getAll();
        reqAll.onsuccess = (evt) => {
            const obj = evt.target.result[0];
            const fieldset = this.shadowRoot.querySelector("form > fieldset");

            for(let key in obj) {
                let type = typeof obj[key];

                if(type === "boolean")
                    type = "checkbox";
                else if(type === "number")
                    type = "number";
                else
                    type = "text";

                fieldset.innerHTML += `
                    <div>
                        <label for="${key}">${key}:</label>
                        <input type="${type}" id="${key}">
                    </div>`;
            }

            this.createButtonListeners();
        }
    }

    createButtonListeners() {
        this.shadowRoot.querySelector("button#delete").addEventListener("click", (evt) => {
            evt.preventDefault();
            const selected = this.shadowRoot.querySelector(".selected");
            if(!selected) 
                throw new Error("No entry selected");

            const id = selected.getAttribute("data-key");
            const tx = this.db.transaction([this.storeName], "readwrite");
            const store = tx.objectStore(this.storeName);

            const reqDelete = store.delete(Number(id));
            reqDelete.onsuccess = () => {
                this.populate(store);
            }
        });

        this.shadowRoot.querySelector("#insert").addEventListener("click", (evt) => {
            evt.preventDefault();

            const tx = this.db.transaction(this.storeName, "readwrite");
            const store = tx.objectStore(this.storeName);
            const reqAll = store.getAll();
            reqAll.onsuccess = (evt) => {
                const data_obj = evt.target.result[0];
                const obj = this.formToObject(data_obj);

                const addReq = store.add(obj);
                addReq.onsuccess = () => {
                    this.populate(store);
                };

                this.resetForm(data_obj);
            }
        });

        this.shadowRoot.querySelector("#update").addEventListener("click", (evt) => {
            evt.preventDefault();
            
            const tx = this.db.transaction(this.storeName, "readwrite");
            const store = tx.objectStore(this.storeName);
            const reqAll = store.getAll();
            reqAll.onsuccess = (evt) => {
                const data_obj = evt.target.result[0];
                const obj = this.formToObject(data_obj);

                const putReq = store.put(obj);
                putReq.onsuccess = () => {
                    this.populate(store);
                };

                this.resetForm(data_obj);
            }
        });
    }

    formToObject(data_obj) {
        const obj = {};
        for(let key in data_obj) {
            let type = typeof data_obj[key];
            if(type === "boolean")
                obj[key] = this.shadowRoot.querySelector(`#${key}`).checked;
            else if(type === "number")
                obj[key] = Number(this.shadowRoot.querySelector(`#${key}`).value);
            else
                obj[key] = this.shadowRoot.querySelector(`#${key}`).value;
            if(obj[key] === "")
                throw new Error("Preencha todos os campos");
        }
        return obj;
    }

    resetForm(data_obj) {
        for(let key in data_obj) {
            this.shadowRoot.querySelector(`#${key}`).value = "";
        }
    }

    get keyPath() {
        return this.getAttribute("key-path");
    }

    get storeName() {
        return this.getAttribute("store-name");
    }

	get dbName() {
		return this.getAttribute("db-name");
	}
}

customElements.define("indexed-table", IndexedTable);
