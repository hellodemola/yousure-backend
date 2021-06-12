const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_BASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_POST,
  ssl: { require: false, rejectUnauthorized: false }
})


module.exports = pool