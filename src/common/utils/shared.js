import { diff } from 'deep-object-diff';

export const getLanguageFragmentFromUrl = (url, defaultLanguage = 'it') => {
	const match = url.match(/\/([a-z]{2})(?:\/|$)/);
	return match ? match[1] : defaultLanguage;
};

export const getLanguageFromClient = () => {
	return document.documentElement.getAttribute('lang') || getLanguageFragmentFromUrl(location.pathname);
};

export const timeout = ({ ms = 1000 } = {}) => new Promise(resolve => setTimeout(resolve, ms));

export const getBoundingClientRect = (element, extra) => {
	const bounding = {};
	const boundingRect = element.getBoundingClientRect();
	[
		'top',
		'right',
		'bottom',
		'left',
		'width',
		'height'
	].forEach(k => bounding[k] = boundingRect[k]);
	
	if (extra) {
		const style = window.getComputedStyle(element);
		const styleKeys = [
			'margin-bottom',
			'margin-left',
			'margin-right',
			'margin-top',
			'padding-bottom',
			'padding-left',
			'padding-right',
			'padding-top'
		];
		styleKeys.forEach(k => {
			const edge = k.split('-')[1];
			const number = style[k].includes('px') ? Number(style[k].match(/\d/g).join('')) : 0;
			bounding[edge] += number;
			const size = ['left', 'right'].includes(edge) ? 'width' : 'height';
			bounding[size] += number;
		});
	}

	return bounding;
};

export const flattenItems = (items, key) => items.reduce((flattenedItems, item) => {
	flattenedItems.push(item);
	if (Array.isArray(item[key])) {
		flattenedItems = flattenedItems.concat(flattenItems(item[key], key)); // eslint-disable-line no-param-reassign
	};
	return flattenedItems;
}, []);

export const findMultiDimensional = ({
	items,
	childrenKey = 'children',
	key,
	value
}) => flattenItems(items, childrenKey).find(i => i[key] === value);

export const range = (value, min, max) => Math.min(Math.max(value, min), max);

export const deepDiff = (a, b) => diff(a, b);

export const parentsContains = ({
	el,
	parent
}) => {
	
	let node = el; 
	while (
		node !== parent
		&& node.parentNode
	) {
		node = node.parentNode;
	}
	return !node.parentNode ? false : node;
};

export const loadScript = src => new Promise(resolve => {
	const s = document.createElement('script');
	let r = false;
	s.type = 'text/javascript';
	s.src = src;
	s.onload = s.onreadystatechange = function() { // eslint-disable-line 
		if (!r && (!this.readyState || this.readyState === 'complete')) {
			r = true;
			resolve();
		}
	};
	const t = document.getElementsByTagName('script')[0];
	t.parentNode.insertBefore(s, t);
});

export const log = message => {
	console.log('************************************************************');
	console.info(`  👍   ${message}  👍`);
	console.log('************************************************************');
};

export const replaceBRWithNewLine = value => value ? value.replace(/<br ?\/?>/g, '\n') : value; // eslint-disable-line

export const preloadImages = ({ images }) => Promise.all(images.map(src => new Promise((resolve, reject) => {
	const image = new Image();
	image.onload = resolve;
	image.onerror = reject;
	image.src = src;
})));

export const stripBr = ({
	string
}) => {
	let strippedString = string;
	strippedString = strippedString.replace(/<br\s*\/?>/gi, ' ');
	return strippedString.trim();
};

export const stripTags = ({
	string,
	replaceBrWithSpaces = true
}) => {
	let strippedString = string;
	if (replaceBrWithSpaces) strippedString = stripBr({ string: strippedString });
	strippedString = strippedString.replace(/<\/?[^>]+(>|$)/g, '');
	return strippedString.trim();
};

if (module.hot) module.hot.accept();