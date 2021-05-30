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

  // Delete question by id
  deleteQuestion = async () => {
    const {
      deleteQuestion,
      question: { id },
    } = this.props;
    await deleteQuestion(id);
  };

  // Delete choice by id
  deleteChoice = async (choiceToDelete) => {
    const { deleteChoice } = this.props;

    await deleteChoice(choiceToDelete.id);
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
              {/* Logic to add '√' or 'X' to correct or incorrect choice type */}
              {choice.type === 'correct' && (
                <i className='fas fa-check active__text' />
              )}
              {choice.type === 'incorrect' && (
                <i className='fas fa-times primary__text' />
              )}
              <span className={styles.list__item__title}>{choice.value}</span>
              {/* Edit button */}
              <Link
                url={`/admin/choices/edit/${choice.id}`}
                title='Edit'
                icon='fa-edit'
              />
              {/* Delete button */}
              <span
                onClick={this.deleteChoice.bind(this, choice)}
                role='presentation'
                className={`${styles.linkSecondary} ${styles.link}`}
              >
                <i className='fa-trash fas' />
                <span> Delete </span>
              </span>
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
  deleteChoice: PropTypes.func.isRequired,
  match: RRPropTypes.match.isRequired,
};

QuestionDetail.defaultProps = {
  question: {},
  choices: [],
};

export default QuestionContainer(QuestionDetail);
