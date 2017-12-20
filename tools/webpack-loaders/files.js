export default ({ outputPath = '' }) => ({
	loader: 'file-loader',
	options: {
		
		name: '[name].[ext]',
		outputPath,
		emitFile: !process.env.SERVER
	
	}
});