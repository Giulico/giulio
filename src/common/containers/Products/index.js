import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { actions } from '@/state/products';

import Meta from '@/components/Meta';
import List from '@/components/List';

@connect(state => ({ products: state.products }))
class Products extends Component {

	static fetchData({ dispatch }) {
		return dispatch(new actions.fetchProducts());
	}

	componentWillMount() {
		if (this.props.products.length === 0) {
			this.constructor.fetchData({ dispatch: this.props.dispatch });
		};
	}

	render() {

		const { products } = this.props;

		return [
			<Meta
				key={0}
				title={'Products'}
				description={'Product description Lorem ipsum dolor sit amet'}
				url={'/products'}
			/>,
			<List
				key={1}
				items={products}
			/>
		];

	}

};

Products.propTypes = {
	products: PropTypes.array
};

export default Products;