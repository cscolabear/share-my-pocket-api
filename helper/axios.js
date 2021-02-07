const axios = require('axios');
require('dotenv').config()

const pocketApiData = {
  "consumer_key": process.env.POCKET_CONSUMER_KEY,
}

const pocketApi = axios.create({
  baseURL: 'https://getpocket.com/v3/',
  timeout: 3000,
  headers: {'X-Accept': 'application/json',},
});

module.exports = {
  pocketApiData,
  pocketApi,
}
