const express = require('express');
const router = express.Router();
const { Baileys } = require('../whatsapp/baileys');
const { generateSessionId, sanitizeInput } = require('../utils/security');
const { saveSession, getSession } = require('../utils/database');
const logger = require('../utils/logger');

/**
 * Génère un QR code pour l'authentification
 * POST /api/auth/generate-qr
 */
router.post('/generate-qr', async (req, res) => {
  try {
    const sessionId = generateSessionId();
    
    // Initialiser Baileys
    const baileys = new Baileys(sessionId);
    let qrCode = null;
    
    // Écouter l'événement QR code
    baileys.on('qr', (code) => {
      qrCode = code;
    });
    
    // Démarrer la connexion
    await baileys.connect();
    
    // Attendre que le QR code soit généré
    let attempts = 0;
    while (!qrCode && attempts < 30) {
      await new Promise(r => setTimeout(r, 100));
      attempts++;
    }
    
    if (!qrCode) {
      return res.status(500).json({ error: 'Impossible de générer le QR code' });
    }
    
    // Sauvegarder la session en attente
    await saveSession(sessionId, {
      status: 'pending',
      qrCode,
      createdAt: new Date().toISOString()
    });
    
    logger.info(`QR code généré pour session: ${sessionId}`);
    
    res.json({
      success: true,
      sessionId,
      qrCode
    });
  } catch (error) {
    logger.error('Erreur génération QR:', error.message);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Vérifie le statut d'authentification
 * GET /api/auth/status/:sessionId
 */
router.get('/status/:sessionId', async (req, res) => {
  try {
    const sessionId = sanitizeInput(req.params.sessionId);
    const session = await getSession(sessionId);
    
    if (!session) {
      return res.status(404).json({ error: 'Session non trouvée' });
    }
    
    res.json({
      success: true,
      status: session.status,
      authenticated: session.status === 'authenticated'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Confirme l'authentification
 * POST /api/auth/confirm
 */
router.post('/confirm', async (req, res) => {
  try {
    const { sessionId } = req.body;
    
    if (!sessionId) {
      return res.status(400).json({ error: 'sessionId requis' });
    }
    
    const session = await getSession(sanitizeInput(sessionId));
    
    if (!session) {
      return res.status(404).json({ error: 'Session non trouvée' });
    }
    
    if (session.status !== 'authenticated') {
      return res.status(400).json({ error: 'Session non authentifiée' });
    }
    
    res.json({
      success: true,
      message: 'Session confirmée',
      sessionId: sanitizeInput(sessionId)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
