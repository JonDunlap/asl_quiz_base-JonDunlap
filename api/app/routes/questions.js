// import the express router
const router = require('express').Router();

// import the controller
const questionsController = require('../controllers/questions');

// GET /questions?quizId
router.get('/', questionsController.getQuestionsByQuizId);
// GET /questions/:id
router.get('/:id', questionsController.getQuestion);
// POST /questions
router.post('/', questionsController.createQuestion);
// PUT /questions/:id
router.put('/:id', questionsController.updateQuestion);
// DELETE /questions/:id
router.delete('/:id', questionsController.deleteQuestion);

// export the router from this file
module.exports = router;
