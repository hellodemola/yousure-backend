/* eslint-disable camelcase */
/* eslint-disable no-undef */
const express = require('express');
const config =  require('../config');
const routes = require('./routes/v1')
const db =  require('./db/index');
// import { runCron } from './utils/read.file.utils';

const app = express();
const host = config.HOST;
const port = config.PORT || 8080;
const database_url = config.DATABASE_URL
const api_version = config.API_VERSION;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/app/v1', routes)
app.listen(port);
console.log("Application started on port " + port + " " + database_url);



module.defaults = app;