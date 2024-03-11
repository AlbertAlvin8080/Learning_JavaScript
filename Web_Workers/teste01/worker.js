self.addEventListener("message", (evt) => {
	const data = evt.data;
	let sum = 0;
	for (let i = 0; i < data.num; ++i) {
		sum += i;
	}
	data.alert(sum);
});
