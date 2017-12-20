import {
	RECEIVE_PRODUCTS,
	REQUEST_PRODUCTS,
	PRODUCTS_API
} from './constants';

const requestProducts = () => ({
	type: REQUEST_PRODUCTS
});

const receiveProducts = (data) => ({
	type: RECEIVE_PRODUCTS,
	payload: data
});

const fetchProducts = () => async (dispatch, getState, api) => {
	dispatch(requestProducts());
	dispatch(receiveProducts(await api.get(PRODUCTS_API)));
};

export default { fetchProducts };