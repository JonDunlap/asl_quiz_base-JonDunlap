import React from 'react';
import { Redirect } from 'react-router-dom';
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

    verifyGithubCode = async (code) => {
      const { data } = await API.post('/auth/exchange', {
        code,
        url: process.env.REACT_APP_CALLBACK_URL,
      });

      <Redirect to={`/github/token?${data}`} />;
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
          verifySlackCode={this.verifyGithubCode}
        />
      );
    }
  }
  return AuthContainer;
}
