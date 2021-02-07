const { pocketApi, pocketApiData } = require('../helper/axios');
const { getUser } = require('./me');
const userDB = require('../helper/userDB');


const _count = req => {
  const count = parseInt(req.query.limit, 10) || 10;
  if (count < 1) {
    return 1;
  }

  return count;
}

const _offset = (req, limit) => {
  const page = parseInt(req.query.page, 10) || 1;
  if (page < 1) {
    return 0;
  }

  return (page - 1) * limit;
}

const list = (req, res) => {
  const user = getUser(req);
  if (! user) {
    return res.redirect('/auth');
  }

  const count = _count(req);
  const query = {
    "access_token": user.accessToken,
    "count": count,
    "offset": _offset(req, count),
  };
console.log(query)
  return pocketApi.post('get', {...pocketApiData, ...query})
    .then(apiRes => res.send(apiRes.data));
}


module.exports = {
  list,
}
