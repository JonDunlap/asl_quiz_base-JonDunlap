const querystring = require('querystring');
const log = require('debug')('web:request');

exports.renderLogin = (req, res) => {
  res.render('login', { username: '', password: '' });
};

// eslint-disable-next-line no-unused-vars
exports.renderLoginFormWithErrors = (errors, req, res, next) => {
  // get the data the user submitted
  const { username, password } = req.body;

  // send the title, type, and errors as variables to the view
  res.render('login', { username, password, errors });
};

exports.renderSignup = (req, res) => {
  res.render('signup', { username: '', password: '' });
};

// eslint-disable-next-line no-unused-vars
exports.renderSignupFormWithErrors = (errors, req, res, next) => {
  // get the data the user submitted
  const { username, password } = req.body;

  // send the title, type, and errors as variables to the view
  res.render('signup', { username, password, errors });
};

exports.handleLogin = async (req, res) => {
  // get the username and password from the request body
  const { username, password } = req.body;

  // make an api request to check if the user exists
  const { token, loggedIn } = await req.API.post('/auth/login', {
    username,
    password,
  });

  // save the loggedIn state and token to the session
  req.session.loggedIn = loggedIn;
  req.session.token = token;

  // go to the admin dashboard
  res.redirect('/admin/quizzes/list');
};

exports.handleSignup = async (req, res) => {
  // get the username and password from the request body
  const { username, password } = req.body;

  // make an api request to create the user
  const { token, loggedIn } = await req.API.post('/auth/signup', {
    username,
    password,
  });

  // save the loggedIn state and token to the session
  req.session.loggedIn = loggedIn;
  req.session.token = token;

  // go to the admin dashboard
  res.redirect('/admin/quizzes/list');
};

exports.redirectToGithub = (req, res) => {
  // the base url
  const GITHUB_URL = 'https://github.com/login/oauth/authorize?';
  // convert the object into a query string (?client_id=&scope=&redirect_uri=)
  const params = querystring.stringify({
    client_id: process.env.CLIENT_ID,
    redirect_uri: process.env.CALLBACK_URL,
    // get the basic info about the user and their email
    scope: 'user:email',
  });

  log(GITHUB_URL + params);
  res.redirect(GITHUB_URL + params);
};

exports.verifyGithubCode = async (req, res) => {
  // pull the code sent from github out of the url
  const { code } = req.query;
  // make an api request to verify the code
  const { data } = await req.API.post('/auth/exchange', {
    code,
    url: process.env.CALLBACK_URL,
  });

  // Redirect to exchange the access token for the user data
  res.redirect(`/github/token?${data}`);
};

exports.verifyGithubToken = async (req, res) => {
  // pull the token sent from github out of the url
  const { access_token: accessToken } = req.query;

  // make an api request to verify the code
  const { token, loggedIn } = await req.API.post('/auth/token', {
    accessToken,
  });

  // save the loggedIn state and token to the session
  req.session.loggedIn = loggedIn;
  req.session.token = token;

  // go to the admin dashboard
  res.redirect('/admin/quizzes/list');
};

exports.logout = (req, res) => {
  // destroy the user's session data (token and loggedIn)
  req.session.destroy();
  // send them to the home page
  res.redirect('/');
};
