const config = require('../../config');

module.exports = {
  name: 'alive',
  aliases: ['hi', 'hey'],
  description: 'Vérifie si le bot est en ligne',
  usage: '.alive',
  category: 'info',
  
  async execute(args, context) {
    try {
      const uptime = process.uptime();
      const hours = Math.floor(uptime / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      
      const message = `
🤖 *${config.BOT_NAME} - Online!*

👤 *Owner:* ${config.OWNER_NAME}
⏱️ *Uptime:* ${hours}h ${minutes}m
🌍 *Mode:* ${config.MODE}

${config.ALIVE_MSG}
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
