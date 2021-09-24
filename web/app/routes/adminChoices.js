// import the express router
const router = require('express').Router();

// load the controller
const choicesController = require('../controllers/choices');
const validationCtrl = require('../controllers/validation');

// GET /admin/choices/new?questionId= - loads the form to create a new choice
router.get('/new', choicesController.renderChoiceForm);
// POST /admin/choices/new?questionId= - validate the data and then save it
router.post('/new', [
  validationCtrl.validate('createChoice'),
  choicesController.renderChoiceFormWithErrors,
  choicesController.saveChoice,
]);
// GET /admin/choices/edit/:id - loads the edit form
router.get('/edit/:id', choicesController.renderEditForm);
// POST /admin/choices/edit/:id - validate the data and then save it
router.post('/edit/:id', [
  validationCtrl.validate('editChoice'),
  choicesController.renderChoiceFormWithErrors,
  choicesController.saveChoice,
]);
// GET /admin/choices/delete/:id - deletes a choice
router.get('/delete/:id', [
  validationCtrl.validate('deleteChoice'),
  choicesController.goBackOnError,
  choicesController.deleteChoice,
]);

// export the route from this file
module.exports = router;
