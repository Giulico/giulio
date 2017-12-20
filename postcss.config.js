const autoprefixer = require('autoprefixer');

module.exports = ({ file, options, env }) => ({
	plugins: [
		autoprefixer(
			'last 2 versions',
			'ie 10'
		)
	]
});