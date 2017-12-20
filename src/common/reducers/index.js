import { combineReducers } from 'redux';

import { reducer as products } from '@/state/products';
import { reducer as hp } from '@/state/hp';
import { reducer as base } from '@/state/base';
import { reducer as locale } from '@/state/locale';

export default combineReducers({
	base,
	hp,
	locale,
	products
});