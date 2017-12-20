import fs from 'fs';
import path from 'path';
import enableDestroy from 'server-destroy';
import requireUncached from 'require-uncached';
import Express from 'express';
import throttle from 'express-throttle-requests';
import cors from 'cors';
import { log } from '../common/utils/shared';

let serverInstance = null;

export default () => {
	
	const {
		PORT,
		ROUTES,
		HOST
	} = requireUncached('./constants');
	
	const app = Express();
	
	throttle(app, {
		min: 1,
		max: 1
	});

	app
		.options('*', cors())
		.get('*', cors())
		.delete('*', cors())
		.post('*', cors())
		.use(Express.static(path.resolve(__dirname, 'public')));

	ROUTES.forEach(r => app.use(`${r.route}`, requireUncached(`./routes/${r.module}`)));

	serverInstance = app.listen(PORT, log.bind(null, `Mock API server run on ${HOST}`));
	
	enableDestroy(serverInstance);

	return serverInstance;
	
};