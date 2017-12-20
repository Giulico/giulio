import {
	createStore,
	compose,
	applyMiddleware
} from 'redux';

import thunkMiddleware from 'redux-thunk';
import reducers from '@/reducers';

import { createInstance } from './axios';

/* eslint-disable no-underscore-dangle */
const initialState = global.__DATA__ || {};
const reduxDevTools = global.__REDUX_DEVTOOLS_EXTENSION__;
/* eslint-enable no-underscore-dangle */

export default ({
	language = initialState.locale ? initialState.locale.language : undefined
} = {}) => {

	const headers = { 'Accept-Language': language };

	const api = createInstance({ headers });

	const composeElements = [applyMiddleware(thunkMiddleware.withExtraArgument(api))];

	if (
		process.env.NODE_ENV !== 'production'
		&& reduxDevTools
	) {
		composeElements.push(reduxDevTools());
	};

	return createStore(reducers, initialState, compose(...composeElements));

};