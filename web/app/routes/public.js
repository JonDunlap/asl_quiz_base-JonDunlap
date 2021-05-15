// import the express router
const router = require('express').Router();

// load the controller
const quizzesController = require('../controllers/quizzes');

// GET / - loads the home page
router.get('/', quizzesController.renderLanding);

// export the router
module.exports = router;
