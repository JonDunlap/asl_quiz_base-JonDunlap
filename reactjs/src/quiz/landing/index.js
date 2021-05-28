import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles.module.css';
import Link from '../../link';
import QuizzesContainer from '../../containers/quizzes';

class Landing extends React.Component {
  componentDidMount() {
    const { fetchPublicQuizzes } = this.props;
    fetchPublicQuizzes();
  }

  render() {
    const { publicQuizzes } = this.props;

    return (
      <>
        <h1 className={styles.heading}>Public Quizzes</h1>
        <ul className={styles.list}>
          {publicQuizzes.map((quiz) => (
            <li className={styles.list__item} key={quiz.id}>
              <span className={styles.list__item__title}>{quiz.name}</span>
              <Link url={`/quiz/${quiz.id}`} />
            </li>
          ))}
        </ul>
      </>
    );
  }
}

Landing.propTypes = {
  publicQuizzes: PropTypes.arrayOf(PropTypes.object),
  fetchPublicQuizzes: PropTypes.func.isRequired,
};

Landing.defaultProps = {
  publicQuizzes: [],
};

export default QuizzesContainer(Landing);
