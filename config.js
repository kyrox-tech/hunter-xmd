const fs = require('fs');
const path = require('path');

// Charger les variables d'environnement
if (fs.existsSync('.env')) {
  require('dotenv').config({ path: './.env' });
}

/**
 * Convertir une chaîne en booléen
 * @param {string} text - Valeur à convertir
 * @param {string} fault - Valeur par défaut
 * @returns {boolean}
 */
function convertToBool(text, fault = 'true') {
  return text === fault ? true : false;
}

module.exports = {
  // SESSION_ID - Obtenir depuis la page d'authentification
  SESSION_ID: process.env.SESSION_ID || "",
  
  // Port du serveur
  PORT: process.env.PORT || 3000,
  
  // Mode du bot (public|private|inbox|group)
  MODE: process.env.MODE || "public",
  
  // Préfixe des commandes
  PREFIX: process.env.PREFIX || ".",
  
  // Infos du bot
  BOT_NAME: process.env.BOT_NAME || "Hunter XMD",
  OWNER_NAME: process.env.OWNER_NAME || "Kyrox Tech",
  OWNER_NUMBER: process.env.OWNER_NUMBER || "",
  
  // Features - Statut auto
  AUTO_STATUS_SEEN: convertToBool(process.env.AUTO_STATUS_SEEN || "false"),
  AUTO_STATUS_REPLY: convertToBool(process.env.AUTO_STATUS_REPLY || "false"),
  AUTO_STATUS_REACT: convertToBool(process.env.AUTO_STATUS_REACT || "true"),
  AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || "*Vu votre statut* 🤍",
  
  // Features - Anti-call
  ANTI_CALL: convertToBool(process.env.ANTI_CALL || "true"),
  
  // Features - Anti-delete
  ANTI_DELETE: convertToBool(process.env.ANTI_DELETE || "true"),
  ANTI_DEL_PATH: process.env.ANTI_DEL_PATH || "inbox",
  
  // Features - Groupe
  WELCOME: convertToBool(process.env.WELCOME || "true"),
  ADMIN_EVENTS: convertToBool(process.env.ADMIN_EVENTS || "false"),
  ANTI_LINK: convertToBool(process.env.ANTI_LINK || "false"),
  
  // Features - Messages
  AUTO_REPLY: convertToBool(process.env.AUTO_REPLY || "false"),
  AUTO_REPLY_MSG: process.env.AUTO_REPLY_MSG || "Je suis absent en ce moment! 🚀",
  MENTION_REPLY: convertToBool(process.env.MENTION_REPLY || "false"),
  
  // Features - Réactions
  AUTO_REACT: convertToBool(process.env.AUTO_REACT || "false"),
  CUSTOM_REACT: convertToBool(process.env.CUSTOM_REACT || "false"),
  CUSTOM_REACT_EMOJIS: process.env.CUSTOM_REACT_EMOJIS || "💝,💖,💗,❤️,🧡,💛,💚,💙",
  
  // Features - Lecture
  READ_MESSAGE: convertToBool(process.env.READ_MESSAGE || "false"),
  READ_CMD: convertToBool(process.env.READ_CMD || "false"),
  AUTO_TYPING: convertToBool(process.env.AUTO_TYPING || "false"),
  AUTO_RECORDING: convertToBool(process.env.AUTO_RECORDING || "false"),
  ALWAYS_ONLINE: convertToBool(process.env.ALWAYS_ONLINE || "false"),
  
  // Sécurité
  ANTI_BAD: convertToBool(process.env.ANTI_BAD || "false"),
  ANTI_VV: convertToBool(process.env.ANTI_VV || "true"),
  ANTI_LINK_KICK: convertToBool(process.env.ANTI_LINK_KICK || "false"),
  
  // Images et URLs
  MENU_IMAGE_URL: process.env.MENU_IMAGE_URL || "https://via.placeholder.com/400",
  ALIVE_IMG: process.env.ALIVE_IMG || "https://via.placeholder.com/400",
  ALIVE_MSG: process.env.ALIVE_MSG || "Je suis en ligne et prêt à servir! 🎯",
  
  // Stickers
  STICKER_NAME: process.env.STICKER_NAME || "Hunter XMD Stickers",
  AUTO_STICKER: convertToBool(process.env.AUTO_STICKER || "false"),
  
  // Bio auto
  AUTO_BIO: convertToBool(process.env.AUTO_BIO || "false"),
  TIME_ZONE: process.env.TIME_ZONE || "Europe/Paris",
  
  // DEV
  DEV: process.env.DEV || process.env.OWNER_NUMBER || "",
  
  // Dossiers
  SESSION_PATH: path.join(__dirname, 'sessions'),
  TEMP_PATH: path.join(__dirname, 'temp'),
  LOGS_PATH: path.join(__dirname, 'logs'),
  
  // Sécurité serveur
  API_KEY: process.env.API_KEY || 'hunter-xmd-secret-key-change-me',
  ENVIRONMENT: process.env.NODE_ENV || 'production',
};
