module.exports = (params) => `

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './${params.name}.scss';

export default class ${params.name} extends Component {

	render() {

		return (
			<div className={styles.wrapper}>
				${params.name}
			</div>
		);
	}
};

${params.name}.defaultProps = {
	name: 'Lorem ipsum'
};

${params.name}.propTypes = {
	name: PropTypes.string.isRequired
};`.trim();