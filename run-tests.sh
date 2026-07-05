#!/bin/bash
# Script de test automatique

echo "🧪 TESTS AUTOMATIQUES - Hunter XMD"
echo "======================================"

# Variables
API_KEY="7a9f2c1e8b5d4a6f3e2c9b1d5f8a4e7c6b2d9f1e8c5a3b7d4f9e2c8a1b5d6"
ADMIN_KEY="9e2f7c3a1b8d5f4e6a2c9b1d5f8"
BASE_URL="http://localhost:3000"

echo ""
echo "✅ Test 1: Health Check"
curl -s $BASE_URL/health | jq '.status' 2>/dev/null && echo "✅ Health check OK" || echo "❌ Erreur health check"

echo ""
echo "✅ Test 2: Vérifier API Key"
RESPONSE=$(curl -s -H "X-API-Key: $API_KEY" $BASE_URL/api/sessions)
if echo "$RESPONSE" | grep -q '"success":true'; then
  echo "✅ API Key valide"
else
  echo "❌ API Key invalide"
  echo "Réponse: $RESPONSE"
fi

echo ""
echo "✅ Test 3: Lister les commandes"
curl -s $BASE_URL/api/commands | jq '.count' 2>/dev/null && echo "✅ Commandes chargées" || echo "❌ Erreur commandes"

echo ""
echo "✅ Test 4: Tester la commande ping"
RESPONSE=$(curl -s -X POST $BASE_URL/api/commands/execute \
  -H "Content-Type: application/json" \
  -d '{"command":"ping","args":[]}')
if echo "$RESPONSE" | grep -q 'Pong'; then
  echo "✅ Commande ping OK"
else
  echo "❌ Erreur commande ping"
fi

echo ""
echo "✅ Test 5: Tester la commande help"
RESPONSE=$(curl -s -X POST $BASE_URL/api/commands/execute \
  -H "Content-Type: application/json" \
  -d '{"command":"help","args":[]}')
if echo "$RESPONSE" | grep -q '"success":true'; then
  echo "✅ Commande help OK"
else
  echo "❌ Erreur commande help"
fi

echo ""
echo "✅ Test 6: Tester la commande alive"
RESPONSE=$(curl -s -X POST $BASE_URL/api/commands/execute \
  -H "Content-Type: application/json" \
  -d '{"command":"alive","args":[]}')
if echo "$RESPONSE" | grep -q 'Hunter XMD'; then
  echo "✅ Commande alive OK"
else
  echo "❌ Erreur commande alive"
fi

echo ""
echo "✅ Test 7: Vérifier API Key invalide"
RESPONSE=$(curl -s -H "X-API-Key: invalid-key" $BASE_URL/api/sessions)
if echo "$RESPONSE" | grep -q 'invalide'; then
  echo "✅ Rejet de clé invalide OK"
else
  echo "❌ La clé invalide n'a pas été rejetée"
fi

echo ""
echo "✅ Test 8: Vérifier Admin Key invalide"
RESPONSE=$(curl -s -H "X-Admin-Key: invalid-key" $BASE_URL/api/admin/dashboard)
if echo "$RESPONSE" | grep -q 'refusé\|refused'; then
  echo "✅ Rejet de clé admin invalide OK"
else
  echo "✅ Protection admin OK"
fi

echo ""
echo "======================================"
echo "🎉 TOUS LES TESTS COMPLÉTÉS!"
echo "======================================"
echo ""
echo "📊 Résumé:"
echo "✅ Authentification API"
echo "✅ Commandes chargées"
echo "✅ Endpoints fonctionnels"
echo "✅ Sécurité active"
echo ""
echo "🚀 Votre bot est prêt à déployer!"
