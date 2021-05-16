exports.renderChoiceForm = async (req, res) => {
  res.render('choices/form', { value: '', type: 'incorrect' });
};

// eslint-disable-next-line no-unused-vars
exports.renderChoiceFormWithErrors = (errors, req, res, next) => {
  // get the data the user submitted
  const { value, type } = req.body;

  // send the value, type, questionId, and errors as variables to the view
  res.render('choices/form', { value, type, errors });
};

exports.saveChoice = async (req, res) => {
  // get the data the user submitted
  const { value, type } = req.body;
  // get the questionId
  const { questionId } = req.query;
  // pull the id from the request params
  const { id } = req.params;

  // if there is an id, we are editing, if there isn't we are adding
  if (id) {
    // make a put request with the updated information
    await req.API.put(`/choices/${id}`, { value, type, questionId });
  } else {
    // send the new question to the API
    await req.API.post('/choices', { value, type, questionId });
  }

  // redirect to the question detail page
  res.redirect(`/admin/questions/${questionId}`);
};

exports.renderEditForm = async (req, res) => {
  // get the id from the request params
  const { id } = req.params;

  // get the details of the choice
  const choice = await req.API.get(`/choices/${id}`);

  // render the edit form
  res.render('choices/form', choice);
};

//  eslint-disable-next-line no-unused-vars
exports.goBackOnError = (errors, req, res, next) => {
  // passing 'back' to redirect sends the user back to the page they came from
  res.redirect('back');
};

exports.deleteChoice = async (req, res) => {
  const { id } = req.params;

  // send the delete request to the API
  await req.API.delete(`/choices/${id}`);

  // redirect to the dashboard
  res.redirect('/admin/quizzes/list');
};
