import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { actions } from '@/state/hp';

@connect(state => ({ hp: state.hp }))
class Hp extends Component {

	static fetchData({ dispatch }) {
		return dispatch(new actions.fetchHp());
	}

	componentWillMount() {
		if (Object.keys(this.props.hp).length === 0) {
			this.constructor.fetchData({ dispatch: this.props.dispatch });
		}
	}

	render() {

		const { hp } = this.props;

		return [
			<section key={1}>
				<img
					width={50}
					alt='React Logo'
					src={hp.image}
				/>
				<h1>{hp.title}</h1>
			</section>,
			<section
				key={2}
				dangerouslySetInnerHTML={{ __html: hp.description }}
			/>
		];

	}

};

Hp.propTypes = {
	hp: PropTypes.object
};

export default Hp;