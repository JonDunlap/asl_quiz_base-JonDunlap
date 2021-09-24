// import the express router
const router = require('express').Router();

// load the controller
const questionsController = require('../controllers/questions');
const validationCtrl = require('../controllers/validation');

// GET /admin/questions/new?quizId= - loads the form to create a new question
router.get('/new', questionsController.renderQuestionForm);
// POST /admin/questions/new?quizId= - validate the data and then save it
router.post('/new', [
  validationCtrl.validate('createQuestion'),
  questionsController.renderQuestionFormWithErrors,
  questionsController.saveQuestion,
]);
// GET /admin/questions/edit/:id - loads the edit form
router.get('/edit/:id', questionsController.renderEditForm);
// POST /admin/questions/edit/:id - validate the data and then save it
router.post('/edit/:id', [
  validationCtrl.validate('editQuestion'),
  questionsController.renderQuestionFormWithErrors,
  questionsController.saveQuestion,
]);
// GET /admin/questions/delete/:id - deletes a question
router.get('/delete/:id', [
  validationCtrl.validate('deleteQuestion'),
  questionsController.goBackOnError,
  questionsController.deleteQuestion,
]);
// GET /admin/questions/:id - loads the details page
router.get('/:id', questionsController.renderAdminDetail);

// export the route from this file
module.exports = router;
