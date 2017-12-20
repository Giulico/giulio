import { actions as localeActions } from '@/state/locale'; 

export default async ({
	store,
	language
}) => {
	
	await store.dispatch(new localeActions.setLocaleWithFetch({ language }));

};