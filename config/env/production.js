require('dotenv/config');

exports.default = {
    DATABASE_URL: process.env.DATABASE_URL,
    HOST: process.env.HOST, 
    PORT: process.env.PORT, 
    API_VERSION: process.env.API_VERSION,
     

}