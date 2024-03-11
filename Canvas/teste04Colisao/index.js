"use strict";
import { Circle, arrayCircle, arrayColor, distance } from "./circle.js";

// const body = document.querySelector("body");
const canvas = document.querySelector("#myCanvas");
const ctx = canvas.getContext("2d");

let innerWidth = Math.floor(window.innerWidth - 0.1);
let innerHeight = Math.floor(window.innerHeight - 0.1);
resizeCanvas();

window.addEventListener("resize", () => {
	innerWidth = Math.floor(window.innerWidth - 0.1);
	innerHeight = Math.floor(window.innerHeight - 0.1);
	resizeCanvas();
	init_spawn();
});

function resizeCanvas() {
	canvas.width = innerWidth;
	canvas.height = innerHeight;
}

window.addEventListener("mousemove", (event) => {
	Circle.mousePosition.x = event.x;
	Circle.mousePosition.y = event.y;
});

function init_spawn() {
	const arr_lenght = arrayCircle.length;
	for (let i = 0; i < arr_lenght; ++i) {
		arrayCircle.pop();
	}

	Circle.ctx = ctx;
	Circle.innerWidth = innerWidth;
	Circle.innerHeight = innerHeight;

	// cuidado com a quantidade de criculos... pode gerar um loop infinito
	for (let i = 0; i < 200; ++i) {
		const radius = Math.floor(Math.random() * 7) + 17;
		const { x, y } = ensureNoOverlapping(radius);

		const vx = (Math.random() - 0.5) * 5;
		const vy = (Math.random() - 0.5) * 5;
		const color = Math.floor(Math.random() * arrayColor.length);

		arrayCircle.push(new Circle(x, y, vx, vy, radius, color));
	}
}

function ensureNoOverlapping(radius) {
	let x = Math.random() * (innerWidth - radius * 2) + radius;
	let y = Math.random() * (innerHeight - radius * 2) + radius;

	for (let i = 0; i < arrayCircle.length; ++i) {
		if (distance(x, y, arrayCircle[i].x, arrayCircle[i].y) - radius - arrayCircle[i].radius < 0) {
			x = Math.random() * (innerWidth - radius * 2) + radius;
			y = Math.random() * (innerHeight - radius * 2) + radius;
			i = -1;
		}
	}

	return { x, y };
}

function animate() {
	ctx.clearRect(0, 0, innerWidth, innerHeight);
	for (let i = 0; i < arrayCircle.length; ++i) {
		arrayCircle[i].move();
	}
	requestAnimationFrame(animate);
}

init_spawn();
const id = requestAnimationFrame(animate);
