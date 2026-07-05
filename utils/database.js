const fs = require('fs-extra');
const path = require('path');
const config = require('../config');

// Dossier pour stocker les données de session
const sessionsDir = config.SESSION_PATH;

// S'assurer que le dossier existe
fs.ensureDirSync(sessionsDir);

/**
 * Sauvegarde les données d'une session
 * @param {string} sessionId - ID de session
 * @param {object} data - Données à sauvegarder
 */
async function saveSession(sessionId, data) {
  try {
    const sessionPath = path.join(sessionsDir, `${sessionId}.json`);
    await fs.writeJSON(sessionPath, {
      ...data,
      updatedAt: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error);
    return false;
  }
}

/**
 * Récupère les données d'une session
 * @param {string} sessionId - ID de session
 * @returns {object|null}
 */
async function getSession(sessionId) {
  try {
    const sessionPath = path.join(sessionsDir, `${sessionId}.json`);
    if (await fs.exists(sessionPath)) {
      return await fs.readJSON(sessionPath);
    }
    return null;
  } catch (error) {
    console.error('Erreur lors de la lecture:', error);
    return null;
  }
}

/**
 * Supprime une session
 * @param {string} sessionId - ID de session
 */
async function deleteSession(sessionId) {
  try {
    const sessionPath = path.join(sessionsDir, `${sessionId}.json`);
    await fs.remove(sessionPath);
    return true;
  } catch (error) {
    console.error('Erreur lors de la suppression:', error);
    return false;
  }
}

/**
 * Liste toutes les sessions
 * @returns {array}
 */
async function listSessions() {
  try {
    const files = await fs.readdir(sessionsDir);
    return files.filter(f => f.endsWith('.json')).map(f => f.replace('.json', ''));
  } catch (error) {
    console.error('Erreur:', error);
    return [];
  }
}

module.exports = {
  saveSession,
  getSession,
  deleteSession,
  listSessions
};
