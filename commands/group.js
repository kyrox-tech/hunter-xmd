module.exports = {
  name: 'group',
  description: 'Afficher le menu des commandes de gestion de groupe',
  execute: async (conn, m) => {
    const groupMenu = `
╭────────────────❏
├❍ *\`𝐆𝐑𝐎𝐔𝐏 𝐌𝐄𝐍𝐔\`* 👥️
├────────────────❏
├➩ ᴄʟᴏsᴇᴛɪᴍᴇ   ➔ Fermer le groupe à une heure précise
├➩ ᴏᴘᴇɴᴛɪᴍᴇ   ➔ Ouvrir le groupe à une heure précise
├➩ ᴋɪᴄᴋ        ➔ Exclure un membre du groupe
├➩ ᴀᴅᴅ         ➔ Ajouter un membre au groupe
├➩ ᴘʀᴏᴍᴏᴛᴇ     ➔ Promouvoir un membre admin
├➩ ᴅᴇᴍᴏᴛᴇ      ➔ Rétrograder un admin
├➩ sᴇᴛᴅᴇsᴄ      ➔ Modifier la description du groupe
├➩ ᴋɪᴄᴋᴀʟʟ      ➔ Exclure tous les membres
├➩ sᴇᴛɢɴᴀᴍᴇ     ➔ Modifier le nom du groupe
├➩ sᴇᴛɢᴘᴘ       ➔ Modifier la photo du groupe
├➩ ᴛᴏᴛᴀɢ        ➔ Taguer tout le monde
├➩ ɢʀᴏᴜᴘ        ➔ Paramètres du groupe
├➩ ʟɪɴᴋɢᴄ        ➔ Obtenir le lien d’invitation du groupe
├➩ ʀᴇᴠᴏᴋᴇ        ➔ Révoquer le lien du groupe
┕────────────────❍
    `;
    await conn.sendMessage(m.chat, { text: groupMenu }, { quoted: m });
  }
}
