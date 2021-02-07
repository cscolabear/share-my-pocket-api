const { pocketApi, pocketApiData } = require('../helper/axios');
const { getUsername, findUser } = require('./me')


const list = (req, res) => {
  const user = findUser(getUsername(req));
  if (! user) {
    return res.redirect('/auth');
  }

  const query = {
    "access_token": user.access_token,
    "count": 2,
    "offset": 0
  };
  return pocketApi.post(
    'get',
    {...pocketApiData, ...query},
  )
    .then(apiRes => {
      return res.send(apiRes.data);
    })
}


module.exports = {
  list,
}
