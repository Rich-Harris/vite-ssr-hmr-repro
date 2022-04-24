let seconds = 0;

const interval = setInterval(() => {
	console.log(`module has been alive for ${++seconds} seconds`);
}, 1000);

if (import.meta.hot) {
	import.meta.hot.dispose(() => {
		clearInterval(interval);
	});
}

export function render() {
	return 'hello!';
}
