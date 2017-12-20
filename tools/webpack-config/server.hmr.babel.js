import StartServerPlugin from 'start-server-webpack-plugin';
import webpack from 'webpack';
import serverConfig from './server.babel';

export default Object.assign({}, serverConfig, {

	entry: {

		server: [
			'webpack/hot/poll?1000',
			...serverConfig.entry.server
		]

	},

	watch: true,

	plugins: [
		
		...serverConfig.plugins,
		new StartServerPlugin('server.js'),
		new webpack.HotModuleReplacementPlugin()
	
	]

});