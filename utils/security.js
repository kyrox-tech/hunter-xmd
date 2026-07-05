const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const config = require('../config');

/**
 * Génère un ID de session sécurisé
 * @returns {string} Session ID
 */
function generateSessionId() {
  return `${Date.now()}-${uuidv4()}`;
}

/**
 * Hache une chaîne
 * @param {string} str - Chaîne à hacher
 * @returns {string} Chaîne hachée
 */
function hashString(str) {
  return crypto.createHash('sha256').update(str).digest('hex');
}

/**
 * Valide une API key
 * @param {string} key - Clé à valider
 * @returns {boolean}
 */
function validateApiKey(key) {
  return key === config.API_KEY;
}

/**
 * Nettoie une chaîne d'entrée utilisateur
 * @param {string} input - Entrée utilisateur
 * @returns {string} Chaîne nettoyée
 */
function sanitizeInput(input) {
  return String(input)
    .replace(/[<>"']/g, '') // Supprimer caractères dangereux
    .trim()
    .substring(0, 500); // Limiter la taille
}

/**
 * Hache un mot de passe
 * @param {string} password - Mot de passe
 * @returns {string} Mot de passe hashé
 */
async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

/**
 * Compare un mot de passe avec son hash
 * @param {string} password - Mot de passe
 * @param {string} hash - Hash du mot de passe
 * @returns {boolean}
 */
async function comparePassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

module.exports = {
  generateSessionId,
  hashString,
  validateApiKey,
  sanitizeInput,
  hashPassword,
  comparePassword
};
