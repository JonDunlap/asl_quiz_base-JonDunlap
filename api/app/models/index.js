const { v1: uuid } = require('uuid');
const choices = require('./choices');
const questions = require('./questions');
const quizzes = require('./quizzes');

class Model {
  constructor(data) {
    this.values = data;
  }

  // METHODS

  // Get all of the items
  getAll() {
    return this.values;
  }

  // Get a single item by id
  getOneById(id) {
    return this.values.find((item) => item.id === id);
  }

  // create a new item
  createNewItem(item) {
    // create a uuid
    const id = uuid();
    // add the item to the array along with the uuid
    this.values.push({ id, ...item });

    // return the new id
    return id;
  }

  // update an item using the id and the new values
  updateItem(valuesToChange, id) {
    // get the index of the item that we want to update
    const index = this.values.findIndex((item) => item.id === id);
    // take the current values and update them with the new values
    const updatedValues = { ...this.values[index], ...valuesToChange };

    // piece together the array with all the previous items, the new one, and the items after
    this.values = [
      ...this.values.slice(0, index),
      updatedValues,
      ...this.values.slice(index + 1),
    ];

    // return the updated values
    return updatedValues;
  }

  // delete an item by id
  deleteItem(id) {
    // filter the values to remove the deleted item
    this.values = this.values.filter((item) => {
      if (item.id === id) return false;
      return true;
    });
  }
}

// Export the Model for each route
module.exports = {
  Choices: new Model(choices),
  Questions: new Model(questions),
  Quizzes: new Model(quizzes),
};
