import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RRPropTypes from 'react-router-prop-types';
import styles from '../styles.module.css';
import QuestionContainer from '../../containers/question';

class QuestionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: undefined,
    };
  }

  componentDidMount() {
    // get the id from the route params
    const {
      fetchQuestion,
      match: {
        params: { id },
      },
    } = this.props;
    if (id) fetchQuestion(id);
  }

  handleInputChange = (event) => {
    // pull the name of the input and value of input out of the event object
    const {
      target: { name, value },
    } = event;
    // update the state to a key of the name of the input and value of the input
    // ex: type: 'private'
    this.setState({
      [name]: value,
    });
  };

  save = async (event) => {
    // don't actually submit the form through the browser
    event.preventDefault();
    const {
      question: { id },
      saveQuestion,
      history,
      location,
    } = this.props;
    const { title } = this.state;

    // get the query params from the url
    const queryParams = new URLSearchParams(location.search);
    // get the quiz id from the query params
    const quizId = queryParams.get('quizId');

    let data;

    // check for quizId on query params,
    // if there is no query params then we are editing a question
    // otherwise we are creating a new question
    if (!quizId) data = await saveQuestion({ id, title });
    else data = await saveQuestion({ title, quizId });

    history.push(`/admin/questions/${data.id}`);
  };

  render() {
    const {
      question: { id, title: defaultTitle = '' },
    } = this.props;
    const { title = defaultTitle } = this.state;

    return (
      <>
        <h1 className={styles.heading}>
          {id ? 'Edit Question' : 'Create a New Question'}
        </h1>
        <form method='POST' className={styles.form} onSubmit={this.save}>
          <label className={styles.form__label} htmlFor='title'>
            <span>Question Title</span>
            <input
              type='text'
              name='title'
              value={title}
              className={styles.form__input}
              id='title'
              onChange={this.handleInputChange}
            />
          </label>
          <button type='submit' className={styles.button}>
            {id ? 'Edit Question' : 'Create Question'}
          </button>
        </form>
      </>
    );
  }
}

QuestionForm.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
  }),
  saveQuestion: PropTypes.func.isRequired,
  fetchQuestion: PropTypes.func.isRequired,
  history: RRPropTypes.history.isRequired,
  location: RRPropTypes.location.isRequired,
  match: RRPropTypes.match.isRequired,
};

QuestionForm.defaultProps = {
  question: {},
};

export default QuestionContainer(QuestionForm);
