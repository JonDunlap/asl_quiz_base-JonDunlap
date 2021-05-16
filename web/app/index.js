// pull in the express package
const express = require('express');
// add another logger
const error = require('debug')('web:error');
// load in the axios middleware
const API = require('./utils/API');

// load routes
const publicRoutes = require('./routes/public');
// const adminChoicesRoutes = require('./routes/adminChoices');
const adminQuestionsRoutes = require('./routes/adminQuestions');
const adminQuizzesRoutes = require('./routes/adminQuizzes');

// create an express app
const app = express();

// setup a folder to hold all the static files
app.use(express.static('public'));
// checks to see if the content-type is url-encoded and parses it to req.body
app.use(express.urlencoded({ extended: true }));
// axios middleware
app.use(API);

// set pug as the view engine
app.set('view engine', 'pug');
// set the view folder as the default place to render from
app.set('views', `${__dirname}/views`);

// setup routers
app.use('/', publicRoutes);
// app.use('/admin/choices', adminChoicesRoutes);
app.use('/admin/questions', adminQuestionsRoutes);
app.use('/admin/quizzes', adminQuizzesRoutes);

// four params are required to mark this as an error handling middleware
// the comment below this allows for eslint to not throw an error
// because the next function is not being used
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  error('ERROR FOUND', err);
  res.sendStatus(500);
});

// export the express app
module.exports = app;
