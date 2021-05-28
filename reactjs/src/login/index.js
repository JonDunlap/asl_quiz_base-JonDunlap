import React from 'react';
import PropTypes from 'prop-types';
import RRPropTypes from 'react-router-prop-types';
import { Redirect } from 'react-router-dom';
import styles from './styles.module.css';
import AuthContainer from '../containers/auth';

class Login extends React.Component {
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

  redirectToGithub = () => {
    let GITHUB_URL = 'https://github.com/login/oauth/authorize?';
    GITHUB_URL += `client_id=${process.env.REACT_APP_CLIENT_ID}`;
    GITHUB_URL += '&scope=identity.basic,identity.email';
    // GITHUB_URL += '&scope=user:email';
    GITHUB_URL += `&redirect_uri=${process.env.REACT_APP_CALLBACK_URL}`;
    window.location = GITHUB_URL;
  };

  render() {
    const { loggedIn } = this.props;
    if (loggedIn) return <Redirect to='/admin/decisions' />;

    return (
      <>
        <h1>Login</h1>
        <div>
          <button
            type='button'
            onClick={this.redirectToGithub}
            className={styles.button}
          >
            <i className='fab fa-github'>
              <span>Sign in with GitHub</span>
            </i>
          </button>
        </div>
      </>
    );
  }
}

Login.propTypes = {
  loggedIn: PropTypes.bool,
  verifyGithubCode: PropTypes.func.isRequired,
  verifyGithubToken: PropTypes.func.isRequired,
  location: RRPropTypes.location.isRequired,
};

Login.defaultProps = {
  loggedIn: false,
};

export default AuthContainer(Login);
