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
  // get the choices for each question
  const getChoices = async () => {
    const choicesArray = questions.map(async (question) => {
      const response = await req.API.get(`/choices?questionId=${question.id}`);
      return response;
    });
    return Promise.all(choicesArray);
  };

  const choicesArray = await getChoices();

  res.render('quizzes/list', { quiz, questions, choicesArray });
};

// eslint-disable-next-line no-unused-vars
exports.renderQuestionsListWithErrors = (errors, req, res, next) => {
  // passing 'back' to redirect sends the user back to the page they came from
  res.redirect('back');
};

exports.renderQuestionsListWithSuccess = async (req, res) => {
  // get the quiz id from the request
  const { id } = req.params;
  // get the choiceId the user submitted
  const { choiceId } = req.body;

  // get the detail of this quiz
  const quiz = await req.API.get(`/quizzes/${id}`);
  // get the choice the user submitted
  const choice = await req.API.get(`/choices/${choiceId}`);

  let message = {};

  if (choice.type === 'correct') message = { success: 'Correct' };
  message = { errors: 'Incorrect' };

  //
  res.render('quizzes/list', { quiz, choiceId, message });
};

exports.renderQuizForm = async (req, res) => {
  res.render('quizzes/form', { name: '', type: 'private' });
};

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

  // redirect to the quiz detail page
  res.redirect(`/admin/quizzes/${data.id}`);
};

exports.renderEditForm = async (req, res) => {
  // get the id from the request params
  const { id } = req.params;

  // get the details of the quiz
  const quiz = await req.API.get(`/quizzes/${id}`);

  // render the edit form
  res.render('quizzes/form', quiz);
};

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
  const quizzes = await req.API.get('/quizzes');

  res.render('quizzes/admin-landing', { quizzes });
};

exports.renderAdminDetail = async (req, res) => {
  const { id } = req.params;

  // get the detail of this quiz
  const quiz = await req.API.get(`/quizzes/${id}`);
  // get the questions for this quiz
  const questions = await req.API.get(`/questions?quizId=${id}`);

  res.render('quizzes/detail', { quiz, questions });
};
