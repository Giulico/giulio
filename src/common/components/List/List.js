import React from 'react';
import styles from './List.scss';

export default (props) => (
	<ul>
		{props.items.map(l => (<li className={styles.item} key={l.id}>
			<img
				width={55}
				src={l.image}
				alt={l.name}
			/>
			{l.name}
		</li>))}
	</ul>
);