"use strict";

const template = document.createElement("template");
template.innerHTML = `
    <style>
        label {
            color: red;
            display: block;
            font-size: 2rem;
        }
        h3 {
            color: blue;
        }
        .small-text {
            font-size: 1rem;
            color: grey;
        }
    </style>
    <label for="item">
        <input type="checkbox" id="item">
        <slot></slot>
        <span class="small-text"><slot name="small-text"></slot></span>
    </label>
`;

class TodoList extends HTMLElement {
    constructor() {
        super();
        this.shadowDom = this.attachShadow({mode: "open"});
        this.shadowDom.append(template.content.cloneNode(true));
    }

    static get observedAttributes() {
        return ["checked"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if(name === "checked") this.updateInputCheckbox(newValue);
    }

    updateInputCheckbox(newValue) {
        this.shadowDom.querySelector("input").checked = newValue != null && newValue !== "false";
    }
}

window.customElements.define("todo-list", TodoList);

const todoItem = document.querySelector("todo-list");
let checked = false;
setInterval(() => {
    checked = !checked;
    todoItem.setAttribute("checked", checked);
}, 500);