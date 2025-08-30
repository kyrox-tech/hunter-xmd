const { default: makeWASocket, useSingleFileAuthState, DisconnectReason } = require('@adiwajshing/baileys');
const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 8000;
const __path = process.cwd();

// Authentification Baileys
const { state, saveState } = useSingleFileAuthState('./session.json');

// Chargement dynamique de toutes les commandes du dossier 'commands'
const commands = new Map();
const commandsPath = path.join(__dirname, 'commands');
fs.readdirSync(commandsPath).forEach(file => {
  if (file.endsWith('.js')) {
    const command = require(path.join(commandsPath, file));
    if (command.name) commands.set(command.name, command);
  }
});

// Démarrage du bot Baileys
async function startBot() {
  const conn = makeWASocket({
    auth: state,
    printQRInTerminal: true
  });

  conn.ev.on('creds.update', saveState);

  conn.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type !== 'notify') return;
    const m = messages[0];
    if (!m.message || !m.key.remoteJid) return;

    // Extraction du texte du message
    let body = '';
    if (m.message.conversation) body = m.message.conversation;
    else if (m.message.extendedTextMessage) body = m.message.extendedTextMessage.text;
    else if (m.message.imageMessage && m.message.imageMessage.caption) body = m.message.imageMessage.caption;
    else if (m.message.videoMessage && m.message.videoMessage.caption) body = m.message.videoMessage.caption;

    if (!body.startsWith('.')) return;

    const [cmdName, ...args] = body.slice(1).trim().split(/\s+/);
    const command = commands.get(cmdName.toLowerCase());
    if (command) {
      try {
        await command.execute(conn, m, args);
      } catch (err) {
        await conn.sendMessage(m.key.remoteJid, { text: '❌ Erreur: ' + err.message }, { quoted: m });
      }
    }
  });

  conn.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;
    if(connection === 'close' && lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut) {
      startBot();
    }
  });
}

startBot();

// Partie Express : routes basiques pour servir des fichiers HTML (adapte selon tes besoins)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/pair', (req, res) => res.sendFile(__path + '/pair.html'));
app.get('/qr', (req, res) => res.sendFile(__path + '/qr.html'));
app.get('/', (req, res) => res.sendFile(__path + '/main.html'));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
