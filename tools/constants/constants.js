module.exports = () => {
	if (process.env.NODE_ENV === 'development') return require('./development');
	return require('./production');
};