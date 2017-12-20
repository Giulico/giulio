import { HOST } from '../constants';

export default (req, res) => res.json({
	data: [
		{
			id: 0,
			name: 'Products 1',
			image: `${HOST}/react-logo.png`
		},
		{
			id: 1,
			name: 'Products 2',
			image: `${HOST}/react-logo.png`
		},
		{
			id: 2,
			name: 'Products 3',
			image: `${HOST}/react-logo.png`
		}
	],
	message: '',
	error: ''
});