exports.renderLanding = async (req, res) => {
  // get public quizzes
  const quizzes = await req.API.get('/quizzes/public');
  // render the landing page from the views and pass it the quizzes
  res.render('landing', { quizzes });
};

exports.renderQuestionsList = async (req, res) => {
  const { id } = req.params;

  // get the detail of this quiz
  const quiz = await req.API.get(`/quizzes/${id}`);
  // get the questions for this quiz
  const questions = await req.API.get(`/questions?quizId=${id}`);

  res.render('quizzes/list', { quiz, questions });
};

exports.renderQuizForm = async (req, res) => {
  res.render('quizzes/form', { name: '', type: 'private' });
};

// four params are required to mark this as an error handling middleware
// eslint-disable-next-line no-unused-vars
exports.renderQuizFormWithErrors = (errors, req, res, next) => {
  // get the data the user submitted
  const { name, type } = req.body;

  // send the title, type, and errors as variables to the view
  res.render('quizzes/form', { name, type, errors });
};

exports.saveQuiz = async (req, res) => {
  // get the data the user submitted
  const { name, type } = req.body;
  // pull the id from the request params
  const { id } = req.params;

  // variable to hold the data from our api request
  let data = {};

  // if there is an id, we are editing, if there isn't we are adding
  if (id) {
    // make a put request with the updated information
    data = await req.API.put(`/quizzes/${id}`, { name, type });
  } else {
    // send the new quiz to the API
    data = await req.API.post('/quizzes', { name, type });
  }

  // redirect to the edit quiz detail page
  // either use the id from the request params or the returned id from the API
  res.redirect(id ? `/admin/quizzes/${data.id}` : `/admin/quizzes/${data}`);
};

exports.renderEditForm = async (req, res) => {
  // get the id from the request params
  const { id } = req.params;

  // get the details of the quiz
  const quiz = await req.API.get(`/quizzes/${id}`);

  // render the edit form
  res.render('quizzes/form', quiz);
};

// four params are required to mark this as an error handling middleware
//  eslint-disable-next-line no-unused-vars
exports.goBackOnError = (errors, req, res, next) => {
  // passing 'back' to redirect sends the user back to the page they came from
  res.redirect('back');
};

exports.deleteQuiz = async (req, res) => {
  const { id } = req.params;

  // send the delete request to the API
  await req.API.delete(`/quizzes/${id}`);

  // redirect to the dashboard
  res.redirect('/admin/quizzes/list');
};

exports.renderDashboard = async (req, res) => {
  // TODO - add userId of logged in user
  const quizzes = await req.API.get('/quizzes');

  //! DEBUG - used to show buttons for logged in user
  const loggedIn = true;

  res.render('quizzes/admin-landing', { quizzes, loggedIn });
};

exports.renderAdminDetail = async (req, res) => {
  const { id } = req.params;

  // get the detail of this quiz
  const quiz = await req.API.get(`/quizzes/${id}`);
  // get the questions for this quiz
  const questions = await req.API.get(`/questions?quizId=${id}`);

  //! DEBUG - used to show buttons for logged in user
  const loggedIn = true;

  res.render('quizzes/detail', { quiz, questions, loggedIn });
};
