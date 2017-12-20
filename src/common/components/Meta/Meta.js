import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import stripTags from 'strip-tags';

export default connect(state => ({
	seo: state.base.seo,
	language: state.locale.language
}))(({
	seo,
	url = '',
	title = false,
	description = seo.description,
	image = seo.image,
	favicon = seo.favicon,
	language,
	hrefLang = []
}) => {

	const formattedTitle = title && title !== seo.title ? `${stripTags(title)} | ${seo.title}` : seo.title;
	const formattedUrl = `${seo.url.replace(/\/$/, '')}${url}`;

	let props = {
		htmlAttributes: {
			itemscope: true,
			itemtype: 'http://schema.org/Article'
		},
		link: [],
		meta: [
			{
				name: 'twitter:card',
				content: 'summary'
			},
			{
				name: 'twitter:site',
				content: '@qcterme'
			}
		]
	};

	/**
	 * Title
	 */
	props = Object.assign({}, props, {
		title: formattedTitle,
		meta: props.meta.concat([
			{
				itemprop: 'name',
				content: formattedTitle
			},
			{
				itemprop: 'twitter:title',
				content: formattedTitle
			},
			{
				property: 'og:title',
				content: formattedTitle
			},
			{
				property: 'og:type',
				content: 'article'
			}
		])
	});

	/**
	 * Description
	 */
	props.meta.push(
		{
			name: 'description',
			content: stripTags(description)
		},
		{
			itemprop: 'description',
			content: stripTags(description)
		},
		{
			name: 'twitter:description',
			content: stripTags(description)
		},
		{
			name: 'og:description',
			content: stripTags(description)
		}
	);

	/**
	 * Favicon
	 */
	props.link.push(
		{
			rel: 'shortcut icon',
			href: favicon,
			type: 'image/x-icon'
		}
	);

	/**
	 * Image
	 */
	props.meta.push(
		{
			itemprop: 'image',
			content: image
		},
		{
			name: 'twitter:image',
			content: image
		},
		{
			name: 'og:image',
			content: image
		}
	);

	/**
	 * Url
	 */
	props.meta.push(
		{
			name: 'og:url',
			content: formattedUrl
		}
	);

	/**
	 * Language
	 */
	props.htmlAttributes.lang = language;

	/**
	 * Href Lang
	 */
	if (hrefLang.length > 0) {
		props.link.push(
			...hrefLang.map(l => ({
				rel: 'alternate',
				hreflang: l.lang,
				href: `${l.replace(/\/$/, '')}${l.href}`
			}))
		);
	}

	return <Helmet {...props} />;
});