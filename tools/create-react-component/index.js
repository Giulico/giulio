const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const { camelCase, upperFirst } = require('lodash/string');
const { COMPONENTS } = require('../paths');

const createComponent = () => {
	
	return new Promise((resolve) => {

		inquirer.prompt(
			[
				{
					type: 'input',
					name: 'name',
					message: 'Type the name of the component:',
					filter: (name) => upperFirst(camelCase(name)),
					validate: (name) => {
						const existingComponents = fs.readdirSync(COMPONENTS).filter(file => fs.lstatSync(path.join(COMPONENTS, file)).isDirectory());
						const expression = !(name === '') && !existingComponents.includes(name);
						const message = name === '' ? 'Name is mandatory' : 'This component already exist';
						return expression ? true : message;
					} 
				},
				{
					type: 'list',
					name: 'type',
					message: 'What kind of component do you need?',
					choices: ['functional', 'stateless']
				}
			]
		).then((res) => {
			
			const type = res.type;
			const name = res.name;
			const componentDirectory = `${COMPONENTS}/${name}/`;

			fs.mkdirSync(`${componentDirectory}`);

			const js = require(`./template/${type}-component`)({
				name
			});
			
			fs.writeFileSync(`${componentDirectory}${name}.js`, js);
			
			const scss = require('./template/scss')();

			fs.writeFileSync(`${componentDirectory}${name}.scss`, scss);

			const packageJson = require('./template/package.js')({
				name
			});

			fs.writeFileSync(`${componentDirectory}package.json`, packageJson);

			resolve();

		});
	
	});

};

const createComponentDecorator = () => {
	
	createComponent().then(() => {
		
		return inquirer.prompt(
			[
				{
					type: 'confirm',
					name: 'recreate',
					message: 'Component succesfully created. Do you need another component?'
				}
			]
		);
		
	}).then((res) => {

		if (res.recreate) {

			createComponentDecorator();
		
		} else {

			process.exit();

		}

	});

};

createComponentDecorator();