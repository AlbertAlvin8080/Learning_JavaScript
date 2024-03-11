"use strict";

const arrayCircle = [];
const arrayColor = ["#FFF5E0", "#FF6969", "#BB2525", "#141E46"];

class Circle {
	static mousePosition = { x: null, y: null };
	static innerWidth = null;
	static innerHeight = null;
	static ctx = null;

	constructor(x, y, dvx, dvy, radius, color_idx) {
		this.x = x;
		this.y = y;
		this.dvx = dvx; // direction-velocity
		this.dvy = dvy;
		this.color = arrayColor[color_idx];

		this.radius = radius;
		this.maxRadius = 50;
		this.minRadius = radius;
	}

	move = () => {
		Circle.ctx.beginPath();
		Circle.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		Circle.ctx.fillStyle = this.color;
		Circle.ctx.fill();

		this.borderCollision();
		this.mouseEvent();
		this.x += this.dvx;
		this.y += this.dvy;
	};

	mouseEvent = () => {
		if (!Circle.mousePosition.x || !Circle.mousePosition.y) return;

		const distance = Math.sqrt(Math.pow(Circle.mousePosition.x - this.x, 2) + Math.pow(Circle.mousePosition.y - this.y, 2));
		
		if (distance < 50 && this.radius < this.maxRadius) {
			this.radius++;
		} else if(distance > 50 && this.radius > this.minRadius) {
			this.radius--;
		}
	};

	borderCollision = () => {
		if (this.x + this.radius > Circle.innerWidth || this.x - this.radius < 0) {
			this.dvx = -this.dvx;
		}
		if (this.y + this.radius > Circle.innerHeight || this.y - this.radius < 0) {
			this.dvy = -this.dvy;
		}
	};
}

export { Circle, arrayCircle, arrayColor };
