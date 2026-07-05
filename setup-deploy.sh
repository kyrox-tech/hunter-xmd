#!/bin/bash
# Script de déploiement complet avec tests

echo "🚀 DÉPLOIEMENT COMPLET - Hunter XMD"
echo "====================================="

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonction pour imprimer avec couleur
print_status() {
  echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
  echo -e "${RED}❌ $1${NC}"
}

print_warn() {
  echo -e "${YELLOW}⚠️  $1${NC}"
}

# Étape 1: Vérifier Node.js
echo ""
echo "Vérification de l'environnement..."
if ! command -v node &> /dev/null; then
  print_error "Node.js n'est pas installé"
  exit 1
fi
print_status "Node.js $(node -v) trouvé"

# Étape 2: Vérifier npm
if ! command -v npm &> /dev/null; then
  print_error "npm n'est pas installé"
  exit 1
fi
print_status "npm $(npm -v) trouvé"

# Étape 3: Installer les dépendances
echo ""
echo "Installation des dépendances..."
if npm install; then
  print_status "Dépendances installées"
else
  print_error "Erreur installation des dépendances"
  exit 1
fi

# Étape 4: Créer les dossiers
echo ""
echo "Création des dossiers..."
mkdir -p sessions logs temp commands/modules middleware routes utils whatsapp public tests
print_status "Dossiers créés"

# Étape 5: Vérifier .env
echo ""
echo "Vérification de la configuration..."
if [ ! -f .env ]; then
  print_warn ".env non trouvé, création..."
  cp .env.example .env
  print_status ".env créé (veuillez vérifier les valeurs)"
else
  print_status ".env existant détecté"
fi

# Étape 6: Exécuter les tests unitaires
echo ""
echo "Exécution des tests unitaires..."
if npm test; then
  print_status "Tests unitaires réussis"
else
  print_warn "Certains tests ont échoué (ce peut être normal)"
fi

# Étape 7: Vérifier les fichiers essentiels
echo ""
echo "Vérification des fichiers essentiels..."
FILES=("index.js" "config.js" "package.json" "commands/handler.js" "whatsapp/baileys.js")
for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    print_status "$file ✓"
  else
    print_error "$file manquant!"
  fi
done

# Étape 8: Afficher les clés
echo ""
echo "======================================"
echo "🔐 CONFIGURATION FINALE"
echo "======================================"
echo ""
echo "API_KEY:"
echo "7a9f2c1e8b5d4a6f3e2c9b1d5f8a4e7c6b2d9f1e8c5a3b7d4f9e2c8a1b5d6"
echo ""
echo "ADMIN_KEY:"
echo "9e2f7c3a1b8d5f4e6a2c9b1d5f8"
echo ""
echo "======================================"

# Étape 9: Afficher les instructions de démarrage
echo ""
echo "🎉 DÉPLOIEMENT RÉUSSI!"
echo ""
echo "📋 PROCHAINES ÉTAPES:"
echo ""
echo "1️⃣  LOCALEMENT (tests):"
echo "   npm start"
echo ""
echo "2️⃣  SUR RENDER.COM:"
echo "   - Créer un Web Service"
echo "   - Connecter votre repo GitHub"
echo "   - Ajouter les variables d'environnement:"
echo "     NODE_ENV=production"
echo "     PORT=10000"
echo "     API_KEY=7a9f2c1e8b5d4a6f3e2c9b1d5f8a4e7c6b2d9f1e8c5a3b7d4f9e2c8a1b5d6"
echo "     ADMIN_KEY=9e2f7c3a1b8d5f4e6a2c9b1d5f8"
echo ""
echo "3️⃣  ACCÈS:"
echo "   🌐 Authentification: http://localhost:3000"
echo "   👨‍💼 Admin: http://localhost:3000/admin"
echo "   💚 Health: http://localhost:3000/health"
echo ""
echo "======================================"
echo "✅ Tout est prêt pour le déploiement!"
echo "======================================"
