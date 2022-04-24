import vite from 'vite';
import { createServer } from 'http';

const server = await vite.createServer();

createServer(async (req, res) => {
	try {
		const module = await server.ssrLoadModule('/src' + req.url);
		res.end(await module.render());
	} catch (e) {
		res.statusCode = 500;
		res.end(e.stack);
	}
}).listen(4567);
