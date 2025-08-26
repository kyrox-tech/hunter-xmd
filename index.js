
const express = require('express');
const app = express();
__path = process.cwd();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8000;
let server = require('./qr');
let code = require('./pair');

require('events').EventEmitter.defaultMaxListeners = 500;

app.use('/server', server);
app.use('/code', code);

// Sert le HTML
app.get('/pair.html', (req, res) => {
  res.sendFile(__path + '/pair.html');
});

// Utilise le backend pair.js
app.use('/pair', code);

app.get('/qr', async (req, res) => {
  res.sendFile(__path + '/qr.html');
});

app.get('/', async (req, res) => {
  res.sendFile(__path + '/main.html');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`
Don't Forgot To Give Star HUNTER-XMD

Server running on http://localhost:` + PORT);
});

module.exports = app;
