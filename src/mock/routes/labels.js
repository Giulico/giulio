import { HOST } from '../constants';

export default (req, res) => res.json({
	data: {
		test: 'Lorem ipsum'
	},
	message: '',
	error: ''
});