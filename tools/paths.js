const path = require('path');
const {
	PUBLIC_FOLDER,
	PUBLIC_PATH,
	OUTPUT_PATH
} = require('./constants')();

module.exports = {
	ASSETS: path.resolve(__dirname, '..', 'src', 'common', 'assets'),
	CLIENT: path.resolve(__dirname, '..', 'src', 'client'),
	COMMON: path.resolve(__dirname, '..', 'src', 'common'),
	COMPONENTS: path.resolve(__dirname, '..', 'src', 'common', 'components'),
	DIST: path.resolve(__dirname, '..', 'dist'),
	MODERNIZR: path.resolve(__dirname, '..', '.modernizrrc.js'),
	NODE_MODULES: path.resolve(__dirname, '..', 'node_modules'),
	OUTPUT_FOLDER: path.resolve(__dirname, '..', 'dist', PUBLIC_FOLDER, OUTPUT_PATH),
	OUTPUT_PATH,
	PUBLIC_PATH: `${PUBLIC_PATH}${OUTPUT_PATH}`,
	SERVER: path.resolve(__dirname, '..', 'src', 'server'),
	SHIMS: path.resolve(__dirname, '..', 'src', 'server', 'shims'),
	SRC: path.resolve(__dirname, '..', 'src'),
	STYLES: path.resolve(__dirname, '..', 'src', 'common', 'styles')
};