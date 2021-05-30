import React from 'react';
import API from '../API';

export default function container(Component) {
  class AuthContainer extends React.Component {
    state = {
      loggedIn: !!localStorage.getItem('token'),
    };

    // Logout function, removes token from local storage and sets loggedIn to false
    logout = () => {
      localStorage.removeItem('token');
      this.setState({ loggedIn: false });
    };

    // Login with username and password, receives a token and loggedIn status from the server
    // set the token in the local storage and set the state to loggedIn
    loginUser = async (user) => {
      const { username, password } = user;

      const { token, loggedIn } = await API.post('/auth/login', {
        username,
        password,
      });

      localStorage.setItem('token', token);
      this.setState({ loggedIn });
    };

    // Signup with username and password, receives a token and loggedIn status from the server
    // set the token in the local storage and set the state to loggedIn
    signUpUser = async (user) => {
      const { username, password } = user;

      const { token, loggedIn } = await API.post('/auth/signup', {
        username,
        password,
      });

      localStorage.setItem('token', token);
      this.setState({ loggedIn });
    };

    // Callback route from GitHub, receives a code and exchanges it for an access token
    verifyGithubCode = async (code) => {
      const { data } = await API.post('/auth/exchange', {
        code,
        url: process.env.REACT_APP_CALLBACK_URL,
      });

      window.location = `/github/token?${data}`;
    };

    // Send the access token to the GitHub API and get back the user information
    // receives a token and loggedIn status from the server
    // set the token in the local storage and set the state to loggedIn
    verifyGithubToken = async (accessToken) => {
      const { token, loggedIn } = await API.post('/auth/token', {
        accessToken,
      });

      localStorage.setItem('token', token);
      this.setState({ loggedIn });
    };

    render() {
      const { loggedIn } = this.state;

      return (
        <Component
          /* Pass all other props that are being passed to this component forward */
          {...this.props}
          loggedIn={loggedIn}
          logout={this.logout}
          loginUser={this.loginUser}
          signUpUser={this.signUpUser}
          verifyGithubCode={this.verifyGithubCode}
          verifyGithubToken={this.verifyGithubToken}
        />
      );
    }
  }
  return AuthContainer;
}
