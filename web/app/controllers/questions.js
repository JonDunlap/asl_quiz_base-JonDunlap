exports.renderQuestionForm = async (req, res) => {
  res.render('questions/form', { title: '' });
};

// eslint-disable-next-line no-unused-vars
exports.renderQuestionFormWithErrors = (errors, req, res, next) => {
  // get the data the user submitted
  const { title } = req.body;

  // send the title, quizId, and errors as variables to the view
  res.render('questions/form', { title, errors });
};

exports.saveQuestion = async (req, res) => {
  // get the data the user submitted
  const { title } = req.body;
  // get the quizId
  const { quizId } = req.query;
  // pull the id from the request params
  const { id } = req.params;

  // variable to hold the data from our api request
  let data = {};

  // if there is an id, we are editing, if there isn't we are adding
  if (id) {
    // make a put request with the updated information
    data = await req.API.put(`/questions/${id}`, { title, quizId });
  } else {
    // send the new question to the API
    data = await req.API.post('/questions', { title, quizId });
  }

  // redirect to the edit question detail page
  // either use the id from the request params or the returned id from the API
  res.redirect(id ? `/admin/questions/${data.id}` : `/admin/questions/${data}`);
};

exports.renderEditForm = async (req, res) => {
  // get the id from the request params
  const { id } = req.params;

  // get the details of the question
  const question = await req.API.get(`/questions/${id}`);

  // render the edit form
  res.render('questions/form', question);
};

//  eslint-disable-next-line no-unused-vars
exports.goBackOnError = (errors, req, res, next) => {
  // passing 'back' to redirect sends the user back to the page they came from
  res.redirect('back');
};

exports.deleteQuestion = async (req, res) => {
  const { id } = req.params;

  // send the delete request to the API
  await req.API.delete(`/questions/${id}`);

  // redirect to the dashboard
  res.redirect('/admin/quizzes/list');
};

exports.renderAdminDetail = async (req, res) => {
  const { id } = req.params;

  // get the detail of this question
  const question = await req.API.get(`/questions/${id}`);
  // get the choices for this question
  const choices = await req.API.get(`/choices?questionId=${id}`);

  //! DEBUG - used to show buttons for logged in user
  const loggedIn = true;

  res.render('questions/detail', { question, choices, loggedIn });
};
