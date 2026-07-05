const fs = require('fs-extra');
const path = require('path');
const logger = require('../utils/logger');

class CommandHandler {
  constructor() {
    this.commands = new Map();
    this.aliases = new Map();
    this.loadCommands();
  }

  /**
   * Charge tous les fichiers de commandes
   */
  async loadCommands() {
    try {
      const commandsDir = path.join(__dirname, 'modules');
      
      if (!await fs.exists(commandsDir)) {
        logger.warn('Dossier commandes non trouvé');
        return;
      }

      const files = await fs.readdir(commandsDir);
      
      for (const file of files) {
        if (file.endsWith('.js')) {
          try {
            const command = require(path.join(commandsDir, file));
            this.registerCommand(command);
          } catch (error) {
            logger.error(`Erreur chargement commande ${file}:`, error.message);
          }
        }
      }
      
      logger.info(`✅ ${this.commands.size} commandes chargées`);
    } catch (error) {
      logger.error('Erreur chargement des commandes:', error.message);
    }
  }

  /**
   * Enregistre une commande
   */
  registerCommand(command) {
    if (!command.name) {
      throw new Error('Commande sans nom');
    }

    this.commands.set(command.name.toLowerCase(), command);
    
    // Ajouter les alias
    if (command.aliases && Array.isArray(command.aliases)) {
      command.aliases.forEach(alias => {
        this.aliases.set(alias.toLowerCase(), command.name.toLowerCase());
      });
    }

    logger.debug(`Commande enregistrée: ${command.name}`);
  }

  /**
   * Exécute une commande
   */
  async execute(commandName, args, context) {
    try {
      // Chercher la commande
      let cmd = this.commands.get(commandName.toLowerCase());
      
      // Si non trouvée, chercher dans les alias
      if (!cmd) {
        const aliasName = this.aliases.get(commandName.toLowerCase());
        cmd = this.commands.get(aliasName);
      }

      if (!cmd) {
        return {
          success: false,
          error: `Commande inconnue: ${commandName}`
        };
      }

      // Vérifier les permissions
      if (cmd.permissions && !this.hasPermission(context.sender, cmd.permissions)) {
        return {
          success: false,
          error: '❌ Permissions insuffisantes'
        };
      }

      // Exécuter la commande
      const result = await cmd.execute(args, context);
      return result;
    } catch (error) {
      logger.error(`Erreur exécution commande ${commandName}:`, error.message);
      return {
        success: false,
        error: 'Erreur lors de l\'exécution de la commande'
      };
    }
  }

  /**
   * Vérifie les permissions
   */
  hasPermission(sender, requiredPermissions) {
    // À implémenter selon votre système de permissions
    return true;
  }

  /**
   * Récupère la liste des commandes
   */
  listCommands() {
    const list = [];
    this.commands.forEach((cmd, name) => {
      list.push({
        name: cmd.name,
        description: cmd.description || 'Pas de description',
        aliases: cmd.aliases || [],
        usage: cmd.usage || 'Pas de documentation'
      });
    });
    return list;
  }
}

module.exports = CommandHandler;
