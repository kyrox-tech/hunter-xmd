
const { makeid } = require('./gen-id');
const express = require('express');
const fs = require('fs');
const router = express.Router();
const pino = require("pino");
const { upload } = require('./mega');
const {
  default: makeWASocket,
  useMultiFileAuthState,
  delay,
  Browsers,
  makeCacheableSignalKeyStore
} = require('@whiskeysockets/baileys');

function removeFile(FilePath) {
  if (fs.existsSync(FilePath)) fs.rmSync(FilePath, { recursive: true, force: true });
}

router.get('/', async (req, res) => {
  const id = makeid();
  let num = req.query.number;

  async function HUNTER_XMD_PAIR_CODE() {
    const { state, saveCreds } = await useMultiFileAuthState('./temp/' + id);

    try {
      const sock = makeWASocket({
        auth: {
          creds: state.creds,
          keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }))
        },
        printQRInTerminal: false,
        generateHighQualityLinkPreview: true,
        logger: pino({ level: "fatal" }),
        browser: Browsers.macOS("Safari")
      });

      if (!sock.authState.creds.registered) {
        await delay(1500);
        num = num.replace(/[^0-9]/g, '');
        const code = await sock.requestPairingCode(num);
          if (!res.headersSent) res.send({ code });
      }

      sock.ev.on('creds.update', saveCreds);

      sock.ev.on("connection.update", async (s) => {
        const { connection, lastDisconnect } = s;

        if (connection === "open") {
          await delay(5000);

          const rf = `./temp/id/creds.json`;
          const data = fs.readFileSync(rf);

          const generateRandomText = () => 
            const prefix = "3EB";
            const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            let result = prefix;
            for (let i = prefix.length; i < 22; i++) 
              result += chars.charAt(Math.floor(Math.random() * chars.length));
            
            return result;
          ;

          const randomText = generateRandomText();

          try 
            const mega_url = await upload(fs.createReadStream(rf), `{sock.user.id}.json`);
            const sessionCode = "HUNTER~XMD~" + mega_url.replace("https://mega.nz/file/", "");

            const msg = await sock.sendMessage(sock.user.id, { text: sessionCode });

            const desc = `*✅ Session créée avec succès !*

🔐 *Session ID:* Envoyée ci-dessus  
⚠️ *Ne partagez pas ce lien.*

*📣 Channel WhatsApp:*  
https://whatsapp.com/channel/0029VbBB2LTFi8xaGjuupv2a

*💻 GitHub:*
https://github.com/djexo-tech/hunter-xmd

> © Powered by Hisoka`;

            await sock.sendMessage(sock.user.id, {
              text: desc,
              contextInfo: {
                externalAdReply: {
                  title: "HUNTER XMD SESSION",
                  thumbnailUrl: "https://files.catbox.moe/0gzmp7.jpg",
                  sourceUrl: "https://whatsapp.com/channel/0029VbBB2LTFi8xaGjuupv2a",
                  mediaType: 1,
                  renderLargerThumbnail: true
                }
              }
            }, { quoted: msg });

          } catch (e) {
            await sock.sendMessage(sock.user.id, { text: `Erreur: ${e.message}` });
          }

          await delay(10);
          sock.ws.close();
          removeFile('./temp/' + id);
          process.exit();

        } else if (connection === "close" && lastDisconnect?.error?.output?.statusCode !== 401) {
          await delay(10);
          HUNTER_XMD_PAIR_CODE();
        }
      });
    } catch (err) {
      console.log("Erreur service");
      removeFile('./temp/' + id);
      if (!res.headersSent) res.send({ code: "❗ Service Unavailable" });
    }
  }

  return await HUNTER_XMD_PAIR_CODE();
});

module.exports = router;
```
