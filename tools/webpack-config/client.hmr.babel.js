import webpack from 'webpack';
import { address } from 'ip';
import clientConfig from './client.babel';
import constants from '../constants';

export default Object.assign(clientConfig, {

	entry: Object.assign({}, clientConfig.entry, {
		main: [
			'webpack/hot/only-dev-server',
			clientConfig.entry.main
		]
	}),

	devServer: {
		hot: true,
		lazy: false,
		host: address(),
		port: constants().DEV_SERVER_PORT,
		clientLogLevel: 'error',
		headers: {
			'Access-Control-Allow-Origin': '*'
		},
		stats: {
			colors: true,
			assets: true,
			modules: false,
			excludeAssets: assetName => assetName.includes('hot-update')
		}
	},

	plugins: [
		...clientConfig.plugins,
		new webpack.HotModuleReplacementPlugin()
	]

});