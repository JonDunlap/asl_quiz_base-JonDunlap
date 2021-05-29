import React from 'react';
import PropTypes from 'prop-types';
import RRPropTypes from 'react-router-prop-types';
import { Link as RRLink } from 'react-router-dom';
import Link from '../../link';
import styles from '../styles.module.css';
import QuestionContainer from '../../containers/question';

class QuestionDetail extends React.Component {
  componentDidMount() {
    // get the id from the route params
    const {
      fetchQuestion,
      match: {
        params: { id },
      },
    } = this.props;
    fetchQuestion(id);
  }

  deleteQuestion = async () => {
    const {
      deleteQuestion,
      question: { id },
    } = this.props;
    await deleteQuestion(id);
  };

  render() {
    const { question, choices } = this.props;

    return (
      <>
        <h1 className={styles.heading}>
          {question.title}
          <Link
            url={`/admin/questions/edit/${question.id}`}
            title='Edit'
            icon='fa-edit'
          />
          <span onClick={this.deleteQuestion} role='presentation'>
            <Link
              url='/admin/quizzes/'
              title='Delete'
              icon='fa-trash'
              className='linkSecondary'
            />
          </span>
        </h1>
        <h2 className={styles.headingSecondary}>Choices</h2>
        <ul className={styles.list}>
          {choices.map((choice) => (
            <li className={styles.list__item} key={choice.id}>
              <span className={styles.list__item__title}>{choice.value}</span>
              <Link url={`/admin/choices/${choice.id}`} />
            </li>
          ))}
        </ul>
        <RRLink
          to={`/admin/choices/new?questionId=${question.id}`}
          className={`${styles.button} ${styles.primary}`}
        >
          Add a new choice
        </RRLink>
      </>
    );
  }
}

QuestionDetail.propTypes = {
  question: PropTypes.shape({ title: PropTypes.string, id: PropTypes.string }),
  choices: PropTypes.arrayOf(PropTypes.object),
  fetchQuestion: PropTypes.func.isRequired,
  deleteQuestion: PropTypes.func.isRequired,
  match: RRPropTypes.match.isRequired,
};

QuestionDetail.defaultProps = {
  question: {},
  choices: [],
};

export default QuestionContainer(QuestionDetail);
