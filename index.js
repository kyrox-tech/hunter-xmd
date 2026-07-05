const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const logger = require('./utils/logger');
const authRoutes = require('./routes/auth');
const sessionRoutes = require('./routes/session');
const adminRoutes = require('./routes/admin');
const { publicLimiter, strictLimiter, qrLimiter } = require('./middleware/rateLimiter');
const { verifyApiKey, isAdmin } = require('./middleware/auth');
const CommandHandler = require('./commands/handler');

const app = express();

// =============== Initialiser le CommandHandler ===============
const commandHandler = new CommandHandler();

// =============== Sécurité ===============
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'DELETE'],
  credentials: false
}));

// =============== Rate Limiting ===============
app.use(publicLimiter);

// =============== Middleware ===============
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static('public'));

// =============== Créer les dossiers nécessaires ===============
fs.ensureDirSync(config.SESSION_PATH);
fs.ensureDirSync(config.TEMP_PATH);
fs.ensureDirSync(config.LOGS_PATH);

logger.info(`🚀 Démarrage du serveur sur le port ${config.PORT}`);

// =============== Routes API ===============
app.use('/api/auth', qrLimiter, authRoutes);
app.use('/api/sessions', verifyApiKey, sessionRoutes);
app.use('/api/admin', adminRoutes);

// =============== Routes publiques ===============
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// =============== Route santé ===============
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: require('./package.json').version
  });
});

// =============== API Commandes ===============
app.post('/api/commands/execute', async (req, res) => {
  try {
    const { command, args, sessionId } = req.body;
    
    if (!command) {
      return res.status(400).json({ success: false, error: 'Commande requise' });
    }
    
    const result = await commandHandler.execute(command, args || [], {
      sessionId,
      sender: req.body.sender || 'user'
    });
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// =============== API Liste des commandes ===============
app.get('/api/commands', (req, res) => {
  const commands = commandHandler.listCommands();
  res.json({
    success: true,
    count: commands.length,
    commands
  });
});

// =============== Gestion erreurs 404 ===============
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Route non trouvée' });
});

// =============== Gestion erreurs globales ===============
app.use((err, req, res, next) => {
  logger.error('Erreur non gérée:', err.message);
  res.status(500).json({ success: false, error: 'Erreur serveur' });
});

// =============== D��marrer le serveur ===============
const PORT = process.env.PORT || config.PORT;
app.listen(PORT, () => {
  logger.info(`✅ Serveur actif sur http://localhost:${PORT}`);
  logger.info(`🌐 Page d'authentification: http://localhost:${PORT}/`);
  logger.info(`👨‍💼 Dashboard Admin: http://localhost:${PORT}/admin`);
  logger.info(`💚 Vérifier la santé: http://localhost:${PORT}/health`);
  logger.info(`📚 Commandes: http://localhost:${PORT}/api/commands`);
});

// =============== Gestion arrêt propre ===============
process.on('SIGTERM', () => {
  logger.info('SIGTERM reçu, arrêt gracieux...');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT reçu, arrêt gracieux...');
  process.exit(0);
});

module.exports = app;
