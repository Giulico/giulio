# AQ Boilerplate React SSR

## Features and main dependencies
* Webpack v3.8.1
* HMR client and server side
* React v16
* React router v4
* Redux for state management
* CSS Modules
* Eslint (airbnb preset)
* Stylelint
* Mock Api with throttling and watcher
* React component creation wizard

## Instructions

* [Installation](#installation)
* [Development](#development)
* [Production](#production)
* [Component](#component)
* [After deploy](#after-deploy)

## Installation
```javascript
yarn install
```
...as usual...

## Constants
You can find the main constants in `tools/constants`;
When you launch `yarn run dev`, will be exposed `tools/constants/development.js`.
Otherwise, when you launch `yarn run build`, will be exposed `tools/constants/production.js`.

If you want to add a new configuration for production, you can manage environment variables in `package.json` file, then modify `tools/constants` to expose the new configuration.

```json
// package.json

{
	"build": {
		"command": "...",
		"env": {
			"NODE_ENV": "production"
		}
	},
	"build-production-1": {
		"command": "...",
		"env": {
			"NODE_ENV": "production",
			"NODE_PRODUCTION_ENV: "production-1"
		}
	},
	"build-production-2": {
		"command": "...",
		"env": {
			"NODE_ENV": "production",
			"NODE_PRODUCTION_ENV: "production-2"
		}
	}
}
```

```javascript
// tools/constants

module.exports = () => {
	if (process.env.NODE_ENV === 'development') return require('./development');
	if (process.env.NODE_ENV === 'production' && process.env.NODE__PRODUCTION_ENV === 'production-1') return require('./production-1');
	if (process.env.NODE_ENV === 'production' && process.env.NODE__PRODUCTION_ENV === 'production-2') return require('./production-2');
	return require('./production');
};
```

## Development

Run website in development mode with Hot Module Replacement, on client and server side.
Remember to launch first `yarn run mock`, to prevent error on api calls.

```javascript
yarn run mock
yarn run dev
```

## Build

This command execute this scripts:
* Clean: `rimraf` dist folder
* Lint: execute `eslint` and `stylelint`
* Build client: a build will be generated from `src/client/index.js` entry point
* Build server: a build will be generated from `src/server/server.js` entry point

```
yarn run build
```

## Start 

Run website in production mode on `localhost:3000`

```
yarn run start
```

## Component

This command launches simple wizard for the creation of a react component.
The component will be created on `src/components`.

```
yarn run component

Type the name of the component: Test

What kind of component do you need? (Use arrow keys)
> functional
  stateless
  
Component succesfully created. Do you need another component? (Y/n)
```

## After deploy

After deploy, launch this command to start project:
 
```
yarn start
yarn mock // only on local environment
```