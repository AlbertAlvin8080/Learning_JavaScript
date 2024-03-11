"use strict";

const ctx = document.getElementById("grafico1");

let dataArray = [12, 19, 3]

let chart1 = new Chart(ctx, {
	type: "bar",
	data: {
		labels: ["Red", "Blue", "Yellow"],
		datasets: [
			{
				label: "# of Votes",
				data: dataArray,
				borderWidth: 1,
			},
		],
	},
	options: {
		scales: {
			y: {
				beginAtZero: true,
			},
		},
	},
});

let endpoint = "https://chartjs01.albertalvin.repl.co/";

function change_chart() {
    fetch(endpoint, {method: "GET"})
    .then(res => res.json())
    .then(obj => {
        dataArray[0] = obj.n1;
        dataArray[1] = obj.n2;
        dataArray[2] = obj.n3;
        chart1.update();
    })
    .catch(err => console.log(err));
}

setInterval(change_chart, 1500);

