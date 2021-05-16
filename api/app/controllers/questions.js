// load in the model class from ../models/index.js
const { Questions } = require('../models');

// get all the questions from a quiz
exports.getQuestionsByQuizId = (req, res) => {
  // get the quiz id from the request query
  const { quizId } = req.query;

  // run the get all function from the model
  const questions = Questions.getAll();

  // filter the questions to only the ones from this quiz
  const quizQuestions = questions.filter(
    (question) => question.quizId === quizId
  );

  // respond with json of the questions from this quiz
  res.json(quizQuestions);
};

// get a question by id
exports.getQuestion = (req, res) => {
  // get the id from the route parameters
  const { id } = req.params;

  // search our model for the question
  const question = Questions.getOneById(id);

  // if no question is found
  if (!question) {
    // return a 404 (not found) error
    res.sendStatus(404);

    return;
  }

  // if the question is found send it back in json
  res.json(question);
};

// create a new question
exports.createQuestion = (req, res) => {
  // get the title, and quizId from the request body
  const { title, quizId } = req.body;

  // create the question and save the id returned from the model
  const id = Questions.createNewItem({ title, quizId });

  // send the new id back in json
  res.json({ id, title, quizId });
};

// update an existing question
exports.updateQuestion = (req, res) => {
  // get the id from the request parameters
  const { id } = req.params;

  // update the question
  const updatedQuestion = Questions.updateItem(req.body, id);

  // send the updated question back in json
  res.json(updatedQuestion);
};

// delete a question
exports.deleteQuestion = (req, res) => {
  // get the id from the request parameters
  const { id } = req.params;

  // delete the question
  Questions.deleteItem(id);

  // send a good status code
  res.sendStatus(204);
};
