import 'core-js/fn/array/includes';
import path from 'path';
import Pretty from 'pretty';
import CookieParser from 'cookie-parser';
import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { matchPath, StaticRouter as Router } from 'react-router-dom';
import Helmet from 'react-helmet';
import Express from 'express';

import App from '@/containers/App';
import template from '@/index.ejs';
import routes from '@/router/routes';

import {
	PUBLIC_FOLDER,
	PUBLIC_PATH,
	OUTPUT_PATH,
	DEFAULT_LANGUAGE,
	SERVER_PORT,
	ENV
} from '@/constants';

import {
	getLanguageFragmentFromUrl,
	log
} from '@/utils/shared';

import {
	axios as setAxiosDefaults,
	prefetch,
	store as getStore
} from '@/base';

import {
	processErrorHandler,
	asyncErrorHandler
} from '@/base/error-handler';

processErrorHandler();
setAxiosDefaults();

const app = Express();

app
	.use(Express.static(path.resolve(__dirname, PUBLIC_FOLDER)))
	.use(CookieParser())
	.get('/favicon.ico', (req, res) => res.status(204))
	.get('/robots.txt', (req, res) => res.status(204))
	.get('*', asyncErrorHandler(async (req, res) => {

		const language = getLanguageFragmentFromUrl(req.url, DEFAULT_LANGUAGE);

		/**
		 * Generate unique store for request
		 */
		const store = getStore({ language });

		/**
		 * Prefetch common data for each route
		 */
		await prefetch({
			store,
			language
		});

		/**
		 * Generate promises array containing all fetchData function
		 * that match with requested url
		 */
		const promises = [];
	
		routes.some(route => {
		
			const match = matchPath(req.url, route);
		
			if (
				match
			&& route.fetchData
			) {
				promises.push(route.fetchData({
					params: match.params,
					dispatch: store.dispatch
				}));
			}

			return match;

		});

		/**
		 * Fetch data
		 */
		await Promise.all(promises);

		const route = routes.find(i => matchPath(req.url, i));
		
		/**
		 * Generate markup and send to client
		 */
		const context = {
			status: (() => {
				if (route && route.path) return 200;
				if (route && route.to) return 302;
				return 404;
			})()
		};

		const markup = renderToString(
			<Provider store={store}>
				<Router location={req.url} context={context}>
					<App />
				</Router>
			</Provider>
		);

		if (context.status === 302) return res.redirect(302, context.url);

		return res.status(context.status).send(
			template({
				helmet: Helmet.rewind(),
				state: JSON.stringify(store.getState(), null, ENV === 'production' ? 0 : 4),
				markup: ENV === 'development' && process.env.PRETTIFY ? Pretty(markup, null, 2, 80) : markup,
				env: ENV,
				entryBasePath: `${PUBLIC_PATH}${OUTPUT_PATH}`
			})
		);

	}))
	.use((err, req, res, next) => res.status(500).json({
		message: err.message,
		stack: err.stack
	}));

if (process.env.NODE_ENV === 'production') {
	const PORT = process.env.PORT || SERVER_PORT;
	app.listen(PORT, log.bind(null, `Express server run on port ${PORT}`));
}

export default app;