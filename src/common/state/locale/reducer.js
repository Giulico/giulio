import {
	RECEIVE_LABELS,
	SET_LOCALE
} from './constants';

const initialState = {
	labels: {},
	language: null
};

export default (state = initialState, action) => {

	if (typeof action === 'undefined') return state;

	/* eslint-disable indent */
	switch (action.type) {
		case RECEIVE_LABELS: {
			return {
				...state,
				labels: action.payload.data
			};
		}
		case SET_LOCALE: {
			return {
				...state,
				language: action.payload.data.language
			};
		}

		default:
			return state;
	}
	/* eslint-enable indent */

};