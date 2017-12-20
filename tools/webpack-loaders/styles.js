import jsonImporter from 'node-sass-json-importer';
import { STYLES } from '../paths';

const css = {
	loader: 'css-loader',
	options: {
		modules: true,
		importLoaders: 1,
		camelCase: true,
		localIdentName: process.env.NODE_ENV === 'development' ? '[name]__[local]' : '[hash:base64:5]',
	}
};

if (process.env.SERVER) {
	css.loader += '/locals';
};

if (process.env.NODE_ENV === 'development') {
	css.options.sourceMap = true;
};

const postcss = {
	loader: 'postcss-loader',
	options: {
		sourceMap: process.env.NODE_ENV !== 'production'
	}
};

const scss = {
	loader: 'sass-loader',
	options: {
		importer: jsonImporter,
		includePaths: [
			STYLES,
			'node_modules'
		]
	}
};

if (process.env.NODE_ENV === 'development') {
	scss.options.sourceMap = true;
};

export default [
	css,
	postcss,
	scss
];