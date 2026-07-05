const { makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const path = require('path');
const fs = require('fs-extra');
const config = require('../config');
const logger = require('../utils/logger');
const { EventEmitter } = require('events');

class Baileys extends EventEmitter {
  constructor(sessionId) {
    super();
    this.sessionId = sessionId;
    this.socket = null;
    this.authState = null;
    this.saveCreds = null;
    this.sessionPath = path.join(config.SESSION_PATH, sessionId);
  }

  /**
   * Initialiser la connexion WhatsApp
   */
  async connect() {
    try {
      // Créer le dossier de session
      fs.ensureDirSync(this.sessionPath);

      // Charger l'état d'authentification
      const { state, saveCreds } = await useMultiFileAuthState(this.sessionPath);
      this.authState = state;
      this.saveCreds = saveCreds;

      // Créer le socket WhatsApp
      this.socket = makeWASocket({
        auth: state,
        printQRInTerminal: false,
        logger: require('pino')({ level: 'error' }),
        browser: ['Hunter XMD', 'Chrome', '10.0.0'],
        syncFullHistory: false,
        markOnlineOnConnect: config.ALWAYS_ONLINE,
      });

      // Événements
      this.setupEvents();

      return this.socket;
    } catch (error) {
      logger.error('Erreur connexion Baileys:', error.message);
      throw error;
    }
  }

  /**
   * Configure les événements du socket
   */
  setupEvents() {
    // QR Code
    this.socket.ev.on('connection.update', (update) => {
      const { connection, lastDisconnect, qr } = update;

      if (qr) {
        this.emit('qr', qr);
      }

      if (connection === 'open') {
        logger.info(`✅ Bot connecté: ${this.sessionId}`);
        this.emit('connected');
      }

      if (connection === 'close') {
        const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
        logger.warn(`❌ Connexion fermée: ${reason}`);
        this.emit('disconnected', reason);
      }
    });

    // Sauvegarde des credentials
    this.socket.ev.on('creds.update', this.saveCreds);

    // Messages
    this.socket.ev.on('messages.upsert', (m) => {
      this.emit('message', m);
    });
  }

  /**
   * Envoie un message
   */
  async sendMessage(to, message) {
    try {
      return await this.socket.sendMessage(to, message);
    } catch (error) {
      logger.error('Erreur envoi message:', error.message);
      throw error;
    }
  }

  /**
   * Obtient les infos du bot
   */
  async getMe() {
    if (!this.socket) return null;
    return this.socket.user;
  }

  /**
   * Déconnecte le socket
   */
  async disconnect() {
    try {
      if (this.socket) {
        await this.socket.logout();
        logger.info(`Bot déconnecté: ${this.sessionId}`);
      }
    } catch (error) {
      logger.error('Erreur déconnexion:', error.message);
    }
  }
}

module.exports = { Baileys };
