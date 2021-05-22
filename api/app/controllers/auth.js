const axios = require('axios');
const error = require('debug')('api:error');

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
    console.log(data);
  } catch (err) {
    // log the error
    error(err);
    // send an unauthorized response if something above fails to work
    res.status(401).json({ loggedIn: false });
  }
};
