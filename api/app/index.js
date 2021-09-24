// load in the imports
const error = require('debug')('api:error');
const express = require('express');
const morganDebug = require('morgan-debug');
const cors = require('cors');

// routes
const quizzesRouter = require('./routes/quizzes');
const questionsRouter = require('./routes/questions');
const choicesRouter = require('./routes/choices');
const authRouter = require('./routes/auth');

// create an express application
const app = express();
app.use(cors());

// check to see if the content-type is json and parse it into req.body
app.use(express.json());
// log all requests
app.use(morganDebug('api:request', 'dev'));

// setup the app to use the router at /quizzes
app.use('/quizzes', quizzesRouter);
// setup the app to use the router at /questions
app.use('/questions', questionsRouter);
// setup the app to use the router at /choices
app.use('/choices', choicesRouter);
// setup the app to use the router at /auth
app.use('/auth', authRouter);

// four params are required to mark this as an error handling middleware
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  error('ERROR FOUND:', err);
  res.sendStatus(500);
});

// export the express application
module.exports = app;
