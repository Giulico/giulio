module.exports = (params) => `

import React from 'react';
import styles from './${params.name}.scss';

export default (props) => (
	<div className={styles.wrapper}>
		${params.name}
	</div>
);

`.trim();