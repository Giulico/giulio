export const processErrorHandler = () => {
	process.on('unhandledRejection', err => {
		throw err;
	});
	process.on('uncaughtException', err => {
		throw err;
	});
};

export const asyncErrorHandler = fn => (req, res, next) => fn(req, res, next).catch(next);