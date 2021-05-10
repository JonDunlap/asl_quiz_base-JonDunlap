// import the express router
const router = require('express').Router();

// import the controller
const choicesController = require('../controllers/choices');

// GET /choices?questionId
router.get('/', choicesController.getChoicesByQuestionId);
// GET /choices/:id
router.get('/:id', choicesController.getChoice);
// POST /choices
router.post('/', choicesController.createChoice);
// PUT /choices/:id
router.put('/:id', choicesController.updateChoice);
// DELETE /choices/:id
router.delete('/:id', choicesController.deleteChoice);

// export the router from this file
module.exports = router;
