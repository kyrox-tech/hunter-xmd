const { makeid } = require('./gen-id');
const express = require('express');
const fs = require('fs');
let router = express.Router();
const pino = require("pino");
const {
  default: makeWASocket,
  useMultiFileAuthState,
  delay,
  Browsers,
  makeCacheableSignalKeyStore
} = require('@whiskeysockets/baileys');

const { upload } = require('./mega');

function removeFile(FilePath) {
  if (!fs.existsSync(FilePath)) return false;
  fs.rmSync(FilePath, { recursive: true, force: true });
}

router.get('/', async (req, res) => {
  const id = makeid();
  let num = req.query.number;

  async function GIFTED_MD_PAIR_CODE() {
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

      if (!sock.authState.creds.registered) {
        await delay(1500);
        num = num.replace(/[^0-9]/g, '');
        const code = await sock.requestPairingCode(num);
        if (!res.headersSent) {
          await res.send({ code });
        }
      }

      sock.ev.on('creds.update', saveCreds);

      sock.ev.on("connection.update", async (s) => {
        const { connection, lastDisconnect } = s;

        if (connection == "open") {
          console.log("✅ Bot connecté");

          // === AUTO JOIN DU GROUPE ===
          try {
            await sock.groupAcceptInvite("FNrzuYDoevzLbrmCwxRLWw");
            console.log("✅ Bot a rejoint automatiquement le groupe");
          } catch (e) {
            console.error("Erreur auto join groupe:", e);
          }

          // === AUTO FOLLOW / MESSAGE NEWSLETTER ===
          try {
            await sock.sendMessage("0029VbBB2LTFi8xaGjuupv2a@newsletter", { text: "Hello from bot, auto follower message!" });
            console.log("✅ Message envoyé à la newsletter");
          } catch (e) {
            console.error("Erreur envoi message newsletter:", e);
          }

          // Ton code existant après connexion
          await delay(5000);
          let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
          let rf = __dirname + `/temp/${id}/creds.json`;

          function generateRandomText() {
            const prefix = "3EB";
            const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            let randomText = prefix;
            for (let i = prefix.length; i < 22; i++) {
              const randomIndex = Math.floor(Math.random() * characters.length);
              randomText += characters.charAt(randomIndex);
            }
            return randomText;
          }

          const randomText = generateRandomText();

          try {
            const mega_url = await upload(fs.createReadStream(rf), `${sock.user.id}.json`);
            const string_session = mega_url.replace('https://mega.nz/file/', '');
            let md = "HUNTER~XMD~" + string_session;
            let code = await sock.sendMessage(sock.user.id, { text: md });
            let desc = `> * ᴄᴏɴɴᴇᴄᴛ sᴜᴄᴄᴇssғᴜʟʟʏ*
╭━━━【𝐇𝐔𝐍𝐓𝐄𝐑 𝐗𝐌𝐃】━━━╮
┃Hey there, HUNTER-XMD User! 👋🏻
┃Thanks for using HUNTER-XMD — ┃your session has been successfully ┃created!

┃🔐 Session ID: Sent above  
┃⚠️ Keep it safe! Do NOT share this ID ┃with anyone.
┃
————

✅ Stay Updated:  
┃Join our official WhatsApp Channel:  
┃https://whatsapp.com/channel/0029VbBB2LTFi8xaGjuupv2a
┃
┃💻 Source Code:  
┃Fork & explore the project on GitHub:  
┃https://github.com/djexo-tech/hunter-xmd

————
┃ᴅᴇᴠ : ʜɪsᴏᴋᴀ
┃ᴄʜᴀɴɴᴇʟ : ┃https://whatsapp.com/┃channel/┃0029VbBB2LTFi8xaGjuupv2a
┃ʀᴇᴘᴏ :https://github.com/djexo-tech/┃hunter-xmd
╰━━━━━━━━━━━━━━━╯
> Powered by ʜɪsᴏᴋᴀ ᴛᴇᴄʜ🇭🇹
            await sock.sendMessage(sock.user.id, {
              text: desc,
              contextInfo: {
                externalAdReply: {
                  title: "ʜɪsᴏᴋᴀ ᴛᴇᴄʜ",
					Body: "ʙᴇsᴛ 2025 ʙᴏᴛ",
                  thumbnailUrl: "https://files.catbox.moe/0gzmp7.jpg",
                  sourceUrl: "https://whatsapp.com/channel/0029VbBB2LTFi8xaGjuupv2a",
                  mediaType: 1,
                  renderLargerThumbnail: true
                }
              }
            }, { quoted: code });
          } catch (e) {
            let ddd = sock.sendMessage(sock.user.id, { text: e.toString() });
            let desc = `*Don't Share with anyone this code use for deploying*\n\n ◦ *Github:* `https://github.com/dejxo-tech/hunterxmd`;
            await sock.sendMessage(sock.user.id, {
              text: desc,
              contextInfo: {
                externalAdReply: {
                  title: "ʜɪsᴏᴋᴀ ᴛᴇᴄʜ",
                  thumbnailUrl: "https://files.catbox.moe/0gzmp7.jpg",
                  sourceUrl: "https://whatsapp.com/channel/0029VbBB2LTFi8xaGjuupv2a",
                  mediaType: 2,
                  renderLargerThumbnail: true,
                  showAdAttribution: true
                }
              }
            }, { quoted: ddd });
          }

          await delay(10);
          await sock.ws.close();
          await removeFile('./temp/' + id);
          console.log(`👤 ${sock.user.id} 𝗖𝗼𝗻𝗻𝗲𝗰𝘁𝗲́ ✅ 𝗥𝗲𝗱𝗲́𝗺𝗮𝗿𝗿𝗮𝗴𝗲...`);
          await delay(10);
          process.exit();

        } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
          await delay(10);
          GIFTED_MD_PAIR_CODE();
        }
      });
    } catch (err) {
      console.log("service restated");
      await removeFile('./temp/' + id);
      if (!res.headersSent) {
        await res.send({ code: "❗ Service Unavailable" });
      }
    }
  }

  return await GIFTED_MD_PAIR_CODE();
});

/*
setInterval(() => {
    console.log("☘️ 𝗥𝗲𝘀𝘁𝗮𝗿𝘁𝗶𝗻𝗴 𝗽𝗿𝗼𝗰𝗲𝘀𝘀...");
    process.exit();
}, 180000); //30min
*/

module.exports = router;
  
