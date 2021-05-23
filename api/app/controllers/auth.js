const axios = require('axios');
const error = require('debug')('api:error');
const jwt = require('jsonwebtoken');
const { Users } = require('../models');

exports.exchangeCode = async (req, res) => {
  // pull the code out of the body
  const { code, url } = req.body;

  try {
    // make a request to github for the access_token
    const { data } = await axios.get(
      'https://github.com/login/oauth/access_token',
      {
        params: {
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          redirect_uri: url,
          code,
        },
      }
    );

    // return the access_token as json
    res.json({ data });
  } catch (err) {
    // log the error
    error(err);
    // send an unauthorized response if something above fails to work
    res.status(401).json({ loggedIn: false });
  }
};

exports.exchangeAccessToken = async (req, res) => {
  // pull the access_token out of the body
  const { accessToken } = req.body;

  try {
    // use the access_token to get the user information from the github api
    const { data } = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `token ${accessToken}` },
    });

    // create or update the user information
    const [user] = await Users.upsert(
      {
        username: data.email,
        access_token: accessToken,
        type: 'github',
      },
      { returning: true }
    );

    // use jsonwebtoken to create a token from the user id
    const token = jwt.sign({ id: user.id }, process.env.SECRET);
    res.json({ token, loggedIn: true });
  } catch (err) {
    // log the error
    error(err);
    // send an unauthorized response if something above fails to work
    res.status(401).json({ loggedIn: false });
  }
};
