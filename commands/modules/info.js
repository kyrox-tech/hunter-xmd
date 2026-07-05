const config = require('../../config');
const packageJson = require('../../package.json');

module.exports = {
  name: 'info',
  aliases: ['infos', 'about'],
  description: 'Affiche les informations du bot',
  usage: '.info',
  category: 'info',
  
  async execute(args, context) {
    try {
      const message = `
🤖 *Infos Bot*

📦 *Nom:* ${config.BOT_NAME}
📌 *Version:* ${packageJson.version}
👤 *Owner:* ${config.OWNER_NAME}
🔧 *Mode:* ${config.MODE}
📱 *Baileys:* ${packageJson.dependencies['@whiskeysockets/baileys']}
🌐 *Express:* ${packageJson.dependencies['express']}

© Kyrox Tech 2024
      `;
      
      return {
        success: true,
        message: message.trim()
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
};
