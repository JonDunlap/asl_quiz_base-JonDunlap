const { check, validationResult } = require('express-validator');

const checks = {
  id: check('id')
    .isUUID()
    .withMessage('ID not valid, please go back and try again.'),
  title: check('title')
    .exists()
    .withMessage('Decision title is required.')
    .isLength(3)
    .withMessage(
      'Decision title is required to be at least 3 characters long.'
    ),
  type: check('type')
    .exists()
    .withMessage('Decision type is required.')
    .isIn(['public', 'private'])
    .withMessage('Decisions must be public or private.'),
  value: check('value')
    .exists()
    .withMessage('Option value is required.')
    .isLength(1)
    .withMessage('Option value is required to be at least 1 character long'),
  decisionId: check('decisionId')
    .isUUID()
    .withMessage('Decision ID is not valid, please go back and try again.'),
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
    case 'createDecisions': {
      return [checks.title, checks.type, checkForErrors];
    }

    case 'editDecision': {
      return [checks.id, checks.title, checks.type, checkForErrors];
    }

    case 'deleteDecision': {
      return [checks.id, checkForErrors];
    }

    case 'createOption': {
      return [checks.value, checks.decisionId, checkForErrors];
    }

    case 'editOption': {
      return [checks.id, checks.value, checks.decisionId, checkForErrors];
    }

    case 'deleteOption': {
      return [checks.id, checkForErrors];
    }

    default: {
      return [];
    }
  }
};
