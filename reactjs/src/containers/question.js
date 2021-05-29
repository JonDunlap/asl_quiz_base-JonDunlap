import React from 'react';
import API from '../API';

export default function container(Component) {
  return class QuestionContainer extends React.Component {
    // the default state
    state = {
      question: {},
      choices: [],
    };

    fetchQuestion = async (id) => {
      // get the details of the question
      const question = await API.get(`/questions/${id}`);
      // get the choices for this question
      const choices = await API.get(`/choices?questionId=${id}`);
      this.setState({ question, choices });
    };

    saveQuestion = async (question) => {
      if (question.id) {
        return API.put(`/questions/${question.id}`, question);
      }
      return API.post('/questions', question);
    };

    deleteQuestion = async (id) => {
      await API.delete(`/questions/${id}`);
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
        />
      );
    }
  };
}
