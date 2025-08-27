const express = require("express");
const fs = require("fs");
const pino = require("pino");
const axios = require("axios");
const { makeid } = require("./gen-id");
const { upload } = require("./mega");
const {
  default: makeWASocket,
  useMultiFileAuthState,
  delay,
  Browsers,
  makeCacheableSignalKeyStore,
} = require("@whiskeysockets/baileys");

const router = express.Router();

router.get("/", async (req, res) => {
  const id = makeid();
  const tempPath = `./temp/id`;
  fs.mkdirSync(tempPath,  recursive: true );

  const  state, saveCreds  = await useMultiFileAuthState(tempPath);

  const sock = makeWASocket(
    auth: 
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, pino( level: "silent" )),
    ,
    browser: Browsers.macOS("Safari"),
    printQRInTerminal: false,
    logger: pino( level: "silent" ),
  );

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", async (update) => 
    const  connection  = update;
    if (connection === "open") 
      await delay(3000);
      const credsPath = `{tempPath}/creds.json`;
      if (!fs.existsSync(credsPath)) return;

      const mega_url = await upload(
        fs.createReadStream(credsPath),
        `${sock.user.id}.json`
      );

      const sessionCode = "HUNTER~XMD~" + mega_url.replace("https://mega.nz/file/", "");

      await sock.sendMessage(sock.user.id, { text: sessionCode });

      const { data } = await axios.get(
        "https://files.catbox.moe/0gzmp7.jpg",
        { responseType: "arraybuffer" }
      );
      const logoBuffer = Buffer.from(data, "binary");

      await sock.sendMessage(sock.user.id, {
        image: logoBuffer,
        caption:
          "✅ Session connected successfully!\n\n" +
          "⚠️ Never share your unique session code.\n\n" +
          "🚀 Deploy via GitHub Action Workflow\n\n" +
          "📢 Join my channel: https://whatsapp.com/channel/0029VbBB2LTFi8xaGjuupv2a\n\n" +
          "© 2025 Hisoka",
      });

      await delay(3000);
      await sock.ws.close();
      fs.rmSync(tempPath, { recursive: true, force: true });
      process.exit();
    }
  });

  if (req.query.number) {
    const number = req.query.number.replace(/[^0-9]/g, "");
    const code = await sock.requestPairingCode(number);
    res.send({ code });
  } else {
    res.send({ error: "Number missing" });
  }
});

module.exports = router;
    
