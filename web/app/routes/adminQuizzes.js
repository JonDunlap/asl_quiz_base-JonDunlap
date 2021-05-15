// import the express router
const router = require('express').Router();

// load the controller
const quizzesController = require('../controllers/quizzes');
const validationCtrl = require('../controllers/validation');

// GET /admin/quizzes/new - loads the form to create a new quiz
router.get('/new', quizzesController.renderQuizForm);
// POST /admin/quizzes/new - validate the data and then save it
router.post('/new', [
  validationCtrl.validate('createQuiz'),
  quizzesController.renderQuizFormWithErrors,
  quizzesController.saveQuiz,
]);
// GET /admin/quizzes/edit/:id - loads the edit form
router.get('/edit/:id', quizzesController.renderEditForm);
// POST /admin/quizzes/edit/:id - validate the data and then save it
router.post('/edit/:id', [
  validationCtrl.validate('editQuiz'),
  quizzesController.renderQuizFormWithErrors,
  quizzesController.saveQuiz,
]);
// // GET /admin/quizzes/delete/:id - deletes a quiz
// router.get('/delete/:id', [
//   validationCtrl.validate('deleteQuiz'),
//   quizzesController.goBackOnError,
//   quizzesController.deleteQuiz,
// ]);
// GET /admin/quizzes/list - loads all the user's quizzes
router.get('/list', quizzesController.renderDashboard);
// GET /admin/quizzes/:id - loads the details page
router.get('/:id', quizzesController.renderAdminDetail);

// export the route from this file
module.exports = router;
