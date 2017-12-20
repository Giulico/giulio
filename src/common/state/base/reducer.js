import { ROOT } from './constants';

const initialState = {
	seo: {
		url: ROOT,
		title: 'AQ Boilerplate React SSR',
		description: 'Lorem ipsum dolro sit amet',
		favicon: require('@/assets/images/favicon.ico'),
		image: require('@/assets/images/share.jpg')
	}
};

export default (state = initialState, action) => {

	if (typeof action === 'undefined') return state;

	/* eslint-disable indent */
	switch (action.type) {

		default:
			return state;
	}
	/* eslint-enable indent */

};