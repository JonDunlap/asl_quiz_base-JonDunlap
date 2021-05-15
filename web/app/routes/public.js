// import the express router
const router = require('express').Router();

// load the controller
const quizzesController = require('../controllers/quizzes');

// GET / - loads the home page
router.get('/', quizzesController.renderLanding);
// GET /quiz/:id - loads the questions and choices for the given quiz
router.get('/quiz/:id', quizzesController.renderDashboard);

// export the router
module.exports = router;
