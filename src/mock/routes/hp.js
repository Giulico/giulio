import { HOST } from '../constants';

export default (req, res) => res.json({
	data: {
		title: 'AQQ!! Boilerplate React SSR',
		image: `${HOST}/react-logo.png`,
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>Sed eget accumsan diam. Nunc sollicitudin enim id lectus accumsan, sed consectetur neque dictum.<br>Nulla dapibus leo ut interdum congue.<br>Ut id nisi vel ante condimentum vulputate. Suspendisse sollicitudin varius auctor'
	},
	message: '',
	error: ''
});