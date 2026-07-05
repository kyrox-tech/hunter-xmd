#!/bin/bash
# Script de déploiement automatique

echo "🚀 Déploiement Hunter XMD"

# Variables
APP_NAME="hunter-xmd"
REPO="https://github.com/kyrox-tech/hunter-xmd.git"
DEPLOY_DIR="/opt/hunter-xmd"

echo "📦 Installation des dépendances..."
npm install

echo "✅ Exécution des tests..."
npm test

echo "🔐 Génération de la clé API..."
API_KEY=$(openssl rand -hex 32)
echo "API_KEY=$API_KEY" >> .env
echo "✅ Clé API générée: $API_KEY"

echo "🔐 Génération de la clé Admin..."
ADMIN_KEY=$(openssl rand -hex 16)
echo "ADMIN_KEY=$ADMIN_KEY" >> .env
echo "✅ Clé Admin générée: $ADMIN_KEY"

echo "🎉 Déploiement réussi!"
echo ""
echo "📝 Sauvegardez ces clés en sécurité:"
echo "API_KEY: $API_KEY"
echo "ADMIN_KEY: $ADMIN_KEY"
echo ""
echo "🚀 Démarrage du serveur..."
npm start
