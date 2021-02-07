const { pocketApi, pocketApiData } = require('../helper/axios');
const { setUser } = require('./me')


const getCode = req => {
  const { code = null } = req.query;
  return code;
}

const aoauthRequest = () => {
  const redirect_uri = `${process.env.URL}/auth`;

  return pocketApi.post(
    'oauth/request',
    {...pocketApiData, redirect_uri},
  )
    .then(res => res.data)
    .then(data => {
      return {
        code: data.code,
        redirect_uri: `https://getpocket.com/auth/authorize?request_token=${data.code}&redirect_uri=${redirect_uri}?code=${data.code}`
      }
    });
}

const main = (req, res) => {
  const code = getCode(req);
  if (! code) {
    aoauthRequest().then(data => {
      return res.status(401)
        .json(data)
      })
      return;
  }

  pocketApi.post(
    'oauth/authorize',
    {...pocketApiData, code},
  )
    .then(apiRes => {
      setUser(apiRes.data);
      res.cookie(
        'username',
        apiRes.data.username,
        {httpOnly: true, signed: true, maxAge: 21600000} // 15day
      );
      return res.redirect('/');
    })
    .catch(error => {
      if (error.response && error.response.status === 403) {
        aoauthRequest().then(data => {
          return res.status(401).json(data)
        });
        return;
      }

      return res.status(error.response.status).json(error.message)
    });
}


module.exports = {
  main,
}
