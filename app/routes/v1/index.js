const  express  = require('express');
const UserRoute = require('./user.route');
const router = express.Router();

router.get('/', (req, res) => {
res.status(200).json({ message: 'Welcome' });
});

router.use('/user', UserRoute);

module.exports = router;