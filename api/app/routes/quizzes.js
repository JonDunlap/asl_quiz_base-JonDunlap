// import the express router
const router = require('express').Router();

// import the controller
const quizzesController = require('../controllers/quizzes');
// import the protectedRoute middleware
const protectedRoute = require('../utils/protectedRoute');

// GET /quizzes route
router.get('/', protectedRoute, quizzesController.getAllQuizzes);
// GET /quizzes/public route
router.get('/public', quizzesController.getPublicQuizzes);
// GET /quizzes/:id
router.get('/:id', quizzesController.getQuiz);
// POST /quizzes
router.post('/', protectedRoute, quizzesController.createQuiz);
// PUT /quizzes/:id
router.put('/:id', protectedRoute, quizzesController.updateQuiz);
// DELETE /quizzes/:id
router.delete('/:id', protectedRoute, quizzesController.deleteQuiz);

// export the router from this file
module.exports = router;
