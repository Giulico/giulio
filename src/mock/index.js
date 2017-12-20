import fs from 'fs';
import path from 'path';
import requireUncached from 'require-uncached';

let serverInstance = null;

const startServer = () => {
	if (serverInstance && serverInstance.destroy) serverInstance.destroy();
	serverInstance = requireUncached('./start-server')();
};

const onWatchHandler = (mode, path) => {
	if (path.includes('public') || path === 'index.js') return;
	startServer();
};

fs.watch(path.join(__dirname, 'routes'), onWatchHandler);
fs.watch(__dirname, onWatchHandler);

startServer();