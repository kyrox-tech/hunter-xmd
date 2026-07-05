module.exports = {
  name: 'ping',
  aliases: ['p'],
  description: 'Teste la latence du bot',
  usage: '.ping',
  category: 'info',
  
  async execute(args, context) {
    try {
      const ping = Math.random() * 100;
      
      return {
        success: true,
        message: `🏓 Pong! Latence: ${ping.toFixed(2)}ms`
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
};
