const pixiContants = require('./pixi.js');

module.exports = Object.assign(
    process.env.CONSTANTS,
    pixiContants,
    {
        DEFAULT_LANGUAGE: 'it',
        ENV: process.env.NODE_ENV,
        API: {
            LABELS: '/labels',
            PRODUCTS: '/products',
            HP: '/hp',
        },
    },
);
