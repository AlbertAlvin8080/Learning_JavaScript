"use strict";

const body = document.querySelector("body");
const canvas = document.querySelector("#myCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
	canvas.width = Math.floor(window.innerWidth - 0.1);
	canvas.height = Math.floor(window.innerHeight - 0.1);
	// canvas.width = Math.floor(body.offsetWidth-0.1);
	// canvas.height = Math.floor(body.offsetHeight-0.1);
	// console.log(Math.floor(body.offsetWidth), Math.floor(body.offsetHeight));
}

function redraw() {
	ctx.fillRect(800, 300, 100, 300);
	ctx.fillStyle = "blue";
	ctx.fillRect(50, 50, 100, 100);

	ctx.beginPath();
	ctx.moveTo(50, 300);
	ctx.lineTo(300, 500);
	ctx.lineTo(1000, 600);
	ctx.strokeStyle = "red";
	ctx.stroke();
}

function renderCanvas() {
	resizeCanvas();
	redraw();
}

window.addEventListener("resize", () => {
	renderCanvas();
});

renderCanvas();
