
const { makeid } = require('./gen-id');
const express = require('express');
const fs = require('fs');
const pino = require("pino");
const { default: makeWASocket, useMultiFileAuthState, delay, Browsers, makeCacheableSignalKeyStore } = require('@whiskeysockets/baileys');
const { upload } = require('./mega');

let router = express.Router();

function removeFile(FilePath) {
  if (!fs.existsSync(FilePath)) return false;
  fs.rmSync(FilePath, { recursive: true, force: true });
}

router.get('/', async (req, res) => {
  const id = makeid();
  let num = req.query.number;
  
  async function HUNTER_XMD_PAIR_CODE() {
    const { state, saveCreds } = await useMultiFileAuthState('./temp/' + id);

    try {
      var items = ["Safari"];
      function selectRandomItem(array) {
        var randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
      }
      var randomItem = selectRandomItem(items);

      let sock = makeWASocket({
        auth: {
          creds: state.creds,
          keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
          },
        printQRInTerminal: false,
        generateHighQualityLinkPreview: true,
        logger: pino({ level: "fatal" }).child({ level: "fatal" }),
        syncFullHistory: false,
        browser: Browsers.macOS(randomItem)
      });

      sock.ev.on('creds.update', saveCreds);

      if (!sock.authState.creds.registered) {
        await delay(1500);
        num = num.replace(/[^0-9]/g, '');
        const code = await sock.requestPairingCode(num);
        if (!res.headersSent) {
          await res.send({ code });
        }
      }

      sock.ev.on("connection.update", async (update) => {
        const { connection, lastDisconnect } = update;

        if (connection === "open") {
          await delay(5000);

          try {
            const credsPath = __dirname + `/temp/id/creds.json`;
            let data = fs.readFileSync(credsPath);

            const mega_url = await upload(fs.createReadStream(credsPath), `{sock.user.id}.json`);
            const string_session = mega_url.replace('https://mega.nz/file/', '');

            const md = "HUNTER~XMD~" + string_session;

            await sock.sendMessage(sock.user.id, { text: md });

            let desc = `*Hey there, HUNTER-XD User!* 👋🏻
            Thanks for using *HUNTER-XMD* — your session has been successfully created!

🔐 *Session ID:* Sent above  
⚠️ *Keep it safe!* Do NOT share this ID with anyone.

——————

*✅ Stay Updated:*  
Join our official WhatsApp Channel:  
https://whatsapp.com/channel/0029VbBB2LTFi8xaGjuupv2a

*💻 Source Code:*  
Fork & explore the project on GitHub:  
https://github.com/djexo-tech/hunter-xmd

——————

> *© Powered by Hisoka*
Stay cool and hack smart. ✌🏻`;

            await sock.sendMessage(sock.user.id, {
              text: desc,
              contextInfo: {
                externalAdReply: {
                  title: "powered by djexo-tech",
                  thumbnailUrl: "https://files.catbox.moe/0gzmp7.jpg",
                  sourceUrl: "https://whatsapp.com/channel/0029VbBB2LTFi8xaGjuupv2a",
                  mediaType: 2,
                  renderLargerThumbnail: true,
                  showAdAttribution: true,
                }
              }
            });

            await delay(10);
            await sock.ws.close();
            await removeFile('./temp/' + id);

            console.log(`👤 ${sock.user.id} Connected ✅ Restarting process...`);

            await delay(10);
            process.exit();

          } catch (e) {
            console.error("Error sending session code:", e);
            await sock.sendMessage(sock.user.id, { text: "❗ Failed to send session code." });
          }

        } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode !== 401) {
          await delay(10);
          HUNTER_XMD_PAIR_CODE();
        }
      });

    } catch (err) {
      console.log("service restarted");
      await removeFile('./temp/' + id);
      if (!res.headersSent) {
        await res.send({ code: "❗ Service Unavailable" });
      }
    }
  }

  return await HUNTER_XMD_PAIR_CODE();
});

module.exports = router;
