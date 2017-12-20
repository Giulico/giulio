import axios from 'axios';
import { API_BASE_URL } from '@/constants';
import interceptors from './interceptors';

export default () => {
	/**
	 * Global Axios defaults, equal for each request
	 */
	axios.defaults = Object.assign(axios.defaults, {
		baseURL: API_BASE_URL
	});
};

export const createInstance = ({ headers }) => {
	/**
	 * This settings are different for each request
	 * Insert here autorization token, language header etc etc...
	 */
	const instance = axios.create({
		transformResponse: response => JSON.parse(response).data || JSON.parse(response),
		headers: { common: headers }
	});

	interceptors.request.forEach(r => instance.interceptors.request.use(r.then, r.catch));
	interceptors.response.forEach(r => instance.interceptors.response.use(r.then, r.catch));

	return instance;
};