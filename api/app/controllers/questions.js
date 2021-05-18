// load in the model class from ../models/index.js
const { Questions } = require('../models');

// get all the questions from a quiz
exports.getQuestionsByQuizId = async (req, res) => {
  // get the quiz id from the request query
  const { quizId } = req.query;

  // run the get all function from the model
  // filter the questions to only the ones from this quiz
  const quizQuestions = await Questions.findAll({ where: { quizId } });

  // respond with json of the questions from this quiz
  res.json(quizQuestions);
};

// get a question by id
exports.getQuestion = async (req, res) => {
  // get the id from the route parameters
  const { id } = req.params;

  // search our model for the question
  const question = await Questions.findByPk(id);

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
exports.createQuestion = async (req, res) => {
  // get the title, and quizId from the request body
  const { title, quizId } = req.body;

  try {
    // create the question
    const newQuiz = await Questions.create({ title, quizId });

    // send the new id back in json
    res.json(newQuiz);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// update an existing question
exports.updateQuestion = async (req, res) => {
  // get the id from the request parameters
  const { id } = req.params;

  try {
    // update the question
    const [, [updatedQuestion]] = await Questions.update(req.body, {
      // only update the row using the id in the url
      where: { id },
      // return the updated row
      returning: true,
    });

    // send the updated question back in json
    res.json(updatedQuestion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// delete a question
exports.deleteQuestion = async (req, res) => {
  // get the id from the request parameters
  const { id } = req.params;

  // delete the question
  await Questions.destroy({ where: { id } });

  // send a good status code
  res.sendStatus(204);
};
