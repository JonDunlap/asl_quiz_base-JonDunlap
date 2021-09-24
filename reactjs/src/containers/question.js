import React from 'react';
import API from '../API';

export default function container(Component) {
  return class QuestionContainer extends React.Component {
    // the default state
    state = {
      question: {},
      choices: [],
    };

    // Get the question by id as well as its choices
    fetchQuestion = async (id) => {
      // get the details of the question
      const question = await API.get(`/questions/${id}`);
      // get the choices for this question
      const choices = await API.get(`/choices?questionId=${id}`);
      this.setState({ question, choices });
    };

    // Checks for a question id, updates current question if there is one,
    // otherwise creates a new question
    saveQuestion = async (question) => {
      if (question.id) {
        return API.put(`/questions/${question.id}`, question);
      }
      return API.post('/questions', question);
    };

    // Deletes question by id
    deleteQuestion = async (id) => {
      await API.delete(`/questions/${id}`);
    };

    // Deletes a choice by id, updates the current state of the choices
    // to show the user an updated view of the state
    deleteChoice = async (id) => {
      await API.delete(`/choices/${id}`);

      const { choices } = this.state;
      const newChoices = choices.filter((choice) => choice.id !== id);

      this.setState({ choices: newChoices });
    };

    render() {
      const { question, choices } = this.state;

      return (
        <Component
          /* pass all other props that are being passed to this component forward */
          {...this.props}
          question={question}
          choices={choices}
          fetchQuestion={this.fetchQuestion}
          saveQuestion={this.saveQuestion}
          deleteQuestion={this.deleteQuestion}
          deleteChoice={this.deleteChoice}
        />
      );
    }
  };
}
