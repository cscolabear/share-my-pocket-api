const express = require('express');
const routes = require('./routes');
const cookieParser = require('cookie-parser');


const app = express();

app.use(cookieParser(process.env.COOKIE_PARSER_SIGN_SECRET));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', routes);

module.exports = app;
