import http from 'http';
import { log } from '../common/utils/shared';
import constants from '../../tools/constants';

let app = require('./server');
let currentApp = app;

const server = http.createServer(app);
server.listen(constants().SERVER_PORT, null, null, log.bind(null, `Project running on ${constants().ROOT}`));

if (module.hot) {
	module.hot.accept('./server', () => {
		server.removeListener('request', currentApp);
		app = require('./server');
		server.on('request', app);
		currentApp = app;
	});
}