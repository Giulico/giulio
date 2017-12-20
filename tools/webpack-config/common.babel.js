import webpack from 'webpack';
import path from 'path';
import { svgo } from '../webpack-loaders/images';
import files from '../webpack-loaders/files';
import paths from '../paths';

const config = {
	
	module: {
		rules: [
			{
				loader: 'webpack-modernizr-loader',
				test: /\.modernizrrc\.js$/
			},
			{
				enforce: 'pre',
				include: paths.ASSETS,
				exclude: [
					path.resolve(paths.ASSETS, 'svg-inline'),
					path.resolve(paths.ASSETS, 'icon-font')
				],
				loaders: [
					files({ outputPath: 'assets/' })
				]
			},
			{
				enforce: 'pre',
				test: /\.(svg)$/i,
				include: path.resolve(paths.ASSETS, 'svg-inline'),
				loaders: [
					'raw-loader',
					{
						loader: 'image-webpack-loader',
						options: { svgo }
					}
				]
			},
			{
				enforce: 'post',
				test: /\.js?$/,
				exclude: [
					/node_modules/,
					paths.ASSETS
				],
				use: 'babel-loader'
			},
			/** Prevent error Can't find variable: SockJS" in Safari on Mac and iOS with v2.8.x
			 * https://github.com/webpack/webpack-dev-server/issues/1090
			 */
			{
				enforce: 'post',
				test: /\.js?$/,
				include: [
					path.resolve(paths.NODE_MODULES, 'webpack-dev-server', 'client', 'socket')
				],
				use: {
					loader: 'babel-loader',
					options: {
						plugins: [require('babel-plugin-transform-es2015-block-scoping')]
					}
				}
			}
		]
	},
	resolve: {
		extensions: [
			'.js',
			'.jsx',
			'.json',
			'.scss'
		],
		alias: {
			'@': paths.COMMON,
			modernizr$: paths.MODERNIZR
		}
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.PRETTIFY': process.env.PRETTIFY,
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
			'process.env.SERVER': JSON.stringify(process.env.SERVER),
			'process.env.CONSTANTS': JSON.stringify(require('../constants')())
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	]
};

if (process.env.NODE_ENV === 'production') {

	config.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				screw_ie8: true,
				conditionals: true,
				// drop_console: true,
				unused: true,
				comparisons: true,
				sequences: true,
				dead_code: true,
				evaluate: true,
				join_vars: true,
				if_return: true
			},
			output: {
				comments: false
			}
		})
	);

};

export default config;