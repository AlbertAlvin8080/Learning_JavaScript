const worker = new Worker("./worker.js");

const calculate = document.querySelector("#calculate");
calculate.addEventListener("click", (evt) => {
  worker.postMessage({num: 1_000_000_000, alert: window.alert});
});

const change = document.querySelector("#change");

change.addEventListener("click", () => {
	const color = document.body.style.backgroundColor;
	document.body.style.backgroundColor = color === "red" ? "blue" : "red";
});
