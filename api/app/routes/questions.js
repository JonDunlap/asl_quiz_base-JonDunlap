// import the express router
const router = require('express').Router();

// import the controller
const questionsController = require('../controllers/questions');
// import the protectedRoute middleware
const protectedRoute = require('../utils/protectedRoute');

// GET /questions?quizId
router.get('/', questionsController.getQuestionsByQuizId);
// GET /questions/:id
router.get('/:id', questionsController.getQuestion);
// POST /questions
router.post('/', protectedRoute, questionsController.createQuestion);
// PUT /questions/:id
router.put('/:id', protectedRoute, questionsController.updateQuestion);
// DELETE /questions/:id
router.delete('/:id', protectedRoute, questionsController.deleteQuestion);

// export the router from this file
module.exports = router;
