// load in the model class from ../models/index.js
const { Quizzes } = require('../models');

// get all the quizzes for a given user
exports.getAllQuizzes = async (req, res) => {
  // run the get all function from the model
  // filter the quizzes to only the ones from this user
  const quizzes = await Quizzes.findAll({ where: { userId: req.userId } });

  // respond with json of the quizzes for this user
  res.json(quizzes);
};

// get all the quizzes with a type of public for a particular user
exports.getPublicQuizzes = async (req, res) => {
  // get the user id from the request body
  // const { userId } = req.body;

  // run the get all function from the model
  // filter the quizzes to only include the ones with a type of 'public'
  const publicQuizzes = await Quizzes.findAll({ where: { type: 'public' } });

  // respond with json of the public quizzes
  res.json(publicQuizzes);
};

// get a quiz by id
exports.getQuiz = async (req, res) => {
  // get the id from the route parameters
  const { id } = req.params;

  // search our model for the quiz
  const quiz = await Quizzes.findByPk(id);

  // if no quiz is found
  if (!quiz) {
    // return a 404 (not found) error
    res.sendStatus(404);

    return;
  }

  // if the quiz is found send it back in json
  res.json(quiz);
};

// create a new quiz
exports.createQuiz = async (req, res) => {
  // get the name, type from the request body
  const { name, type } = req.body;

  try {
    // create the quiz
    const newQuiz = await Quizzes.create({ name, type, userId: req.userId });

    // send the new quiz back in json
    res.json(newQuiz);
  } catch (e) {
    const errors = e.errors.map((err) => err.message);
    res.status(400).json({ errors });
  }
};

// update an existing quiz
exports.updateQuiz = async (req, res) => {
  // get the id from the request parameters
  const { id } = req.params;

  try {
    // update the quiz
    const [, [updatedQuiz]] = await Quizzes.update(req.body, {
      where: { id },
      returning: true,
    });
    // send the updated quiz back in json
    res.json(updatedQuiz);
  } catch (e) {
    const errors = e.errors.map((err) => err.message);
    res.status(400).json({ errors });
  }
};

// delete a quiz
exports.deleteQuiz = async (req, res) => {
  // get the id from the request parameters
  const { id } = req.params;

  // delete the quiz
  await Quizzes.destroy({ where: { id } });

  // send a good status code
  res.sendStatus(204);
};
