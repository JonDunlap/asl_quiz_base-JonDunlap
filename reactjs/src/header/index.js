import React from 'react';
import PropTypes from 'prop-types';
import RRPropTypes from 'react-router-prop-types';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import AuthContainer from '../containers/auth';

class Header extends React.Component {
  logUserOut = () => {
    const { logout, history } = this.props;
    logout();
    history.push('/');
  };

  render() {
    const { loggedIn } = this.props;

    return (
      <header className={styles.header}>
        <div className={styles.header__container}>
          <h1>
            <Link to='/' className={styles.header__brand}>
              Back-end Learning
            </Link>
          </h1>
          <div className={styles.links}>
            {loggedIn && (
              <>
                <Link to='/admin/quizzes' className={styles.header__link}>
                  Dashboard
                </Link>
                <Link to='/admin/quizzes/new' className={styles.header__link}>
                  Create a new quiz
                </Link>
                <button
                  type='button'
                  onClick={this.logUserOut}
                  className={styles.header__link}
                >
                  Logout
                </button>
              </>
            )}

            {!loggedIn && (
              <Link to='/login' className={styles.header__link}>
                Login
              </Link>
            )}
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  loggedIn: PropTypes.bool,
  logout: PropTypes.func.isRequired,
  history: RRPropTypes.history.isRequired,
};

Header.defaultProps = {
  loggedIn: false,
};

export default AuthContainer(Header);
