const IP = typeof (process.env.IP) !== 'undefined' ? process.env.IP : require('ip').address();

const constants = {
	SERVER_PORT: 3000,
	DEV_SERVER_PORT: 3001,
	MOCK_PORT: 3002
};

module.exports = Object.assign({}, constants, {
	ROOT: `http://${IP}:${constants.SERVER_PORT}`,
	PUBLIC_FOLDER: 'public',
	PUBLIC_PATH: `http://${IP}:${constants.DEV_SERVER_PORT}/`,
	OUTPUT_PATH: '',
	API_BASE_URL: `http://${IP}:${constants.MOCK_PORT}/api/`
});