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

  const loggedIn = true;
  res.render('quizzes/list', { quiz, questions, loggedIn });
};
