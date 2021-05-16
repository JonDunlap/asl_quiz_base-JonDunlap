// import the express router
const router = require('express').Router();

// load the controller
const quizzesController = require('../controllers/quizzes');
const validationCtrl = require('../controllers/validation');

// GET / - loads the home page
router.get('/', quizzesController.renderLanding);
// GET /quiz/:id - loads the questions and choices for the given quiz
router.get('/quiz/:id', quizzesController.renderQuestionsList);
// POST /quiz/:id - shows the results of the quiz
router.post('/quiz/:id', [
  validationCtrl.validate('submitChoice'),
  quizzesController.renderQuestionsListWithErrors,
  quizzesController.renderQuestionsListWithSuccess,
]);

// export the router
module.exports = router;
