import React from 'react';
import API from '../API';

export default function container(Component) {
  class AuthContainer extends React.Component {
    state = {
      loggedIn: !!localStorage.getItem('token'),
    };

    logout = () => {
      localStorage.removeItem('token');
      this.setState({ loggedIn: false });
    };

    loginUser = async (user) => {
      const { username, password } = user;

      const { token, loggedIn } = await API.post('/auth/login', {
        username,
        password,
      });

      localStorage.setItem('token', token);
      this.setState({ loggedIn });
    };

    signUpUser = async (user) => {
      const { username, password } = user;

      const { token, loggedIn } = await API.post('/auth/signup', {
        username,
        password,
      });

      localStorage.setItem('token', token);
      this.setState({ loggedIn });
    };

    verifyGithubCode = async (code) => {
      const { data } = await API.post('/auth/exchange', {
        code,
        url: process.env.REACT_APP_CALLBACK_URL,
      });

      window.location = `/github/token?${data}`;
    };

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
