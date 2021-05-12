// load in the model class from ../models/index.js
const { Choices } = require('../models');

// get all the choices for a question
exports.getChoicesByQuestionId = (req, res) => {
  // get the question id from the request query
  const { questionId } = req.query;

  // run the get all function from the model
  const choices = Choices.getAll();

  // filter the choices to only the ones from the question
  const questionChoices = choices.filter(
    (choice) => choice.questionId === questionId
  );

  // respond with json of the choices from this question
  res.json(questionChoices);
};

// get a choice by id
exports.getChoice = (req, res) => {
  // get the id from the route parameters
  const { id } = req.params;

  // search our model for the choice
  const choice = Choices.getOneById(id);

  // if no choice is found
  if (!choice) {
    // return a 404 (not found) error
    res.sendStatus(404);

    return;
  }

  // if the choice is found send it back in json
  res.json(choice);
};

// create a new choice
exports.createChoice = (req, res) => {
  // get the value, type, and questionId from the request body
  const { value, type, questionId } = req.body;

  // create the choice and save the id returned from the model
  const id = Choices.createNewItem({ value, type, questionId });

  // send the new id back in json
  res.json(id);
};

// update an existing choice
exports.updateChoice = (req, res) => {
  // get the id from the request parameters
  const { id } = req.params;

  // update the choice
  const updatedChoice = Choices.updateItem(req.body, id);

  // send the updated choice back in json
  res.json(updatedChoice);
};

// delete a choice
exports.deleteChoice = (req, res) => {
  // get the id from the request parameters
  const { id } = req.params;

  // delete the choice
  Choices.deleteItem(id);

  // send a good status code
  res.sendStatus(204);
};
