import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RRPropTypes from 'react-router-prop-types';
import styles from '../styles.module.css';
import ChoiceContainer from '../../containers/choice';

class ChoiceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: undefined,
      type: undefined,
    };
  }

  componentDidMount() {
    // get the id from the route params
    const {
      fetchChoice,
      match: {
        params: { id },
      },
    } = this.props;
    if (id) fetchChoice(id);
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
      choice: { id },
      saveChoice,
      history,
      location,
    } = this.props;
    const { value, type = 'incorrect' } = this.state;

    // get the query params from the url
    const queryParams = new URLSearchParams(location.search);
    // get the quiz id from the query params
    const questionId = queryParams.get('questionId');

    await saveChoice({ id, value, type, questionId });
    history.push(`/admin/questions/${questionId}`);
  };

  render() {
    const {
      choice: { id, value: defaultValue = '', type: defaultType = 'incorrect' },
    } = this.props;
    const { value = defaultValue, type = defaultType } = this.state;

    return (
      <>
        <h1 className={styles.heading}>
          {id ? 'Edit Choice' : 'Create a New Choice'}
        </h1>
        <form method='POST' className={styles.form} onSubmit={this.save}>
          <label className={styles.form__label} htmlFor='value'>
            <span>Choice Value</span>
            <input
              type='text'
              name='value'
              value={value}
              className={styles.form__input}
              id='value'
              onChange={this.handleInputChange}
            />
          </label>
          <label className={styles.form__label} htmlFor='incorrect'>
            <span className={styles.form__labelInline}>Choice Type</span>
            <label className={styles.form__labelInline} htmlFor='incorrect'>
              <input
                type='radio'
                name='type'
                value='incorrect'
                checked={type === 'incorrect'}
                className={styles.form__input__radio}
                id='incorrect'
                onChange={this.handleInputChange}
              />
              <span>Incorrect</span>
            </label>
            <label className={styles.form__labelInline} htmlFor='correct'>
              <input
                type='radio'
                name='type'
                value='correct'
                checked={type === 'correct'}
                className={styles.form__input__radio}
                id='correct'
                onChange={this.handleInputChange}
              />
              <span>Correct</span>
            </label>
          </label>
          <button type='submit' className={styles.button}>
            {id ? 'Edit Choice' : 'Create Choice'}
          </button>
        </form>
      </>
    );
  }
}

ChoiceForm.propTypes = {
  choice: PropTypes.shape({
    id: PropTypes.string,
    value: PropTypes.string,
    type: PropTypes.string,
  }),
  saveChoice: PropTypes.func.isRequired,
  fetchChoice: PropTypes.func.isRequired,
  history: RRPropTypes.history.isRequired,
  location: RRPropTypes.location.isRequired,
  match: RRPropTypes.match.isRequired,
};

ChoiceForm.defaultProps = {
  choice: {},
};

export default ChoiceContainer(ChoiceForm);
