const axios = require('axios');
const error = require('debug')('api:error');
const jwt = require('jsonwebtoken');
const { Users } = require('../models');

exports.exchangeCode = async (req, res) => {
  // pull the code out of the body
  const { code, url } = req.body;

  try {
    // make a request to slack for the access_token
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

    // const [user] = await Users.upsert(
    //   {
    //     username: data.user.email,
    //     access_token: data.access_token,
    //     type: 'github',
    //   },
    //   { returning: true }
    // );

    // const token = jwt.sign({ id: user.id }, process.env.SECRET);
    res.json({ data });
  } catch (err) {
    // log the error
    error(err);
    // send an unauthorized response if something above fails to work
    res.status(401).json({ loggedIn: false });
  }
};

exports.exchangeAccessToken = async (req, res) => {
  const { accessToken } = req.body;

  try {
    const { data } = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `token ${accessToken}` },
    });

    const [user] = await Users.upsert(
      {
        username: data.email,
        access_token: accessToken,
        type: 'github',
      },
      { returning: true }
    );

    const token = jwt.sign({ id: user.id }, process.env.SECRET);
    res.json({ token, loggedIn: true });
  } catch (err) {
    // log the error
    error(err);
    // send an unauthorized response if something above fails to work
    res.status(401).json({ loggedIn: false });
  }
};
