import React from 'react';
import {
	Switch,
	Route
} from 'react-router-dom';

import routes from './routes';

export default (props) => (
	<Switch>
		{routes.map((r, i) => (
			<Route
				key={i}
				exact={r.exact}
				path={r.path}
				component={r.component}
			/>
		))}
	</Switch>
);