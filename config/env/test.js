require('dotenv/config');

exports.default = {
    // DATABASE_URL: process.env.YOUSURE_DEV_URL,
    APP_HOST: process.env.YOUSURE_APP_HOST || 'xxxxxxxxxx',
    APP_PORT: process.env.YOUSURE_APP_PORT || 'xxxx',
    API_VERSION: process.env.YOUSURE_API_VERSION || 'xxxxxxxxxxx',

}