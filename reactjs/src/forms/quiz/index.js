import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RRPropTypes from 'react-router-prop-types';
import styles from '../styles.module.css';
import QuizContainer from '../../containers/quiz';

class QuizForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: undefined,
      type: undefined,
    };
  }

  componentDidMount() {
    // get the id from the route params
    const {
      fetchQuiz,
      match: {
        params: { id },
      },
    } = this.props;
    if (id) fetchQuiz(id);
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

  // Create/edit quiz from the form
  save = async (event) => {
    // don't actually submit the form through the browser
    event.preventDefault();
    const {
      quiz: { id },
      saveQuiz,
      history,
    } = this.props;
    const { name, type = 'public' } = this.state;
    // save the quiz and return the json data from the server
    const data = await saveQuiz({ id, name, type });
    // use the data to go to the quiz page for this new quiz
    history.push(`/admin/quizzes/${data.id}`);
  };

  render() {
    const {
      quiz: { id, name: defaultName = '', type: defaultType = 'public' },
    } = this.props;
    const { name = defaultName, type = defaultType } = this.state;

    return (
      <>
        <h1 className={styles.heading}>
          {id ? 'Edit Quiz' : 'Create a New Quiz'}
        </h1>
        <form method='POST' className={styles.form} onSubmit={this.save}>
          <label className={styles.form__label} htmlFor='name'>
            <span>Quiz Name</span>
            <input
              type='text'
              name='name'
              value={name}
              className={styles.form__input}
              id='name'
              onChange={this.handleInputChange}
            />
          </label>
          <label className={styles.form__label} htmlFor='public'>
            <span className={styles.form__labelInline}>Quiz Type</span>
            <label className={styles.form__labelInline} htmlFor='public'>
              <input
                type='radio'
                name='type'
                value='public'
                checked={type === 'public'}
                className={styles.form__input__radio}
                id='public'
                onChange={this.handleInputChange}
              />
              <span>Public</span>
            </label>
            <label className={styles.form__labelInline} htmlFor='private'>
              <input
                type='radio'
                name='type'
                value='private'
                checked={type === 'private'}
                className={styles.form__input__radio}
                id='private'
                onChange={this.handleInputChange}
              />
              <span>Private</span>
            </label>
          </label>
          <button type='submit' className={styles.button}>
            {id ? 'Edit Quiz' : 'Create Quiz'}
          </button>
        </form>
      </>
    );
  }
}

QuizForm.propTypes = {
  quiz: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
  }),
  saveQuiz: PropTypes.func.isRequired,
  fetchQuiz: PropTypes.func.isRequired,
  history: RRPropTypes.history.isRequired,
  match: RRPropTypes.match.isRequired,
};

QuizForm.defaultProps = {
  quiz: {},
};

export default QuizContainer(QuizForm);
