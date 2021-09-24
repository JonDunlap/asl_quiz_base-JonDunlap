// import the express router
const router = require('express').Router();

// load the controller
const quizzesController = require('../controllers/quizzes');
const validationCtrl = require('../controllers/validation');
const authCtrl = require('../controllers/auth');

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
// GET /login - load the login page
router.get('/login', authCtrl.renderLogin);
// POST /login - handle user login form
router.post('/login', [
  validationCtrl.validate('loginUser'),
  authCtrl.renderLoginFormWithErrors,
  authCtrl.handleLogin,
]);
// GET /login/github - send the user to github for authorization
router.get('/login/github', authCtrl.redirectToGithub);
// GET /github/callback - the route that is hit when coming back from github
router.get('/github/callback', authCtrl.verifyGithubCode);
// GET /github/token - the route that is hit when coming back from github
router.get('/github/token', authCtrl.verifyGithubToken);
// GET /signup - load the signup page
router.get('/signup', authCtrl.renderSignup);
// POST /signup - handle signup form
router.post('/signup', [
  validationCtrl.validate('createUser'),
  authCtrl.renderSignupFormWithErrors,
  authCtrl.handleSignup,
]);
// GET /logout - log the user out of the application
router.get('/logout', authCtrl.logout);

// export the router
module.exports = router;
