const config = require('../config');
const logger = require('../utils/logger');

/**
 * Middleware pour vérifier la clé API
 */
const verifyApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey) {
    return res.status(401).json({ 
      success: false,
      error: 'Clé API manquante. Ajoutez X-API-Key dans les headers.' 
    });
  }
  
  // Comparer avec la clé configurée
  if (apiKey !== config.API_KEY) {
    logger.warn(`❌ Tentative d'accès avec clé invalide: ${apiKey.substring(0, 10)}...`);
    return res.status(401).json({ 
      success: false,
      error: 'Clé API invalide' 
    });
  }
  
  next();
};

/**
 * Middleware pour vérifier le token de session
 */
const verifySession = (req, res, next) => {
  const sessionId = req.headers['x-session-id'] || req.body.sessionId;
  
  if (!sessionId) {
    return res.status(401).json({ 
      success: false,
      error: 'Session ID manquant' 
    });
  }
  
  req.sessionId = sessionId;
  next();
};

/**
 * Middleware pour les admins
 */
const isAdmin = (req, res, next) => {
  const adminKey = req.headers['x-admin-key'];
  
  if (adminKey !== process.env.ADMIN_KEY) {
    logger.warn(`Tentative d'accès admin non autorisée de ${req.ip}`);
    return res.status(403).json({ 
      success: false,
      error: 'Accès admin refusé' 
    });
  }
  
  next();
};

module.exports = {
  verifyApiKey,
  verifySession,
  isAdmin
};
