import React from 'react';
import API from '../API';

export default function container(Component) {
  return class QuizContainer extends React.Component {
    // the default state
    state = {
      quiz: {},
      questions: [],
    };

    // Get the quiz by id as well as its questions
    fetchQuiz = async (id) => {
      // get the details of the quiz
      const quiz = await API.get(`/quizzes/${id}`);
      // get the questions for this quiz
      const questions = await API.get(`/questions?quizId=${id}`);
      this.setState({ quiz, questions });
    };

    // Checks for a quiz id, updates current quiz if there is one,
    // otherwise creates a new quiz
    saveQuiz = async (quiz) => {
      if (quiz.id) {
        return API.put(`/quizzes/${quiz.id}`, quiz);
      }
      return API.post('/quizzes', quiz);
    };

    // Deletes quiz by id
    deleteQuiz = async (id) => {
      await API.delete(`/quizzes/${id}`);
    };

    // Deletes a question by id, updates the current state of the questions
    // to show the user an updated view of the state
    deleteQuestion = async (id) => {
      await API.delete(`/questions/${id}`);

      const { questions } = this.state;
      const newQuestions = questions.filter((question) => question.id !== id);

      this.setState({ questions: newQuestions });
    };

    render() {
      const { quiz, questions } = this.state;

      return (
        <Component
          /* pass all other props that are being passed to this component forward */
          {...this.props}
          quiz={quiz}
          questions={questions}
          fetchQuiz={this.fetchQuiz}
          saveQuiz={this.saveQuiz}
          deleteQuiz={this.deleteQuiz}
          deleteQuestion={this.deleteQuestion}
        />
      );
    }
  };
}
