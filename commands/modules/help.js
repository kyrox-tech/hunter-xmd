module.exports = {
  name: 'help',
  aliases: ['aide', 'h'],
  description: 'Affiche l\'aide des commandes',
  usage: '.help [commande]',
  category: 'info',
  
  async execute(args, context) {
    try {
      if (args.length === 0) {
        return {
          success: true,
          message: '📚 **Commandes disponibles:**\n\n' +
            '.help - Affiche cette aide\n' +
            '.alive - Vérifie si le bot est en ligne\n' +
            '.ping - Réponse avec pong\n' +
            '.info - Infos du bot\n\n' +
            'Tapez `.help [commande]` pour plus de détails'
        };
      }
      
      return {
        success: true,
        message: '✅ Aide affichée'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
};
