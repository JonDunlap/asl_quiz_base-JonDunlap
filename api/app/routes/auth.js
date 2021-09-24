// import the express router
const router = require('express').Router();

// import the auth controller
const authCtrl = require('../controllers/auth');

// POST /auth/exchange - receives a code and will exchange it for an access token
router.post('/exchange', authCtrl.exchangeCode);
// POST /auth/token - exchange the access token for user information
router.post('/token', authCtrl.exchangeAccessToken);
// GET /auth/login - login the user
router.post('/login', authCtrl.findUser);
// POST /auth/signup - create a new user
router.post('/signup', authCtrl.createUser);

// export the route from this file
module.exports = router;
