const Pool = require('pg').Pool
const pool = new Pool({
  user: 'ademolaonasoga',
  host: 'localhost',
  database: 'yousure',
  password: '',
  port: 5432,
})


module.exports = pool