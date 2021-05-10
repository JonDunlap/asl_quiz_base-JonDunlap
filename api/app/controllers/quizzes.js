// load in the model class from ../models/index.js
const { Quizzes } = require('../models');

// get all the quizzes
exports.getAllQuizzes = (req, res) => {
  // run the get all function from the model
  const quizzes = Quizzes.getAll();

  // respond with json of the quizzes
  res.json(quizzes);
};

// get all the quizzes with a type of public for a particular user
exports.getPublicQuizzes = (req, res) => {
  // get the user id from the request body
  // const { userId } = req.body;

  // run the get all function from the model
  const quizzes = Quizzes.getAll();

  // filter the quizzes to only include the ones with a type of 'public'
  // and that are from the user
  /*   
	const publicQuizzes = quizzes.filter(
    (quiz) => quiz.type === 'public' && quiz.userId === userId
  ); 
	*/
  const publicQuizzes = quizzes.filter((quiz) => quiz.type === 'public');

  // respond with json of the public quizzes
  res.json(publicQuizzes);
};

// get a quiz by id
exports.getQuiz = (req, res) => {
  // get the id from the route parameters
  const { id } = req.params;

  // search our model for the quiz
  const quiz = Quizzes.getOneById(id);

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
exports.createQuiz = (req, res) => {
  // get the name, type, and userId from the request body
  // const { name, type, userId} = req.body;
  const { name, type } = req.body;

  // create the quiz and save the id returned from the model
  // const id = Quizzes.createNewItem({ name, type, userId });
  const id = Quizzes.createNewItem({ name, type });

  // send the new id back in json
  res.json(id);
};

// update an existing quiz
exports.updateQuiz = (req, res) => {
  // get the id from the request parameters
  const { id } = req.params;

  // update the quiz
  const updatedQuiz = Quizzes.updateItem(req.body, id);

  // send the updated quiz back in json
  res.json(updatedQuiz);
};

// delete a quiz
exports.deleteQuiz = (req, res) => {
  // get the id from the request parameters
  const { id } = req.params;

  // delete the quiz
  Quizzes.deleteItem(id);

  // send a good status code
  res.sendStatus(204);
};
