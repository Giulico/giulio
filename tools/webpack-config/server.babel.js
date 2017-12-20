import path from 'path';
import webpack from 'webpack';
import commonConfig from './common.babel';
import stylesLoaders from '../webpack-loaders/styles';
import paths from '../paths';

const config = Object.assign({}, commonConfig, {
	
	target: 'node',

	node: {
		__dirname: false,
		__filename: false
	},

	entry: {
		
		server: process.env.NODE_ENV === 'development' ? [
			'./src/server',
		] : [
			'./src/server/server.js'
		]
	
	},

	output: {
		filename: '[name].js',
		path: paths.DIST,
		libraryTarget: 'commonjs',
		publicPath: paths.PUBLIC_PATH
	},

	module: {
		
		rules: [

			...commonConfig.module.rules,

			{
				test: /\.scss$/,
				use: stylesLoaders
			},
			{
				test: /\.css$/,
				use: [
					'css-loader',
					'postcss-loader'
				]
			},
			{
				test: /\.ejs$/,
				exclude: /node_modules/,
				loader: 'ejs-loader?variable=locals'
			},
			{
				test: /\.font\.js/,
				use: [
					'css-loader',
					'webfonts-loader'
				]
			}

		]
	
	},

	externals: [
		'express'
	],

	plugins: [
		...commonConfig.plugins,
		new webpack.NormalModuleReplacementPlugin(/\bbonus-files-for-npm-users\b/, path.resolve(paths.SHIMS, 'empty')),
		new webpack.NormalModuleReplacementPlugin(/\bmodernizr\b/, path.resolve(paths.SHIMS, 'empty'))
	]
	
});

if (process.env.NODE_ENV === 'production') {
	config.resolve = Object.assign(config.resolve, {
		alias: Object.assign({}, config.resolve.alias, {
			'supports-color': path.resolve(paths.SHIMS, 'empty')
		})
	});
};

export default config;