export const mozjpeg = {
							
	quality: 65

};

export const pngquant = {
								
	quality: 65,
	speed: 4

};

export const svgo = {
	plugins: [
		{ removeViewBox: false },
		{ removeEmptyAttrs: false },
		{ cleanupIDs: false },
		{ removeHiddenElems: false }
	]
};