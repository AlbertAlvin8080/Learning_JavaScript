"use strict";

const css = `
    :host {
        display: block;
        width: 200px;
        height: 40px;
        overflow: hidden;
        background-color: lightgrey;
        border-radius: 4px;
    }

    .fill {
        width: 0%;
        height: 100%;
        transition: width 0.25s;
        background-color: green;
    }
`;

class LoadBar extends HTMLElement {
	constructor() {
		super();
        
		const style = document.createElement("style");
		const fill = document.createElement("div");
		style.innerHTML = css;
		fill.classList.add("fill");
        
		this.attachShadow({ mode: "open" });
		this.shadowRoot.append(style, fill);
	}

    get percentage() {
        return Number(this.getAttribute("percentage"));
    }

    set percentage(value) {
        this.setAttribute("percentage", value);
    }

    static get observedAttributes() {
        return ["percentage"];
    }

    attributeChangedCallback(name) {
        if(name === "percentage") this.changeBarWidth();
    }

    changeBarWidth() {
        let value = this.percentage;

        if(isNaN(value) || value < 0) 
            value = 0;
        else if(value > 100) 
            value = 100;

        this.shadowRoot.querySelector(".fill").style.width = `${value}%`;
    }
}
customElements.define('load-bar', LoadBar);

const item = document.querySelector("load-bar");
setInterval(() => {
    item.percentage = Number(item.percentage) + 1;
}, 100);