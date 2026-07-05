const express = require('express');
const router = express.Router();
const { listSessions, getSession, deleteSession } = require('../utils/database');
const { validateApiKey, sanitizeInput } = require('../utils/security');

/**
 * Middleware de validation API key
 */
const validateKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  
  if (!validateApiKey(apiKey)) {
    return res.status(401).json({ error: 'API key invalide' });
  }
  
  next();
};

/**
 * Liste toutes les sessions (sécurisé)
 * GET /api/sessions
 */
router.get('/', validateKey, async (req, res) => {
  try {
    const sessions = await listSessions();
    res.json({
      success: true,
      count: sessions.length,
      sessions
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Récupère les détails d'une session
 * GET /api/sessions/:sessionId
 */
router.get('/:sessionId', validateKey, async (req, res) => {
  try {
    const sessionId = sanitizeInput(req.params.sessionId);
    const session = await getSession(sessionId);
    
    if (!session) {
      return res.status(404).json({ error: 'Session non trouvée' });
    }
    
    res.json({
      success: true,
      session
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Supprime une session
 * DELETE /api/sessions/:sessionId
 */
router.delete('/:sessionId', validateKey, async (req, res) => {
  try {
    const sessionId = sanitizeInput(req.params.sessionId);
    const result = await deleteSession(sessionId);
    
    if (!result) {
      return res.status(400).json({ error: 'Impossible de supprimer la session' });
    }
    
    res.json({
      success: true,
      message: 'Session supprimée'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
