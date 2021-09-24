// import the express router
const router = require('express').Router();

// import the controller
const choicesController = require('../controllers/choices');
// import the protectedRoute middleware
const protectedRoute = require('../utils/protectedRoute');

// GET /choices?questionId
router.get('/', choicesController.getChoicesByQuestionId);
// GET /choices/:id
router.get('/:id', choicesController.getChoice);
// POST /choices
router.post('/', protectedRoute, choicesController.createChoice);
// PUT /choices/:id
router.put('/:id', protectedRoute, choicesController.updateChoice);
// DELETE /choices/:id
router.delete('/:id', protectedRoute, choicesController.deleteChoice);

// export the router from this file
module.exports = router;
