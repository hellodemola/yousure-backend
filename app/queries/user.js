const pool = require('../db/queries')

const getUsers = (callback) => {
    pool.query('SELECT id, email, phone FROM users ORDER BY id ASC', callback)
  }

const getUsersById = (email, callback) => {
    pool.query(`SELECT name, phone, role, id FROM users WHERE email=$1`,[email], callback)
  }

const addUser = (name, password, email, phone, role, callback) => {
  pool.query(`INSERT INTO users(name, password, email, phone, role) VALUES($1, $2, $3, $4, $5)`, [name, password, email, phone, role], callback)
}

module.exports = {
  getUsers,
  getUsersById,
  addUser
}

