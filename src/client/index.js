import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import {
	axios as setAxiosDefaults,
	store as getStore
} from '@/base';

/**
 * Require main styles
 */
import 'normalize.css/normalize.css';
import '@/styles';
import '@/assets/icon-font/icon.font';

/**
 * Generate Store
 */
const store = getStore();

setAxiosDefaults();

/**
 * Render App component
 */
const renderComponent = () => {
	const App = require('@/containers/App');

	return (
		<Provider store={store}>
			<Router>
				<App />
			</Router>
		</Provider>
	);
};

/**
 * Render App on first client render
 */
hydrate(renderComponent(), document.getElementById('app-root'));

/**
 * Enable HMR on App and Reducers
 */
if (module.hot) {
	module.hot.accept('@/containers/App', () => hydrate(renderComponent(), document.getElementById('app-root')));
	module.hot.accept('@/reducers', () => store.replaceReducer(require('@/reducers')));
};