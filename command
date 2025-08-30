// command.js
module.exports = {
  name: 'command',
  description: 'Route vers les différentes catégories de commandes',
  execute: async (conn, m, args) => {
    const command = args[0]?.toLowerCase();

    // Importation des modules par catégorie
    const group = require('./group');
    const download = require('./download');
    const owner = require('./owner');
    const convert = require('./convert');
    const ai = require('./ai');
    const other = require('./other');
    const menu = require('./menu');

    // Routage selon la catégorie demandée
    switch (command) {
      case 'group':
        return group.execute(conn, m, args.slice(1));
      case 'download':
        return download.execute(conn, m, args.slice(1));
      case 'owner':
        return owner.execute(conn, m, args.slice(1));
      case 'convert':
        return convert.execute(conn, m, args.slice(1));
      case 'ai':
        return ai.execute(conn, m, args.slice(1));
      case 'other':
        return other.execute(conn, m, args.slice(1));
      case 'menu':
      default:
        return menu.execute(conn, m, args.slice(1));
    }
  }
};
