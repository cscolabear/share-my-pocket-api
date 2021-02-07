const fs = require('fs');


const getUsername = req => {
  const { username = null } = req.signedCookies;
console.log(req.signedCookies)
  return username;
}

const findUser = username => {
  const users = fs.readFileSync('./data/users.json');
  const data = JSON.parse(users);
  return data.find(user => user.username === username);
}

const setUser = input => {
  const users = fs.readFileSync('./data/users.json');
  const data = JSON.parse(users);

  const foundUser = data.find(user => user.username === input.username);
  if (foundUser) {
    foundUser.access_token = input.access_token;
  } else {
    data.push({
      "access_token": input.access_token,
      "username": input.username,
    })
  }

  fs.writeFileSync('./data/users.json', JSON.stringify(data));
}

const main = (req, res) => {
  const username = getUsername(req);
  if (! username) {
    return res.redirect('/auth');
  }

  const foundUser = findUser(username);
  if (! foundUser) {
    return res.redirect('/auth');
  }

  return res.send(foundUser);
}


module.exports = {
  main,
  getUsername,
  findUser,
  setUser,
}
