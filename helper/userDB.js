const { JsonDB } = require('node-json-db');
const { Config } = require('node-json-db/dist/lib/JsonDBConfig');

const db = new JsonDB(new Config("./data/users", false, false));


module.exports = {
  accessToken: username => {
    if (! username) {
      return null;
    }

    try {
      user = db.getData(`/${username}`);
      return user.access_token || null;
    } catch(error) {
        console.error(error);
    };
  },

  set: (username, access_token) => {
    try {
      db.push(`/${username}`, { access_token, updated_at: Date.now() });
      db.save();
    } catch(error) {
        console.error(error);
    };
  }
}
