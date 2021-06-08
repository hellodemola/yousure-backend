const express = require('express');
const { getAllUsers, getUserByEmail, addNewUser } = require( '../../controllers/user.controller');


const router = express.Router();

router.get('/', getAllUsers);
router.get('/find', getUserByEmail);
router.post('/register', addNewUser);



module.exports = router;