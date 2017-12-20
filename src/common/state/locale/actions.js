import {
	SET_LOCALE,
	RECEIVE_LABELS,
	REQUEST_LABELS,
	LABELS_API
} from './constants';

const requestLabels = () => ({
	type: REQUEST_LABELS
});

const receiveLabels = (data) => ({
	type: RECEIVE_LABELS,
	payload: data
});

const setLocale = data => ({
	type: SET_LOCALE,
	payload: {
		data
	}
});

const fetchLabels = () => async (dispatch, getState, api) => {
	dispatch(requestLabels());
	dispatch(receiveLabels(await api.get(LABELS_API)));
};

const setLocaleWithFetch = data => async (dispatch, getState) => {
	dispatch(setLocale(data));
	await dispatch(fetchLabels(dispatch, getState));
};

export default {
	fetchLabels,
	setLocaleWithFetch
};