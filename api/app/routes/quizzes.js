// import the express router
const router = require('express').Router();

// import the controller
const quizzesController = require('../controllers/quizzes');

// GET /quizzes route
router.get('/', quizzesController.getAll);
// GET /quizzes/public route
router.get('/public', quizzesController.getPublic);
// GET /quizzes/:id
router.get('/:id', quizzesController.getQuiz);
// POST /quizzes
router.post('/', quizzesController.createQuiz);
// PUT /quizzes/:id
router.put('/:id', quizzesController.updateQuiz);
// DELETE /quizzes/:id
router.delete('/:id', quizzesController.deleteQuiz);

// export the router from this file
module.exports = router;
