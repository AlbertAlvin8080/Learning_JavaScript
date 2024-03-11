"use strict";

const template = document.createElement("template");
template.innerHTML = `
    <slot></slot>
`;

const css = new CSSStyleSheet();
css.replaceSync(
	"#btn_exp {position: absolute; top: 0; left:0; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;}"
);
document.adoptedStyleSheets = [css];

class ExpandableUL extends HTMLUListElement {
	constructor() {
		super();

		this.btn = document.createElement("button");
		this.btn.id = "btn_exp";
		this.btn.innerText = ">";
		this.btn.addEventListener("click", () => {
            this.dataset.expanded = !this.isExpanded;
		});

        this.dataset.expanded = "true";

		this.style = "position: relative; padding-top: 1rem;";
		this.appendChild(this.btn);
	}

    get isExpanded() {
        return this.dataset.expanded != null && this.dataset.expanded !== "false";
    }

	static get observedAttributes() {
        return ["data-expanded"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if(name === "data-expanded") this.updateStyles();
    }
    
    updateStyles() {
        const rotate = `rotate(${this.isExpanded ? 0 : 90}deg)`;
        this.btn.style.transform = rotate;
        [...this.children].forEach((element) => {
            if(element === this.btn) return;
            element.style.display = this.isExpanded ? "" : "none";
        });
    }

}

customElements.define("expandable-ul", ExpandableUL, { extends: "ul" });
