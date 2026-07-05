# 🤖 Hunter XMD - Bot WhatsApp Multi-Device

> Un bot WhatsApp complet, sécurisé et facile à déployer

## ✨ Fonctionnalités

✅ **Authentification sécurisée** avec QR code  
✅ **Dashboard Admin** pour gérer les sessions  
✅ **Système de commandes** modulaire  
✅ **Rate limiting** pour protéger l'API  
✅ **Logs complètement** pour le debugging  
✅ **Tests unitaires** de sécurité  
✅ **Configuration centralisée** facile  

## 🚀 Démarrage rapide

### Prérequis
- Node.js >= 18.0.0
- npm >= 8.0.0

### Installation

```bash
# Cloner le repo
git clone https://github.com/kyrox-tech/hunter-xmd.git
cd hunter-xmd

# Installer les dépendances
npm install

# Copier la configuration
cp .env.example .env

# Générer les clés de sécurité
node -e "console.log('API_KEY=' + require('crypto').randomBytes(32).toString('hex'))" >> .env
node -e "console.log('ADMIN_KEY=' + require('crypto').randomBytes(16).toString('hex'))" >> .env

# Démarrer
npm start
```

### Accès

- 🌐 **Page d'authentification**: http://localhost:3000
- 👨‍💼 **Dashboard Admin**: http://localhost:3000/admin (besoin de la clé admin)
- 💚 **Health check**: http://localhost:3000/health
- 📚 **Commandes API**: http://localhost:3000/api/commands

## 📚 API Endpoints

### Authentification

```bash
# Générer QR code
POST /api/auth/generate-qr

# Vérifier le statut
GET /api/auth/status/:sessionId

# Confirmer l'authentification
POST /api/auth/confirm
Body: { sessionId }
```

### Sessions

```bash
# Lister les sessions (requiert API Key)
GET /api/sessions
Headers: { X-API-Key: YOUR_API_KEY }

# Détails d'une session
GET /api/sessions/:sessionId
Headers: { X-API-Key: YOUR_API_KEY }

# Supprimer une session
DELETE /api/sessions/:sessionId
Headers: { X-API-Key: YOUR_API_KEY }
```

### Admin

```bash
# Dashboard
GET /api/admin/dashboard
Headers: { X-Admin-Key: YOUR_ADMIN_KEY }

# Logs
GET /api/admin/logs
GET /api/admin/logs/:filename
Headers: { X-Admin-Key: YOUR_ADMIN_KEY }

# Stats système
GET /api/admin/stats
Headers: { X-Admin-Key: YOUR_ADMIN_KEY }
```

## 🔐 Sécurité

### Mesures implémentées

- ✅ **Helmet.js** - Headers HTTP sécurisés
- ✅ **CORS** - Contrôle des origines
- ✅ **Rate Limiting** - Protection contre les abus
- ✅ **Input Sanitization** - Protection XSS
- ✅ **API Key Validation** - Authentification
- ✅ **Password Hashing** - Bcryptjs
- ✅ **UUID Generation** - Sessions sécurisées

### Clés API

Générez des clés fortes:

```bash
# Générer une clé API (32 caractères hex)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Générer une clé admin (16 caractères hex)
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
```

## 📝 Configuration

Tous les paramètres sont dans `.env`:

```env
# Serveur
PORT=3000
NODE_ENV=production

# Bot
BOT_NAME=Hunter XMD
OWNER_NAME=Kyrox Tech
PREFIX=.

# Sécurité
API_KEY=votre-clé-api
ADMIN_KEY=votre-clé-admin

# Features
ANTI_CALL=true
AUTO_REPLY=false
AUTO_STATUS_SEEN=false
```

## 🤖 Commandes

### Système

- `.help` - Affiche l'aide
- `.ping` - Teste la latence
- `.alive` - Statut du bot
- `.info` - Infos du bot

### Ajouter une commande

Créez un fichier dans `commands/modules/`:

```javascript
// commands/modules/moncommande.js
module.exports = {
  name: 'ma-commande',
  aliases: ['cmd'],
  description: 'Ma description',
  usage: '.ma-commande [args]',
  category: 'info',
  
  async execute(args, context) {
    return {
      success: true,
      message: 'Réponse du bot'
    };
  }
};
```

## 🚀 Déploiement

### Sur Render.com

1. Poussez votre code sur GitHub
2. Allez sur [render.com](https://render.com)
3. Créez un nouveau **Web Service**
4. Connectez votre repo GitHub
5. Variables d'environnement:
   - `NODE_ENV=production`
   - `PORT=10000`
   - `API_KEY=votre-clé`
   - `ADMIN_KEY=votre-clé`

### Avec PM2

```bash
# Installer PM2
npm install -g pm2

# Démarrer
pm2 start index.js --name "hunter-xmd"

# Voir les logs
pm2 logs hunter-xmd

# Redémarrer
pm2 restart hunter-xmd
```

## 🧪 Tests

```bash
# Exécuter tous les tests
npm test

# Tests de sécurité
node tests/security.test.js

# Tests de commandes
node tests/commands.test.js
```

## 📊 Structure du projet

```
hunter-xmd/
├── commands/              # Système de commandes
│   ├── handler.js        # Gestionnaire de commandes
│   └── modules/          # Fichiers de commandes
├── middleware/           # Middlewares Express
│   ├── auth.js          # Authentification
│   └── rateLimiter.js   # Rate limiting
├── routes/              # Routes API
│   ├── auth.js          # Authentification
│   ├── session.js       # Gestion sessions
│   └── admin.js         # Panel admin
├── utils/               # Utilitaires
│   ├── database.js      # Gestion données
│   ├── logger.js        # Logs
│   └── security.js      # Fonctions sécurité
├── whatsapp/            # Intégration Baileys
│   └── baileys.js       # Classe Baileys
├── public/              # Fichiers statiques
│   ├── index.html       # Page authentification
│   └── admin.html       # Dashboard admin
├── tests/               # Tests
├── config.js            # Configuration
├── index.js             # Point d'entrée
├── package.json         # Dépendances
└── .env.example         # Variables d'environnement
```

## 🐛 Debugging

Activez le mode debug:

```bash
DEBUG=true npm start
```

Consultez les logs:

```bash
# Tous les logs
ls -la logs/

# Logs d'aujourd'hui
cat logs/2024-01-01.log
```

## 📄 License

MIT License - Voir LICENSE pour les détails

## 🤝 Support

Besoin d'aide?

- 📧 Email: support@kyrox-tech.com
- 💬 Discord: [Rejoindre](https://discord.gg/...)
- 📚 Docs: [Wiki](https://github.com/kyrox-tech/hunter-xmd/wiki)

## ⭐ Crédits

Créé avec ❤️ par **Kyrox Tech**

Basé sur [Baileys](https://github.com/WhiskeySockets/Baileys)
