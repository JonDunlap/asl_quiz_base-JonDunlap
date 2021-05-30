import React from 'react';
import PropTypes from 'prop-types';
import RRPropTypes from 'react-router-prop-types';
import { Redirect, Link as RRLink } from 'react-router-dom';
import styles from './styles.module.css';
import AuthContainer from '../containers/auth';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: undefined,
      password: undefined,
    };
  }

  componentDidMount() {
    const { location, verifyGithubCode, verifyGithubToken } = this.props;
    // get the query params from the url query string
    const queryParams = new URLSearchParams(location.search);
    // get the code if there is one from gitHub
    const code = queryParams.get('code');
    // get the access token if there is one from gitHub
    const accessToken = queryParams.get('access_token');
    // if there is a code verify it
    if (code) verifyGithubCode(code);
    // if there is an access token verify it
    if (accessToken) verifyGithubToken(accessToken);
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

  login = async (event) => {
    // don't actually submit the form through the browser
    event.preventDefault();

    const { loginUser } = this.props;

    const { username, password } = this.state;
    await loginUser({ username, password });
  };

  redirectToGithub = () => {
    let GITHUB_URL = 'https://github.com/login/oauth/authorize?';
    GITHUB_URL += `client_id=${process.env.REACT_APP_CLIENT_ID}`;
    GITHUB_URL += '&scope=identity.basic,identity.email';
    // GITHUB_URL += '&scope=user:email';
    GITHUB_URL += `&redirect_uri=${process.env.REACT_APP_CALLBACK_URL}`;
    window.location = GITHUB_URL;
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
        <h1 className={styles.heading}>Login</h1>
        <form method='POST' className={styles.form} onSubmit={this.login}>
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
            className={`${styles.button} ${styles.primary}`}
          >
            Login
          </button>
        </form>
        <div className={styles.form}>
          <button
            type='button'
            onClick={this.redirectToGithub}
            className={`${styles.button} ${styles.primary}`}
          >
            <i className='fab fa-github'>
              <span>Sign in with GitHub</span>
            </i>
          </button>
          {/* send to signup form */}
          <RRLink to='/signup' className={`${styles.button} ${styles.primary}`}>
            Sign up
          </RRLink>
        </div>
      </>
    );
  }
}

Login.propTypes = {
  loggedIn: PropTypes.bool,
  username: PropTypes.string,
  password: PropTypes.string,
  loginUser: PropTypes.func.isRequired,
  verifyGithubCode: PropTypes.func.isRequired,
  verifyGithubToken: PropTypes.func.isRequired,
  location: RRPropTypes.location.isRequired,
};

Login.defaultProps = {
  loggedIn: false,
  username: '',
  password: '',
};

export default AuthContainer(Login);
