const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middleware/auth');
const { listSessions, getSession, deleteSession } = require('../utils/database');
const logger = require('../utils/logger');

/**
 * Dashboard - GET /api/admin/dashboard
 */
router.get('/dashboard', isAdmin, async (req, res) => {
  try {
    const sessions = await listSessions();
    const sessionDetails = [];
    
    for (const sessionId of sessions) {
      const session = await getSession(sessionId);
      if (session) {
        sessionDetails.push({
          id: sessionId,
          status: session.status,
          createdAt: session.createdAt,
          updatedAt: session.updatedAt
        });
      }
    }
    
    res.json({
      success: true,
      stats: {
        totalSessions: sessions.length,
        activeSessions: sessionDetails.filter(s => s.status === 'authenticated').length,
        uptime: Math.floor(process.uptime() / 60) + ' minutes'
      },
      sessions: sessionDetails
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * Logs - GET /api/admin/logs
 */
router.get('/logs', isAdmin, async (req, res) => {
  try {
    const fs = require('fs-extra');
    const path = require('path');
    const config = require('../config');
    
    const logsDir = config.LOGS_PATH;
    const files = await fs.readdir(logsDir);
    const logFiles = files.filter(f => f.endsWith('.log')).sort().reverse();
    
    res.json({
      success: true,
      logFiles: logFiles.slice(0, 10)
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * Voir un log - GET /api/admin/logs/:filename
 */
router.get('/logs/:filename', isAdmin, async (req, res) => {
  try {
    const fs = require('fs-extra');
    const path = require('path');
    const config = require('../config');
    
    const filename = req.params.filename.replace(/[^a-z0-9.-]/gi, '');
    const logPath = path.join(config.LOGS_PATH, filename);
    
    if (!await fs.exists(logPath)) {
      return res.status(404).json({ success: false, error: 'Log non trouvé' });
    }
    
    const content = await fs.readFile(logPath, 'utf8');
    const lines = content.split('\n').slice(-100); // Dernières 100 lignes
    
    res.json({
      success: true,
      filename,
      lines
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * Supprimer une session - DELETE /api/admin/sessions/:sessionId
 */
router.delete('/sessions/:sessionId', isAdmin, async (req, res) => {
  try {
    const { sessionId } = req.params;
    const result = await deleteSession(sessionId);
    
    if (result) {
      logger.info(`Admin suppression session: ${sessionId}`);
      res.json({ success: true, message: 'Session supprimée' });
    } else {
      res.status(400).json({ success: false, error: 'Impossible de supprimer' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * Stats système - GET /api/admin/stats
 */
router.get('/stats', isAdmin, async (req, res) => {
  try {
    const os = require('os');
    
    res.json({
      success: true,
      stats: {
        memory: {
          total: Math.round(os.totalmem() / 1024 / 1024) + ' MB',
          free: Math.round(os.freemem() / 1024 / 1024) + ' MB',
          used: Math.round((os.totalmem() - os.freemem()) / 1024 / 1024) + ' MB'
        },
        cpu: {
          cores: os.cpus().length,
          platform: os.platform()
        },
        uptime: Math.floor(process.uptime()) + ' secondes',
        node: process.version
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
