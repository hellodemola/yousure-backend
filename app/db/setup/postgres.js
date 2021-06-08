const Promise = require('bluebird');
const pg = require('pg-promise');
const config = require('../../../config');

const options = {
  promiseLib: Promise,
};

const pgp = pg(options);
const db = pgp(config.DATABASE_URL);

exports.default = db;