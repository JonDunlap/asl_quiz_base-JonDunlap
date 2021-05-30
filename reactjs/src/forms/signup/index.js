import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import styles from '../styles.module.css';
import AuthContainer from '../../containers/auth';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: undefined,
      password: undefined,
    };
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

  signUp = async (event) => {
    // don't actually submit the form through the browser
    event.preventDefault();

    const { signUpUser } = this.props;

    const { username, password } = this.state;
    await signUpUser({ username, password });
  };

  render() {
    const {
      loggedIn,
      username: defaultUsername = '',
      password: defaultPassword = '',
    } = this.props;
    const { username = defaultUsername, password = defaultPassword } =
      this.state;
    if (loggedIn) return <Redirect to='/admin/quizzes' />;

    return (
      <>
        <h1>Signup</h1>
        <form method='POST' className={styles.form} onSubmit={this.signUp}>
          <label className={styles.form__label} htmlFor='username'>
            Username/Email
            <input
              type='text'
              name='username'
              value={username}
              className={styles.form__input}
              id='username'
              onChange={this.handleInputChange}
            />
          </label>
          <label className={styles.form__label} htmlFor='password'>
            Password
            <input
              type='password'
              name='password'
              value={password}
              className={styles.form__input}
              id='password'
              onChange={this.handleInputChange}
            />
          </label>
          <button
            type='submit'
            className={[styles.button, styles.active].join(' ')}
          >
            Signup
          </button>
        </form>
      </>
    );
  }
}

Login.propTypes = {
  loggedIn: PropTypes.bool,
  username: PropTypes.string,
  password: PropTypes.string,
  signUpUser: PropTypes.func.isRequired,
};

Login.defaultProps = {
  loggedIn: false,
  username: '',
  password: '',
};

export default AuthContainer(Login);
