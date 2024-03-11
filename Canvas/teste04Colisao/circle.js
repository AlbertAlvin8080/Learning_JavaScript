"use strict";

import { resolveCollision } from "./util-elastic-collision.js";

const arrayCircle = [];
const arrayColor = ["blue", "#FF6969", "#BB2525", "#141E46"];

class Circle {
	static mousePosition = { x: null, y: null };
	static innerWidth = null;
	static innerHeight = null;
	static ctx = null;

	constructor(x, y, vx, vy, radius, color_idx) {
		this.x = x;
		this.y = y;
		this.velocity = { x: vx, y: vy };
		this.color = arrayColor[color_idx];

		this.radius = radius;
		this.mass = 1;
		this.opacity = 0;

		Circle.mousePosition.x = Circle.innerWidth / 2;
		Circle.mousePosition.y = Circle.innerHeight / 2;
	}

	move = () => {
		Circle.ctx.beginPath();
		Circle.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		Circle.ctx.save(); // salva o valor da opacidade original (não só da opacidade) para usar nas bordas (strokes)

		Circle.ctx.globalAlpha = this.opacity;
		Circle.ctx.fillStyle = this.color;
		Circle.ctx.fill();

		Circle.ctx.restore();
		Circle.ctx.strokeStyle = this.color;
		Circle.ctx.stroke();

		this.borderCollision();
		this.circleCollision();
		this.mouseEvent();
		this.x += this.velocity.x;
		this.y += this.velocity.y;
	};

	mouseEvent = () => {
		if(distance(this.x, this.y, Circle.mousePosition.x, Circle.mousePosition.y) < 120 && this.opacity < 0.5) {
			this.opacity += 0.05;
		} else if(this.opacity > 0) {
			this.opacity -= 0.05;
			this.opacity = Math.max(0, this.opacity); // corrije um bug artmetico estranho da operacao anterior
		}
	};

	borderCollision = () => {
		if (this.x + this.radius >= Circle.innerWidth || this.x - this.radius <= 0) {
			this.velocity.x = -this.velocity.x;
		}
		if (
			this.y + this.radius >= Circle.innerHeight ||
			this.y - this.radius <= 0
		) {
			this.velocity.y = -this.velocity.y;
		}
	};

	circleCollision = () => {
		for(let i = 0; i < arrayCircle.length; ++i) {
			if(this === arrayCircle[i]) continue;

			if (distance(this.x, this.y, arrayCircle[i].x, arrayCircle[i].y) - this.radius - arrayCircle[i].radius <= 0) {
				resolveCollision(this, arrayCircle[i]);
			}
		}
	};
}

function distance(x1, y1, x2, y2) {
	const dx = Math.pow(x2 - x1, 2);
	const dy = Math.pow(y2 - y1, 2);
	return Math.sqrt(dx + dy);
}

export { Circle, arrayCircle, arrayColor, distance };
