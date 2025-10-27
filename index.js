const express = require('express');
const app = express();
const _path = process.cwd();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8000;
let server = require('./qr');
let code = require('./pair');
const { sessionID } = require('./config');
require('events').defaultMaxListeners = 15;

app.use('/server', server);
app.use('/code', code);
app.use('/pair', async (req, res, next) => {
  res.sendFile(_path + '/pair.html');
});
app.use('/qr', async (req, res, next) => {
  res.sendFile(_path + '/qr.html');
});
app.use('/', async (req, res, next) => {
  res.sendFile(_path + '/main.html');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT);
});

module.exports = app;

