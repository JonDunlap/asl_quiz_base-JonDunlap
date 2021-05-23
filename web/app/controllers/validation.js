const { check, validationResult } = require('express-validator');

const checks = {
  id: check('id')
    .isUUID()
    .withMessage('ID not valid, please go back and try again.'),
  quizName: check('name')
    .exists()
    .withMessage('Quiz name is required.')
    .isLength(3)
    .withMessage('Quiz name is required to be at least 3 characters long.'),
  quizType: check('type')
    .exists()
    .withMessage('Quiz type is required.')
    .isIn(['public', 'private'])
    .withMessage('Quizzes must be public or private.'),
  questionTitle: check('title')
    .exists()
    .withMessage('Question title is required.')
    .isLength(1)
    .withMessage('Question title is required to be at least 1 character long'),
  quizId: check('quizId')
    .isUUID()
    .withMessage('Quiz ID is not valid, please go back and try again.'),
  choiceValue: check('value')
    .exists()
    .withMessage('Choice value is required.')
    .isLength(3)
    .withMessage('Choice value is required to be at least 3 characters long.'),
  choiceType: check('type')
    .exists()
    .withMessage('Choice type is required.')
    .isIn(['correct', 'incorrect'])
    .withMessage('Choices must be correct or incorrect.'),
  questionId: check('questionId')
    .isUUID()
    .withMessage('Question ID is not valid, please go back and try again.'),
  choiceSelected: check('choiceId')
    .exists()
    .withMessage('You must select a choice.'),
  userName: check('username')
    .exists()
    .withMessage('Username is required.')
    .isLength(3)
    .withMessage('Username is required to be at least 3 characters long.'),
  password: check('password')
    .exists()
    .withMessage('Password is required.')
    .isLength(3)
    .withMessage('Password is required to be at least 3 characters long.'),
};

const checkForErrors = (req, res, next) => {
  // get any errors
  const errors = validationResult(req);

  // if there are errors go to the next error handler middleware with the errors from the validation
  if (!errors.isEmpty()) return next(errors.mapped());
  // if there are NO errors, go to the next middleware function
  return next();
};

exports.validate = (method) => {
  switch (method) {
    case 'createQuiz': {
      return [checks.quizName, checks.quizType, checkForErrors];
    }

    case 'editQuiz': {
      return [checks.id, checks.quizName, checks.quizType, checkForErrors];
    }

    case 'deleteQuiz': {
      return [checks.id, checkForErrors];
    }

    case 'createQuestion': {
      return [checks.questionTitle, checks.quizId, checkForErrors];
    }

    case 'editQuestion': {
      return [checks.id, checks.questionTitle, checkForErrors];
    }

    case 'deleteQuestion': {
      return [checks.id, checkForErrors];
    }

    case 'createChoice': {
      return [
        checks.choiceValue,
        checks.choiceType,
        checks.questionId,
        checkForErrors,
      ];
    }

    case 'editChoice': {
      return [checks.id, checks.choiceValue, checks.choiceType, checkForErrors];
    }

    case 'deleteChoice': {
      return [checks.id, checkForErrors];
    }

    case 'submitChoice': {
      return [checks.id, checks.choiceSelected, checkForErrors];
    }

    case 'createUser': {
      return [checks.userName, checks.password, checkForErrors];
    }

    case 'loginUser': {
      return [checks.userName, checks.password, checkForErrors];
    }

    default: {
      return [];
    }
  }
};
