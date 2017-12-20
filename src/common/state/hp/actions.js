import {
	RECEIVE_HP,
	REQUEST_HP,
	HP_API
} from './constants';

const requestHp = () => ({
	type: REQUEST_HP
});

const receiveHp = (data) => ({
	type: RECEIVE_HP,
	payload: data
});

const fetchHp = () => async (dispatch, getState, api) => {
	dispatch(requestHp());
	dispatch(receiveHp(await api.get(HP_API)));
};

export default { fetchHp };