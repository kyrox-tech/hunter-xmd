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

const app = express();

// =============== Sécurité ===============
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'DELETE'],
  credentials: false
}));

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
app.use('/api/auth', authRoutes);
app.use('/api/sessions', sessionRoutes);

// =============== Route principale ===============
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// =============== Route santé ===============
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// =============== Gestion erreurs 404 ===============
app.use((req, res) => {
  res.status(404).json({ error: 'Route non trouvée' });
});

// =============== Gestion erreurs globales ===============
app.use((err, req, res, next) => {
  logger.error('Erreur non gérée:', err.message);
  res.status(500).json({ error: 'Erreur serveur' });
});

// =============== Démarrer le serveur ===============
app.listen(config.PORT, () => {
  logger.info(`✅ Serveur actif sur http://localhost:${config.PORT}`);
  logger.info(`🌐 Page d'authentification: http://localhost:${config.PORT}/`);
  logger.info(`💚 Vérifier la santé: http://localhost:${config.PORT}/health`);
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
