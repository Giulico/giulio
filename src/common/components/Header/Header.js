import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.scss';

export default () => (
	<header className={styles.wrapper}>
		<Link className={styles.item} to='/'>Homepage</Link>
		<Link className={styles.item} to='/products'>Products</Link>
	</header>
);