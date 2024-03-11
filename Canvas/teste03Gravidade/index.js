"use strict";

// import * as circle_module from "./circle.js"
import { arrayCircle, arrayColor, Circle } from "./circle.js";

const canvas = document.querySelector("#myCanvas");
const ctx = canvas.getContext('2d');

let innerWidth = Math.floor(window.innerWidth - 0.1);
let innerHeight = Math.floor(window.innerHeight - 0.1);

window.addEventListener('resize', ()=>{
	innerWidth = Math.floor(window.innerWidth - 0.1);
	innerHeight = Math.floor(window.innerHeight - 0.1);
	init();
});

window.addEventListener('click', ()=>{
	init();
});

function resizeCanvas() {
	canvas.width = innerWidth;
	canvas.height = innerHeight;
}

function animate() {
	ctx.clearRect(0, 0, innerWidth, innerHeight);
	for (let i = 0; i < arrayCircle.length; ++i) {
		arrayCircle[i].move();
	}
	requestAnimationFrame(animate);
}

function init() {
	resizeCanvas();
	const arr_length = arrayCircle.length;
	for (let i = 0; i < arr_length; ++i) {
		arrayCircle.pop();
	}

	Circle.ctx = ctx;
	Circle.innerWidth = innerWidth;
	Circle.innerHeight = innerHeight;

	for (let i = 0; i < 500; ++i) {
		const radius = Math.floor(Math.random() * 10) + 5;
		const x = Math.floor(Math.random() * (innerWidth - 2 * radius) + radius);
		const y = Math.floor(Math.random() * (innerHeight / 2));
		const dvx = (Math.random() < 0.5 ? 1 : -1) * 2;
		const dvy = (Math.random() < 0.5 ? 1 : -1) * 2;
		const color_idx = Math.floor(Math.random() * arrayColor.length);

		arrayCircle.push(new Circle(x, y, dvx, dvy, radius, color_idx));
	}
}

init();
const id = requestAnimationFrame(animate);
