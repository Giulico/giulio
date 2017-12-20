import { address } from 'ip';

export default {
	PORT: 3002,
	HOST: `http://${address()}:${3002}`,
	ROUTES: [
		{
			route: '/api/hp',
			module: 'hp',
		},
		{
			route: '/api/products',
			module: 'products',
		},
		{
			route: '/api/labels',
			module: 'labels',
		}
	]
};