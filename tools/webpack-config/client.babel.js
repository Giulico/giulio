import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import commonConfig from './common.babel';
import stylesLoaders from '../webpack-loaders/styles';

import paths from '../paths';

const config = Object.assign({}, commonConfig, {
	target: 'web',
	entry: {
		main: './src/client/',
		vendors: './src/client/vendors'
	},
	output: {
		filename: '[name].js',
		path: paths.OUTPUT_FOLDER,
		publicPath: paths.PUBLIC_PATH
	},
	module: Object.assign({}, commonConfig.module, {
		rules: [
			...commonConfig.module.rules,
			{
				test: /\.scss$/,
				use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: stylesLoaders
				}))
			},
			{
				test: /\.css$/,
				use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						'css-loader',
						'postcss-loader'
					]
				}))
			},
			{
				test: /\.font\.js/,
				use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						'css-loader',
						'webfonts-loader'
					]
				}))
			}
		]
	}),
	plugins: [
		...commonConfig.plugins,
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendors',
			minChunks: Infinity
		}),
		new ExtractTextPlugin({
			filename: 'style.css',
			ignoreOrder: true
		})
	]
});

if (process.env.NODE_ENV === 'development') config.devtool = 'eval-source-map';

export default config;