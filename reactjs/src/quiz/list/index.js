import React from 'react';
import PropTypes from 'prop-types';
import { Link as RRLink } from 'react-router-dom';
import Link from '../../link';
import styles from '../styles.module.css';
import QuizzesContainer from '../../containers/quizzes';

class QuizList extends React.Component {
  componentDidMount() {
    const { fetchUserQuizzes } = this.props;
    fetchUserQuizzes();
  }

  render() {
    const { userQuizzes } = this.props;

    return (
      <>
        <h1 className={styles.heading}>My Quizzes</h1>
        <ul className={styles.list}>
          {userQuizzes.map((quiz) => (
            <li className={styles.list__item} key={quiz.id}>
              <span className={styles.list__item__title}>{quiz.name}</span>
              <Link url={`/admin/quizzes/${quiz.id}`} />
            </li>
          ))}
        </ul>
        <RRLink
          to='/admin/quizzes/new'
          className={`${styles.button} ${styles.primary}`}
        >
          Create a new quiz
        </RRLink>
      </>
    );
  }
}

QuizList.propTypes = {
  userQuizzes: PropTypes.arrayOf(PropTypes.object),
  fetchUserQuizzes: PropTypes.func.isRequired,
};

QuizList.defaultProps = {
  userQuizzes: [],
};

export default QuizzesContainer(QuizList);
