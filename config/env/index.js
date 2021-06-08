
const rootPath = require('app-root-path');
const development =  require('./development');
const test = require('./test');
const production = require('./production');

const {
  DATABASE_URL: DATABASE_URL,
  HOST: HOST,
  PORT: PORT,
  YOUSURE_SECRET: SECRET,
  YOUSURE_NODE_ENV: NODE_ENV,
} = process.env;


const currentEnv = {
  development,
  test,
  production,
}[NODE_ENV || 'development'];

module.exports = {
  ...process.env,
  ...currentEnv,
  DATABASE_URL,
  HOST,
  rootPath,
  PORT,
  SECRET,
  NODE_ENV,
};