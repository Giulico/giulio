import Hp from '@/containers/Hp';
import Products from '@/containers/Products';

const routes = [
	{
		path: '/:lang([a-z]{2})?',
		component: Hp,
		fetchData: Hp.fetchData,
		exact: true
	},
	{
		path: '/:lang([a-z]{2})?/products',
		component: Products,
		fetchData: Products.fetchData,
		exact: true
	}
];

export default routes;