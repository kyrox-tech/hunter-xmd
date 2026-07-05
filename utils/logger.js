const fs = require('fs');
const path = require('path');
const config = require('../config');

// Créer le dossier logs s'il n'existe pas
if (!fs.existsSync(config.LOGS_PATH)) {
  fs.mkdirSync(config.LOGS_PATH, { recursive: true });
}

const logFile = path.join(config.LOGS_PATH, `${new Date().toISOString().split('T')[0]}.log`);

/**
 * Logger pour les logs
 */
const logger = {
  info: (msg) => {
    const timestamp = new Date().toISOString();
    const logMsg = `[${timestamp}] INFO: ${msg}\n`;
    console.log(`✅ ${logMsg}`);
    fs.appendFileSync(logFile, logMsg);
  },
  
  error: (msg, err = '') => {
    const timestamp = new Date().toISOString();
    const logMsg = `[${timestamp}] ERROR: ${msg} ${err}\n`;
    console.error(`❌ ${logMsg}`);
    fs.appendFileSync(logFile, logMsg);
  },
  
  warn: (msg) => {
    const timestamp = new Date().toISOString();
    const logMsg = `[${timestamp}] WARN: ${msg}\n`;
    console.warn(`⚠️ ${logMsg}`);
    fs.appendFileSync(logFile, logMsg);
  },
  
  debug: (msg) => {
    if (process.env.DEBUG === 'true') {
      const timestamp = new Date().toISOString();
      const logMsg = `[${timestamp}] DEBUG: ${msg}\n`;
      console.log(`🐛 ${logMsg}`);
      fs.appendFileSync(logFile, logMsg);
    }
  }
};

module.exports = logger;
