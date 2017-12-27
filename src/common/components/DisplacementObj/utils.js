export const load = (path, callback) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const img = document.createElement('img');
    img.crossOrigin = 'Anonymous';
    img.onload = function onload() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        callback(canvas, ctx, img);
    };
    img.src = path;
    return {
        context: ctx,
        image: img,
        canvas,
    };
};

export const asd = null;
