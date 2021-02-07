const fs = require('fs');
const util = require('util');
const userDB = require('../helper/userDB');


const getUsername = req => {
  const { username = null } = req.signedCookies;
  return username;
}
const getUser = req => {
  const username = getUsername(req);
  if (! username) {
    return null;
  }

  const accessToken = userDB.accessToken(username);
  if (! accessToken) {
    return null;
  }

  return {username, accessToken};
}


const main = (req, res) => {
  const user = getUser(req);
  if (! user) {
    return res.redirect('/auth');
  }

  return res.send({username: user.username, status: 'ok'});
}


module.exports = {
  main,
  getUsername,
  getUser,
}
