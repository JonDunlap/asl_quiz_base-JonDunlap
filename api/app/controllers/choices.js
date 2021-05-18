// load in the model class from ../models/index.js
const { Choices } = require('../models');

// get all the choices for a question
exports.getChoicesByQuestionId = async (req, res) => {
  // get the question id from the request query
  const { questionId } = req.query;

  // run the get all function from the model
  // filter the choices to only the ones from the question
  const questionChoices = await Choices.findAll({ where: { questionId } });

  // respond with json of the choices from this question
  res.json(questionChoices);
};

// get a choice by id
exports.getChoice = async (req, res) => {
  // get the id from the route parameters
  const { id } = req.params;

  // search our model for the choice
  const choice = await Choices.findByPk(id);

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
exports.createChoice = async (req, res) => {
  // get the value, type, and questionId from the request body
  const { value, type, questionId } = req.body;

  try {
    // create the choice
    const newChoice = await Choices.create({ value, type, questionId });

    // send the new choice back in json
    res.json(newChoice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// update an existing choice
exports.updateChoice = async (req, res) => {
  // get the id from the request parameters
  const { id } = req.params;

  try {
    // update the choice
    const [, [updatedChoice]] = await Choices.update(req.body, {
      // only update the row using the id in the url
      where: { id },
      // return the updated row
      returning: true,
    });

    // send the updated choice back in json
    res.json(updatedChoice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// delete a choice
exports.deleteChoice = async (req, res) => {
  // get the id from the request parameters
  const { id } = req.params;

  // delete the choice
  await Choices.destroy({ where: { id } });

  // send a good status code
  res.sendStatus(204);
};
